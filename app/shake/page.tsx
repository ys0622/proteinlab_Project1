import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";

interface ShakePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: ShakePageProps): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const hasParams = Object.keys(params).length > 0;
  const products = await getProductsByCategoryAsync("shake");

  return {
    title: `단백질 쉐이크 추천 비교 ${products.length}종 — 저당·고단백·식사대용 기준 2026`,
    description: `단백질 쉐이크 ${products.length}종을 단백질 총량, 당류, 칼로리, 식이섬유 기준으로 비교합니다. 플라이밀, 단백하니, 프로티원, 랩노쉬, 바지오까지 성분 데이터로 바로 좁혀보세요.`,
    alternates: {
      canonical: "https://proteinlab.kr/shake",
    },
    ...(hasParams ? { robots: { index: false, follow: false } } : {}),
  };
}

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
  const totalCount = drinks.length + bars.length + yogurts.length + products.length;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "단백질 쉐이크", item: "https://proteinlab.kr/shake" },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "단백질 쉐이크 비교 목록",
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
