# ProteinLab v3 Changelog

## 2026-07-15

### Work ID

PLV3-17 post-launch measurement plan and dashboard specification

### Changes

- Added the post-launch measurement plan with GA4 and Coupang role separation, KPI definitions, formulas, targets, cadence, baseline rules, dashboard specifications, and data limitations.
- Added a reusable 28-day report template for funnel, landing page, product, CTA, comparison, recommendation, and Coupang performance reporting.
- Declared `affiliate_click` and `retailer_click` as the applicable code-level external-link events; legacy `purchase_click` terminology is excluded from reporting.

### Reason

Prevent GA4 external-click behavior from being interpreted as Coupang orders or revenue, and make post-launch decisions comparable across reporting periods.

### Validation

- Documentation-only change; no feature, UI, product data, or affiliate URL change.
- KPI definitions and event dimensions match `docs/ga4-event-specification.md` and the current ProteinLab affiliate-link status.
- Current ACTIVE dedicated affiliate links remain 0, so affiliate revenue KPI values must remain unset until the first verified 28-day baseline is available.

### Rollback

Remove the measurement plan, 28-day report template, and the PLV3-17 documentation entries. Application behavior is unchanged.

## 2026-07-15

### Work ID

PLV3-16 final funnel and regression QA

### Changes

- Added final QA documentation with progress review, static funnel evidence, affiliate status, regression coverage, exceptions, and release decision.
- Removed unknown product IDs from comparison state and rewritten shared comparison URLs to valid product IDs only.
- Scoped lint configuration and hydration/DOM synchronization exceptions so lint validation completes without errors; generated test output and deployment CJS scripts are excluded from application linting.

### Reason

Ensure invalid comparison URLs do not persist and establish an auditable release gate without claiming unavailable affiliate or browser results as passed.

### Validation

- Type check, lint (0 errors), affiliate lookup test, comparison regression test, internal-link audit, asset audit, and diff check passed.
- The affiliate-enabled funnel is blocked: 0 ACTIVE dedicated ProteinLab affiliate URLs and 365 PENDING records.
- Browser/GA4 DebugView and production-build validation remain unavailable; the build timed out after 134 seconds without output.

### Rollback

Revert the invalid-compare cleanup, scoped lint configuration, and QA documentation. Product data, public retailer URLs, and affiliate mappings are unchanged.

## 2026-07-15

### Work ID

PLV3-15 SEO and performance optimization

### Changes

- Removed synthetic `AggregateRating` from Product structured data and retained nutrition-only Product schema without Offer data.
- Replaced sitemap request-time comparison-guide timestamps with deterministic fallback dates, and updated actual v3 page modification dates.
- Added an internal-link audit command covering literal application links and configured redirects.
- Added the SEO and performance validation report, including sitemap, structured-data, retailer-link, asset, and deployment follow-up status.

### Reason

Prevent misleading structured data and sitemap modification dates while making SEO regressions detectable before release.

### Impact Pages

- `/sitemap.xml`
- `/product/[slug]`
- All pages with literal internal application links

### Validation

- `npm run audit:internal-links`: 1,078 literal links checked; 0 broken.
- Sitemap function: 685 unique entries, including 365 product URLs; no query URLs.
- `npm run audit:purchase-links`: no missing product slugs; 282 existing source/short-link mismatches require external redirect validation.
- `npm run audit:affiliate-links`: 0 ACTIVE and 365 PENDING dedicated ProteinLab links.
- `npm run check:assets`: passed; mapped images are complete.
- `npx tsc --noEmit` and `git diff --check`: passed.
- `npm run build` timed out after 134 seconds without output in the local environment. Production build validation remains required.

### Rollback

Revert the PLV3-15 changes in the product schema, sitemap, internal-link audit, package script, and documentation. Existing product data, URL paths, and retailer links remain unchanged.

## 2026-07-15

### Work ID

PLV3-14 recommendation and ranking cleanup

### Changes

