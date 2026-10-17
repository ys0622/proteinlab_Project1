/**
 * run-intake.mjs 결과(inbox/intake/<id>/)를 카테고리별 제품 데이터에 등록한다.
 *
 * 사용법: node scripts/intake/register.mjs <등록.json> [--dry-run]
 * 등록.json: [{ id, category, slug, brand, name, capacity, ...카테고리별 필드 }]
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const inputPath = args.find((arg) => !arg.startsWith("--"));
if (!inputPath) {
  console.error("사용법: node scripts/intake/register.mjs <등록.json> [--dry-run]");
  process.exit(1);
}

const CATEGORY_CONFIG = {
  drink: {
    data: "drinkProductsData.json",
    imageMap: "slugToImage.json",
    specMap: "slugToDrinkSpec.json",
    imageDir: "public/rtd-drink-image",
    specDir: "public/rtd-drink-spec",
    imageBox: { width: 600, height: 732 },
    feedRoute: "/drinks",
  },
  bar: {
    data: "barProductsData.json",
    imageMap: "slugToBarImage.json",
    specMap: "slugToBarSpec.json",
    imageDir: "public/bar-image",
    specDir: "public/bar-spec",
    imageBox: { width: 900, height: 420 },
    feedRoute: "/bars",
  },
  shake: {
    data: "shakeProductsData.json",
    imageMap: "slugToShakeImage.json",
    specMap: "slugToShakeSpec.json",
    imageDir: "public/shake-image",
    specDir: "public/shake-spec",
    imageBox: { width: 600, height: 732 },
    feedRoute: "/shake",
  },
  yogurt: {
    data: "yogurtProductsData.json",
    imageMap: "slugToYogurtImage.json",
    specMap: "slugToYogurtSpec.json",
    imageDir: "public/protein-yogurt-image",
    specDir: "public/protein-yogurt-spec",
    imageBox: { width: 732, height: 600 },
    feedRoute: "/yogurt",
  },
  soymilk: {
    data: "soymilkProductsData.json",
    imageMap: "slugToSoymilkImage.json",
    specMap: "slugToSoymilkSpec.json",
    imageDir: "public/soymilk-image",
    specDir: "public/soymilk-spec",
    imageBox: { width: 600, height: 732 },
    feedRoute: "/soymilk",
  },
};

const dataDir = resolve(root, "app/data");
const newProductsPath = join(dataDir, "newProducts.json");
const countsPath = join(dataDir, "productCategoryCounts.json");
const feedMetaPath = join(dataDir, "feedPageMeta.json");
const barTsPath = join(dataDir, "barProductsData.ts");
const load = (path) => JSON.parse(readFileSync(path, "utf-8"));

// 기존 파일의 줄바꿈(CRLF/LF)을 그대로 유지한다.
function writePreservingEol(path, text) {
  const crlf = existsSync(path) && readFileSync(path, "utf-8").includes("\r\n");
  const normalized = text.replace(/\r?\n/g, "\n");
  writeFileSync(path, crlf ? normalized.replace(/\n/g, "\r\n") : normalized, "utf-8");
}

function saveJson(path, value) {
  writePreservingEol(path, `${JSON.stringify(value, null, 2)}\n`);
}

const round1 = (value) => Math.round(value * 10) / 10;
const round2 = (value) => Math.round(value * 100) / 100;
const present = (value) => value !== undefined && value !== null && value !== "";
const addOptional = (target, key, value) => {
  if (present(value)) target[key] = value;
};

function capacityNumber(capacity, unit, where, errors) {
  const match = typeof capacity === "string" && capacity.trim().match(new RegExp(`^([0-9]+(?:\\.[0-9]+)?)\\s*${unit}$`, "i"));
  if (!match) {
    errors.push(`${where}: capacity는 숫자+${unit} 형식이어야 함`);
    return null;
  }
  const value = Number(match[1]);
  if (!(value > 0)) errors.push(`${where}: capacity는 0보다 커야 함`);
  return value;
}

function requireFields(item, fields, where, errors) {
  for (const field of fields) {
    if (!present(item[field])) errors.push(`${where}: '${field}' 누락`);
  }
}

function validateCategoryFields(item, where, errors) {
  if (item.category === "drink") {
    requireFields(item, ["variant", "tags", "manufacturer", "proteinSource", "drinkType"], where, errors);
  } else if (item.category === "shake") {
    requireFields(item, ["flavor"], where, errors);
  } else if (item.category === "yogurt") {
    requireFields(item, ["variant", "tags", "manufacturer", "flavor", "yogurtType", "storageType", "proteinPer100g"], where, errors);
    if (typeof item.lactoseFree !== "boolean") errors.push(`${where}: 'lactoseFree' boolean 필요`);
    if (typeof item.proteinPer100g !== "number" || !(item.proteinPer100g > 0)) errors.push(`${where}: 'proteinPer100g' 양수 필요`);
  } else if (item.category === "soymilk") {
    requireFields(item, ["variant", "tags", "flavor", "soymilkType"], where, errors);
    if (present(item.proteinSource) && item.proteinSource !== "대두") errors.push(`${where}: soymilk proteinSource는 '대두'여야 함`);
  }
  if (["drink", "yogurt", "soymilk"].includes(item.category) && present(item.tags)) {
    if (!Array.isArray(item.tags) || !item.tags.length || item.tags.some((tag) => typeof tag !== "string" || !tag)) {
      errors.push(`${where}: 'tags'는 하나 이상의 문자열 배열이어야 함`);
    }
  }
}

function nutritionObject(n) {
  const result = {};
  const fields = [
    ["caloriesKcal", "kcal"],
    ["proteinG", "protein_g"],
    ["carbsG", "carbs_g"],
    ["sugarsG", "sugar_g"],
    ["fatG", "fat_g"],
    ["satFatG", "sat_fat_g"],
    ["transFatG", "trans_fat_g"],
    ["cholesterolMg", "cholesterol_mg"],
    ["sodiumMg", "sodium_mg"],
    ["fiberG", "fiber_g"],
  ];
  for (const [output, input] of fields) if (n[input] != null) result[output] = n[input];
  return result;
}

function naverUrl(item) {
  const withCapacity = ["drink", "yogurt", "soymilk"].includes(item.category) && !item.name.toLowerCase().includes(item.capacity.toLowerCase());
  const query = `${item.brand} ${item.name}${withCapacity ? ` ${item.capacity}` : ""}`;
  return item.naverUrl ?? `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(query)}`;
}

function buildEntry(item, n, coupangUrl, capacityValue) {
  const common = {
    slug: item.slug,
    brand: item.brand,
    name: item.name,
    capacity: item.capacity,
  };
  const nutritionPerBottle = nutritionObject(n);

  if (item.category === "bar") {
    const entry = {
      ...common,
      variant: item.variant ?? "일반",
      tags: item.tags ?? ["바"],
      proteinPerServing: n.protein_g,
      calories: n.kcal,
      sugar: n.sugar_g,
      density: `${round2((n.protein_g / n.kcal) * 100)}g/100kcal`,
      productUrl: "#",
      productType: "bar",
      gradeTags: item.gradeTags ?? [],
      coupangUrl,
      naverUrl: naverUrl(item),
    };
    addOptional(entry, "officialUrl", item.officialUrl);
    entry.fat = n.fat_g;
    entry.sodium = n.sodium_mg;
    return entry;
  }

  if (item.category === "shake") {
    const entry = {
      ...common,
      variant: item.variant ?? "파우치형",
      tags: item.tags ?? ["파우치형", "쉐이크"],
      proteinPerServing: n.protein_g,
      calories: n.kcal,
      sugar: n.sugar_g,
      fat: n.fat_g,
      sodium: n.sodium_mg,
      density: `${round1((n.protein_g / n.kcal) * 100).toFixed(1)}g/100kcal`,
      productUrl: "#",
      productType: "shake",
      gradeTags: item.gradeTags ?? [],
      flavor: item.flavor,
      nutritionBasis: "per_pack",
      nutritionPerBottle,
    };
    entry.coupangUrl = coupangUrl;
    entry.naverUrl = naverUrl(item);
    addOptional(entry, "officialUrl", item.officialUrl);
    return entry;
  }

  if (item.category === "drink") {
    const entry = {
      ...common,
      variant: item.variant,
      tags: item.tags,
      proteinPerServing: n.protein_g,
      calories: n.kcal,
      sugar: n.sugar_g,
      density: `${round1((n.protein_g / capacityValue) * 100).toFixed(1)}g/100ml`,
      productUrl: "#",
      productType: "drink",
      gradeTags: item.gradeTags ?? [],
      manufacturer: item.manufacturer,
    };
    addOptional(entry, "flavor", item.flavor);
    addOptional(entry, "bcaa", item.bcaa);
    entry.proteinSource = item.proteinSource;
    entry.fat = n.fat_g;
    entry.sodium = n.sodium_mg;
    entry.calorieDensity = `${round1((n.kcal / capacityValue) * 100).toFixed(1)}kcal/100ml`;
    entry.drinkType = item.drinkType;
    entry.nutritionPerBottle = nutritionPerBottle;
    entry.naverUrl = naverUrl(item);
    addOptional(entry, "officialUrl", item.officialUrl);
    entry.coupangUrl = coupangUrl;
    return entry;
  }

  if (item.category === "yogurt") {
    const entry = {
      ...common,
      variant: item.variant,
      tags: item.tags,
      proteinPerServing: n.protein_g,
      calories: n.kcal,
      sugar: n.sugar_g,
      density: `${round1(item.proteinPer100g).toFixed(1)}g/100${item.capacityUnit}`,
      productUrl: "#",
      productType: "yogurt",
      gradeTags: item.gradeTags ?? [],
      manufacturer: item.manufacturer,
      flavor: item.flavor,
    };
    addOptional(entry, "bcaa", item.bcaa);
    addOptional(entry, "proteinSource", item.proteinSource);
    entry.fat = n.fat_g;
    entry.sodium = n.sodium_mg;
    entry.yogurtType = item.yogurtType;
    entry.storageType = item.storageType;
    entry.lactoseFree = item.lactoseFree;
    entry.proteinPer100g = item.proteinPer100g;
    entry.nutritionPerBottle = nutritionPerBottle;
    entry.needsServingCheck = false;
    entry.nutritionBasis = "per_unit";
    entry.coupangUrl = coupangUrl;
    entry.naverUrl = naverUrl(item);
    addOptional(entry, "officialUrl", item.officialUrl);
    return entry;
  }

  const entry = {
    ...common,
    variant: item.variant,
    tags: item.tags,
    proteinPerServing: n.protein_g,
    calories: n.kcal,
    sugar: n.sugar_g,
    density: `${round1((n.protein_g / capacityValue) * 100).toFixed(1)}g/100ml`,
    productUrl: "#",
    productType: "soymilk",
    gradeTags: item.gradeTags ?? [],
    flavor: item.flavor,
    proteinSource: item.proteinSource ?? "대두",
    fat: n.fat_g,
    sodium: n.sodium_mg,
    calorieDensity: `${round1((n.kcal / capacityValue) * 100).toFixed(1)}kcal/100ml`,
    soymilkType: item.soymilkType,
    nutritionPerBottle,
  };
  addOptional(entry, "manufacturer", item.manufacturer);
  entry.naverUrl = naverUrl(item);
  addOptional(entry, "officialUrl", item.officialUrl);
  entry.coupangUrl = coupangUrl;
  return entry;
}

function exactNutritionBlock(slug, nutrition) {
  const values = nutritionObject(nutrition);
  const lines = [`  "${slug}": {`];
  for (const [key, value] of Object.entries(values)) lines.push(`    ${key}: ${value},`);
  lines.push("  },");
  return lines.join("\n");
}

function insertBarNutrition(source, blocks) {
  if (!blocks.length) return source;
  const marker = "const exactNutritionBySlug: Record<string, NutritionPatch> = {";
  const start = source.indexOf(marker);
  if (start < 0) throw new Error("barProductsData.ts exactNutritionBySlug를 찾지 못함");
  const tail = source.slice(start);
  const pattern = /^  "barebells-[^"]+": \{\r?\n[\s\S]*?^  \},\r?$/gm;
  let match;
  let insertion = -1;
  while ((match = pattern.exec(tail))) insertion = start + match.index + match[0].length;
  if (insertion < 0) throw new Error("barProductsData.ts 베어벨즈 항목을 찾지 못함");
  return `${source.slice(0, insertion)}\n${blocks.join("\n")}${source.slice(insertion)}`;
}

function replaceFeedCount(source, route, count) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`("${escaped}"\\s*:\\s*\\{[\\s\\S]*?\\n  \\})`);
  if (!pattern.test(source)) throw new Error(`feedPageMeta.json ${route} 항목을 찾지 못함`);
  return source.replace(pattern, (section) => section.replace(/\d+(?=종|개)/g, String(count)));
}

async function processPhoto(source, destination, category) {
  const config = CATEGORY_CONFIG[category];
  const image = sharp(source);
  const { width, height } = await image.metadata();
  const rotation = category === "bar" && height > width * 1.4 ? 90 : 0;
  const flat = await image.flatten({ background: "#ffffff" }).rotate(rotation, { background: "#ffffff" }).toBuffer();
  const trimmed = await sharp(flat).trim({ background: "#ffffff", threshold: 14 }).toBuffer();
  return sharp(trimmed)
    .resize({ ...config.imageBox, fit: "inside", withoutEnlargement: true })
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: "#ffffff" })
    .webp({ quality: 85 })
    .toFile(destination);
}

const stores = Object.fromEntries(
  Object.entries(CATEGORY_CONFIG).map(([category, config]) => [category, {
    dataPath: join(dataDir, config.data),
    imageMapPath: join(dataDir, config.imageMap),
    specMapPath: join(dataDir, config.specMap),
    data: load(join(dataDir, config.data)),
    imageMap: load(join(dataDir, config.imageMap)),
    specMap: load(join(dataDir, config.specMap)),
  }]),
);
const allExistingSlugs = new Set(Object.values(stores).flatMap((store) => store.data.map((product) => product.slug)));
const rawItems = load(resolve(root, inputPath));
if (!Array.isArray(rawItems)) throw new Error("등록.json 최상위 값은 배열이어야 함");
const defaultCategory = process.env.INTAKE_DEFAULT_CATEGORY;
const items = rawItems.map((item) => ({ ...item, category: item.category ?? defaultCategory }));
const prepared = [];
const errors = [];
const inputSlugs = new Set();

for (const item of items) {
  const where = item.id ?? item.slug ?? "(항목 식별자 없음)";
  const errorStart = errors.length;
  requireFields(item, ["id", "category", "slug", "brand", "name", "capacity"], where, errors);
  if (!CATEGORY_CONFIG[item.category]) {
    errors.push(`${where}: 지원하지 않는 category '${item.category ?? ""}'`);
    continue;
  }
  if (typeof item.slug === "string" && !/^[a-z0-9-]+$/.test(item.slug)) errors.push(`${where}: slug는 영문 소문자·숫자·하이픈만 가능`);
  if (allExistingSlugs.has(item.slug)) errors.push(`${where}: '${item.slug}' 이미 등록된 slug`);
  if (inputSlugs.has(item.slug)) errors.push(`${where}: 등록.json 안에서 slug 중복`);
  inputSlugs.add(item.slug);
  validateCategoryFields(item, where, errors);

  let capacityValue = null;
  if (["drink", "soymilk"].includes(item.category)) capacityValue = capacityNumber(item.capacity, "mL", where, errors);
  if (item.category === "yogurt") {
    const capacityMatch = typeof item.capacity === "string" && item.capacity.trim().match(/^([0-9]+(?:\.[0-9]+)?)\s*(g|mL)$/i);
    if (!capacityMatch) {
      errors.push(`${where}: yogurt capacity는 숫자+g 또는 숫자+mL 형식이어야 함`);
    } else {
      capacityValue = Number(capacityMatch[1]);
      item.capacityUnit = capacityMatch[2].toLowerCase() === "ml" ? "mL" : "g";
      if (!(capacityValue > 0)) errors.push(`${where}: capacity는 0보다 커야 함`);
    }
  }
  if (item.category === "soymilk" && capacityValue != null && capacityValue > 250) {
    errors.push(`${where}: 두유 등록 기준은 250mL 이하임`);
  }

  const intakeDir = resolve(root, "inbox/intake", item.id ?? "");
  const requiredFiles = ["meta.json", "gemini.json", "product.png", "spec.png"];
  for (const file of requiredFiles) if (!existsSync(join(intakeDir, file))) errors.push(`${where}: ${file} 없음`);
  if (!requiredFiles.every((file) => existsSync(join(intakeDir, file)))) continue;

  const meta = load(join(intakeDir, "meta.json"));
  const gemini = load(join(intakeDir, "gemini.json"));
  const nutrition = gemini.nutrition_per_unit ?? {};
  const requiredNutrition = ["kcal", "protein_g", "sugar_g", "fat_g", "sodium_mg"];
  const missingNutrition = requiredNutrition.filter((key) => typeof nutrition[key] !== "number");
  if (missingNutrition.length) errors.push(`${where}: 수치 없음: ${missingNutrition.join(", ")}`);
  for (const key of ["carbs_g", "sat_fat_g", "trans_fat_g", "cholesterol_mg", "fiber_g"]) {
    if (nutrition[key] != null && typeof nutrition[key] !== "number") errors.push(`${where}: ${key}는 숫자 또는 null이어야 함`);
  }
  if (typeof nutrition.kcal === "number" && !(nutrition.kcal > 0)) errors.push(`${where}: kcal은 0보다 커야 함`);
  if (typeof nutrition.protein_g === "number" && !(nutrition.protein_g > 0)) errors.push(`${where}: protein_g는 0보다 커야 함`);
  if (item.category === "soymilk" && typeof nutrition.protein_g === "number" && nutrition.protein_g < 5) {
    errors.push(`${where}: 두유 등록 기준은 1팩 단백질 5g 이상임`);
  }
  for (const key of ["sugar_g", "fat_g", "sodium_mg", "carbs_g", "sat_fat_g", "trans_fat_g", "cholesterol_mg", "fiber_g"]) {
    if (typeof nutrition[key] === "number" && nutrition[key] < 0) errors.push(`${where}: ${key}는 0 이상이어야 함`);
  }
  if (!meta.productId || !meta.itemId || !meta.vendorItemId) errors.push(`${where}: 쿠팡 productId/itemId/vendorItemId 누락`);
  if (errors.length > errorStart) continue;

  const coupangUrl = `https://www.coupang.com/vp/products/${meta.productId}?itemId=${meta.itemId}&vendorItemId=${meta.vendorItemId}`;
  prepared.push({
    item,
    intakeDir,
    nutrition,
    entry: buildEntry(item, nutrition, coupangUrl, capacityValue),
  });
}

if (errors.length) {
  console.error(`입력 오류:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

const newProducts = load(newProductsPath);
const counts = load(countsPath);
let feedMeta = readFileSync(feedMetaPath, "utf-8");
let barTs = readFileSync(barTsPath, "utf-8");
const today = new Date().toISOString().slice(0, 10);
const touchedCategories = new Set();
const barBlocks = [];

for (const { item, intakeDir, nutrition, entry } of prepared) {
  const store = stores[item.category];
  const config = CATEGORY_CONFIG[item.category];
  store.data.push(entry);
  store.imageMap[item.slug] = `${item.slug}.webp`;
  store.specMap[item.slug] = `${item.slug}.png`;
  newProducts.push({ slug: item.slug, addedAt: today });
  touchedCategories.add(item.category);
  if (item.category === "bar") barBlocks.push(exactNutritionBlock(item.slug, nutrition));

  console.log(`\n■ [${item.category}] ${item.brand} ${item.name} (${item.slug})`);
  console.log(`  단백질 ${nutrition.protein_g}g · ${nutrition.kcal}kcal · 당류 ${nutrition.sugar_g}g · ${entry.density}`);
  console.log(`  쿠팡 ${entry.coupangUrl}`);
  if (item.category === "bar") console.log(`  exactNutritionBySlug ${JSON.stringify(nutritionObject(nutrition))}`);
  if (dryRun) {
    console.log("  [dry-run] 파일/데이터는 변경하지 않음");
    continue;
  }

  const imageOut = resolve(root, config.imageDir, `${item.slug}.webp`);
  const photo = await processPhoto(join(intakeDir, "product.png"), imageOut, item.category);
  console.log(`  사진 → ${config.imageDir}/${item.slug}.webp (${photo.width}x${photo.height})`);
  const specOut = resolve(root, config.specDir, `${item.slug}.png`);
  await sharp(join(intakeDir, "spec.png")).resize({ width: 900, withoutEnlargement: false }).png({ compressionLevel: 9 }).toFile(specOut);
  console.log(`  성분표 → ${config.specDir}/${item.slug}.png (가로 900px)`);
}

for (const category of touchedCategories) {
  counts[category] = stores[category].data.length;
  feedMeta = replaceFeedCount(feedMeta, CATEGORY_CONFIG[category].feedRoute, counts[category]);
}
const totalCount = Object.values(stores).reduce((sum, store) => sum + store.data.length, 0);
feedMeta = replaceFeedCount(feedMeta, "/products", totalCount);
barTs = insertBarNutrition(barTs, barBlocks);

if (dryRun) {
  console.log(`\n[dry-run] 등록 예정 ${prepared.length}개 · 전체 ${totalCount}종`);
  for (const category of touchedCategories) console.log(`  ${category}: ${counts[category]}개`);
} else {
  for (const category of touchedCategories) {
    const store = stores[category];
    saveJson(store.dataPath, store.data);
    saveJson(store.imageMapPath, store.imageMap);
    saveJson(store.specMapPath, store.specMap);
  }
  saveJson(newProductsPath, newProducts);
  saveJson(countsPath, counts);
  writePreservingEol(feedMetaPath, feedMeta);
  if (barBlocks.length) writePreservingEol(barTsPath, barTs);
  console.log(`\n등록 ${prepared.length}개 완료 · 전체 ${totalCount}종`);
}
