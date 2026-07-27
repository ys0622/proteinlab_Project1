import type { Metadata } from "next";
import Link from "next/link";
import GuideThumbImage from "./components/GuideThumbImage";
import NewsletterBanner from "./components/NewsletterBanner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePopularCarousel, { type CarouselProduct } from "./components/HomePopularCarousel";
import HomeTrackedLink from "./components/HomeTrackedLink";
import type { ProductDetailProps } from "./data/products";
import { getProductsByCategoryAsync } from "./lib/productData";
import { getProductImageUrl } from "./lib/productImage";
import { hybridScore } from "./lib/productScoring";

export const revalidate = 300; // 5분마다 재생성 (조회수 반영)

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
    {
      "@type": "Organization",
      "@id": "https://proteinlab.kr/#organization",
      name: "ProteinLab",
      url: "https://proteinlab.kr",
      logo: { "@type": "ImageObject", url: "https://proteinlab.kr/proteinlab-logo.png", width: 81, height: 88 },
      description: "단백질 음료, 바, 요거트, 쉐이크를 성분 데이터로 비교·추천하는 프로틴랩 ProteinLab입니다.",
    },
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
  { label: "단백질 음료", sub: "RTD 프로틴 드링크", emoji: "🥤", color: "#D4EDDF", href: "/drinks", countKey: "drink" as const },
  { label: "단백질 바", sub: "프로틴 바·간식", emoji: "🍫", color: "#F5E6CE", href: "/bars", countKey: "bar" as const },
  { label: "단백질 요거트", sub: "그릭 요거트 포함", emoji: "🥛", color: "#F0EBE0", href: "/yogurt", countKey: "yogurt" as const },
  { label: "단백질 쉐이크", sub: "파우치형 (분말 제외)", emoji: "🧃", color: "#DDE9E2", href: "/shake", countKey: "shake" as const },
] as const;

