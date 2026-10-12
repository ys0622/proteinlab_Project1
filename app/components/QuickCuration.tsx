"use client";

import { useEffect, useRef, useState } from "react";
import TrackedLink from "./TrackedLink";
import { getQuickCurations, type CurationCategory } from "../lib/curationSystem";

// 모바일 인라인 큐레이션: 칩 3줄(24px × 3 + 간격 5px × 2)까지만 보여주고 나머지는 "더보기"로 펼친다.
const MOBILE_COLLAPSED_MAX_HEIGHT = 82;

interface QuickCurationProps {
  productType: CurationCategory;
  className?: string;
  variant?: "card" | "inline";
}

function QuickCurationChip({
  item,
  productType,
  compact = false,
}: {
  item: { label: string; href: string; icon: string };
  productType: CurationCategory;
  compact?: boolean;
}) {
  return (
    <TrackedLink
      href={item.href}
      trackingLabel={item.label}
      trackingSection={compact ? `quick_curation_inline_${productType}` : `quick_curation_${productType}`}
      trackingPageType="quick_curation"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--curation-chip-bg)] bg-[var(--curation-chip-bg)] font-medium leading-none text-[var(--curation-chip-text)] transition-opacity hover:opacity-90 ${
        compact ? "h-6 px-[7px] text-[10.5px] md:h-[22px] md:px-1.5 md:text-[11px]" : "px-2.5 py-1 text-[11px]"
      }`}
    >
      <span
        className="inline-flex items-center justify-center"
        aria-hidden
        style={{ fontSize: compact ? "13px" : "17px", marginRight: "4px", lineHeight: 1 }}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </TrackedLink>
  );
}

export default function QuickCuration({
  productType,
  className = "",
  variant = "card",
}: QuickCurationProps) {
  const items = getQuickCurations(productType);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    const el = chipsRef.current;
    if (!el || variant !== "inline") return;
    const measure = () => {
      if (window.innerWidth >= 768) {
        setHiddenCount(0);
        return;
      }
      const top = el.getBoundingClientRect().top;
      const hidden = [...el.children].filter(
        (child) => child.getBoundingClientRect().bottom - top > MOBILE_COLLAPSED_MAX_HEIGHT + 1,
      ).length;
      setHiddenCount(hidden);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length, variant]);

  if (variant === "inline") {
    return (
      <div
        className={`rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-2.5 py-1.5 md:px-3 md:py-2 ${className}`.trim()}
      >
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1.5">
          <div className="flex h-[18px] shrink-0 items-center md:h-[22px] md:min-w-[75px]">
            <p
              className="text-[10px] font-bold leading-none text-[var(--foreground-muted)] md:text-[11px]"
              style={{ margin: 0 }}
            >
              빠른 큐레이션
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <div
              ref={chipsRef}
              className={`flex flex-wrap items-center gap-[5px] overflow-hidden md:max-h-[50px] md:gap-1.5 md:gap-y-1.5 ${
                expanded ? "" : "max-h-[82px]"
              }`}
            >
              {items.map((item) => (
                <QuickCurationChip key={`${productType}-${item.slug}`} item={item} productType={productType} compact />
              ))}
            </div>
            {hiddenCount > 0 || expanded ? (
              <button
                type="button"
                onClick={() => setExpanded((current) => !current)}
                aria-expanded={expanded}
                className="mt-1 py-0.5 text-[10.5px] font-bold text-[var(--accent)] md:hidden"
              >
                {expanded ? "접기 ▴" : `더보기 +${hiddenCount} ▾`}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-3 py-2 md:py-3 ${className}`.trim()}
    >
      <div className="mb-1 flex items-center justify-between gap-3 md:mb-2">
        <p className="text-xs font-semibold text-[var(--foreground)]">빠른 큐레이션</p>
        <span className="text-[11px] text-[var(--foreground-muted)]">좌우로 넘겨보기</span>
      </div>
      <div className="-mx-3 -mb-1 mt-0 overflow-x-auto px-3 pb-1 md:mt-1 md:pb-2">
        <div className="flex min-w-max" style={{ gap: "6px" }}>
          {items.map((item) => (
            <QuickCurationChip key={`${productType}-${item.slug}`} item={item} productType={productType} />
          ))}
        </div>
      </div>
    </div>
  );
}
