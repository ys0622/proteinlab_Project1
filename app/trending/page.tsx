import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommercialAdSection from "../components/CommercialAdSection";
import ProductCard from "../components/ProductCard";
import type { ProductDetailProps } from "../data/products";
import { getCategoryHref, getCategoryLabel, type ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";
import { hybridScore } from "../lib/productScoring";

export const revalidate = 300; // 5분마다 재생성 (조회수 실시간 반영)

const canonical = "https://proteinlab.kr/trending";
const title = "실시간 인기 단백질 제품 순위 — 이번 주 가장 많이 본 제품";
const description = "방문자 실제 조회수를 기준으로 지금 가장 관심을 받고 있는 단백질 음료, 바, 요거트, 쉐이크를 카테고리별로 확인합니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
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

const CATEGORIES: { type: ProductCategory; emoji: string }[] = [
  { type: "drink", emoji: "🥤" },
  { type: "bar", emoji: "🍫" },
  { type: "yogurt", emoji: "🥛" },
  { type: "shake", emoji: "🥣" },
];

export default async function TrendingPage() {
  const [drinks, bars, yogurts, shakes, popularRes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "https://proteinlab.kr"}/api/popular`, {
      next: { revalidate: 300 },
    }).then((r) => r.json()).catch(() => ({ views: {} })),
  ]);

  const views = (popularRes as { views: Record<string, Record<string, number>> }).views ?? {};

  const byCategory: Record<ProductCategory, ProductDetailProps[]> = {
    drink: drinks,
    bar: bars,
    yogurt: yogurts,
    shake: shakes,
  };

  const topByCategory = (type: ProductCategory) =>
    byCategory[type]
      .filter((p) => p.slug)
      .map((p) => ({ p, score: hybridScore(p, views[type]?.[p.slug ?? ""] ?? 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ p }) => p);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "실시간 인기", item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <section className="w-full border-b border-t" style={{ background: "#FAF8F3", borderColor: "#E7DFC9" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] md:text-3xl" style={{ color: "#16412D" }}>
            실시간 인기 단백질 제품
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            방문자들이 실제로 가장 많이 조회한 제품을 카테고리별로 보여줍니다. 5분마다 자동으로 갱신되며,
            단순 조회수뿐 아니라 단백질 밀도·당류 같은 품질 지표도 함께 반영합니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/ranking"
              className="inline-flex min-h-9 items-center rounded-[10px] border bg-white px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-[#E8F0EA] md:text-sm"
              style={{ borderColor: "#DCE6DE", color: "#16412D" }}
            >
              스펙 기준 랭킹 보기
            </Link>
            <Link
              href="/recommend"
              className="inline-flex min-h-9 items-center rounded-[10px] border bg-white px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-[#E8F0EA] md:text-sm"
              style={{ borderColor: "#DCE6DE", color: "#16412D" }}
            >
              맞춤 추천 받기
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        {CATEGORIES.map(({ type, emoji }) => {
          const top = topByCategory(type);
          if (top.length === 0) return null;

          return (
            <section key={type} className="mb-10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
                  <span>{emoji}</span>
                  {getCategoryLabel(type)} 인기 순위
                </h2>
                <Link
                  href={getCategoryHref(type)}
                  className="text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  전체 {getCategoryLabel(type)} 보기 →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
                {top.map((product, index) => (
                  <div key={product.slug} className="relative">
                    <span
                      className="absolute left-2 top-2 z-10 flex items-center gap-0.5 rounded-[7px] font-extrabold text-white shadow-sm"
                      style={{
                        height: 20,
                        padding: "0 6px",
                        background: "#16412D",
                        fontSize: "11px",
                        letterSpacing: "-0.02em",
                        boxShadow: "0 2px 6px rgba(22,65,45,0.28)",
                      }}
                    >
                      {index + 1}<span style={{ fontSize: "9px", fontWeight: 700, opacity: 0.85 }}>위</span>
                    </span>
                    <ProductCard {...product} purchaseLinkCategory="ranking" />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        <CommercialAdSection pageType="category" />
      </main>

      <Footer />
    </div>
  );
}
