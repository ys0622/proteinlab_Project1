import Header from "../components/Header";
import Footer from "../components/Footer";
import { mockProducts, barProductsWithGrades, type ProductDetailProps } from "../data/products";
import { getDensityValue, getDietScore, getPerformanceScore } from "../lib/gradeCalculation";
import RankingClient from "./RankingClient";

export const metadata = {
  title: "등급 랭킹 | ProteinLab",
  description: "단백질 음료·단백질 바 등급별 제품 순위",
};

function prepareRankingData(products: ProductDetailProps[], metric: "density" | "diet" | "performance") {
  const scored = products.map((p) => {
    let rawScore: number;
    if (metric === "density") rawScore = getDensityValue(p);
    else if (metric === "diet") rawScore = getDietScore(p);
    else rawScore = getPerformanceScore(p);
    return { product: p, rawScore };
  });

  const higherIsBetter = metric !== "diet";
  scored.sort((a, b) => higherIsBetter ? b.rawScore - a.rawScore : a.rawScore - b.rawScore);

  const rawValues = scored.map((item) => item.rawScore);
  const min = Math.min(...rawValues);
  const max = Math.max(...rawValues);
  const range = Math.max(max - min, 1);

  const len = scored.length;
  return scored.map((item, idx) => {
    const pct = idx / len;
    const grade = pct < 0.2 ? "A" : pct < 0.5 ? "B" : pct < 0.8 ? "C" : "D";
    const normalizedRatio = higherIsBetter
      ? (item.rawScore - min) / range
      : (max - item.rawScore) / range;
    const score = Math.round(normalizedRatio * 100);

    return { ...item, score, grade, rank: idx + 1 };
  });
}

export type RankingItem = {
  product: ProductDetailProps;
  score: number;
  grade: string;
  rank: number;
};

export default function RankingPage() {
  const drinkDensity = prepareRankingData(mockProducts, "density");
  const drinkDiet = prepareRankingData(mockProducts, "diet");
  const drinkPerf = prepareRankingData(mockProducts, "performance");
  const barDensity = prepareRankingData(barProductsWithGrades, "density");
  const barDiet = prepareRankingData(barProductsWithGrades, "diet");
  const barPerf = prepareRankingData(barProductsWithGrades, "performance");

  const rankings = {
    drink: { density: drinkDensity, diet: drinkDiet, performance: drinkPerf },
    bar: { density: barDensity, diet: barDiet, performance: barPerf },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RankingClient rankings={rankings} />
      <Footer />
    </div>
  );
}
