#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputPath = join(root, "docs/proteinlab-affiliate-link-input.csv");
const productFiles = [
  ["drink", "app/data/drinkProductsData.json"],
  ["bar", "app/data/barProductsData.json"],
  ["yogurt", "app/data/yogurtProductsData.json"],
  ["shake", "app/data/shakeProductsData.json"],
];

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const products = productFiles.flatMap(([category, file]) =>
  readJson(file).map((product) => ({ ...product, category })),
);
const store = readJson("app/data/affiliateLinks.proteinlab.json");
const records = Array.isArray(store.records) ? store.records : [];
const recordsByProductId = new Map(
  records
    .filter((record) => record.site === "proteinlab" && record.retailer === "coupang")
    .map((record) => [record.productId, record]),
);
const headers = [
  "product_id",
  "product_name",
  "brand",
  "category",
  "current_url",
  "new_proteinlab_url",
  "affiliate_link_id",
  "channel_id",
  "status",
  "notes",
];
const rows = products
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((product) => {
    const record = recordsByProductId.get(product.slug);
    const currentUrl = typeof product.coupangUrl === "string" ? product.coupangUrl : "";
    const status = record?.status ?? "PENDING";
    const hasVerifiedLink = status === "ACTIVE" && Boolean(record?.affiliateUrl);

    return {
      product_id: product.slug,
      product_name: product.name ?? "",
      brand: product.brand ?? "",
      category: product.category,
      current_url: currentUrl,
      new_proteinlab_url: hasVerifiedLink ? record.affiliateUrl : "",
      affiliate_link_id: hasVerifiedLink ? record.affiliateLinkId : "",
      channel_id: record?.channelId ?? "proteinlab",
      status,
      notes: hasVerifiedLink
        ? "Verified ProteinLab mapping. Update only after a replacement link is checked."
        : currentUrl
          ? "Existing Coupang URL is not confirmed as ProteinLab-only. Enter a newly issued ProteinLab link."
          : "No existing Coupang URL. Enter a newly issued ProteinLab link.",
    };
  });

writeFileSync(
  outputPath,
  `${[headers.join(","), ...rows.map((row) => headers.map((header) => csv(row[header])).join(","))].join("\n")}\n`,
  "utf8",
);

console.log(
  JSON.stringify(
    {
      output: "docs/proteinlab-affiliate-link-input.csv",
      totalProducts: rows.length,
      activeLinks: rows.filter((row) => row.status === "ACTIVE").length,
      pendingLinks: rows.filter((row) => row.status === "PENDING").length,
    },
    null,
    2,
  ),
);
