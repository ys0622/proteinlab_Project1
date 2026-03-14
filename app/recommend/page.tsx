import Header from "../components/Header";
import Footer from "../components/Footer";
import RecommendClient from "./RecommendClient";
import { mockProducts, barProductsWithGrades, yogurtProductsWithGrades } from "../data/products";

export const metadata = {
  title: "제품 추천 | ProteinLab",
  description: "나에게 맞는 단백질 음료·단백질 바 찾기",
};

export default function RecommendPage() {
  const drinkCount = mockProducts.length;
  const barCount = barProductsWithGrades.length;
  const yogurtCount = yogurtProductsWithGrades.length;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RecommendClient drinkCount={drinkCount} barCount={barCount} yogurtCount={yogurtCount} />
      <Footer />
    </div>
  );
}
