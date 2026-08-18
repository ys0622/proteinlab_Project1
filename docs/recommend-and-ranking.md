# Recommendation And Ranking Roles

## Recommendation

`/recommend` is a personal product-discovery flow. It uses four inputs in total:

1. Product form: drink, bar, yogurt, or shake.
2. Intake purpose: muscle support, diet, daily supplementation, or recovery.
3. Primary priority: protein, lower sugar, lower calories, or protein density.
4. Conditions to avoid or limit: category-specific nutrition and format conditions.

The API first narrows results using supported category conditions, then scores candidates by purpose and the selected priority. Product reasons must identify the selected priority. The diversity selector continues to limit repeated brands and subtypes.

`recommend_start` is sent when a visitor starts the questions. `recommend_complete` is sent only after one or more results are returned. A zero-result response shows condition-relaxation guidance and a category link; it does not send `recommend_complete`.

Recommendation result cards keep product-detail and compare actions through the shared product card. No verified ProteinLab affiliate mapping is available, so the result cards do not add a purchase CTA or `affiliate_click`.

## Ranking

`/ranking` is an objective, category-relative nutrition comparison. It ranks products by one selected metric:

- Protein density
- Diet score
- Performance score

It does not represent sales, purchases, or popularity. The page displays its source fields, that behavioral data is not used, and its data reference date. Price-efficiency rankings are excluded because comparable current price data is unavailable.

`/trending` remains the separate behavioral-interest surface. It uses recorded product views with the existing hybrid scoring rule and refreshes from the popularity API. Its labels must not imply verified purchases or sales.

## Curation Boundaries

| Surface | Primary role | Avoid |
|---|---|---|
| Home | Recent interest and category entry | Repeating the full ranking or personalized recommendations |
| Category | Full product exploration and filters | Calling a default sort a sales ranking |
| Recommend | Personal conditions and priorities | Reusing generic ranking labels as tailored results |
| Ranking | Objective nutrition comparison | Sales or purchase claims |
| Trending | Recorded visitor interest | Sales claims or personal-fit claims |
| Guides | Problem-specific product education | Repeating broad catalog curation |

## Validation Checklist

- Start recommendation once and confirm `recommend_start`.
- Test each product form with one purpose, one priority, and zero or more conditions.
- Confirm result cards expose product detail and compare actions.
- Confirm a zero-result API response shows relaxation guidance and does not send `recommend_complete`.
- Confirm ranking metric changes retain objective-method wording and the `/trending` link.
- Confirm mobile layout for recommendation options, result cards, and ranking method notice.
