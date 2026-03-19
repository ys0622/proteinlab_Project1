# 구매 링크 검증 결과

**검증 일시**: 2025-03-07  
**검증 스크립트**: `scripts/verify-purchase-links.mjs`

## 검증 대상

- 쿠팡 / 네이버 / 공식몰 버튼

## 확인 항목

| 항목 | 검증 내용 |
|------|-----------|
| 버튼 href | productOverrideLocal.json + base product 병합 후 최종 href |
| 정상 URL 여부 | 쿠팡: vp/products+itemId/vendorItemId 또는 link.coupang.com |
| | 네이버: smartstore/shopping 상품 상세 (search 제외) |
| | 공식몰: 브랜드 공식몰 상품 상세 |
| 새 탭 여부 | PurchaseLinkButton: `target="_blank"` `rel="noopener noreferrer"` |
| 잘못된 페이지 이동 | np/search, search.shopping, 메인페이지 금지 |
| 빈 링크 클릭 | null/"#"/"" → span 비활성화, "링크 준비중" 표시 |

## 검증 결과

- **정상 동작 제품 수**: 220 / 220
- **링크 1개 이상 있는 제품**: 17개 (공식몰 officialUrl)
- **모든 링크 null (비활성화 정상)**: 203개

## 문제 있는 제품

없음

## 즉시 수정 필요

없음

## 추가 적용 사항

- `#` / `""` href 필터링: ProductCard, 상세, CompareTable, PurchaseLinkButton
- PurchaseLinkButton: `hasValidHref`로 빈 링크 시 span 렌더링
