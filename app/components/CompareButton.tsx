"use client";

import { useCompare } from "../context/CompareContext";

interface CompareButtonProps {
  slug: string;
  detailHref: string;
}

export default function CompareButton({ slug, detailHref }: CompareButtonProps) {
  const { isSelected, toggle, canAdd } = useCompare();
  const selected = isSelected(slug);
  const disabled = !selected && !canAdd;

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      disabled={disabled}
      data-detail-href={detailHref}
      className="flex flex-1 items-center justify-center whitespace-nowrap rounded-[10px] border font-medium transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      style={{
        height: "34px",
        fontSize: "12px",
        borderRadius: "10px",
        ...(selected
          ? { background: "#2F5D46", borderColor: "#2F5D46", color: "white" }
          : { borderColor: "#e2e2e2", background: "white", color: "var(--foreground)" }),
      }}
    >
      {selected ? "스펙 비교 해제" : "스펙 비교"}
    </button>
  );
}
