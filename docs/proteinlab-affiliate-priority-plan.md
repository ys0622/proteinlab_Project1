# ProteinLab Affiliate Link Priority Plan

Generated: 2026-07-20

This is a lightweight monetization update. It does not change UI, product data, existing purchase links, or GA4 events.

## Priority rules

| Tier | Meaning | Recommended handling |
|---|---|---|
| P1 | Connected to selected SEO landing pages or very high priority by score | Create these ProteinLab-only Coupang Partners links first |
| P2 | High protein and/or commercially strong product with useful existing URL coverage | Process after P1 |
| P3 | Existing Coupang URL is present but product is not otherwise high priority | Batch process when time allows |
| BACKLOG | No strong conversion signal yet | Leave pending until content, traffic, or product priority changes |

## Scoring inputs

- Selected top SEO landing-page products
- Ultra-high or high protein threshold by category
- Existing Coupang URL availability
- Category-level commercial priority

No arbitrary affiliate URL was generated. `new_proteinlab_url` and `affiliate_link_id` must be filled only with verified ProteinLab-only Coupang Partners values.

Use `product_slug_label` as the readable working label when the source product name is difficult to read in a spreadsheet program.

## Current counts

| Tier | Product count |
|---|---:|
| P1 | 10 |
| P2 | 108 |
| P3 | 231 |
| BACKLOG | 16 |

## First 20 products to process

| Rank | Tier | Product ID | Category | Protein g | Reason |
|---:|---|---|---|---:|---|
| 1 | P1 | labnosh-protein-max-choco-400 | drink | 52 | top_landing_connected;has_existing_coupang_url;ultra_high_protein |
| 2 | P1 | newcare-all-protein-41g | drink | 41 | top_landing_connected;has_existing_coupang_url;ultra_high_protein |
| 3 | P1 | takefit-monster-goso-350 | drink | 45 | top_landing_connected;has_existing_coupang_url;ultra_high_protein |
| 4 | P1 | newcare-all-protein-choco-245 | drink | 25 | top_landing_connected;has_existing_coupang_url;high_protein |
| 5 | P1 | hymune-balance-active-deepchoco-250 | drink | 20 | top_landing_connected;has_existing_coupang_url |
| 6 | P1 | sellex-profit-milk-vanilla-250 | drink | 20 | top_landing_connected;has_existing_coupang_url |
| 7 | P1 | takefit-max-choco-250 | drink | 24 | top_landing_connected;has_existing_coupang_url |
| 8 | P1 | takefit-max-goso-250 | drink | 24 | top_landing_connected;has_existing_coupang_url |
| 9 | P1 | itthefit-proteinshake-double-choco-40 | shake | 21.3 | top_landing_connected;has_existing_coupang_url |
| 10 | P1 | proteone-proteinshake-choco-40 | shake | 23 | top_landing_connected;has_existing_coupang_url |
| 11 | P2 | danbaek-drink-darkchoco-330 | drink | 35 | has_existing_coupang_url;ultra_high_protein |
| 12 | P2 | danbaek-drink-doublechoco-350 | drink | 40 | has_existing_coupang_url;ultra_high_protein |
| 13 | P2 | dryou-protein-40g-choco-350 | drink | 40 | has_existing_coupang_url;ultra_high_protein |
| 14 | P2 | dryou-protein-40g-strawberry-350 | drink | 40 | has_existing_coupang_url;ultra_high_protein |
| 15 | P2 | hymune-ultra-400 | drink | 49 | has_existing_coupang_url;ultra_high_protein |
| 16 | P2 | labnosh-protein-max-strawberry-400 | drink | 52 | has_existing_coupang_url;ultra_high_protein |
| 17 | P2 | newcare-all-protein-41g-coffee-350 | drink | 41 | has_existing_coupang_url;ultra_high_protein |
| 18 | P2 | newcare-all-protein-41g-savory-350 | drink | 41 | has_existing_coupang_url;ultra_high_protein |
| 19 | P2 | sellex-profit-sports-wildchoco-350 | drink | 45 | has_existing_coupang_url;ultra_high_protein |
| 20 | P2 | takefit-extreme-450 | drink | 60 | has_existing_coupang_url;ultra_high_protein |

## Files

- Input CSV: `docs/proteinlab-affiliate-priority-input.csv`
- P1-only input CSV: `docs/proteinlab-affiliate-p1-input.csv`
- Full input CSV remains available at: `docs/proteinlab-affiliate-link-input.csv`

## Next operation

Fill only P1 rows first. After verified values are entered, run:

```bash
npm run apply:affiliate-link-input
npm run audit:affiliate-links
```
