import Header from "../components/Header";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

export async function generateMetadata({ searchParams }: BarsPageProps) {
  const params = (await searchParams) ?? {};
  const hasParams = Object.keys(params).length > 0;
  const products = await getProductsByCategoryAsync("bar");

  return {
    title: `단백질 바 추천 비교 ${products.length}종 — 고단백·저당 성분 기준 2026`,
    description: `단백질 바 ${products.length}개를 단백질 함량, 당류, 칼로리, 중량 기준으로 비교합니다. 운동보충·저당·식사보완 목적에 맞는 제품을 성분 데이터로 바로 선택하세요.`,
    alternates: {
      canonical: "https://proteinlab.kr/bars",
    },
    ...(hasParams ? { robots: { index: false, follow: false } } : {}),
  };
}

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
  const totalCount = drinks.length + products.length + yogurts.length + shakes.length;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "단백질 바", item: "https://proteinlab.kr/bars" },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "단백질 바 비교 목록",
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
