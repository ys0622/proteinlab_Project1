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
      className="rounded-2xl border border-[#e6e1d8] bg-[#f8f5ee] px-4 py-4 md:px-5"
      aria-label="비교 결과 요약"
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a6f5e]">
            Compare Summary
          </p>
          <p className="mt-1 text-sm font-medium leading-6 text-[var(--foreground)] md:text-[15px]">
            {summary.headline}
          </p>
        </div>

        {summary.chips.length > 0 && (
          <div className="grid gap-2 md:grid-cols-2">
            {summary.chips.map((chip) => (
              <button
                key={chip.columnId}
                type="button"
                onClick={() => onChipSelect?.(chip.columnId)}
                className="rounded-xl border border-[#e4ddd0] bg-white px-3 py-3 text-left transition-colors hover:border-[#d0c6b8] hover:bg-[#fffdf8]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    {chip.label}
                  </span>
                  <span className="rounded-full bg-[#eef5ee] px-2.5 py-1 text-xs font-medium text-[#2f5d46]">
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
