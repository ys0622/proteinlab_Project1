import Header from "./components/Header";
import AffiliateDisclosure from "./components/AffiliateDisclosure";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import ProductListWithFilters from "./components/ProductListWithFilters";
import { getProductsByCategoryAsync } from "./lib/productData";
import type { Metadata } from "next";
import type { ProductCategory } from "./lib/categories";

export async function generateMetadata(): Promise<Metadata> {
  const [drinks, bars, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  const totalCount = drinks.length + bars.length + yogurts.length + shakes.length;

  const title = `프로틴랩 ProteinLab | 단백질 음료·바·요거트·쉐이크 ${totalCount}종 비교`;
  const description = `프로틴랩에서 단백질 음료, 바, 요거트, 쉐이크 ${totalCount}종을 단백질 함량, 당류, 칼로리 기준으로 비교합니다. 단백질 제품 추천, 셀렉스 vs 하이뮨, 40g 이상 비교, 다이어트 추천까지 바로 확인할 수 있습니다.`;

  return {
    title,
    description,
    alternates: {
      canonical: "https://proteinlab.kr",
    },
    openGraph: {
      title,
      description,
      url: "https://proteinlab.kr",
      type: "website",
      locale: "ko_KR",
      siteName: "ProteinLab",
      images: [{ url: "https://proteinlab.kr/proteinlab-logo.png", width: 81, height: 88, alt: "ProteinLab" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["https://proteinlab.kr/proteinlab-logo.png"],
    },
  };
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
        "단백질 음료, 바, 요거트, 쉐이크를 성분 데이터로 비교하고 추천, 계산, 가이드까지 한곳에서 확인하는 프로틴랩 ProteinLab입니다.",
      inLanguage: "ko",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://proteinlab.kr/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
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
  const totalCount = products.length + bars.length + yogurts.length + shakes.length;

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
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
