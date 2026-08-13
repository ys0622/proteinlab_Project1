"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AffiliateDisclosure from "@/app/components/AffiliateDisclosure";
import CategoryTabs from "@/app/components/CategoryTabs";
import CommercialAdSection from "@/app/components/CommercialAdSection";
import ScoredProductCard from "@/app/components/ScoredProductCard";
import TrackedLink from "@/app/components/TrackedLink";
import { recommendComplete, recommendStart } from "@/lib/analytics";
import type { ProductCardProps } from "@/app/data/productTypes";
import {
  getCategoryDescription,
  getCategoryHref,
  getCategoryLabel,
  type ProductCategory,
} from "@/app/lib/categories";

type ProductType = ProductCategory;
type Step = 0 | 1 | 2 | 3 | "loading" | "result";

interface QuizAnswers {
  purpose: string;
  priority: "protein" | "low_sugar" | "low_calorie" | "density" | "";
  conditions: string[];
}

interface RecommendedProduct {
  rank: number;
  score: number;
  id: string;
  brand: string;
  name: string;
  flavor: string | null;
  volume: string;
  protein: number;
  calories: number;
  sugar: number;
  density: string;
  gradeValue: Record<string, string>;
  reason: string;
  detailPath: string;
  imageUrl: string | null;
  coupangUrl?: string | null;
  naverUrl?: string | null;
  officialUrl?: string | null;
}

interface RecommendResult {
  products: RecommendedProduct[];
  profileChips: string[];
  tips: { icon: string; title: string; desc: string }[];
}

interface QuickLinkItem {
  href: string;
  title: string;
  desc: string;
}

interface ConditionOption {
  icon: string;
  label: string;
  desc: string;
  value: string;
}

interface RecommendClientProps {
  categoryCounts: Record<ProductType, number>;
}

const PURPOSE_OPTIONS = [
  { icon: "💪", label: "근육 증가·운동 보충", desc: "운동 후 단백질 보충이 우선", value: "muscle" },
  { icon: "⚖️", label: "다이어트·체중 관리", desc: "칼로리와 당류 부담을 고려", value: "diet" },
  { icon: "🥤", label: "일상 간편 보충", desc: "바쁜 일상에서 간편하게 섭취", value: "daily" },
  { icon: "🏃", label: "회복·컨디션 관리", desc: "운동 후 회복과 퍼포먼스 중심", value: "recovery" },
];

const PRIORITY_OPTIONS = [
  { icon: "💪", label: "단백질 함량", desc: "한 번에 보충하는 단백질을 우선", value: "protein" },
  { icon: "🍬", label: "당류 부담", desc: "당류가 낮은 제품을 우선", value: "low_sugar" },
  { icon: "🥗", label: "칼로리 부담", desc: "칼로리가 낮은 제품을 우선", value: "low_calorie" },
  { icon: "📈", label: "단백질 밀도", desc: "칼로리 대비 단백질 효율을 우선", value: "density" },
] as const;

const CONDITION_OPTIONS_BY_CATEGORY: Record<ProductType, ConditionOption[]> = {
  drink: [
    { icon: "🥗", label: "저칼로리", desc: "150kcal 이하 선호", value: "lowcal" },
    { icon: "💪", label: "고단백", desc: "20g 이상 선호", value: "highpro" },
    { icon: "🌿", label: "식물성", desc: "식물성 단백질 원료 선호", value: "vegan" },
    { icon: "😋", label: "맛 우선", desc: "기호성과 만족감 중시", value: "taste" },
    { icon: "📈", label: "단백질 밀도", desc: "칼로리 대비 단백질 효율 중시", value: "density" },
    { icon: "🍬", label: "저당", desc: "당류 2g 이하 선호", value: "lowsugar" },
  ],
  bar: [
    { icon: "💪", label: "고단백", desc: "12g 이상 선호", value: "highpro" },
    { icon: "🍽️", label: "식사 보완", desc: "포만감 있는 제품 선호", value: "meal" },
    { icon: "🌿", label: "식물성", desc: "식물성 단백질 원료 선호", value: "vegan" },
    { icon: "😋", label: "맛 우선", desc: "식감과 만족감 중시", value: "taste" },
    { icon: "📈", label: "단백질 밀도", desc: "단백질 효율 우선", value: "density" },
    { icon: "🍬", label: "저당", desc: "당류 5g 이하 선호", value: "lowsugar" },
  ],
  yogurt: [
    { icon: "💪", label: "고단백", desc: "10g 이상 선호", value: "highpro" },
    { icon: "🥣", label: "그릭", desc: "꾸덕한 그릭 계열 선호", value: "greek" },
    { icon: "🥛", label: "드링크형", desc: "마시기 쉬운 타입 선호", value: "drinking" },
    { icon: "📦", label: "대용량", desc: "400g 이상 제품 선호", value: "bulk" },
    { icon: "📈", label: "단백질 밀도", desc: "칼로리 대비 단백질 효율 중시", value: "density" },
    { icon: "🍬", label: "저당", desc: "당류 5g 이하 선호", value: "lowsugar" },
  ],
  shake: [
    { icon: "💪", label: "운동 보충", desc: "단백질 20g 이상 제품 위주로 보고 싶어요", value: "highpro" },
    { icon: "🍬", label: "저당", desc: "당류 3g 이하 제품부터 추리고 싶어요", value: "lowsugar" },
    { icon: "🍽️", label: "식사대용", desc: "한 끼 대체용으로 보고 싶어요", value: "meal" },
    { icon: "🌾", label: "식이섬유", desc: "식이섬유 5g 이상 제품을 우선 보고 싶어요", value: "fiber" },
    { icon: "📈", label: "단백질 밀도", desc: "칼로리 대비 단백질 효율이 높은 제품이 좋아요", value: "density" },
  ],
};

