import Header from "./components/Header";
import AffiliateDisclosure from "./components/AffiliateDisclosure";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import PopularHubLinks from "./components/PopularHubLinks";
import ProductListWithFilters from "./components/ProductListWithFilters";
import { getProductsByCategoryAsync } from "./lib/productData";
import type { ProductCategory } from "./lib/categories";

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://proteinlab.kr/#website",
      url: "https://proteinlab.kr",
      name: "ProteinLab",
      description:
        "단백질 음료, 단백질 바, 단백질 요거트, 단백질 쉐이크를 성분 데이터로 비교하고 추천, 랭킹, 등급 기준까지 한곳에서 확인하는 ProteinLab입니다.",
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
        <PopularHubLinks />
        <AffiliateDisclosure mobileCompact />
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
