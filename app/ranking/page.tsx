import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { mockProducts, barProductsWithGrades, type ProductDetailProps } from "../data/products";
import { getDensityValue, getDietScore, getPerformanceScore } from "../lib/gradeCalculation";
import { getProductImageUrl } from "../lib/productImage";
import RankingClient from "./RankingClient";

export const metadata = {
  title: "등급 랭킹 | ProteinLab",
  description: "단백질 음료·단백질 바 등급별 제품 순위",
};

function prepareRankingData(products: ProductDetailProps[], metric: "density" | "diet" | "performance") {
  const scored = products.map((p) => {
    let score: number;
    if (metric === "density") score = getDensityValue(p);
    else if (metric === "diet") score = getDietScore(p);
    else score = getPerformanceScore(p);
    return { product: p, score };
  });

  const higherIsBetter = metric !== "diet";
  scored.sort((a, b) => higherIsBetter ? b.score - a.score : a.score - b.score);

  const len = scored.length;
  return scored.map((item, idx) => {
    const pct = idx / len;
    const grade = pct < 0.2 ? "A" : pct < 0.5 ? "B" : pct < 0.8 ? "C" : "D";
    return { ...item, grade, rank: idx + 1 };
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
