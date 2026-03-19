import Header from "../components/Header";
import Footer from "../components/Footer";
import RecommendClient from "./RecommendClient";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "단백질 추천 | 단백질 음료·바·요거트 추천 | ProteinLab",
  description:
    "나에게 맞는 단백질 음료, 단백질 바, 단백질 요거트를 추천합니다. 저당, 그릭, 드링킹, 대용량, 고단백 조건까지 한 번에 비교해보세요.",
};

export default async function RecommendPage() {
  const [drinks, bars, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  const categoryCounts = {
    drink: drinks.length,
    bar: bars.length,
    yogurt: yogurts.length,
    shake: shakes.length,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RecommendClient categoryCounts={categoryCounts} />
      <Footer />
    </div>
  );
}