const LOADING_STEPS = [
  "목적과 운동 패턴 분석",
  "제품군별 조건 정리",
  "영양 성분 우선순위 계산",
  "최종 추천 후보 정리",
];

const gradeLabels: Record<string, string> = {
  price: "가성비",
  diet: "다이어트",
  performance: "퍼포먼스",
};

function toRecommendationCardProduct(
  product: RecommendedProduct,
  category: ProductType,
): ProductCardProps {
  const gradeTags = Object.entries(product.gradeValue).map(
    ([key, grade]) => `${gradeLabels[key] ?? key} ${grade}`,
  );

  return {
    brand: product.brand,
    name: [product.name, product.flavor].filter(Boolean).join(" "),
    capacity: product.volume,
    tags: [],
    proteinPerServing: product.protein,
    calories: product.calories,
    sugar: product.sugar,
    density: product.density,
    productType: category,
    gradeTags,
    slug: product.id,
    coupangUrl: product.coupangUrl ?? undefined,
    naverUrl: product.naverUrl ?? undefined,
    officialUrl: product.officialUrl ?? undefined,
  };
}

function OptionButton({
  icon,
  label,
  desc,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-4 transition-all"
      style={{
        border: `1.5px solid ${selected ? "#16412D" : "#e8e6e3"}`,
        background: selected ? "#E8F0EA" : "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
      }}
    >
      <span className="text-2xl shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
        <p className="text-xs mt-0.5 text-[var(--foreground-muted)]">{desc}</p>
      </div>
    </button>
  );
}

function GridOption({
  icon,
  label,
  desc,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left flex flex-col gap-1 transition-all"
      style={{
        border: `1.5px solid ${selected ? "#16412D" : "#e8e6e3"}`,
        background: selected ? "#E8F0EA" : "#fff",
        borderRadius: "12px",
        padding: "14px 16px",
      }}
    >
      <span className="text-xl">{icon}</span>
      <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
      <p className="text-xs text-[var(--foreground-muted)]">{desc}</p>
    </button>
  );
}

function NextButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-2 w-full rounded-[10px] py-3 text-sm font-semibold transition-opacity"
      style={{
        background: "#16412D",
        color: "white",
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {label}
    </button>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between text-xs font-semibold mb-2">
        {[1, 2, 3, 4].map((s) => (
          <span key={s} style={{ color: step >= s ? "#16412D" : "#9ca3af" }}>
            STEP {s}
          </span>
        ))}
      </div>
      <div className="relative rounded-full overflow-hidden" style={{ height: "3px", background: "#e8e6e3" }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
          style={{
            background: "#16412D",
            width: `${((step - 1) / 3) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<number[]>([]);
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    LOADING_STEPS.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), 350 * i);
      setTimeout(() => setChecked((v) => [...v, i]), 350 * i + 220);
    });
    const timer = setTimeout(onDone, 1700);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fade-in text-center py-12 px-6">
      <div
        className="mx-auto mb-6"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid #e8e6e3",
          borderTopColor: "#16412D",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p className="text-base font-bold mb-6 text-[#1a1a1a]">맞춤 제품을 분석 중입니다.</p>
      <div className="text-left inline-block space-y-3">
        {LOADING_STEPS.map((text, i) => (
          <div
            key={text}
            className="flex items-center gap-3 text-sm transition-all duration-300"
            style={{
              opacity: visible.includes(i) ? 1 : 0,
              transform: visible.includes(i) ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <span
              style={{
                color: checked.includes(i) ? "#1B7F5B" : "#d1d5db",
                fontSize: 16,
                width: 20,
                textAlign: "center",
              }}
            >
              {checked.includes(i) ? "✓" : "•"}
            </span>
            <span style={{ color: checked.includes(i) ? "#1a1a1a" : "#9ca3af" }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultScreen({
  result,
  onReset,
  category,
  answers,
}: {
  result: RecommendResult;
  onReset: () => void;
  category: ProductType;
  answers: QuizAnswers;
}) {
  const quickLinks = getRecommendQuickLinks(category, answers);

  return (
    <div className="fade-in space-y-5">
      <div className="px-4 py-4 rounded-xl border border-[#e8e6e3] bg-white">
        <p className="text-xs font-semibold mb-2 text-[#7a7a7a]">선택 조건</p>
        <div className="flex flex-wrap gap-2">
          {result.profileChips.map((chip) => (
            <span
              key={chip}
              className="text-sm"
              style={{ border: "1px solid #e8e6e3", borderRadius: "20px", padding: "4px 12px", color: "#374151" }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-base font-extrabold mb-3 text-[#1a1a1a]">맞춤 추천 제품</p>
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {result.products.map((product) => (
            <ScoredProductCard
              key={product.rank}
              product={toRecommendationCardProduct(product, category)}
              rank={product.rank}
              score={product.score}
              scoreCaption="추천 점수"
              metricLabel="맞춤 추천"
              cardVariant="recommend"
              highlightLabel={product.rank === 1 ? "최고 추천" : `${product.rank}위`}
              reason={product.reason}
              compact
            />
          ))}
        </div>
        <div className="hidden gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
          {result.products.map((product) => (
            <ScoredProductCard
              key={product.rank}
              product={toRecommendationCardProduct(product, category)}
              rank={product.rank}
              score={product.score}
              scoreCaption="추천 점수"
              metricLabel="맞춤 추천"
              cardVariant="recommend"
              highlightLabel={product.rank === 1 ? "최고 추천" : `${product.rank}위`}
              reason={product.reason}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {result.tips.map((tip) => (
          <div key={tip.title} className="rounded-xl border border-[#e8e6e3] bg-[#fafaf8] px-4 py-3">
            <p className="text-sm font-semibold text-[#1a1a1a]">
              <span className="mr-2">{tip.icon}</span>
              {tip.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {quickLinks.map((link) => (
          <TrackedLink
            key={link.href}
            href={link.href}
            trackingLabel={link.title}
            trackingSection="recommend_result_quick_links"
            trackingPageType="recommend"
            className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 transition-colors hover:bg-[#E8F0EA]"
          >
            <p className="text-sm font-semibold text-[#1a1a1a]">{link.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{link.desc}</p>
          </TrackedLink>
        ))}
      </div>

      <CommercialAdSection pageType="recommend" />

      <div className="flex gap-3 pt-2">
        <button
          onClick={onReset}
          className="flex-1 rounded-[10px] py-3 text-sm font-semibold transition-colors hover:bg-[#E8F0EA] hover:text-[#16412D]"
          style={{ border: "1px solid #e8e6e3", background: "#fff", color: "#374151" }}
        >
          다시 추천받기
        </button>
        <TrackedLink
          href={getCategoryHref(category)}
          trackingLabel={`전체 ${getCategoryLabel(category)} 보기`}
          trackingSection="recommend_result_primary_cta"
          trackingPageType="recommend"
          className="flex-1 rounded-[10px] bg-[#16412D] py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          전체 {getCategoryLabel(category)} 보기 →
        </TrackedLink>
      </div>
    </div>
  );
}

function getProductCount(category: ProductType, counts: Record<ProductType, number>) {
  return counts[category] ?? 0;
}

function getPurposeLabel(value: string) {
  return PURPOSE_OPTIONS.find((item) => item.value === value)?.label ?? value;
}

function getPriorityLabel(value: QuizAnswers["priority"]) {
  return PRIORITY_OPTIONS.find((item) => item.value === value)?.label ?? value;
}

function getConditionLabel(category: ProductType, value: string) {
  return CONDITION_OPTIONS_BY_CATEGORY[category].find((item) => item.value === value)?.label ?? value;
}

function getRecommendQuickLinks(category: ProductType, answers: QuizAnswers): QuickLinkItem[] {
  const links: QuickLinkItem[] = [];

  if (category === "drink") {
    links.push({
      href: "/guides/product-selection-comparison/protein-drink-guide",
      title: "단백질 음료 비교 기준 보기",
      desc: "추천 결과를 본 뒤 단백질, 당류, 칼로리 기준을 더 자세히 확인할 수 있습니다.",
    });
    if (answers.purpose === "diet" || answers.conditions.includes("lowsugar")) {
      links.push({
        href: "/guides/product-selection-comparison/selex-vs-himune",
        title: "대표 RTD 브랜드 비교 보기",
        desc: "셀렉스와 하이뮨 같은 대표 제품을 바로 비교해볼 수 있습니다.",
      });
    } else if (
      answers.conditions.includes("highpro") ||
      answers.priority === "protein"
    ) {
      links.push({
        href: "/guides/product-selection-comparison/high-protein-40g-comparison",
        title: "40g 이상 RTD 비교 보기",
        desc: "고단백 보충용 후보를 더 직접적으로 좁혀볼 수 있습니다.",
      });
    }
  } else if (category === "bar") {
    links.push({
      href: "/guides/product-selection-comparison/protein-bar-top10",
      title: "단백질 바 TOP 10 보기",
      desc: "추천 결과를 본 뒤 전체 바 후보와 대표 제품을 함께 확인할 수 있습니다.",
    });
    if (answers.purpose === "diet" || answers.conditions.includes("lowsugar")) {
      links.push({
        href: "/guides/product-selection-comparison/diet-protein-bar",
        title: "다이어트 단백질 바 보기",
        desc: "저당·저칼로리 기준으로 다시 좁혀볼 수 있습니다.",
      });
    }
  } else if (category === "yogurt") {
    links.push({
      href: "/guides/product-selection-comparison/protein-yogurt-top5",
      title: "단백질 요거트 TOP 5 보기",
      desc: "추천 결과를 본 뒤 대표 제품군 비교로 이어집니다.",
    });
    if (answers.conditions.includes("lowsugar")) {
      links.push({
        href: "/guides/product-selection-comparison/diet-protein-yogurt",
        title: "다이어트 단백질 요거트 보기",
        desc: "당류와 칼로리 기준으로 다시 비교해볼 수 있습니다.",
      });
    }
  } else {
    links.push({
      href: "/guides/product-selection-comparison/protein-shake-top7",
      title: "단백질 쉐이크 TOP 7 보기",
      desc: "추천 결과를 본 뒤 대표 쉐이크 비교 페이지로 이어집니다.",
    });
    if (answers.purpose === "diet" || answers.conditions.includes("meal")) {
      links.push({
        href: "/guides/product-selection-comparison/diet-protein-shake",
        title: "다이어트 단백질 쉐이크 보기",
        desc: "식사대용과 저당 기준을 함께 확인할 수 있습니다.",
      });
    }
  }

  links.push({
    href: "/ranking",
    title: "전체 순위에서 다시 보기",
    desc: "추천 결과가 전체 제품 중 어디쯤인지 점수 기준으로 확인할 수 있습니다.",
  });

  return links.slice(0, 3);
}

export default function RecommendClient({ categoryCounts }: RecommendClientProps) {
  const [category, setCategory] = useState<ProductType>("drink");
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ purpose: "", priority: "", conditions: [] });
  const [result, setResult] = useState<RecommendResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const completedRecommendationRef = useRef<RecommendResult | null>(null);

  useEffect(() => {
    if (!result || result.products.length === 0 || completedRecommendationRef.current === result) return;
    completedRecommendationRef.current = result;
    recommendComplete(category, `results:${result.products.length}`);
  }, [category, result]);

  const productCount = getProductCount(category, categoryCounts);
  const productLabel = getCategoryLabel(category);
  const conditionOptions = CONDITION_OPTIONS_BY_CATEGORY[category];
  const isShakeEmpty = category === "shake" && productCount === 0;

  function reset() {
    setStep(0);
    setAnswers({ purpose: "", priority: "", conditions: [] });
    setResult(null);
    setError(null);
  }

  function handleCategoryChange(nextCategory: ProductType) {
    setCategory(nextCategory);
    setStep(0);
    setAnswers({ purpose: "", priority: "", conditions: [] });
    setResult(null);
    setError(null);
  }

  async function submitQuiz() {
    if (isShakeEmpty) return;

    setResult(null);
    setError(null);
    setStep("loading");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, ...answers }),
      });
      const data = await res.json();

      if (!res.ok || "error" in data) {
        setError(String(data.error ?? "추천 결과를 불러오지 못했습니다."));
      } else {
        setResult(data);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "추천 결과를 불러오지 못했습니다.");
    }
  }

  const chips = [
    answers.purpose ? getPurposeLabel(answers.purpose) : null,
    answers.priority ? getPriorityLabel(answers.priority) : null,
    ...answers.conditions.map((condition) => getConditionLabel(category, condition)),
  ].filter(Boolean) as string[];

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <section className="w-full border-t border-b" style={{ background: "#FAF8F3", borderColor: "#E7DFC9" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold leading-tight md:text-3xl" style={{ fontWeight: 700, color: "#16412D" }}>
            제품 추천
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            제품 형태와 3가지 선택 조건을 기준으로 카테고리별 제품을 추천합니다.
          </p>
          <AffiliateDisclosure className="mt-2 mb-0" />
        </div>
      </section>

      <div className="min-h-[70vh] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <CategoryTabs
            activeCategory={category}
            counts={categoryCounts}
            onSelect={handleCategoryChange}
            stickyMobile
            className="mb-4"
          />

          {step === 0 && (
            <div className="max-w-lg mx-auto">
              <div className="fade-in text-center py-12">
                <span
                  className="inline-block text-sm font-semibold px-4 py-1.5 mb-6"
                  style={{ background: "#E8F0EA", color: "#16412D", borderRadius: "20px" }}
                >
                  맞춤 추천
                </span>
                <h2 className="text-3xl font-extrabold mb-4 leading-tight text-[#1a1a1a]">
                  나에게 맞는
                  <br />
                  {productLabel} 찾기
                </h2>
                <p className="text-base mb-3 leading-relaxed text-[#6b6b6b]">
                  {getCategoryDescription(category)}
                </p>
                <p className="text-base mb-8 leading-relaxed text-[#6b6b6b]">
                  제품 형태와 3가지 질문으로 {productCount}개 제품 중 현재 조건에 맞는 {productLabel}을 추천해드립니다.
                </p>

                {isShakeEmpty ? (
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] px-5 py-5 text-left">
                    <p className="text-sm font-semibold text-[var(--foreground)]">조건에 맞는 쉐이크 추천은 아직 준비 중입니다.</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                      먼저 전체 쉐이크 제품을 비교해보고 맛과 칼로리, 단백질 기준으로 직접 좁혀보세요.
                    </p>
                    <Link
                      href="/shake"
                      className="mt-4 inline-flex rounded-[10px] border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-[#E8F0EA] hover:text-[#16412D]"
                    >
                      쉐이크 비교하러 가기 →
                    </Link>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        recommendStart(category);
                        setStep(1);
                      }}
                      className="inline-block px-8 py-3 text-base font-semibold rounded-[10px] hover:opacity-90 transition-opacity"
                      style={{ background: "#16412D", color: "white" }}
                    >
                      시작하기 →
                    </button>
                    <div className="flex justify-center gap-6 mt-10 text-sm text-[#6b6b6b]">
                      <span>💪 {productCount}개 제품</span>
                      <span>등급 기반</span>
                      <span>성분 비교</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {(step === 1 || step === 2 || step === 3) && (
            <div className="max-w-lg mx-auto">
              <div key={step} className="fade-in">
                <ProgressBar step={(step as number) + 1} />
                <div className="p-6 space-y-5 border border-[#e8e6e3] rounded-xl bg-white">
                  {step === 1 && (
                    <>
                      <div>
                        <p className="text-xs font-semibold mb-1 text-[#16412D]">STEP 2 / 4</p>
                        <p className="text-lg font-bold text-[#1a1a1a]">주로 어떤 목적에서 {productLabel}을 찾고 있나요?</p>
                      </div>
                      <div className="space-y-2.5">
                        {PURPOSE_OPTIONS.map((option) => (
                          <OptionButton
                            key={option.value}
                            {...option}
                            selected={answers.purpose === option.value}
                            onClick={() => setAnswers({ ...answers, purpose: option.value })}
                          />
                        ))}
                      </div>
                      <NextButton label="다음 →" disabled={!answers.purpose} onClick={() => setStep(2)} />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div>
                        <p className="text-xs font-semibold mb-1 text-[#16412D]">STEP 3 / 4</p>
                        <p className="text-lg font-bold text-[#1a1a1a]">가장 중요한 선택 기준은 무엇인가요?</p>
                      </div>
                      <div className="space-y-2.5">
                        {PRIORITY_OPTIONS.map((option) => (
                          <OptionButton
                            key={option.value}
                            {...option}
                            selected={answers.priority === option.value}
                            onClick={() => setAnswers({ ...answers, priority: option.value })}
                          />
                        ))}
                      </div>
                      <NextButton label="다음 →" disabled={!answers.priority} onClick={() => setStep(3)} />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div>
                        <p className="text-xs font-semibold mb-1 text-[#16412D]">STEP 4 / 4</p>
                        <p className="text-lg font-bold text-[#1a1a1a]">피하고 싶은 조건이나 제한이 있나요?</p>
                        <p className="text-xs mt-0.5 text-[#9ca3af]">복수 선택 가능</p>
                      </div>
                      <div className="grid grid-cols-2 gap-[10px]">
                        {conditionOptions.map((option) => (
                          <GridOption
                            key={option.value}
                            {...option}
                            selected={answers.conditions.includes(option.value)}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                conditions: prev.conditions.includes(option.value)
                                  ? prev.conditions.filter((item) => item !== option.value)
                                  : [...prev.conditions, option.value],
                              }))
                            }
                          />
                        ))}
                      </div>
                      {chips.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {chips.map((chip) => (
                            <span key={chip} className="rounded-full bg-[#f6f2ea] px-3 py-1 text-xs text-[#6b6b6b]">
                              {chip}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <NextButton label="결과 보기" disabled={false} onClick={submitQuiz} />
                    </>
                  )}

                  {(step === 2 || step === 3) && (
                    <button
                      onClick={() => setStep((current) => ((current as number) - 1) as Step)}
                      className="text-xs transition-colors hover:opacity-70 text-[#9ca3af]"
                    >
                      ← 이전으로
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === "loading" && (
            <div className="max-w-lg mx-auto">
              <div className="fade-in border border-[#e8e6e3] rounded-xl bg-white">
                <LoadingScreen onDone={() => setStep("result")} />
              </div>
            </div>
          )}

          {step === "result" && !result && !error && (
            <div className="max-w-lg mx-auto">
              <div className="border border-[#e8e6e3] rounded-xl bg-white text-center py-12">
                <div
                  className="mx-auto mb-4"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "3px solid #e8e6e3",
                    borderTopColor: "#16412D",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <p className="text-sm text-[#9ca3af]">결과를 불러오는 중입니다...</p>
              </div>
            </div>
          )}

          {step === "result" &&
            (error ? (
              <div className="fade-in text-center p-8 border border-[#e8e6e3] rounded-xl bg-white">
                <p className="text-2xl mb-3">⚠️</p>
                <p className="text-base font-bold mb-2 text-[#1a1a1a]">추천 결과를 불러오지 못했습니다</p>
                <p className="text-xs mb-5 text-[#9ca3af]">{error}</p>
                <button
                  onClick={reset}
                  className="px-6 py-2.5 text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  style={{ background: "#16412D", color: "white" }}
                >
                  처음으로
                </button>
              </div>
            ) : result ? (
              <div className="max-w-[980px] mx-auto">
                {result.products.length > 0 ? (
                  <ResultScreen result={result} onReset={reset} category={category} answers={answers} />
                ) : (
                  <div className="fade-in rounded-xl border border-[#e8e6e3] bg-white px-6 py-10 text-center">
                    <p className="text-base font-bold text-[#1a1a1a]">현재 조건으로는 추천 후보를 찾지 못했습니다.</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                      피하고 싶은 조건을 한두 개 해제하거나, 전체 {productLabel} 목록에서 필터를 조정해보세요.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <button onClick={() => setStep(3)} className="rounded-[10px] border border-[#e8e6e3] px-4 py-2.5 text-sm font-semibold text-[#374151] hover:bg-[#E8F0EA] hover:text-[#16412D]">
                        조건 다시 고르기
                      </button>
                      <TrackedLink href={getCategoryHref(category)} trackingLabel={`전체 ${productLabel} 보기`} trackingSection="recommend_empty_result" trackingPageType="recommend" className="rounded-[10px] bg-[#16412D] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                        전체 {productLabel} 보기
                      </TrackedLink>
                    </div>
                  </div>
                )}
              </div>
            ) : null)}
        </div>
      </div>
    </>
  );
}
