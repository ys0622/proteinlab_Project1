# PLV3-01 GA4 Event Audit

Audit date: 2026-07-14

Scope: runtime source files under `app/`, `components/`, and `lib/`. This audit did not modify tracking, links, product data, UI, or page structure.

## Installation and page views

- GA4 is installed directly in `app/layout.tsx` with `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`. No Google Tag Manager container ID (`GTM-...`) or GTM bootstrap was found.
- `gtag('config', GA_ID, { send_page_view: false })` disables the automatic page view. `app/components/AnalyticsPageViewTracker.tsx` sends the initial page view and App Router navigation page views through `pageView()`.
- `page_view` parameters are `page_path`, `page_location`, `page_title`, and `page_type`. The tracker deduplicates the same pathname/query string within its mounted lifecycle.
- When `window.gtag` is unavailable but `NEXT_PUBLIC_GA_ID` exists, `lib/analytics.ts` falls back to `POST /api/analytics`. The server sends the same event using GA4 Measurement Protocol, with locally generated `client_id` and `session_id` plus `engagement_time_msec: 1`.
- There is no explicit `session_start` emission. Browser gtag normally manages sessions, while the Measurement Protocol fallback only supplies `session_id`.

## Actual event emissions

| Event | Runtime location | Trigger | Parameters | Notes |
|---|---|---|---|---|
| `page_view` | `AnalyticsPageViewTracker.tsx` -> `lib/analytics.ts` | Initial client mount and pathname/query change | `page_path`, `page_location`, `page_title`, `page_type` | Auto page view is disabled, so this is the sole intended client path. |
| `product_click` | `app/components/ProductCard.tsx` | Card surface click or Enter/Space, excluding nested interactive controls | `product_id`, `product_name`, `brand`, `category`, `destination_url`, `source=card`, `cta_text` | Product detail navigation is distinct from purchase CTA clicks. |
| `purchase_click` | `ProductCard.tsx`, `ProductDetailPurchaseActions.tsx`, `MobileStickyBuyButton.tsx` | Coupang/Naver/official purchase CTA click where callback is supplied | `product_id`, `product_name`, `brand`, `store`, `destination_url`, `placement`, `cta_text` | Correctly identifies store for these three surfaces. |
| `outbound_click` | Indirectly from every `purchase_click`; also available through `lib/gtag.ts` | Same click as `purchase_click` | `event_category=purchase`, `event_label`, `destination_url`, `store`, product fields | A tracked purchase CTA intentionally produces both events. Do not add the two event totals together as one KPI. |
| `internal_link_click` | `TrackedLink.tsx`, `app/compare/page.tsx` | Tracked internal Next.js links | `link_text`, `destination_url`, `section`, `page_type` | Only selected internal CTAs are wrapped or explicitly tracked. |
| `compare_share_click` | `app/compare/page.tsx` | Copy comparison URL succeeds | `product_count`, `share_type=link_copy` | Custom event. |
| `compare_reset_click` | `app/compare/page.tsx` | Comparison reset button | `product_count` | Custom event. |
| `ad_impression` | `components/AdSenseBlock.tsx` | Ad slot becomes visible | `page_type`, `page_path`, `ad_slot`, `device_type` | Custom event. |
| `ad_click` | `components/AdSenseBlock.tsx` | Click is captured on the ad container | same as `ad_impression` | Custom event; browser/ad network behavior may limit reliable click capture. |

## Purchase-surface coverage

| Surface | Product detail navigation | Purchase event | Store distinguished | Duplicate event on same click |
|---|---:|---:|---:|---:|
| `ProductCard` | `product_click` | Yes | Yes | Yes: `purchase_click` + `outbound_click` |
| Product detail hero | N/A | Yes | Yes | Yes: `purchase_click` + `outbound_click` |
| Mobile sticky buy bar | N/A | Coupang only | Yes for Coupang | Yes: `purchase_click` + `outbound_click` |
| `CompareTable` price row | N/A | **No** | No | No event sent |
| `GuideBuySection` | Product name link is untracked | **No** | No | No event sent |

## Findings

### CRITICAL

1. **ProteinLab and CareMap affiliate performance cannot be proven as separate.** `app/lib/purchaseLinks.ts` passes category sub IDs (`drink`, `bar`, `yogurt`, `shake`, `guide`, `ranking`) and `/api/out/coupang` uses `category ?? "proteinlab"` for the deeplink cache/API context. Neither contains a stable `site=proteinlab` identity. Static `link.coupang.com` URLs are used as-is and also have no code-visible site owner.
2. **Purchase clicks are missing on comparison and guide purchase buttons.** `CompareTable.tsx` and `GuideBuySection.tsx` render `PurchaseLinkRow` without purchase callbacks, so their Coupang/Naver/official clicks do not emit `purchase_click` or `outbound_click`.
3. **Fallback page-view sessions may be incomplete.** The fallback sends `page_view` with a custom session ID but never emits `session_start`; GA4 reporting behavior for fallback-only/ad-blocked traffic must be verified before using landing-page metrics as a conversion denominator.

### HIGH

1. **A single measured purchase click produces two GA4 events.** `purchaseClick()` invokes `outboundClick()` and then sends `purchase_click`. This is acceptable only when reports use `purchase_click` as the purchase CTA KPI and do not aggregate both event names.
2. **Internal CTA coverage is partial.** `TrackedLink` is available, but many ordinary Next.js links are not wrapped. Guide product-detail links are one confirmed untracked case.
3. **Static affiliate links bypass the redirect endpoint.** `link.coupang.com` URLs keep their original attribution and cannot receive runtime site/placement data through `/api/out/coupang`.

### MEDIUM

1. `lib/gtag.ts` remains a compatibility layer alongside `lib/analytics.ts`, leaving two public tracking entry points.
2. The admin GA4 reporting list contains `compare_export_click`, but no runtime emission was found in this audit scope.
3. Purchase UI is shared, but tracking is supplied separately by each caller, which caused the coverage gap above.

### LOW

1. Event names and placements are documented in code but not centrally versioned as an analytics contract.
2. GTM is not in use; this is not itself a defect, but future GTM adoption must preserve `send_page_view: false` to avoid duplicate page views.

## Required next steps

1. PLV3-02 must define a stable site identity and explicit ProteinLab-specific Coupang attribution strategy before any link replacement.
2. PLV3-05 must establish the canonical purchase KPI (`purchase_click`) and prevent reporting from summing it with `outbound_click`.
3. PLV3-06 must validate initial landing and internal navigation page views in GA4 DebugView, including fallback-only behavior.
4. PLV3-07 must make purchase tracking part of the shared purchase component contract so comparison and guide surfaces cannot omit it.
