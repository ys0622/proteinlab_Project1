import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { barProductsWithGrades } from "../../../data/products";
import RunningCurationContent from "../RunningCurationContent";

export const metadata = {
  title: "러닝 후 단백질 바 추천 | ProteinLab",
  description:
    "러닝과 마라톤 후 회복에 적합한 단백질 바를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다.",
};

function getDensityValue(density: string): number {
  const match = density.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

const runningBars = barProductsWithGrades.filter(
  (product) =>
    product.productType === "bar" &&
    product.proteinPerServing >= 10 &&
    product.proteinPerServing <= 20 &&
    (product.sugar ?? 999) <= 10,
);

function rankRunningBars(products: typeof barProductsWithGrades) {
  return [...products].sort((a, b) => {
    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    const densityDelta = getDensityValue(b.density) - getDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
    if (proteinDelta !== 0) return proteinDelta;

    return (a.calories ?? 999) - (b.calories ?? 999);
  });
}

const relaxedRunningBars = barProductsWithGrades.filter(
  (product) =>
    product.productType === "bar" &&
    product.proteinPerServing >= 8 &&
    product.proteinPerServing <= 20 &&
    (product.sugar ?? 999) <= 12,
);

const densityFallbackBars = barProductsWithGrades.filter(
  (product) =>
    product.productType === "bar" &&
    getDensityValue(product.density) >= 4.5 &&
    (product.sugar ?? 999) <= 12,
);

function collectRecommendedBars() {
  const pools = [
    rankRunningBars(runningBars),
    rankRunningBars(relaxedRunningBars),
    rankRunningBars(densityFallbackBars),
    rankRunningBars(barProductsWithGrades.filter((product) => product.productType === "bar")),
  ];
  const picked: typeof barProductsWithGrades = [];
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

const recommendedRunningBars = collectRecommendedBars();

export default function RunningBarCurationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RunningCurationContent
        type="bar"
        products={runningBars}
        recommendedProducts={recommendedRunningBars}
      />
      <Footer />
    </div>
  );
}
