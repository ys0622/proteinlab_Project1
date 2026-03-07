#!/usr/bin/env node
/**
 * proteinlab.kr 제품 페이지를 fetch하여 상세 데이터를 추출합니다.
 * 실행: node scripts/sync-from-proteinlab.mjs
 * 결과: synced-products.json 생성 (app/data/ 또는 프로젝트 루트)
 *
 * 사용 전 app/data/proteinlabSlugMap.ts 에 우리 slug → proteinlab slug 매핑을 채우세요.
 */

const PROTEINLAB_BASE = "https://proteinlab.kr/product";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** app/data/proteinlabSlugMap.json에서 매핑 로드 (proteinlabSlugMap.ts와 동기 유지) */
const jsonPath = path.join(__dirname, "..", "app", "data", "proteinlabSlugMap.json");
if (!fs.existsSync(jsonPath)) {
  throw new Error(`proteinlabSlugMap.json not found at ${jsonPath}. app/data/proteinlabSlugMap.ts와 동일하게 JSON을 유지하세요.`);
}
const SLUG_MAP = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

function extractValue(html, label, unitPattern = "[\\d.]+") {
  const patterns = [
    new RegExp(`${label}[^\\d]*?(${unitPattern}\\s*[a-zA-Z/]*)\\s*(?:</|$)`, "i"),
    new RegExp(`${label}[^\\d]*?([\\d.]+)`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].trim();
  }
  return null;
}

async function fetchProduct(ourSlug, theirSlug) {
  const url = `${PROTEINLAB_BASE}/${theirSlug}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "ProteinLab-Sync/1.0" } });
    const html = await res.text();
    if (!res.ok || html.includes("찾을 수 없습니다")) return { ourSlug, error: "not_found" };

    const get = (label, pattern) => extractValue(html, label, pattern) ?? null;
    const num = (label) => {
      const v = get(label);
      return v ? parseFloat(v.replace(/[^\d.]/g, "")) : null;
    };

    return {
      ourSlug,
      manufacturer: get("대상웰라이프|빙그레|매일유업|일동") || get("제조사"),
      flavor: get("맛:"),
      proteinPerServing: num("단백질") ?? num("단백질\\s*\\(g\\)"),
      calories: num("칼로리"),
      sugar: num("당류"),
      density: get("단백질밀도") || get("단백질 밀도"),
      bcaa: get("BCAA"),
      proteinSource: get("단백질 급원"),
      fat: num("지방"),
      sodium: num("나트륨"),
      calorieDensity: get("칼로리밀도") || get("칼로리 밀도"),
      drinkType: get("음료 타입"),
    };
  } catch (e) {
    return { ourSlug, error: e.message };
  }
}

async function main() {
  const entries = Object.entries(SLUG_MAP);
  const results = [];
  for (const [ourSlug, theirSlug] of entries) {
    process.stderr.write(`Fetching ${ourSlug} -> ${theirSlug}...\n`);
    const data = await fetchProduct(ourSlug, theirSlug);
    results.push(data);
    await new Promise((r) => setTimeout(r, 400));
  }

  const outPath = path.join(__dirname, "..", "synced-products.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf8");
  console.log(`Wrote ${results.length} products to ${outPath}`);
  console.log("이 JSON을 app/data/products.ts 반영 시 참고하거나, 빌드 시 로드하도록 연동하세요.");
}

main().catch(console.error);
