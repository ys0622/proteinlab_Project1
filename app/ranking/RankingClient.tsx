"use client";

import { useState } from "react";
import Link from "next/link";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import RelatedLinkCards from "../components/RelatedLinkCards";
import type { ProductDetailProps } from "../data/products";
import CategoryTabs from "../components/CategoryTabs";
import ScoredProductCard from "../components/ScoredProductCard";
import { getCategoryLabel, type ProductCategory } from "../lib/categories";
import { getBrandHubLinks, getRankingHubLinks } from "../lib/trafficLinks";

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
      return "칼로리 대비 단백질 효율이 높은 제품이 위로 올라옵니다";
    }
    if (metric === "diet") {
      return "당류, 칼로리, 밀도, 식이섬유 균형을 반영한 상대 점수입니다";
    }
    return "단백질 함량과 밀도를 중심으로 운동 보충 관점에서 계산합니다";
  }

  return metric === "diet"
    ? "낮을수록 유리한 값을 100점 기준으로 환산"
    : "높을수록 유리한 값을 100점 기준으로 환산";
}

function getCategoryRankingDescription(productType: ProductCategory, metric: GradeMetric) {
  if (productType === "shake") {
    if (metric === "density") {
      return "쉐이크는 칼로리 대비 단백질 효율 차이가 커서 같은 파우치형이라도 만족도가 갈립니다. 밀도 상위권은 운동 보충용으로 비교하기 좋습니다.";
    }
    if (metric === "diet") {
      return "쉐이크의 다이어트 점수는 당류만 보는 방식이 아니라 칼로리, 단백질 밀도, 식이섬유 균형까지 함께 반영합니다.";
    }
    return "쉐이크의 퍼포먼스 점수는 단백질 함량과 밀도를 중심으로 운동 직후 보충 관점에서 계산합니다.";
  }

  return "단백질 밀도, 다이어트, 퍼포먼스 점수를 모두 100점 기준으로 비교합니다.";
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
            {getCategoryRankingDescription(productType, metric)}
          </p>
          <AffiliateDisclosure className="mt-2 mb-0" />
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

        <RelatedLinkCards
          title="순위 다음에 보기 좋은 페이지"
          description="기준 설명, 맞춤 추천, 주제형 랜딩으로 이어지도록 주요 허브를 연결했습니다."
          links={getRankingHubLinks()}
          className="mt-6"
        />

        <RelatedLinkCards
          title="브랜드별로 다시 보기"
          description="상위권 제품을 본 뒤 브랜드 허브에서 같은 브랜드의 다른 제품군까지 이어서 확인할 수 있습니다."
          links={getBrandHubLinks()}
          className="mt-4"
        />

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
