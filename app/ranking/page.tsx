import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ProductDetailProps } from "../data/products";
import { getDensityValue, getDietScore, getPerformanceScore } from "../lib/gradeCalculation";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";
import RankingClient from "./RankingClient";

export const metadata = {
  title: "단백질 랭킹 | 음료·바·요거트·쉐이크 추천 순위 | ProteinLab",
  description:
    "단백질 음료, 바, 요거트, 쉐이크 순위를 단백질 밀도, 다이어트, 퍼포먼스 100점 기준으로 비교하는 ProteinLab 랭킹 허브입니다.",
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
  scored.sort((a, b) => (higherIsBetter ? b.rawScore - a.rawScore : a.rawScore - b.rawScore));
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

export default async function RankingPage() {
  const [drinkProducts, barProducts, yogurtProducts, shakeProducts] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);

  const drinkDensity = prepareRankingData(drinkProducts, "density");
  const drinkDiet = prepareRankingData(drinkProducts, "diet");
  const drinkPerf = prepareRankingData(drinkProducts, "performance");
  const barDensity = prepareRankingData(barProducts, "density");
  const barDiet = prepareRankingData(barProducts, "diet");
  const barPerf = prepareRankingData(barProducts, "performance");
  const yogurtDensity = prepareRankingData(yogurtProducts, "density");
  const yogurtDiet = prepareRankingData(yogurtProducts, "diet");
  const yogurtPerf = prepareRankingData(yogurtProducts, "performance");
  const shakeDensity = prepareRankingData(shakeProducts, "density");
  const shakeDiet = prepareRankingData(shakeProducts, "diet");
  const shakePerf = prepareRankingData(shakeProducts, "performance");

  const rankings: Record<ProductCategory, { density: RankingItem[]; diet: RankingItem[]; performance: RankingItem[] }> = {
    drink: { density: drinkDensity, diet: drinkDiet, performance: drinkPerf },
    bar: { density: barDensity, diet: barDiet, performance: barPerf },
    yogurt: { density: yogurtDensity, diet: yogurtDiet, performance: yogurtPerf },
    shake: { density: shakeDensity, diet: shakeDiet, performance: shakePerf },
  };

  const categoryLabelMap: Record<ProductCategory, string> = {
    drink: "단백질 음료",
    bar: "단백질 바",
    yogurt: "단백질 요거트",
    shake: "단백질 쉐이크",
  };

  const itemListJsonLd = (Object.entries(rankings) as [ProductCategory, typeof rankings.drink][]).map(
    ([cat, data]) => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${categoryLabelMap[cat]} 단백질 밀도 랭킹`,
      description: `단백질 밀도(g/100kcal) 기준 ${categoryLabelMap[cat]} 순위`,
      url: "https://proteinlab.kr/ranking",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: Math.min(10, data.density.length),
      itemListElement: data.density.slice(0, 10).map((item) => ({
        "@type": "ListItem",
        position: item.rank,
        name: `${item.product.brand} ${item.product.name}`,
        url: `https://proteinlab.kr/product/${item.product.slug}`,
      })),
    }),
  );

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />
      <RankingClient rankings={rankings} />
      <Footer />
    </div>
  );
}
