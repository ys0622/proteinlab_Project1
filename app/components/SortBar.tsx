"use client";

import { useState } from "react";

const options = [
  "당류 적은순",
  "단백질 많은순",
  "단백질 밀도순",
  "가격효율 높은순",
  "용량 큰순",
  "용량 작은순",
  "당류 많은순",
];

export default function SortBar({ total = 101 }: { total?: number }) {
  const [sort, setSort] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center border-b border-[var(--border)] py-3" style={{ gap: "var(--chip-gap)" }}>
      <span className="text-[14px] text-[var(--foreground-muted)]">
        전체 {total}개
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setSort(opt)}
          className={`rounded-lg px-3 py-1.5 text-[14px] ${
            sort === opt
              ? "bg-[var(--accent-light)] font-medium text-[var(--accent)]"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
