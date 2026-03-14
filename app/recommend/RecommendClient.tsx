"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import MetricBadgeGroup from "@/app/components/MetricBadgeGroup";
import ProductBadge from "@/app/components/ProductBadge";
import ProductCard, { type ProductCardProps } from "@/app/components/ProductCard";
import ScoredProductCard from "@/app/components/ScoredProductCard";
import {
  getMetricBadgeAriaLabel,
  getMetricBadgeTooltip,
  getProductBadgeTone,
} from "@/app/components/productBadgeUtils";

type ProductType = "drink" | "bar" | "yogurt";
type Step = 0 | 1 | 2 | 3 | 4 | "loading" | "result";

interface QuizAnswers {
  purpose: string;
  frequency: string;
  intensity: string;
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
}

interface RecommendResult {
  products: RecommendedProduct[];
  profileChips: string[];
  tips: { icon: string; title: string; desc: string }[];
}

// 퀴즈 옵션 데이터
const PURPOSE_OPTIONS = [
  { icon: "💪", label: "근성장·벌크업", desc: "운동 후 근섬유를 수리하고 키우기", value: "muscle" },
  { icon: "🥗", label: "다이어트·체중 감량", desc: "칼로리는 낮게, 포만감은 높게", value: "diet" },
  { icon: "🍞", label: "일상 간편식 보충", desc: "바쁜 일상에서 가볍게 보충", value: "daily" },
  { icon: "🔄", label: "운동 회복·컨디션", desc: "빠른 회복과 컨디션 유지", value: "recovery" },
];

const FREQUENCY_OPTIONS = [
  { icon: "🛋️", label: "거의 안해요", desc: "주 0~1회", value: "rarely" },
  { icon: "🚶", label: "가끔 해요", desc: "주 2~3회", value: "sometimes" },
  { icon: "🏃", label: "자주 해요", desc: "주 4~5회", value: "often" },
  { icon: "📅", label: "매일 해요", desc: "매일 또는 하루 2회 이상", value: "daily" },
];

const INTENSITY_OPTIONS = [
  { icon: "🧘", label: "가볍게", desc: "산책·스트레칭·필라", value: "light" },
  { icon: "🏃", label: "적당히", desc: "유산소·러닝 위주 하기", value: "moderate" },
  { icon: "💪", label: "강하게", desc: "웨이트·인터벌 트레이닝", value: "hard" },
  { icon: "🏋️", label: "매우 강하게", desc: "프로급·고수급 트레이닝", value: "extreme" },
];

const CONDITION_OPTIONS = [
  { icon: "🔥", label: "저칼로리", desc: "150kcal 이하 선호", value: "lowcal" },
  { icon: "💊", label: "고단백", desc: "30g 이상 선호", value: "highpro" },
  { icon: "🌿", label: "식물성·비건", desc: "식물성 급원만", value: "vegan" },
  { icon: "😋", label: "맛이 중요해요", desc: "다양한 맛 옵션", value: "taste" },
  { icon: "📊", label: "단백질 밀도", desc: "단백질 밀도 A·B 등급 선호", value: "price" },
  { icon: "🚫", label: "무당류", desc: "당류 2g 이하 선호", value: "sugar" },
];

const LOADING_STEPS = [
  "목적·운동량 분석",
  "가성비/다이어트/퍼포먼스 등급 필터링",
  "영양 성분·당류 검증",
  "최적 조합 3개 선정",
];

const gradeLabels: Record<string, string> = {
  price: "단백질 밀도",
  diet: "다이어트",
  performance: "퍼포먼스",
};

// 옵션 버튼 (세로형)
function toRecommendationCardProduct(product: RecommendedProduct): ProductCardProps {
  const recommendationGradeLabels: Record<string, string> = {
    price: "단백질 밀도",
    diet: "다이어트",
    performance: "퍼포먼스",
  };
  const gradeTags = Object.entries(product.gradeValue).map(
    ([key, grade]) => `${recommendationGradeLabels[key] ?? key} ${grade}`,
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
    gradeTags,
    slug: product.id,
  };
}

function OptionButton({ icon, label, desc, selected, onClick }: {
  icon: string; label: string; desc: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full text-left flex items-center gap-4 transition-all" style={{
      border: `1.5px solid ${selected ? "var(--accent)" : "#e8e6e3"}`,
      background: selected ? "var(--accent-light)" : "#fff",
      borderRadius: "12px",
      padding: "16px 20px",
    }}>
      <span className="text-2xl shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm" style={{ fontWeight: 700, color: "#1a1a1a" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>{desc}</p>
      </div>
    </button>
  );
}

