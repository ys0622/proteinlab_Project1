/**
 * PNG/JPG 제품 이미지를 WebP로 변환하고 slugToImage.json 파일을 업데이트합니다.
 * 실행: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const IMAGE_DIRS = [
  {
    slugMap: path.join(ROOT, "app/data/slugToImage.json"),
    dir: path.join(ROOT, "public/rtd-drink-image"),
  },
  {
    slugMap: path.join(ROOT, "app/data/slugToBarImage.json"),
    dir: path.join(ROOT, "public/bar-image"),
  },
  {
    slugMap: path.join(ROOT, "app/data/slugToShakeImage.json"),
    dir: path.join(ROOT, "public/shake-image"),
  },
  {
    slugMap: path.join(ROOT, "app/data/slugToYogurtImage.json"),
    dir: path.join(ROOT, "public/protein-yogurt-image"),
  },
];

const WEBP_QUALITY = 85;

let totalConverted = 0;
let totalSkipped = 0;

for (const { slugMap, dir } of IMAGE_DIRS) {
  const map = JSON.parse(await readFile(slugMap, "utf8"));
  const newMap = { ...map };
  const entries = Object.entries(map);

  console.log(`\n📁 ${path.basename(dir)} (${entries.length}개)`);

  for (const [slug, filename] of entries) {
    // 이미 WebP면 스킵
    if (String(filename).endsWith(".webp")) {
      totalSkipped++;
      continue;
    }

    const srcPath = path.join(dir, filename);
    const outFilename = `${slug}.webp`;
    const outPath = path.join(dir, outFilename);

    if (!existsSync(srcPath)) {
      console.warn(`  ⚠️  원본 없음: ${filename}`);
      continue;
    }

    // 이미 변환된 WebP가 있으면 slugMap만 업데이트
    if (existsSync(outPath)) {
      newMap[slug] = outFilename;
      totalSkipped++;
      continue;
    }

    try {
      await sharp(srcPath).webp({ quality: WEBP_QUALITY }).toFile(outPath);
      newMap[slug] = outFilename;
      totalConverted++;
      process.stdout.write(`  ✓ ${outFilename}\n`);
    } catch (e) {
      console.error(`  ✗ 변환 실패: ${slug} — ${e.message}`);
    }
  }

  await writeFile(slugMap, JSON.stringify(newMap, null, 2) + "\n");
}

console.log(`\n완료: ${totalConverted}개 변환, ${totalSkipped}개 기존 WebP 유지`);
