#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const CATEGORY_CONFIGS = [
  ["drink", "docs/drink-coupang-template.csv", "app/data/drinkProductsData.json"],
  ["bar", "docs/bar-coupang-template.csv", "app/data/barProductsData.json"],
  ["yogurt", "docs/yogurt-coupang-template.csv", "app/data/yogurtProductsData.json"],
  ["shake", "docs/shake-coupang-template.csv", "app/data/shakeProductsData.json"],
];

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

function parseCsv(filePath) {
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/).filter(Boolean);
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

function normalizeUrl(url) {
  if (!url) return "";

  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[\w.-]+\.[a-z]{2,}/i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

function syncCategory(category, csvRelativePath, jsonRelativePath) {
  const csvRows = parseCsv(join(root, csvRelativePath));
  const jsonPath = join(root, jsonRelativePath);
  const products = JSON.parse(readFileSync(jsonPath, "utf8").replace(/^\uFEFF/, ""));
  const updatesBySlug = new Map(
    csvRows.map((row) => [
      row.slug,
      {
        coupangUrl: normalizeUrl(row.coupangUrl || ""),
        naverUrl: normalizeUrl(row.naverUrl || ""),
        officialUrl: normalizeUrl(row.officialUrl || ""),
      },
    ]),
  );

  let updatedProducts = 0;
  let updatedFields = 0;

  const nextProducts = products.map((product) => {
    const update = updatesBySlug.get(product.slug);
    if (!update) return product;

    let changed = false;
    const nextProduct = { ...product };

    for (const field of ["coupangUrl", "naverUrl", "officialUrl"]) {
      if (!update[field]) continue;
      if ((product[field] || "") === update[field]) continue;
      nextProduct[field] = update[field];
      changed = true;
      updatedFields += 1;
    }

    if (changed) {
      updatedProducts += 1;
      return nextProduct;
    }

    return product;
  });

  writeFileSync(jsonPath, `${JSON.stringify(nextProducts, null, 2)}\n`, "utf8");

  return {
    category,
    updatedProducts,
    updatedFields,
  };
}

const report = CATEGORY_CONFIGS.map(([category, csvPath, jsonPath]) =>
  syncCategory(category, csvPath, jsonPath),
);

for (const item of report) {
  console.log(
    `${item.category}: updatedProducts=${item.updatedProducts}, updatedFields=${item.updatedFields}`,
  );
}
