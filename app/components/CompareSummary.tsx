"use client";

import type { ProductDetailProps } from "../data/products";
import type { CompareColumnId } from "../lib/compareColumns";
import { getCompareSummary } from "../lib/compareSummary";

interface CompareSummaryProps {
  products: ProductDetailProps[];
  visibleColumnIds: CompareColumnId[];
  onChipSelect?: (columnId: CompareColumnId) => void;
}

export default function CompareSummary({
  products,
  visibleColumnIds,
  onChipSelect,
}: CompareSummaryProps) {
  const summary = getCompareSummary(products, visibleColumnIds);

  if (!summary) return null;

  return (
    <section
      className="rounded-2xl border border-[#e6e1d8] bg-[#f8f5ee] px-3 py-3 md:px-5 md:py-4"
      aria-label="비교 결과 요약"
    >
      <div className="flex flex-col gap-2.5 md:gap-3">
        <div>
          <p className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-[#7a6f5e] md:block">
            Compare Summary
          </p>
          <p className="text-[13px] font-medium leading-5 text-[var(--foreground)] md:mt-1 md:text-[15px] md:leading-6">
            {summary.headline}
          </p>
        </div>

        {summary.chips.length > 0 && (
          <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
            {summary.chips.map((chip) => (
              <button
                key={chip.columnId}
                type="button"
                onClick={() => onChipSelect?.(chip.columnId)}
                className="min-w-[210px] shrink-0 rounded-xl border border-[#e4ddd0] bg-white px-3 py-2 text-left transition-colors hover:border-[#d0c6b8] hover:bg-[#fffdf8] md:min-w-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[var(--foreground)] md:text-sm">
                    {chip.label}
                  </span>
                  <span className="rounded-full bg-[#eef5ee] px-2 py-0.5 text-[10px] font-medium text-[#2f5d46] md:px-2.5 md:py-1 md:text-xs">
                    {chip.winnerName} 우세
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                  {chip.differenceText}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
