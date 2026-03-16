import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function readJson(relPath) {
  return JSON.parse(readFileSync(resolve(root, relPath), "utf-8"));
}

const drinks = readJson("app/data/drinkProductsData.json");
const bars = readJson("app/data/barProductsData.json");
const yogurts = readJson("app/data/yogurtProductsData.json");

// barProductsData.ts 와 JSON 제품 수 불일치 경고 (TS는 JSON을 import하므로 동일해야 함)
// 향후 TS가 별도 배열을 가질 경우를 대비해 경고 로직만 유지
const BAR_TS_EXPECTED = bars.length; // 현재는 동일
if (bars.length !== BAR_TS_EXPECTED) {
  console.warn(
    `⚠️  경고: barProductsData.json(${bars.length}개)와 barProductsData.ts(${BAR_TS_EXPECTED}개) 제품 수가 다릅니다.`
  );
}

function mapProducts(list, category) {
  return list.map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category,
    protein: p.proteinPerServing ?? null,
    calories: p.calories ?? null,
    sugar: p.sugar ?? null,
  }));
}

const products = [
  ...mapProducts(drinks, "drinks"),
  ...mapProducts(bars, "bars"),
  ...mapProducts(yogurts, "yogurt"),
];

const output = {
  generated_at: new Date().toISOString(),
  total: products.length,
  categories: {
    drinks: drinks.length,
    bars: bars.length,
    yogurt: yogurts.length,
  },
  products,
};

writeFileSync(resolve(root, "public/products.json"), JSON.stringify(output, null, 2), "utf-8");

console.log("✅ products.json 생성 완료");
console.log(
  `   음료: ${drinks.length}개 / 바: ${bars.length}개 / 요거트: ${yogurts.length}개 / 합계: ${products.length}개`
);
