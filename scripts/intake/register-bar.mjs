/**
 * run-intake.mjs 결과(inbox/intake/<id>/)를 단백질바 데이터에 등록한다. 미리보기를 사람이 승인한 제품만 넣는다.
 *
 * 사용법: node scripts/intake/register-bar.mjs <등록.json> [--dry-run]
 * 등록.json: [{ "id": "B1", "slug": "barebells-...-55", "brand": "베어벨즈", "name": "소프트 프로틴바 (카라멜 초코)", "capacity": "55g" }]
 *
 * 하는 일: 사진 → public/bar-image/<slug>.webp(흰 배경, 여백 정리), 성분표 → public/bar-spec/<slug>.png,
 *          slugToBarImage/Spec 갱신, barProductsData.json 추가(쿠팡 상품 URL은 /api/out/coupang 이 딥링크로 변환),
 *          newProducts.json 등록일 기록. 탄수화물·포화지방·식이섬유 등 세부값은 출력해 주니 barProductsData.ts 의
 *          exactNutritionBySlug 에 직접 넣는다.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const inputPath = args.find((a) => !a.startsWith("--"));
if (!inputPath) {
  console.error("사용법: node scripts/intake/register-bar.mjs <등록.json> [--dry-run]");
  process.exit(1);
}
const load = (p) => JSON.parse(readFileSync(p, "utf-8"));
// 기존 파일의 줄바꿈(CRLF/LF)을 그대로 유지한다.
const save = (p, v) => {
  const crlf = existsSync(p) && readFileSync(p, "utf-8").includes("\r\n");
  const text = JSON.stringify(v, null, 2) + "\n";
  writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text, "utf-8");
};
const round2 = (n) => Math.round(n * 100) / 100;

const dataPath = resolve(root, "app/data/barProductsData.json");
const imgMapPath = resolve(root, "app/data/slugToBarImage.json");
const specMapPath = resolve(root, "app/data/slugToBarSpec.json");
const newProductsPath = resolve(root, "app/data/newProducts.json");
const data = load(dataPath);
const imgMap = load(imgMapPath);
const specMap = load(specMapPath);
const newProducts = load(newProductsPath);
const today = new Date().toISOString().slice(0, 10);

const items = load(resolve(root, inputPath));
for (const it of items) {
  const dir = resolve(root, "inbox/intake", it.id);
  const meta = load(join(dir, "meta.json"));
  const g = load(join(dir, "gemini.json"));
  const n = g.nutrition_per_unit || {};
  const missing = ["kcal", "protein_g", "sugar_g", "fat_g", "sodium_mg"].filter((k) => n[k] == null);
  if (missing.length) throw new Error(`${it.id} 수치 없음: ${missing.join(",")}`);
  if (!meta.itemId || !meta.vendorItemId) throw new Error(`${it.id} 쿠팡 옵션 ID 없음`);
  if (data.some((p) => p.slug === it.slug)) throw new Error(`${it.slug} 이미 등록됨`);
  for (const f of ["product.png", "spec.png"]) if (!existsSync(join(dir, f))) throw new Error(`${it.id} ${f} 없음`);

  const coupangUrl = `https://www.coupang.com/vp/products/${meta.productId}?itemId=${meta.itemId}&vendorItemId=${meta.vendorItemId}`;
  const query = encodeURIComponent(`${it.brand} ${it.name}`);
  const entry = {
    slug: it.slug,
    brand: it.brand,
    name: it.name,
    capacity: it.capacity,
    variant: "일반",
    tags: ["바"],
    proteinPerServing: n.protein_g,
    calories: n.kcal,
    sugar: n.sugar_g,
    density: `${round2((n.protein_g / n.kcal) * 100)}g/100kcal`,
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    coupangUrl,
    naverUrl: `https://search.shopping.naver.com/search/all?query=${query}`,
    fat: n.fat_g,
    sodium: n.sodium_mg,
  };
  const imgFile = `${it.slug}.webp`;
  const specFile = `${it.slug}.png`;
  console.log(`${it.id} → ${it.slug}  ${n.kcal}kcal 단백질 ${n.protein_g}g 당류 ${n.sugar_g}g 지방 ${n.fat_g}g 나트륨 ${n.sodium_mg}mg`);
  console.log(`  exactNutritionBySlug: ${JSON.stringify({ caloriesKcal: n.kcal, proteinG: n.protein_g, carbsG: n.carbs_g, sugarsG: n.sugar_g, fatG: n.fat_g, satFatG: n.sat_fat_g, sodiumMg: n.sodium_mg, fiberG: n.fiber_g })}`);
  if (dryRun) continue;

  // 사이트의 바 사진은 대부분 가로로 누운 포장이다. 세로 사진은 카드에서 가늘고 작게 보이니 90도 돌린다
  // (세로 포장의 글자는 아래→위로 인쇄돼 있어 시계 방향으로 돌리면 바로 읽힌다).
  const src = sharp(join(dir, "product.png"));
  const { width: w, height: h } = await src.metadata();
  const flat = await src.flatten({ background: "#ffffff" }).rotate(h > w * 1.4 ? 90 : 0, { background: "#ffffff" }).toBuffer();
  const trimmed = await sharp(flat).trim({ background: "#ffffff", threshold: 14 }).toBuffer();
  await sharp(trimmed)
    .resize({ width: 900, height: 420, fit: "inside", withoutEnlargement: true })
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: "#ffffff" })
    .webp({ quality: 85 })
    .toFile(resolve(root, "public/bar-image", imgFile));
  await sharp(join(dir, "spec.png")).resize({ width: 900, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(resolve(root, "public/bar-spec", specFile));
  data.push(entry);
  imgMap[it.slug] = imgFile;
  specMap[it.slug] = specFile;
  newProducts.push({ slug: it.slug, addedAt: today });
}
if (!dryRun) {
  save(dataPath, data);
  save(imgMapPath, imgMap);
  save(specMapPath, specMap);
  save(newProductsPath, newProducts);
  console.log(`등록 ${items.length}개. 바 총 ${data.length}개`);
}