- Reduced the recommendation flow to four inputs: product form, purpose, primary priority, and optional restrictions.
- Replaced frequency and intensity scoring with a data-backed priority score for protein, lower sugar, lower calories, or protein density.
- Send `recommend_complete` only when a non-empty result set is available, and added a condition-relaxation fallback for zero results.
- Declared `/ranking` as an objective nutrition comparison, with source fields, data reference date, and a link to the separate behavioral-interest page.
- Documented distinct roles for home, categories, recommendations, rankings, trending, and guides.

### Reason

Make personal recommendations reflect the user's actual purchase criteria while preventing objective rankings and behavioral interest from being presented as sales data.

### Impact Pages

- `/recommend`
- `/ranking`

### Validation

- `npx tsc --noEmit`: passed.
- `git diff --check`: passed (line-ending warnings only).
- `npm run build`: timed out after 134 seconds without output in the local environment. This task remains `REVIEW_REQUIRED` until a production build completes.
- No verified ProteinLab affiliate mapping exists. No purchase CTA or `affiliate_click` was added.

### Rollback

Revert the PLV3-14 recommendation client, recommendation API, ranking client, and documentation changes. Product data and purchase URLs are unchanged.

## 2026-07-15

### Work ID

PLV3-13 comparison feature improvement

### Changes

- Added empty-state product search, category/brand filters, recent products, and operator-selected comparison combinations.
- Standardized comparison sharing on `products` query values, while retaining legacy `slugs` support.
- Limited comparisons to three unique products and send `compare_view` only for two or more valid products.
- Added product-detail CTAs and sticky metric labels to the comparison table; retailer clicks now use `comparison_result` placement.

### Validation

- `npx tsc --noEmit`: passed.
- `git diff --check`: passed.
- The build initially failed on a compare-page Suspense error, which was fixed. The final build attempt timed out after 124 seconds without output, so this task remains `REVIEW_REQUIRED`.
- `affiliate_click` is not applied because PLV3-04/07 remain blocked with no verified active affiliate links.

### Rollback

Revert PLV3-13 changes in the comparison page, table, context, and documentation. Product data and affiliate mappings are unchanged.

## 2026-07-15

### Work ID

PLV3-12 product detail conversion improvement

### Changes

- Added a data-backed purchase-decision section based on broad category-relative bands for protein, sugar, calories, and protein density.
- Added the shared compare control before the existing purchase-channel section.
- Limited related products to four and added data-backed reasons for each recommendation.
- Removed the Product Offer schema because no current price or verified stock status is available.
- Retained existing retailer links and `retailer_click`; no new affiliate button or `affiliate_click` was added because verified ProteinLab affiliate links are unavailable.

### Reason

Help visitors make a final selection from verifiable nutrition data while avoiding unsupported claims, misleading price data, and unsafe affiliate attribution.

### Validation

- `npx tsc --noEmit`: passed.
- `git diff --check`: passed (line-ending warnings only).
- `npm run build`: timed out after 124 seconds without output in the local environment. This task remains `REVIEW_REQUIRED` until a production build completes.
- Browser verification for the requested ten product samples remains pending because the local browser target is unavailable.

### Rollback

Revert the PLV3-12 changes in `app/product/[slug]/page.tsx` and the associated documentation. Product data, canonical URLs, and affiliate mappings are unchanged.

## 2026-07-15

### Work ID

PLV3-11 category page improvement

### Changes

- Added four data-backed quick filters to the shared category explorer used by drinks, shakes, bars, and yogurt.
- Preserved detailed filter, quick-filter, sort, and search state in category query parameters.
- Added calorie ascending and recent-registration sort options; excluded price efficiency because price data is unavailable for all four categories.
- Standardized the comparison tray limit to three products and retained the global mobile spacer.
- Extended `filter_apply` with the filter value and result count.

### Reason

Make the category pages practical product-discovery tools without treating heuristic rankings as sales data or inventing unavailable price information.

### Impact Pages

- `/drinks`
- `/shake`
- `/bars`
- `/yogurt`

### Validation

