"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CATEGORY_META,
  ORDERED_CATEGORY_IDS,
  getCategoryHref,
  type ProductCategory,
} from "../lib/categories";

interface CategoryTabsProps {
  activeCategory: ProductCategory;
  counts?: Partial<Record<ProductCategory, number>>;
  onSelect?: (category: ProductCategory) => void;
  stickyMobile?: boolean;
  className?: string;
  ariaLabel?: string;
}

function CategoryInfoPanel({
  counts,
}: {
  counts?: Partial<Record<ProductCategory, number>>;
}) {
  return (
    <div className="space-y-2.5">
      {ORDERED_CATEGORY_IDS.map((category) => {
        const meta = CATEGORY_META[category];
        const count = counts?.[category] ?? meta.count;

        return (
          <div key={category}>
            <p className="text-xs font-semibold text-[var(--foreground)]">
              {meta.label} ({count}개 제품)
            </p>
            <p className="mt-0.5 text-xs leading-5 text-[var(--foreground-muted)]">
              {meta.description}
            </p>
          </div>
        );
      })}
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
}: CategoryTabsProps) {
  const [desktopInfoOpen, setDesktopInfoOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  const wrapperClassName = useMemo(() => {
    const stickyClass = stickyMobile
      ? "sticky top-14 z-30 -mx-4 bg-white/95 px-4 py-2 backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0"
      : "";
    return [stickyClass, className].filter(Boolean).join(" ");
  }, [className, stickyMobile]);

  return (
    <div className={wrapperClassName}>
      <div className="relative">
        <div className="flex items-center">
          <nav
            aria-label={ariaLabel}
            className="min-w-0 flex-1 overflow-x-auto overflow-y-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible"
          >
            <div className="flex min-w-max items-center gap-2">
              {ORDERED_CATEGORY_IDS.map((category) => {
                const meta = CATEGORY_META[category];
                const active = activeCategory === category;
                const commonClassName =
                  "rounded-full px-3 py-1 text-[12px] font-medium whitespace-nowrap transition-colors md:px-3.5 md:text-sm";
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
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[12px] text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] md:h-8 md:w-8 md:text-[13px]"
                  aria-label="카테고리 설명 보기"
                  aria-expanded={isDesktop ? desktopInfoOpen : mobileInfoOpen}
                >
                  !
                </button>

                {desktopInfoOpen ? (
                  <div className="absolute bottom-full right-0 z-[100] mb-3 hidden w-[320px] rounded-xl border border-[var(--border)] bg-white p-3 shadow-lg md:block">
                    <CategoryInfoPanel counts={counts} />
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
            <div className="absolute right-0 top-full z-[100] mt-2 w-[300px] rounded-xl border border-[var(--border)] bg-white p-3 shadow-lg md:hidden">
              <CategoryInfoPanel counts={counts} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
