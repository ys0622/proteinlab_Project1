"use client";

import { useState } from "react";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import type { ProductDetailProps } from "../data/products";
import CategoryTabs from "../components/CategoryTabs";
import ScoredProductCard from "../components/ScoredProductCard";
import TrackedLink from "../components/TrackedLink";
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
      return "칼로리 대비 단백질 함량이 높은 쉐이크를 먼저 보고 싶을 때 확인하면 좋습니다.";
    }
    if (metric === "diet") {
      return "당류, 칼로리, 단백질 균형을 함께 반영한 다이어트 중심 점수입니다.";
    }
    return "단백질 총량과 밀도를 중심으로 운동 직후 보충 효율을 계산한 점수입니다.";
  }

  return metric === "diet"
    ? "점수가 높을수록 다이어트 기준에서 더 유리한 제품입니다."
    : "점수가 높을수록 해당 기준에서 더 유리한 제품입니다.";
}

function getCategoryRankingDescription(productType: ProductCategory, metric: GradeMetric) {
  if (productType === "shake") {
    if (metric === "density") {
      return "쉐이크는 칼로리 대비 단백질 함량 차이가 커서, 같은 파우치형이어도 실제 체감이 크게 갈립니다.";
    }
    if (metric === "diet") {
      return "쉐이크 다이어트 점수는 당류뿐 아니라 칼로리, 단백질, 포만감 균형까지 함께 봅니다.";
    }
    return "쉐이크 퍼포먼스 점수는 단백질 총량과 밀도를 기준으로 운동 후 보충 효율을 계산합니다.";
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
        className="w-full border-b border-t"
        style={{ background: "#FAF8F3", borderColor: "#E7DFC9" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold md:text-3xl" style={{ color: "#16412D", fontWeight: 700 }}>
            단백질 제품 순위
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            {getCategoryRankingDescription(productType, metric)}
          </p>
          <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
            판매량이나 구매 건수 순위가 아닌 등록된 영양성분 기준의 객관적 비교입니다. 행동 기반 관심도는 실시간 인기에서 별도로 확인할 수 있습니다.
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

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e8e6e3] bg-[#fafaf8] px-4 py-3 text-xs leading-5 text-[var(--foreground-muted)]">
          <p>
            기준: 등록 제품의 단백질·당류·칼로리·단백질 밀도 · 행동 데이터 미사용
          </p>
          <TrackedLink
            href="/trending"
            trackingLabel="실시간 인기 순위 보기"
            trackingSection="ranking_methodology"
            trackingPageType="ranking"
            className="shrink-0 font-semibold text-[#16412D] hover:underline"
          >
            실시간 인기 보기
          </TrackedLink>
        </div>

        <div className="flex gap-2 rounded-[10px] border border-[#DCE6DE] bg-[#F5F8F5] p-1.5">
          {METRICS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMetric(item.id)}
              className="relative rounded-[8px] px-3 py-2 text-sm font-semibold transition-colors"
              style={{
                color: metric === item.id ? "#16412D" : "#6b7280",
                background: metric === item.id ? "#E8F0EA" : "transparent",
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
              {getCategoryLabel(productType)} 순위 데이터가 아직 없습니다.
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
      </main>
    </>
  );
}