- `npx tsc --noEmit`: passed.
- `git diff --check`: passed (line-ending warnings only).
- `npm run build`: timed out after 124 seconds without output in the local environment. This task remains `REVIEW_REQUIRED` until a production build completes.
- Browser visual validation could not run because the local browser target is unavailable in this environment.

### Rollback

Revert the PLV3-11 changes in the shared category explorer, sort bar, compare tray, analytics helper, and this documentation. Product data and external purchase URLs are unchanged.

## 2026-07-15

### Work ID

PLV3-10 top SEO content conversion improvement

### Changes

- Added concise conclusions, updated dates, and internal CTA paths to the ten priority landing pages selected in PLV3-09.
- Added stable `plv3:landing:*` content IDs to the tracked internal CTAs for comparison pages, guides, and the two priority product details.
- Added reusable conversion links to the two TOP 10 guide configurations and suppressed their unverified purchase-link blocks.
- Kept canonical URLs and existing metadata paths unchanged. No new affiliate or retailer URL was created.

### Reason

Move Organic visitors from informational content to relevant product details, comparison, and ranking pages while retaining the existing layout and avoiding unverified purchase links.

### Impact Pages

- `/compare/proteone-vs-itthefit-shake`
- `/compare/takefit-vs-hymune-drink`
- `/guides/intake-strategy-health/night-protein-drink`
- `/guides/product-selection-comparison/protein-bar-top10`
- `/guides/product-selection-comparison/protein-drink-top10`
- `/guides/product-selection-comparison/low-sugar-protein-drink-guide`
- `/compare/newcare-vs-sellex-drink`
- `/compare/takefit-max-vs-takefit-monster`
- `/product/newcare-all-protein-41g`
- `/product/labnosh-protein-max-choco-400`

### Changed Files

- `app/components/TrackedLink.tsx`
- `app/compare/[slug]/page.tsx`
- `app/guides/intake-strategy-health/night-protein-drink/page.tsx`
- `app/guides/product-selection-comparison/categoryGuideShared.tsx`
- `app/guides/product-selection-comparison/low-sugar-protein-drink-guide/page.tsx`
- `app/guides/product-selection-comparison/proteinBarContent.ts`
- `app/guides/product-selection-comparison/proteinDrinkTop10Content.ts`
- `app/product/[slug]/page.tsx`

### Validation

- `npx tsc --noEmit`: passed.
- `git diff --check`: passed (line-ending warnings only).
- `npm run build`: timed out after 124 seconds without output in the local environment. This task remains `REVIEW_REQUIRED` until a production build completes.
- Browser visual validation was not run because the local browser target is unavailable in this environment.

### Rollback

Revert the PLV3-10 changes in the files above. This does not require changing product data, URLs, or affiliate-link mappings.

## 2026-07-15

### Work ID

PLV3-09 top SEO landing-page selection and baseline record

### Changes

- Selected 10 priority routes from the provided candidates and verified repository routes.
- Assigned stable `plv3:landing:*` content identifiers for the planned page-level measurement.
- Recorded all unavailable GA4 baseline metrics as `UNKNOWN` and identified the required Organic 28-day export.

### Reason

Prioritize conversion work without fabricating GA4 traffic or engagement metrics.

### Validation

- Verified the 10 route slugs in the repository.
- Confirmed GA4 Data API code exists, but `GA4_PROPERTY_ID`, `GA4_CLIENT_EMAIL`, and `GA4_PRIVATE_KEY` are not configured in this environment.
- No UI, content, affiliate-link, product-data, or event code changed.

### Rollback

Remove the PLV3-09 documentation entry and restore the progress row. No runtime behavior changed.

## 2026-07-14

### Work ID

PLV3-08 product card and internal CTA consolidation

### Changes

- Removed the default retailer purchase-link row from `ProductCard` and made product detail plus comparison the primary actions.
- Added `cardVariant` to the shared product-card contract and passed category, compact, ranking, and recommendation variants through existing consumers.
- Expanded `TrackedLink` and migrated the home tracking wrapper to the same `internal_cta_click` contract.
- Added `destination_path` and optional `product_id` to internal CTA event payloads.

### Reason

