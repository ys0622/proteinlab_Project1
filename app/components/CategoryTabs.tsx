"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CATEGORY_META,
  ALL_CATEGORY_IDS,
  getCategoryHref,
  type CatalogProductCategory,
} from "../lib/categories";
import productCategoryCounts from "../data/productCategoryCounts.json";

interface CategoryTabsProps {
  activeCategory: CatalogProductCategory;
  counts?: Partial<Record<CatalogProductCategory, number>>;
  onSelect?: (category: CatalogProductCategory) => void;
  stickyMobile?: boolean;
  className?: string;
  ariaLabel?: string;
  hiddenCategories?: readonly CatalogProductCategory[];
}

function CategoryInfoPanel({
  counts,
  hiddenCategories = [],
}: {
  counts?: Partial<Record<CatalogProductCategory, number>>;
  hiddenCategories?: readonly CatalogProductCategory[];
}) {
  return (
    <div className="space-y-2.5">
      {ALL_CATEGORY_IDS.filter((category) => !hiddenCategories.includes(category)).map((category) => {
        const meta = CATEGORY_META[category];
        const count = counts?.[category] ?? productCategoryCounts[category];

        return (
          <div key={category}>
            <p className="text-xs font-semibold text-[var(--foreground)]">
              {meta.label}
              {typeof count === "number" ? ` (${count}개 제품)` : null}
            </p>
            <p className="mt-0.5 text-xs leading-5 text-[var(--foreground-muted)]">
              {meta.description}
            </p>
            <p className="mt-0.5 text-[11px] leading-4 text-[var(--accent)]">등록 기준 · {meta.criteria}</p>
          </div>
        );
      })}
      <Link href="/methodology" className="block pt-1 text-[11px] font-semibold text-[var(--accent)] underline-offset-2 hover:underline">
        카테고리별 등록 기준 자세히 →
      </Link>
    </div>
  );
}

export default function CategoryTabs({
  activeCategory,
  counts,
  onSelect,
  stickyMobile = false,
  className = "",
  ariaLabel = "카테고리 탭",
  hiddenCategories = [],
}: CategoryTabsProps) {
  const [desktopInfoOpen, setDesktopInfoOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // 탭이 5개가 되면서 모바일에서 오른쪽 탭(두유)이 정렬 버튼 뒤로 잘렸다. 활성 탭을 보이는 영역 안으로 가져온다.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth + 1) return;
    const active = nav.querySelector<HTMLElement>('[aria-current="page"], [aria-pressed="true"]');
    if (!active) return;
    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    // 가운데 맞춤이 아니라 활성 탭이 보일 만큼만 최소로 이동한다(첫 탭이 가려지는 것을 줄인다).
    const overflowRight = activeRect.right - navRect.right + 8;
    const overflowLeft = navRect.left - activeRect.left + 8;
    if (overflowRight > 0) nav.scrollTo({ left: nav.scrollLeft + overflowRight });
    else if (overflowLeft > 0) nav.scrollTo({ left: Math.max(0, nav.scrollLeft - overflowLeft) });
  }, [activeCategory]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  const wrapperClassName = useMemo(() => {
    const stickyClass = stickyMobile
      ? "sticky top-14 z-30 -mx-4 bg-white/95 px-4 py-1.5 backdrop-blur md:relative md:top-auto md:mx-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0"
      : "";
    return [stickyClass, className].filter(Boolean).join(" ");
  }, [className, stickyMobile]);

  return (
    <div className={wrapperClassName}>
      <div className="relative z-40">
        <div className="flex items-center">
          <nav
            ref={navRef}
            aria-label={ariaLabel}
            className="min-w-0 flex-1 overflow-x-auto overflow-y-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible"
          >
            <div className="flex min-w-max items-center gap-2">
              {ALL_CATEGORY_IDS.filter((category) => !hiddenCategories.includes(category)).map((category) => {
                const meta = CATEGORY_META[category];
                const active = activeCategory === category;
                const commonClassName =
                  "rounded-full px-2.5 py-[5px] text-[11px] font-medium whitespace-nowrap transition-colors md:px-3.5 md:py-1 md:text-sm";
                const toneClassName = active
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:text-[var(--foreground)]";

                if (onSelect) {
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => onSelect(category)}
                      className={`${commonClassName} ${toneClassName}`}
                      aria-pressed={active}
                    >
                      {meta.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={category}
                    href={getCategoryHref(category)}
                    className={`${commonClassName} ${toneClassName}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {meta.label}
                  </Link>
                );
              })}

              <div
                className="relative flex shrink-0 items-center"
                onMouseEnter={() => {
                  if (isDesktop) setDesktopInfoOpen(true);
                }}
                onMouseLeave={() => {
                  if (isDesktop) setDesktopInfoOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isDesktop) {
                      setDesktopInfoOpen((current) => !current);
                    } else {
                      setMobileInfoOpen((current) => !current);
                    }
                  }}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[11px] text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] md:h-8 md:w-8 md:text-[13px]"
                  aria-label="카테고리 설명 보기"
                  aria-expanded={isDesktop ? desktopInfoOpen : mobileInfoOpen}
                >
                  i
                </button>

                {desktopInfoOpen ? (
                  <div className="absolute right-0 top-full z-[100] hidden pt-2 md:block">
                    <div className="w-[320px] rounded-xl border border-[var(--border)] bg-white p-3 shadow-lg">
                      <CategoryInfoPanel counts={counts} hiddenCategories={hiddenCategories} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </nav>
        </div>

        {!isDesktop && mobileInfoOpen ? (
          <>
            <button
              type="button"
              aria-label="카테고리 설명 닫기"
              className="fixed inset-0 z-[90] cursor-default"
              onClick={() => setMobileInfoOpen(false)}
            />
            <div className="absolute left-0 top-full z-[100] mt-2 w-[min(300px,calc(100vw-2rem))] rounded-xl border border-[var(--border)] bg-white p-3 shadow-lg md:hidden">
              <CategoryInfoPanel counts={counts} hiddenCategories={hiddenCategories} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
