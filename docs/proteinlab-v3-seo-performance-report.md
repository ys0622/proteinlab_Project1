# ProteinLab v3 SEO And Performance Report

Date: 2026-07-15

## Scope

Reviewed home, category, product detail, compare, recommend, ranking, and guide routes. This report covers repository-level validation only; Search Console, real-user Web Vitals, and external retailer response status require production access.

## Findings And Changes

### Fixed

1. Removed derived `AggregateRating` from Product JSON-LD.
   - Internal grade tags are not independent user reviews or ratings.
   - The Product schema now contains only product identity and available nutrition data.
2. Removed sitemap runtime timestamps for comparison guides without an explicit `updatedAt` value.
   - They now use the documented fallback guide date instead of claiming every sitemap request is a content update.
3. Updated sitemap modification dates for category, compare, recommendation, ranking, and product-detail changes made in v3.
4. Added `npm run audit:internal-links`.
   - The audit derives route patterns from `app/**/page.tsx`, recognizes configured redirects, and checks literal internal links in TypeScript source.

### Deliberately Unchanged

- Existing canonical URLs and primary URL paths remain unchanged.
- Query-backed category filtering is not listed in the sitemap. Category metadata retains canonical base URLs.
- Search results with a `q` parameter are already `noindex`.
- FAQ schema remains only where corresponding FAQ content is rendered. The audit found 16 FAQPage implementations; visual/semantic content review remains part of release review.
- Offer schema is not emitted because current price and stock availability are not maintained as verified data.
- Product and card images remain `unoptimized` because the Cloudflare deployment has no configured image optimization service. Existing cards use responsive `sizes` and lazy loading for non-priority images; product-detail hero images are priority loaded.
- Product cards remain client components because they provide comparison, favorites, navigation tracking, and review-summary UI. Review-summary requests should be profiled with production Web Vitals before any behavioral refactor.

## Sitemap Status

Validation result:

- Entries: 685
- Unique URLs: 685
- Product detail URLs: 365
- Home, recommendation, and ranking: included
- Query URLs: 0
- Redirect-only routes: excluded

The sitemap includes home, categories, product details, guides, comparison landings, ranking, recommendation, topics, brands, curated pages, and picks. `lastModified` uses explicit page/configuration dates or documented fallback dates, not request time.

## Structured Data Status

- Root metadata defines site-level title, description, Open Graph, Twitter, robots, and Korean locale.
- Category, product, guide, recommendation, and ranking routes provide route-level metadata where implemented.
- Product pages emit Product, NutritionInformation, and BreadcrumbList. No Offer or synthetic AggregateRating remains.
- FAQPage is emitted only alongside rendered FAQ sections in the current implementation.
- BreadcrumbList is present on product, category, recommendation, ranking, and many guide pages.

## Link Validation

### Internal Links

`npm run audit:internal-links`

- Route patterns: 184
- Literal internal links checked: 1,078
- Broken links: 0
- Links to configured redirects: 0

The audit covers literal `href` values in application TypeScript. Data-driven links and user-entered URLs still require production crawl validation.

### Retailer And Affiliate Links

`npm run audit:purchase-links`

- Missing product slugs: 0 across drinks, bars, yogurt, and shakes.
- Existing Coupang URL mismatches: 282. These are mostly `link.coupang.com` short links compared with source product URLs and cannot be treated as broken without redirect validation.

`npm run audit:affiliate-links`

- ProteinLab ACTIVE affiliate mappings: 0
- PENDING mappings: 365
- Missing dedicated affiliate URLs: 365

No URL was changed automatically. Dedicated affiliate mappings remain the blocking item for PLV3-04 and PLV3-07.

## Performance Review

`npm run check:assets` passed:

- Image maps are complete for 365 products.
- No mapped image file is missing.
- One bar product has an allowlisted missing spec map: `crown-highprotein-chocobar`.

Existing safeguards retained:

- Product-card images use responsive `sizes` and lazy load unless explicitly prioritized.
- Product-detail main images are priority loaded with fixed dimensions.
- Category filters and comparison tools use client-side state because their interaction requires it.

No runtime LCP, CLS, or INP values can be asserted locally. `npm run build` timed out after 134 seconds without output, so bundle and rendered-page checks remain required.

## Remaining Risks

1. The local production build times out without output, preventing full static route and bundle verification.
2. External retailer redirects and destination availability were not checked over the network.
3. The current CDN deployment does not perform framework image optimization.
4. Product-card review-summary fetches may affect category-page network fan-out and need field-data review.
5. Search Console must confirm that all revised sitemap dates and canonical URLs are accepted after deployment.

## Search Console Follow-Up

For seven days after deployment, check:

- Sitemap fetch status, discovered URL count, and excluded query URLs.
- Page indexing for `/drinks`, `/bars`, `/shake`, `/yogurt`, `/recommend`, `/ranking`, `/compare`, representative guides, and representative product details.
- Canonical selection and duplicate-page reports.
- Product rich-result and breadcrumb enhancement reports.
- Crawl errors, soft 404s, and redirect errors.
- Core Web Vitals split by mobile and desktop: LCP, INP, and CLS.
- Organic clicks, impressions, CTR, and average position for the top 10 landing pages recorded in PLV3-09.
