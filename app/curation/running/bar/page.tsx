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

const recommendedRunningBars = [...runningBars]
  .sort((a, b) => {
    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    const densityDelta = getDensityValue(b.density) - getDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
    if (proteinDelta !== 0) return proteinDelta;

    return (a.calories ?? 999) - (b.calories ?? 999);
  })
  .slice(0, 6);

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
