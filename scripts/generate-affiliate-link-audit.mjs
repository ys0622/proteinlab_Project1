#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputPath = join(root, "docs/affiliate-link-audit.csv");
const categoryFiles = [
  ["drink", "app/data/drinkProductsData.json"],
  ["bar", "app/data/barProductsData.json"],
  ["yogurt", "app/data/yogurtProductsData.json"],
  ["shake", "app/data/shakeProductsData.json"],
];
const knownFallbackFile = "app/lib/purchaseLinks.ts";

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function classify(url) {
  if (!url || url === "#") return { isAffiliate: "FALSE", status: "MISSING_RAW_URL" };
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host === "link.coupang.com" || host.endsWith(".link.coupang.com")) {
      return { isAffiliate: "TRUE", status: "STATIC_AFFILIATE_LINK" };
    }
    if (host.includes("coupang.com")) {
      return { isAffiliate: "FALSE", status: "STANDARD_COUPANG_SOURCE" };
    }
  } catch {
    // Invalid values are reported as non-affiliate source data.
  }
  return { isAffiliate: "FALSE", status: "INVALID_OR_NON_COUPANG_URL" };
}

const fallbackSource = readFileSync(join(root, knownFallbackFile), "utf8");
const fallbackLinks = [...fallbackSource.matchAll(/"([^"]+)"\s*:\s*"(https:\/\/www\.coupang\.com\/vp\/products\/[^\"]+)"/g)].map(
  (match) => ({ slug: match[1], url: match[2] }),
);
const fallbackSlugs = new Set(fallbackLinks.map((link) => link.slug));
const products = categoryFiles.flatMap(([category, sourceFile]) =>
  readJson(sourceFile).map((product) => ({ ...product, category, sourceFile })),
);
const urlCounts = new Map();
for (const product of products) {
  const url = typeof product.coupangUrl === "string" ? product.coupangUrl.trim() : "";
  if (url) urlCounts.set(url, (urlCounts.get(url) ?? 0) + 1);
}

const rows = products.map((product) => {
  const affiliateUrl = typeof product.coupangUrl === "string" ? product.coupangUrl.trim() : "";
  const classification = classify(affiliateUrl);
  const hasFallback = !affiliateUrl && fallbackSlugs.has(product.slug);
  const usedPages = [
    `/${product.category === "drink" ? "drinks" : `${product.category}s`}`,
    `/product/${product.slug}`,
    "/compare",
    "ProductCard",
    "ProductDetailPurchaseActions",
    "CompareTable",
  ];
  if (product.category === "drink" && affiliateUrl) usedPages.push("GuideBuySection (top 4 only)");

  return {
    product_id: product.slug,
    product_name: `${product.brand ?? ""} ${product.name ?? ""}`.trim(),
    category: product.category,
    affiliate_url: affiliateUrl,
    source_file: product.sourceFile,
    used_pages: usedPages.join(" | "),
    duplicate_count: affiliateUrl ? (urlCounts.get(affiliateUrl) ?? 1) - 1 : 0,
    is_affiliate: classification.isAffiliate,
    site: "UNKNOWN",
    status: hasFallback ? "FALLBACK_IN_CODE" : classification.status,
    notes: hasFallback
      ? `Raw product data has no Coupang URL; ${knownFallbackFile} has a product-specific source URL. Site ownership cannot be inferred.`
      : classification.status === "STANDARD_COUPANG_SOURCE"
        ? "Runtime converts a valid product URL to /api/out/coupang; affiliate attribution depends on deployed credentials and has no site identifier."
        : classification.status === "STATIC_AFFILIATE_LINK"
          ? "Direct link.coupang.com link is used as-is; ownership/site cannot be inferred from code."
          : "No raw Coupang URL in product data.",
  };
});

for (const fallback of fallbackLinks) {
  const product = products.find((item) => item.slug === fallback.slug);
  rows.push({
    product_id: fallback.slug,
    product_name: product ? `${product.brand ?? ""} ${product.name ?? ""}`.trim() : "UNKNOWN",
    category: product?.category ?? "UNKNOWN",
    affiliate_url: fallback.url,
    source_file: knownFallbackFile,
    used_pages: "ProductCard | ProductDetailPurchaseActions | CompareTable (only when product data URL is missing)",
    duplicate_count: 0,
    is_affiliate: "FALSE",
    site: "UNKNOWN",
    status: "FALLBACK_SOURCE_IN_CODE",
    notes: "Directly embedded regular Coupang product URL. It is a fallback only and is currently bypassed when product data supplies coupangUrl.",
  });
}

const headers = [
  "product_id",
  "product_name",
  "category",
  "affiliate_url",
  "source_file",
  "used_pages",
  "duplicate_count",
  "is_affiliate",
  "site",
  "status",
  "notes",
];
const content = [headers.join(","), ...rows.map((row) => headers.map((header) => csv(row[header])).join(","))].join("\n") + "\n";
writeFileSync(outputPath, content, "utf8");

const productRawCoupangCount = products.filter(
  (product) => typeof product.coupangUrl === "string" && product.coupangUrl.trim(),
).length;
const coupangAuditRecordCount = rows.filter((row) => row.affiliate_url).length;
const staticAffiliateCount = rows.filter((row) => row.is_affiliate === "TRUE").length;
const duplicateRows = rows.filter((row) => row.duplicate_count > 0).length;
const rawMissing = rows.filter((row) => row.status === "MISSING_RAW_URL").length;
const fallbackRows = rows.filter((row) => row.status === "FALLBACK_IN_CODE").length;
console.log(JSON.stringify({ totalProducts: products.length, auditRows: rows.length, productRawCoupangCount, coupangAuditRecordCount, staticAffiliateCount, duplicateRows, rawMissing, fallbackRows, directCodeSourceCount: fallbackLinks.length }, null, 2));
