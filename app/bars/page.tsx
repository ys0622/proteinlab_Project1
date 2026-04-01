import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "저당 단백질 바 추천 비교 85종 | 고단백·간식형 제품 한눈에 | 2026 | ProteinLab",
  description:
    "단백질 바 85종을 단백질 함량, 당류, 칼로리 기준으로 비교합니다. 운동 후 보충용, 출근길 간식용, 저당 간식용 단백질 바를 빠르게 좁혀보세요.",
  alternates: {
    canonical: "https://proteinlab.kr/bars",
  },
};

interface BarsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BarsPage({ searchParams }: BarsPageProps) {
  const params = (await searchParams) ?? {};
  const curation = typeof params.curation === "string" ? params.curation : undefined;
  const [drinks, products, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  const categoryCounts: Record<ProductCategory, number> = {
    drink: drinks.length,
    bar: products.length,
    yogurt: yogurts.length,
    shake: shakes.length,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <AffiliateDisclosure />
        <ProductListWithFilters
          productType="bar"
          products={products}
          curationSlug={curation}
          categoryCounts={categoryCounts}
          tabsPlacement="before_grid"
        />
      </main>

      <Footer />
    </div>
  );
}
