/**
 * 신규 쉐이크 등록 자동화.
 *
 * 사용법:
 *   1) inbox/shake/ 에 제품 사진, 성분표 캡처, 제품 정보 JSON을 넣는다.
 *   2) node scripts/add-shake.mjs inbox/shake/제품.json [--dry-run]
 *
 * 하는 일: 사진을 흰 배경 WebP로 정리(여백 제거 후 패딩) → public/shake-image,
 *          성분표를 public/shake-spec 로 복사, slugToShakeImage/Spec 갱신,
 *          shakeProductsData.json 에 제품 추가(밀도·네이버 링크·공식몰·태그는 자동 채움).
 *
 * JSON 형식(제품 1개 또는 배열):
 * {
 *   "slug": "brand-shake-choco-45", "brand": "플라이밀", "name": "단백질 쉐이크 (초코)",
 *   "flavor": "초코", "capacity": "45g",
 *   "photo": "photo.jpg", "label": "label.png",          // JSON과 같은 폴더 기준
 *   "coupangUrl": "https://link.coupang.com/a/...",
 *   "nutrition": { "calories": 150, "protein": 22, "carbs": 16, "sugars": 3.6, "fat": 2.7,
 *                  "satFat": 1.1, "transFat": 0, "cholesterol": 13.6, "sodium": 216.9, "fiber": 5.6 }
 * }
 */
import { readFileSync, writeFileSync, existsSync, copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = resolve(root, "app/data/shakeProductsData.json");
const imgMapPath = resolve(root, "app/data/slugToShakeImage.json");
const specMapPath = resolve(root, "app/data/slugToShakeSpec.json");
const imgDir = resolve(root, "public/shake-image");
const specDir = resolve(root, "public/shake-spec");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const inputPath = args.find((a) => !a.startsWith("--"));
if (!inputPath) {
  console.error("사용법: node scripts/add-shake.mjs <제품.json> [--dry-run]");
  process.exit(1);
}

const round1 = (n) => Math.round(n * 10) / 10;
const load = (p) => JSON.parse(readFileSync(p, "utf-8"));
const save = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + "\n", "utf-8");

const products = load(resolve(root, inputPath));
const items = Array.isArray(products) ? products : [products];
const baseDir = dirname(resolve(root, inputPath));

const data = load(dataPath);
const imgMap = load(imgMapPath);
const specMap = load(specMapPath);

const REQUIRED_NUTRITION = ["calories", "protein", "carbs", "sugars", "fat", "sodium"];
const errors = [];

for (const it of items) {
  const where = it.slug ?? "(slug 없음)";
  for (const k of ["slug", "brand", "name", "flavor", "capacity", "photo", "label", "nutrition"]) {
    if (it[k] === undefined || it[k] === "") errors.push(`${where}: '${k}' 누락`);
  }
  if (!it.slug) continue;
  if (!/^[a-z0-9-]+$/.test(it.slug)) errors.push(`${where}: slug는 영문 소문자·숫자·하이픈만 가능`);
  if (data.some((p) => p.slug === it.slug)) errors.push(`${where}: 이미 등록된 slug`);
  for (const k of REQUIRED_NUTRITION) {
    if (typeof it.nutrition?.[k] !== "number") errors.push(`${where}: nutrition.${k} 숫자 필요`);
  }
  for (const f of ["photo", "label"]) {
    if (it[f] && !existsSync(resolve(baseDir, it[f]))) errors.push(`${where}: ${f} 파일 없음 (${it[f]})`);
  }
  if (it.nutrition && it.nutrition.protein > 0 && it.nutrition.calories > 0 && it.nutrition.protein > it.nutrition.calories / 2) {
    errors.push(`${where}: 단백질(${it.nutrition.protein}g)이 칼로리(${it.nutrition.calories})에 비해 너무 큼 — 성분표 확인`);
  }
}
if (errors.length) {
  console.error("입력 오류:\n- " + errors.join("\n- "));
  process.exit(1);
}

async function processPhoto(src, dest) {
  const flat = await sharp(src).flatten({ background: "#ffffff" }).toBuffer();
  const trimmed = await sharp(flat).trim({ background: "#ffffff", threshold: 14 }).toBuffer();
  return sharp(trimmed)
    .resize({ height: 732, width: 600, fit: "inside", withoutEnlargement: true })
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: "#ffffff" })
    .webp({ quality: 85 })
    .toFile(dest);
}

for (const it of items) {
  const n = it.nutrition;
  const sameBrand = data.find((p) => p.brand === it.brand);
  const density = `${round1((n.protein / n.calories) * 100)}g/100kcal`;
  const naverQuery = encodeURIComponent(`${it.brand} ${it.name}`);
  const product = {
    slug: it.slug,
    brand: it.brand,
    name: it.name,
    capacity: it.capacity,
    variant: it.variant ?? sameBrand?.variant ?? "파우치형",
    tags: it.tags ?? sameBrand?.tags ?? ["파우치형", "쉐이크"],
    proteinPerServing: n.protein,
    calories: n.calories,
    sugar: n.sugars,
    fat: n.fat,
    sodium: n.sodium,
    density,
    productUrl: "#",
    productType: "shake",
    gradeTags: [],
    flavor: it.flavor,
    nutritionBasis: "per_pack",
    nutritionPerBottle: {
      caloriesKcal: n.calories,
      proteinG: n.protein,
      carbsG: n.carbs,
      sugarsG: n.sugars,
      fatG: n.fat,
      satFatG: n.satFat ?? 0,
      transFatG: n.transFat ?? 0,
      cholesterolMg: n.cholesterol ?? 0,
      sodiumMg: n.sodium,
      fiberG: n.fiber ?? 0,
    },
    coupangUrl: it.coupangUrl,
    naverUrl: it.naverUrl ?? `https://search.shopping.naver.com/search/all?query=${naverQuery}`,
    officialUrl: it.officialUrl ?? sameBrand?.officialUrl,
  };
  if (!product.coupangUrl) delete product.coupangUrl;
  if (!product.officialUrl) delete product.officialUrl;

  const photoOut = resolve(imgDir, `${it.slug}.webp`);
  const specName = `${it.slug}.png`;
  const specOut = resolve(specDir, specName);

  console.log(`\n■ ${it.brand} ${it.name} (${it.slug})`);
  console.log(`  단백질 ${n.protein}g · ${n.calories}kcal · 당류 ${n.sugars}g · 밀도 ${density}`);
  console.log(`  브랜드 기존 제품 참고: ${sameBrand ? sameBrand.slug : "없음(공식몰 링크 직접 지정 권장)"}`);
  if (dryRun) {
    console.log("  [dry-run] 파일/데이터는 변경하지 않음");
    continue;
  }

  const out = await processPhoto(resolve(baseDir, it.photo), photoOut);
  console.log(`  사진 → public/shake-image/${it.slug}.webp (${out.width}x${out.height}, ${Math.round(out.size / 1024)}KB)`);
  await sharp(resolve(baseDir, it.label)).resize({ width: 900, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(specOut);
  console.log(`  성분표 → public/shake-spec/${specName}`);

  imgMap[it.slug] = `${it.slug}.webp`;
  specMap[it.slug] = specName;
  data.push(product);
}

if (!dryRun) {
  save(dataPath, data);
  save(imgMapPath, imgMap);
  save(specMapPath, specMap);
  console.log(`\n완료: ${items.length}개 등록. 다음 단계 → 타입체크 후 커밋·배포`);
}
