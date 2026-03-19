# 쿠팡 링크 구조 변경 결과 리포트

## 1. 수정된 파일 목록

| 파일 | 변경 내용 |
|------|-----------|
| `app/lib/purchaseLinks.ts` | getCoupangSearchUrl 제거, getPreferredCoupangUrl 시그니처 변경 (coupangUrl만, null 반환), isValidCoupangLink 추가 |
| `app/components/PurchaseLinkRow.tsx` | coupangHref: string \| null, null 시 "링크 준비중" 표시 |
| `app/components/ProductCard.tsx` | coupangUrl만 사용, productUrl 의존 제거, detailHref fallback |
| `app/product/[slug]/page.tsx` | getPreferredCoupangUrl(product.coupangUrl, ...) |
| `app/components/CompareTable.tsx` | 실제 구매 링크 사용 (쿠팡/네이버/공식몰), coupangUrl 없으면 "준비중" |
| `app/data/drinkProductsData.ts` | withCoupangUrl 마이그레이션 (productUrl이 Coupang일 때 coupangUrl 설정) |
| `app/data/barProductsData.ts` | 동일 |
| `app/data/yogurtProductsData.ts` | 동일 |
| `app/page.tsx` | withProductOverride 적용 |
| `app/bars/page.tsx` | withProductOverride 적용 |
| `app/admin/products/[slug]/edit/page.tsx` | productUrl → coupangUrl 필드로 변경 |

## 2. search fallback 제거 확인

- **getCoupangSearchUrl**: 완전 제거됨 (코드베이스 내 참조 0건)
- **np/search**: `isValidCoupangLink`에서 np/search 포함 시 false 반환 + console.warn
- **getPreferredCoupangUrl**: 검색 URL 생성하지 않음. coupangUrl이 없거나 유효하지 않으면 `null` 반환

## 3. coupangUrl 유효 조건

```typescript
// app/lib/purchaseLinks.ts - isValidCoupangLink
- link.coupang.com 포함 → 유효
- coupang.com/vp/products + pageKey + itemId + vendorItemId → 유효 (파트너스 변환 가능)
- np/search 포함 → 무효 (console.warn)
- 그 외 → 무효
```

## 4. coupangUrl 없는 상품 현황

### JSON 데이터 기준

- **단백질 음료** (`drinkProductsData.json`): 104개 전부 `productUrl: "#"` → coupangUrl 없음
- **단백질 바** (`barProductsData.json`): 71개 전부 `productUrl: "#"` → coupangUrl 없음
- **그릭요거트** (`yogurtProductsData.json`): 45개 중
  - `productUrl`이 Coupang URL인 경우 4개: `yopro-plain-150`, `yopro-blueberry-150`, `yoplait-protein-blueberry-100`, 등
  - 단, `productUrl` 형식이 `https://www.coupang.com/vp/products/12345` (itemId/vendorItemId 없음)이므로 파트너스 변환 불가 → `isValidCoupangLink` false → **실질적으로 유효한 coupangUrl 없음**

### 결론

- **전체 220개 제품** 중 유효한 coupangUrl을 가진 제품: **0개**
- 관리자 페이지에서 coupangUrl을 입력하면 KV override로 저장되며, 제품 목록/상세에 반영됨

## 5. 다음 단계

1. `.env.local`에 `NEXT_PUBLIC_COUPANG_LPTAG` 설정 (쿠팡파트너스 lptag)
2. 관리자 페이지에서 각 제품별 쿠팡 구매 링크(coupangUrl) 입력
   - 형식: `https://link.coupang.com/a/...` (파트너스 링크) 또는 `https://www.coupang.com/vp/products/12345?itemId=...&vendorItemId=...` (파트너스 변환 가능)
3. 쿠팡 파트너스 간편 링크 만들기에서 상품 URL 생성 후 입력
