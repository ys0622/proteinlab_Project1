/**
 * 쿠팡 상품 URL 일괄 적용.
 *
 * 사용법: node scripts/apply-coupang-links.mjs inbox/coupang-links.csv [--dry-run]
 * CSV 열: slug, brand, name, current_link, coupang_product_url
 *   coupang_product_url 에는 쿠팡 상품 페이지 주소(https://www.coupang.com/vp/products/...?itemId=...&vendorItemId=...)를
 *   그대로 붙여 넣는다. 비워 두면 그 제품은 건너뛴다. 사이트가 /api/out/coupang 에서 제휴 딥링크로 변환한다.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const csvPath = args.find((a) => !a.startsWith("--"));
if (!csvPath) { console.error("사용법: node scripts/apply-coupang-links.mjs <csv> [--dry-run]"); process.exit(1); }

const files = ["drinkProductsData", "barProductsData", "shakeProductsData", "yogurtProductsData"]
  .map((name) => resolve(root, "app/data", name + ".json"))
  .filter((p) => { try { readFileSync(p); return true; } catch { return false; } });
const datasets = files.map((path) => ({ path, data: JSON.parse(readFileSync(path, "utf-8")), changed: false }));

const parseCsvLine = (line) => {
  const out = []; let cur = ""; let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out.map((v) => v.trim());
};

const rows = readFileSync(resolve(root, csvPath), "utf-8").replace(/^﻿/, "").split(/\r?\n/).filter(Boolean);
const header = parseCsvLine(rows[0]);
const iSlug = header.indexOf("slug"), iUrl = header.indexOf("coupang_product_url");
if (iSlug < 0 || iUrl < 0) { console.error("CSV에 slug, coupang_product_url 열이 필요합니다."); process.exit(1); }

let applied = 0, skipped = 0; const problems = [];
for (const line of rows.slice(1)) {
  const cols = parseCsvLine(line);
  const slug = cols[iSlug], url = cols[iUrl];
  if (!url) { skipped++; continue; }
  if (!/^https:\/\/www\.coupang\.com\/vp\/products\/\d+/.test(url) || !/itemId=\d+/.test(url) || !/vendorItemId=\d+/.test(url)) {
    problems.push(`${slug}: 상품 URL에 itemId와 vendorItemId가 모두 있어야 합니다 → ${url.slice(0, 70)}`);
    continue;
  }
  const target = datasets.find((d) => d.data.some((p) => p.slug === slug));
  if (!target) { problems.push(`${slug}: 제품을 찾지 못함`); continue; }
  const product = target.data.find((p) => p.slug === slug);
  product.coupangUrl = url;
  target.changed = true;
  applied++;
  console.log(`✔ ${slug}`);
}
if (!dryRun) for (const d of datasets) if (d.changed) writeFileSync(d.path, JSON.stringify(d.data, null, 2) + "\n", "utf-8");
console.log(`\n적용 ${applied}개 / 건너뜀(빈칸) ${skipped}개${dryRun ? " [dry-run]" : ""}`);
if (problems.length) console.log("확인 필요:\n- " + problems.join("\n- "));
