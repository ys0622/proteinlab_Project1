/**
 * Scott이 보낸 제품 사진·쿠팡파트너스 단축 링크(쿠파스 링크)를 한 번에 반영한다(2026-11-03).
 *
 * 사용법: node scripts/apply-photos.mjs [폴더] [--dry-run]
 *   폴더 기본값: inbox/photos
 *   - 사진: <slug>.jpg|jpeg|png|webp  (파일 이름 = 제품 slug. 운영실 '사진 넣을 제품' 표·docs/image-needed.md의 slug)
 *   - 링크: links.txt  — 한 줄에 "<slug> <https://link.coupang.com/a/...>" (공백·탭·쉼표 구분, # 주석 가능)
 *
 * 하는 일
 *   1. 사진: 흰 배경으로 평탄화 → 여백 자르기 → 카테고리 규격(register.mjs와 같은 imageBox)에 맞춰 webp 저장
 *      → public/<카테고리 이미지 폴더>/<slug>.webp, 이미지 맵(slugTo*Image.json)을 <slug>.webp로 바꾼다.
 *   2. 링크: 단축 링크가 가리키는 쿠팡 상품 번호를 확인해, 지금 coupangUrl의 상품 번호와 같을 때만 coupangUrl을 바꾼다
 *      (다른 상품이면 바꾸지 않고 보고). 바꾼 게 있으면 scripts/coupang/resolve-short-links.py 를 돌린다.
 *   3. 처리한 파일은 <폴더>/done/<날짜>/ 로 옮기고, docs/image-needed.md 를 다시 만든다.
 *   마지막에 운영실 photos 표에서 '완료'로 바꿀 slug 목록을 출력한다(운영실은 Claude가 ArtifactData로 고친다).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "fs";
import { dirname, extname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const inbox = resolve(root, args.find((a) => !a.startsWith("--")) ?? "inbox/photos");

// register.mjs CATEGORY_CONFIG와 같은 값(이미지 폴더·맵·규격).
const CATEGORIES = {
  drink: { data: "drinkProductsData.json", imageMap: "slugToImage.json", imageDir: "public/rtd-drink-image", box: { width: 600, height: 732 } },
  bar: { data: "barProductsData.json", imageMap: "slugToBarImage.json", imageDir: "public/bar-image", box: { width: 900, height: 420 } },
  shake: { data: "shakeProductsData.json", imageMap: "slugToShakeImage.json", imageDir: "public/shake-image", box: { width: 600, height: 732 } },
  yogurt: { data: "yogurtProductsData.json", imageMap: "slugToYogurtImage.json", imageDir: "public/protein-yogurt-image", box: { width: 732, height: 600 } },
  soymilk: { data: "soymilkProductsData.json", imageMap: "slugToSoymilkImage.json", imageDir: "public/soymilk-image", box: { width: 600, height: 732 } },
  powder: { data: "powderProductsData.json", imageMap: "slugToPowderImage.json", imageDir: "public/powder-image", box: { width: 600, height: 732 } },
};

const dataDir = join(root, "app/data");
const load = (p) => JSON.parse(readFileSync(p, "utf-8"));
function saveJson(path, value) {
  const crlf = existsSync(path) && readFileSync(path, "utf-8").includes("\r\n");
  const text = `${JSON.stringify(value, null, 2)}\n`;
  writeFileSync(path, crlf ? text.replace(/\n/g, "\r\n") : text, "utf-8");
}

if (!existsSync(inbox)) {
  console.error(`폴더가 없음: ${inbox}`);
  process.exit(1);
}

const stores = Object.fromEntries(Object.entries(CATEGORIES).map(([cat, c]) => {
  const dataPath = join(dataDir, c.data);
  const mapPath = join(dataDir, c.imageMap);
  return [cat, { ...c, dataPath, mapPath, data: load(dataPath), map: load(mapPath), dirtyData: false, dirtyMap: false }];
}));
function findProduct(slug) {
  for (const [cat, s] of Object.entries(stores)) {
    const product = s.data.find((p) => p.slug === slug);
    if (product) return { cat, store: s, product };
  }
  return null;
}
const shortTargets = load(join(dataDir, "coupangShortLinkTargets.json"));
// 상품 페이지 주소면 그 번호, 단축 링크면 단축 코드 표(resolve-short-links.py가 만든 것)의 상품 번호.
function productIdOf(url) {
  const text = String(url ?? "");
  const page = text.match(/\/vp\/products\/(\d+)/);
  if (page) return page[1];
  const code = text.match(/link\.coupang\.com\/a\/([A-Za-z0-9]+)/);
  return code ? (shortTargets[code[1]]?.pageKey ?? null) : null;
}

const problems = [];
const photoDone = [];
const linkDone = [];
const moved = [];

// 1. 사진
const photos = readdirSync(inbox).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
for (const file of photos) {
  const slug = file.slice(0, -extname(file).length);
  const hit = findProduct(slug);
  if (!hit) { problems.push(`사진 ${file}: 이 slug의 제품이 없음`); continue; }
  const { cat, store } = hit;
  const out = join(root, store.imageDir, `${slug}.webp`);
  if (!dryRun) {
    const src = join(inbox, file);
    const image = sharp(src);
    const { width, height } = await image.metadata();
    const rotation = cat === "bar" && height > width * 1.4 ? 90 : 0;
    const flat = await image.flatten({ background: "#ffffff" }).rotate(rotation, { background: "#ffffff" }).toBuffer();
    const trimmed = await sharp(flat).trim({ background: "#ffffff", threshold: 14 }).toBuffer();
    mkdirSync(dirname(out), { recursive: true });
    await sharp(trimmed)
      .resize({ ...store.box, fit: "inside", withoutEnlargement: false })
      .extend({ top: 12, bottom: 12, left: 12, right: 12, background: "#ffffff" })
      .webp({ quality: 85 })
      .toFile(out);
    store.map[slug] = `${slug}.webp`;
    store.dirtyMap = true;
    moved.push(file);
  }
  photoDone.push(`${slug} [${cat}] → ${store.imageDir}/${slug}.webp`);
}

// 2. 링크
const linksPath = join(inbox, "links.txt");
if (existsSync(linksPath)) {
  const lines = readFileSync(linksPath, "utf-8").split(/\r?\n/).map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);
  for (const line of lines) {
    const [slug, url] = line.split(/[\s,]+/);
    if (!slug || !/^https:\/\/link\.coupang\.com\/a\/[A-Za-z0-9]+$/.test(url ?? "")) { problems.push(`링크 줄 형식 오류: ${line}`); continue; }
    const hit = findProduct(slug);
    if (!hit) { problems.push(`링크 ${slug}: 이 slug의 제품이 없음`); continue; }
    let location = "";
    try {
      const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "Mozilla/5.0" } });
      location = res.headers.get("location") ?? "";
    } catch (e) {
      problems.push(`링크 ${slug}: 단축 링크를 열지 못함(${String(e).slice(0, 60)})`);
      continue;
    }
    const linkPid = productIdOf(location);
    const currentPid = productIdOf(hit.product.coupangUrl);
    if (!linkPid) { problems.push(`링크 ${slug}: 단축 링크가 쿠팡 상품으로 가지 않음(${location.slice(0, 80)})`); continue; }
    if (currentPid && currentPid !== linkPid) {
      problems.push(`링크 ${slug}: 다른 상품(지금 ${currentPid}, 링크 ${linkPid}) — 바꾸지 않음`);
      continue;
    }
    if (!dryRun) {
      hit.product.coupangUrl = url;
      hit.store.dirtyData = true;
    }
    linkDone.push(`${slug} → ${url} (상품 ${linkPid})`);
  }
  if (!dryRun) moved.push("links.txt");
}

if (!dryRun) {
  for (const s of Object.values(stores)) {
    if (s.dirtyData) saveJson(s.dataPath, s.data);
    if (s.dirtyMap) saveJson(s.mapPath, s.map);
  }
  if (linkDone.length) execFileSync("python", ["-X", "utf8", "scripts/coupang/resolve-short-links.py"], { cwd: root, stdio: "inherit" });
  if (moved.length) {
    const doneDir = join(inbox, "done", new Date().toISOString().slice(0, 10));
    mkdirSync(doneDir, { recursive: true });
    for (const f of moved) renameSync(join(inbox, f), join(doneDir, f));
  }
  execFileSync("node", ["scripts/list-placeholder-images.mjs"], { cwd: root, stdio: "ignore" });
}

console.log(`${dryRun ? "[dry-run] " : ""}사진 ${photoDone.length}개 · 링크 ${linkDone.length}개`);
photoDone.forEach((l) => console.log(`  사진 ${l}`));
linkDone.forEach((l) => console.log(`  링크 ${l}`));
if (problems.length) console.log(`확인 필요 ${problems.length}개:\n  ${problems.join("\n  ")}`);
const finished = [...new Set(photoDone.map((l) => l.split(" ")[0]))];
if (finished.length) console.log(`운영실 photos 완료 처리할 slug: ${finished.join(", ")}`);