// 옵션 버튼 (그리드형)
function GridOption({ icon, label, desc, selected, onClick }: {
  icon: string; label: string; desc: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="text-left flex flex-col gap-1 transition-all" style={{
      border: `1.5px solid ${selected ? "var(--accent)" : "#e8e6e3"}`,
      background: selected ? "var(--accent-light)" : "#fff",
      borderRadius: "12px",
      padding: "14px 16px",
    }}>
      <span className="text-xl">{icon}</span>
      <p className="text-sm" style={{ fontWeight: 700, color: "#1a1a1a" }}>{label}</p>
      <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{desc}</p>
    </button>
  );
}

// 다음 버튼
function NextButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={disabled} className="mt-2 w-full rounded-full py-3 text-sm font-semibold transition-opacity" style={{
      background: "var(--accent)",
      color: "white",
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? "none" : "auto",
    }}>
      {label}
    </button>
  );
}

// 진행 바
function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between text-xs font-semibold mb-2">
        {[1, 2, 3, 4].map((s) => (
          <span key={s} style={{ color: step >= s ? "var(--accent)" : "#9ca3af" }}>STEP {s}</span>
        ))}
      </div>
      <div className="relative rounded-full overflow-hidden" style={{ height: "3px", background: "#e8e6e3" }}>
        <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-300" style={{
          background: "var(--accent)",
          width: `${((step - 1) / 3) * 100}%`,
        }} />
      </div>
    </div>
  );
}

