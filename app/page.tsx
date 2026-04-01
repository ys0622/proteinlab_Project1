import Header from "./components/Header";
import AffiliateDisclosure from "./components/AffiliateDisclosure";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import PopularHubLinks from "./components/PopularHubLinks";
import ProductListWithFilters from "./components/ProductListWithFilters";
import { getProductsByCategoryAsync } from "./lib/productData";
import type { Metadata } from "next";
import type { ProductCategory } from "./lib/categories";

export const metadata: Metadata = {
  title: "단백질 제품 비교 허브 | 2026 음료·바·요거트·쉐이크 비교 | ProteinLab",
  description:
    "단백질 음료, 바, 요거트, 쉐이크 322종을 단백질 함량, 당류, 칼로리 기준으로 비교합니다. 셀렉스 vs 하이뮨, 40g 이상 제품, 다이어트, 50대 추천까지 바로 확인할 수 있습니다.",
  alternates: {
    canonical: "https://proteinlab.kr",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://proteinlab.kr/#website",
      url: "https://proteinlab.kr",
      name: "ProteinLab",
      description:
        "단백질 음료, 바, 요거트, 쉐이크를 성분 데이터로 비교하고 추천, 계산기, 가이드까지 한곳에서 확인하는 ProteinLab입니다.",
      inLanguage: "ko",
    },
    {
      "@type": "Organization",
      "@id": "https://proteinlab.kr/#organization",
      name: "ProteinLab",
      url: "https://proteinlab.kr",
    },
  ],
};

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: HomePageProps) {
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

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <AffiliateDisclosure />
        <PopularHubLinks />
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
