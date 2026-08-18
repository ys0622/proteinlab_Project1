# Product Detail Decision Framework

## Summary and purchase flow

- The existing detail hero retains product image, brand, product name, key nutrition metrics, grade badges, recommended audience, and retailer links.
- A shared compare control is placed immediately before the existing purchase-channel block.
- Verified ProteinLab affiliate mappings remain unavailable: PLV3-04 and PLV3-07 are BLOCKED with 0 ACTIVE links. The existing retailer links continue to send `retailer_click`; no new `affiliate_click` or affiliate component was introduced.

## Data-backed decision section

Each product compares only against products in its own category. The section is hidden when fewer than five comparable metric values exist.

| Metric | Direction | Display |
| --- | --- | --- |
| Protein | higher is better | top/bottom approximate quartile band |
| Sugar | lower is better | top/bottom approximate quartile band |
| Calories | lower is better | top/bottom approximate quartile band |
| Protein density | higher is better | top/bottom approximate quartile band |

The UI uses broad bands (`top about 25%`, `top about 50%`, and corresponding lower bands), not exact ranks. Price efficiency is omitted because current product price data is unavailable.

Advantages and considerations are generated only from those category-relative nutrition values. Missing sugar or calorie data is explicitly called out as a comparison limitation.

## Related products and SEO

- Related products are limited to four same-category candidates.
- Each candidate has a data-backed reason: lower sugar, higher protein, lower calories, or similar nutrition composition.
- The Product schema no longer includes an Offer because the application does not hold a current price or verified stock state.
- Existing canonical URL, title/description, Product schema fields, FAQ schema, and Breadcrumb schema remain intact.

## Validation

- `npx tsc --noEmit`: passed.
- `git diff --check`: passed (line-ending warnings only).
- `npm run build`: timed out after 124 seconds without output in the local environment.
- Browser verification for the requested drink, shake, bar, yogurt, and missing-data samples remains pending because the local browser target is unavailable.
