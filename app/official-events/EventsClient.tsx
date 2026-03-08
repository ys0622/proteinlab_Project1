"use client";

import { useState, useMemo } from "react";

type EventCategory = "할인" | "쿠폰" | "증정" | "무료배송";

interface BrandEvent {
  category: EventCategory;
  periodType: "dated" | "always";
  period: string;
  description: string;
}

interface BrandCard {
  brand: string;
  storeType: string;
  storeUrl: string;
  events: BrandEvent[];
}

const drinkBrands: BrandCard[] = [
  {
    brand: "더단백",
    storeType: "네이버 스토어",
    storeUrl: "https://smartstore.naver.com/bingtft",
    events: [
      { category: "할인", periodType: "dated", period: "기간 미정", description: "빙그레 공식 스마트스토어 — 더단백 프로틴 드링크 전품목 특가" },
    ],
  },
  {
    brand: "랩노쉬",
    storeType: "자사몰",
    storeUrl: "https://labnosh.com/",
    events: [
      { category: "할인", periodType: "dated", period: "기간 한정", description: "막장 세일 전품목 최대 80% 할인 — 프로틴 드링크 12개입 19,900원" },
      { category: "쿠폰", periodType: "always", period: "상시", description: "신규 회원 가입 시 총 10,000원 쿠폰팩 즉시 지급" },
    ],
  },
  {
    brand: "마이밀",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    events: [
      { category: "쿠폰", periodType: "always", period: "상시", description: "공식몰 W멤버십 회원 전용 최대 4만원 상당 혜택" },
      { category: "할인", periodType: "dated", period: "기간 한정", description: "마시는 뉴프로틴 바나나 48팩 46% 할인 (105,000원 → 55,900원)" },
    ],
  },
  {
    brand: "뉴케어",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    events: [
      { category: "할인", periodType: "dated", period: "기간 한정", description: "대상웰라이프 공식몰 타임특가 — 뉴케어 올프로틴 전 상품 특가" },
      { category: "무료배송", periodType: "always", period: "상시", description: "W멤버십 가입 시 뉴케어 전 상품 무료배송 혜택" },
    ],
  },
  {
    brand: "셀렉스",
    storeType: "자사몰",
    storeUrl: "https://www.selexmall.com/",
    events: [
      { category: "할인", periodType: "dated", period: "~2026-03-31", description: "셀렉스 베스트 제품 최대 67% 할인 특가전" },
      { category: "할인", periodType: "dated", period: "기간 미정", description: "페이백 이벤트 — 구매 금액 일부 적립금으로 환급" },
      { category: "증정", periodType: "dated", period: "선착순 소진 시 종료", description: "정기배송 신청 시 추가 할인 + 선착순 요가매트 증정" },
    ],
  },
  {
    brand: "얼티브",
    storeType: "자사몰",
    storeUrl: "https://www.cjthemarket.com/",
    events: [
      { category: "할인", periodType: "dated", period: "기간 한정", description: "CJ더마켓 얼티브 기획전 — 비건 프로틴 음료 특가" },
    ],
  },
  {
    brand: "오늘단백",
    storeType: "자사몰",
    storeUrl: "https://harimmall.com/",
    events: [
      { category: "쿠폰", periodType: "always", period: "상시", description: "하림몰 앱 전용 쿠폰 다운로드 — 오늘단백 전 제품 적용" },
    ],
  },
  {
    brand: "칼로바이",
    storeType: "자사몰",
    storeUrl: "https://www.calobye.shop/",
    events: [
      { category: "할인", periodType: "dated", period: "기간 한정", description: "타임세일 — 퍼펙트 파워쉐이크 등 전품목 최대 80% 할인" },
      { category: "무료배송", periodType: "always", period: "상시", description: "25,000원 이상 구매 시 무료배송" },
    ],
  },
  {
    brand: "테이크핏",
    storeType: "자사몰",
    storeUrl: "https://mshopping.namyangi.com/item/list/1002",
    events: [
      { category: "할인", periodType: "dated", period: "기간 미정", description: "테이크핏 맥스 프로틴 드링크 최대 59% 할인 프로모션" },
    ],
  },
  {
    brand: "닥터유",
    storeType: "자사몰",
    storeUrl: "https://dryoumall.com/",
    events: [
      { category: "할인", periodType: "always", period: "상시", description: "365일 최저가 보장 정기배송 — 닥터유PRO 단백질 드링크·바" },
      { category: "쿠폰", periodType: "always", period: "상시", description: "신규 회원 가입 이벤트 — 첫 구매 할인 쿠폰 즉시 지급" },
    ],
  },
  {
    brand: "파스퇴르",
    storeType: "자사몰",
    storeUrl: "https://www.lottefoodmall.com/?act=main.pasteur",
    events: [
      { category: "할인", periodType: "dated", period: "~2026-03-31", description: "이지프로틴 온 가족 단백질 기획전 — 최대 48% 할인" },
    ],
  },
  {
    brand: "하이뮨",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    events: [
      { category: "증정", periodType: "dated", period: "선착순 소진 시 종료", description: "프로틴 밸런스 구매 시 전용 보틀 1병 + 전용 스푼 증정" },
      { category: "할인", periodType: "always", period: "상시", description: "프레스티지 회원 최대 30% 할인 + 정기배송 VIP 5% 적립" },
    ],
  },
];

const categoryEmoji: Record<EventCategory, string> = {
  할인: "🔖",
  쿠폰: "🎟",
  증정: "🎁",
  무료배송: "🚚",
};

