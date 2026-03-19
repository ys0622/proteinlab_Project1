# 쿠팡 링크 구조 실사용 기준 최종 검증 보고서

## [1. 빌드 실패 원인 재검증]

### 1) npm run build 실패 로그 분석

**이번 실행 로그 (terminals/873302.txt):**
```
Failed to build /picks/[slug]/page: /picks/lactose-free (attempt 1 of 3) because it took more than 60 seconds. Retrying again shortly.
Failed to build /picks/[slug]/page: /picks/value-a (attempt 1 of 3) because it took more than 60 seconds. Retrying again shortly.
... (총 11개 picks 페이지 동일)
```

**이전 보고된 "bad port" 에러:**
```
unhandledRejection TypeError: fetch failed
  [cause]: Error: bad port
```

### 2) 실패 원인 분류

| 에러 유형 | 원인 | 코드/타입/SSR/API/runtime |
|-----------|------|---------------------------|
| **타임아웃 (60초 초과)** | picks 페이지 정적 생성 시 `withProductOverride` → `getCloudflareContext` 호출. 로컬 빌드 환경에서 Cloudflare KV 컨텍스트가 없거나 응답 지연 | **런타임/환경 이슈** |
| **bad port** | `getCloudflareContext` 또는 내부 fetch가 잘못된 URL/포트로 연결 시도. Cloudflare Workers 로컬 에뮬레이션 또는 .dev.vars 로드 시 발생 가능 | **런타임/환경 이슈** (코드 버그 아님) |

### 3) 결론

- **포트 문제**: "bad port"는 코드 오류가 아니라 Cloudflare 로컬 컨텍스트/에뮬레이션 환경 이슈로 추정.
- **타임아웃**: picks 페이지가 `withProductOverride`를 N개 제품마다 호출하고, 각 호출이 KV 접근을 시도. 로컬에서 KV 미제공 시 `getKV()`가 undefined를 반환하지만 `getCloudflareContext` 자체가 지연될 수 있음.
- **배포 환경**: Cloudflare Pages/Workers 배포 시에는 KV와 컨텍스트가 정상 제공되므로, 로컬 빌드 실패가 프로덕션 동작을 반드시 반영하지는 않음.

---

## [2. 실제 클릭 흐름 검증]

### 데이터 흐름 추적

| 페이지 위치 | 상품명 (샘플) | 버튼 참조 필드 | 최종 href | 새 탭 | lptag | 비정상 |
|-------------|---------------|----------------|-----------|-------|-------|--------|
| **메인/제품 목록** | 뉴케어 올프로틴 (초콜릿) | coupangUrl | null → "링크 준비중" | - | - | N |
| **메인/제품 목록** | 닥터유 프로 단백질바 3넛츠 | coupangUrl | null → "링크 준비중" | - | - | N |
| **메인/제품 목록** | 요프로 프로틴 플레인 150g | coupangUrl (productUrl 마이그레이션) | null* | - | - | N |
| **상세 페이지** | 뉴케어 올프로틴 (초콜릿) | product.coupangUrl | null → "링크 준비중" | - | - | N |
| **상세 페이지** | (KV override 있는 경우) | product.coupangUrl | link.coupang.com/...?lptag=... | O | O | N |
| **랭킹 페이지** | (동일 ProductCard) | coupangUrl | null 또는 KV override | O (활성 시) | O (활성 시) | N |
| **비교 페이지** | (CompareTable) | p.coupangUrl | null → "준비중" 또는 link.coupang.com | O (활성 시) | O (활성 시) | N |
| **picks 페이지** | (동일 ProductCard) | coupangUrl | null 또는 KV override | O (활성 시) | O (활성 시) | N |
| **추천 영역** | (ScoredProductCard) | coupangUrl (API 응답) | null 또는 KV override | O (활성 시) | O (활성 시) | N |

*요거트 productUrl `https://www.coupang.com/vp/products/9181041542` 등은 itemId/vendorItemId 없어 `getCoupangProductParams` null → `isValidCoupangLink` false → `getPreferredCoupangUrl` null. 정상 처리.

