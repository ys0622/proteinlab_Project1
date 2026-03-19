# 쿠팡 링크 구조 검수 보고서

## [1. 검색 fallback 제거 여부]

### 1) 문자열 검색 결과
- `coupang.com/np/search`: **없음** (실제 URL 생성 코드 없음. purchaseLinks.ts 179행은 np/search **검출 시 거부**용)
- `getCoupangSearchUrl`: **없음** (제거됨. docs에만 "제거됨" 기록)
- `search?q=`: **있음** - `getNaverSearchUrl` (purchaseLinks.ts 212행) - 네이버 검색용, 쿠팡 아님

### 2) fallback 로직 확인
- `getPreferredCoupangUrl`: coupangUrl 없거나 유효하지 않으면 **null 반환** (185행)
- 검색 URL 생성/반환 로직 **없음**

**결과: 통과**

---

## [2. 링크 사용 필드 일원화 여부]

### 1) 패턴 검색 결과
- `coupangUrl ?? productUrl`: **1건** - `app/admin/products/[slug]/edit/page.tsx` 456행 (관리자 입력 필드 표시용 fallback - 저장은 coupangUrl)
- `product.productUrl`: 쿠팡 버튼 로직에서 **사용 안 함** (상세 페이지 83-85행은 `product.coupangUrl`만 사용)

### 2) 컴포넌트별 확인
| 컴포넌트 | 쿠팡 버튼 참조 필드 | 비고 |
|----------|---------------------|------|
| ProductCard | `coupangUrl` (79행) | productUrl 미사용 |
| 상세 페이지 | `product.coupangUrl` (84행) | productUrl 미사용 |
| ScoredProductCard | `{...product}` → ProductCard | product에 coupangUrl 포함 시 사용 |
| PurchaseLinkRow | `coupangHref: string \| null` | 호출부에서 전달 |
| CompareTable | `p.coupangUrl` (103행) | productUrl 미사용 |

### 3) productUrl 잔존
- **관리자 edit**: `product.coupangUrl ?? product.productUrl` - 입력 필드 초기값용 (기존 데이터 마이그레이션)
- **데이터 로더**: `withCoupangUrl`에서 productUrl이 Coupang일 때 coupangUrl로 마이그레이션
- **JSON**: productUrl 필드 유지 (다른 용도 가능), 쿠팡 버튼은 coupangUrl만 사용

**결과: 통과**

---

## [3. 유효성 검증 로직 점검]

### 1) 구현 여부
- `isValidCoupangLink` (purchaseLinks.ts 169-189행) 존재

### 2) 정상 링크 처리
- `link.coupang.com`: **유효** (174행)
- `coupang.com/vp/products/` + itemId + vendorItemId: **유효** (175-177행)
- `lptag`는 **변환 출력**에 포함 (buildCoupangPartnersProductUrl 154행). 입력 URL에 lptag 필수 아님.

### 3) 비정상 링크 처리
- `coupang.com/np/search`: **무효** + console.warn (179-183행)
- itemId/vendorItemId 없는 일반 쿠팡 URL: **무효** (getCoupangProductParams null)

### 4) 콘솔 경고
- np/search 포함 시 `console.warn` 출력 (181행)

**결과: 통과**

---

## [4. 링크 없는 제품 처리]

### 1) UI 처리
- PurchaseLinkRow: `coupangHref` null 시 "링크 준비중" / "준비중" (27-28행)
- PurchaseLinkButton: href 없으면 `<span>` 비활성 스타일 (33-41행)
- CompareTable: coupangHref null 시 "준비중" span (141-146행)

### 2) 기대 동작 충족
- 버튼 비활성화: **충족**
- "링크 준비중" 표시: **충족**
- 검색 링크로 이동: **없음** (null 반환만)

**결과: 통과**

---

## [5. KV override 반영 범위]

### 1) 반영 위치
| 위치 | withProductOverride 적용 | 비고 |
|------|--------------------------|------|
| 상세 페이지 | **O** (44, 56행) | |
| 제품 리스트 (/) | **O** (page.tsx 15행) | |
| 제품 리스트 (/bars) | **O** (bars/page.tsx 21행) | |
| 랭킹 페이지 | **O** (ranking/page.tsx) | 패치 적용됨 |
| 추천 (API) | **O** (api/recommend/route.ts) | 패치 적용됨 |
| 비교 테이블 | **O** (api/products/compare) | 패치 적용됨 |
| picks 큐레이션 | **O** (picks/[slug]/page.tsx) | 패치 적용됨 |

### 2) 데이터 흐름
```
JSON (drinkProductsData 등) 
  → getDrinkProducts() [withCoupangUrl 마이그레이션]
  → mockProducts / barProductsWithGrades
  → page.tsx: Promise.all(products.map(withProductOverride))  [홈, bars]
  → product/[slug]: withProductOverride(base)  [상세]
  → 랭킹: Promise.all(products.map(withProductOverride))  [패치]
  → 추천 API: productsWithOverride 적용 후 응답  [패치]
  → 비교: GET /api/products/compare?slugs=... → withProductOverride  [패치]
  → picks: Promise.all(filtered.map(withProductOverride))  [패치]
```

