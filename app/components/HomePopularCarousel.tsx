"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ProductCardProps } from "../data/productTypes";
import ProductCard from "./ProductCard";

export type CarouselProduct = ProductCardProps & { rank?: number };

type CategoryKey = "drink" | "bar" | "yogurt" | "shake";

const TABS: { key: CategoryKey; label: string; href: string }[] = [
  { key: "drink", label: "음료", href: "/drinks" },
  { key: "bar", label: "바", href: "/bars" },
  { key: "yogurt", label: "요거트", href: "/yogurt" },
  { key: "shake", label: "쉐이크", href: "/shake" },
];

interface Props {
  products: Record<CategoryKey, CarouselProduct[]>;
}

const VISIBLE_COUNT = 4;
const MAX_PRODUCTS = 10;

export default function HomePopularCarousel({ products }: Props) {
  const [tabIdx, setTabIdx] = useState(0);
  const tabIdxRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);

  const handleTabClick = (idx: number) => {
    tabIdxRef.current = idx;
    setTabIdx(idx);
    stepRef.current = 0;
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const curTab = TABS[tabIdx];
  const curProducts = (products[curTab.key] ?? []).slice(0, MAX_PRODUCTS);
  const stepCount = Math.max(curProducts.length - VISIBLE_COUNT + 1, 1);

  // 한 카테고리의 스크롤 사이클이 전부 끝난 뒤에만 다음 카테고리로 전환한다.
  useEffect(() => {
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      if (stepRef.current + 1 >= stepCount) {
        stepRef.current = 0;
        track.scrollTo({ left: 0, behavior: "smooth" });
        const nextTab = (tabIdxRef.current + 1) % TABS.length;
        tabIdxRef.current = nextTab;
        setTabIdx(nextTab);
        return;
      }

      const next = stepRef.current + 1;
      stepRef.current = next;
      const cardWidth = track.scrollWidth / curProducts.length;
      track.scrollTo({ left: next * cardWidth, behavior: "smooth" });
    }, 3500);
    return () => clearInterval(id);
  }, [curProducts.length, stepCount, tabIdx]);

  return (
    <div>
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2
          className="font-extrabold text-[17px] md:text-[24px]"
          style={{ color: "#1A2B1E", letterSpacing: "-0.02em" }}
        >
          이번 주 인기 제품
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabClick(i)}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all"
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

      {/* 4개씩 노출, 10위까지 자동 스크롤 */}
      <div
        ref={trackRef}
        className="flex gap-3"
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "6px",
        } as React.CSSProperties}
      >
        {curProducts.map((product, i) => {
          const rank = i + 1;
          return (
            <div
              key={product.slug ?? i}
              className="relative w-[calc((100%-12px)/2)] shrink-0 md:w-[calc((100%-36px)/4)]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Rank badge */}
              <div
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
                {rank}<span style={{ fontSize: "9px", fontWeight: 700, opacity: 0.85 }}>위</span>
              </div>
              <ProductCard
                {...product}
                productType={curTab.key}
                priority={rank <= 3}
                maxVisibleBadges={3}
                fixedTitleLines={2}
                hideSupplementalBadges
                coupangOnly
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
