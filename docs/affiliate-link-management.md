# ProteinLab Affiliate Link Management

## 1. Site-level separation

- A link is identified by the compound key `productId + site + retailer`.
- `site` is always explicit: `proteinlab` or `caremap`.
- ProteinLab records are stored in `app/data/affiliateLinks.proteinlab.json`. CareMap must use its own site-specific store with `site: "caremap"`; do not copy ProteinLab records or URLs into it.
- The same product may have two different Coupang links, one for each site. They are separate records even when they resolve to the same product.

## 2. Storage and product ID rule

- The storage schema is defined in `app/data/affiliateLinks.ts`.
- `productId` must exactly equal the immutable product `slug` in the category product JSON files. Do not use product name, Coupang page key, or a retailer item ID as `productId`.
- The ProteinLab template contains one `coupang` record for every current product. New products must receive a matching `PENDING` record before their link is activated.
- Run `node scripts/generate-proteinlab-affiliate-link-template.mjs` after adding products. It preserves existing records and adds missing ProteinLab Coupang rows.

## 3. CSV input workflow

1. Run `npm run generate:affiliate-link-input` to refresh `docs/proteinlab-affiliate-link-input.csv` from the current product and mapping data.
2. Enter only newly issued, verified ProteinLab URLs in `new_proteinlab_url`. `current_url` is a legacy reference and is not evidence of ProteinLab ownership.
3. Add `affiliate_link_id`, keep `channel_id` as `proteinlab`, and set `status` to `ACTIVE` only after destination and ownership verification.
4. Run `npm run apply:affiliate-link-input` to copy non-empty `new_proteinlab_url` values into the ProteinLab mapping store.
5. Run `npm run audit:affiliate-links` before committing. Use `node scripts/audit-proteinlab-affiliate-links.mjs --verbose` to print affected IDs and duplicate URLs.

The apply script ignores blank `new_proteinlab_url` cells, so refreshing or importing an untouched template cannot erase an existing mapping.

## 4. Registering a new link

1. Open `app/data/affiliateLinks.proteinlab.json` and find the matching `productId`.
2. Enter the actual URL issued for the ProteinLab channel in `affiliateUrl`. Never fabricate a Coupang Partners URL.
3. Enter the issued or internally managed link identifier in `affiliateLinkId` when available.
4. Keep `site` as `proteinlab`, `retailer` as `coupang`, and `channelId` as `proteinlab`.
5. Change `status` to `ACTIVE`, set `updatedAt` to `YYYY-MM-DD`, and set `lastCheckedAt` after validating the destination.
6. Run `npm run audit:affiliate-links`. `ACTIVE` URLs must be valid HTTP(S) URLs and all product IDs must resolve to current products.

## 5. Replacing a link

- Replace only `affiliateUrl` and `affiliateLinkId` on the existing compound-key record.
- Set `status` to `PENDING` while an issued replacement URL has not been verified. Set `BROKEN` when a live link fails validation, and preserve the failed URL for investigation until it is intentionally replaced.
- Update `updatedAt` whenever a record changes and `lastCheckedAt` whenever its final destination is checked.
- Do not change `productId`, `site`, or `retailer` to represent a replacement; doing so creates an ambiguous attribution history.

## 6. Status values

| Status | Meaning | Eligible for future CTA use |
|---|---|---:|
| `ACTIVE` | Verified, intended link is ready for the specified site and retailer. | Yes |
| `PENDING` | Link still needs user input or verification. | No |
| `BROKEN` | Link failed destination or attribution validation. | No |
| `INACTIVE` | Link is deliberately disabled or retired. | No |

`getAffiliateLink()` and `getAffiliateUrl()` return `null` unless a record is `ACTIVE` with a valid HTTP(S) URL. This prevents an unfinished record from replacing an existing purchase path when a future integration is introduced.

## 7. Channel ID rule

- `channelId` is the stable internal site/channel label used to audit ownership. For the current ProteinLab store it is `proteinlab`; CareMap must use `caremap`.
- This field must not be overloaded with product ID, GA4 placement, category, or a temporary campaign label.
- Actual affiliate account values, API secrets, and tags remain environment configuration and must not be committed to this file.

## 8. GA4 placement measurement

- Do not create one Coupang link per page placement.
- Future CTA integration must use the selected affiliate record for destination and send page context through GA4 parameters, including `placement`, `page_type`, `product_id`, `store`, `affiliate_link_id`, `site`, and `channel_id`.
- `purchase_click` is the canonical purchase CTA event. `outbound_click` can remain a companion event but must not be added to the same KPI total.

## 9. Link error checks

- Run `npm run audit:affiliate-links` to check product coverage, duplicate product IDs, duplicate affiliate URLs, duplicate compound keys, unknown product IDs, invalid status/retailer values, missing channel IDs, malformed active URLs, and link URL type counts.
- URL type counts distinguish `link.coupang.com` affiliate URLs from regular `coupang.com` product URLs only by URL form. A regular URL is not proof of ProteinLab attribution and must stay `PENDING` until ownership is verified.
- Run the audit before a link mapping release and after bulk edits.
- A `BROKEN` record should be corrected in the data store before any UI integration uses it.

## 10. Preventing CareMap mixing

- Never use a `caremap` record in ProteinLab code or a `proteinlab` record in CareMap code.
- Never infer a site from category, page URL, or the existing Coupang URL. The `site` field is the sole ownership key.
- Static `link.coupang.com` URLs without a verified site record remain legacy links and must not be copied into the new store until their owner is confirmed.
