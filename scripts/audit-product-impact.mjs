import { readFile, readdir } from "node:fs/promises";
import { resolve, relative } from "node:path";

const root = resolve(process.cwd());
const drinksPath = resolve(root, "app/data/drinkProductsData.json");
const barsPath = resolve(root, "app/data/barProductsData.json");
const picksPath = resolve(root, "app/data/picksContent.json");
const guidesRoot = resolve(root, "app/guides");

function formatNumber(value) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function parseDensityValue(density) {
  if (!density || typeof density !== "string") return 0;
  const match = density.match(/(\d+(?:\.\d+)?)/);
  return match ? Number.parseFloat(match[1]) : 0;
}

function hasGrade(product, keyword) {
  return Array.isArray(product.gradeTags)
    ? product.gradeTags.some((tag) => typeof tag === "string" && tag.includes(keyword))
    : false;
}

function isVeganDrink(product) {
  const haystack = [product.proteinSource, product.name, ...(product.tags ?? [])]
    .filter(Boolean)
    .join(" ");
  return haystack.includes("식물성");
}

function isConvenienceDrink(product) {
  const combined = `${product.brand ?? ""} ${product.name ?? ""}`;
  return [
    "더단백",
    "셀렉스",
    "하이뮨",
    "랩노쉬",
    "닥터유",
    "뉴케어 올프로틴",
  ].some((keyword) => combined.includes(keyword));
}

function isConvenienceBar(product) {
  const combined = `${product.brand ?? ""} ${product.name ?? ""}`;
  return ["닥터유", "랩노쉬", "롯데"].some((keyword) => combined.includes(keyword));
}

function isWaterDrink(product) {
  return typeof product.drinkType === "string" && product.drinkType.includes("워터");
}

function matchesRunningDrink(product) {
  return (
    (product.proteinPerServing ?? 0) >= 15 &&
    (product.proteinPerServing ?? 0) <= 25 &&
    (product.sugar ?? 999) <= 10
  );
}

function matchesRunningBar(product) {
  return (
    (product.proteinPerServing ?? 0) >= 10 &&
    (product.proteinPerServing ?? 0) <= 20 &&
    (product.sugar ?? 999) <= 10
  );
}

const drinkCurations = [
  { slug: "zero-sugar", label: "당류 0g", filter: (p) => (p.sugar ?? 0) <= 0 },
  {
    slug: "light-protein-under-20",
    label: "라이트 20g 미만",
    filter: (p) => (p.proteinPerServing ?? 0) < 20,
  },
  { slug: "high-protein-20", label: "고단백 20g+", filter: (p) => (p.proteinPerServing ?? 0) >= 20 },
  { slug: "high-protein", label: "초고단백 30g+", filter: (p) => (p.proteinPerServing ?? 0) >= 30 },
  { slug: "protein-water", label: "워터형", filter: isWaterDrink },
  { slug: "lactose-free", label: "락토프리", filter: (p) => p.variant === "락토프리" },
  { slug: "density-a", label: "단백질 밀도 A", filter: (p) => hasGrade(p, "단백질 밀도 A") },
  { slug: "diet-a", label: "다이어트 A", filter: (p) => hasGrade(p, "다이어트 A") },
  { slug: "fitness-a", label: "퍼포먼스 A", filter: (p) => hasGrade(p, "퍼포먼스 A") },
  { slug: "vegan", label: "식물성", filter: isVeganDrink },
  { slug: "running", label: "러닝", filter: matchesRunningDrink },
  { slug: "convenience", label: "편의점", filter: isConvenienceDrink },
];

