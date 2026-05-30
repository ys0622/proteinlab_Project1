import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePopularCarousel, { type CarouselProduct } from "./components/HomePopularCarousel";
import HomeTrackedLink from "./components/HomeTrackedLink";
import type { ProductDetailProps } from "./data/products";
import { getProductsByCategoryAsync } from "./lib/productData";
import { getProductImageUrl } from "./lib/productImage";
import { getPopularityScore } from "./lib/productPopularity";

export const revalidate = 3600;

function getCapacityMl(product: ProductDetailProps): number {
  const cap = product.capacity;
  if (!cap) return 0;
  const m = cap.match(/(\d+(?:\.\d+)?)\s*(?:mL|ml|g)/i);
  return m ? parseFloat(m[1]) : 0;
}

function getDrinkScore(product: ProductDetailProps, index: number): number {
  const cap = getCapacityMl(product);
  const density = cap > 0 ? (product.proteinPerServing / cap) * 100 : 0;
  const pop = getPopularityScore(product, "drink") ?? Math.max(100, 850 - index * 17);
  return density * 18 + product.proteinPerServing * 2.5 + pop * 0.01 - (product.sugar ?? 0) * 4 - (product.calories ?? 0) * 0.06;
}

function getBarScore(product: ProductDetailProps, index: number): number {
  const pop = getPopularityScore(product, "bar") ?? Math.max(100, 500 - index * 10);
  return product.proteinPerServing * 3 + pop * 0.01 - (product.sugar ?? 0) * 3;
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://proteinlab.kr/#website",
      url: "https://proteinlab.kr",
      name: "ProteinLab",
      description: "단백질 음료, 바, 요거트, 쉐이크를 성분 데이터로 비교하고 추천, 계산, 가이드까지 한곳에서 확인하는 프로틴랩 ProteinLab입니다.",
      inLanguage: "ko",
      potentialAction: { "@type": "SearchAction", target: "https://proteinlab.kr/search?q={search_term_string}", "query-input": "required name=search_term_string" },
    },
    { "@type": "Organization", "@id": "https://proteinlab.kr/#organization", name: "ProteinLab", url: "https://proteinlab.kr" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const title = "ProteinLab | 단백질 제품 비교 플랫폼";
  const description = "단백질 음료·바·요거트·쉐이크를 성분 데이터로 비교합니다. 단백질 함량, 당류, 칼로리 기준으로 내게 맞는 제품을 골라보세요.";
  return {
    title, description,
    alternates: { canonical: "https://proteinlab.kr" },
    openGraph: { title, description, url: "https://proteinlab.kr", type: "website", locale: "ko_KR", siteName: "ProteinLab", images: [{ url: "https://proteinlab.kr/proteinlab-logo.png", width: 81, height: 88, alt: "ProteinLab" }] },
    twitter: { card: "summary", title, description, images: ["https://proteinlab.kr/proteinlab-logo.png"] },
  };
}

const CATEGORY_CARDS = [
  { label: "단백질 음료", sub: "RTD 프로틴 드링크", emoji: "🥤", color: "#D4EDDF", href: "/drink", countKey: "drink" as const },
  { label: "단백질 바", sub: "프로틴 바·간식", emoji: "🍫", color: "#F5E6CE", href: "/bars", countKey: "bar" as const },
  { label: "단백질 요거트", sub: "그릭 요거트 포함", emoji: "🥛", color: "#F0EBE0", href: "/yogurt", countKey: "yogurt" as const },
  { label: "단백질 쉐이크", sub: "파우치·분말형", emoji: "🧃", color: "#DDE9E2", href: "/shake", countKey: "shake" as const },
] as const;

