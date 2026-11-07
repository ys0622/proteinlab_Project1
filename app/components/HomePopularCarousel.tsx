"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import AutoProductCarousel from "./AutoProductCarousel";
import type { ProductCardProps } from "../data/productTypes";
import ProductCard from "./ProductCard";
import HomePopularList from "./HomePopularList";
import type { DiscoveryReason } from "../lib/homeDiscovery";

export type CarouselProduct = ProductCardProps & { rank?: number; discoveryReason?: DiscoveryReason };

type CategoryKey = "drink" | "bar" | "yogurt" | "shake" | "soymilk" | "powder";

const TABS: { key: CategoryKey; label: string; href: string }[] = [
  { key: "drink", label: "음료", href: "/drinks" },
  { key: "bar", label: "바", href: "/bars" },
  { key: "yogurt", label: "요거트", href: "/yogurt" },
  { key: "shake", label: "쉐이크", href: "/shake" },
  { key: "soymilk", label: "두유", href: "/soymilk" },
  { key: "powder", label: "파우더", href: "/powder" },
];

interface Props {
  products: Record<CategoryKey, CarouselProduct[]>;
  available: boolean;
}

const MAX_PRODUCTS = 10;
const MOBILE_LIST_COUNT = 5;
// 옆으로 확실히 민 경우만 카테고리를 넘긴다(위아래 스크롤과 헷갈리지 않게).
const SWIPE_MIN_PX = 50;
const SWIPE_DOMINANCE = 1.5;
// 처음 보는 사람에게 한 번만 목록을 옆으로 살짝 밀어 보여 준다(밀어서 넘길 수 있다는 신호).
const NUDGE_SEEN_KEY = "proteinlab:home-popular-nudge:v1";

export default function HomePopularCarousel({ products, available }: Props) {
  const [tabIdx, setTabIdx] = useState(0);
  const [switched, setSwitched] = useState(false);
  const [nudging, setNudging] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (idx: number) => {
    if (idx === tabIdx) return;
    setSwitched(true);
    setNudging(false);
    setTabIdx(idx);
  };

  useEffect(() => {
    const el = mobileListRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (window.localStorage.getItem(NUDGE_SEEN_KEY)) return;
    } catch {
      return;
    }
    let timer: number | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      try {
        window.localStorage.setItem(NUDGE_SEEN_KEY, "1");
      } catch {}
      timer = window.setTimeout(() => setNudging(true), 400);
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // 모바일 목록을 왼쪽으로 밀면 다음 카테고리, 오른쪽으로 밀면 이전 카테고리(끝에서는 멈춤).
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * SWIPE_DOMINANCE) return;
    const next = dx < 0 ? tabIdx + 1 : tabIdx - 1;
    if (next >= 0 && next < TABS.length) handleTabClick(next);
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
      </div>
      {/* Mobile category selector */}
      {/* 6개 카테고리가 한 줄에 다 보이게 칸을 나눠 쓴다(2026-11-05 파우더 추가). 2026-11-07 제품 위로 옮김: 아래에 있으면 작은 폰 첫 화면에서 탭이 안 보였다. */}
      <div className="relative mb-2 grid grid-cols-6 gap-1 md:hidden">
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabClick(i)}
            aria-pressed={i === tabIdx}
            className="inline-flex h-7 min-w-0 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-bold transition-colors"
            style={
              i === tabIdx
                ? { background: "#1F5A3D", color: "#fff" }
                : { background: "#FFFDF7", color: "#5E6E61", border: "1px solid #E4D9CC" }
            }
          >
            {tab.label}
          </button>
        ))}
        {/* 선택 표시가 고른 탭으로 미끄러져 간다(칸 너비 = (전체 - 간격 4px×5) / 6) */}
        <span
          aria-hidden
          className="popular-tab-pill pointer-events-none absolute left-0 top-0 inline-flex h-7 items-center justify-center rounded-full text-[11px] font-bold"
          style={{
            width: "calc((100% - 20px) / 6)",
            transform: `translateX(calc(${tabIdx} * (100% + 4px)))`,
            background: "#1F5A3D",
            color: "#fff",
          }}
        >
          {curTab.label}
        </span>
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
      ) : <>
      <div ref={mobileListRef} className="touch-pan-y overscroll-x-contain md:hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div
          key={curTab.key}
          className={nudging ? "popular-list-nudge" : switched ? "popular-list-stagger" : undefined}
          onAnimationEnd={nudging ? (event) => { if (event.target === event.currentTarget) setNudging(false); } : undefined}
        >
          <HomePopularList products={curProducts.slice(0, MOBILE_LIST_COUNT)} category={curTab.key} />
        </div>
        <Link
          href={`/trending#${curTab.key}`}
          className="mt-1.5 block rounded-xl border border-[#d9e3db] bg-white py-2 text-center text-[12px] font-bold"
          style={{ color: "#1F5A3D" }}
        >
          {curTab.label} 인기 순위 더 보기 →
        </Link>
      </div>
      <div className="hidden md:block">
      <AutoProductCarousel key={curTab.key} label="지금 인기 제품">
        {curProducts.map((product, i) => {
          const reasonLabel = product.discoveryReason === "coupang_best" ? "쿠팡 베스트"
            : product.discoveryReason === "recently_added" ? "NEW" : null;
          return (
            <div
              key={product.slug ?? i}
              className="home-popular-carousel-card relative flex w-[41.5%] shrink-0 md:w-[calc((100%-36px)/4)] [&>:last-child]:min-w-0 [&>:last-child]:flex-1 [&>:last-child]:self-stretch"
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
      </AutoProductCarousel>
      </div>
      </>}

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
