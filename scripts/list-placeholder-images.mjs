import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const categories = [
  ["음료", "drinkProductsData.json", "slugToImage.json", "rtd-drink-image"],
  ["바", "barProductsData.json", "slugToBarImage.json", "bar-image"],
  ["요거트", "yogurtProductsData.json", "slugToYogurtImage.json", "protein-yogurt-image"],
  ["쉐이크", "shakeProductsData.json", "slugToShakeImage.json", "shake-image"],
  ["두유", "soymilkProductsData.json", "slugToSoymilkImage.json", "soymilk-image"],
  ["파우더", "powderProductsData.json", "slugToPowderImage.json", "powder-image"],
];

const readJson = (filename) => JSON.parse(fs.readFileSync(path.join(root, "app", "data", filename), "utf8"));
const escapeCell = (value) => String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
const rows = [];

for (const [label, dataFile, mapFile, imageDir] of categories) {
  const products = readJson(dataFile);
  const imageMap = readJson(mapFile);
  for (const product of products) {
    if (imageMap[product.slug] !== "no-image.webp") continue;
    rows.push([
      label,
      `${product.brand} ${product.name} ${product.capacity}`,
      product.slug,
      product.coupangUrl ?? "",
      `public/${imageDir}/${product.slug}.webp`,
    ]);
  }
}

const lines = [
  "# 제품 이미지 필요 목록",
  "",
  "이미지 맵 값이 `no-image.webp`인 제품입니다.",
  "",
  "| 카테고리 | 제품(브랜드 이름 용량) | slug | 쿠팡 링크 | 넣을 파일 경로 |",
  "|---|---|---|---|---|",
  ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
  "",
];

const output = path.join(root, "docs", "image-needed.md");
fs.writeFileSync(output, lines.join("\n"), "utf8");
console.log(`placeholder_image=${rows.length}`);
console.log(`wrote=${path.relative(root, output)}`);
