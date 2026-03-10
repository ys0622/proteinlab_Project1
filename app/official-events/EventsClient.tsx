"use client";

import { useMemo, useState } from "react";

type ProductType = "drink" | "bar";
type EventCategory = "할인" | "쿠폰" | "증정" | "무료배송";
type FilterType = "전체" | EventCategory;

interface BrandEvent {
  category: EventCategory;
  periodLabel: string;
  description: string;
}

interface BrandCard {
  brand: string;
  storeType: string;
  storeUrl: string;
  note: string;
  productCount: number;
  events: BrandEvent[];
}

interface ProductSummary {
  totalProducts: number;
  coveredBrands: number;
  focusMetric: string;
}

const CATEGORY_EMOJI: Record<EventCategory, string> = {
  할인: "🔖",
  쿠폰: "🎟",
  증정: "🎁",
  무료배송: "🚚",
};

const CATEGORY_COLOR: Record<EventCategory, { bg: string; text: string; border: string }> = {
  할인: { bg: "#fdf8f0", text: "#956b2f", border: "#e8d5b8" },
  쿠폰: { bg: "#eef3f0", text: "#3a6b4a", border: "#c4d8cc" },
  증정: { bg: "#f4f0f3", text: "#7a5270", border: "#d9cdd6" },
  무료배송: { bg: "#eff2f6", text: "#4a6178", border: "#cdd6df" },
};

const FILTER_TABS: { key: FilterType; emoji: string }[] = [
  { key: "전체", emoji: "" },
  { key: "할인", emoji: "🔖" },
  { key: "쿠폰", emoji: "🎟" },
  { key: "증정", emoji: "🎁" },
  { key: "무료배송", emoji: "🚚" },
];

const DRINK_SUMMARY: ProductSummary = {
  totalProducts: 101,
  coveredBrands: 18,
  focusMetric: "20g 이상 고단백 음료 82개 반영",
};

const BAR_SUMMARY: ProductSummary = {
  totalProducts: 69,
  coveredBrands: 24,
  focusMetric: "15g 이상 단백질 바 34개 반영",
};

