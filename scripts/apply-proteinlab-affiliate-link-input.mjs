#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const inputPath = join(root, "docs/proteinlab-affiliate-link-input.csv");
const storePath = join(root, "app/data/affiliateLinks.proteinlab.json");
const allowedStatuses = new Set(["ACTIVE", "PENDING", "BROKEN", "INACTIVE"]);

function splitCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCsv(relativePath) {
  const lines = readFileSync(relativePath, "utf8")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter(Boolean);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? "").trim()]));
  });
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const rows = parseCsv(inputPath);
const store = JSON.parse(readFileSync(storePath, "utf8").replace(/^\uFEFF/, ""));
const records = Array.isArray(store.records) ? store.records : [];
const recordsByProductId = new Map(
  records
    .filter((record) => record.site === "proteinlab" && record.retailer === "coupang")
    .map((record) => [record.productId, record]),
);
const updates = [];

for (const row of rows) {
  const productId = row.product_id;
  const record = recordsByProductId.get(productId);
  const newUrl = row.new_proteinlab_url;
  if (!record || !newUrl) continue;

  const status = row.status || "PENDING";
  if (!allowedStatuses.has(status)) {
    throw new Error(`Invalid status for ${productId}: ${status}`);
  }
  if (!isValidUrl(newUrl)) {
    throw new Error(`Invalid new_proteinlab_url for ${productId}`);
  }
  if (status === "ACTIVE" && !row.affiliate_link_id) {
    throw new Error(`ACTIVE link requires affiliate_link_id for ${productId}`);
  }

  const next = {
    ...record,
    affiliateUrl: newUrl,
    affiliateLinkId: row.affiliate_link_id,
    channelId: row.channel_id || "proteinlab",
    status,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  const index = records.indexOf(record);
  records[index] = next;
  updates.push(productId);
}

store.records = records;
writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ input: "docs/proteinlab-affiliate-link-input.csv", updatedRecords: updates.length }, null, 2));