### 컴포넌트별 실제 렌더링

| 컴포넌트 | coupangHref null 시 | coupangHref 유효 시 |
|----------|---------------------|----------------------|
| PurchaseLinkRow | label="링크 준비중", mobileLabel="준비중" | label="쿠팡 구매" |
| PurchaseLinkButton | `<span>` 비활성, 클릭 불가 | `<a href="..." target="_blank">` |
| CompareTable | `<span>` "준비중" | `<Link href="..." target="_blank">` |

---

## [3. 금지 패턴 재확인]

| 금지 패턴 | 검색 결과 | 판정 |
|-----------|-----------|------|
| np/search | 생성 로직 없음. purchaseLinks.ts는 np/search **검출 시 거부** | 통과 |
| /product/{slug}로 구매 버튼 연결 | 구매 버튼은 getPreferredCoupangUrl/getNaverSearchUrl/getOfficialMallUrl만 사용. detailHref는 카드 클릭용 | 통과 |
| productUrl fallback | 쿠팡 버튼은 coupangUrl만 사용. productUrl은 withCoupangUrl 마이그레이션용(JSON→coupangUrl) | 통과 |
| lptag 없는 coupang.com URL | **수정 완료**: `buildCoupangPartnersProductUrl` null 시 `coupangUrl` fallback 제거 → null 반환 | 통과 |
| 버튼 활성 + href null/empty/# | PurchaseLinkButton: `!href` 시 `<span>` 비활성 렌더링. 활성 버튼은 항상 유효 href 보유 | 통과 |

---

## [4. KV override 실검증]

### 동일 slug 기준 데이터 흐름 (예: `newcare-all-protein-choco-245`)

| 노출 위치 | 함수/경로 | override 반영 |
|-----------|-----------|---------------|
| **상세** | `getProductBySlug(slug)` → `withProductOverride(base)` | O |
| **리스트 (홈)** | `mockProducts` → `Promise.all(map(withProductOverride))` | O |
| **리스트 (bars)** | `barProductsWithGrades` → `Promise.all(map(withProductOverride))` | O |
| **랭킹** | `mockProducts` 등 → `Promise.all(map(withProductOverride))` → `prepareRankingData` | O |
| **비교** | `GET /api/products/compare?slugs=...` → `getProductBySlug` → `withProductOverride` | O |
| **picks** | `pick.filterProducts(allProducts)` → `Promise.all(map(withProductOverride))` | O |
| **추천** | `api/recommend` → `productsWithOverride` → `topProducts`에 coupangUrl 포함 | O |

### KV 키 형식
- `product-override:{slug}` (예: `product-override:newcare-all-protein-choco-245`)

---

## [5. 실제 데이터 커버리지]

| 카테고리 | 전체 수 | 활성 coupangUrl | 링크 준비중 | 비정상 링크 | 활성화 비율 |
|----------|---------|-----------------|-------------|-------------|-------------|
| drink | 104 | 0 | 104 | 0 | 0% |
| bar | 71 | 0 | 71 | 0 | 0% |
| yogurt | 45 | 0* | 45 | 0 | 0% |
| **합계** | **220** | **0** | **220** | **0** | **0%** |

*yogurt 4개 productUrl이 coupang.com/vp/products이나 itemId/vendorItemId 없음 → 변환 불가 → null 처리(준비중)

---

## [6. 환경변수 실제 사용 확인]

### 참조 환경변수 (purchaseLinks.ts 54-61행)

```typescript
COUPANG_PARTNERS_TAG =
  process.env.NEXT_PUBLIC_COUPANG_LPTAG ||
  process.env.COUPANG_LPTAG ||
  process.env.NEXT_PUBLIC_COUPANG_PARTNERS_TAG ||
  process.env.COUPANG_PARTNERS_TAG || "";

COUPANG_PARTNERS_SUB_ID =
  process.env.NEXT_PUBLIC_COUPANG_PARTNERS_SUB_ID || process.env.COUPANG_PARTNERS_SUB_ID || "proteinlab";
```