const barCurations = [
  { slug: "bar-high-protein-20", label: "고단백 20g+", filter: (p) => (p.proteinPerServing ?? 0) >= 20 },
  { slug: "bar-high-protein-15", label: "고단백 15g+", filter: (p) => (p.proteinPerServing ?? 0) >= 15 },
  { slug: "bar-low-sugar", label: "저당", filter: (p) => (p.sugar ?? 0) < 5 },
  { slug: "bar-low-calorie", label: "저칼로리", filter: (p) => (p.calories ?? 999) < 200 },
  {
    slug: "bar-choco",
    label: "초코",
    filter: (p) => /초코|초콜|choco|cacao/i.test(`${p.name ?? ""} ${p.flavor ?? ""}`),
  },
  {
    slug: "bar-nut",
    label: "견과",
    filter: (p) =>
      /견과|아몬드|땅콩|호두|캐슈/i.test(
        `${p.name ?? ""} ${p.flavor ?? ""} ${(p.tags ?? []).join(" ")}`,
      ),
  },
  {
    slug: "bar-no-nut",
    label: "무견과",
    filter: (p) =>
      !/견과|아몬드|땅콩|호두|캐슈/i.test(
        `${p.name ?? ""} ${p.flavor ?? ""} ${(p.tags ?? []).join(" ")}`,
      ),
  },
  { slug: "bar-large", label: "대용량", filter: (p) => Number.parseInt(p.capacity, 10) >= 60 },
  { slug: "bar-small", label: "소용량", filter: (p) => Number.parseInt(p.capacity, 10) <= 50 },
  { slug: "bar-high-density", label: "단백질 밀도 A", filter: (p) => parseDensityValue(p.density) >= 8 },
  { slug: "running", label: "러닝", filter: matchesRunningBar },
  { slug: "convenience", label: "편의점", filter: isConvenienceBar },
];

async function readJson(path) {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw);
}

async function walkPages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkPages(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name === "page.tsx") {
      files.push(fullPath);
    }
  }

  return files;
}

function getMissingRequiredFields(products, options = {}) {
  const { requireGrades = false } = options;
  return products.filter(
    (product) =>
      typeof product.proteinPerServing !== "number" ||
      typeof product.calories !== "number" ||
      typeof product.sugar !== "number" ||
      !product.density ||
      parseDensityValue(product.density) <= 0 ||
      (requireGrades &&
        (!Array.isArray(product.gradeTags) || product.gradeTags.length === 0)),
  );
}

function getTopByDensity(products, limit = 5) {
  return [...products]
    .sort((a, b) => parseDensityValue(b.density) - parseDensityValue(a.density))
    .slice(0, limit);
}

function printSection(title) {
  console.log(`\n=== ${title} ===`);
}

function printList(items) {
  for (const item of items) {
    console.log(`- ${item}`);
  }
}

