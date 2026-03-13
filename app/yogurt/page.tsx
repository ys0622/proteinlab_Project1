import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import { yogurtProducts } from "../data/products";

export const metadata = {
  title: "단백질 요거트 비교 | ProteinLab",
  description:
    "단백질 요거트 제품을 브랜드, 단백질 함량, 당류, 제품 유형, 맛, 락토프리 여부 기준으로 비교합니다.",
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
