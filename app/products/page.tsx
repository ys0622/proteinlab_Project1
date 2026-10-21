import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Footer from "../components/Footer";
import CommercialAdSection from "../components/CommercialAdSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import { getProductsByCategoryAsync } from "../lib/productData";
import type { ProductCategory } from "../lib/categories";

// 2026-10-21: 5분 캐시(ISR). 예전에는 ProductListWithFilters의 useSearchParams 때문에 정적 렌더링에서 목록이
// Suspense fallback으로 비어 force-dynamic이었다. 이제 URL 파라미터는 브라우저에서 읽어 서버 HTML에 목록 전체가 들어간다.
// 매 요청 렌더링으로 첫 응답이 3~6초 걸리던 것을 줄인다. 배포 후 회귀 검사(제품 링크 수)로 확인한다.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const [drinks, bars, yogurts, shakes, soymilks] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
    getProductsByCategoryAsync("soymilk"),
  ]);
  const totalCount = drinks.length + bars.length + yogurts.length + shakes.length + soymilks.length;
  const title = `단백질 제품 ${totalCount}종 비교 — 브랜드·카테고리·목적별로 찾기`;
  const description = `단백질 음료, 바, 요거트, 쉐이크, 두유 ${totalCount}종을 브랜드, 단백질 함량, 당류, 칼로리, 목적별로 바로 비교해보세요. 저당, 40g, 다이어트, 50대 기준도 빠르게 찾을 수 있습니다.`;

  return {
    title,
    description,
    alternates: {
      canonical: "https://proteinlab.kr/products",
    },
    openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
      title,
      description,
      url: "https://proteinlab.kr/products",
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

const quickEntryLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "처음 고른다면",
    body: "입문자는 단백질 음료부터 보면 가장 빠르게 후보를 좁힐 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "고단백 40g대 찾기",
    body: "테이크핏, 뉴케어, 닥터유 같은 40g대 제품만 빠르게 비교할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "음료·바·요거트·쉐이크 비교",
    body: "카테고리부터 정하고 싶다면 제품군 차이부터 보는 편이 가장 빠릅니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-for-50s",
    title: "50대·중장년용 제품",
    body: "건강 관리와 식사 보완 중심으로 먼저 볼 후보를 바로 찾을 수 있습니다.",
  },
];

const categoryLinks = [
  {
    href: "/drinks",
    title: "단백질 음료",
    body: "단백질 20g대, 40g대, 식사 보완형까지 가장 넓게 비교할 수 있습니다.",
  },
  {
    href: "/bars",
    title: "단백질 바",
    body: "간식 대체와 휴대성이 중요하다면 바 카테고리부터 보는 편이 빠릅니다.",
  },
  {
    href: "/yogurt",
    title: "단백질 요거트",
    body: "가벼운 간식이나 아침 대용으로 요거트를 찾는 경우에 잘 맞습니다.",
  },
  {
    href: "/shake",
    title: "단백질 쉐이크",
    body: "식사대용, 다이어트, 아침 공복 보완이 목적이라면 쉐이크가 더 직접적입니다.",
  },
  {
    href: "/soymilk",
    title: "두유",
    body: "두유를 찾는다면 고단백(11g 이상)부터 저당까지 1팩 기준으로 비교해보세요.",
  },
];

export default async function ProductsPage() {
  const [drinks, bars, yogurts, shakes, soymilks] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
    getProductsByCategoryAsync("soymilk"),
  ]);

  const categoryCounts: Record<ProductCategory, number> = {
    drink: drinks.length,
    bar: bars.length,
    yogurt: yogurts.length,
    shake: shakes.length,
    soymilk: soymilks.length,
  };
  const totalCount = drinks.length + bars.length + yogurts.length + shakes.length + soymilks.length;
  const byBrand = (list: typeof drinks) =>
    [...list].filter((product) => product.slug).sort((a, b) => a.brand.localeCompare(b.brand, "ko") || a.name.localeCompare(b.name, "ko"));
  const allGroups = [
    { href: "/drinks", title: "단백질 음료", products: byBrand(drinks) },
    { href: "/bars", title: "단백질 바", products: byBrand(bars) },
    { href: "/yogurt", title: "단백질 요거트", products: byBrand(yogurts) },
    { href: "/shake", title: "단백질 쉐이크", products: byBrand(shakes) },
    { href: "/soymilk", title: "두유", products: byBrand(soymilks) },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "단백질 제품 비교", item: "https://proteinlab.kr/products" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/" className="hover:text-[var(--accent)]">
              Home
            </Link>
            <span>/</span>
            <span>Products</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 제품 {totalCount}종을
            <br />
            브랜드, 카테고리, 목적별로 바로 비교해보세요.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료, 바, 요거트, 쉐이크, 두유를 한곳에서 찾고 필터링할 수 있습니다. 저당, 40g,
            다이어트, 식사대용, 50대 같은 조건도 바로 좁혀볼 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-3 pt-6 md:px-6">
        <AffiliateDisclosure />

        <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">많이 찾는 시작점</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {quickEntryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[#ece9e2] bg-white p-4 transition-colors hover:bg-[#f8fbf8]"
              >
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">카테고리부터 고르기</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {categoryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white"
              >
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <ProductListWithFilters
            productType="drink"
            products={drinks}
            categoryCounts={categoryCounts}
            stickyTabs={false}
            tabsPlacement="before_grid"
          />
        </section>
        <section className="mt-8 rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5" aria-label="전체 제품 목록">
          <h2 className="text-xl font-bold text-[var(--foreground)]">전체 제품 {totalCount}종 한눈에 보기</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            카테고리별로 모든 제품을 브랜드순으로 모았습니다. 제품명을 누르면 성분과 구매 정보를 볼 수 있습니다.
          </p>
          {allGroups.map((group) => (
            <div key={group.href} className="mt-6">
              <h3 className="text-base font-semibold text-[#24543d]">
                <Link href={group.href} className="hover:underline">
                  {group.title} {group.products.length}종
                </Link>
              </h3>
              <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm md:grid-cols-2">
                {group.products.map((product) => (
                  <li key={product.slug} className="min-w-0">
                    <Link href={`/product/${product.slug}`} className="block break-keep hover:text-[var(--accent)]">
                      {product.brand} {product.name}
                      {product.proteinPerServing ? (
                        <span className="text-[var(--foreground-muted)]"> · 단백질 {product.proteinPerServing}g</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <CommercialAdSection pageType="category" className="mt-6" />
      </main>

      <Footer />
    </div>
  );
}
