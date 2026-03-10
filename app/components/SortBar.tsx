"use client";

import { useState } from "react";

const options = [
  { value: "sugar_asc", label: "저당순" },
  { value: "protein_desc", label: "단백질 많은순" },
  { value: "density", label: "단백질 밀도순" },
  { value: "volume_desc", label: "용량 큰순" },
  { value: "volume_asc", label: "용량 작은순" },
  { value: "sugar_desc", label: "당류 높은순" },
];

interface SortBarProps {
  total?: number;
  categoryLabel?: string;
}

export default function SortBar({
  total = 101,
  categoryLabel = "단백질 음료",
}: SortBarProps) {
  const [sort, setSort] = useState<string>(options[0].value);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] py-2">
      <span className="text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
        전체 {total}개 {categoryLabel} 스펙 비교  인기 정렬 : 저당순
      </span>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        aria-label="정렬 기준"
        style={{ fontWeight: 400 }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
