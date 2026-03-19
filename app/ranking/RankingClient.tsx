"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductDetailProps } from "../data/products";
import CategoryTabs from "../components/CategoryTabs";
import ScoredProductCard from "../components/ScoredProductCard";
import { getCategoryLabel, type ProductCategory } from "../lib/categories";

type GradeMetric = "density" | "diet" | "performance";

interface RankingItem {
  product: ProductDetailProps;
  score: number;
  grade: string;
  rank: number;
}

interface RankingClientProps {
  rankings: Record<ProductCategory, Record<GradeMetric, RankingItem[]>>;
}

const METRICS: { id: GradeMetric; label: string }[] = [
  { id: "density", label: "단백질 밀도" },
  { id: "diet", label: "다이어트" },
  { id: "performance", label: "퍼포먼스" },
];

function getMetricGuide(metric: GradeMetric) {
  return metric === "diet"
    ? "낮을수록 유리한 값을 100점 기준으로 환산"
    : "높을수록 유리한 값을 100점 기준으로 환산";
}

export default function RankingClient({ rankings }: RankingClientProps) {
  const [productType, setProductType] = useState<ProductCategory>("drink");
  const [metric, setMetric] = useState<GradeMetric>("density");

  const items = rankings[productType][metric];
  const metricLabel = METRICS.find((item) => item.id === metric)?.label ?? "점수";
  const categoryCounts = {
    drink: rankings.drink.density.length,
    bar: rankings.bar.density.length,
    yogurt: rankings.yogurt.density.length,
    shake: rankings.shake.density.length,
  };

  return (
    <>
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold md:text-3xl" style={{ color: "#1a1a1a", fontWeight: 700 }}>
            등급 순위
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            단백질 밀도, 다이어트, 퍼포먼스 점수를 모두 100점 기준으로 비교합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
        <CategoryTabs
          activeCategory={productType}
          counts={categoryCounts}
          onSelect={(category) => {
            setProductType(category);
            setMetric("density");
          }}
          stickyMobile
          className="mb-4"
        />

        <div className="flex gap-2 rounded-2xl border border-[#dce8df] bg-[#f4faf5] p-1.5">
          {METRICS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMetric(item.id)}
              className="relative rounded-xl px-3 py-2 text-sm font-semibold transition-colors"
              style={{
                color: metric === item.id ? "#24543d" : "#6b7280",
                background: metric === item.id ? "#e7f3ec" : "transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-[#999]">
          {getMetricGuide(metric)} · 총 {items.length}개 제품
        </p>

        {items.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] px-5 py-10 text-center">
            <p className="text-base font-semibold text-[var(--foreground)]">
              {getCategoryLabel(productType)} 랭킹 데이터가 아직 없습니다.
            </p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              카테고리 구조는 반영되어 있고, 제품 데이터가 추가되면 같은 기준으로 랭킹이 계산됩니다.
            </p>
          </div>
        ) : (
          <>
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
          </>
        )}

        <div className="mt-8 text-center">
          <Link href="/grade-criteria" className="text-sm text-[var(--accent)] hover:underline">
            등급 산정 기준 보기 →
          </Link>
        </div>
      </main>
    </>
  );
}