const drinkBrands: BrandCard[] = [
  {
    brand: "하이뮨",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    note: "현재 등록 제품 15개",
    productCount: 15,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "회원 등급별 상시 할인과 정기배송 추가 적립이 자주 붙는 편입니다." },
      { category: "증정", periodLabel: "수시 진행", description: "세트 구성 구매 시 보틀·전용 굿즈 증정형 이벤트가 반복적으로 열립니다." },
    ],
  },
  {
    brand: "더단백",
    storeType: "네이버 스토어",
    storeUrl: "https://smartstore.naver.com/bingtft",
    note: "현재 등록 제품 12개",
    productCount: 12,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "묶음 구성 특가와 맛별 세트 할인이 자주 열려 체감가 변동이 큽니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "스마트스토어 쿠폰이 붙는 경우가 많아 장바구니 최종가를 꼭 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "셀렉스",
    storeType: "자사몰",
    storeUrl: "https://www.selexmall.com/",
    note: "현재 등록 제품 10개",
    productCount: 10,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "브랜드전, 정기배송, 대용량 묶음 할인 폭이 큰 편이라 공식몰 비교 가치가 높습니다." },
      { category: "증정", periodLabel: "수시 진행", description: "베스트 상품 구매 시 샘플팩이나 사은품을 묶어주는 패턴이 반복됩니다." },
    ],
  },
  {
    brand: "테이크핏",
    storeType: "자사몰",
    storeUrl: "https://mshopping.namyangi.com/item/list/1002",
    note: "현재 등록 제품 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "남양몰 기획전으로 대량 구매 가격이 자주 내려갑니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "세트 단위로 담으면 배송비 조건을 넘기기 쉬운 편입니다." },
    ],
  },
  {
    brand: "뉴케어",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "대상웰라이프 공식몰에서 기획전과 타임특가가 자주 묶입니다." },
      { category: "무료배송", periodLabel: "회원 혜택", description: "회원 전용 무료배송 또는 배송비 완화 혜택이 함께 붙는 경우가 있습니다." },
    ],
  },
  {
    brand: "마이밀",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "쿠폰", periodLabel: "회원 혜택", description: "대상웰라이프 멤버십 쿠폰 체계가 있어 신규·재구매 조건을 함께 보는 편이 좋습니다." },
      { category: "할인", periodLabel: "상시 체크", description: "48팩 이상 대용량 구성 특가가 자주 열려 단가 차이가 큽니다." },
    ],
  },
  {
    brand: "얼티브",
    storeType: "CJ더마켓",
    storeUrl: "https://www.cjthemarket.com/",
    note: "현재 등록 제품 6개",
    productCount: 6,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "비건 라인업 중심 기획전이 반복돼 단품보다 묶음 가격 메리트가 큽니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "CJ더마켓 장바구니 쿠폰과 중복되는지 확인하면 체감가가 더 내려갑니다." },
    ],
  },
  {
    brand: "랩노쉬",
    storeType: "자사몰",
    storeUrl: "https://labnosh.com/",
    note: "현재 등록 제품 6개",
    productCount: 6,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "재고 소진형 세일과 세트 특가 빈도가 높아 시점별 가격 차이가 큰 브랜드입니다." },
      { category: "쿠폰", periodLabel: "회원 혜택", description: "신규 회원 쿠폰팩과 앱 전용 혜택이 붙는지 같이 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "닥터유",
    storeType: "자사몰",
    storeUrl: "https://dryoumall.com/",
    note: "현재 등록 제품 5개",
    productCount: 5,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "드링크와 바를 함께 묶는 세트 구성이 많아 교차 구매 시 장점이 있습니다." },
      { category: "쿠폰", periodLabel: "회원 혜택", description: "첫 구매나 회원 전용 쿠폰을 적용하면 체감가가 달라집니다." },
    ],
  },
  {
    brand: "칼로바이",
    storeType: "자사몰",
    storeUrl: "https://www.calobye.shop/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "프로틴 드링크와 쉐이크 라인 기획전이 자주 열려 공식몰 확인 가치가 높습니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "일정 금액 이상 무료배송 기준이 비교적 명확한 편입니다." },
    ],
  },
];

