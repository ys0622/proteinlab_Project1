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

function isDensityBOrBetter(gradeTags?: string[]) {
  return gradeTags?.some((tag) => tag.startsWith("밀도 A") || tag.startsWith("밀도 B")) ?? false;
}

const runningDrinks = mockProducts.filter(
  (product) =>
    product.productType !== "bar" &&
    product.proteinPerServing >= 15 &&
    product.proteinPerServing <= 25 &&
    (product.sugar ?? 999) <= 10 &&
    isDensityBOrBetter(product.gradeTags),
);

const recommendedRunningDrinks = [...runningDrinks]
  .sort((a, b) => {
    const waterBonusA = a.drinkType === "워터형" ? 1 : 0;
    const waterBonusB = b.drinkType === "워터형" ? 1 : 0;
    if (waterBonusA !== waterBonusB) return waterBonusB - waterBonusA;

    const densityDelta = getDensityValue(b.density) - getDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  })
  .slice(0, 6);

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
