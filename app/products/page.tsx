import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Footer from "../components/Footer";
import ProductListWithFilters from "../components/ProductListWithFilters";
import TrackedLink from "../components/TrackedLink";
import { getProductsByCategoryAsync } from "../lib/productData";
import type { ProductCategory } from "../lib/categories";

export const metadata: Metadata = {
  title: "단백질 제품 322종 비교 | 저당·40g·식사대용 제품 빠르게 찾기 | ProteinLab",
  description:
    "단백질 음료, 바, 요거트, 쉐이크 322종을 한 번에 비교하고 저당, 40g 이상, 식사대용, 50대용 제품까지 빠르게 좁혀보세요.",
  alternates: {
    canonical: "https://proteinlab.kr/products",
  },
};

const quickEntryLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "입문 가이드",
    body: "입문자가 가장 많이 헷갈리는 기준만 먼저 정리해서 첫 제품을 더 빨리 고를 수 있게 돕습니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g만 비교",
    body: "고함량 제품만 묶어서 보고 싶다면 40g대 제품끼리 바로 비교하는 시작점이 가장 빠릅니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "음료·바·요거트 차이부터 보기",
    body: "어느 카테고리가 맞는지 아직 모르면 제품군별 차이부터 확인하는 편이 훨씬 빠릅니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-for-50s",
    title: "50대 추천 보기",
    body: "건강관리나 식사보완 목적이라면 중장년 기준으로 많이 찾는 제품군부터 바로 좁힐 수 있습니다.",
  },
];

const categoryLinks = [
  {
    href: "/",
    title: "음료부터 고르기",
    body: "20g대, 40g대, 식사보완형까지 선택지가 가장 넓어서 처음 비교를 시작하기 좋습니다.",
  },
  {
    href: "/bars",
    title: "바 제품만 먼저 보기",
    body: "간식 대체나 휴대성이 중요하면 바 카테고리부터 좁히는 편이 가장 빠릅니다.",
  },
  {
    href: "/yogurt",
    title: "요거트만 따로 보기",
    body: "가벼운 간식이나 아침 대용을 찾는다면 요거트만 모아 보는 쪽이 판단이 쉽습니다.",
  },
  {
    href: "/shake",
    title: "쉐이크 제품만 보기",
    body: "식사대용, 다이어트, 공복 보완 목적이면 쉐이크 카테고리부터 보는 편이 더 직접적입니다.",
  },
];

interface ProductsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = (await searchParams) ?? {};
  const curation = typeof params.curation === "string" ? params.curation : undefined;
  const [drinks, bars, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);

  const categoryCounts: Record<ProductCategory, number> = {
    drink: drinks.length,
    bar: bars.length,
    yogurt: yogurts.length,
    shake: shakes.length,
  };

  return (
    <div className="min-h-screen bg-white">
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
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 제품 322종을
            <br />
            조건별로 바로 좁혀서 비교해보세요.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료, 바, 요거트, 쉐이크를 한 화면에서 찾고 필터링할 수 있습니다. 저당, 40g
            이상, 식사대용, 50대 기준 같은 조건도 바로 적용해볼 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-3 pt-6 md:px-6">
        <AffiliateDisclosure />

        <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">바로 시작하기 좋은 비교 경로</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {quickEntryLinks.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                trackingLabel={item.title}
                trackingSection="products_quick_entry"
                trackingPageType="products"
                className="rounded-2xl border border-[#ece9e2] bg-white p-4 transition-colors hover:bg-[#f8fbf8]"
              >
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </TrackedLink>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">원하는 제품군부터 바로 들어가기</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {categoryLinks.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                trackingLabel={item.title}
                trackingSection="products_category_entry"
                trackingPageType="products"
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white"
              >
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </TrackedLink>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <ProductListWithFilters
            productType="drink"
            products={drinks}
            curationSlug={curation}
            categoryCounts={categoryCounts}
            stickyTabs={false}
            tabsPlacement="before_grid"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
