"use client";

import type { CoupangLinkCategory } from "../lib/purchaseLinks";
import type { ProductCardProps } from "../data/productTypes";
import ProductCard from "./ProductCard";

type ScoredProductCardProps = {
  product: ProductCardProps;
  rank: number;
  score: number;
  scoreCaption?: string;
  metricLabel?: string;
  grade?: string;
  highlightLabel?: string;
  reason?: string;
  compact?: boolean;
  purchaseLinkCategory?: CoupangLinkCategory;
};

const GRADE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  A: { bg: "#E7F3EC", color: "#1B7F5B", border: "#1B7F5B" },
  B: { bg: "#EAF2FF", color: "#4C7BD9", border: "#4C7BD9" },
  C: { bg: "#FFF1E6", color: "#F08A24", border: "#F08A24" },
  D: { bg: "#F3F4F6", color: "#6B7280", border: "#D1D5DB" },
};

export default function ScoredProductCard({
  product,
  rank,
  score,
  scoreCaption = "100점 환산",
  metricLabel,
  grade,
  highlightLabel,
  reason,
  compact = false,
  purchaseLinkCategory = "ranking",
}: ScoredProductCardProps) {
  const gradeColor = grade ? GRADE_COLORS[grade] ?? GRADE_COLORS.D : null;

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8]">
      <div className={`border-b border-[#ece7dd] bg-[#faf8f2] ${compact ? "px-2.5 py-2" : "px-3 py-2.5"}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`inline-flex items-center justify-center rounded-full font-extrabold ${compact ? "h-6 min-w-6 px-1.5 text-[11px]" : "h-7 min-w-7 px-2 text-xs"}`}
              style={{
                background: rank <= 3 ? "var(--accent)" : "#f3f4f6",
                color: rank <= 3 ? "#fff" : "#6b7280",
              }}
            >
              {rank}
            </span>
            <span className={`${compact ? "text-[11px]" : "text-xs"} font-semibold text-[#6b7280] whitespace-nowrap`}>
              {highlightLabel ?? `${rank}위`}
            </span>
          </div>
          <div className="text-right">
            <p className={`${compact ? "text-[10px]" : "text-[11px]"} leading-none text-[#7a7a7a]`}>
              {scoreCaption}
            </p>
            <p className={`${compact ? "mt-1 text-[13px]" : "mt-1 text-sm"} font-extrabold text-[#4C7BD9]`}>
              {score}점
            </p>
          </div>
        </div>
        {metricLabel || grade ? (
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#ece7dd] pt-2">
            <span className={`${compact ? "text-[11px]" : "text-xs"} min-w-0 font-semibold text-[#374151] whitespace-nowrap`}>
              {metricLabel ?? "추천 제품"}
            </span>
            {grade ? (
              <span
                className={`${compact ? "text-[11px]" : "text-xs"} shrink-0 rounded-full px-2.5 py-1 font-bold whitespace-nowrap`}
                style={{
                  background: gradeColor?.bg,
                  color: gradeColor?.color,
                  border: `1px solid ${gradeColor?.border}`,
                }}
              >
                {grade} 등급
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        className={`[&_article]:h-full [&_article]:rounded-none [&_article]:border-0 [&_article]:bg-transparent [&_article]:shadow-none [&_.product-card__content]:justify-between [&_.product-card__title]:line-clamp-2 [&_.product-card__brand]:min-h-[16px] [&_.product-card__badges]:content-start [&_.product-card__footer-actions]:mt-auto ${
          compact
            ? "[&_.product-card__badges]:h-[48px] [&_.product-card__badges]:overflow-hidden [&_.product-card__title]:h-[40px] [&_.product-card__title]:overflow-hidden"
            : "[&_.product-card__badges]:h-[52px] [&_.product-card__badges]:overflow-hidden [&_.product-card__title]:h-[48px] [&_.product-card__title]:overflow-hidden"
        }`}
      >
        <ProductCard
          {...product}
          purchaseLinkCategory={purchaseLinkCategory}
          fixedTitleLines={2}
          maxVisibleBadges={compact ? 2 : 3}
          hideSupplementalBadges
        />
      </div>

      {reason ? (
        <div className={`${compact ? "px-2.5 pb-2.5 pt-2" : "px-3 pb-3 pt-2.5"}`}>
          <div
            className={`${compact ? "rounded-lg px-2.5 py-2 text-[11px] leading-5" : "rounded-r-md px-3 py-2 text-[13px] leading-6"} border border-[#e8e2d7] bg-[#f6f2ea] text-[#4b5563]`}
            style={{ borderLeftWidth: 3, borderLeftColor: "var(--accent)" }}
          >
            {reason}
          </div>
        </div>
      ) : null}
    </div>
  );
}
