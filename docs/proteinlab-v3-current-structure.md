# ProteinLab v3 Current Structure

조사 일자: 2026-07-14

이번 문서는 ProteinLab v3 작업 전 현재 구현 위치와 중복 가능성을 정리한 기준 문서다. 실제 기능과 UI는 수정하지 않았다.

## 1. GA4 관련 파일

- `app/layout.tsx`
  - `NEXT_PUBLIC_GA_ID`가 있을 때 `https://www.googletagmanager.com/gtag/js`를 로드한다.
  - `gtag('config', GA_ID, { send_page_view: false })`로 자동 page_view를 비활성화한다.
  - 현재 조사 범위에서는 Google Tag Manager 컨테이너 스니펫은 확인되지 않았고, gtag 기반 구현이 중심이다.
- `app/components/AnalyticsPageViewTracker.tsx`
  - `usePathname`, `useSearchParams` 기반으로 라우트 변경을 감지한다.
  - 동일 URL 중복 전송을 방지하고, analytics 준비 전에는 재시도 후 `pageView(url)`를 호출한다.
- `lib/analytics.ts`
  - GA4 이벤트의 중심 helper다.
  - `pageView`, `event`, `productClick`, `outboundClick`, `purchaseClick`, `internalLinkClick`, `adImpression`, `adClick`을 제공한다.
  - 브라우저 gtag가 준비되지 않은 경우 `/api/analytics`로 Measurement Protocol fallback을 보낸다.
- `lib/gtag.ts`
  - 기존 호출 호환용 wrapper다.
  - `purchaseClick`, `event`를 가져와 `trackCoupangClick`, `trackEvent` 형태로 노출한다.
- `app/api/analytics/route.ts`
  - `NEXT_PUBLIC_GA_ID`, `GA4_API_SECRET` 기반 GA4 Measurement Protocol fallback endpoint다.
- `app/lib/ga4.ts`, `app/admin/stats/page.tsx`
  - GA4 리포팅 및 관리자 통계 화면에서 사용되는 영역이다.
- 광고/콘텐츠 보조 측정
  - `components/AdSenseBlock.tsx`
  - `components/GuideAdInjector.tsx`
  - `app/components/CommercialAdSection.tsx`

## 2. 쿠팡 링크 관련 파일

- `app/lib/purchaseLinks.ts`
  - 쿠팡 원본 URL 정규화, 파트너스 redirect href 생성, 알려진 source URL fallback, 네이버 검색 URL, 공식몰 검색 URL 생성을 담당한다.
  - `getCoupangRedirectHref`, `getKnownSourceCoupangUrlBySlug`, `getNaverSearchUrl`, `getOfficialMallUrl` 등이 공통으로 사용된다.
- `app/api/out/coupang/route.ts`
  - `/api/out/coupang` redirect endpoint다.
  - `pageKey`, `itemId`, `vendorItemId`, `slug`, `category`, `debug` query를 처리한다.
  - `COUPANG_ACCESS_KEY`, `COUPANG_SECRET_KEY`, `NEXT_PUBLIC_COUPANG_PARTNERS_TAG`, `NEXT_PUBLIC_COUPANG_PARTNERS_SUB_ID` 환경 변수를 사용한다.
  - 현재 deeplink subId/cache key에는 `category ?? "proteinlab"` 흐름이 있어 프로틴랩/케어맵 분리 설계 시 우선 감사가 필요하다.
- 쿠팡 URL을 보유한 제품 데이터
  - `app/data/drinkProductsData.json`
  - `app/data/barProductsData.json`
  - `app/data/yogurtProductsData.json`
  - `app/data/shakeProductsData.json`
  - `app/data/productOverrideLocal.json`
- 쿠팡 링크 유지보수 스크립트 및 템플릿
  - `scripts/generate-purchase-link-update-template.mjs`
  - `scripts/apply-purchase-link-update-template.mjs`
  - `scripts/sync-purchase-links-from-csv.mjs`
  - `scripts/audit-purchase-link-sync.mjs`
  - `scripts/audit-monetization-coverage.mjs`
  - `scripts/verify-purchase-links.mjs`
  - `scripts/cleanup-purchase-links.mjs`
  - `docs/purchase-link-update-template.csv`
  - `docs/purchase-link-update-template-with-new-products.csv`
  - `docs/protein-drink-coupang-template.csv`

