import { readFileSync } from "node:fs";

const shakeProducts = JSON.parse(
  readFileSync(new URL("../app/data/shakeProductsData.json", import.meta.url), "utf8"),
);

function formatProductLabel(brand, name) {
  return name.startsWith(brand) ? name : `${brand} ${name}`;
}

function duplicateValues(rows, key) {
  const counts = new Map();
  for (const row of rows) counts.set(row[key], (counts.get(row[key]) ?? 0) + 1);
  return [...counts.entries()].filter(([, count]) => count > 1);
}

const rows = shakeProducts.map((product) => {
  const label = formatProductLabel(product.brand, product.name);
  const protein = Math.round(product.proteinPerServing * 10) / 10;
  const sugar = product.sugar ?? 0;
  const calories = product.calories ?? 0;
  const title = `${label} 단백질 ${protein}g · 당류 ${sugar}g — 단백질 쉐이크 성분 비교`;
  const description = `${label} — 단백질 ${protein}g · ${calories}kcal · 당류 ${sugar}g. 다이어트·벌크업 기준으로 비슷한 쉐이크와 바로 비교해보세요.`;
  return {
    slug: product.slug ?? "",
    title,
    description,
    titleLength: title.length,
    descriptionLength: description.length,
  };
});

const missingCoreData = shakeProducts
  .filter(
    (product) =>
      !product.slug ||
      !product.brand ||
      !product.name ||
      !Number.isFinite(product.proteinPerServing) ||
      !Number.isFinite(product.calories),
  )
  .map((product) => product.slug ?? `${product.brand}/${product.name}`);

const report = {
  products: rows.length,
  duplicateSlugs: duplicateValues(rows, "slug"),
  duplicateTitles: duplicateValues(rows, "title"),
  duplicateDescriptions: duplicateValues(rows, "description"),
  missingCoreData,
  titleLength: {
    min: Math.min(...rows.map((row) => row.titleLength)),
    max: Math.max(...rows.map((row) => row.titleLength)),
    over65: rows.filter((row) => row.titleLength > 65).map((row) => ({ slug: row.slug, length: row.titleLength })),
  },
  descriptionLength: {
    min: Math.min(...rows.map((row) => row.descriptionLength)),
    max: Math.max(...rows.map((row) => row.descriptionLength)),
    outsideRecommendedRange: rows
      .filter((row) => row.descriptionLength < 55 || row.descriptionLength > 160)
      .map((row) => ({ slug: row.slug, length: row.descriptionLength })),
  },
};

console.log(JSON.stringify(report, null, 2));

if (
  report.duplicateSlugs.length > 0 ||
  report.duplicateTitles.length > 0 ||
  report.duplicateDescriptions.length > 0 ||
  report.missingCoreData.length > 0
) {
  process.exitCode = 1;
}