**결과: 통과** (수정 완료) - 랭킹, 추천, 비교, picks에 withProductOverride 적용됨

---

## [6. CompareTable 검수]

### 1) 링크 대상
- 쿠팡: `coupangHref` (getPreferredCoupangUrl) → **실제 외부 링크** (132-139행)
- 네이버: `naverHref` (getNaverSearchUrl) → **실제 외부 링크** (147-156행)
- 공식몰: `officialHref` (getOfficialMallUrl) → **실제 외부 링크** (158-167행)

### 2) 상세 페이지 링크 여부
- **아님** - 모두 target="_blank" rel="noopener noreferrer"로 외부 링크

**결과: 통과**

---

## [7. 실제 데이터 상태 점검]

### JSON 기준 집계
| 카테고리 | 전체 | coupangUrl 있음 | coupangUrl 없음 | productUrl "#" |
|----------|------|-----------------|-----------------|----------------|
| 음료 | 104 | 0 | 104 | 104 |
| 바 | 71 | 0 | 71 | 71 |
| 요거트 | 45 | 0* | 45 | 0 |
| **합계** | **220** | **0** | **220** | **175** |

*요거트 4개는 productUrl이 Coupang URL이나 itemId/vendorItemId 없어 isValidCoupangLink false → 실질적 coupangUrl 0개

### 비정상/placeholder
- drinkProductsData.json, barProductsData.json: `productUrl: "#"` 175개
- yogurtProductsData.json: productUrl 다양 (Coupang 4, 11번가, 공식몰 등)

**결과: 통과** (데이터 상태만 보고, 로직은 정상)

---

## [8. 환경변수 점검]

### 1) 참조 변수 (purchaseLinks.ts 54-61행)
```typescript
COUPANG_PARTNERS_TAG =
  process.env.NEXT_PUBLIC_COUPANG_LPTAG ||
  process.env.COUPANG_LPTAG ||
  process.env.NEXT_PUBLIC_COUPANG_PARTNERS_TAG ||
  process.env.COUPANG_PARTNERS_TAG || "";

COUPANG_PARTNERS_SUB_ID =
  process.env.NEXT_PUBLIC_COUPANG_PARTNERS_SUB_ID || process.env.COUPANG_PARTNERS_SUB_ID || "proteinlab";
```

### 2) 사용 방식
- 4가지 lptag 변수 지원
- 2가지 subId 변수 지원
- 클라이언트 노출 필요 시 `NEXT_PUBLIC_` 접두사 사용

**결과: 통과**

---

## [9. 최종 샘플 검증]

| 제품명 | 참조 필드 | 최종 URL | 파트너스 유효 | UI 상태 |
|--------|-----------|----------|---------------|---------|
| 뉴케어 올프로틴 (초콜릿) | coupangUrl | null | N | 비활성(준비중) |
| 닥터유 프로 단백질바 (3넛츠) | coupangUrl | null | N | 비활성(준비중) |
| 요프로 프로틴 플레인 150g | coupangUrl (productUrl 마이그레이션) | null* | N | 비활성(준비중) |
| (KV에 coupangUrl 저장된 제품) | coupangUrl | link.coupang.com/... | Y | 활성 |
| (동일, 상세 페이지) | product.coupangUrl | link.coupang.com/... | Y | 활성 |

*요거트 Coupang productUrl은 itemId/vendorItemId 없어 변환 불가 → null

---

## [10. 최종 판정]

**통과** - 핵심 수정 완료. KV override 미적용 구간 모두 패치 적용됨

---

## 즉시 수정 필요한 항목 TOP 5 (모두 수정 완료)

1. ~~랭킹 페이지에 withProductOverride 적용~~ → **완료** (`app/ranking/page.tsx`)
2. ~~비교 페이지에 withProductOverride 적용~~ → **완료** (`app/compare/page.tsx` + `app/api/products/compare/route.ts` 신규)
3. ~~picks 큐레이션에 withProductOverride 적용~~ → **완료** (`app/picks/[slug]/page.tsx`)
4. ~~추천 API에 withProductOverride 적용~~ → **완료** (`app/api/recommend/route.ts`)
5. ~~추천 API 응답에 coupangUrl 포함~~ → **완료** (`app/api/recommend/route.ts`, `app/recommend/RecommendClient.tsx`)

---

## 적용된 패치 요약

| 파일 | 변경 내용 |
|------|-----------|
| `app/ranking/page.tsx` | async, mockProducts/barProductsWithGrades/yogurtProductsWithGrades에 withProductOverride 적용 |
| `app/api/products/compare/route.ts` | 신규. GET ?slugs=... → withProductOverride 적용 제품 반환 |
| `app/compare/page.tsx` | useEffect로 /api/products/compare 호출, KV override 반영 |
| `app/picks/[slug]/page.tsx` | filtered.map(withProductOverride) 적용 |
| `app/api/recommend/route.ts` | selectedProducts에 withProductOverride 적용, topProducts에 coupangUrl 추가 |
| `app/recommend/RecommendClient.tsx` | RecommendedProduct에 coupangUrl, toRecommendationCardProduct에 coupangUrl 전달 |