const categoryColor: Record<EventCategory, { bg: string; text: string; border: string }> = {
  할인: { bg: "#fdf8f0", text: "#956b2f", border: "#e8d5b8" },
  쿠폰: { bg: "#eef3f0", text: "#3a6b4a", border: "#c4d8cc" },
  증정: { bg: "#f4f0f3", text: "#7a5270", border: "#d9cdd6" },
  무료배송: { bg: "#eff2f6", text: "#4a6178", border: "#cdd6df" },
};

function getCounts(brands: BrandCard[]) {
  const all = brands.flatMap((b) => b.events);
  return {
    total: all.length,
    할인: all.filter((e) => e.category === "할인").length,
    쿠폰: all.filter((e) => e.category === "쿠폰").length,
    증정: all.filter((e) => e.category === "증정").length,
    무료배송: all.filter((e) => e.category === "무료배송").length,
  };
}

type FilterType = "전체" | EventCategory;

const FILTER_TABS: { key: FilterType; emoji: string }[] = [
  { key: "전체", emoji: "" },
  { key: "할인", emoji: "🔖" },
  { key: "쿠폰", emoji: "🎟" },
  { key: "증정", emoji: "🎁" },
  { key: "무료배송", emoji: "🚚" },
];

export default function EventsClient() {
  const [productType, setProductType] = useState<"drink" | "bar">("drink");
  const [activeFilter, setActiveFilter] = useState<FilterType>("전체");

  const brands = productType === "drink" ? drinkBrands : [];
  const counts = useMemo(() => getCounts(brands), [brands]);

  const filteredBrands = useMemo(() => {
    if (activeFilter === "전체") return brands;
    return brands
      .map((b) => ({ ...b, events: b.events.filter((e) => e.category === activeFilter) }))
      .filter((b) => b.events.length > 0);
  }, [brands, activeFilter]);

  const getCount = (key: FilterType) => (key === "전체" ? counts.total : counts[key as EventCategory]);

  return (
    <>
      {/* Hero — compact, matching other pages */}
      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl" style={{ fontWeight: 700 }}>
            브랜드 이벤트 &amp; 혜택
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            단백질음료 브랜드의 자사몰·공식 스토어 혜택을 모았습니다. 정기배송·회원가입 혜택까지 — 직접 구매 전 여기서 먼저 확인하세요.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        {/* Product type toggle */}
        <div className="flex gap-2 pt-5">
          {(["drink", "bar"] as const).map((type) => {
            const active = productType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => { setProductType(type); setActiveFilter("전체"); }}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  background: active ? "var(--accent)" : "white",
                  color: active ? "white" : "#6b6b6b",
                  border: active ? "none" : "1px solid var(--border)",
                }}
              >
                {type === "drink" ? "단백질음료" : "단백질바"}
              </button>
            );
          })}
        </div>

        {/* Summary stats */}
        <p className="mt-3 text-xs" style={{ color: "#999" }}>
          {counts.total > 0
            ? `${brands.length}개 브랜드 · ${counts.total}개 혜택 · 직접 확인 후 구매 권장`
            : "준비 중"}
        </p>

        {/* Underline tab filters */}
        <div className="mt-4 flex gap-5 border-b border-[#e8e6e3]">
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.key;
            const count = getCount(tab.key);
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className="relative pb-3 text-sm font-semibold transition-colors"
                style={{ color: active ? "var(--accent)" : "#999" }}
              >
                {tab.emoji ? `${tab.emoji} ${tab.key}` : tab.key}
                <span className="ml-1 text-xs font-normal">{count}</span>
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--accent)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Brand event cards */}
        {filteredBrands.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map((brand) => (
              <BrandEventCard key={brand.brand} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-sm text-[var(--foreground-muted)]">
              {productType === "bar" ? "단백질 바 브랜드 혜택은 준비 중입니다." : "해당 카테고리의 혜택이 없습니다."}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-10 text-center text-xs" style={{ color: "#999" }}>
          이벤트 정보는 브랜드 공식 채널 기준이며, 실제 혜택은 변경될 수 있습니다. 구매 전 직접 확인해 주세요.
        </p>
      </main>
    </>
  );
}

function BrandEventCard({ brand }: { brand: BrandCard }) {
  return (
    <div
      className="flex flex-col justify-between"
      style={{
        border: "1px solid #e8e6e3",
        borderRadius: "16px",
        background: "#FFFDF8",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div>
        <div
          className="flex items-center justify-between px-5 pt-5 pb-3"
          style={{ borderBottom: "1px solid #f0eeeb" }}
        >
          <h2 className="text-base font-bold text-[var(--foreground)]">{brand.brand}</h2>
          <span
            className="rounded-md px-2 py-0.5 text-[11px] font-medium"
            style={{ background: "#f3f0eb", color: "#6b6b6b" }}
          >
            {brand.storeType}
          </span>
        </div>

        {/* Events */}
        <ul className="space-y-3 px-5 pt-4 pb-2">
          {brand.events.map((event, idx) => {
            const color = categoryColor[event.category];
            return (
              <li key={idx} className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                  >
                    {categoryEmoji[event.category]} {event.category}
                  </span>
                  <span className="text-[11px]" style={{ color: "#999" }}>
                    {event.periodType === "always" ? "🔄" : "📅"} {event.period}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--foreground)]">{event.description}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Store link */}
      <div className="px-5 pb-5 pt-2">
        <a
          href={brand.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold transition-colors hover:bg-gray-50"
          style={{ border: "1px solid #e8e6e3", background: "#fff", color: "#374151" }}
        >
          {brand.storeType === "네이버 스토어" ? "네이버 스토어 방문" : "자사몰 방문"} →
        </a>
      </div>
    </div>
  );
}
