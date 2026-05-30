"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HomeTrackedLink from "./HomeTrackedLink";

export type CarouselProduct = {
  slug: string;
  name: string;
  brand: string;
  proteinPerServing: number;
  sugar?: number | null;
  calories?: number | null;
  imageUrl: string | null;
  gradeTags?: string[];
};

type CategoryKey = "drink" | "bar" | "yogurt" | "shake";

const TABS: { key: CategoryKey; label: string; emoji: string; href: string }[] = [
  { key: "drink", label: "음료", emoji: "🥤", href: "/drink" },
  { key: "bar", label: "바", emoji: "🍫", href: "/bars" },
  { key: "yogurt", label: "요거트", emoji: "🥛", href: "/yogurt" },
  { key: "shake", label: "쉐이크", emoji: "🧃", href: "/shake" },
];

const RANK_COLORS = ["#C59B0A", "#7A8C8D", "#8C6548", "#2E6B4F", "#2E6B4F", "#2E6B4F"];

interface Props {
  products: Record<CategoryKey, CarouselProduct[]>;
}

function GradeTag({ tag }: { tag: string }) {
  const label = tag.startsWith("밀도 ") ? tag.replace("밀도 ", "단백질 밀도 ") : tag;
  const isPerformance = tag.includes("퍼포먼스") || tag.includes("A등급");
  const isDiet = tag.includes("다이어트") || tag.includes("저당");
  return (
    <span
      className="inline-flex shrink-0 rounded-full px-1.5 py-px text-[9px] font-semibold"
      style={{
        background: isPerformance ? "#DFF0E8" : isDiet ? "#DFE8F4" : "#EEE8E0",
        color: isPerformance ? "#1A5E3A" : isDiet ? "#2A4B7A" : "#6B5A3A",
        border: `1px solid ${isPerformance ? "#C0DDD0" : isDiet ? "#C0CEDF" : "#DDD0C0"}`,
      }}
    >
      {label}
    </span>
  );
}

