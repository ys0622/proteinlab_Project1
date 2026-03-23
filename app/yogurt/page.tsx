import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "단백질 요거트 비교 추천 | 45개 그릭·드링킹 요거트 성분 기준 | ProteinLab",
  description:
    "단백질 요거트 45개를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 그릭요거트, 드링킹 요거트, 대용량 요거트 추천과 순위까지 한 번에 확인하세요.",
  alternates: {
    canonical: "https://proteinlab.kr/yogurt",
  },
};

export default async function YogurtPage() {
  const [drinks, bars, products, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  const categoryCounts: Record<ProductCategory, number> = {
    drink: drinks.length,
    bar: bars.length,
    yogurt: products.length,
    shake: shakes.length,
  };
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <AffiliateDisclosure />
        <ProductListWithFilters
          productType="yogurt"
          products={products}
          categoryCounts={categoryCounts}
          tabsPlacement="before_grid"
        />
      </main>

      <Footer />
    </div>
  );
}
