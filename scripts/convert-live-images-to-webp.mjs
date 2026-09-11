/**
 * One-off: convert PNG/JPG product images that are still referenced (live) by
 * slugToImage.json / slugToBarImage.json into WebP, and rewrite those JSON
 * mappings to point at the new files. Originals are left in place (unused
 * after this) rather than deleted, so this is easy to review/revert.
 */
import { readFileSync, writeFileSync } from "fs";
import sharp from "sharp";
import { resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const targets = [
  { mapFile: "app/data/slugToImage.json", imageDir: "public/rtd-drink-image" },
  { mapFile: "app/data/slugToBarImage.json", imageDir: "public/bar-image" },
];

for (const { mapFile, imageDir } of targets) {
  const mapPath = resolve(root, mapFile);
  const dirPath = resolve(root, imageDir);
  const map = JSON.parse(readFileSync(mapPath, "utf-8"));

  let converted = 0;
  for (const [slug, filename] of Object.entries(map)) {
    const ext = extname(filename).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") continue;

    const srcPath = resolve(dirPath, filename);
    const webpFilename = filename.slice(0, -ext.length) + ".webp";
    const destPath = resolve(dirPath, webpFilename);

    try {
      await sharp(srcPath).webp({ quality: 82 }).toFile(destPath);
      map[slug] = webpFilename;
      converted++;
      console.log(`✅ ${filename} -> ${webpFilename}`);
    } catch (e) {
      console.error(`❌ Failed: ${filename}`, e.message);
    }
  }

  writeFileSync(mapPath, JSON.stringify(map, null, 2) + "\n", "utf-8");
  console.log(`\n${mapFile}: ${converted}개 변환 완료\n`);
}
