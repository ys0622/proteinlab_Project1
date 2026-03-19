import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "단백질 바 비교 | 고단백·저당 단백질 바 추천 | ProteinLab",
  description:
    "단백질 바 제품을 단백질 함량, 당류, 칼로리, 중량 기준으로 비교합니다. 고단백 단백질 바, 저당 단백질 바, 식사 보완형 단백질 바 추천까지 확인해보세요.",
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
        <ProductListWithFilters
          productType="bar"
          products={products}
          curationSlug={curation}
          categoryCounts={categoryCounts}
        />
      </main>

      <Footer />
    </div>
  );
}
