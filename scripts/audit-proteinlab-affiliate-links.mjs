#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const productFiles = [
  "app/data/drinkProductsData.json",
  "app/data/barProductsData.json",
  "app/data/yogurtProductsData.json",
  "app/data/shakeProductsData.json",
];
const allowedStatuses = new Set(["ACTIVE", "PENDING", "BROKEN", "INACTIVE"]);
const allowedRetailers = new Set(["coupang", "naver", "official"]);
const nonProductCoupangUrls = new Set(["https://link.coupang.com/a/gaIdNRGs2u"]);

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function getUrlType(value) {
  if (!value) return "missing";
  try {
    const host = new URL(value).hostname.toLowerCase();
    if (host === "link.coupang.com" || host.endsWith(".link.coupang.com")) return "coupang_affiliate";
    if (host.includes("coupang.com")) return "coupang_regular";
    return "other_url";
  } catch {
    return "invalid";
  }
}

const products = productFiles.flatMap((file) => readJson(file));
const productIds = new Set(products.map((product) => product.slug));
const store = readJson("app/data/affiliateLinks.proteinlab.json");
const records = Array.isArray(store.records) ? store.records : [];
const coupangRecords = records.filter((record) => record.site === "proteinlab" && record.retailer === "coupang");
const recordKeys = new Set();
const duplicateKeys = [];
const productIdCounts = new Map();
const orphanProductIds = [];
const invalidRecords = [];
const urlCounts = new Map();

for (const record of records) {
  const key = `${record.productId}:${record.site}:${record.retailer}`;
  if (recordKeys.has(key)) duplicateKeys.push(key);
  recordKeys.add(key);
  if (record.site === "proteinlab" && record.retailer === "coupang") {
    productIdCounts.set(record.productId, (productIdCounts.get(record.productId) ?? 0) + 1);
    if (record.affiliateUrl) {
      urlCounts.set(record.affiliateUrl, (urlCounts.get(record.affiliateUrl) ?? 0) + 1);
    }
  }
  if (!productIds.has(record.productId)) orphanProductIds.push(record.productId);
  if (!allowedRetailers.has(record.retailer) || !allowedStatuses.has(record.status) || !record.channelId) {
    invalidRecords.push(record.productId);
  }
  if (record.status === "ACTIVE" && !isValidUrl(record.affiliateUrl)) {
    invalidRecords.push(record.productId);
  }
}

const mappedProductIds = new Set(coupangRecords.map((record) => record.productId));
const missingProductIds = [...productIds].filter((productId) => !mappedProductIds.has(productId)).sort();
const pendingProductIds = coupangRecords
  .filter((record) => record.status === "PENDING" || !record.affiliateUrl)
  .map((record) => record.productId)
  .sort();
const duplicateProductIds = [...productIdCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([productId]) => productId);
const duplicateUrls = [...urlCounts.entries()].filter(([, count]) => count > 1);
const urlTypes = coupangRecords.reduce(
  (summary, record) => {
    const type = getUrlType(record.affiliateUrl);
    summary[type] = (summary[type] ?? 0) + 1;
    return summary;
  },
  {},
);
const productLinkSummary = products.reduce(
  (summary, product) => {
    const value = typeof product.coupangUrl === "string" ? product.coupangUrl.trim() : "";
    const type = getUrlType(value);
    summary[type] = (summary[type] ?? 0) + 1;
    if (nonProductCoupangUrls.has(value)) {
      summary.nonProduct += 1;
      summary.nonProductSlugs.push(product.slug);
    }
    return summary;
  },
  { missing: 0, invalid: 0, coupang_affiliate: 0, coupang_regular: 0, other_url: 0, nonProduct: 0, nonProductSlugs: [] },
);

console.log(
  JSON.stringify(
    {
      totalProducts: productIds.size,
      proteinlabCoupangRecords: coupangRecords.length,
      activeRecords: coupangRecords.filter((record) => record.status === "ACTIVE").length,
      pendingRecords: pendingProductIds.length,
      linkMissingRecords: coupangRecords.filter((record) => !record.affiliateUrl).length,
      missingProductRecords: missingProductIds.length,
      duplicateProductIds: duplicateProductIds.length,
      duplicateUrls: duplicateUrls.length,
      duplicateUrlProductRecords: duplicateUrls.reduce((sum, [, count]) => sum + count, 0),
      duplicateRecordKeys: duplicateKeys.length,
      orphanProductRecords: orphanProductIds.length,
      invalidRecords: invalidRecords.length,
      urlTypes,
      configuredProductLinks: productLinkSummary,
    },
    null,
    2,
  ),
);

if (process.argv.includes("--verbose")) {
  if (missingProductIds.length > 0) console.log(`missingProductIds\n${missingProductIds.join("\n")}`);
  if (pendingProductIds.length > 0) console.log(`pendingProductIds\n${pendingProductIds.join("\n")}`);
  if (duplicateUrls.length > 0) console.log(`duplicateUrls\n${duplicateUrls.map(([url]) => url).join("\n")}`);
  if (productLinkSummary.nonProductSlugs.length > 0) {
    console.log(`nonProductLinkSlugs\n${productLinkSummary.nonProductSlugs.join("\n")}`);
  }
}

if (
  duplicateKeys.length ||
  duplicateProductIds.length ||
  duplicateUrls.length ||
  orphanProductIds.length ||
  invalidRecords.length ||
  productLinkSummary.invalid > 0 ||
  productLinkSummary.other_url > 0 ||
  productLinkSummary.nonProduct > 0
) {
  process.exitCode = 1;
}
