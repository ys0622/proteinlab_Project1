import type { NutritionPerBottle, ProductDetailProps } from "./products";
import barData from "./barProductsData.json";

type BarProduct = ProductDetailProps;

type NutritionPatch = Partial<NutritionPerBottle>;

const questCommonSlugs = [
  "quest-nutrition-protein-bar-double-chocolate-chunk-60",
  "quest-nutrition-protein-bar-deep-chocolate-chip-cookie-dough-60",
  "quest-nutrition-protein-bar-lemon-cake-60",
  "quest-nutrition-protein-bar-mint-chocolate-chunk-60",
  "quest-nutrition-protein-bar-chocolate-chip-cookie-dough-60",
];

const quest180Slugs = [
  "quest-nutrition-protein-bar-blueberry-muffin-60",
  "quest-nutrition-protein-bar-smores-60",
];

const benofSoftbarSlugs = [
  "benof-softbar-peanutbutter",
  "benof-softbar-cookie-cream",
  "benof-softbar-chocolate-caramel",
  "benof-softbar-cacao",
  "benof-softbar-black-sesame",
  "benof-softbar-injeolmi",
  "benof-softbar-roasted-sweetpotato",
  "benof-softbar-berry-cheesecake",
];

const bsnCrispSlugs = [
  "syntha6-crispy-choco",
  "bsn-protein-crisp-peanut-butter-crunch",
  "bsn-protein-crisp-salted-toffee-pretzel",
];

const theDanbaekSlugs = [
  "thedanbaek-crunchbar-choco",
  "thedanbaek-crunchbar-peanutbutter",
  "thedanbaek-mildbar-almondcookie",
];

const myproteinSoftSlugs = [
  "myprotein-soft-lemon-earlgrey",
  "myprotein-soft-caramel-choco",
  "myprotein-soft-strawberry-yogurt",
];

const kelloggSlugs = [
  "kellogg-protein-granolabar-savory",
  "kellogg-proteinbark-nuts",
  "kellogg-proteinbark-caramel-nuts",
  "kellogg-proteinbark-hazelnut-darkchoco",
];

const nutritionBySlug = new Map<string, NutritionPatch>();

function addGroup(slugs: string[], nutrition: NutritionPatch) {
  for (const slug of slugs) {
    nutritionBySlug.set(slug, nutrition);
  }
}

addGroup(questCommonSlugs, {
  caloriesKcal: 170,
  proteinG: 20,
  carbsG: 24,
  sugarsG: 1,
  fatG: 7,
  satFatG: 2,
  sodiumMg: 240,
});

addGroup(quest180Slugs, {
  caloriesKcal: 180,
  proteinG: 21,
  carbsG: 23,
  sugarsG: 1,
  fatG: 7,
  satFatG: 2.5,
  sodiumMg: 220,
});

addGroup(benofSoftbarSlugs, {
  caloriesKcal: 172,
  proteinG: 20,
  carbsG: 28,
  sugarsG: 2,
  fatG: 3.3,
  satFatG: 0.6,
  sodiumMg: 178,
});

addGroup(bsnCrispSlugs, {
  caloriesKcal: 190,
  proteinG: 20,
  carbsG: 21,
  sugarsG: 2,
  fatG: 7,
  satFatG: 5,
  sodiumMg: 200,
});

addGroup(theDanbaekSlugs, {
  caloriesKcal: 205,
  proteinG: 12,
  carbsG: 18,
  sugarsG: 8,
  fatG: 8,
  satFatG: 5,
  sodiumMg: 200,
});

addGroup(myproteinSoftSlugs, {
  caloriesKcal: 210,
  proteinG: 12,
  carbsG: 20,
  sugarsG: 8,
  fatG: 9,
  satFatG: 3,
  sodiumMg: 140,
});

addGroup(kelloggSlugs, {
  caloriesKcal: 165,
  proteinG: 8,
  carbsG: 24,
  sugarsG: 7,
  fatG: 6,
  satFatG: 2,
  sodiumMg: 90,
});

