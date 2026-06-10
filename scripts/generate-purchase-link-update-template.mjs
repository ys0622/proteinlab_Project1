#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const SOURCES = [
  { category: "drink", label: "RTD drink", file: "docs/drink-coupang-template.csv" },
  { category: "bar", label: "Protein bar", file: "docs/bar-coupang-template.csv" },
  { category: "yogurt", label: "Yogurt", file: "docs/yogurt-coupang-template.csv" },
  { category: "shake", label: "Shake", file: "docs/shake-coupang-template.csv" },
];

const PRODUCT_INDEX = "public/products.json";
const OUTPUT = "docs/purchase-link-update-template.csv";
const FALLBACK_OUTPUT = "docs/purchase-link-update-template-with-new-products.csv";

function splitCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === "\"") {
      if (inQuotes && line[index + 1] === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);
  return result;
}

function parseCsv(relativePath) {
  const text = readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const headers = splitCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = {};

    headers.forEach((header, index) => {
      row[header] = (values[index] || "").trim();
    });

    return row;
  });
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\r\n]/.test(text)) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

const headers = [
  "category",
  "categoryLabel",
  "source",
  "No",
  "slug",
  "productName",
  "brand",
  "protein",
  "calories",
  "sugar",
  "currentCoupangUrl",
  "newCoupangUrl",
  "currentNaverUrl",
  "newNaverUrl",
  "currentOfficialUrl",
  "newOfficialUrl",
  "status",
  "memo",
];

const rows = [];
const slugs = new Set();
const sourceByCategory = new Map(SOURCES.map((source) => [source.category, source]));
const categoryAlias = {
  drinks: "drink",
  bars: "bar",
  yogurt: "yogurt",
  shake: "shake",
};

for (const source of SOURCES) {
  for (const row of parseCsv(source.file)) {
    if (!row.slug) continue;
    slugs.add(row.slug);
    rows.push({
      category: source.category,
      categoryLabel: source.label,
      source: "link-template",
      No: row.No,
      slug: row.slug,
      productName: row.productName,
      brand: "",
      protein: "",
      calories: "",
      sugar: "",
      currentCoupangUrl: row.coupangUrl,
      newCoupangUrl: "",
      currentNaverUrl: row.naverUrl,
      newNaverUrl: "",
      currentOfficialUrl: row.officialUrl,
      newOfficialUrl: "",
      status: "",
      memo: "",
    });
  }
}

const productIndex = JSON.parse(readFileSync(join(root, PRODUCT_INDEX), "utf8").replace(/^\uFEFF/, ""));
const productsBySlug = new Map((productIndex.products || []).map((product) => [product.slug, product]));

for (const row of rows) {
  const product = productsBySlug.get(row.slug);
  if (!product) continue;

  row.brand = product.brand ?? row.brand;
  row.protein = product.protein ?? row.protein;
  row.calories = product.calories ?? row.calories;
  row.sugar = product.sugar ?? row.sugar;
}

let appendedProducts = 0;

for (const product of productIndex.products || []) {
  if (!product.slug || slugs.has(product.slug)) continue;

  const category = categoryAlias[product.category] ?? product.category;
  const source = sourceByCategory.get(category);
  if (!source) continue;

  slugs.add(product.slug);
  appendedProducts += 1;
  rows.push({
    category,
    categoryLabel: source.label,
    source: "product-index",
    No: "",
    slug: product.slug,
    productName: product.name,
    brand: product.brand,
    protein: product.protein,
    calories: product.calories,
    sugar: product.sugar,
    currentCoupangUrl: "",
    newCoupangUrl: "",
    currentNaverUrl: "",
    newNaverUrl: "",
    currentOfficialUrl: "",
    newOfficialUrl: "",
    status: "new-product",
    memo: "Added from public/products.json because it was missing from category link templates.",
  });
}

rows.sort((a, b) => {
  const categoryOrder = SOURCES.findIndex((source) => source.category === a.category)
    - SOURCES.findIndex((source) => source.category === b.category);
  if (categoryOrder !== 0) return categoryOrder;
  const noOrder = Number(a.No || Number.MAX_SAFE_INTEGER) - Number(b.No || Number.MAX_SAFE_INTEGER);
  if (noOrder !== 0) return noOrder;
  return String(a.slug).localeCompare(String(b.slug));
});

const csv = [
  headers.join(","),
  ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
].join("\r\n");

let writtenOutput = OUTPUT;
try {
  writeFileSync(join(root, OUTPUT), `\uFEFF${csv}\r\n`, "utf8");
} catch (error) {
  if (error?.code !== "EBUSY") {
    throw error;
  }

  writtenOutput = FALLBACK_OUTPUT;
  writeFileSync(join(root, FALLBACK_OUTPUT), `\uFEFF${csv}\r\n`, "utf8");
}

console.log(`Wrote ${writtenOutput}`);
console.log(`Rows: ${rows.length}`);
console.log(`Appended missing products: ${appendedProducts}`);
