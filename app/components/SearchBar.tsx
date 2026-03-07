"use client";

export default function SearchBar() {
  return (
    <div
      className="flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-white"
      style={{ height: "34px", paddingLeft: "8px", paddingRight: "8px", borderRadius: "8px" }}
    >
      <span className="shrink-0 text-[var(--foreground-muted-light)]" aria-hidden>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        type="search"
        placeholder="제품명 ∙ 브랜드 ∙ 맛 검색"
        className="w-full border-0 bg-transparent text-xs text-[var(--foreground)] placeholder:text-[var(--foreground-muted-light)] focus:outline-none sm:text-[13px]"
        aria-label="제품 검색"
        style={{ fontWeight: 400 }}
      />
    </div>
  );
}
