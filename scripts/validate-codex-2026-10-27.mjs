import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const all = [
  ...read("app/data/drinkProductsData.json"),
  ...read("app/data/barProductsData.json"),
  ...read("app/data/shakeProductsData.json"),
  ...read("app/data/soymilkProductsData.json"),
];
const bySlug = new Map(all.map((product) => [product.slug, product]));
const mismatches = [];
let checks = 0;

function check(slug, expected) {
  const product = bySlug.get(slug);
  if (!product) {
    mismatches.push(`${slug}: 제품 없음`);
    return;
  }
  for (const [field, value] of Object.entries(expected)) {
    checks += 1;
    const actual = field === "proteinDensity"
      ? Number((product.proteinPerServing / product.calories * 100).toFixed(1))
      : product[field];
    if (actual !== value) mismatches.push(`${slug}.${field}: expected=${value}, actual=${actual}`);
  }
}

check("flymill-proteinshake-choco-45", { proteinPerServing: 22, sugar: 3.6, calories: 150, proteinDensity: 14.7 });
check("allthebetter-proteinshake-low-sugar-chocolate-mousse-45", { proteinPerServing: 25, sugar: 2, calories: 175, proteinDensity: 14.3 });
check("takefit-max-goso-250", { proteinPerServing: 24, sugar: 0.7, calories: 105, sodium: 210, proteinDensity: 22.9 });
check("takefit-monster-goso-350", { proteinPerServing: 45, sugar: 1, calories: 195, proteinDensity: 23.1 });
check("sellex-profit-milk-vanilla-250", { proteinPerServing: 20, sugar: 0, calories: 105, sodium: 300, proteinDensity: 19 });
check("hymune-balance-active-deepchoco-250", { proteinPerServing: 20, sugar: 0, calories: 110, sodium: 150, proteinDensity: 18.2 });
check("sellex-profit-sports-choco-330", { proteinPerServing: 20, sugar: 0, calories: 99, sodium: 350, proteinDensity: 20.2 });
check("ultive-vegan-protein-choco-250", { proteinPerServing: 21, sugar: 0, calories: 130, sodium: 340, proteinDensity: 16.2 });

const soy = read("app/data/soymilkProductsData.json");
const highSoy = soy.filter((product) => product.proteinPerServing >= 11);
const enhancedSoy = soy.filter((product) => product.proteinPerServing >= 8 && product.proteinPerServing < 11);
const lowSugarHighSoy = highSoy.filter((product) => product.sugar < 3);
checks += soy.length * 4;
for (const product of soy) {
  for (const field of ["proteinPerServing", "sugar", "calories", "capacity"]) {
    if (product[field] == null) mismatches.push(`${product.slug}.${field}: 값 없음`);
  }
}

const drinks = read("app/data/drinkProductsData.json");
const hymune = drinks.filter((product) => product.brand.includes("하이뮨") || product.slug.includes("hymune"));
checks += hymune.length * 5;
for (const product of hymune) {
  for (const field of ["name", "capacity", "proteinPerServing", "sugar", "calories"]) {
    if (product[field] == null) mismatches.push(`${product.slug}.${field}: 값 없음`);
  }
}

for (const category of [read("app/data/barProductsData.json"), read("app/data/shakeProductsData.json")]) {
  checks += category.length * 4;
  for (const product of category) {
    for (const field of ["proteinPerServing", "sugar", "calories", "capacity"]) {
      if (product[field] == null) mismatches.push(`${product.slug}.${field}: 값 없음`);
    }
  }
}

console.log(`수치 대조: ${checks}개 필드 확인`);
console.log(`두유: 전체 ${soy.length}종 / 고단백 ${highSoy.length}종 / 강화 ${enhancedSoy.length}종 / 저당·고단백 ${lowSugarHighSoy.length}종`);
console.log(`하이뮨: ${hymune.length}종`);
console.log(`불일치: ${mismatches.length}건`);
if (mismatches.length) {
  console.error(mismatches.join("\n"));
  process.exitCode = 1;
}