const GUIDE_CARDS: {
  category: string;
  title: string;
  desc: string;
  href: string;
  thumbImg: string;
  thumbImg2?: string;
  thumbBg: string;
  thumbEmoji: string;
}[] = [
  // 트렌드: 프리워크아웃·크레아틴·프로틴 등 보충제 라인업 확장 — 시장 트렌드 연상
  { category: "마켓 인사이트", title: "2026 프로틴 음료 트렌드", desc: "단백질 음료 시장 흐름과 신제품 분석", href: "/guides/market-insights/protein-drink-trend-2026", thumbImg: "https://images.unsplash.com/photo-1693996045838-980674653385?w=600&h=400&fit=crop&crop=center&q=80", thumbBg: "linear-gradient(135deg, #1a6b5a 0%, #2d9e7f 100%)", thumbEmoji: "📈" },
  // 비교: 고단백 대표 제품(셀렉스 프로핏 스포츠 45g / 하이뮨 울트라 49g) 실물 사진
  { category: "비교 가이드", title: "셀렉스 vs 하이뮨", desc: "고단백 음료 브랜드 스펙 직접 비교", href: "/guides/product-selection-comparison/selex-vs-himune", thumbImg: "/rtd-drink-image/" + encodeURIComponent("매일유업 셀렉스 프로핏 스포츠 와일드 초코 45g 350ml.png"), thumbImg2: "/rtd-drink-image/hymune-ultra-400.png", thumbBg: "linear-gradient(135deg, #7a5c2e 0%, #b8843f 100%)", thumbEmoji: "⚖️" },
  // 편의점: 마트/편의점 진열대 — 실제 구매 맥락 연상
  { category: "추천", title: "편의점 단백질 음료 BEST 8", desc: "편의점에서 살 수 있는 고단백 제품 정리", href: "/guides/product-selection-comparison/convenience-store-protein-guide", thumbImg: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop&crop=center&q=80", thumbBg: "linear-gradient(135deg, #2a6070 0%, #3d8fa6 100%)", thumbEmoji: "🏪" },
  // 운동 전후: 운동 중 또는 직후 단백질 보충 장면
  { category: "섭취 전략", title: "운동 전후 단백질 섭취 가이드", desc: "시간대별 섭취 전략과 추천 제품", href: "/guides/intake-strategy-health/post-workout-protein", thumbImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=top&q=80", thumbBg: "linear-gradient(135deg, #2c4a2e 0%, #4a7a4e 100%)", thumbEmoji: "💪" },
  // 하루 필요량: 단백질 식품 구성 — 달걀·닭가슴살·견과류 등 고단백 식품
  { category: "기본 지식", title: "하루 단백질 필요량", desc: "체중과 목적에 따른 단백질 권장량 계산", href: "/guides/basics/daily-requirement", thumbImg: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&crop=center&q=80", thumbBg: "linear-gradient(135deg, #5a4a2e 0%, #8c7040 100%)", thumbEmoji: "📚" },
  // 선택 가이드: 웨이프로틴 통 + 쉐이커 + 스쿱 — 제품 선택 직관적으로 연상
  { category: "제품 선택", title: "단백질 음료 선택 가이드", desc: "성분 기준으로 내게 맞는 음료 고르는 법", href: "/guides/product-selection-comparison/protein-drink-guide", thumbImg: "https://images.unsplash.com/photo-1775199603318-7f8a9a63b40d?w=600&h=400&fit=crop&crop=center&q=80", thumbBg: "linear-gradient(135deg, #1e4a6e 0%, #2d6ea6 100%)", thumbEmoji: "🎯" },
];

const TEMP_HOME_FEATURED_DRINK_SLUGS = new Set([
  "newcare-all-protein-savory-245",
  "newcare-all-protein-choco-245",
  "newcare-all-protein-banana-245",
]);

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
    awards: p.awards,
  };
}

export default async function Home() {
  const [drinks, bars, yogurts, shakes, popularRes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
    // KV에서 실제 조회수 가져오기 (실패해도 빈 객체로 폴백)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "https://proteinlab.kr"}/api/popular`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(1500),
    }).then((r) => r.json()).catch(() => ({ views: {} })),
  ]);

  // views: { drink: {slug: count}, bar: {...}, ... }
  const views = (popularRes as { views: Record<string, Record<string, number>> }).views ?? {};

  const categoryCounts = { drink: drinks.length, bar: bars.length, yogurt: yogurts.length, shake: shakes.length };
  const totalCount = drinks.length + bars.length + yogurts.length + shakes.length;

  // 4개 카테고리 모두 하이브리드 점수 기준 정렬
  // = 실제 조회수 × 10 + 품질 점수(단백질 밀도·당류) + 신제품 보너스(30일 감쇠)
  const sortByHybrid = (products: ProductDetailProps[], type: string) => {
    const sorted = products
      .filter((p) => p.slug)
      .map((p) => ({ p, score: hybridScore(p, views[type]?.[p.slug ?? ""] ?? 0) }))
      .sort((a, b) => b.score - a.score)
      .map(({ p }) => p);

    if (type !== "drink") return sorted.slice(0, 10);

    const featured = sorted.filter((p) => TEMP_HOME_FEATURED_DRINK_SLUGS.has(p.slug ?? ""));
    const rest = sorted.filter((p) => !TEMP_HOME_FEATURED_DRINK_SLUGS.has(p.slug ?? ""));
    return [...featured, ...rest].slice(0, 10);
  };

  const topDrinks  = sortByHybrid(drinks,  "drink");
  const topBars    = sortByHybrid(bars,    "bar");
  const topYogurts = sortByHybrid(yogurts, "yogurt");
  const topShakes  = sortByHybrid(shakes,  "shake");

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

      {/* ─── 1. Hero (ultra-compact) ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-3 md:px-5 md:pt-4">
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1F5A3D 0%, #2A7A54 60%, #1B4F35 100%)",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(31,90,61,0.20)",
          }}
        >
          {/* 배경 장식 — 우상단 원 + 좌하단 원 */}
          <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 rounded-full opacity-[0.12]" style={{ width: 140, height: 140, background: "radial-gradient(circle, #A8D5B5 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -bottom-6 left-1/3 rounded-full opacity-[0.07]" style={{ width: 100, height: 100, background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />

          <div className="relative flex items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
            {/* 좌: 뱃지 + 텍스트 */}
            <div className="min-w-0">
              <div className="mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.85)", fontWeight: 700, letterSpacing: "0.02em" }}>🔬 단백질 비교 플랫폼</span>
              </div>
              <h1 className="font-extrabold leading-tight text-white" style={{ fontSize: "clamp(15px, 2.5vw, 22px)", letterSpacing: "-0.02em" }}>
                내게 맞는 단백질 제품 찾기
              </h1>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.60)", marginTop: "3px" }}>
                {totalCount}종 · 단백질·당류·칼로리 기준 비교
              </p>
            </div>
            {/* 우: CTA 버튼 */}
            <div className="flex shrink-0 flex-col gap-1.5 md:flex-row">
              <Link href="/drinks" className="inline-flex items-center justify-center rounded-full px-4 text-[12px] font-bold text-[#1A5235]" style={{ background: "#FFFFFF", height: "32px" }}>
                비교하기 →
              </Link>
              <Link href="/recommend" className="hidden items-center justify-center rounded-full px-4 text-[12px] font-bold text-white md:inline-flex" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", height: "32px" }}>
                추천 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. 카테고리 임팩트 카드 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-3 md:px-5 md:pt-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {([
            {
              label: "단백질 음료",
              sub: "RTD 프로틴 드링크",
              emoji: "🥤",
              href: "/drinks",
              countKey: "drink" as const,
              bg: "linear-gradient(135deg, #0D6E8A 0%, #1A90B0 100%)",
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
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-[16px] px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] md:px-4 md:py-3"
              style={{ background: cat.bg }}
            >
              {/* 배경 원형 장식 */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-3 rounded-full opacity-20"
                style={{ width: 60, height: 60, background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
              />
              {/* 이모지 */}
              <span style={{ fontSize: "24px", lineHeight: 1, flexShrink: 0 }}>{cat.emoji}</span>
              {/* 텍스트 */}
              <div className="min-w-0 flex-1">
                <p className="truncate font-extrabold leading-tight" style={{ fontSize: "13px", color: cat.textColor, letterSpacing: "-0.01em" }}>
                  {cat.label}
                </p>
                <p className="truncate" style={{ fontSize: "10px", color: cat.subColor, marginTop: "1px" }}>
                  {cat.sub} · {categoryCounts[cat.countKey]}종
                </p>
              </div>
            </HomeTrackedLink>
          ))}
        </div>
      </section>

      {/* ─── 4. 이번 주 인기 제품 ─── */}
      <section className="mx-auto max-w-[1180px] px-4 pt-3 md:px-5 md:pt-5">
        <HomePopularCarousel products={carouselProducts} />
        <div className="mt-2 flex justify-end">
          <Link href="/trending" className="text-[12px] font-semibold text-[#1F5A3D] hover:underline">
            카테고리별 실시간 인기 순위 전체 보기 →
          </Link>
        </div>
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
                secondSrc={guide.thumbImg2}
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

      <section className="mx-auto max-w-[1200px] px-4 pb-8 md:px-6">
        <NewsletterBanner />
      </section>

      <Footer />
    </div>
  );
}