## 3. 제품 데이터 관련 파일

- `app/data/products.ts`
  - 음료, 바, 요거트, 쉐이크 데이터를 모아 `mockProducts`, `getAllProducts`, `getProductBySlug`, `getNutritionDetail` 등을 제공한다.
- 카테고리별 원천 데이터
  - `app/data/drinkProductsData.json`, `app/data/drinkProductsData.ts`
  - `app/data/barProductsData.json`, `app/data/barProductsData.ts`
  - `app/data/yogurtProductsData.json`, `app/data/yogurtProductsData.ts`
  - `app/data/shakeProductsData.json`, `app/data/shakeProductsData.ts`
- `app/lib/productData.ts`
  - async 제품 데이터 로딩, KV/admin override, category filtering 쪽에서 사용된다.
- `app/lib/productDataStatic.ts`
  - 정적 route와 제품 상세에서 사용하는 제품 데이터 helper다.
  - `productOverrideLocal.json`을 적용하고 쿠팡 URL을 정규화한다.
- `app/data/productOverrideLocal.json`
  - 제품별 로컬 override 데이터다. 구매 링크 보정에도 영향을 줄 수 있다.
- `public/products.json`
  - `scripts/generate-products-json.mjs`로 생성되는 공개 제품 데이터 파일이다.
- 이미지/스펙 매핑
  - `app/data/slugToImage.ts`
  - `app/data/slugToDrinkSpec.ts`
  - `app/data/slugToBarSpec.ts`
  - `app/data/slugToYogurtSpec.ts`
  - `app/data/slugToShakeSpec.ts`
  - `app/data/assetSyncConfig.ts`
- 가이드/콘텐츠 데이터
  - `app/data/guidesData.json`
  - `app/data/guidesStaticData.json`
  - `app/lib/adminGuidesStatic.ts`

## 4. 공통 UI 컴포넌트

- 제품 카드 및 리스트
  - `app/components/ProductCard.tsx`
  - `app/components/ScoredProductCard.tsx`
  - `app/components/ProductListWithFilters.tsx`
  - `app/components/CategoryTabs.tsx`
- 구매 버튼/구매처 UI
  - `app/components/PurchaseLinkButton.tsx`
  - `app/components/PurchaseLinkRow.tsx`
  - `app/components/ProductDetailPurchaseActions.tsx`
  - `app/components/MobileStickyBuyButton.tsx`
- 비교/저장 UI
  - `app/components/CompareButton.tsx`
  - `app/components/CompareBar.tsx`
  - `app/components/CompareBarSpacer.tsx`
  - `app/components/CompareSummary.tsx`
  - `app/components/CompareTable.tsx`
- 내부 CTA 및 콘텐츠 전환
  - `app/components/TrackedLink.tsx`
  - `app/components/GuideBuySection.tsx`
  - `app/components/GuideProductStructuredData.tsx`
- 기타 측정/상태
  - `app/components/ProductViewTracker.tsx`
  - `app/components/FavoritesProvider.tsx`
  - `app/components/CompareProvider.tsx`

## 5. 페이지별 개별 구현

- 홈
  - `app/page.tsx`
- 카테고리 페이지
  - `app/drinks/page.tsx`
  - `app/bars/page.tsx`
  - `app/yogurt/page.tsx`
  - `app/shake/page.tsx`
- 제품 상세 페이지
  - `app/product/[slug]/page.tsx`
  - 구매 CTA는 `ProductDetailPurchaseActions`, 하단 고정 CTA는 `MobileStickyBuyButton`, 제품 조회 측정은 `ProductViewTracker`를 사용한다.
- 비교 페이지
  - `app/compare/page.tsx`
  - `app/components/CompareTable.tsx`
  - compare page 자체에서 `event`, `internalLinkClick`을 직접 호출하는 영역이 있다.
- 추천 페이지
  - `app/recommend/page.tsx`
  - `app/recommend/RecommendClient.tsx`
  - `app/api/recommend/route.ts`
