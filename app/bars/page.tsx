import Header from "../components/Header";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import CommercialAdSection from "../components/CommercialAdSection";
import CategoryGuideLinks from "../components/CategoryGuideLinks";
import Footer from "../components/Footer";
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

// '단백질바' 단독 검색(네이버 30일 노출 3,040·평균 10위, 2026-11-11)에 첫 줄로 답한다. 수치는 등록 제품 성분표 1개 기준.
function getBarAnswer(products: Array<{ brand: string; name: string; proteinPerServing: number; sugar?: number | null }>) {
  const withProtein = products.filter((p) => Number.isFinite(p.proteinPerServing));
  if (withProtein.length === 0) return "";
  const top = [...withProtein].sort((a, b) => b.proteinPerServing - a.proteinPerServing)[0];
  const zeroSugar = products.filter((p) => p.sugar === 0).length;
  const atLeast15 = withProtein.filter((p) => p.proteinPerServing >= 15).length;
  // 범위(최저값)는 등록 기준 5g 이전에 들어온 단백질 간식 바(1~4g)가 섞여 쓰지 않는다. 제품명 괄호는 풀어 쓴다(괄호 겹침 방지).
  const topLabel = formatProductLabel(top.brand, top.name).replace(/\s*\(([^)]*)\)$/, " $1");
  return `1개 단백질 15g 이상 ${atLeast15}종, 가장 많은 제품은 ${topLabel} ${top.proteinPerServing}g${zeroSugar > 0 ? `, 당류 0g ${zeroSugar}종` : ""}입니다.`;
}

export async function generateMetadata() {
  const products = await getProductsByCategoryAsync("bar");

  return {
    title: `단백질바 추천 비교 ${products.length}종 — 고단백·저당 성분표 기준 2026`,
    description: `단백질바 ${products.length}종을 성분표 기준 단백질 함량·당류·칼로리·중량으로 비교합니다. ${getBarAnswer(products)}`,
    alternates: {
      canonical: "https://proteinlab.kr/bars",
    },
    openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
      title: `단백질바 추천 비교 ${products.length}종 — 고단백·저당 성분표 기준 2026`,
      description: `단백질바 ${products.length}종을 성분표 기준 단백질 함량·당류·칼로리·중량으로 비교합니다. ${getBarAnswer(products)}`,
      url: "https://proteinlab.kr/bars",
      type: "website",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
      card: "summary",
      title: `단백질바 추천 비교 ${products.length}종 — 고단백·저당 성분표 기준 2026`,
      description: `단백질바 ${products.length}종을 성분표 기준 단백질 함량·당류·칼로리·중량으로 비교합니다. ${getBarAnswer(products)}`,
    },
  };
}

export default async function BarsPage() {
  // 골드박스 줄을 첫 HTML에 바로 그린다(브라우저에서 늦게 끼어들며 목록을 밀어내지 않게). KV 캐시를 읽는다.
  const goldboxCards = (await getActiveGoldboxCards({ cacheOnly: true }).catch(() => ({ cards: [] }))).cards.filter((card) => card.href);
  const { products, categoryCounts, totalCount } =
    await getCategoryProductsWithCountsAsync("bar");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "단백질바", item: "https://proteinlab.kr/bars" },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "단백질바 비교 목록",
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
    mainEntity: getCategoryFaqs("bar").map((item) => ({
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
      <HeroSection totalCount={totalCount} categoryCount={products.length} answer={`단백질바 ${products.length}종 성분표 기준 ${getBarAnswer(products)}`} />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <AffiliateDisclosure />
        <GoldboxStrip category="bar" placement="category" className="mb-3 mt-1" initialCards={goldboxCards} />
        <ProductListWithFilters
          productType="bar"
          products={products}
          categoryCounts={categoryCounts}
          tabsPlacement="before_grid"
        />
        <CategoryGuideLinks
          id="bar-guides"
          title="단백질바 고르는 가이드"
          links={[
            { href: "/guides/product-selection-comparison/protein-bar-top10", label: "단백질 바 추천 TOP 10" },
            { href: "/guides/product-selection-comparison/protein-bar-guide", label: "단백질 바 고르는 법" },
            { href: "/guides/product-selection-comparison/meal-replacement-protein-bar-guide", label: "식사대용 단백질 바" },
          ]}
        />
        <CommercialAdSection pageType="category" className="mt-6" />
      </main>

      <CategoryFaqSection category="bar" />
      <Footer />
    </div>
  );
}
