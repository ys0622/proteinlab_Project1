import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  mockProducts,
  barProductsWithGrades,
  yogurtProductsWithGrades,
  type ProductDetailProps,
} from "../data/products";
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
  const scoreByRawValue = new Map<number, number>();
  const denominator = Math.max(scored.length - 1, 1);

  let groupStart = 0;
  while (groupStart < scored.length) {
    let groupEnd = groupStart;
    while (
      groupEnd + 1 < scored.length &&
      scored[groupEnd + 1]?.rawScore === scored[groupStart]?.rawScore
    ) {
      groupEnd += 1;
    }

    const averageRankIndex = (groupStart + groupEnd) / 2;
    const percentile = scored.length === 1 ? 1 : 1 - averageRankIndex / denominator;
    const displayScore = Math.max(0, Math.min(100, Math.round(percentile * 100)));
    scoreByRawValue.set(scored[groupStart].rawScore, displayScore);
    groupStart = groupEnd + 1;
  }

  const len = scored.length;
  return scored.map((item, idx) => {
    const pct = idx / len;
    const grade = pct < 0.2 ? "A" : pct < 0.5 ? "B" : pct < 0.8 ? "C" : "D";
    const score = scoreByRawValue.get(item.rawScore) ?? 0;

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
  const yogurtDensity = prepareRankingData(yogurtProductsWithGrades, "density");
  const yogurtDiet = prepareRankingData(yogurtProductsWithGrades, "diet");
  const yogurtPerf = prepareRankingData(yogurtProductsWithGrades, "performance");

  const rankings = {
    drink: { density: drinkDensity, diet: drinkDiet, performance: drinkPerf },
    bar: { density: barDensity, diet: barDiet, performance: barPerf },
    yogurt: { density: yogurtDensity, diet: yogurtDiet, performance: yogurtPerf },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RankingClient rankings={rankings} />
      <Footer />
    </div>
  );
}
