import type { Metadata } from "next";
import Link from "next/link";
import GuideThumbImage from "./components/GuideThumbImage";
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
  { label: "단백질 쉐이크", sub: "파우치형 (분말 제외)", emoji: "🧃", color: "#DDE9E2", href: "/shake", countKey: "shake" as const },
] as const;

const GUIDE_CARDS = [
  // 트렌드: 자연스러운 라이프스타일 — 건강한 음료를 즐기는 일상
  { category: "마켓 인사이트", title: "2026 프로틴 음료 트렌드", desc: "단백질 음료 시장 흐름과 신제품 분석", href: "/guides/market-insights/protein-drink-trend-2026", thumbImg: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=320&fit=crop&crop=center&auto=format", thumbBg: "linear-gradient(135deg, #B8DEC8 0%, #8FC4A8 100%)", thumbEmoji: "📈" },
  // 비교: 단백질 파우더 스쿱 — 성분·스펙 비교 이미지
  { category: "비교 가이드", title: "셀렉스 vs 하이뮨", desc: "고단백 음료 브랜드 스펙 직접 비교", href: "/guides/product-selection-comparison/selex-vs-himune", thumbImg: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=600&h=320&fit=crop&crop=center&auto=format", thumbBg: "linear-gradient(135deg, #EED4A8 0%, #DEB87E 100%)", thumbEmoji: "⚖️" },
  // 편의점: 냉장 음료 진열대 (한국 편의점 직접 사진은 /guide-thumbnails/convenience-store-kr.jpg 로 교체 권장)
  { category: "추천", title: "편의점 단백질 음료 BEST 8", desc: "편의점에서 살 수 있는 고단백 제품 정리", href: "/guides/product-selection-comparison/convenience-store-protein-guide", thumbImg: "/guide-thumbnails/convenience-store-kr.jpg", thumbBg: "linear-gradient(135deg, #A8CCC4 0%, #80B0A8 100%)", thumbEmoji: "🏪" },
  // 운동 전후: 헬스장 덤벨 — 운동 전후 보충 이미지
  { category: "섭취 전략", title: "운동 전후 단백질 섭취 가이드", desc: "시간대별 섭취 전략과 추천 제품", href: "/guides/intake-strategy-health/post-workout-protein", thumbImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=320&fit=crop&crop=center&auto=format", thumbBg: "linear-gradient(135deg, #C4D8CC 0%, #9CBCB0 100%)", thumbEmoji: "💪" },
  // 하루 필요량: 건강한 식단 접시 — 균형 영양 연상
  { category: "기본 지식", title: "하루 단백질 필요량", desc: "체중과 목적에 따른 단백질 권장량 계산", href: "/guides/basics/daily-requirement", thumbImg: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=320&fit=crop&crop=center&auto=format", thumbBg: "linear-gradient(135deg, #D8CDB8 0%, #C0AF98 100%)", thumbEmoji: "📚" },
  // 선택 가이드: 단백질 쉐이크 — 음료 선택 연상
  { category: "제품 선택", title: "단백질 음료 선택 가이드", desc: "성분 기준으로 내게 맞는 음료 고르는 법", href: "/guides/product-selection-comparison/protein-drink-guide", thumbImg: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&h=320&fit=crop&crop=center&auto=format", thumbBg: "linear-gradient(135deg, #C8DDD4 0%, #A0C4B8 100%)", thumbEmoji: "🎯" },
];

function toCarouselProduct(p: ProductDetailProps): CarouselProduct {
  return {
    slug: p.slug ?? "",
    name: p.name,
    brand: p.brand,
    capacity: p.capacity ?? "",
    variant: p.variant,
    tags: p.tags ?? [],
    proteinPerServing: p.proteinPerServing,
    sugar: p.sugar,
    calories: p.calories,
    density: p.density ?? "-",
    coupangUrl: p.coupangUrl,
    naverUrl: p.naverUrl,
    officialUrl: p.officialUrl,
    gradeTags: p.gradeTags ?? [],
    productType: (p.productType as CarouselProduct["productType"]) ?? undefined,
    yogurtType: p.yogurtType,
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

  return (
    <div className="min-h-screen" style={{ background: "#F3EFE6" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Header />

      {/* ─── 1. Hero (compact) ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-3 md:px-5 md:pt-4">
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1F5A3D 0%, #2A7A54 60%, #1B4F35 100%)",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(31,90,61,0.20)",
          }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 rounded-full opacity-10" style={{ width: 180, height: 180, background: "radial-gradient(circle, #A8D5B5 0%, transparent 70%)" }} />
          <div className="relative flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8 md:py-5">
            {/* Text */}
            <div>
              <div className="mb-1.5 inline-flex items-center rounded-full px-2.5 py-0.5" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.22)" }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.92)", fontWeight: 700 }}>🔬 단백질 제품 비교 플랫폼</span>
              </div>
              <h1 className="font-extrabold leading-tight text-white" style={{ fontSize: "clamp(18px, 3vw, 28px)", letterSpacing: "-0.03em" }}>
                내게 맞는 단백질 제품을 찾아보세요
              </h1>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.72)", marginTop: "4px" }}>
                단백질·당류·칼로리 기준으로 음료·바·요거트·쉐이크 비교
              </p>
            </div>
            {/* Right: stats + CTAs */}
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-3">
                {[
                  { value: `${categoryCounts.drink + categoryCounts.bar + categoryCounts.yogurt + categoryCounts.shake}종+`, label: "비교 제품" },
                  { value: "등급·랭킹", label: "시스템" },
                  { value: "목적별", label: "추천" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-extrabold text-white" style={{ fontSize: "13px" }}>{s.value}</p>
                    <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Link href="/drink" className="inline-flex items-center rounded-full px-4 text-[12px] font-bold text-[#1A5235]" style={{ background: "#FFFFFF", height: "34px" }}>
                  제품 비교하기 →
                </Link>
                <Link href="/recommend" className="inline-flex items-center rounded-full px-4 text-[12px] font-bold text-white" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.3)", height: "34px" }}>
                  추천 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. 카테고리 임팩트 카드 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-4 md:px-5 md:pt-5">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {([
            {
              label: "단백질 음료",
              sub: "RTD 프로틴 드링크",
              emoji: "🥤",
              href: "/drink",
              countKey: "drink" as const,
              bg: "linear-gradient(135deg, #1F5A3D 0%, #2E7D52 100%)",
              textColor: "#ffffff",
              subColor: "rgba(255,255,255,0.65)",
              countBg: "rgba(255,255,255,0.15)",
            },
            {
              label: "단백질 바",
              sub: "프로틴 바·간식",
              emoji: "🍫",
              href: "/bars",
              countKey: "bar" as const,
              bg: "linear-gradient(135deg, #7A4F2E 0%, #A0693E 100%)",
              textColor: "#ffffff",
              subColor: "rgba(255,255,255,0.65)",
              countBg: "rgba(255,255,255,0.15)",
            },
            {
              label: "단백질 요거트",
              sub: "그릭 요거트 포함",
              emoji: "🥛",
              href: "/yogurt",
              countKey: "yogurt" as const,
              bg: "linear-gradient(135deg, #3A5F7A 0%, #4E7D9C 100%)",
              textColor: "#ffffff",
              subColor: "rgba(255,255,255,0.65)",
              countBg: "rgba(255,255,255,0.15)",
            },
            {
              label: "단백질 쉐이크",
              sub: "파우치형 (분말 제외)",
              emoji: "🧃",
              href: "/shake",
              countKey: "shake" as const,
              bg: "linear-gradient(135deg, #4A3A6E 0%, #6550A0 100%)",
              textColor: "#ffffff",
              subColor: "rgba(255,255,255,0.65)",
              countBg: "rgba(255,255,255,0.15)",
            },
          ] as const).map((cat) => (
            <HomeTrackedLink
              key={cat.href}
              href={cat.href}
              eventName="home_category_click"
              eventParams={{ category: cat.countKey, destination_url: cat.href }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] md:p-5"
              style={{ background: cat.bg, minHeight: "130px" }}
            >
              {/* 배경 원형 장식 */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 rounded-full opacity-20"
                style={{ width: 90, height: 90, background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
              />
              {/* 이모지 */}
              <span style={{ fontSize: "36px", lineHeight: 1 }}>{cat.emoji}</span>
              {/* 하단 텍스트 */}
              <div>
                <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: cat.textColor, letterSpacing: "-0.02em" }}>
                  {cat.label}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <p style={{ fontSize: "11px", color: cat.subColor }}>{cat.sub}</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: cat.countBg, color: cat.textColor }}
                  >
                    {categoryCounts[cat.countKey]}종
                  </span>
                </div>
              </div>
            </HomeTrackedLink>
          ))}
        </div>
      </section>

      {/* ─── 4. 이번 주 인기 제품 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-5 md:px-5 md:pt-6">
        <HomePopularCarousel products={carouselProducts} />
      </section>

      {/* ─── 5. 가이드 & 인사이트 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-5 md:px-5 md:pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-extrabold" style={{ fontSize: "clamp(19px, 2.5vw, 24px)", color: "#1A2B1E", letterSpacing: "-0.02em" }}>
            가이드 & 인사이트
          </h2>
          <Link
            href="/guides"
            className="shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors hover:bg-[#E4EDEA]"
            style={{ borderColor: "#C2D4C8", color: "#1F5A3D", background: "#EBF3ED" }}
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3">
          {GUIDE_CARDS.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group block overflow-hidden rounded-[16px] border transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(31,90,61,0.18)]"
              style={{ borderColor: "#E4D9CC", boxShadow: "0 2px 8px rgba(60,45,30,0.07)" }}
            >
              <GuideThumbImage
                src={guide.thumbImg}
                alt={guide.title}
                title={guide.title}
                desc={guide.desc}
                fallbackBg={guide.thumbBg}
                fallbackEmoji={guide.thumbEmoji}
                category={guide.category}
              />
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
