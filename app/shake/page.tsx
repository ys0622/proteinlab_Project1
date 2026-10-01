import type { Metadata } from "next";
import Link from "next/link";
import CommercialAdSection from "../components/CommercialAdSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import CategoryFaqSection, { getCategoryFaqs } from "../components/CategoryFaqSection";
import { getProductsByCategoryAsync } from "../lib/productData";
import { getCategoryProductsWithCountsAsync } from "../lib/productCounts";
import { formatProductLabel } from "../lib/productLabel";
import { brandToSlug } from "../lib/brandHubs";
import { applyCurationToCategoryProducts, getCurationDefinition, getQuickCurations } from "../lib/curationSystem";
import newProductsRaw from "../data/newProducts.json";

// ProductListWithFilters가 useSearchParams()를 쓰기 때문에, 정적/ISR로 렌더링하면
// Next.js가 그 부분을 Suspense fallback(null)으로 대체해버려 실제 제품 카드가
// 정적 HTML에 전혀 포함되지 않는다(구글 첫 크롤링에서 상품 목록이 통째로 비어 보임).
// force-dynamic으로 매 요청마다 실제 렌더링해서 완전한 HTML을 내려준다.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProductsByCategoryAsync("shake");

  const title = `단백질 쉐이크 추천 비교 ${products.length}종 — 식사대용·저당·고단백 기준 2026`;
  const description = `단백질 쉐이크 ${products.length}종을 단백질 총량, 당류, 칼로리, 식사대용 적합도 기준으로 비교합니다. 식사대용, 다이어트, 운동 후 보충용 쉐이크를 성분 데이터로 바로 좁혀보세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: "https://proteinlab.kr/shake",
    },
    openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
      title,
      description,
      url: "https://proteinlab.kr/shake",
      type: "website",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ShakePage() {
  const { products, categoryCounts, totalCount } =
    await getCategoryProductsWithCountsAsync("shake");
  const recentlyAddedSlugs = new Set(
    (newProductsRaw as Array<{ slug: string; addedAt: string }>)
      .filter((item) => item.addedAt === "2026-09-30")
      .map((item) => item.slug),
  );
  const recentlyAddedGroups = [...new Set(products
    .filter((product) => product.slug && recentlyAddedSlugs.has(product.slug))
    .map((product) => product.brand))]
    .map((brand) => ({
      brand,
      products: products.filter(
        (product) => product.brand === brand && product.slug && recentlyAddedSlugs.has(product.slug),
      ),
    }));
  const intentLinks = getQuickCurations("shake")
    .filter((item) => item.slug !== "popular")
    .map((item) => {
      const definition = getCurationDefinition(item.slug);
      return {
        ...item,
        count: applyCurationToCategoryProducts(products, "shake", item.slug).length,
        description: definition?.seoDescription ?? "조건에 맞는 단백질 쉐이크를 성분 기준으로 비교합니다.",
      };
    });

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
      name: formatProductLabel(p.brand, p.name),
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getCategoryFaqs("shake").map((item) => ({
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
        <section className="mb-6 rounded-2xl border border-[#e4e9e4] bg-white p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--accent)]">112개 성분 DB 자동 분류</p>
              <h2 className="mt-1 text-lg font-bold text-[var(--foreground)]">목적과 맛으로 쉐이크 좁혀보기</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                제품명만 나열하지 않고 단백질·당류·칼로리·식이섬유와 맛 계열을 기준으로 후보를 나눴습니다.
              </p>
            </div>
            <Link href="/guides/product-selection-comparison/protein-shake-guide" className="text-sm font-semibold text-[var(--accent)] hover:underline">
              쉐이크 선택 기준 보기
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {intentLinks.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group rounded-xl border border-[#e4e9e4] bg-[#fbfdfb] p-4 transition-all hover:-translate-y-0.5 hover:border-[#95b9a0] hover:bg-[#f3faf5]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xl" aria-hidden>{item.icon}</span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#24543d] shadow-sm">{item.count}종</span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)]">{item.label} 쉐이크</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--foreground-muted)]">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-[#dfe8df] bg-[#f7fbf7] p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--accent)]">2026년 9월 신규 등록</p>
              <h2 className="mt-1 text-lg font-bold text-[var(--foreground)]">새로 비교할 수 있는 단백질 쉐이크 24종</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                딜라이트 프로젝트, 한손한끼, 매일한끼, 테이크핏 브레드밀, 스포식스 제품을 맛별 성분표와 함께 추가했습니다.
              </p>
            </div>
            <Link href="/brands" className="text-sm font-semibold text-[var(--accent)] hover:underline">
              전체 브랜드 보기
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentlyAddedGroups.map((group) => (
              <div key={group.brand} className="rounded-xl border border-[#e4ebe4] bg-white p-4">
                <Link
                  href={`/brands/${brandToSlug(group.brand)}`}
                  className="font-bold text-[var(--foreground)] hover:text-[var(--accent)] hover:underline"
                >
                  {group.brand} {group.products.length}종
                </Link>
                <ul className="mt-3 space-y-2">
                  {group.products.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-sm leading-5 text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:underline"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#dfe8df] pt-4">
            <Link href="/guides/product-selection-comparison/protein-shake-new-products-2026" className="rounded-full bg-[#24543d] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1d4633]">
              신제품 24종 비교
            </Link>
            <Link href="/guides/product-selection-comparison/delight-project-shake-flavors" className="rounded-full border border-[#cadbcd] bg-white px-4 py-2 text-xs font-semibold text-[#24543d] hover:bg-[#eef7f1]">
              딜라이트 프로젝트 8종
            </Link>
            <Link href="/guides/product-selection-comparison/hansonhankki-vs-maeilhankki-shake" className="rounded-full border border-[#cadbcd] bg-white px-4 py-2 text-xs font-semibold text-[#24543d] hover:bg-[#eef7f1]">
              한손한끼 vs 매일한끼
            </Link>
            <Link href="/guides/product-selection-comparison/takefit-breadmeal-protein-shake" className="rounded-full border border-[#cadbcd] bg-white px-4 py-2 text-xs font-semibold text-[#24543d] hover:bg-[#eef7f1]">
              테이크핏 브레드밀 4종
            </Link>
            <Link href="/guides/product-selection-comparison/protein-shake-flavor-guide" className="rounded-full border border-[#cadbcd] bg-white px-4 py-2 text-xs font-semibold text-[#24543d] hover:bg-[#eef7f1]">
              맛별 쉐이크 추천
            </Link>
            <Link href="/guides/product-selection-comparison/protein-shake-nutrition-label-guide" className="rounded-full border border-[#cadbcd] bg-white px-4 py-2 text-xs font-semibold text-[#24543d] hover:bg-[#eef7f1]">
              성분표 보는 법
            </Link>
          </div>
        </section>
        <ProductListWithFilters
          productType="shake"
          products={products}
          categoryCounts={categoryCounts}
          stickyTabs={false}
          tabsPlacement="before_grid"
        />
        <CommercialAdSection pageType="category" className="mt-6" />
      </main>

      <CategoryFaqSection category="shake" />
      <Footer />
    </div>
  );
}
