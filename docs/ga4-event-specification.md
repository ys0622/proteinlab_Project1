# ProteinLab GA4 Event Specification

## Common contract

All events sent through `lib/analytics.ts` include `site_name=proteinlab`, `page_type`, and `page_path`. Product events use `product_id`, `product_name`, `product_brand`, and `product_category` when a product is available. External-link events add `retailer`, `link_position`, and, for verified affiliate links only, `affiliate_link_id`.

`site_name` is a fixed ProteinLab identifier. No user-entered text, email, phone number, or other personal data is sent.

## Standard events

| Event | Trigger | Required context | Optional context |
|---|---|---|---|
| `product_card_click` | A product card opens its product detail. | product fields, `link_position=product_card` | `content_id` |
| `product_detail_view` | Product detail tracker mounts after a valid product is loaded. | product fields | - |
| `internal_cta_click` | A tracked CTA navigates within ProteinLab. | `content_id`, destination URL | `link_position` |
| `compare_add` | A product is added to comparison. | `product_id`, `compare_count` | - |
| `compare_view` | A non-empty comparison result is rendered. | `compare_count`, `link_position=comparison_result` | - |
| `affiliate_click` | A verified, active ProteinLab affiliate URL is opened. | product fields, `retailer`, `affiliate_link_id`, `link_position` | destination URL |
| `retailer_click` | A non-affiliate retailer link is opened. | product fields, `retailer`, `link_position` | destination URL |
| `filter_apply` | A category filter value is toggled. | `product_category`, `content_id` | - |
| `sort_apply` | A category sort changes. | `product_category`, `content_id` | - |
| `recommend_start` | The recommendation flow starts. | `product_category` | - |
| `recommend_complete` | Recommendation results are available. | `product_category` | `content_id` |

## Link-position values

Allowed values are `hero`, `product_card`, `spec_table`, `mid_content`, `bottom_cta`, `sticky_mobile`, `related_product`, `comparison_result`, `recommend_result`, `ranking`, and `home_featured`.

## Duplicate prevention

- Product-card navigation sends only `product_card_click`; it never sends an external-link event.
- One external retailer click sends exactly one of `affiliate_click` or `retailer_click`, never both.
- `affiliate_click` requires a non-empty verified `affiliate_link_id`. Until PLV3-04 is unblocked, all existing purchase links are treated as retailer links.
- Comparison views are deduplicated by the visible product-slug set during a mounted view.
- Recommendation completion is deduplicated per result object.

## Key events and GA4 setup

Mark these events as key events in the GA4 Admin UI after observing them in DebugView:

- `affiliate_click`
- `compare_view`
- `recommend_complete`

Suggested custom dimensions: `site_name`, `product_id`, `product_brand`, `product_category`, `retailer`, `affiliate_link_id`, `link_position`, `content_id`, and `compare_count`. Register only dimensions needed for reporting and wait for GA4 processing before building reports.

## Verification

In a development build, `lib/analytics.ts` logs the event name, final parameters, page URL, and timestamp with the `[ProteinLab analytics]` prefix. Production builds do not emit these logs.

Use GA4 DebugView to validate the standard event sequence. Verify that a product card produces `product_card_click`, that an existing retailer button produces only `retailer_click`, and that `affiliate_click` appears only after a verified active ProteinLab mapping is integrated.
