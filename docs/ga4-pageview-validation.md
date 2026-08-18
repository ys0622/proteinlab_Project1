# ProteinLab GA4 Page View Validation

## Previous risks

- Automatic GA4 page views are disabled, so the application must emit exactly one manual `page_view` for the first load and every App Router URL change.
- The tracker previously treated the Measurement Protocol fallback as immediately ready. When the browser GA tag was still loading, the first page view could be sent through the fallback rather than the browser tag. Fallback-only traffic does not provide a browser-managed GA session start and could contribute to unreliable landing-page reporting.
- `BrowserTabTitle` replaced route metadata with one fixed browser title, so `page_title` was not the actual page title.

## Changes

- GA4 remains installed directly once in `app/layout.tsx`. There is no GTM container or second Measurement ID in the source tree.
- `gtag('config', GA_ID, { send_page_view: false })` remains the single configuration call. The page-view tracker is the sole page-view emitter.
- `page_view` now waits for the browser `gtag` function. It never uses the Measurement Protocol fallback.
- The tracker uses `pathname + query string` as its deduplication key. Hash-only changes do not create a page view.
- Every page view includes full `page_location`, the current document `page_title`, and `page_referrer`. Internal navigation uses the last tracked full URL as the referrer; the first load uses `document.referrer` when available.
- Route metadata is no longer overwritten by a fixed client-side tab title.
- Development does not load the GA script or send traffic to GA4. It logs the page-view payload once per URL to the browser console for verification.

## Validation sequence

Run this in a production-equivalent deployment with GA4 DebugView enabled:

1. Open `/` in a fresh tab: exactly one `page_view`.
2. Navigate to `/drinks`: exactly one additional `page_view` with `/` as `page_referrer`.
3. Open a product detail page: exactly one additional event.
4. Navigate to `/compare`, then a `/guides/...` page: one event for each URL.
5. Use browser Back, then Forward: one event for each restored URL.
6. Refresh the current URL: exactly one page view for the new document load.

For every event, verify `page_location` is the full URL, `page_path` retains query parameters, and `page_title` matches the rendered route metadata.

## Duplicate prevention

- Automatic page views are disabled in the only GA4 `config` call.
- The page-view tracker stores the last emitted path and query value for its mounted lifecycle.
- A route effect is cancelled when superseded before the GA tag is ready.
- No GTM bootstrap, duplicate `gtag/js` load, or additional GA4 `config` call exists in the repository.

## GA4 DebugView

Use a production or preview deployment, open GA4 DebugView, and perform the validation sequence above. Local development intentionally does not transmit GA4 events. Verify each `page_view` has one event timestamp, the expected URL/title/referrer values, and no accompanying duplicate automatic page view.

## Post-deployment 7-day checks

- Landing-page `(not set)` share: target below 5% after new traffic has accumulated.
- `page_view` count versus sessions and active users: investigate sudden step changes that indicate duplication or blocking.
- Top landing pages: confirm expected SEO entry URLs and query strings are represented.
- DebugView and Realtime: confirm direct entries, internal navigation, Back, Forward, and refresh each produce one page view.
- Browser console and deployment logs: investigate GA script load failures before considering the fallback for page views.
