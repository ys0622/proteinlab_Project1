import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { mockProducts } from "../../../data/products";
import RunningCurationContent from "../RunningCurationContent";

export const metadata = {
  title: "러닝 후 단백질 음료 추천 | ProteinLab",
  description:
    "러닝과 마라톤 후 회복에 적합한 단백질 음료를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다.",
};

function getDensityValue(density: string): number {
  const match = density.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

const primaryRunningDrinks = mockProducts.filter(
  (product) =>
    product.productType !== "bar" &&
    product.proteinPerServing >= 15 &&
    product.proteinPerServing <= 25 &&
    (product.sugar ?? 999) <= 10,
);

const runningDrinks = primaryRunningDrinks;

function rankRunningDrinks(products: typeof mockProducts) {
  return [...products].sort((a, b) => {
    const waterBonusA = a.drinkType === "워터형" ? 1 : 0;
    const waterBonusB = b.drinkType === "워터형" ? 1 : 0;
    if (waterBonusA !== waterBonusB) return waterBonusB - waterBonusA;

    const densityDelta = getDensityValue(b.density) - getDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  });
}

const relaxedRunningDrinks = mockProducts.filter(
  (product) =>
    product.productType !== "bar" &&
    product.proteinPerServing >= 12 &&
    product.proteinPerServing <= 25 &&
    (product.sugar ?? 999) <= 12,
);

const densityFallbackDrinks = mockProducts.filter(
  (product) =>
    product.productType !== "bar" &&
    getDensityValue(product.density) >= 6 &&
    (product.sugar ?? 999) <= 12,
);

const topCategoryFallbackDrinks = rankRunningDrinks(
  mockProducts.filter((product) => product.productType !== "bar"),
);

function collectRecommendedDrinks() {
  const pools = [
    rankRunningDrinks(primaryRunningDrinks),
    rankRunningDrinks(relaxedRunningDrinks),
    rankRunningDrinks(densityFallbackDrinks),
    topCategoryFallbackDrinks,
  ];
  const picked: typeof mockProducts = [];
  const seen = new Set<string>();

  for (const pool of pools) {
    for (const product of pool) {
      if (!product.slug || seen.has(product.slug)) continue;
      seen.add(product.slug);
      picked.push(product);
      if (picked.length >= 6) return picked;
    }
  }

  return picked;
}

const recommendedRunningDrinks = collectRecommendedDrinks();

export default function RunningDrinkCurationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RunningCurationContent
        type="drink"
        products={runningDrinks}
        recommendedProducts={recommendedRunningDrinks}
      />
      <Footer />
    </div>
  );
}
