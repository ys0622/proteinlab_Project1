import AffiliateDisclosure from "../components/AffiliateDisclosure";
import CommercialAdSection from "../components/CommercialAdSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import CategoryFaqSection, { getCategoryFaqs } from "../components/CategoryFaqSection";
import { getProductsByCategoryAsync } from "../lib/productData";
import { getCategoryProductsWithCountsAsync } from "../lib/productCounts";
import { formatProductLabel } from "../lib/productLabel";
import GoldboxStrip from "../components/GoldboxStrip";
import { getActiveGoldboxCards } from "../lib/activeGoldbox";

// 2026-10-21: 5분 캐시(ISR). 예전에는 ProductListWithFilters의 useSearchParams 때문에 정적 렌더링에서 목록이
// Suspense fallback으로 비어 force-dynamic이었다. 이제 URL 파라미터는 브라우저에서 읽어 서버 HTML에 목록 전체가 들어간다.
// 매 요청 렌더링으로 첫 응답이 3~6초 걸리던 것을 줄인다. 배포 후 회귀 검사(제품 링크 수)로 확인한다.
export const revalidate = 300;

export async function generateMetadata() {
  const products = await getProductsByCategoryAsync("yogurt");

  return {
    title: `단백질 요거트 추천 비교 ${products.length}종 — 그릭·드링킹·저당 기준 2026`,
    description: `단백질 요거트 ${products.length}개를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 그릭요거트, 드링킹 요거트, 대용량 요거트 추천과 순위까지 한 번에 확인하세요.`,
    alternates: {
      canonical: "https://proteinlab.kr/yogurt",
    },
    openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
      title: `단백질 요거트 추천 비교 ${products.length}종 — 그릭·드링킹·저당 기준 2026`,
      description: `단백질 요거트 ${products.length}개를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 그릭요거트, 드링킹 요거트, 대용량 요거트 추천과 순위까지 한 번에 확인하세요.`,
      url: "https://proteinlab.kr/yogurt",
      type: "website",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
      card: "summary",
      title: `단백질 요거트 추천 비교 ${products.length}종 — 그릭·드링킹·저당 기준 2026`,
      description: `단백질 요거트 ${products.length}개를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 그릭요거트, 드링킹 요거트, 대용량 요거트 추천과 순위까지 한 번에 확인하세요.`,
    },
  };
}

export default async function YogurtPage() {
  // 골드박스 줄을 첫 HTML에 바로 그린다(브라우저에서 늦게 끼어들며 목록을 밀어내지 않게). KV 캐시를 읽는다.
  const goldboxCards = (await getActiveGoldboxCards({ cacheOnly: true }).catch(() => ({ cards: [] }))).cards.filter((card) => card.href);
  const { products, categoryCounts, totalCount } =
    await getCategoryProductsWithCountsAsync("yogurt");
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
      name: formatProductLabel(p.brand, p.name),
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getCategoryFaqs("yogurt").map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <HeroSection totalCount={totalCount} categoryCount={products.length} />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <AffiliateDisclosure />
        <GoldboxStrip category="yogurt" placement="category" className="mb-3 mt-1" initialCards={goldboxCards} />
        <ProductListWithFilters
          productType="yogurt"
          products={products}
          categoryCounts={categoryCounts}
          tabsPlacement="before_grid"
        />
        <CommercialAdSection pageType="category" className="mt-6" />
      </main>

      <CategoryFaqSection category="yogurt" />
      <Footer />
    </div>
  );
}
