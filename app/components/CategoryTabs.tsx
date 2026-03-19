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
    <div className="space-y-3">
      {ORDERED_CATEGORY_IDS.map((category) => {
        const meta = CATEGORY_META[category];
        const count = counts?.[category] ?? meta.count;

        return (
          <div key={category}>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {meta.label} ({count}개 제품)
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">{meta.description}</p>
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
        <div className="flex items-center gap-2">
          <nav
            aria-label={ariaLabel}
            className="min-w-0 flex-1 overflow-x-auto overflow-y-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex min-w-max items-center gap-2">
              {ORDERED_CATEGORY_IDS.map((category) => {
                const meta = CATEGORY_META[category];
                const active = activeCategory === category;
                const commonClassName =
                  "inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors";
                const toneClassName = active
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]";

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
            </div>
          </nav>

          <div
            className="relative shrink-0"
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
                  setMobileInfoOpen(true);
                }
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white text-sm font-semibold text-[var(--foreground-muted)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              aria-label="카테고리 설명 보기"
              aria-expanded={isDesktop ? desktopInfoOpen : mobileInfoOpen}
            >
              i
            </button>

            {desktopInfoOpen ? (
              <div className="absolute right-0 top-full z-[80] mt-2 hidden w-[340px] rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:block">
                <CategoryInfoPanel counts={counts} />
              </div>
            ) : null}
          </div>
        </div>

        {mobileInfoOpen ? (
          <div className="md:hidden">
            <button
              type="button"
              aria-label="카테고리 설명 닫기"
              className="fixed inset-0 z-[90] bg-black/35"
              onClick={() => setMobileInfoOpen(false)}
            />
            <div
              className="fixed inset-x-0 bottom-0 z-[100] rounded-t-[28px] border border-[var(--border)] bg-white px-5 pb-6 pt-3 shadow-[0_-18px_44px_rgba(0,0,0,0.18)]"
              role="dialog"
              aria-label="카테고리 설명"
            >
              <div className="mx-auto h-1.5 w-12 rounded-full bg-[#ddd6c8]" aria-hidden="true" />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[var(--foreground)]">카테고리 안내</p>
                  <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                    모든 페이지에서 동일한 기준으로 카테고리를 보여줍니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileInfoOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground-muted)]"
                  aria-label="카테고리 설명 닫기"
                >
                  ×
                </button>
              </div>
              <div className="mt-4">
                <CategoryInfoPanel counts={counts} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