export default function HomePopularCarousel({ products }: Props) {
  const [tabIdx, setTabIdx] = useState(0);

  const handleTabClick = (idx: number) => {
    setTabIdx(idx);
  };

  const curTab = TABS[tabIdx];
  const curProducts = products[curTab.key] ?? [];

  return (
    <div>
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2
          className="font-extrabold"
          style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#1A2B1E", letterSpacing: "-0.02em" }}
        >
          이번 주 인기 제품
        </h2>
        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex gap-1">
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabClick(i)}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all"
                style={
                  tabIdx === i
                    ? { background: "#1F5A3D", color: "#fff", boxShadow: "0 2px 6px rgba(31,90,61,0.20)" }
                    : { background: "#FFFDF7", color: "#5E6E61", border: "1px solid #E4D9CC" }
                }
              >
                <span style={{ fontSize: "12px" }}>{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
          <Link href={curTab.href} className="shrink-0 text-[11px] font-bold" style={{ color: "#1F5A3D" }}>
            전체 보기 →
          </Link>
        </div>
      </div>

      {/* Horizontal snap-scroll — 5 cards visible on desktop, ~2.3 on mobile */}
      <div
        className="flex gap-2"
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "4px",
        } as React.CSSProperties}
      >
        {curProducts.map((product, i) => {
          const rank = i + 1;
          const visibleGradeTags = (product.gradeTags ?? []).slice(0, 2);

          return (
            <HomeTrackedLink
              key={product.slug}
              href={`/product/${product.slug}`}
              eventName="home_popular_product_click"
              eventParams={{
                product_name: product.name,
                brand_name: product.brand,
                category: curTab.key,
                rank,
                destination_url: `/product/${product.slug}`,
              }}
              className="group flex flex-col overflow-hidden rounded-[16px] border transition-all duration-150 hover:-translate-y-0.5 hover:border-[#1F5A3D]/20 hover:shadow-[0_8px_24px_rgba(31,90,61,0.10)]"
              style={{
                width: "clamp(148px, calc(20% - 7px), 200px)",
                minWidth: "clamp(148px, calc(20% - 7px), 200px)",
                maxWidth: "clamp(148px, calc(20% - 7px), 200px)",
                flexShrink: 0,
                scrollSnapAlign: "start",
                background: "#FFFDF7",
                borderColor: "#E6DDCC",
                boxShadow: "0 2px 8px rgba(31,90,61,0.06)",
              }}
            >
              {/* Image — white background required */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  background: "#FFFFFF",
                  height: 120,
                  borderBottom: "1px solid #EAE4D8",
                  flexShrink: 0,
                }}
              >
                {/* Rank badge */}
                <div
                  className="absolute left-2 top-2 flex items-center justify-center rounded-full font-extrabold text-white"
                  style={{
                    width: 20,
                    height: 20,
                    background: RANK_COLORS[rank - 1] ?? "#2E6B4F",
                    fontSize: "9px",
                  }}
                >
                  {rank}
                </div>
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={`${product.brand} ${product.name}`}
                    width={80}
                    height={100}
                    style={{
                      maxHeight: "100px",
                      maxWidth: "80%",
                      width: "auto",
                      objectFit: "contain",
                    }}
                    unoptimized
                  />
                ) : (
                  <span style={{ fontSize: "28px" }}>🥤</span>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-3">
                {/* Brand */}
                <p
                  className="truncate text-[10px] font-semibold"
                  style={{ color: "#7a7a7a" }}
                >
                  {product.brand}
                </p>

                {/* Name */}
                <p
                  className="mt-0.5 line-clamp-2 font-bold leading-snug"
                  style={{ fontSize: "11px", color: "#1a1a1a", height: "30px", overflow: "hidden" }}
                >
                  {product.name}
                </p>

                {/* Grade badges — always rendered to keep uniform height */}
                <div className="mt-1.5 flex gap-1 overflow-hidden" style={{ height: "18px", flexWrap: "nowrap" }}>
                  {visibleGradeTags.map((tag) => (
                    <GradeTag key={tag} tag={tag} />
                  ))}
                </div>

                {/* Nutrition — 3-col */}
                <div
                  className="mt-2 grid grid-cols-3 divide-x divide-[#EAE4D8] rounded-[8px] border text-center"
                  style={{ borderColor: "#EAE4D8" }}
                >
                  <div className="py-1.5">
                    <p className="text-[10px] font-extrabold" style={{ color: "#1F5A3D" }}>
                      {product.proteinPerServing}g
                    </p>
                    <p className="text-[9px]" style={{ color: "#9AA39C" }}>단백질</p>
                  </div>
                  <div className="py-1.5">
                    <p className="text-[10px] font-extrabold" style={{ color: "#3d3d3d" }}>
                      {product.sugar != null ? `${product.sugar}g` : "—"}
                    </p>
                    <p className="text-[9px]" style={{ color: "#9AA39C" }}>당류</p>
                  </div>
                  <div className="py-1.5">
                    <p className="text-[10px] font-extrabold" style={{ color: "#3d3d3d" }}>
                      {product.calories != null ? product.calories : "—"}
                    </p>
                    <p className="text-[9px]" style={{ color: "#9AA39C" }}>kcal</p>
                  </div>
                </div>

                {/* CTA — single, unified */}
                <p
                  className="mt-2 text-center text-[10px] font-bold transition-colors group-hover:text-[#1F5A3D]"
                  style={{ color: "#B0B8B2" }}
                >
                  자세히 보기 →
                </p>
              </div>
            </HomeTrackedLink>
          );
        })}
      </div>

      {/* Tab dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {TABS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleTabClick(i)}
            aria-label={`${TABS[i].label} 탭`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === tabIdx ? 18 : 5,
              height: 5,
              background: i === tabIdx ? "#1F5A3D" : "#D5CFC7",
            }}
          />
        ))}
      </div>
    </div>
  );
}
