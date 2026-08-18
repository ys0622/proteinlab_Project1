#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputPath = join(root, "app/data/affiliateLinks.proteinlab.json");
const productFiles = [
  "app/data/drinkProductsData.json",
  "app/data/barProductsData.json",
  "app/data/yogurtProductsData.json",
  "app/data/shakeProductsData.json",
];

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

const existing = readJson("app/data/affiliateLinks.proteinlab.json");
const existingRecords = Array.isArray(existing.records) ? existing.records : [];
const existingByKey = new Map(
  existingRecords.map((record) => [`${record.productId}:${record.site}:${record.retailer}`, record]),
);
const products = productFiles.flatMap((file) => readJson(file));
const productIds = [...new Set(products.map((product) => product.slug))].sort();

if (productIds.length !== products.length) {
  throw new Error("Duplicate product IDs found while generating affiliate link template.");
}

const today = new Date().toISOString().slice(0, 10);
const couponRecords = productIds.map((productId) => {
  const key = `${productId}:proteinlab:coupang`;
  return (
    existingByKey.get(key) ?? {
      productId,
      site: "proteinlab",
      retailer: "coupang",
      affiliateUrl: "",
      affiliateLinkId: "",
      channelId: "proteinlab",
      status: "PENDING",
      updatedAt: today,
      lastCheckedAt: "",
    }
  );
});
const nonCoupangRecords = existingRecords.filter(
  (record) => !(record.site === "proteinlab" && record.retailer === "coupang"),
);
const store = {
  schemaVersion: 1,
  site: "proteinlab",
  records: [...couponRecords, ...nonCoupangRecords],
};

writeFileSync(outputPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
console.log(
  JSON.stringify(
    {
      output: "app/data/affiliateLinks.proteinlab.json",
      proteinlabCoupangRecords: couponRecords.length,
      pendingRecords: couponRecords.filter((record) => record.status === "PENDING").length,
    },
    null,
    2,
  ),
);
