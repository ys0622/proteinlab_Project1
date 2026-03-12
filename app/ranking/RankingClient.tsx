"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductDetailProps } from "../data/products";
import ProductCard from "../components/ProductCard";

type ProductType = "drink" | "bar";
type GradeMetric = "density" | "diet" | "performance";

interface RankingItem {
  product: ProductDetailProps;
  score: number;
  grade: string;
  rank: number;
}

interface RankingClientProps {
  rankings: Record<ProductType, Record<GradeMetric, RankingItem[]>>;
}

const PRODUCT_TYPES: { id: ProductType; label: string }[] = [
  { id: "drink", label: "단백질 음료" },
  { id: "bar", label: "단백질 바" },
];

const METRICS: { id: GradeMetric; label: string }[] = [
  { id: "density", label: "단백질 밀도" },
  { id: "diet", label: "다이어트" },
  { id: "performance", label: "퍼포먼스" },
];

const GRADE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  A: { bg: "#E7F3EC", color: "#1B7F5B", border: "#1B7F5B" },
  B: { bg: "#EAF2FF", color: "#4C7BD9", border: "#4C7BD9" },
  C: { bg: "#FFF1E6", color: "#F08A24", border: "#F08A24" },
  D: { bg: "#f3f3f3", color: "#999", border: "#bbb" },
};

function RankingResultCard({
  item,
  metric,
  compact = false,
}: {
  item: RankingItem;
  metric: GradeMetric;
  compact?: boolean;
}) {
  const { product, score, grade, rank } = item;
  const gc = GRADE_COLORS[grade] ?? GRADE_COLORS.D;

  const formatScore = (s: number, m: GradeMetric) => {
    if (m === "density") return `${s.toFixed(1)}g/100mL`;
    if (m === "diet") return `${s.toFixed(0)}점`;
    return s.toFixed(2);
  };

  const metricLabel = metric === "density" ? "단백질 밀도" : metric === "diet" ? "다이어트" : "퍼포먼스";

  return (
    <div className="min-w-0">
      <div className={`mb-2 rounded-xl border border-[#e8e6e3] bg-[#faf8f2] ${compact ? "px-2.5 py-2" : "px-3 py-2.5"}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`inline-flex items-center justify-center rounded-full font-extrabold ${compact ? "h-6 min-w-6 px-1.5 text-[11px]" : "h-7 min-w-7 px-2 text-xs"}`}
              style={{
                background: rank <= 3 ? "var(--accent)" : "#f3f4f6",
                color: rank <= 3 ? "#fff" : "#6b7280",
              }}
            >
              {rank}
            </span>
            <span className={`${compact ? "text-[11px]" : "text-xs"} font-semibold text-[#6b7280] whitespace-nowrap`}>
              {rank}위
            </span>
          </div>
          <span className={`${compact ? "text-[13px]" : "text-sm"} font-extrabold whitespace-nowrap`} style={{ color: gc.color }}>
            {formatScore(score, metric)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#ece7dd] pt-2">
          <span className={`${compact ? "text-[11px]" : "text-xs"} min-w-0 font-semibold text-[#374151] whitespace-nowrap`}>
            {metricLabel}
          </span>
          <span
            className={`${compact ? "text-[11px]" : "text-xs"} shrink-0 rounded-full px-2.5 py-1 font-bold whitespace-nowrap`}
            style={{ background: gc.bg, color: gc.color, border: `1px solid ${gc.border}` }}
          >
            {grade} 등급
          </span>
        </div>
      </div>
      <ProductCard {...product} />
    </div>
  );
}

export default function RankingClient({ rankings }: RankingClientProps) {
  const [productType, setProductType] = useState<ProductType>("drink");
  const [metric, setMetric] = useState<GradeMetric>("density");

  const items = rankings[productType][metric];
  const sortDesc = metric === "diet" ? "낮을수록 좋음" : "높을수록 좋음";

  return (
    <>
      {/* 히어로 */}
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1
            className="text-2xl font-bold md:text-3xl"
            style={{ color: "#1a1a1a", fontWeight: 700 }}
          >
            등급 랭킹
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            단백질 밀도 · 다이어트 · 퍼포먼스 기준 A–D 등급 (전체 제품 대비 상대 평가)
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
        {/* 단백질 음료/바 토글 */}
        <div className="flex gap-2">
          {PRODUCT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setProductType(t.id);
                setMetric("density");
              }}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: productType === t.id ? "var(--accent)" : "white",
                color: productType === t.id ? "white" : "#6b6b6b",
                border: productType === t.id ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 언더라인 탭 */}
        <div className="mt-4 flex gap-6 border-b border-[#e8e6e3]">
          {METRICS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMetric(m.id)}
              className="relative pb-3 text-sm font-semibold transition-colors"
              style={{ color: metric === m.id ? "var(--accent)" : "#999" }}
            >
              {m.label}
              {metric === m.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs" style={{ color: "#999" }}>
          {sortDesc} · 총 {items.length}개 제품
        </p>

        {/* 제품 카드 그리드 */}
        <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
          {items.map((item) => (
            <RankingResultCard key={item.product.slug} item={item} metric={metric} compact />
          ))}
        </div>

        <div className="mt-4 hidden md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-4">
          {items.map((item) => (
            <RankingResultCard key={item.product.slug} item={item} metric={metric} />
          ))}
        </div>

        {/* 등급 기준 링크 */}
        <div className="mt-8 text-center">
          <Link
            href="/grade-criteria"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            등급 산정 기준 보기 →
          </Link>
        </div>
      </main>
    </>
  );
}
