"use client";

import type { MouseEvent } from "react";
import { useCompare } from "../context/CompareContext";

interface CompareButtonProps {
  slug: string;
  detailHref: string;
  compact?: boolean;
}

export default function CompareButton({
  slug,
  detailHref,
  compact = false,
}: CompareButtonProps) {
  const { isSelected, toggle, canAdd } = useCompare();
  const selected = isSelected(slug);
  const disabled = !selected && !canAdd;
  const label = selected
    ? "스펙 비교에서 제거"
    : disabled
      ? "비교는 최대 4개까지 가능합니다"
      : "스펙 비교에 추가";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggle(slug);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      data-detail-href={detailHref}
      aria-label={label}
      className={`flex items-center justify-center whitespace-nowrap border font-medium transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
        compact ? "h-[27px] w-[29px] rounded-[10px]" : "flex-1 rounded-[10px]"
      }`}
      style={
        selected
          ? { background: "#2F5D46", borderColor: "#2F5D46", color: "white" }
          : { borderColor: "#e2e2e2", background: "white", color: "var(--foreground)" }
      }
    >
      {compact ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[14px] w-[14px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="7" x2="14" y2="7" />
          <line x1="5" y1="17" x2="17" y2="17" />
          <polyline points="16,5 18,7 22,3" />
        </svg>
      ) : (
        <span style={{ height: "34px", fontSize: "12px", lineHeight: "34px" }}>
          {selected ? "스펙 비교 해제" : "스펙 비교"}
        </span>
      )}
    </button>
  );
}