const GUIDE_CARDS = [
  { category: "마켓 인사이트", title: "2026 프로틴 음료 트렌드", desc: "단백질 음료 시장 흐름과 신제품 분석", href: "/guides/market-insights/protein-drink-trend-2026", thumbBg: "linear-gradient(135deg, #B8DEC8 0%, #8FC4A8 100%)", thumbEmoji: "📈" },
  { category: "비교 가이드", title: "셀렉스 vs 하이뮨", desc: "고단백 음료 브랜드 스펙 직접 비교", href: "/guides/product-selection-comparison/selex-vs-himune", thumbBg: "linear-gradient(135deg, #EED4A8 0%, #DEB87E 100%)", thumbEmoji: "⚖️" },
  { category: "추천", title: "편의점 단백질 음료 BEST 8", desc: "편의점에서 살 수 있는 고단백 제품 정리", href: "/guides/product-selection-comparison/convenience-store-protein-guide", thumbBg: "linear-gradient(135deg, #A8CCC4 0%, #80B0A8 100%)", thumbEmoji: "🏪" },
  { category: "섭취 전략", title: "운동 전후 단백질 섭취 가이드", desc: "시간대별 섭취 전략과 추천 제품", href: "/guides/intake-strategy-health/post-workout-protein", thumbBg: "linear-gradient(135deg, #C4D8CC 0%, #9CBCB0 100%)", thumbEmoji: "💪" },
  { category: "기본 지식", title: "하루 단백질 필요량", desc: "체중과 목적에 따른 단백질 권장량 계산", href: "/guides/basics/daily-requirement", thumbBg: "linear-gradient(135deg, #D8CDB8 0%, #C0AF98 100%)", thumbEmoji: "📚" },
  { category: "제품 선택", title: "단백질 음료 선택 가이드", desc: "성분 기준으로 내게 맞는 음료 고르는 법", href: "/guides/product-selection-comparison/protein-drink-guide", thumbBg: "linear-gradient(135deg, #C8DDD4 0%, #A0C4B8 100%)", thumbEmoji: "🎯" },
];

function toCarouselProduct(p: ProductDetailProps): CarouselProduct {
  return {
    slug: p.slug ?? "",
    name: p.name,
    brand: p.brand,
    proteinPerServing: p.proteinPerServing,
    sugar: p.sugar,
    calories: p.calories,
    imageUrl: p.slug ? getProductImageUrl(p.slug) : null,
    gradeTags: p.gradeTags ?? [],
  };
}