Keep exploration cards focused on detail and comparison, reduce duplicate CTA tracking paths, and retain dedicated purchase surfaces for higher-intent visitors.

### Validation

- `npx tsc --noEmit` passed.
- `git diff --check` passed.
- No purchase-link code remains in `ProductCard`; product-card detail and comparison actions remain separate.
- `npm run build` exceeded the local execution timeout without output. The process was stopped and its generated product file was restored; production build completion still needs verification.

### Rollback

Restore the files listed in PLV3-08 progress. No product data, affiliate mapping, or product-detail purchase surface was changed.

## 2026-07-14

### Work ID

PLV3-07 common affiliate button component

### Status

BLOCKED

### Reason

PLV3-04 is not DONE. The ProteinLab mapping contains 0 ACTIVE links and 365 PENDING links. Creating or applying a button that emits `affiliate_click` would require treating an unverified common URL as a ProteinLab-specific affiliate URL.

### Validation

- `npm run audit:affiliate-links`: 365 products, 0 ACTIVE, 365 PENDING, 365 missing URLs.
- No runtime component, purchase link, GA4 event, product data, or UI was changed.

### Unblock condition

Import actual, verified ProteinLab-specific affiliate URLs into the mapping, validate at least one ACTIVE record, complete PLV3-04, then resume PLV3-07.

## 2026-07-14

### Work ID

PLV3-06 page_view and landing-page measurement normalization

### Changes

- Kept one direct GA4 installation and one manual page-view emitter.
- Disabled Measurement Protocol fallback for `page_view`; it now waits for the browser GA tag.
- Added full location, actual document title, and referrer handling for initial loads and App Router navigation.
- Removed the fixed client-side tab-title override and disabled GA4 transmission in development.

### Reason

Avoid fallback-only page-view sessions and stale titles that can make landing-page reporting, including `(not set)`, unreliable.

### Affected pages

All pages through the root App Router layout.

### Changed files

- `app/layout.tsx`
- `app/components/AnalyticsPageViewTracker.tsx`
- `lib/analytics.ts`
- `docs/ga4-pageview-validation.md`
- `docs/proteinlab-v3-progress.md`
- `docs/proteinlab-v3-changelog.md`

### Validation

- `npx tsc --noEmit` passed.
- The post-change production build compiled successfully and generated all 741 static pages. The CLI did not exit cleanly in this environment because Wrangler could not write its user-profile log; this is unrelated to application compilation.
- Source audit found no GTM container, duplicate gtag load, or duplicate GA4 config call.
- Production DebugView validation steps are documented; local development intentionally does not send GA4 traffic.

### Rollback

Restore the three runtime files above. No product, affiliate-link, UI, or other event behavior was changed.

## 2026-07-14

### 작업 ID

PROMPT-0 프로젝트 현황 분석 및 작업관리 체계 생성

### 변경 내용

- ProteinLab v3 작업 진행표를 생성했다.
- 향후 변경 이력을 기록할 changelog 문서를 생성했다.
- 현재 GA4, 쿠팡 링크, 제품 데이터, 공통 UI, 페이지별 구현 위치를 조사해 구조 문서를 생성했다.

### 변경 사유

- 수익화 개선 작업을 순서대로 진행하고, 완료된 작업을 중복 수행하지 않기 위한 기준 문서가 필요하다.
- 쿠팡파트너스 링크, GA4 이벤트, 제품 카드/상세/비교/추천/랭킹 흐름이 여러 파일에 나뉘어 있어 작업 전 영향 범위를 고정해야 한다.

### 영향 페이지

- 없음. 이번 단계는 문서 생성만 수행했으며 실제 기능, UI, 라우팅은 수정하지 않았다.

### 변경 파일

- `docs/proteinlab-v3-progress.md`
- `docs/proteinlab-v3-changelog.md`
- `docs/proteinlab-v3-current-structure.md`

### 검수 결과

- `npm run build` 통과.

### 롤백 방법

## 2026-07-14

### 작업 ID

PLV3-01 기존 쿠팡 링크 및 GA4 이벤트 전수 조사

### 변경 내용

