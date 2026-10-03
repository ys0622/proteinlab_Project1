#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const productFiles = [
  "app/data/drinkProductsData.json",
  "app/data/barProductsData.json",
  "app/data/yogurtProductsData.json",
  "app/data/shakeProductsData.json",
];
const blockedUrls = ["https://link.coupang.com/a/gaIdNRGs2u"];

const report = [];

for (const relativePath of productFiles) {
  const path = join(root, relativePath);
  const source = readFileSync(path, "utf8");
  let next = source;
  let cleared = 0;

  for (const blockedUrl of blockedUrls) {
    const needle = `"coupangUrl": "${blockedUrl}"`;
    const matches = next.split(needle).length - 1;
    if (matches === 0) continue;
    next = next.replaceAll(needle, '"coupangUrl": ""');
    cleared += matches;
  }

  if (next !== source) {
    writeFileSync(path, next, "utf8");
  }

  report.push({ file: relativePath, cleared });
}

console.log(JSON.stringify({ cleared: report.reduce((sum, row) => sum + row.cleared, 0), files: report }, null, 2));
