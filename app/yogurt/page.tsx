import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

interface YogurtPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: YogurtPageProps) {
  const params = (await searchParams) ?? {};
  const hasParams = Object.keys(params).length > 0;
  const products = await getProductsByCategoryAsync("yogurt");

  return {
    title: `단백질 요거트 추천 비교 ${products.length}종 — 그릭·드링킹·저당 기준 2026`,
    description: `단백질 요거트 ${products.length}개를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 그릭요거트, 드링킹 요거트, 대용량 요거트 추천과 순위까지 한 번에 확인하세요.`,
    alternates: {
      canonical: "https://proteinlab.kr/yogurt",
    },
    ...(hasParams ? { robots: { index: false, follow: false } } : {}),
  };
}

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
  const totalCount = drinks.length + bars.length + products.length + shakes.length;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "단백질 요거트", item: "https://proteinlab.kr/yogurt" },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "단백질 요거트 비교 목록",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://proteinlab.kr/product/${p.slug}`,
      name: `${p.brand} ${p.name}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />
      <HeroSection totalCount={totalCount} />

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