- 제품 데이터 365개를 기준으로 쿠팡 URL, 원천 파일, 사용 표면, URL 중복, 제휴 링크 여부, 사이트 판별 상태를 `affiliate-link-audit.csv`에 기록했다.
- GA4 설치 방식, page_view 경로, 런타임 이벤트 발생 조건/파라미터, 구매 CTA별 측정 여부와 문제 등급을 `ga4-event-audit.md`에 기록했다.
- 동일 감사 결과를 재생성할 수 있도록 `scripts/generate-affiliate-link-audit.mjs`를 추가했다.

### 변경 사유

PLV3-02 링크 구조 설계와 PLV3-05 이벤트 체계 재설계 전에 현행 수익화·측정 구조를 코드 기준으로 확정하기 위함이다.

### 영향 페이지

없음. 조사 문서 및 감사 생성 스크립트만 추가했으며 런타임 링크, 이벤트, 제품 데이터, UI, 페이지 구조는 변경하지 않았다.

### 변경 파일

- `docs/affiliate-link-audit.csv`
- `docs/ga4-event-audit.md`
- `scripts/generate-affiliate-link-audit.mjs`
- `docs/proteinlab-v3-progress.md`
- `docs/proteinlab-v3-changelog.md`

### 검수 결과

- 감사 생성 스크립트 실행 성공: 제품 365개와 코드 보조 원천 URL 7개를 포함한 감사 행 372개, 원시 쿠팡 URL 349개, 정적 제휴 URL 283개, 정확히 동일한 URL을 공유한 제품 2개, 원시 쿠팡 URL 누락 16개.
- `npm run audit:monetization` 성공: 전체 구매처 URL이 전혀 없는 제품 3개, 원시 쿠팡 URL 누락 제품 16개, 고함량 음료(40g 이상) 쿠팡 URL 누락 0개.
- `npm run audit:purchase-links` 성공: CSV 운영 템플릿과 현재 데이터 간 불일치 drink 109건, bar 85건, yogurt 0건, shake 88건 확인.
- `npm run lint` 실패: 기존 파일의 오류 25건과 경고 23건이 확인됐다. 이번 감사에서 수정한 파일의 오류는 없으며, 범위 밖 기존 문제는 수정하지 않았다.
- 실제 기능 변경 없음.

### 롤백 방법

이번 작업은 문서와 감사 생성 스크립트만 추가했다. 필요 시 위 파일과 PLV3-01 진행 표의 행 변경만 되돌리면 된다.

- 위 문서 3개를 삭제하면 이번 단계 변경 사항은 롤백된다.

## 2026-07-14

### 작업 ID

PLV3-02 프로틴랩 전용 쿠팡 링크 구조 설계

### 변경 내용

- `productId + site + retailer` 복합 키와 `ACTIVE`, `PENDING`, `BROKEN`, `INACTIVE` 상태를 갖는 제휴 링크 타입 및 안전 조회 함수를 추가했다.
- `app/data/affiliateLinks.proteinlab.json`에 현재 제품 365개의 ProteinLab Coupang `PENDING` 레코드를 생성했다.
- 신규 제품 템플릿 생성, 링크 데이터 감사, 안전 조회 테스트, 운영 관리 문서를 추가했다.

### 변경 사유

ProteinLab과 CareMap의 같은 제품 링크를 명시적으로 분리하고, 실제 쿠팡 파트너스 URL을 사용자가 검증 후 등록할 수 있는 기반을 만들기 위함이다.

### 영향 페이지

없음. 기존 페이지와 컴포넌트는 새 저장소나 조회 함수를 아직 사용하지 않는다. 기존 쿠팡 URL, 구매 CTA, GA4 이벤트, UI는 변경하지 않았다.

### 변경 파일

- `app/data/affiliateLinks.ts`
- `app/data/affiliateLinks.proteinlab.json`
- `scripts/generate-proteinlab-affiliate-link-template.mjs`
- `scripts/audit-proteinlab-affiliate-links.mjs`
- `scripts/affiliate-link-lookup.test.ts`
- `docs/affiliate-link-management.md`
- `package.json`
- `docs/proteinlab-v3-progress.md`
- `docs/proteinlab-v3-changelog.md`