async function main() {
  const [drinks, bars, picks] = await Promise.all([
    readJson(drinksPath),
    readJson(barsPath),
    readJson(picksPath),
  ]);

  const warnings = [];

  console.log("ProteinLab 신규 제품 영향 점검");
  console.log(`생성 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`);

  printSection("1. 제품 수");
  console.log(`- 단백질 음료: ${formatNumber(drinks.length)}개`);
  console.log(`- 단백질 바: ${formatNumber(bars.length)}개`);
  console.log(`- 전체: ${formatNumber(drinks.length + bars.length)}개`);

  const drinkMissing = getMissingRequiredFields(drinks, { requireGrades: true });
  const barMissing = getMissingRequiredFields(bars, { requireGrades: false });

  printSection("2. 제품 추천 / 랭킹 & 등급 기준 점검");
  console.log(`- 음료 필수 데이터 누락: ${drinkMissing.length}개`);
  console.log(`- 바 필수 데이터 누락: ${barMissing.length}개`);

  if (drinkMissing.length > 0) {
    warnings.push(`음료 필수 데이터 누락 ${drinkMissing.length}개`);
    printList(drinkMissing.slice(0, 10).map((p) => `${p.slug} (${p.name})`));
  }
  if (barMissing.length > 0) {
    warnings.push(`바 필수 데이터 누락 ${barMissing.length}개`);
    printList(barMissing.slice(0, 10).map((p) => `${p.slug} (${p.name})`));
  }

  console.log("- 음료 단백질 밀도 상위 5개");
  printList(
    getTopByDensity(drinks).map(
      (p, index) => `${index + 1}. ${p.name} / ${p.density} / ${p.gradeTags?.join(", ") ?? "-"}`,
    ),
  );

  console.log("- 바 단백질 밀도 상위 5개");
  printList(
    getTopByDensity(bars).map(
      (p, index) => `${index + 1}. ${p.name} / ${p.density} / ${p.gradeTags?.join(", ") ?? "-"}`,
    ),
  );

  printSection("3. 빠른 큐레이션 점검");
  const emptyCurations = [];

  console.log("[음료]");
  for (const curation of drinkCurations) {
    const count = drinks.filter(curation.filter).length;
    console.log(`- ${curation.label} (${curation.slug}): ${formatNumber(count)}개`);
    if (count === 0) emptyCurations.push(`drink:${curation.slug}`);
  }

  console.log("[바]");
  for (const curation of barCurations) {
    const count = bars.filter(curation.filter).length;
    console.log(`- ${curation.label} (${curation.slug}): ${formatNumber(count)}개`);
    if (count === 0) emptyCurations.push(`bar:${curation.slug}`);
  }

  if (emptyCurations.length > 0) {
    warnings.push(`빈 빠른 큐레이션 ${emptyCurations.length}건`);
  }

  printSection("4. 단백질 가이드 추천/비교 연결 점검");
  const guidePages = (await walkPages(guidesRoot)).filter(
    (path) => !path.includes("[track]") && !path.endsWith("\\page.tsx"),
  );
  const productEntryPages = [];

  for (const filePath of guidePages) {
    const source = await readFile(filePath, "utf8");
    const hasRecommendationLink =
      source.includes('href="/recommend"') ||
      source.includes('href="/ranking"') ||
      source.includes('href="/compare"') ||
      source.includes('href="/bars"') ||
      source.includes('href="/picks/') ||
      source.includes('?curation=');

    if (!hasRecommendationLink) {
      productEntryPages.push(relative(root, filePath));
    }
  }

  console.log(`- 제품 비교/추천 진입 링크 없는 가이드 페이지: ${productEntryPages.length}개`);
  if (productEntryPages.length > 0) {
    warnings.push(`제품 진입 링크 없는 가이드 페이지 ${productEntryPages.length}개`);
    printList(productEntryPages.slice(0, 20));
  }

  printSection("5. Picks 콘텐츠 점검");
  const pickEntries = Object.entries(picks);
  const emptyRecommendations = pickEntries
    .filter(([, value]) => !Array.isArray(value.recommendations) || value.recommendations.length === 0)
    .map(([slug]) => slug);
  const emptyCriteria = pickEntries
    .filter(([, value]) => !Array.isArray(value.criteria) || value.criteria.length === 0)
    .map(([slug]) => slug);

  console.log(`- 추천 문구 비어 있는 picks: ${emptyRecommendations.length}개`);
  console.log(`- 기준 문구 비어 있는 picks: ${emptyCriteria.length}개`);

  if (emptyRecommendations.length > 0) {
    warnings.push(`추천 문구 비어 있는 picks ${emptyRecommendations.length}개`);
    printList(emptyRecommendations);
  }
  if (emptyCriteria.length > 0) {
    warnings.push(`기준 문구 비어 있는 picks ${emptyCriteria.length}개`);
    printList(emptyCriteria);
  }

  printSection("6. 최종 요약");
  if (warnings.length === 0) {
    console.log("이상 없음. 신규 제품 등록 후 핵심 영향 범위가 모두 채워져 있습니다.");
    return;
  }

  console.log("아래 항목은 수동 검토가 필요합니다.");
  printList(warnings);
}

main().catch((error) => {
  console.error("신규 제품 영향 점검 스크립트 실행 실패");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
