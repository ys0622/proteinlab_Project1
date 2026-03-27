"use client";

import { useState } from "react";
import Link from "next/link";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
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

function getMetricGuide(productType: ProductCategory, metric: GradeMetric) {
  if (productType === "shake") {
    if (metric === "density") {
      return "칼로리 대비 단백질 효율이 높은 쉐이크를 먼저 보고 싶을 때 확인하면 좋습니다.";
    }
    if (metric === "diet") {
      return "당류, 칼로리, 단백질 균형을 함께 반영한 다이어트 중심 점수입니다.";
    }
    return "단백질 총량과 밀도를 중심으로 운동 직후 보충 관점에서 계산했습니다.";
  }

  return metric === "diet"
    ? "점수가 낮을수록 더 유리한 값들을 100점 기준으로 환산한 결과입니다."
    : "점수가 높을수록 더 유리한 값들을 100점 기준으로 환산한 결과입니다.";
}

function getCategoryRankingDescription(productType: ProductCategory, metric: GradeMetric) {
  if (productType === "shake") {
    if (metric === "density") {
      return "쉐이크는 칼로리 대비 단백질 효율 차이가 커서, 같은 파우치형이라도 실제 체감이 크게 갈립니다.";
    }
    if (metric === "diet") {
      return "쉐이크 다이어트 점수는 당류만이 아니라 칼로리, 단백질, 포만감 균형까지 함께 봅니다.";
    }
    return "쉐이크 퍼포먼스 점수는 단백질 총량과 밀도를 기준으로 운동 후 보충 효율을 계산했습니다.";
  }

  return "단백질 밀도, 다이어트, 퍼포먼스 세 기준을 100점 환산으로 비교해 바로 고를 수 있게 정리했습니다.";
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
      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold md:text-3xl" style={{ color: "#1a1a1a", fontWeight: 700 }}>
            단백질 랭킹
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            {getCategoryRankingDescription(productType, metric)}
          </p>
          <AffiliateDisclosure className="mb-0 mt-2" />
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
          {getMetricGuide(productType, metric)} · 총 {items.length}개 제품
        </p>

        {items.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] px-5 py-10 text-center">
            <p className="text-base font-semibold text-[var(--foreground)]">
              {getCategoryLabel(productType)} 랭킹 데이터가 아직 없습니다.
            </p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              제품 데이터가 추가되면 같은 기준으로 자동 계산됩니다.
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