const barBrands: BrandCard[] = [
  {
    brand: "퀘스트 뉴트리션",
    storeType: "공식 판매처 중심",
    storeUrl: "https://www.coupang.com/",
    note: "현재 등록 제품 12개",
    productCount: 12,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "맛별 가격 차이가 큰 편이라 쿠팡 로켓배송과 공식 수입 판매처를 함께 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: "로켓배송 기준", description: "묶음 구성과 로켓배송 여부에 따라 실구매가 차이가 크게 납니다." },
    ],
  },
  {
    brand: "베노프",
    storeType: "자사몰",
    storeUrl: "https://benof.co.kr/",
    note: "현재 등록 제품 10개",
    productCount: 10,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "소프트바와 프로틴바 세트 가격이 단품 대비 유리한 경우가 많습니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "브랜드 자체 프로모션과 스마트스토어 쿠폰 여부를 같이 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "닥터유",
    storeType: "자사몰",
    storeUrl: "https://dryoumall.com/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "프로 바, 바이트, 너츠 라인별로 묶음 특가가 따로 열리는 편입니다." },
      { category: "증정", periodLabel: "수시 진행", description: "드링크와 동시 구매 시 증정형 기획전이 붙는지 함께 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "프로틴방앗간",
    storeType: "공식몰",
    storeUrl: "https://proteinbangatgan.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "한정 맛이나 시즌 구성은 공식몰 할인 반영이 빠른 편입니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "신규 회원 쿠폰과 세트 할인 중 어떤 쪽이 유리한지 비교가 필요합니다." },
    ],
  },
  {
    brand: "켈로그",
    storeType: "공식 판매처 중심",
    storeUrl: "https://www.coupang.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "묶음팩 할인과 대형몰 기획전 빈도가 높아 가격 변동이 잦습니다." },
      { category: "무료배송", periodLabel: "판매처별 상이", description: "대형 유통몰 기준 배송비 조건이 달라 최종가 비교가 중요합니다." },
    ],
  },
  {
    brand: "비에스엔",
    storeType: "공식 판매처 중심",
    storeUrl: "https://www.coupang.com/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "해외 브랜드 특성상 입고 시점에 따라 가격 변동 폭이 큰 편입니다." },
      { category: "무료배송", periodLabel: "판매처별 상이", description: "로켓배송 여부와 병행수입 여부를 함께 확인하는 편이 안전합니다." },
    ],
  },
  {
    brand: "더단백",
    storeType: "네이버 스토어",
    storeUrl: "https://smartstore.naver.com/bingtft",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "크런치바와 마일드바 묶음 기획이 자주 열려 단가 차이가 납니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "네이버 스토어 쿠폰을 적용하면 공식몰 대비 체감가가 더 내려가는 경우가 있습니다." },
    ],
  },
  {
    brand: "마이프로틴",
    storeType: "자사몰",
    storeUrl: "https://www.myprotein.co.kr/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "할인 코드 중심 브랜드라 표기 할인율보다 실결제 할인 코드를 먼저 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "무료배송 기준 금액과 할인코드 중복 여부를 같이 확인해야 합니다." },
    ],
  },
  {
    brand: "칼로바이",
    storeType: "자사몰",
    storeUrl: "https://www.calobye.shop/",
    note: "현재 등록 제품 1개",
    productCount: 1,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "프로틴바 단품보다 다른 간식류와 묶는 행사 구성이 자주 나옵니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "장바구니 합산 금액으로 배송비를 넘기기 쉬운 편입니다." },
    ],
  },
  {
    brand: "롯데웰푸드",
    storeType: "자사몰",
    storeUrl: "https://www.lottefoodmall.com/",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "이지프로틴 라인은 롯데 계열몰 기획전 반영이 빠른 편입니다." },
      { category: "증정", periodLabel: "수시 진행", description: "세트 구매 사은 구성은 시즌별 변동이 있어 직접 확인이 필요합니다." },
    ],
  },
];

function getCounts(brands: BrandCard[]) {
  const allEvents = brands.flatMap((brand) => brand.events);
  return {
    total: allEvents.length,
    할인: allEvents.filter((event) => event.category === "할인").length,
    쿠폰: allEvents.filter((event) => event.category === "쿠폰").length,
    증정: allEvents.filter((event) => event.category === "증정").length,
    무료배송: allEvents.filter((event) => event.category === "무료배송").length,
  };
}

function getSummary(type: ProductType) {
  return type === "drink" ? DRINK_SUMMARY : BAR_SUMMARY;
}