const exactNutritionBySlug: Record<string, NutritionPatch> = {
  "dryou-proteinbar-pro-3nuts-crunch": {
    caloriesKcal: 355,
    proteinG: 24,
    carbsG: 22,
    sugarsG: 9,
    fatG: 19,
    satFatG: 9,
    sodiumMg: 200,
  },
  "dryou-proteinbar-pro-choco-classic": {
    caloriesKcal: 355,
    proteinG: 24,
    carbsG: 22,
    sugarsG: 9,
    fatG: 19,
    satFatG: 9,
    sodiumMg: 200,
  },
  "dryou-proteinbar-pro-crunch": {
    caloriesKcal: 355,
    proteinG: 24,
    carbsG: 22,
    sugarsG: 9,
    fatG: 19,
    satFatG: 9,
    sodiumMg: 200,
  },
  "kirkland-proteinbar-choco-brownie": {
    caloriesKcal: 190,
    proteinG: 21,
    carbsG: 22,
    sugarsG: 2,
    fatG: 6,
    satFatG: 2.5,
    sodiumMg: 140,
  },
  "benof-proteinbar-chunky-choco": {
    caloriesKcal: 185,
    proteinG: 15,
    carbsG: 23,
    sugarsG: 6,
    fatG: 7,
    satFatG: 2.5,
    sodiumMg: 140,
    fiberG: 11,
  },
  "benof-proteinbar-truffle-peanutbutter-choco": {
    caloriesKcal: 185,
    proteinG: 15,
    carbsG: 23,
    sugarsG: 6,
    fatG: 7,
    satFatG: 2.5,
    sodiumMg: 140,
    fiberG: 11,
  },
  "quest-nutrition-protein-bar-chocolate-peanutbutter-60": {
    caloriesKcal: 190,
    proteinG: 20,
    carbsG: 22,
    sugarsG: 1,
    fatG: 9,
    satFatG: 2.5,
    sodiumMg: 220,
  },
  "quest-nutrition-protein-bar-oatmeal-chocolate-chip-60": {
    caloriesKcal: 170,
    proteinG: 18,
    carbsG: 24,
    sugarsG: 1,
    fatG: 8,
    satFatG: 2.5,
    sodiumMg: 250,
  },
  "quest-nutrition-protein-bar-cookie-cream-60": {
    caloriesKcal: 200,
    proteinG: 21,
    carbsG: 21,
    sugarsG: 1,
    fatG: 8,
    satFatG: 2.5,
    sodiumMg: 280,
  },
  "quest-nutrition-protein-bar-white-chocolate-raspberry-60": {
    caloriesKcal: 190,
    proteinG: 20,
    carbsG: 22,
    sugarsG: 1,
    fatG: 8,
    satFatG: 2.5,
    sodiumMg: 220,
  },
  "quest-nutrition-protein-bar-deep-dish-cookie-cream-60": {
    caloriesKcal: 200,
    proteinG: 21,
    carbsG: 21,
    sugarsG: 1,
    fatG: 8,
    satFatG: 2.5,
    sodiumMg: 280,
  },
  "post-proteinbar": {
    caloriesKcal: 257,
    proteinG: 16,
    carbsG: 19,
    sugarsG: 10,
    fatG: 13,
    satFatG: 3.9,
    sodiumMg: 220,
  },
  "proteinbangatgan-harudanbaekbar-blacksesame": {
    caloriesKcal: 129,
    proteinG: 15,
    carbsG: 20.4,
    sugarsG: 4.7,
    fatG: 5,
    satFatG: 2.5,
    sodiumMg: 90,
    fiberG: 4.7,
  },
  "ondanbaek-protein-bar-apple-cranberry-50": {
    caloriesKcal: 151,
    proteinG: 15,
    carbsG: 16,
    sugarsG: 6,
    fatG: 6,
    satFatG: 2,
    sodiumMg: 75,
  },
  "ondanbaek-protein-bar-chocolate-fudge-50": {
    caloriesKcal: 169,
    proteinG: 15,
    carbsG: 18,
    sugarsG: 11,
    fatG: 7,
    satFatG: 2.5,
    sodiumMg: 120,
  },
  "proteinbangatgan-harudanbaekbar-cheeseberry": {
    caloriesKcal: 160,
    proteinG: 14,
    carbsG: 20,
    sugarsG: 3,
    fatG: 4,
    satFatG: 1,
    sodiumMg: 120,
    fiberG: 3.5,
  },
  "himnaego-protein-bar-dark-chocolate-50": {
    caloriesKcal: 250,
    proteinG: 13,
    carbsG: 21,
    sugarsG: 10,
    fatG: 12,
    satFatG: 3.5,
    sodiumMg: 210,
  },
  "nobrand-proteinbar-choco": {
    caloriesKcal: 220,
    proteinG: 12,
    carbsG: 25,
    sugarsG: 10,
    fatG: 7,
    satFatG: 3.9,
    sodiumMg: 130,
  },
  "selex-proteinbar-berryoat": {
    caloriesKcal: 220,
    proteinG: 12,
    carbsG: 20,
    sugarsG: 11,
    fatG: 11,
    satFatG: 4,
    sodiumMg: 95,
    fiberG: 3,
  },
  "hymune-activebar-nuts": {
    caloriesKcal: 250,
    proteinG: 12,
    carbsG: 19,
    sugarsG: 5,
    fatG: 14,
    satFatG: 2.8,
    sodiumMg: 115,
  },
  "mymil-new-proteinbar": {
    caloriesKcal: 210,
    proteinG: 12,
    carbsG: 20,
    sugarsG: 8,
    fatG: 9,
    satFatG: 3,
    sodiumMg: 100,
  },
  "proteinbangatgan-harudanbaekbar-jetchococake": {
    caloriesKcal: 138,
    proteinG: 12,
    carbsG: 16,
    sugarsG: 3,
    fatG: 8,
    satFatG: 2,
    sodiumMg: 105,
    fiberG: 5,
  },
  "proteinbangatgan-harudanbaekbar-cacao": {
    caloriesKcal: 143,
    proteinG: 12,
    carbsG: 9.8,
    sugarsG: 4,
    fatG: 7.7,
    satFatG: 2.7,
    sodiumMg: 40,
    fiberG: 5,
  },
  "dryou-proteinbar-bite-crunch": {
    caloriesKcal: 90,
    proteinG: 12,
    carbsG: 8,
    sugarsG: 4,
    fatG: 2.5,
    satFatG: 0.8,
    sodiumMg: 60,
  },
  "dryou-proteinbar-nuts": {
    caloriesKcal: 230,
    proteinG: 12,
    carbsG: 21,
    sugarsG: 9,
    fatG: 10,
    satFatG: 3,
    sodiumMg: 100,
  },
  "dryou-proteinbar-pro-bite-choco-classic": {
    caloriesKcal: 90,
    proteinG: 12,
    carbsG: 8,
    sugarsG: 4,
    fatG: 2.5,
    satFatG: 0.8,
    sodiumMg: 60,
  },
  "danbaekhani-protein-bar-choco-38": {
    caloriesKcal: 160,
    proteinG: 12,
    carbsG: 17,
    sugarsG: 0,
    fatG: 4.6,
    satFatG: 2.6,
    sodiumMg: 190,
  },
  "danbaekhani-protein-bar-signature-31": {
    caloriesKcal: 125,
    proteinG: 12,
    carbsG: 14,
    sugarsG: 0,
    fatG: 2.3,
    satFatG: 0.9,
    sodiumMg: 175,
  },
  "labnosh-foodbar-mildchoco": {
    caloriesKcal: 235,
    proteinG: 12,
    carbsG: 25,
    sugarsG: 8.7,
    fatG: 12,
    satFatG: 5.6,
    sodiumMg: 120,
    fiberG: 10.4,
  },
  "harudanbaek-cacao": {
    caloriesKcal: 180,
    proteinG: 11,
    carbsG: 17,
    sugarsG: 6,
    fatG: 9,
    satFatG: 0.9,
    sodiumMg: 55,
    fiberG: 5,
  },
  "cralo-plant-proteinbar": {
    caloriesKcal: 185,
    proteinG: 10,
    carbsG: 23,
    sugarsG: 7,
    fatG: 6,
    satFatG: 3.6,
    sodiumMg: 90,
  },
  "crown-highprotein-chocobar": {
    caloriesKcal: 210,
    proteinG: 10,
    carbsG: 28,
    sugarsG: 11,
    fatG: 7,
    satFatG: 3,
    sodiumMg: 120,
  },
  "calobye-daily-nuts-proteinbar": {
    caloriesKcal: 190,
    proteinG: 10,
    carbsG: 18,
    sugarsG: 7,
    fatG: 8,
    satFatG: 2.5,
    sodiumMg: 110,
  },
  "organica-ola-chewy-protein-bar-berry-almond-35": {
    caloriesKcal: 130,
    proteinG: 9,
    carbsG: 16,
    sugarsG: 3,
    fatG: 5,
    satFatG: 1.5,
    sodiumMg: 169,
  },
  "dryou-proteinbar-mini-nuts": {
    caloriesKcal: 160,
    proteinG: 8,
    carbsG: 15,
    sugarsG: 6,
    fatG: 9,
    satFatG: 2.8,
    sodiumMg: 74,
  },
  "organica-ola-chewy-protein-bar-peanut-cacao-35": {
    caloriesKcal: 125,
    proteinG: 8,
    carbsG: 15,
    sugarsG: 2,
    fatG: 3.9,
    satFatG: 1.2,
    sodiumMg: 154,
  },
  "post-proteinbar-mini": {
    caloriesKcal: 53,
    proteinG: 3,
    carbsG: 4,
    sugarsG: 2,
    fatG: 2.8,
    satFatG: 0.9,
    sodiumMg: 45,
  },
  "nobrand-proteinbar-mini": {
    caloriesKcal: 165,
    proteinG: 7,
    carbsG: 16.1,
    sugarsG: 6.7,
    fatG: 8.1,
    satFatG: 2.8,
    sodiumMg: 105,
  },
  "lottewellfood-easyprotein-highprotein-crispy": {
    caloriesKcal: 180,
    proteinG: 20,
    carbsG: 17,
    sugarsG: 5,
    fatG: 7,
    satFatG: 3,
    sodiumMg: 300,
    fiberG: 1.5,
  },
  "lottewellfood-easyprotein-energy-bar": {
    caloriesKcal: 195,
    proteinG: 9,
    carbsG: 15,
    sugarsG: 5,
    fatG: 11,
    satFatG: 2.6,
    sodiumMg: 120,
    fiberG: 0.5,
  },
  "kirkland-proteinbar-choco-chip-cookie-dough-60": {
    caloriesKcal: 220,
    proteinG: 21,
    carbsG: 22,
    sugarsG: 5,
    fatG: 7,
    satFatG: 2.5,
    sodiumMg: 150,
  },
};