- 랭킹 페이지
  - `app/ranking/page.tsx`
  - `app/ranking/RankingClient.tsx`
- 가이드/검색 콘텐츠
  - `app/guides/**`
  - `app/data/guidesData.json`
  - `app/data/guidesStaticData.json`
  - `app/components/GuideBuySection.tsx`
  - `components/GuideAdInjector.tsx`

## 6. 중복 구현 가능성이 있는 항목

- 구매처 링크 표시가 여러 컴포넌트에 나뉘어 있다.
  - `ProductCard`, `ProductDetailPurchaseActions`, `CompareTable`, `GuideBuySection`, `MobileStickyBuyButton`이 각각 구매 CTA를 다룬다.
  - `PurchaseLinkRow`가 공통 기반이지만 placement, tracking, fallback 적용 여부가 호출부마다 달라질 수 있다.
- 구매 클릭 이벤트가 여러 위치에서 직접 호출된다.
  - `ProductCard`, `ProductDetailPurchaseActions`, `MobileStickyBuyButton`에서 `purchaseClick` 호출이 확인된다.
  - 비교표와 가이드 구매 영역은 CTA 위치별 tracking 일관성 감사를 먼저 해야 한다.
- 제품 카드 계열이 분리되어 있다.
  - `ProductCard`와 `ScoredProductCard`가 추천/랭킹/카테고리 전환 흐름에서 서로 다른 동작을 가질 수 있다.
- 제품 데이터 경로가 정적/비동기/admin override로 갈라져 있다.
  - `app/data/products.ts`, `app/lib/productData.ts`, `app/lib/productDataStatic.ts`, `productOverrideLocal.json`, `public/products.json` 사이의 반영 순서가 다를 수 있다.
- GA4 helper가 `lib/analytics.ts`와 `lib/gtag.ts`로 나뉘어 있다.
  - 신규 이벤트 설계 시 둘 중 어느 API를 표준으로 삼을지 결정해야 한다.
- 내부 CTA 측정이 공통 컴포넌트와 페이지 직접 호출로 섞여 있다.
  - `TrackedLink`와 `app/compare/page.tsx`의 직접 `internalLinkClick` 호출을 함께 감사해야 한다.
- 가이드/콘텐츠 전환 CTA가 콘텐츠 파일, 페이지 컴포넌트, `GuideBuySection`에 흩어져 있을 수 있다.

## 7. 향후 수정 시 주의할 사항

- 현재는 GTM 컨테이너가 아니라 gtag 중심으로 보인다. GTM 도입 또는 이벤트 재설계 전에는 중복 page_view와 이벤트 이중 전송 여부를 먼저 확인해야 한다.
- `app/layout.tsx`에서 `send_page_view: false`를 사용하고 있으므로 page_view 작업은 `AnalyticsPageViewTracker`의 dedupe 로직과 함께 검수해야 한다.
- 프로틴랩과 케어맵 쿠팡파트너스 실적 분리는 링크 교체보다 먼저 subId, category, redirect endpoint, cache key 설계를 확정해야 한다.
- 쿠팡 파트너스 deeplink는 원본 상품 URL 품질에 영향을 받는다. 단순 검색 URL fallback은 구매 전환 측정 관점에서 한계가 있으므로 매핑 데이터 구축 시 상품 URL과 검색 URL을 구분해야 한다.
- 구매 CTA 변경은 제품 카드, 제품 상세, 비교표, 가이드 추천 영역, 모바일 고정 버튼을 동시에 깨뜨릴 수 있다.
- `npm run build` 과정에서 `public/products.json` 같은 생성 파일이 갱신될 수 있다. 의도한 변경이 아니면 커밋 대상에서 제외해야 한다.
- 기존 작업 전부터 `.claude/settings.local.json`, `coupang_url_input.xlsx`가 작업트리에 남아 있었다. PLV3 작업과 직접 관련이 없으면 수정하지 않는다.
- PowerShell 출력에서 한글이 깨져 보이는 파일이 있다. 실제 파일 수정 시 UTF-8 인코딩을 유지하고, 표시 깨짐만 보고 문구를 재작성하지 않는다.
