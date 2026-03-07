"use client";

export default function SearchBar() {
  return (
    <div
      className="flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background-card)]"
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
  );
}
