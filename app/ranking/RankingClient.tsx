"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "../lib/productImage";
import type { ProductDetailProps } from "../data/products";

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

const GRADE_LABELS: Record<string, string> = {
  "밀도": "밀도",
  "다이어트": "다이어트",
  "퍼포먼스": "퍼포먼스",
};

function parseGradeTag(tag: string): { label: string; grade: string } {
  const parts = tag.split(" ");
  const grade = parts.pop() ?? "";
  const label = parts.join(" ");
  return { label, grade };
}

function RankingCard({
  item,
  metric,
}: {
  item: RankingItem;
  metric: GradeMetric;
}) {
  const { product, score, grade, rank } = item;
  const imgUrl = getProductImageUrl(product.slug);
  const gc = GRADE_COLORS[grade] ?? GRADE_COLORS.D;

  const formatScore = (s: number, m: GradeMetric) => {
    if (m === "density") return `${s.toFixed(1)}g/100mL`;
    if (m === "diet") return `${s.toFixed(0)}점`;
    return s.toFixed(2);
  };

  const metricLabel = metric === "density" ? "밀도" : metric === "diet" ? "다이어트" : "퍼포먼스";

  return (
    <div
      className="relative flex flex-col"
      style={{
        border: "1px solid #e8e6e3",
        borderRadius: "16px",
        background: "#FFFDF8",
        overflow: "hidden",
      }}
    >
      {/* 순위 뱃지 */}
      <span
        className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold"
        style={{
          background: rank <= 3 ? "var(--accent)" : "#f3f4f6",
          color: rank <= 3 ? "white" : "#6b7280",
        }}
      >
        {rank}
      </span>

      {/* 현재 메트릭 등급 뱃지 (좌상단) */}
      <span
        className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
        style={{ background: gc.bg, color: gc.color, border: `1.5px solid ${gc.border}` }}
      >
        {metricLabel} {grade}
      </span>

      {/* 이미지 */}
      <Link
        href={`/product/${product.slug}`}
        className="relative flex items-center justify-center border-b border-[#f0eeeb] bg-white"
        style={{ height: "160px" }}
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="200px"
            unoptimized
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </Link>

      {/* 내용 */}
      <div className="flex flex-1 flex-col p-4">
        <p className="truncate text-xs" style={{ color: "#7a7a7a" }}>
          {product.brand}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-0.5 block text-sm font-bold leading-snug line-clamp-2 hover:underline"
          style={{ color: "#1a1a1a" }}
        >
          {product.name}
        </Link>
        <p className="mt-0.5 text-xs" style={{ color: "#999" }}>
          {product.capacity}
        </p>

        {/* 전체 등급 뱃지 */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {(product.gradeTags ?? []).map((tag) => {
            const { label, grade: g } = parseGradeTag(tag);
            const c = GRADE_COLORS[g] ?? GRADE_COLORS.D;
            return (
              <span
                key={tag}
                style={{
                  background: c.bg,
                  color: c.color,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 20,
                }}
              >
                {GRADE_LABELS[label] ?? label} {g}
              </span>
            );
          })}
        </div>

        {/* 핵심 수치 */}
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            { label: "단백질", value: `${product.proteinPerServing}g`, color: "#1B7F5B" },
            { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "—", color: "#6b7280" },
            { label: "당류", value: product.sugar != null ? `${product.sugar}g` : "—", color: product.sugar === 0 ? "#dc2626" : "#f97316" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[#f0eeeb] bg-[#fafaf8] px-2 py-2 text-center"
            >
              <p style={{ fontSize: 16, fontWeight: 800, color: stat.color, lineHeight: 1.2 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 현재 메트릭 점수 */}
        <div
          className="mt-3 flex items-center justify-between rounded-lg px-3 py-2"
          style={{ background: "#EFEDE6" }}
        >
          <span className="text-xs font-medium" style={{ color: "#7a7a7a" }}>
            {metricLabel} 점수
          </span>
          <span className="text-sm font-extrabold" style={{ color: gc.color }}>
            {formatScore(score, metric)}
          </span>
        </div>

        {/* 상세 보기 */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-3 block w-full rounded-lg py-2.5 text-center text-xs font-semibold transition-colors hover:bg-gray-50"
          style={{ border: "1px solid #e8e6e3", background: "#fff", color: "#374151" }}
        >
          상세 보기 →
        </Link>
      </div>
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
                border: productType === t.id ? "none" : "1px solid var(--border)",
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
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <RankingCard key={item.product.slug} item={item} metric={metric} />
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
