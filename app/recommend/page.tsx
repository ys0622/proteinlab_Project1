import Header from "../components/Header";
import Footer from "../components/Footer";
import RecommendClient from "./RecommendClient";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "단백질 추천 | 음료·바·요거트·쉐이크 맞춤 추천 | ProteinLab",
  description:
    "운동 목적과 조건에 맞는 단백질 음료, 바, 요거트, 쉐이크를 추천합니다. 저당, 고단백, 그릭, 드링킹, 식사대용 조건까지 한 번에 비교해보세요.",
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