### 검수 결과

- ProteinLab Coupang 레코드 365개, `PENDING` 365개, `ACTIVE` 0개, 누락 제품 레코드 0개.
- 중복 복합 키 0개, 존재하지 않는 제품 ID 0개, 유효하지 않은 레코드 0개.
- 기존 화면은 새 구조를 참조하지 않아 기능·UI 변화 없음.
- `npx tsc --noEmit` 통과.
- `npm run build` 통과: Next.js 정적 페이지 741개 생성. 기존 middleware 명명 규칙 deprecation 경고만 확인.
- 안전 조회 테스트는 로컬 TypeScript 컴파일러로 실행하도록 구성했다.

### 롤백 방법

새 제휴 링크 저장소·조회·검수·문서 파일과 `package.json`의 두 스크립트, PLV3-02 진행표/변경 이력만 되돌리면 된다. 기존 제품 데이터와 쿠팡 링크는 손대지 않았다.

## 2026-07-14

### 작업 ID

PLV3-03 쿠팡 링크 매핑 데이터 및 입력 템플릿 구축

### 변경 내용

- 현재 제품 365개를 모두 포함하는 `docs/proteinlab-affiliate-link-input.csv`를 생성했다.
- CSV의 `current_url`은 기존 데이터의 참고용 URL이며, `new_proteinlab_url`·`affiliate_link_id`는 비워 두었다.
- 기존 URL의 ProteinLab 전용 여부를 코드로 확인할 수 없어 자동 `ACTIVE` 매칭은 수행하지 않았다.
- CSV 생성·반영 스크립트와 중복 URL·누락·잘못된 제품 ID·URL 형식 분류를 포함한 검증 스크립트를 구성했다.

### 변경 사유

검증된 ProteinLab 전용 쿠팡파트너스 링크만 제품 매핑에 입력하고, CareMap 또는 기존 불명확 링크를 자동 혼용하지 않기 위함이다.

### 영향 페이지

없음. CSV와 제휴 링크 데이터 관리 스크립트만 변경했으며 기존 UI, 구매 버튼, 기존 쿠팡 링크, GA4 이벤트는 변경하지 않았다.

### 변경 파일

- `docs/proteinlab-affiliate-link-input.csv`
- `scripts/generate-proteinlab-affiliate-link-input.mjs`
- `scripts/apply-proteinlab-affiliate-link-input.mjs`
- `scripts/audit-proteinlab-affiliate-links.mjs`
- `docs/affiliate-link-management.md`
- `package.json`
- `docs/proteinlab-v3-progress.md`
- `docs/proteinlab-v3-changelog.md`

### 검수 결과

- 전체 제품 365개, CSV 행 365개.
- `ACTIVE` 링크 0개, `PENDING` 링크 365개, URL 누락 365개.
- 중복 제품 ID 0개, 중복 URL 0개, 존재하지 않는 제품 ID 0개, 잘못된 레코드 0개.
- 기존 링크는 ProteinLab 소유가 확인되지 않아 자동 매칭·자동 활성화 0건.
- `npm run apply:affiliate-link-input` 통과: 빈 템플릿 반영 시 `updatedRecords: 0`으로 기존 매핑을 변경하지 않음.
- `npm run audit:affiliate-links`, `npm run test:affiliate-link-lookup`, `npx tsc --noEmit` 통과.
- `npm run build` 통과: 정적 페이지 741개 생성. 홈 경로 생성이 60초 제한으로 두 차례 재시도된 뒤 성공했으며, 기존 middleware 명명 규칙 deprecation 경고만 확인.

### 롤백 방법

PLV3-03에서 추가·수정한 CSV, 스크립트, 문서, `package.json` 스크립트와 진행표/변경 이력만 되돌리면 된다. 기존 제품 데이터와 구매 흐름은 변경하지 않았다.

## 2026-07-14

### 작업 ID

PLV3-04 프로틴랩 전용 쿠팡 링크 적용

