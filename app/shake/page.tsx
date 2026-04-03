import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "단백질 쉐이크 추천 비교 83종 | 저당·고단백·식사대용 기준 2026 | ProteinLab",
  description:
    "단백질 쉐이크 83종을 단백질 총량, 당류, 칼로리, 식이섬유 기준으로 비교합니다. 플라이밀, 단백하니, 프로티원, 랩노쉬, 바지오까지 성분 데이터로 바로 좁혀보세요.",
  alternates: {
    canonical: "https://proteinlab.kr/shake",
  },
};

export default async function ShakePage() {
  const [drinks, bars, yogurts, products] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  const categoryCounts: Record<ProductCategory, number> = {
    drink: drinks.length,
    bar: bars.length,
    yogurt: yogurts.length,
    shake: products.length,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <ProductListWithFilters
          productType="shake"
          products={products}
          categoryCounts={categoryCounts}
          tabsPlacement="before_grid"
        />
      </main>

      <Footer />
    </div>
  );
}
