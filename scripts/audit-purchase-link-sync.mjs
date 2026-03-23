#!/usr/bin/env node

import { readFileSync } from "node:fs";
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

function auditCategory(category, csvRelativePath, jsonRelativePath) {
  const csvRows = parseCsv(join(root, csvRelativePath));
  const products = JSON.parse(
    readFileSync(join(root, jsonRelativePath), "utf8").replace(/^\uFEFF/, ""),
  );
  const productsBySlug = new Map(products.map((product) => [product.slug, product]));
  const missingSlugs = new Set();
  const mismatches = [];

  let providedFields = 0;
  let matchedFields = 0;

  for (const row of csvRows) {
    const slug = row.slug;
    const product = productsBySlug.get(slug);

    for (const field of ["coupangUrl", "naverUrl", "officialUrl"]) {
      const source = normalizeUrl(row[field] || "");
      if (!source) continue;

      providedFields += 1;

      if (!product) {
        missingSlugs.add(slug);
        continue;
      }

      const current = normalizeUrl(product[field] || "");
      if (source === current) {
        matchedFields += 1;
        continue;
      }

      mismatches.push({
        slug,
        field,
        source,
        current,
      });
    }
  }

  return {
    category,
    providedFields,
    matchedFields,
    missingSlugs: [...missingSlugs],
    mismatches,
  };
}

const report = CATEGORY_CONFIGS.map(([category, csvPath, jsonPath]) =>
  auditCategory(category, csvPath, jsonPath),
);

for (const categoryReport of report) {
  const {
    category,
    providedFields,
    matchedFields,
    missingSlugs,
    mismatches,
  } = categoryReport;

  console.log(`\n## ${category}`);
  console.log(
    JSON.stringify(
      {
        providedFields,
        matchedFields,
        missingSlugCount: missingSlugs.length,
        mismatchCount: mismatches.length,
      },
      null,
      2,
    ),
  );

  if (missingSlugs.length > 0) {
    console.log("missingSlugs");
    console.log(missingSlugs.join("\n"));
  }

  if (mismatches.length > 0) {
    console.log("mismatchSample");
    console.log(JSON.stringify(mismatches.slice(0, 10), null, 2));
  }
}