// 로딩 화면
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<number[]>([]);
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    LOADING_STEPS.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), 400 * i);
      setTimeout(() => setChecked((v) => [...v, i]), 400 * i + 300);
    });
    setTimeout(onDone, 1800);
  }, [onDone]);

  return (
    <div className="fade-in text-center py-12 px-6">
      <div className="mx-auto mb-6" style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "3px solid #e8e6e3", borderTopColor: "var(--accent)",
        animation: "spin 0.8s linear infinite",
      }} />
      <p className="text-base font-bold mb-6" style={{ color: "#1a1a1a" }}>맞춤 제품 분석 중...</p>
      <div className="text-left inline-block space-y-3">
        {LOADING_STEPS.map((text, i) => (
          <div key={i} className="flex items-center gap-3 text-sm transition-all duration-300" style={{
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? "translateY(0)" : "translateY(6px)",
          }}>
            <span style={{ color: checked.includes(i) ? "#1B7F5B" : "#d1d5db", fontSize: 16, width: 20, textAlign: "center" }}>
              {checked.includes(i) ? "✓" : "○"}
            </span>
            <span style={{ color: checked.includes(i) ? "#1a1a1a" : "#9ca3af" }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 추천 제품 카드 (세로형, 그리드 레이아웃용)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RecommendationMeta({
  rank,
  score,
  isFirst,
  compact = false,
}: {
  rank: number;
  score: number;
  isFirst: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mb-2 rounded-lg border border-[#e8e6e3] bg-[#faf8f2] px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-extrabold"
              style={{
                background: isFirst ? "var(--accent)" : "#f3f4f6",
                color: isFirst ? "white" : "#6b7280",
              }}
            >
              {rank}
            </span>
            <span className="text-xs font-semibold" style={{ color: "#374151" }}>
              추천 {rank}위
            </span>
          </div>
          {isFirst ? (
            <span
              className="rounded-full px-2 py-1 text-[11px] font-bold"
              style={{ background: "#FFF1E6", color: "#F08A24" }}
            >
              최고 추천
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#ece7dd] pt-2">
          <span className="text-[11px] font-medium" style={{ color: "#7a7a7a" }}>
            추천 강도
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ background: "#EAF2FF", color: "#4C7BD9" }}
          >
            {score}점
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#f0eeeb] bg-[#faf8f2] px-4 py-3">
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-extrabold"
          style={{
            background: isFirst ? "var(--accent)" : "#f3f4f6",
            color: isFirst ? "white" : "#6b7280",
          }}
        >
          {rank}
        </span>
        <span className="text-sm font-semibold" style={{ color: "#374151" }}>
          추천 {rank}위
        </span>
        {isFirst ? (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold"
            style={{ background: "#FFF1E6", color: "#F08A24" }}
          >
            최고 추천
          </span>
        ) : null}
      </div>
      <div className="text-right">
        <p className="text-[11px] leading-none" style={{ color: "#7a7a7a" }}>
          추천 강도
        </p>
        <p className="mt-1 text-sm font-extrabold" style={{ color: "#4C7BD9" }}>
          {score}점
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductResultCard({ product }: { product: RecommendedProduct }) {
  const router = useRouter();
  const isFirst = product.rank === 1;
  const displayName = [product.name, product.flavor].filter(Boolean).join(" ");

  const shouldIgnoreCardClick = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(target.closest("a, button, input, select, textarea, label"));
  };

  const openDetail = () => {
    router.push(product.detailPath);
  };

  const handleCardClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    openDetail();
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  };

  return (
    <article
      className="relative flex cursor-pointer flex-col transition-colors duration-200 hover:border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`${displayName} 상세 보기`}
      style={{ border: "1px solid #e8e6e3", borderRadius: "16px", background: "#FFFDF8", overflow: "hidden" }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[#f0eeeb] bg-[#faf8f2] px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-extrabold"
            style={{
              background: isFirst ? "var(--accent)" : "#f3f4f6",
              color: isFirst ? "white" : "#6b7280",
            }}
          >
            {product.rank}
          </span>
          {isFirst ? (
            <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: "#FFF1E6", color: "#F08A24" }}>
              理쒓퀬 異붿쿇
            </span>
          ) : null}
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: "#EAF2FF", color: "#4C7BD9" }}>
          異붿쿇 ?먯닔 {product.score}
        </span>
      </div>
      {isFirst && (
        <span className="hidden absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#FFF1E6", color: "#F08A24" }}>
          최고 추천
        </span>
      )}

      {/* 이미지 */}
      <Link href={product.detailPath} className="relative flex items-center justify-center bg-white border-b border-[#f0eeeb]" style={{ height: "160px" }}>
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={displayName} fill className="object-contain p-4" sizes="200px" unoptimized />
        ) : (
          <div className="h-full w-full" />
        )}
        <span className="hidden absolute top-3 right-3 w-7 h-7 rounded-full items-center justify-center text-xs font-extrabold" style={{
          background: isFirst ? "var(--accent)" : "#f3f4f6",
          color: isFirst ? "white" : "#6b7280",
        }}>
          {product.rank}
        </span>
      </Link>

      {/* 내용 */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs truncate" style={{ color: "#7a7a7a" }}>{product.brand}</p>
        <Link href={product.detailPath} className="mt-0.5 block text-sm font-bold leading-snug hover:underline line-clamp-2" style={{ color: "#1a1a1a" }}>
          {displayName}
        </Link>
        <p className="mt-0.5 text-xs" style={{ color: "#999" }}>{product.volume}</p>

        {/* 등급 뱃지 */}
        <MetricBadgeGroup className="mt-2.5">
          {Object.entries(product.gradeValue).map(([key, grade]) => {
            const badgeLabel = `${gradeLabels[key] ?? key} ${grade}`;

            return (
              <ProductBadge
                key={key}
                label={badgeLabel}
                tone={getProductBadgeTone(badgeLabel)}
                tooltip={getMetricBadgeTooltip(badgeLabel) ?? undefined}
                tooltipAriaLabel={getMetricBadgeAriaLabel(badgeLabel)}
              />
            );
          })}
        </MetricBadgeGroup>

        {/* 핵심 수치 */}
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            { label: "단백질", value: `${product.protein}g`, color: "#1B7F5B" },
            { label: "칼로리", value: `${product.calories}kcal`, color: "#6b7280" },
            { label: "당류", value: `${product.sugar}g`, color: product.sugar === 0 ? "#1B7F5B" : "#f97316" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-[#f0eeeb] bg-[#fafaf8] px-2 py-2 text-center">
              <p style={{ fontSize: 16, fontWeight: 800, color: stat.color, lineHeight: 1.2 }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 추천 이유 */}
        <div className="mt-3" style={{ background: "#EFEDE6", borderLeft: "3px solid var(--accent)", padding: "8px 10px", borderRadius: "0 6px 6px 0" }}>
          <p style={{ fontSize: 13, color: "#3d3d3d", lineHeight: 1.6, fontWeight: 500 }}>{product.reason}</p>
        </div>

        {/* 상세 보기 */}
        <Link href={product.detailPath} className="mt-3 block w-full py-2.5 text-xs font-semibold text-center rounded-lg transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]" style={{
          border: "1px solid #e8e6e3", background: "#fff", color: "#374151",
        }}>
          상세 보기 →
        </Link>
      </div>
    </article>
  );
}

// 결과 화면
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductResultCardMobile({ product }: { product: RecommendedProduct }) {
  const gradeTags = Object.entries(product.gradeValue).map(
    ([key, grade]) => `${gradeLabels[key] ?? key} ${grade}`,
  );

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between gap-2 rounded-lg border border-[#e8e6e3] bg-[#faf8f2] px-3 py-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-extrabold"
            style={{
              background: product.rank === 1 ? "var(--accent)" : "#f3f4f6",
              color: product.rank === 1 ? "white" : "#6b7280",
            }}
          >
            {product.rank}
          </span>
          {product.rank === 1 ? (
            <span
              className="rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ background: "#FFF1E6", color: "#F08A24" }}
            >
              최고 추천
            </span>
          ) : null}
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ background: "#EAF2FF", color: "#4C7BD9" }}
        >
          추천 점수 {product.score}
        </span>
      </div>
      <ProductCard
        brand={product.brand}
        name={[product.name, product.flavor].filter(Boolean).join(" ")}
        capacity={product.volume}
        tags={[]}
        proteinPerServing={product.protein}
        calories={product.calories}
        sugar={product.sugar}
        density={product.density}
        gradeTags={gradeTags}
        slug={product.id}
      />
      <div
        className="mt-2 rounded-lg border border-[#e8e6e3] bg-[#faf8f2] px-3 py-2"
        style={{ borderLeft: "3px solid var(--accent)" }}
      >
        <p style={{ fontSize: 13, color: "#3d3d3d", lineHeight: 1.6, fontWeight: 500 }}>
          {product.reason}
        </p>
      </div>
    </div>
  );
}