### 배포 시 누락 동작

| 상황 | 동작 |
|------|------|
| lptag 4개 모두 누락 | `COUPANG_PARTNERS_TAG = ""` → `buildCoupangPartnersProductUrl` null 반환 → **버튼 비활성화** ("링크 준비중") |
| link.coupang.com URL (이미 lptag 포함) | `isCoupangPartnersUrl` true → 그대로 반환. **활성 유지** (단, KV에 저장된 URL이 lptag 포함해야 함) |
| coupang.com/vp/products (itemId/vendorItemId 있음) | lptag 없으면 변환 불가 → null → **버튼 비활성화** |

### 결론
- lptag 누락 시: **버튼 비활성화** (일반 링크로 열리지 않음). 이번 수정으로 `?? coupangUrl` fallback 제거해 확실히 보장됨.

---

## [7. 최종 판정]

**구조 통과 / 데이터 미완성**

- **구조**: 검색 fallback 제거, coupangUrl 일원화, lptag fallback 제거, KV override 전 구간 적용, 금지 패턴 미발생 → **통과**
- **데이터**: JSON 기준 활성 coupangUrl 0개. KV override로 관리자가 입력한 링크만 실제 활성. → **데이터 미완성**

---

## [8. 마지막 출력]

### 1. 지금 바로 사람이 직접 눌러봐야 할 핵심 페이지 5곳

| 순서 | 페이지 | 확인 항목 |
|------|--------|-----------|
| 1 | `/` (메인) | ProductCard 쿠팡 버튼 "링크 준비중" 표시, 클릭 시 새 탭/이동 없음 |
| 2 | `/product/newcare-all-protein-choco-245` (상세) | PurchaseLinkRow 쿠팡 "링크 준비중", 네이버/공식몰은 정상 링크 |
| 3 | `/ranking` | 랭킹 카드 쿠팡 버튼 "링크 준비중" |
| 4 | `/compare?slugs=newcare-all-protein-choco-245,dr-you-protein-bar-3nuts` | CompareTable 쿠팡 "준비중" |
| 5 | `/recommend` → 퀴즈 완료 후 결과 | 추천 카드 쿠팡 "링크 준비중" |

### 2. 배포 전에 반드시 해결해야 할 리스크 TOP 5

| 순위 | 리스크 | 내용 | 권장 조치 |
|------|--------|------|-----------|
| 1 | **picks 빌드 타임아웃** | 로컬/CI에서 picks 페이지 60초 초과. withProductOverride → getCloudflareContext 호출 | Cloudflare 배포 환경에서 빌드 실행. 또는 picks를 ISR/동적 라우트로 전환 검토 |
| 2 | **활성 coupangUrl 0개** | JSON에 유효 쿠팡 링크 없음. 사용자 클릭 시 전부 "준비중" | 관리자에서 KV override로 우선 제품부터 coupangUrl 등록. 또는 JSON에 itemId/vendorItemId 포함된 쿠팡 URL 추가 |
| 3 | **환경변수 누락** | lptag 미설정 시 모든 변환형 쿠팡 링크 비활성화 | 배포 시 `NEXT_PUBLIC_COUPANG_PARTNERS_TAG` 또는 `COUPANG_PARTNERS_TAG` 필수 설정 확인 |
| 4 | **요거트 Coupang URL 형식** | 4개 productUrl이 짧은 형식(vp/products/숫자만)이라 변환 불가 | 쿠팡 상품 페이지에서 itemId, vendorItemId 포함된 전체 URL로 교체 필요 |
| 5 | **비교 페이지 API 의존** | /api/products/compare 실패 시 getProductBySlug fallback 사용. fallback은 KV override 미반영 | API 장애 시 비교 테이블에 오래된 데이터 노출 가능. 모니터링 및 에러 핸들링 강화 검토 |
