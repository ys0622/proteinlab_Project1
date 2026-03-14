import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import { yogurtProducts } from "../data/products";

export const metadata = {
  title: "단백질 요거트 비교 | 그릭요거트·드링킹 요거트 추천 | ProteinLab",
  description:
    "단백질 요거트 45개를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 그릭요거트, 드링킹 요거트, 대용량 요거트 추천과 순위까지 한 번에 확인해보세요.",
};

export default function YogurtPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <ProductListWithFilters productType="yogurt" products={yogurtProducts} />
      </main>

      <Footer />
    </div>
  );
}
