"use client";

import Link from "next/link";
import { getQuickCurations, type CurationCategory } from "../lib/curationSystem";

interface QuickCurationProps {
  productType: CurationCategory;
  className?: string;
  variant?: "card" | "inline";
}

function QuickCurationChip({
  item,
  compact = false,
}: {
  item: { label: string; href: string; icon: string };
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--curation-chip-bg)] bg-[var(--curation-chip-bg)] font-medium leading-none text-[var(--curation-chip-text)] transition-opacity hover:opacity-90 ${
        compact ? "h-[26px] px-2 text-[10px] sm:text-[11px]" : "px-2.5 py-1 text-[11px]"
      }`}
    >
      <span
        className="inline-flex items-center justify-center"
        aria-hidden
        style={{ fontSize: compact ? "16px" : "17px", marginRight: "6px", lineHeight: 1 }}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </Link>
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
        className={`rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-3 py-2 md:py-3 ${className}`.trim()}
      >
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center">
          <div className="flex h-6 shrink-0 items-center" style={{ minWidth: "5rem" }}>
            <p
              className="text-[11px] font-bold leading-none text-[var(--foreground-muted)]"
              style={{ margin: 0 }}
            >
              빠른 큐레이션
            </p>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            {items.map((item) => (
              <QuickCurationChip key={`${productType}-${item.slug}`} item={item} compact />
            ))}
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
            <QuickCurationChip key={`${productType}-${item.slug}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
