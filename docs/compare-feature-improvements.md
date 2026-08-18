# Compare Feature Improvements

- Empty compare state: product search, category and brand filters, recent products, and operator-selected comparison combinations.
- Selection limit: three unique product slugs. Invalid slugs are ignored by product lookup.
- Share URL: `/compare?products=slug-a,slug-b`; legacy `slugs` URLs remain readable.
- `compare_view` is sent only when two or more valid products are present.
- Table: ties retain shared highlights, the metric label column is sticky during horizontal mobile scrolling, and each compared product links to its detail page.
- Purchase-channel clicks use `retailer_click` with `link_position=comparison_result`. `affiliate_click` remains blocked until verified ProteinLab affiliate links exist.
- Price and per-gram price are not calculated because price coverage is unavailable.

Validation: `npx tsc --noEmit` and `git diff --check` passed. The build first identified and then cleared a `/compare` Suspense issue; the final build attempt timed out after 124 seconds without output.