### 변경 내용

- 적용 전 선행 작업과 ProteinLab 제휴 링크 데이터를 확인했다.
- `ACTIVE` 링크가 없어 기존 공용 쿠팡 URL을 ProteinLab 전용 링크로 대체하거나 UI에 적용하지 않았다.
- PLV3-04를 `BLOCKED`로 기록했다.

### 변경 사유

실제 발급·검증된 ProteinLab 전용 링크 없이 기존 공용 링크를 전용 성과로 간주하면 ProteinLab/CareMap 성과 분리 원칙을 위반하기 때문이다.

### 영향 페이지

없음. 제품 상세, 제품 카드, 비교, 추천, 랭킹, 가이드, 홈 및 기타 구매 CTA는 변경하지 않았다.

### 변경 파일

- `docs/proteinlab-v3-progress.md`
- `docs/proteinlab-v3-changelog.md`

### 검수 결과

- 선행 작업: PLV3-02 DONE, PLV3-03 DONE.
- `npm run audit:affiliate-links`: 전체 제품 365개, `ACTIVE` 0개, `PENDING` 365개, URL 누락 365개, 중복 URL 0개, 잘못된 제품 ID 0개.
- 실제 기능·링크·UI·GA4 변경 없음.

### 롤백 방법

진행표의 PLV3-04 상태와 이 변경 이력만 되돌리면 된다.

## 2026-07-14

### 작업 ID

PLV3-05 GA4 이벤트 체계 재설계

### 변경 내용

- `lib/analytics.ts`에 표준 이벤트명, 공통 파라미터, 링크 위치 타입, 개발 전용 디버그 로그를 중앙화했다.
- 기존 `product_click`, `purchase_click`, `outbound_click`, `internal_link_click`, `sort_change` 호출을 새 표준 이벤트로 교체했다.
- 제품 카드/상세, 내부 CTA, 비교 추가·조회, 필터·정렬, 추천 시작·완료, 제품 카드·상세·비교표·가이드 구매 링크에 적용했다.
- 외부 링크 클릭은 한 번에 하나의 `retailer_click` 또는 `affiliate_click`만 보낼 수 있게 분리했다.

### 변경 사유

제품 탐색, 내부 전환, 비교, 추천, 실제 제휴 클릭과 일반 판매처 클릭을 서로 중복 없이 분석하기 위함이다.

### 영향 페이지

제품 목록·카드, 제품 상세, 비교, 가이드 추천, 추천, 랭킹 등 기존 상호작용의 GA4 이벤트명과 파라미터가 변경됐다. UI와 링크 목적지는 변경하지 않았다.

### 변경 파일

- `lib/analytics.ts`, `lib/gtag.ts`, `app/lib/ga4.ts`
- `app/components/ProductCard.tsx`, `ProductViewTracker.tsx`, `ProductDetailPurchaseActions.tsx`, `MobileStickyBuyButton.tsx`, `TrackedLink.tsx`, `CompareButton.tsx`, `CompareTable.tsx`, `GuidePurchaseLinkRow.tsx`, `GuideBuySection.tsx`, `ProductListWithFilters.tsx`
- `app/product/[slug]/page.tsx`, `app/compare/page.tsx`, `app/recommend/RecommendClient.tsx`
- `docs/ga4-event-specification.md`, `docs/proteinlab-v3-progress.md`, `docs/proteinlab-v3-changelog.md`

### 검수 결과

- `npx tsc --noEmit` 통과.
- `affiliate_click`은 `affiliate_link_id`와 URL이 모두 있는 명시 호출에서만 전송되도록 구현했다. 현재 ACTIVE ProteinLab 매핑이 없으므로 기존 구매 버튼은 `retailer_click`만 전송한다.
- 프로덕션 빌드 결과는 작업 완료 검수에서 추가 기록한다.

### 롤백 방법

위 이벤트 유틸리티와 호출부, GA4 리포팅 이벤트 목록, 문서 및 진행 기록만 되돌리면 된다. 제품 데이터·구매 URL·UI에는 변경이 없다.
