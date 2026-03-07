"use client";

import { useState } from "react";

/* proteinlab.kr과 동일한 필터 구조 */
const brandOptions = ["그린비아", "뉴케어", "닥터유", "더단백랩", "노쉬", "마이밀", "서울우유", "세븐일레븐", "셀렉스", "솔브앤고", "얼티브", "연세유업", "오늘단백", "오트몬트", "칼로바이", "테이크핏", "파스퇴르", "하이뮨", "함소아제약"];
const proteinOptions = ["초고함량(30g 이상)", "고함량(20g 이상)", "저함량(20g 미만)"];
const sourceOptions = ["식물성", "우유", "혼합"];
const tasteOptions = ["곡물/견과", "과일맛", "밀크/바닐라", "초콜릿/카카오", "커피", "기타"];
const volumeOptions = ["200ml 이하", "200~300ml", "300~400ml", "400ml 이상"];

const chipClass =
  "rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-1.5 text-[14px] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]";

export default function SearchAndFilter() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)] py-4">
      {/* proteinlab.kr: 검색 + 상세 필터 펼치기 (한 줄) */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex flex-1 min-w-[180px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background-card)] pl-3 pr-3"
          style={{ height: "44px", paddingLeft: "12px", paddingRight: "12px", borderRadius: "8px" }}
        >
          <span className="shrink-0 text-[var(--foreground-muted)]" aria-hidden>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="제품 검색"
            className="w-full border-0 bg-transparent text-[14px] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none"
            aria-label="제품 검색"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-1 text-[14px] font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          aria-expanded={filterOpen}
        >
          상세 필터
          <span className={`inline-block transition-transform ${filterOpen ? "rotate-180" : ""}`}>펼치기 ▼</span>
        </button>
      </div>

      {/* proteinlab.kr 필터: filter group gap 12px, chip gap 8px */}
      {filterOpen && (
        <div
          className="mt-8 border-t border-[var(--border)] pt-6"
          style={{ marginTop: "var(--section-mt)" }}
        >
          <div className="flex flex-col gap-3" style={{ gap: "var(--filter-gap)" }}>
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--foreground-muted)]">브랜드</p>
              <div className="flex flex-wrap gap-2" style={{ gap: "var(--chip-gap)" }}>
                {brandOptions.map((b) => (
                  <button key={b} type="button" className={chipClass}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--foreground-muted)]">단백질 함량</p>
              <div className="flex flex-wrap gap-2" style={{ gap: "var(--chip-gap)" }}>
                {proteinOptions.map((p) => (
                  <button key={p} type="button" className={chipClass}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--foreground-muted)]">단백질 급원</p>
              <div className="flex flex-wrap gap-2" style={{ gap: "var(--chip-gap)" }}>
                {sourceOptions.map((s) => (
                  <button key={s} type="button" className={chipClass}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--foreground-muted)]">맛</p>
              <div className="flex flex-wrap gap-2" style={{ gap: "var(--chip-gap)" }}>
                {tasteOptions.map((t) => (
                  <button key={t} type="button" className={chipClass}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--foreground-muted)]">용량</p>
              <div className="flex flex-wrap gap-2" style={{ gap: "var(--chip-gap)" }}>
                {volumeOptions.map((v) => (
                  <button key={v} type="button" className={chipClass}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
