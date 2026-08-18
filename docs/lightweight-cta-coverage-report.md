# Lightweight CTA Coverage Report

Generated: 2026-08-18

Scope: static scan of the selected top SEO landing pages. No UI or runtime code was changed.

| Priority | Path | Source | TrackedLink count | Product href count | Compare href count | Retailer mentions | Product coverage | Status | Recommended action |
|---:|---|---|---:|---:|---:|---:|---|---|---|
| 1 | /compare/proteone-vs-itthefit-shake | app/compare/[slug]/page.tsx<br>app/data/compareLandings.ts | 4 | 2 | 7 | 7 | OK, OK | OK_STATIC | Keep; verify event delivery in browser. |
| 2 | /compare/takefit-vs-hymune-drink | app/compare/[slug]/page.tsx<br>app/data/compareLandings.ts | 4 | 2 | 7 | 7 | OK, OK | OK_STATIC | Keep; verify event delivery in browser. |
| 3 | /guides/intake-strategy-health/night-protein-drink | app/guides/intake-strategy-health/night-protein-drink/page.tsx | 3 | 3 | 0 | 0 | DYNAMIC_OR_NOT_SPECIFIED | OK_STATIC | Keep; verify event delivery in browser. |
| 4 | /guides/product-selection-comparison/protein-bar-top10 | app/guides/product-selection-comparison/protein-bar-top10/page.tsx<br>app/guides/product-selection-comparison/proteinBarContent.ts | 0 | 0 | 0 | 37 | DYNAMIC_OR_NOT_SPECIFIED | WEAK_OR_UNKNOWN | Review whether product-detail and compare CTAs are visible above or within the first decision section. |
| 5 | /guides/product-selection-comparison/protein-drink-top10 | app/guides/product-selection-comparison/protein-drink-top10/page.tsx<br>app/guides/product-selection-comparison/proteinDrinkTop10Content.ts | 0 | 0 | 0 | 6 | DYNAMIC_OR_NOT_SPECIFIED | WEAK_OR_UNKNOWN | Review whether product-detail and compare CTAs are visible above or within the first decision section. |
| 6 | /guides/product-selection-comparison/low-sugar-protein-drink-guide | app/guides/product-selection-comparison/low-sugar-protein-drink-guide/page.tsx | 2 | 1 | 0 | 0 | DYNAMIC_OR_NOT_SPECIFIED | OK_STATIC | Keep; verify event delivery in browser. |
| 7 | /compare/newcare-vs-sellex-drink | app/compare/[slug]/page.tsx<br>app/data/compareLandings.ts | 4 | 2 | 7 | 7 | OK, OK | OK_STATIC | Keep; verify event delivery in browser. |
| 8 | /compare/takefit-max-vs-takefit-monster | app/compare/[slug]/page.tsx<br>app/data/compareLandings.ts | 4 | 2 | 7 | 7 | OK, OK | OK_STATIC | Keep; verify event delivery in browser. |
| 9 | /product/newcare-all-protein-41g | app/product/[slug]/page.tsx | 2 | 5 | 5 | 11 | OK | OK_STATIC | Keep; verify event delivery in browser. |
| 10 | /product/labnosh-protein-max-choco-400 | app/product/[slug]/page.tsx | 2 | 5 | 5 | 11 | OK | OK_STATIC | Keep; verify event delivery in browser. |

## Notes

- Compare and product-detail pages use shared dynamic routes, so static counts represent the shared implementation, not a browser rendering of each final URL.
- WEAK_OR_UNKNOWN means the page deserves manual review before changing layout.
- Verified affiliate purchase CTA remains blocked until ProteinLab-only Coupang links are available.