export default function EventsClient() {
  const [productType, setProductType] = useState<ProductType>("drink");
  const [activeFilter, setActiveFilter] = useState<FilterType>("전체");

  const brands = productType === "drink" ? drinkBrands : barBrands;
  const summary = getSummary(productType);
  const counts = useMemo(() => getCounts(brands), [brands]);

  const filteredBrands = useMemo(() => {
    if (activeFilter === "전체") return brands;
    return brands
      .map((brand) => ({
        ...brand,
        events: brand.events.filter((event) => event.category === activeFilter),
      }))
      .filter((brand) => brand.events.length > 0);
  }, [activeFilter, brands]);

  const getCount = (key: FilterType) => (key === "전체" ? counts.total : counts[key as EventCategory]);

  return (
    <>
      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)]">UPDATED 2026.03</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            브랜드 이벤트 &amp; 혜택
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            제품 수가 크게 늘어난 현재 데이터 기준으로 페이지를 다시 정리했습니다. 오래된 날짜형 딜 나열보다,
            공식몰과 주요 판매처에서 실제로 체크할 만한 할인·쿠폰·증정·무료배송 포인트를 브랜드별로 빠르게 볼 수 있게 구성했습니다.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard label="전체 등록 제품" value="170개" detail="단백질음료 101개 + 단백질바 69개" />
            <SummaryCard label="음료 커버리지" value={`${DRINK_SUMMARY.coveredBrands}개 브랜드`} detail={DRINK_SUMMARY.focusMetric} />
            <SummaryCard label="바 커버리지" value={`${BAR_SUMMARY.coveredBrands}개 브랜드`} detail={BAR_SUMMARY.focusMetric} />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="flex gap-2 pt-5">
          {(["drink", "bar"] as const).map((type) => {
            const active = productType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setProductType(type);
                  setActiveFilter("전체");
                }}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={{
                  background: active ? "var(--accent)" : "#fff",
                  color: active ? "#fff" : "#6b6b6b",
                  border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
                }}
              >
                {type === "drink" ? "단백질음료" : "단백질바"}
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-[#ebe7e2] bg-[#fffdf9] px-4 py-4 sm:px-5">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {productType === "drink" ? "음료 기준 최신 반영" : "바 기준 최신 반영"}
          </p>
          <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
            현재 {summary.totalProducts}개 제품, {summary.coveredBrands}개 브랜드를 기준으로 정리했습니다.
            {" "}{summary.focusMetric}. 세일 기간은 자주 바뀌기 때문에, 페이지에서는 브랜드별로 실구매 전에 확인할 포인트를 우선 보여줍니다.
          </p>
        </div>

        <div className="mt-4 flex gap-5 overflow-x-auto border-b border-[#e8e6e3]">
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className="relative shrink-0 pb-3 text-sm font-semibold transition-colors"
                style={{ color: active ? "var(--accent)" : "#999" }}
              >
                {tab.emoji ? `${tab.emoji} ${tab.key}` : tab.key}
                <span className="ml-1 text-xs font-normal">{getCount(tab.key)}</span>
                {active ? (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--accent)" }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBrands.map((brand) => (
            <BrandEventCard key={brand.brand} brand={brand} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs leading-5 text-[#8b8b8b]">
          이벤트와 배송 조건은 판매처 정책에 따라 수시로 바뀝니다. 최종 결제 전에는 브랜드 공식몰, 네이버 스토어,
          쿠팡 로켓배송 페이지에서 실시간 가격과 혜택을 다시 확인하는 것을 권장합니다.
        </p>
      </main>
    </>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-[#ebe7e2] bg-white px-4 py-4">
      <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{value}</p>
      <p className="mt-1 text-sm leading-5 text-[var(--foreground-muted)]">{detail}</p>
    </div>
  );
}

function BrandEventCard({ brand }: { brand: BrandCard }) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8]"
      style={{ overflow: "hidden" }}
    >
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-[#f0eeeb] px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)]">{brand.brand}</h2>
            <p className="mt-1 text-xs text-[#8f8a84]">{brand.note}</p>
          </div>
          <span
            className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium"
            style={{ background: "#f3f0eb", color: "#6b6b6b" }}
          >
            {brand.storeType}
          </span>
        </div>

        <div className="px-5 pt-4">
          <div className="rounded-xl border border-[#efe8df] bg-[#fffaf1] px-3 py-3">
            <p className="text-xs font-semibold text-[#8c6b3d]">체크 포인트</p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
              현재 ProteinLab 등록 제품 기준 {brand.productCount}개 제품이 연결돼 있습니다.
            </p>
          </div>
        </div>

        <ul className="space-y-3 px-5 pb-2 pt-4">
          {brand.events.map((event) => {
            const color = CATEGORY_COLOR[event.category];
            return (
              <li key={`${brand.brand}-${event.category}-${event.description}`} className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: color.bg,
                      color: color.text,
                      border: `1px solid ${color.border}`,
                    }}
                  >
                    {CATEGORY_EMOJI[event.category]} {event.category}
                  </span>
                  <span className="text-[11px] text-[#999]">확인 시점: {event.periodLabel}</span>
                </div>
                <p className="text-[13px] leading-6 text-[var(--foreground)]">{event.description}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-5 pb-5 pt-3">
        <a
          href={brand.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg border border-[#e8e6e3] bg-white py-2.5 text-xs font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
        >
          {brand.storeType === "네이버 스토어" ? "네이버 스토어 방문" : "판매처 방문"} →
        </a>
      </div>
    </div>
  );
}
