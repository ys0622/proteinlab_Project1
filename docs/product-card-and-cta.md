# Product Card And Internal CTA

## ProductCard variants

`ProductCard` is the shared product exploration component. Use `cardVariant` rather than copying the card markup.

| Variant | Intended use |
| --- | --- |
| `category` | Category, search, favorites, and curated product lists. |
| `related` | Related-product modules inside content. |
| `ranking` | Scored ranking cards through `ScoredProductCard`. |
| `recommend` | Recommendation-result cards through `ScoredProductCard`. |
| `compact` | Space-constrained home carousel cards. |

The existing product data field named `variant` remains a product attribute. The display component uses the separate `cardVariant` prop.

## Required product card data

- Product image and slug
- Brand and name
- Protein, sugar, calories, capacity, density, and grade badges when data is available
- Product detail destination
- Comparison slug when available

Missing optional data renders as the existing safe fallback. Image rendering retains its current contained aspect ratio.

## Card event rules

- The card surface and `상세 보기` link emit `product_card_click` before product-detail navigation.
- `CompareButton` emits `compare_add` only when a product is newly added.
- Nested links and buttons do not bubble into the card-surface handler, so one user action does not create both events.
- Product cards do not render retailer purchase links by default. Purchase intent is handled in dedicated product-detail, comparison, and guide purchase surfaces.

## Internal CTA component

Use `TrackedLink` for internal product-detail, all-products, compare, related-product, recommendation, and ranking CTAs.

Required props:

- `href`
- `trackingLabel`
- `trackingSection`
- `trackingPageType`

Optional props:

- `ctaType`: `product_detail`, `all_products`, `compare`, `related_products`, `recommend`, or `ranking`
- `linkPosition`: the standard GA4 position value
- `productId`: include when a CTA represents one product

Each click emits `internal_cta_click` with the common page parameters plus `content_id`, `link_position`, `destination_path`, and optional `product_id`.

## Page usage

- Home category links use `HomeTrackedLink`, which delegates to `TrackedLink` with `home_featured` placement.
- Category lists use `ProductCard` with `category`.
- Ranking and recommendation result cards use `ScoredProductCard`, which delegates to `ProductCard` with `ranking` or `recommend`.
- Existing guide, search, topic, and related-link CTAs use `TrackedLink`.

## Why cards limit purchase buttons

List pages are primarily exploration surfaces. Keeping their primary actions to product detail and comparison avoids competing retailer CTAs, prevents mixed navigation and purchase metrics, and preserves purchase buttons for pages where the visitor has enough product context to make a buying decision.
