"use client";

import Link from "next/link";
import { useState } from "react";
import AutoProductCarousel from "./AutoProductCarousel";
import type { ProductCardProps } from "../data/productTypes";
import ProductCard from "./ProductCard";
import type { DiscoveryReason } from "../lib/homeDiscovery";

export type CarouselProduct = ProductCardProps & { rank?: number; discoveryReason?: DiscoveryReason };

type CategoryKey = "drink" | "bar" | "yogurt" | "shake";

const TABS: { key: CategoryKey; label: string; href: string }[] = [
  { key: "drink", label: "음료", href: "/drinks" },
  { key: "bar", label: "바", href: "/bars" },
  { key: "yogurt", label: "요거트", href: "/yogurt" },
  { key: "shake", label: "쉐이크", href: "/shake" },
];

interface Props {
  products: Record<CategoryKey, CarouselProduct[]>;
  available: boolean;
}

const MAX_PRODUCTS = 10;

export default function HomePopularCarousel({ products, available }: Props) {
  const [tabIdx, setTabIdx] = useState(0);

  const handleTabClick = (idx: number) => {
    setTabIdx(idx);
  };

  const curTab = TABS[tabIdx];
  const curProducts = (products[curTab.key] ?? []).slice(0, MAX_PRODUCTS);

  return (
    <div>
      {/* Header */}
      <div className="mb-1 flex items-center justify-between gap-2 md:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <h2
            className="shrink-0 font-extrabold text-[15px] md:text-[24px]"
            style={{ color: "#1A2B1E", letterSpacing: "-0.02em" }}
          >
            지금 인기 제품
          </h2>
          <span className="rounded-full bg-[#EEF3EF] px-2 py-0.5 text-[10px] font-bold text-[#5E6E61] md:text-[11px]">
            {curTab.label}
          </span>
        </div>
        <Link href="/trending" className="shrink-0 text-[10px] font-bold md:text-[11px]" style={{ color: "#1F5A3D" }}>
          전체 순위 →
        </Link>
      </div>
      <div className="mb-3 hidden flex-nowrap items-center justify-between gap-2 md:flex">
        <h2 className="shrink-0 text-[24px] font-extrabold" style={{ color: "#1A2B1E", letterSpacing: "-0.02em" }}>
          지금 인기 제품
        </h2>
        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <div className="flex gap-1">
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabClick(i)}
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold transition-all"
                style={
                  tabIdx === i
                    ? { background: "#1F5A3D", color: "#fff", boxShadow: "0 2px 6px rgba(31,90,61,0.20)" }
                    : { background: "#FFFDF7", color: "#5E6E61", border: "1px solid #E4D9CC" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link href={curTab.href} className="shrink-0 text-[11px] font-bold" style={{ color: "#1F5A3D" }}>
            전체 보기 →
          </Link>
        </div>
      </div>
      {curProducts.length === 0 ? (
        <div className="rounded-xl border border-[#E3E8E4] bg-white px-4 py-6 text-center text-sm text-[#5E6E61]">
          {available ? "최근 7일 조회 기록이 없습니다." : "조회 순위를 잠시 불러올 수 없습니다."}
        </div>
      ) : <AutoProductCarousel key={curTab.key} label="지금 인기 제품">
        {curProducts.map((product, i) => {
          const reasonLabel = product.discoveryReason === "coupang_best" ? "쿠팡 베스트"
            : product.discoveryReason === "recently_added" ? "새로 등록" : null;
          return (
            <div
              key={product.slug ?? i}
              className="home-popular-carousel-card relative flex w-[41.5%] shrink-0 md:w-[calc((100%-36px)/4)]"
              style={{ scrollSnapAlign: "start" }}
            >
              {reasonLabel && <div
                className="absolute left-2 top-2 z-10 flex items-center gap-0.5 rounded-[7px] font-extrabold text-white"
                style={{
                  height: 20,
                  padding: "0 6px",
                  background: "#16412D",
                  fontSize: "11px",
                  letterSpacing: "-0.02em",
                  boxShadow: "0 2px 6px rgba(22,65,45,0.28)",
                }}
              >
                {reasonLabel}
              </div>}
              <ProductCard
                {...product}
                productType={curTab.key}
                priority={i < 3}
                maxVisibleBadges={3}
                fixedTitleLines={2}
                hideSupplementalBadges
                coupangOnly
                analyticsSource={`home_popular_${curTab.key}`}
                analyticsPosition={i + 1}
              />
            </div>
          );
        })}
      </AutoProductCarousel>}

      {/* Mobile category selector */}
      <div className="mt-2 flex items-center justify-center gap-1.5 md:hidden">
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabClick(i)}
            aria-pressed={i === tabIdx}
            className="inline-flex h-7 items-center justify-center rounded-full px-3 text-[10px] font-bold transition-colors"
            style={
              i === tabIdx
                ? { background: "#1F5A3D", color: "#fff" }
                : { background: "#FFFDF7", color: "#5E6E61", border: "1px solid #E4D9CC" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop tab dots — existing desktop UI preserved */}
      <div className="mt-3 hidden items-center justify-center gap-1.5 md:flex">
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
