import type { Metadata } from "next";
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

// ProductListWithFilters가 useSearchParams()를 쓰기 때문에, 정적/ISR로 렌더링하면
// Next.js가 그 부분을 Suspense fallback(null)으로 대체해버려 실제 제품 카드가
// 정적 HTML에 전혀 포함되지 않는다(구글 첫 크롤링에서 상품 목록이 통째로 비어 보임).
// force-dynamic으로 매 요청마다 실제 렌더링해서 완전한 HTML을 내려준다.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProductsByCategoryAsync("drink");

  const title = `단백질 음료 추천 비교 ${products.length}종 — 저당·고단백·40g 기준 2026`;
  const description = `단백질 음료 ${products.length}종을 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다. 셀렉스, 하이뮨, 뉴케어, 닥터유, 테이크핏 같은 대표 제품을 성분 데이터로 바로 좁혀보세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: "https://proteinlab.kr/drinks",
    },
    openGraph: {
      title,
      description,
      url: "https://proteinlab.kr/drinks",
      type: "website",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function DrinksPage() {
  const { products, categoryCounts, totalCount } =
    await getCategoryProductsWithCountsAsync("drink");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "단백질 음료", item: "https://proteinlab.kr/drinks" },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "단백질 음료 비교 목록",
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
    mainEntity: getCategoryFaqs("drink").map((item) => ({
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
        <ProductListWithFilters
          productType="drink"
          products={products}
          categoryCounts={categoryCounts}
          stickyTabs={false}
          tabsPlacement="before_grid"
        />
        <CommercialAdSection pageType="category" className="mt-6" />
      </main>

      <CategoryFaqSection category="drink" />
      <Footer />
    </div>
  );
}
