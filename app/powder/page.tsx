import AffiliateDisclosure from "../components/AffiliateDisclosure";
import CommercialAdSection from "../components/CommercialAdSection";
import CategoryGuideLinks from "../components/CategoryGuideLinks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import CategoryFaqSection, { getCategoryFaqs } from "../components/CategoryFaqSection";
import { getProductsByCategoryAsync } from "../lib/productData";
import { getCategoryProductsWithCountsAsync } from "../lib/productCounts";
import { formatProductLabel } from "../lib/productLabel";
import { getCategoryAnswer } from "../lib/categoryAnswer";
import GoldboxStrip from "../components/GoldboxStrip";
import { getActiveGoldboxCards } from "../lib/activeGoldbox";

export const revalidate = 300;

export async function generateMetadata() {
  const products = await getProductsByCategoryAsync("powder");
  const title = `단백질 보충제 추천 비교 ${products.length}종 — 1회 단백질·함량 기준 2026`;
  const description = `단백질 파우더 ${products.length}종을 1회 제공량 단백질 g, 단백질 함량 %, 당류, 칼로리 기준으로 비교합니다.`;
  return {
    title,
    description,
    alternates: { canonical: "https://proteinlab.kr/powder" },
    openGraph: {
      images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 파우더 비교" }],
      title,
      description,
      url: "https://proteinlab.kr/powder",
      type: "website",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: { images: ["https://proteinlab.kr/opengraph-image"], card: "summary", title, description },
  };
}

export default async function PowderPage() {
  const goldboxCards = (await getActiveGoldboxCards({ cacheOnly: true }).catch(() => ({ cards: [] }))).cards.filter((card) => card.href);
  const { products, categoryCounts, totalCount } = await getCategoryProductsWithCountsAsync("powder");
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "파우더", item: "https://proteinlab.kr/powder" },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "단백질 파우더 비교 목록",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://proteinlab.kr/product/${p.slug}`,
      name: formatProductLabel(p.brand, p.name),
    })),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getCategoryFaqs("powder").map((item) => ({
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
      <HeroSection totalCount={totalCount} categoryCount={products.length} answer={`단백질 파우더 ${products.length}종 성분표 기준 ${getCategoryAnswer(products.filter((p) => p.powderType !== "gainer"), "게이너를 뺀 1회 제공량", 25)}`} />
      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <AffiliateDisclosure />
        <GoldboxStrip category="powder" placement="category" className="mb-3 mt-1" initialCards={goldboxCards} />
        <ProductListWithFilters productType="powder" products={products} categoryCounts={categoryCounts} tabsPlacement="before_grid" />
        <CategoryGuideLinks
          id="powder-guides"
          title="파우더 고르는 가이드"
          links={[
            { href: "/guides/product-selection-comparison/protein-powder-top10", label: "단백질 파우더 추천 TOP 10" },
            { href: "/guides/product-selection-comparison/wpi-wpc-isp-powder-guide", label: "WPI·WPC·분리대두 차이" },
            { href: "/guides/product-selection-comparison/protein-powder-scoop-guide", label: "1스쿱 단백질·칼로리" },
          ]}
        />
        <CommercialAdSection pageType="category" className="mt-6" />
      </main>
      <CategoryFaqSection category="powder" />
      <Footer />
    </div>
  );
}
