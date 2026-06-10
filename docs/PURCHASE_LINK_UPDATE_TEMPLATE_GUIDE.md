# Purchase Link Update Template

`docs/purchase-link-update-template.csv` is the Excel-friendly working template for updating purchase links.

## Columns

- `category`: Internal product category. One of `drink`, `bar`, `yogurt`, `shake`.
- `categoryLabel`: Human-readable category label.
- `source`: `link-template` for products already in category link templates, `product-index` for products appended from `public/products.json`.
- `No`: Existing row number from the source category template, when available.
- `slug`: Product identifier used by the site. Do not edit this value.
- `productName`: Product name for lookup.
- `brand`: Brand from the product index, when available.
- `protein`: Protein amount per product serving.
- `calories`: Calories per product serving.
- `sugar`: Sugar amount per product serving.
- `currentCoupangUrl`: Current Coupang product URL.
- `newCoupangUrl`: Paste the new Coupang product URL here.
- `currentNaverUrl`: Current Naver Shopping URL.
- `newNaverUrl`: Paste the new Naver Shopping URL here.
- `currentOfficialUrl`: Current official mall URL.
- `newOfficialUrl`: Paste the new official mall URL here.
- `status`: Optional work status, such as `done`, `skip`, or `check`.
- `memo`: Optional notes.

## Editing Rules

- Keep `slug` unchanged. It is the key used for syncing updates back to products.
- Fill only the `new*Url` columns when a link needs to change.
- Leave `new*Url` blank if the current URL should stay as-is.
- For Coupang, use a product detail URL containing `/vp/products/`, `itemId`, and `vendorItemId`; avoid search result URLs.
- Save as CSV UTF-8 when exporting from Excel.

## Regenerate

Run this after category templates change:

```powershell
node scripts/generate-purchase-link-update-template.mjs
```

If `purchase-link-update-template.csv` is open in Excel, Windows may lock the file. In that case the script writes:

```text
docs/purchase-link-update-template-with-new-products.csv
```
