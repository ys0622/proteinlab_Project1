# Category Page Improvements

## Scope

Applied through the shared `ProductListWithFilters` component used by `/drinks`, `/shake`, `/bars`, and `/yogurt`.

## Quick filters

The same four compact quick filters are available on every category. A filter is disabled when its result count is zero.

| Filter | Drink / Shake | Bar | Yogurt |
| --- | --- | --- | --- |
| Low sugar | sugar <= 3g | sugar <= 3g | sugar <= 3g |
| High protein | protein >= 20g | protein >= 20g | protein >= 15g |
| Low calorie | calories <= 150kcal | calories <= 200kcal | calories <= 150kcal |
| Large capacity | capacity >= 300mL | weight >= 60g | capacity >= 400mL |

Price-efficiency and purchase-convenience quick filters are excluded because the current product dataset has no usable price or availability coverage. They must not be inferred from affiliate links or product order.

## Filter and URL behavior

- Detailed filters are serialized in the `filters` query parameter.
- Quick-filter state is stored in the `quick` query parameter.
- Sort and search remain in `sort` and `q`.
- URL values take precedence over session storage, so refresh and browser back/forward restore the category state.
- `filter_apply` sends the filter value and result count. `sort_apply` sends the selected sort value.

## Sorting

- Recommended: existing nutrition-weighted score. It is not presented as sales or popularity data.
- Protein descending, sugar ascending, calories ascending, protein density, and recent registration.
- Recent registration uses `app/data/newProducts.json`; products without a recorded registration date retain their existing relative order.
- Price efficiency is not shown because product prices are unavailable.

## Compare tray

- The shared comparison tray now accepts at most three products.
- It keeps the selected count, clear action, compare navigation, and global 96px spacer so mobile page content is not covered.

## Validation

- `npx tsc --noEmit`: passed.
- `git diff --check`: passed (line-ending warnings only).
- `npm run build`: timed out after 124 seconds without output in this local environment.