function RecommendationMetaV2({
  rank,
  score,
  isFirst,
  compact = false,
}: {
  rank: number;
  score: number;
  isFirst: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mb-2 rounded-xl border border-[#e8e6e3] bg-[#faf8f2] px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-extrabold"
              style={{
                background: isFirst ? "var(--accent)" : "#f3f4f6",
                color: isFirst ? "white" : "#6b7280",
              }}
            >
              {rank}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-tight" style={{ color: "#374151" }}>
                추천 {rank}위
              </p>
              {isFirst ? (
                <p className="mt-1 text-[11px] font-semibold leading-tight" style={{ color: "#F08A24" }}>
                  최고 추천
                </p>
              ) : null}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] leading-none" style={{ color: "#7a7a7a" }}>
              추천 강도
            </p>
            <p className="mt-1 text-sm font-extrabold leading-none" style={{ color: "#4C7BD9" }}>
              {score}점
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#f0eeeb] bg-[#faf8f2] px-4 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-extrabold"
          style={{
            background: isFirst ? "var(--accent)" : "#f3f4f6",
            color: isFirst ? "white" : "#6b7280",
          }}
        >
          {rank}
        </span>
        <p className="text-sm font-semibold" style={{ color: "#374151" }}>
          추천 {rank}위
        </p>
        {isFirst ? (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold"
            style={{ background: "#FFF1E6", color: "#F08A24" }}
          >
            최고 추천
          </span>
        ) : null}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[11px] leading-none" style={{ color: "#7a7a7a" }}>
          추천 강도
        </p>
        <p className="mt-1 text-sm font-extrabold leading-none" style={{ color: "#4C7BD9" }}>
          {score}점
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductResultCardDesktopV2({ product }: { product: RecommendedProduct }) {
  const router = useRouter();
  const isFirst = product.rank === 1;
  const displayName = [product.name, product.flavor].filter(Boolean).join(" ");

  const shouldIgnoreCardClick = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(target.closest("a, button, input, select, textarea, label"));
  };

  const openDetail = () => {
    router.push(product.detailPath);
  };

  const handleCardClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    openDetail();
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  };

  return (
    <article
      className="relative flex cursor-pointer flex-col transition-colors duration-200 hover:border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`${displayName} 상세 보기`}
      style={{ border: "1px solid #e8e6e3", borderRadius: "16px", background: "#FFFDF8", overflow: "hidden" }}
    >
      <RecommendationMetaV2 rank={product.rank} score={product.score} isFirst={isFirst} />
      <Link href={product.detailPath} className="relative flex items-center justify-center bg-white border-b border-[#f0eeeb]" style={{ height: "160px" }}>
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={displayName} fill className="object-contain p-4" sizes="200px" unoptimized />
        ) : (
          <div className="h-full w-full" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs truncate" style={{ color: "#7a7a7a" }}>{product.brand}</p>
        <Link href={product.detailPath} className="mt-0.5 block text-sm font-bold leading-snug hover:underline line-clamp-2" style={{ color: "#1a1a1a" }}>
          {displayName}
        </Link>
        <p className="mt-0.5 text-xs" style={{ color: "#999" }}>{product.volume}</p>

        <MetricBadgeGroup className="mt-2.5">
          {Object.entries(product.gradeValue).map(([key, grade]) => {
            const badgeLabel = `${gradeLabels[key] ?? key} ${grade}`;

            return (
              <ProductBadge
                key={key}
                label={badgeLabel}
                tone={getProductBadgeTone(badgeLabel)}
                tooltip={getMetricBadgeTooltip(badgeLabel) ?? undefined}
                tooltipAriaLabel={getMetricBadgeAriaLabel(badgeLabel)}
              />
            );
          })}
        </MetricBadgeGroup>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            { label: "단백질", value: `${product.protein}g`, color: "#1B7F5B" },
            { label: "칼로리", value: `${product.calories}kcal`, color: "#6b7280" },
            { label: "당류", value: `${product.sugar}g`, color: product.sugar === 0 ? "#1B7F5B" : "#f97316" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-[#f0eeeb] bg-[#fafaf8] px-2 py-2 text-center">
              <p style={{ fontSize: 16, fontWeight: 800, color: stat.color, lineHeight: 1.2 }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-r-md border border-[#e8e2d7] bg-[#f6f2ea] px-3 py-2" style={{ borderLeftWidth: 3, borderLeftColor: "var(--accent)" }}>
          <p style={{ fontSize: 13, color: "#3d3d3d", lineHeight: 1.6, fontWeight: 500 }}>{product.reason}</p>
        </div>

        <Link href={product.detailPath} className="mt-3 block w-full py-2.5 text-xs font-semibold text-center rounded-lg transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]" style={{
          border: "1px solid #e8e6e3", background: "#fff", color: "#374151",
        }}>
          상세 보기 →
        </Link>
      </div>
    </article>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductResultCardMobileV2({ product }: { product: RecommendedProduct }) {
  const gradeTags = Object.entries(product.gradeValue).map(
    ([key, grade]) => `${gradeLabels[key] ?? key} ${grade}`,
  );

  return (
    <div className="relative">
      <RecommendationMetaV2
        rank={product.rank}
        score={product.score}
        isFirst={product.rank === 1}
        compact
      />
      <ProductCard
        brand={product.brand}
        name={[product.name, product.flavor].filter(Boolean).join(" ")}
        capacity={product.volume}
        tags={[]}
        proteinPerServing={product.protein}
        calories={product.calories}
        sugar={product.sugar}
        density={product.density}
        gradeTags={gradeTags}
        slug={product.id}
      />
      <div
        className="mt-2 rounded-lg border border-[#e8e6e3] bg-[#faf8f2] px-3 py-2"
        style={{ borderLeft: "3px solid var(--accent)" }}
      >
        <p style={{ fontSize: 13, color: "#3d3d3d", lineHeight: 1.6, fontWeight: 500 }}>
          {product.reason}
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductResultCardUnified({
  product,
  compact = false,
}: {
  product: RecommendedProduct;
  compact?: boolean;
}) {
  const router = useRouter();
  const isFirst = product.rank === 1;
  const displayName = [product.name, product.flavor].filter(Boolean).join(" ");

  const shouldIgnoreCardClick = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(target.closest("a, button, input, select, textarea, label"));
  };

  const openDetail = () => {
    router.push(product.detailPath);
  };

  const handleCardClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    openDetail();
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  };

  return (
    <article
      className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[#FFFDF8] transition-colors duration-200 hover:border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`${displayName} 상세 보기`}
    >
      <RecommendationMetaV2 rank={product.rank} score={product.score} isFirst={isFirst} compact={compact} />
      <Link
        href={product.detailPath}
        className="relative flex items-center justify-center border-b border-[#f0eeeb] bg-white"
        style={{ height: compact ? "136px" : "160px" }}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={displayName}
            fill
            className={compact ? "object-contain p-3" : "object-contain p-4"}
            sizes={compact ? "45vw" : "200px"}
            unoptimized
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </Link>
      <div className={compact ? "flex flex-1 flex-col p-3" : "flex flex-1 flex-col p-4"}>
        <p className="truncate text-xs" style={{ color: "#7a7a7a" }}>{product.brand}</p>
        <Link
          href={product.detailPath}
          className={compact ? "mt-0.5 block text-[13px] font-bold leading-snug" : "mt-0.5 block text-sm font-bold leading-snug"}
          style={{ color: "#1a1a1a" }}
        >
          {displayName}
        </Link>
        <p className="mt-0.5 text-xs" style={{ color: "#999" }}>{product.volume}</p>

        <MetricBadgeGroup className="mt-2">
          {Object.entries(product.gradeValue).map(([key, grade]) => {
            const badgeLabel = `${gradeLabels[key] ?? key} ${grade}`;

            return (
              <ProductBadge
                key={key}
                label={badgeLabel}
                tone={getProductBadgeTone(badgeLabel)}
                tooltip={getMetricBadgeTooltip(badgeLabel) ?? undefined}
                tooltipAriaLabel={getMetricBadgeAriaLabel(badgeLabel)}
              />
            );
          })}
        </MetricBadgeGroup>

        <div className={compact ? "mt-2 grid grid-cols-2 gap-1.5" : "mt-3 grid grid-cols-3 gap-1.5"}>
          {[
            { label: "단백질", value: `${product.protein}g`, color: "#1B7F5B" },
            { label: "칼로리", value: `${product.calories}kcal`, color: "#6b7280" },
            { label: "당류", value: `${product.sugar}g`, color: product.sugar === 0 ? "#1B7F5B" : "#f97316" },
            ...(compact ? [{ label: "밀도", value: product.density, color: "#3d3d3d" }] : []),
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-[#f0eeeb] bg-[#fafaf8] px-2 py-2 text-center">
              <p style={{ fontSize: compact ? 14 : 16, fontWeight: 800, color: stat.color, lineHeight: 1.2 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {!compact ? (
          <div className="mt-3 rounded-r-md border border-[#e8e2d7] bg-[#f6f2ea] px-3 py-2" style={{ borderLeftWidth: 3, borderLeftColor: "var(--accent)" }}>
            <p style={{ fontSize: 13, color: "#3d3d3d", lineHeight: 1.6, fontWeight: 500 }}>{product.reason}</p>
          </div>
        ) : (
          <p className="mt-2 rounded-lg bg-[#f6f2ea] px-2.5 py-2 text-[11px] leading-5" style={{ color: "#4b5563" }}>
            {product.reason}
          </p>
        )}

        <Link
          href={product.detailPath}
          className="mt-3 block w-full rounded-lg border border-[#e8e6e3] bg-white py-2.5 text-center text-xs font-semibold transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          style={{ color: "#374151" }}
        >
          상세 보기 →
        </Link>
      </div>
    </article>
  );
}

function getCategoryLabel(category: ProductType) {
  if (category === "bar") return "단백질 바";
  if (category === "yogurt") return "단백질 요거트";
  return "단백질 음료";
}

function ResultScreen({ result, onReset, category }: { result: RecommendResult; onReset: () => void; category: ProductType }) {
  return (
    <div className="fade-in space-y-5">
      {/* 선택 조건 */}
      <div className="px-4 py-4 rounded-xl" style={{ background: "#fff", border: "1px solid #e8e6e3" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "#7a7a7a" }}>선택 조건:</p>
        <div className="flex flex-wrap gap-2">
          {result.profileChips.map((chip) => (
            <span key={chip} className="text-sm" style={{ border: "1px solid #e8e6e3", borderRadius: "20px", padding: "4px 12px", color: "#374151" }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* 추천 제품 */}
      <div>
        <p className="text-base font-extrabold mb-3" style={{ color: "#1a1a1a" }}>🏆 맞춤 추천 제품</p>
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {result.products.map((product) => (
            <ScoredProductCard
              key={product.rank}
              product={toRecommendationCardProduct(product)}
              rank={product.rank}
              score={product.score}
              scoreCaption="추천 점수"
              metricLabel="맞춤 추천"
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
              product={toRecommendationCardProduct(product)}
              rank={product.rank}
              score={product.score}
              scoreCaption="추천 점수"
              metricLabel="맞춤 추천"
              highlightLabel={product.rank === 1 ? "최고 추천" : `${product.rank}위`}
              reason={product.reason}
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-3 pt-2">
        <button onClick={onReset} className="flex-1 rounded-full py-3 text-sm font-semibold transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]" style={{
          border: "1px solid #e8e6e3", background: "#fff", color: "#374151",
        }}>
          다시 추천받기
        </button>
        <Link href="/" className="flex-1 rounded-full py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90" style={{
          background: "var(--accent)", color: "white",
        }}>
          전체 {getCategoryLabel(category)} 보기 →
        </Link>
      </div>
    </div>
  );
}

export default function RecommendClient({
  drinkCount,
  barCount,
  yogurtCount,
}: {
  drinkCount: number;
  barCount: number;
  yogurtCount: number;
}) {
  const [category, setCategory] = useState<ProductType>("drink");
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ purpose: "", frequency: "", intensity: "", conditions: [] });
  const [result, setResult] = useState<RecommendResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const productCount =
    category === "bar" ? barCount : category === "yogurt" ? yogurtCount : drinkCount;
  const productLabel = getCategoryLabel(category);

  function reset() {
    setStep(0);
    setAnswers({ purpose: "", frequency: "", intensity: "", conditions: [] });
    setResult(null);
    setError(null);
  }

  function handleCategoryChange(c: ProductType) {
    setCategory(c);
    reset();
  }

  async function submitQuiz() {
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
      if ("error" in data) {
        setError(String(data.error));
      } else {
        setResult(data);
      }
    } catch (e) {
      setError(String(e));
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* 히어로 영역 */}
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl" style={{ fontWeight: 700 }}>
            제품 추천
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            4가지 질문으로 나에게 맞는 단백질 제품을 추천해드립니다. 목적·운동량·선호 조건을 선택하세요.
          </p>
        </div>
      </section>

      <div className="min-h-[70vh] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">

          {/* 음료/바 토글 */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <button type="button" onClick={() => handleCategoryChange("drink")} className="rounded-full px-4 py-2 text-sm font-semibold transition-colors" style={{
              background: category === "drink" ? "var(--accent)" : "#fff",
              color: category === "drink" ? "#fff" : "#374151",
              border: "1px solid var(--border)",
            }}>
              단백질 음료
            </button>
            <button type="button" onClick={() => handleCategoryChange("bar")} className="rounded-full px-4 py-2 text-sm font-semibold transition-colors" style={{
              background: category === "bar" ? "var(--accent)" : "#fff",
              color: category === "bar" ? "#fff" : "#374151",
              border: "1px solid var(--border)",
            }}>
              단백질 바
            </button>
            <button type="button" onClick={() => handleCategoryChange("yogurt")} className="rounded-full px-4 py-2 text-sm font-semibold transition-colors" style={{
              background: category === "yogurt" ? "var(--accent)" : "#fff",
              color: category === "yogurt" ? "#fff" : "#374151",
              border: "1px solid var(--border)",
            }}>
              단백질 요거트
            </button>
          </div>

          {/* STEP 0: 시작 화면 */}
          {step === 0 && (
            <div className="max-w-lg mx-auto">
            <div className="fade-in text-center py-12">
              <span className="inline-block text-sm font-semibold px-4 py-1.5 mb-6" style={{
                background: "var(--accent-light)", color: "var(--accent)", borderRadius: "20px",
              }}>
                💪 맞춤 추천
              </span>
              <h2 className="text-3xl font-extrabold mb-4 leading-tight" style={{ color: "#1a1a1a" }}>
                나에게 맞는<br />{productLabel} 찾기
              </h2>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "#6b6b6b" }}>
                4가지 질문으로 {productCount}개 제품 중 최적의 {category === "drink" ? "RTD 단백질 음료" : productLabel}를 추천해드려요
              </p>
              <button onClick={() => setStep(1)} className="inline-block px-8 py-3 text-base font-semibold rounded-full hover:opacity-90 transition-opacity" style={{
                background: "var(--accent)", color: "white",
              }}>
                시작하기 →
              </button>
              <div className="flex justify-center gap-6 mt-10 text-sm" style={{ color: "#6b6b6b" }}>
                <span>💪 {productCount}개 제품</span>
                <span>⭐ 등급 기반</span>
                <span>📊 성분 비교</span>
              </div>
            </div>
            </div>
          )}

          {/* STEP 1~4: 퀴즈 */}
          {(step === 1 || step === 2 || step === 3 || step === 4) && (
            <div className="max-w-lg mx-auto">
            <div key={step} className="fade-in">
              <ProgressBar step={step as number} />
              <div className="p-6 space-y-5" style={{ background: "#fff", border: "1px solid #e8e6e3", borderRadius: "12px" }}>

                {step === 1 && (
                  <>
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>STEP 1 / 4</p>
                      <p className="text-lg font-bold" style={{ color: "#1a1a1a" }}>주로 어떤 목적으로 {productLabel}를 찾으시나요?</p>
                    </div>
                    <div className="space-y-2.5">
                      {PURPOSE_OPTIONS.map((o) => (
                        <OptionButton key={o.value} {...o} selected={answers.purpose === o.value} onClick={() => setAnswers({ ...answers, purpose: o.value })} />
                      ))}
                    </div>
                    <NextButton label="다음 →" disabled={!answers.purpose} onClick={() => setStep(2)} />
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>STEP 2 / 4</p>
                      <p className="text-lg font-bold" style={{ color: "#1a1a1a" }}>운동을 얼마나 자주 하시나요?</p>
                    </div>
                    <div className="space-y-2.5">
                      {FREQUENCY_OPTIONS.map((o) => (
                        <OptionButton key={o.value} {...o} selected={answers.frequency === o.value} onClick={() => setAnswers({ ...answers, frequency: o.value })} />
                      ))}
                    </div>
                    <NextButton label="다음 →" disabled={!answers.frequency} onClick={() => setStep(3)} />
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>STEP 3 / 4</p>
                      <p className="text-lg font-bold" style={{ color: "#1a1a1a" }}>운동 강도는 어느 정도인가요?</p>
                    </div>
                    <div className="space-y-2.5">
                      {INTENSITY_OPTIONS.map((o) => (
                        <OptionButton key={o.value} {...o} selected={answers.intensity === o.value} onClick={() => setAnswers({ ...answers, intensity: o.value })} />
                      ))}
                    </div>
                    <NextButton label="다음 →" disabled={!answers.intensity} onClick={() => setStep(4)} />
                  </>
                )}

                {step === 4 && (
                  <>
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>STEP 4 / 4</p>
                      <p className="text-lg font-bold" style={{ color: "#1a1a1a" }}>중요하게 생각하는 조건을 선택해주세요</p>
                      <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>복수 선택 가능</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {CONDITION_OPTIONS.map((o) => (
                        <GridOption key={o.value} {...o} selected={answers.conditions.includes(o.value)} onClick={() => {
                          setAnswers((prev) => ({
                            ...prev,
                            conditions: prev.conditions.includes(o.value)
                              ? prev.conditions.filter((c) => c !== o.value)
                              : [...prev.conditions, o.value],
                          }));
                        }} />
                      ))}
                    </div>
                    <NextButton label="결과 보기" disabled={false} onClick={submitQuiz} />
                  </>
                )}

                {/* 이전으로 버튼 */}
                {(step === 2 || step === 3 || step === 4) && (
                  <button onClick={() => setStep((s) => ((s as number) - 1) as Step)} className="text-xs transition-colors hover:opacity-70" style={{ color: "#9ca3af" }}>
                    ← 이전으로
                  </button>
                )}
              </div>
            </div>
            </div>
          )}

          {/* 로딩 화면 */}
          {step === "loading" && (
            <div className="max-w-lg mx-auto">
            <div className="fade-in" style={{ background: "#fff", border: "1px solid #e8e6e3", borderRadius: "12px" }}>
              <LoadingScreen onDone={() => setStep("result")} />
            </div>
            </div>
          )}

          {/* 결과 화면 */}
          {step === "result" && (
            error ? (
              <div className="fade-in text-center p-8" style={{ background: "#fff", border: "1px solid #e8e6e3", borderRadius: "12px" }}>
                <p className="text-2xl mb-3">😅</p>
                <p className="text-base font-bold mb-2" style={{ color: "#1a1a1a" }}>추천 결과를 불러오지 못했어요</p>
                <p className="text-xs mb-5" style={{ color: "#9ca3af" }}>{error}</p>
                <button onClick={reset} className="px-6 py-2.5 text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity" style={{
                  background: "var(--accent)", color: "white",
                }}>
                  처음으로
                </button>
              </div>
            ) : result ? (
              <ResultScreen result={result} onReset={reset} category={category} />
            ) : (
              <div className="fade-in text-center py-12">
                <div className="mx-auto" style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "3px solid #e8e6e3", borderTopColor: "var(--accent)",
                  animation: "spin 0.8s linear infinite",
                }} />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
