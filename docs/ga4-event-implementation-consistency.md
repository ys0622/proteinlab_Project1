# GA4 Event Implementation Consistency Report

Generated: 2026-08-18

Scope: static scan of event helper call sites. No analytics code was changed.

| Event helper | Call-site count | Files |
|---|---:|---|
| pageView | 2 | app/components/AnalyticsPageViewTracker.tsx (1)<br>lib/analytics.ts (1) |
| productCardClick | 2 | lib/analytics.ts (2) |
| internalCtaClick | 5 | app/compare/page.tsx (2)<br>app/components/TrackedLink.tsx (1)<br>lib/analytics.ts (1)<br>lib/gtag.ts (1) |
| affiliateClick | 1 | lib/analytics.ts (1) |
| retailerClick | 4 | app/components/GuidePurchaseLinkRow.tsx (1)<br>lib/analytics.ts (2)<br>lib/gtag.ts (1) |
| compareAdd | 3 | app/compare/page.tsx (1)<br>app/components/CompareButton.tsx (1)<br>lib/analytics.ts (1) |
| compareView | 2 | app/compare/page.tsx (1)<br>lib/analytics.ts (1) |
| filterApply | 1 | lib/analytics.ts (1) |
| sortApply | 1 | lib/analytics.ts (1) |
| recommendStart | 2 | app/recommend/RecommendClient.tsx (1)<br>lib/analytics.ts (1) |
| recommendComplete | 2 | app/recommend/RecommendClient.tsx (1)<br>lib/analytics.ts (1) |

## Static interpretation

- affiliateClick has no active call-site in product purchase UI while dedicated ProteinLab affiliate links are missing.
- Current purchase buttons are expected to use retailerClick until verified affiliate mappings are applied.
- Browser and GA4 DebugView validation are still required before treating event delivery as verified.
