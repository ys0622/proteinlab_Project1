"use client";

import { useState } from "react";

const brandOptions = ["전체", "옵티멈", "마이프로틴", "엘리트", "비엔씨", "뉴트리코스트"];
const proteinOptions = ["전체", "20g 이상", "24g 이상", "25g 이상", "30g 이상"];
const tasteOptions = ["전체", "초코", "바닐라", "딸기", "커피", "복숭아"];

export default function FilterBar() {
  const [brand, setBrand] = useState("전체");
  const [protein, setProtein] = useState("전체");
  const [taste, setTaste] = useState("전체");

  return (
    <aside className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4 md:p-5">
      <h3 className="mb-4 text-sm font-semibold text-[var(--foreground)]">필터</h3>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-[var(--foreground-muted)]">브랜드</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            aria-label="브랜드 필터"
          >
            {brandOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-[var(--foreground-muted)]">단백질 함량 (1회)</label>
          <select
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            aria-label="단백질 함량 필터"
          >
            {proteinOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-[var(--foreground-muted)]">맛</label>
          <select
            value={taste}
            onChange={(e) => setTaste(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            aria-label="맛 필터"
          >
            {tasteOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        onClick={() => {
          setBrand("전체");
          setProtein("전체");
          setTaste("전체");
        }}
      >
        필터 초기화
      </button>
    </aside>
  );
}
