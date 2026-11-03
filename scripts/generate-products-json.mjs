import { mkdirSync, readFileSync, writeFileSync } from "fs";
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
const shakes = readJson("app/data/shakeProductsData.json");
const soymilks = readJson("app/data/soymilkProductsData.json");
const powders = readJson("app/data/powderProductsData.json");

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
    productType:
      p.productType ??
      ({ drinks: "drink", bars: "bar", yogurt: "yogurt", shake: "shake", soymilk: "soymilk", powder: "powder" }[category]),
    capacity: p.capacity ?? "",
    variant: p.variant ?? "",
    tags: Array.isArray(p.tags) ? p.tags : [],
    protein: p.proteinPerServing ?? null,
    proteinPerServing: p.proteinPerServing ?? 0,
    calories: p.calories ?? null,
    sugar: p.sugar ?? null,
    density: p.density ?? "-",
    productUrl: p.productUrl ?? "#",
    coupangUrl: p.coupangUrl ?? null,
    naverUrl: p.naverUrl ?? null,
    officialUrl: p.officialUrl ?? null,
    gradeTags: Array.isArray(p.gradeTags) ? p.gradeTags : [],
    yogurtType: p.yogurtType ?? null,
  }));
}

const products = [
  ...mapProducts(drinks, "drinks"),
  ...mapProducts(bars, "bars"),
  ...mapProducts(yogurts, "yogurt"),
  ...mapProducts(shakes, "shake"),
  ...mapProducts(soymilks, "soymilk"),
  ...mapProducts(powders, "powder"),
];

const output = {
  generated_at: new Date().toISOString(),
  total: products.length,
  categories: {
    drinks: drinks.length,
    bars: bars.length,
    yogurt: yogurts.length,
    shake: shakes.length,
    soymilk: soymilks.length,
    powder: powders.length,
  },
  products,
};

// 전체 목록은 내부 스크립트용으로만 남긴다. 2026-11-01까지 public/products.json으로 공개했는데 다른 사이트가 통째로 가져다 썼다
// (docs/competitor-proteinfact-2026-11-01.md). 화면은 /api/products/search로 필요한 제품만 받는다.
mkdirSync(resolve(root, ".generated"), { recursive: true });
writeFileSync(resolve(root, ".generated/products.json"), JSON.stringify(output, null, 2), "utf-8");
writeFileSync(
  resolve(root, "app/data/productCategoryCounts.json"),
  JSON.stringify(
    {
      drink: drinks.length,
      bar: bars.length,
      yogurt: yogurts.length,
      shake: shakes.length,
      soymilk: soymilks.length,
      powder: powders.length,
    },
    null,
    2,
  ) + "\n",
  "utf-8",
);

console.log("✅ products.json 생성 완료");
console.log(
  `   음료: ${drinks.length}개 / 바: ${bars.length}개 / 요거트: ${yogurts.length}개 / 쉐이크: ${shakes.length}개 / 두유: ${soymilks.length}개 / 파우더: ${powders.length}개 / 합계: ${products.length}개`
);
