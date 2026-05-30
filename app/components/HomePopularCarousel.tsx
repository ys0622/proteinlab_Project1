"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProductCardProps } from "../data/productTypes";
import ProductCard from "./ProductCard";

export type CarouselProduct = ProductCardProps & { rank?: number };

type CategoryKey = "drink" | "bar" | "yogurt" | "shake";

const TABS: { key: CategoryKey; label: string; emoji: string; href: string }[] = [
  { key: "drink", label: "음료", emoji: "🥤", href: "/drink" },
  { key: "bar", label: "바", emoji: "🍫", href: "/bars" },
  { key: "yogurt", label: "요거트", emoji: "🥛", href: "/yogurt" },
  { key: "shake", label: "쉐이크", emoji: "🧃", href: "/shake" },
];

const RANK_COLORS = ["#C59B0A", "#7A8C8D", "#8C6548", "#2E6B4F", "#2E6B4F", "#2E6B4F", "#2E6B4F", "#2E6B4F", "#2E6B4F", "#2E6B4F"];

interface Props {
  products: Record<CategoryKey, CarouselProduct[]>;
}

export default function HomePopularCarousel({ products }: Props) {
  const [tabIdx, setTabIdx] = useState(0);

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
          <div className="flex gap-1">
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setTabIdx(i)}
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

      {/* Horizontal snap-scroll */}
      <div
        className="flex gap-3"
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "6px",
          alignItems: "stretch",
        } as React.CSSProperties}
      >
        {curProducts.map((product, i) => {
          const rank = i + 1;
          return (
            <div
              key={product.slug ?? i}
              className="relative shrink-0"
              style={{
                width: "clamp(160px, calc(20% - 10px), 220px)",
                scrollSnapAlign: "start",
              }}
            >
              {/* Rank badge */}
              <div
                className="absolute left-2 top-2 z-10 flex items-center justify-center rounded-full font-extrabold text-white"
                style={{
                  width: 22,
                  height: 22,
                  background: RANK_COLORS[rank - 1] ?? "#2E6B4F",
                  fontSize: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                }}
              >
                {rank}
              </div>
              <ProductCard
                {...product}
                productType={curTab.key}
                priority={rank <= 3}
                maxVisibleBadges={2}
                fixedTitleLines={2}
                hideSupplementalBadges
              />
            </div>
          );
        })}
      </div>

      {/* Tab dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {TABS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setTabIdx(i)}
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
