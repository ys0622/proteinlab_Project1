# ProteinLab V3 Top Landing Pages

## Scope and data status

Selection date: 2026-07-15

The repository contains a GA4 Data API client in `app/lib/ga4.ts`, but this environment does not have `GA4_PROPERTY_ID`, `GA4_CLIENT_EMAIL`, or `GA4_PRIVATE_KEY`. No GA4 report export was provided for this task. The priority order below uses the user-provided candidate list, verified route existence, search-intent strength, product/compare connectivity, and purchase-intent potential. It is not a claimed GA4 traffic ranking.

All quantitative baseline values are `UNKNOWN` until a 28-day GA4 Organic landing-page export is available. No estimated value is recorded as an actual metric.

## Priority list

| Priority | Path | Content type | Primary search intent | Current issue | Products to connect | Target behavior | content_id | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `/compare/proteone-vs-itthefit-shake` | Compare landing | Brand-versus-brand shake choice | High purchase intent, but conversion baseline is unavailable | `proteone-proteinshake-choco-40`, `itthefit-proteinshake-double-choco-40` | Product detail then compare review | `plv3:landing:compare:proteone-vs-itthefit-shake` | PENDING_GA_DATA |
| 2 | `/compare/takefit-vs-hymune-drink` | Compare landing | Popular RTD brand comparison | Strong brand intent; detail and CTA performance unknown | `takefit-max-choco-250`, `hymune-balance-active-deepchoco-250` | Product detail or ranking review | `plv3:landing:compare:takefit-vs-hymune-drink` | PENDING_GA_DATA |
| 3 | `/guides/intake-strategy-health/night-protein-drink` | Guide | Night-time protein intake decision | Informational visit needs a clear product-selection next step | Low-sugar RTD and shake candidates | Relevant product detail or recommendation | `plv3:landing:guide:night-protein-drink` | PENDING_GA_DATA |
| 4 | `/guides/product-selection-comparison/protein-bar-top10` | Ranking guide | Best protein bar shortlist | High commercial research intent; product-detail click baseline unknown | Top bar candidates from ranking data | Product detail, compare, then retailer surface | `plv3:landing:guide:protein-bar-top10` | PENDING_GA_DATA |
| 5 | `/guides/product-selection-comparison/protein-drink-top10` | Ranking guide | Best RTD protein drink shortlist | Broad commercial research intent; CTA path needs measurement | Top RTD candidates from ranking data | Product detail or compare | `plv3:landing:guide:protein-drink-top10` | PENDING_GA_DATA |
| 6 | `/guides/product-selection-comparison/low-sugar-protein-drink-guide` | Guide | Low-sugar RTD selection | Attribute-driven intent needs a direct shortlist | Low-sugar drink candidates | Filtered product list or detail | `plv3:landing:guide:low-sugar-protein-drink-guide` | PENDING_GA_DATA |
| 7 | `/compare/newcare-vs-sellex-drink` | Compare landing | NewCare versus Sellex choice | Brand comparison has strong detail/retailer potential; baseline unavailable | `newcare-all-protein-choco-245`, `sellex-profit-milk-vanilla-250` | Detail, related comparison, or ranking | `plv3:landing:compare:newcare-vs-sellex-drink` | PENDING_GA_DATA |
| 8 | `/compare/takefit-max-vs-takefit-monster` | Compare landing | Same-brand product-line selection | SKU choice intent is high; capacity and use-case path needs measurement | `takefit-max-goso-250`, `takefit-monster-goso-350` | Product detail then retailer surface | `plv3:landing:compare:takefit-max-vs-takefit-monster` | PENDING_GA_DATA |
| 9 | `/product/newcare-all-protein-41g` | Product detail | High-protein SKU evaluation | Included as an Organic-detail candidate pending GA4 confirmation | `newcare-all-protein-41g`, related 41g comparison | Compare or verified retailer CTA | `plv3:landing:product:newcare-all-protein-41g` | PENDING_GA_DATA |
| 10 | `/product/labnosh-protein-max-choco-400` | Product detail | High-protein SKU evaluation | Included as an Organic-detail candidate pending GA4 confirmation | `labnosh-protein-max-choco-400`, related 41g comparison | Compare or verified retailer CTA | `plv3:landing:product:labnosh-protein-max-choco-400` | PENDING_GA_DATA |

## Baseline metrics

| Path | Users | Sessions | Average engagement time | Views | Internal clicks | Product-detail clicks | Affiliate clicks | Baseline status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| All 10 selected paths | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | PENDING_GA_DATA |

The current GA4 dashboard code can provide top pages and CTA events, but it does not yet report an Organic-only landing-page baseline, product-detail clicks by landing page, or affiliate clicks by landing page. The required source data is a 28-day GA4 export filtered to `sessionDefaultChannelGroup=Organic Search`, with landing page, users, sessions, engagement time, views, and the PLV3 event names.

## Per-page improvement direction

| Path | Top conclusion | Compare CTA | Related products | Retailer CTA need | Product-detail connection |
| --- | --- | --- | --- | --- | --- |
| `/compare/proteone-vs-itthefit-shake` | State the best fit by meal-replacement versus lower-sugar preference | Yes, preserve current comparison context | Both compared SKUs and one alternative | Yes, only after verified ProteinLab links exist | Prominent cards for both products |
| `/compare/takefit-vs-hymune-drink` | State the best fit by protein amount and drinking occasion | Yes | Both compared SKUs and category ranking | Yes, only after verified links | Prominent cards for both products |
| `/guides/intake-strategy-health/night-protein-drink` | State when a night drink is appropriate and when to avoid it | Yes, low-sugar or meal-replacement comparison | Low-sugar and lighter serving candidates | Conditional; not before verified links | Two to four scenario-based product cards |
| `/guides/product-selection-comparison/protein-bar-top10` | State the top choices by snack, diet, and protein goals | Yes, selected bar comparison | Top-ranked and low-sugar bar alternatives | Conditional; only on high-intent result positions | Each shortlist item links to detail |
| `/guides/product-selection-comparison/protein-drink-top10` | State the top choices by protein amount, sugar, and calories | Yes, selected RTD comparison | High-protein and low-sugar RTD alternatives | Conditional; only on high-intent result positions | Each shortlist item links to detail |
| `/guides/product-selection-comparison/low-sugar-protein-drink-guide` | State the practical sugar threshold and shortlist | Yes, filtered low-sugar comparison | Water-type and standard RTD alternatives | Conditional; only after verified links | Filtered shortlist links to detail |
| `/compare/newcare-vs-sellex-drink` | State the best fit by protein target and serving format | Yes | Both compared SKUs and brand hubs | Yes, only after verified links | Prominent cards for both products |
| `/compare/takefit-max-vs-takefit-monster` | State the best fit by 250mL versus 350mL serving | Yes | Other Takefit line products | Yes, only after verified links | Prominent cards for both products |
| `/product/newcare-all-protein-41g` | State who benefits from 41g and the key trade-off | Link to 41g comparison | High-protein RTD alternatives | Yes, when PLV3-04 and PLV3-07 unblock | Related comparison and ranking links |
| `/product/labnosh-protein-max-choco-400` | State the best use case and serving trade-off | Link to 41g comparison | High-protein shake alternatives | Yes, when PLV3-04 and PLV3-07 unblock | Related comparison and ranking links |

## Next measurement step

Before PLV3-10, import or enable the 28-day Organic landing-page baseline. Re-rank this list with measured Organic users, landing sessions, product-detail clicks, `compare_view`, and `affiliate_click`. `affiliate_click` remains expected to be zero until verified ProteinLab-specific links unblock PLV3-04 and PLV3-07.