export default async function Home() {
  const [drinks, bars, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);

  const categoryCounts = { drink: drinks.length, bar: bars.length, yogurt: yogurts.length, shake: shakes.length };
  const totalCount = drinks.length + bars.length + yogurts.length + shakes.length;

  const topDrinks = drinks.filter((p) => p.slug).map((p, i) => ({ p, score: getDrinkScore(p, i) })).sort((a, b) => b.score - a.score).slice(0, 10).map(({ p }) => p);
  const topBars = bars.filter((p) => p.slug).map((p, i) => ({ p, score: getBarScore(p, i) })).sort((a, b) => b.score - a.score).slice(0, 10).map(({ p }) => p);
  const topYogurts = yogurts.filter((p) => p.slug).slice(0, 10);
  const topShakes = shakes.filter((p) => p.slug).slice(0, 10);

  const carouselProducts = {
    drink: topDrinks.map(toCarouselProduct),
    bar: topBars.map(toCarouselProduct),
    yogurt: topYogurts.map(toCarouselProduct),
    shake: topShakes.map(toCarouselProduct),
  };

  const heroImages = topDrinks.slice(0, 4).map((p) => ({ url: getProductImageUrl(p.slug ?? ""), name: p.name, brand: p.brand }));

  return (
    <div className="min-h-screen" style={{ background: "#F3EFE6" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Header />

      {/* ─── 1. Hero ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-4 md:px-5 md:pt-5">
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1F5A3D 0%, #2A7A54 60%, #1B4F35 100%)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(31,90,61,0.22)",
          }}
        >
          {/* decorative circles */}
          <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 rounded-full opacity-10" style={{ width: 260, height: 260, background: "radial-gradient(circle, #A8D5B5 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 rounded-full opacity-10" style={{ width: 180, height: 180, background: "radial-gradient(circle, #A8D5B5 0%, transparent 70%)" }} />

          <div className="relative grid grid-cols-1 items-center gap-0 md:grid-cols-[1fr_auto]">
            {/* Left: text */}
            <div className="px-6 py-7 md:px-10 md:py-8">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.95)", fontWeight: 700, letterSpacing: "0.03em" }}>🔬 단백질 제품 비교 플랫폼</span>
              </div>
              <h1
                className="font-extrabold leading-tight text-white"
                style={{ fontSize: "clamp(22px, 3.5vw, 36px)", letterSpacing: "-0.03em" }}
              >
                내게 맞는 단백질 제품을<br />찾아보세요
              </h1>
              <p className="mt-2 max-w-md" style={{ fontSize: "clamp(12px, 1.3vw, 14px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.65 }}>
                단백질·당류·칼로리 기준으로 음료·바·요거트·쉐이크를<br className="hidden sm:block" /> 성분 데이터로 비교하고 목적에 맞는 제품을 찾아보세요.
              </p>

              {/* Stats */}
              <div className="mt-4 flex flex-wrap gap-4">
                {[
                  { value: `${categoryCounts.drink + categoryCounts.bar + categoryCounts.yogurt + categoryCounts.shake}종+`, label: "비교 제품" },
                  { value: "영양성분", label: "기반 비교" },
                  { value: "등급·랭킹", label: "시스템" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-1">
                    <span className="font-extrabold text-white" style={{ fontSize: "15px" }}>{s.value}</span>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)" }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/drink"
                  className="inline-flex items-center rounded-full px-6 text-[13px] font-bold text-[#1A5235]"
                  style={{ background: "#FFFFFF", height: "40px", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}
                >
                  제품 비교하기 →
                </Link>
                <Link
                  href="/recommend"
                  className="inline-flex items-center rounded-full px-6 text-[13px] font-bold"
                  style={{ background: "rgba(255,255,255,0.14)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", height: "40px" }}
                >
                  추천 보러가기
                </Link>
              </div>
            </div>

            {/* Right: product images */}
            <div className="hidden md:flex md:flex-col md:justify-center md:px-8 md:py-6">
              <div className="grid grid-cols-2 gap-2.5" style={{ width: 220 }}>
                {heroImages.map((img, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center overflow-hidden"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      height: 96,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    }}
                  >
                    {img.url ? (
                      <Image
                        src={img.url}
                        alt={`${img.brand} ${img.name}`}
                        width={60}
                        height={78}
                        style={{ maxHeight: "78px", width: "auto", objectFit: "contain" }}
                        unoptimized
                      />
                    ) : (
                      <span style={{ fontSize: "28px" }}>🥤</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. 목적별 빠른 이동 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-5 md:px-5 md:pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-extrabold" style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "#1A2B1E", letterSpacing: "-0.02em" }}>
            목적별 빠른 선택
          </h2>
          <Link href="/recommend" className="text-[11px] font-bold" style={{ color: "#1F5A3D" }}>
            자세히 보기 →
          </Link>
        </div>
        <div
          className="flex gap-2.5"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", paddingBottom: "2px" } as React.CSSProperties}
        >
          {[
            { emoji: "💪", label: "근육 성장", href: "/curation/high-protein", bg: "#D4EDDF", color: "#1A5235" },
            { emoji: "🏃", label: "운동 퍼포먼스", href: "/curation/performance", bg: "#DDE9E2", color: "#1A5235" },
            { emoji: "🥗", label: "다이어트", href: "/curation/diet", bg: "#E8F4E8", color: "#1A5235" },
            { emoji: "🌅", label: "아침 대용", href: "/curation/morning", bg: "#F5E6CE", color: "#7A4A0A" },
            { emoji: "🍫", label: "간식 대체", href: "/bars", bg: "#F0EBE0", color: "#6B4A2A" },
            { emoji: "🛒", label: "편의점 구매", href: "/guides/product-selection-comparison/convenience-store-protein-guide", bg: "#E4EDEA", color: "#1A5235" },
            { emoji: "⭐", label: "전체 랭킹", href: "/ranking", bg: "#FFF3D4", color: "#7A5A0A" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex shrink-0 flex-col items-center gap-1.5 rounded-[16px] border p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(31,90,61,0.12)]"
              style={{ background: "#FFFDF7", borderColor: "#E4D9CC", minWidth: 72, boxShadow: "0 1px 4px rgba(60,45,30,0.06)" }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[12px]"
                style={{ background: item.bg }}
              >
                <span style={{ fontSize: "20px" }}>{item.emoji}</span>
              </div>
              <span className="text-center text-[10px] font-bold leading-tight" style={{ color: "#1A2B1E" }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 3. 카테고리별 비교 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-5 md:px-5 md:pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-extrabold" style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "#1A2B1E", letterSpacing: "-0.02em" }}>
            카테고리별 비교
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
          {CATEGORY_CARDS.map((cat) => (
            <HomeTrackedLink
              key={cat.href}
              href={cat.href}
              eventName="home_category_click"
              eventParams={{ category: cat.countKey, destination_url: cat.href }}
              className="group relative flex flex-col overflow-hidden rounded-[18px] border p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#1F5A3D]/30 hover:shadow-[0_10px_28px_rgba(31,90,61,0.12)]"
              style={{ background: "#FFFDF7", borderColor: "#E4D9CC", boxShadow: "0 2px 8px rgba(60,45,30,0.07)" }}
            >
              {/* color accent bar at top */}
              <div className="absolute left-0 right-0 top-0 h-1 rounded-t-[18px]" style={{ background: cat.color }} />
              <div
                className="mb-3 mt-2 flex h-12 w-12 items-center justify-center rounded-[14px]"
                style={{ background: cat.color }}
              >
                <span style={{ fontSize: "26px", lineHeight: 1 }}>{cat.emoji}</span>
              </div>
              <p className="font-extrabold leading-tight" style={{ fontSize: "14px", color: "#1A2B1E" }}>{cat.label}</p>
              <p className="mt-0.5 leading-tight" style={{ fontSize: "10px", color: "#9AA39C" }}>{cat.sub}</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: "#1F5A3D", color: "#fff" }}>
                  {categoryCounts[cat.countKey]}종
                </span>
                <span className="text-[13px] font-bold transition-colors group-hover:text-[#1F5A3D]" style={{ color: "#C0C8C2" }}>→</span>
              </div>
            </HomeTrackedLink>
          ))}
        </div>
      </section>

      {/* ─── 4. 이번 주 인기 제품 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-5 md:px-5 md:pt-6">
        <HomePopularCarousel products={carouselProducts} />
      </section>

      {/* ─── 5. 최신 가이드 & 인사이트 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-5 md:px-5 md:pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-extrabold" style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "#1A2B1E", letterSpacing: "-0.02em" }}>
            가이드 & 인사이트
          </h2>
          <Link
            href="/guides"
            className="shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold transition-colors hover:bg-[#E4EDEA]"
            style={{ borderColor: "#C2D4C8", color: "#1F5A3D", background: "#EBF3ED" }}
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {GUIDE_CARDS.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex items-center gap-3 overflow-hidden rounded-[14px] border p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#1F5A3D]/25 hover:shadow-[0_6px_20px_rgba(31,90,61,0.10)]"
              style={{ background: "#FFFDF7", borderColor: "#E4D9CC", boxShadow: "0 1px 4px rgba(60,45,30,0.06)" }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: guide.thumbBg }}
              >
                <span style={{ fontSize: "22px" }}>{guide.thumbEmoji}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-bold" style={{ color: "#1F5A3D" }}>{guide.category}</p>
                <p className="mt-0.5 line-clamp-2 font-bold leading-snug" style={{ fontSize: "11px", color: "#1A2B1E" }}>{guide.title}</p>
                <p className="mt-0.5 truncate text-[9px]" style={{ color: "#8A9A8C" }}>{guide.desc}</p>
              </div>
              <span className="shrink-0 text-[11px] font-bold transition-colors group-hover:text-[#1F5A3D]" style={{ color: "#C4CEC6" }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 6. 플랫폼 특징 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pb-12 pt-5 md:px-5 md:pb-16 md:pt-6">
        <div
          className="rounded-[20px] border p-5 md:p-6"
          style={{ background: "#FFFDF7", borderColor: "#E4D9CC", boxShadow: "0 2px 8px rgba(60,45,30,0.07)" }}
        >
          <p className="mb-4 text-center text-[12px] font-bold" style={{ color: "#9AA39C", letterSpacing: "0.04em" }}>
            ProteinLab이 다른 이유
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: "📊", title: "성분 기반 비교", desc: "단백질·당류·칼로리 데이터로 객관적 비교" },
              { icon: "🏅", title: "등급·랭킹 시스템", desc: "밀도·다이어트·퍼포먼스 기준 자체 평가" },
              { icon: "🎯", title: "목적별 추천", desc: "운동·다이어트·아침대용 등 목적에 맞게" },
              { icon: "🔄", title: "최신 정보 업데이트", desc: "신제품 출시·영양성분 변경 빠르게 반영" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[12px]"
                  style={{ background: "#E4EDEA" }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                </div>
                <p className="font-bold leading-tight" style={{ fontSize: "12px", color: "#1A2B1E" }}>{item.title}</p>
                <p className="leading-snug" style={{ fontSize: "10px", color: "#9AA39C" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
