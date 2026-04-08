import type { Metadata } from "next";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProductsByCategoryAsync("drink");

  return {
    title: `단백질 음료 추천 비교 ${products.length}종 | 저당·고단백·40g 기준 2026 | ProteinLab`,
    description: `단백질 음료 ${products.length}종을 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 셀렉스, 하이뮨, 뉴케어, 닥터유까지 성분 데이터로 바로 좁혀보세요.`,
    alternates: {
      canonical: "https://proteinlab.kr/drinks",
    },
  };
}

interface DrinksPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DrinksPage({ searchParams }: DrinksPageProps) {
  const params = (await searchParams) ?? {};
  const curation = typeof params.curation === "string" ? params.curation : undefined;
  const [products, bars, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);

  const categoryCounts: Record<ProductCategory, number> = {
    drink: products.length,
    bar: bars.length,
    yogurt: yogurts.length,
    shake: shakes.length,
  };
  const totalCount = products.length + bars.length + yogurts.length + shakes.length;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection totalCount={totalCount} />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <AffiliateDisclosure />
        <ProductListWithFilters
          productType="drink"
          products={products}
          curationSlug={curation}
          categoryCounts={categoryCounts}
          stickyTabs={false}
          tabsPlacement="before_grid"
        />
      </main>

      <Footer />
    </div>
  );
}
