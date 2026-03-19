#!/usr/bin/env node
/**
 * 정리된 구매 링크 데이터를 KV bulk 업로드 형식으로 생성.
 * - docs/purchase-links-cleanup-result.json → wrangler kv:bulk put용 JSON
 * - app/data/productOverrideLocal.json → 로컬 개발용 fallback (KV 없을 때)
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const resultPath = join(ROOT, "docs/purchase-links-cleanup-result.json");
const kvBulkPath = join(ROOT, "docs/kv-purchase-links-bulk.json");
const localOverridePath = join(ROOT, "app/data/productOverrideLocal.json");

function main() {
  const raw = readFileSync(resultPath, "utf8");
  const data = JSON.parse(raw);
  const items = Array.isArray(data.items) ? data.items : data;

  const kvBulk = [];
  const localOverride = {};

  for (const item of items) {
    const { slug, coupangUrl, naverUrl, officialUrl } = item;
    const value = { coupangUrl, naverUrl, officialUrl };
    const key = `product-override:${slug}`;

    kvBulk.push({
      key,
      value: JSON.stringify(value),
    });

    localOverride[slug] = value;
  }

  writeFileSync(kvBulkPath, JSON.stringify(kvBulk, null, 2), "utf8");
  writeFileSync(localOverridePath, JSON.stringify(localOverride, null, 2), "utf8");

  const withLinks = items.filter(
    (i) => i.coupangUrl || i.naverUrl || i.officialUrl,
  ).length;
  const withoutLinks = items.filter(
    (i) => !i.coupangUrl && !i.naverUrl && !i.officialUrl,
  );

  console.log(`KV bulk: ${kvBulkPath}`);
  console.log(`로컬 fallback: ${localOverridePath}`);
  console.log(`총 ${items.length}개 제품`);
  console.log(`반영 완료된 제품 수 (링크 1개 이상): ${withLinks}개`);
  console.log(`아직 링크 없는 제품: ${withoutLinks.length}개`);
  console.log("\n--- 링크 없는 제품 리스트 ---");
  withoutLinks.forEach((i) => console.log(i.slug));
  console.log("\nKV 업로드: npx wrangler kv:bulk put docs/kv-purchase-links-bulk.json --namespace-id=cb0554d5dbaf413d8fe971f91d1d968c");
}

main();
