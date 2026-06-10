#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const input = process.argv[2] || "docs/purchase-link-update-template-with-new-products 암호화해제.csv";

const CATEGORY_CONFIGS = {
  drink: {
    linkTemplate: "docs/drink-coupang-template.csv",
    productJson: "app/data/drinkProductsData.json",
  },
};

function splitDelimitedLine(line, delimiter) {
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

    if (char === delimiter && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);
  return result;
}

function detectDelimiter(firstLine) {
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  return tabCount > commaCount ? "\t" : ",";
}

function parseDelimited(relativePath) {
  const text = readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const delimiter = detectDelimiter(lines[0]);
  const headers = splitDelimitedLine(lines[0], delimiter).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = splitDelimitedLine(line, delimiter);
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

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

function normalizeUrl(value) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed || trimmed === "#") return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[\w.-]+\.[a-z]{2,}/i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

function normalizeCoupangProductUrl(value) {
  const normalized = normalizeUrl(value);
  if (!normalized) return "";

  try {
    const url = new URL(normalized);
    if (!url.hostname.toLowerCase().includes("coupang.com")) return "";

    const pageKey = url.pathname.match(/\/vp\/products\/(\d+)/)?.[1];
    const itemId = url.searchParams.get("itemId");
    const vendorItemId = url.searchParams.get("vendorItemId");

    if (!pageKey || !itemId || !vendorItemId) return "";

    const nextUrl = new URL(`https://www.coupang.com/vp/products/${pageKey}`);
    nextUrl.searchParams.set("itemId", itemId);
    nextUrl.searchParams.set("vendorItemId", vendorItemId);
    return nextUrl.toString();
  } catch {
    return "";
  }
}

function getTemplateCoupangUrl(row) {
  return normalizeCoupangProductUrl(row.newCoupangUrl || row.currentCoupangUrl || "");
}

function writeCsv(relativePath, headers, rows) {
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\r\n");

  writeFileSync(join(root, relativePath), `\uFEFF${csv}\r\n`, "utf8");
}

const rows = parseDelimited(input);
const report = [];

for (const [category, config] of Object.entries(CATEGORY_CONFIGS)) {
  const inputRows = rows.filter((row) => row.category === category);
  const products = readJson(config.productJson);
  const productsBySlug = new Map(products.map((product) => [product.slug, product]));
  const updateRows = [];

  for (const row of inputRows) {
    const product = productsBySlug.get(row.slug);
    if (!product) continue;

    const nextCoupangUrl = getTemplateCoupangUrl(row);
    if (!nextCoupangUrl) continue;

    const currentCoupangUrl = normalizeCoupangProductUrl(product.coupangUrl || "");
    if (currentCoupangUrl) continue;

    updateRows.push({
      slug: row.slug,
      productName: product.name,
      coupangUrl: nextCoupangUrl,
      naverUrl: normalizeUrl(product.naverUrl || row.currentNaverUrl || ""),
      officialUrl: normalizeUrl(product.officialUrl || row.currentOfficialUrl || ""),
    });
  }

  const updateBySlug = new Map(updateRows.map((row) => [row.slug, row]));
  const nextProducts = updateRows.length === 0 ? products : products.map((product) => {
    const update = updateBySlug.get(product.slug);
    if (!update) return product;
    return { ...product, coupangUrl: update.coupangUrl };
  });

  if (updateRows.length > 0) {
    writeFileSync(join(root, config.productJson), `${JSON.stringify(nextProducts, null, 2)}\n`, "utf8");
  }

  const templateRows = parseDelimited(config.linkTemplate);
  const templateSlugs = new Set(templateRows.map((row) => row.slug));
  let maxNo = templateRows.reduce((max, row) => Math.max(max, Number(row.No || 0)), 0);
  let repairedTemplateNames = 0;

  for (const row of templateRows) {
    const product = productsBySlug.get(row.slug);
    if (!product || row.productName === product.name) continue;

    row.productName = product.name;
    repairedTemplateNames += 1;
  }

  for (const update of updateRows) {
    if (templateSlugs.has(update.slug)) {
      const row = templateRows.find((item) => item.slug === update.slug);
      row.productName = update.productName;
      row.coupangUrl = update.coupangUrl;
      continue;
    }

    maxNo += 1;
    templateRows.push({
      No: String(maxNo),
      slug: update.slug,
      productName: update.productName,
      coupangUrl: update.coupangUrl,
      naverUrl: update.naverUrl,
      officialUrl: update.officialUrl,
    });
  }

  if (updateRows.length > 0 || repairedTemplateNames > 0) {
    writeCsv(config.linkTemplate, ["No", "slug", "productName", "coupangUrl", "naverUrl", "officialUrl"], templateRows);
  }

  report.push({
    category,
    updatedProducts: updateRows.length,
    updatedTemplates: updateRows.length,
    repairedTemplateNames,
    slugs: updateRows.map((row) => row.slug),
  });
}

console.log(JSON.stringify(report, null, 2));