for (const [slug, nutrition] of Object.entries(exactNutritionBySlug)) {
  nutritionBySlug.set(slug, nutrition);
}

function roundToSingleDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

function buildNutrition(product: BarProduct): NutritionPerBottle {
  const patch = nutritionBySlug.get(product.slug) ?? {};

  const caloriesKcal = patch.caloriesKcal ?? product.calories;
  const proteinG = patch.proteinG ?? product.proteinPerServing;
  const sugarsG = patch.sugarsG ?? product.sugar;
  const fatG = patch.fatG ?? product.fat;
  const sodiumMg = patch.sodiumMg ?? product.sodium;

  const derivedCarbs =
    caloriesKcal != null && proteinG != null && fatG != null
      ? roundToSingleDecimal(Math.max(0, (caloriesKcal - proteinG * 4 - fatG * 9) / 4))
      : undefined;

  return {
    caloriesKcal,
    proteinG,
    carbsG: patch.carbsG ?? derivedCarbs,
    sugarsG,
    fatG,
    satFatG: patch.satFatG ?? 0,
    sodiumMg,
    fiberG: patch.fiberG,
    cholesterolMg: patch.cholesterolMg,
    transFatG: patch.transFatG,
  };
}

function enrichBarProduct(product: BarProduct): BarProduct {
  const nutritionPerBottle = buildNutrition(product);
  const calories = nutritionPerBottle.caloriesKcal ?? product.calories;
  const proteinPerServing = nutritionPerBottle.proteinG ?? product.proteinPerServing;
  const sugar = nutritionPerBottle.sugarsG ?? product.sugar;
  const fat = nutritionPerBottle.fatG ?? product.fat;
  const sodium = nutritionPerBottle.sodiumMg ?? product.sodium;
  const density =
    calories && proteinPerServing
      ? `${roundToSingleDecimal((proteinPerServing / calories) * 100)}g/100kcal`
      : product.density;

  return {
    ...product,
    productType: "bar" as const,
    calories,
    proteinPerServing,
    sugar,
    fat,
    sodium,
    density,
    nutritionPerBottle,
  };
}

export function getBarProducts(): ProductDetailProps[] {
  return (barData as ProductDetailProps[]).map(enrichBarProduct);
}

export const mockBarProducts: ProductDetailProps[] = getBarProducts();
