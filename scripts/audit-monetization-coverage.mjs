#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const CATEGORY_FILES = [
  ["drink", "app/data/drinkProductsData.json"],
  ["bar", "app/data/barProductsData.json"],
  ["yogurt", "app/data/yogurtProductsData.json"],
  ["shake", "app/data/shakeProductsData.json"],
];

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

function hasValidUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}

function hasAnyPurchaseUrl(product) {
  return hasValidUrl(product.coupangUrl) || hasValidUrl(product.officialUrl) || hasValidUrl(product.naverUrl);
}

const products = CATEGORY_FILES.flatMap(([category, file]) =>
  readJson(file).map((product) => ({ ...product, category })),
);

const slugs = new Map();
const duplicateSlugs = [];
for (const product of products) {
  if (slugs.has(product.slug)) {
    duplicateSlugs.push(product.slug);
  }
  slugs.set(product.slug, product);
}

const highProteinDrinks = products
  .filter((product) => product.category === "drink" && (product.proteinPerServing ?? 0) >= 40)
  .sort((a, b) => (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0));

const highProteinDrinkBlockers = highProteinDrinks.filter((product) => !hasValidUrl(product.coupangUrl));
const noPurchaseUrl = products.filter((product) => !hasAnyPurchaseUrl(product));
const noCoupangUrl = products.filter((product) => !hasValidUrl(product.coupangUrl));

console.log("\n## monetization coverage");
console.log(
  JSON.stringify(
    {
      totalProducts: products.length,
      highProteinDrinkCount: highProteinDrinks.length,
      highProteinDrinkCoupangMissing: highProteinDrinkBlockers.length,
      noPurchaseUrlCount: noPurchaseUrl.length,
      noCoupangUrlCount: noCoupangUrl.length,
      duplicateSlugCount: duplicateSlugs.length,
    },
    null,
    2,
  ),
);

console.log("\n## high-protein drinks");
for (const product of highProteinDrinks) {
  console.log(
    `${product.proteinPerServing}g\t${product.slug}\t${product.brand} ${product.name}\t${
      hasValidUrl(product.coupangUrl) ? "coupang" : "NO_COUPANG"
    }`,
  );
}

if (noPurchaseUrl.length > 0) {
  console.log("\n## products without any purchase url");
  for (const product of noPurchaseUrl) {
    console.log(`${product.category}\t${product.slug}\t${product.brand} ${product.name}`);
  }
}

if (noCoupangUrl.length > 0) {
  console.log("\n## products without coupang url");
  for (const product of noCoupangUrl) {
    console.log(`${product.category}\t${product.slug}\t${product.brand} ${product.name}`);
  }
}

if (duplicateSlugs.length > 0) {
  console.error("\nDuplicate product slugs found:");
  console.error(duplicateSlugs.join("\n"));
}

if (highProteinDrinkBlockers.length > 0) {
  console.error("\nHigh-protein drink Coupang links are required:");
  for (const product of highProteinDrinkBlockers) {
    console.error(`${product.proteinPerServing}g\t${product.slug}\t${product.brand} ${product.name}`);
  }
}

if (duplicateSlugs.length > 0 || highProteinDrinkBlockers.length > 0) {
  process.exitCode = 1;
}
