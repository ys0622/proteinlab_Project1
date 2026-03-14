"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductDetailProps } from "../data/products";
import ScoredProductCard from "../components/ScoredProductCard";

type ProductType = "drink" | "bar" | "yogurt";
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
  { id: "yogurt", label: "단백질 요거트" },
];

const METRICS: { id: GradeMetric; label: string }[] = [
  { id: "density", label: "단백질 밀도" },
  { id: "diet", label: "다이어트" },
  { id: "performance", label: "퍼포먼스" },
];

function getMetricGuide(metric: GradeMetric) {
  return metric === "diet" ? "낮을수록 유리한 값을 100점 기준으로 환산" : "높을수록 유리한 값을 100점 기준으로 환산";
}

export default function RankingClient({ rankings }: RankingClientProps) {
  const [productType, setProductType] = useState<ProductType>("drink");
  const [metric, setMetric] = useState<GradeMetric>("density");

  const items = rankings[productType][metric];
  const metricLabel = METRICS.find((item) => item.id === metric)?.label ?? "점수";

  return (
    <>
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold md:text-3xl" style={{ color: "#1a1a1a", fontWeight: 700 }}>
            등급 랭킹
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            단백질 밀도, 다이어트, 퍼포먼스 점수를 모두 100점 기준으로 비교합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
        <div className="flex gap-2">
          {PRODUCT_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setProductType(item.id);
                setMetric("density");
              }}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: productType === item.id ? "var(--accent)" : "white",
                color: productType === item.id ? "white" : "#6b6b6b",
                border: productType === item.id ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-6 border-b border-[#e8e6e3]">
          {METRICS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMetric(item.id)}
              className="relative pb-3 text-sm font-semibold transition-colors"
              style={{ color: metric === item.id ? "var(--accent)" : "#999" }}
            >
              {item.label}
              {metric === item.id ? (
                <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "var(--accent)" }} />
              ) : null}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-[#999]">
          {getMetricGuide(metric)} · 총 {items.length}개 제품
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
          {items.map((item) => (
            <ScoredProductCard
              key={item.product.slug}
              product={item.product}
              rank={item.rank}
              score={item.score}
              metricLabel={metricLabel}
              grade={item.grade}
              scoreCaption="100점 환산"
              compact
            />
          ))}
        </div>

        <div className="mt-4 hidden md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-4">
          {items.map((item) => (
            <ScoredProductCard
              key={item.product.slug}
              product={item.product}
              rank={item.rank}
              score={item.score}
              metricLabel={metricLabel}
              grade={item.grade}
              scoreCaption="100점 환산"
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/grade-criteria" className="text-sm text-[var(--accent)] hover:underline">
            등급 산정 기준 보기 →
          </Link>
        </div>
      </main>
    </>
  );
}
