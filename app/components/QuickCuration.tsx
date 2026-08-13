"use client";

import TrackedLink from "./TrackedLink";
import { getQuickCurations, type CurationCategory } from "../lib/curationSystem";

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
        compact ? "h-[22px] px-1.5 text-[10px] sm:text-[11px]" : "px-2.5 py-1 text-[11px]"
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

  if (variant === "inline") {
    return (
      <div
        className={`rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-2.5 py-1 md:px-3 md:py-2 ${className}`.trim()}
      >
        <div className="flex items-start gap-1.5 md:items-center">
          <div className="flex h-[22px] min-w-[56px] shrink-0 items-center md:min-w-[75px]">
            <p
              className="text-[10px] font-bold leading-none text-[var(--foreground-muted)] md:text-[11px]"
              style={{ margin: 0 }}
            >
              빠른 큐레이션
            </p>
          </div>
          <div className="relative -mr-2.5 min-w-0 flex-1 md:mr-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pr-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:max-h-[50px] md:flex-wrap md:gap-y-1.5 md:overflow-hidden md:pr-0">
              {items.map((item) => (
                <QuickCurationChip key={`${productType}-${item.slug}`} item={item} productType={productType} compact />
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-7 md:hidden"
              style={{ background: "linear-gradient(to left, var(--background-card) 25%, transparent)" }}
            />
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
