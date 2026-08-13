"use client";

import { useEffect, useRef, useState } from "react";

const RECENT_KEY = "proteinlab_recent_searches";
const MAX_RECENT = 5;

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  if (!query.trim()) return;
  const prev = loadRecent().filter((q) => q !== query.trim());
  localStorage.setItem(RECENT_KEY, JSON.stringify([query.trim(), ...prev].slice(0, MAX_RECENT)));
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onCommit?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  compact?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onCommit,
  placeholder = "제품명 ∙ 브랜드 ∙ 맛 검색",
  autoFocus = false,
  className = "",
  compact = false,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focused) {
      // Recent searches are read from client-only local storage when the input opens.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecent(loadRecent());
    }
  }, [focused]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      saveRecent(value.trim());
      setRecent(loadRecent());
      setFocused(false);
      onCommit?.(value.trim());
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  };

  const handleSelectRecent = (query: string) => {
    onChange(query);
    saveRecent(query);
    setFocused(false);
    onCommit?.(query);
  };

  const handleRemoveRecent = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    const updated = loadRecent().filter((q) => q !== query);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setRecent(updated);
  };

  const showDropdown = focused && recent.length > 0 && !value.trim();

  return (
    <div ref={wrapRef} className="relative w-full">
      <div
        className={`flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-white ${className}`.trim()}
        style={{
          height: compact ? "28px" : "34px",
          paddingLeft: "8px",
          paddingRight: "8px",
          borderRadius: "8px",
        }}
      >
        <span className="shrink-0 text-[var(--foreground-muted-light)]" aria-hidden>
          <svg className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full border-0 bg-transparent text-[16px] text-[var(--foreground)] placeholder:text-[var(--foreground-muted-light)] focus:outline-none ${compact ? "sm:text-[12px]" : "sm:text-[13px]"}`}
          aria-label="제품 검색"
          style={{ fontWeight: 400 }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="검색어 지우기"
            className="shrink-0 text-[var(--foreground-muted-light)] hover:text-[var(--foreground)]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-lg"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
        >
          <div className="flex items-center justify-between px-3 pb-1 pt-2.5">
            <span className="text-xs font-semibold text-[var(--foreground-muted)]">최근 검색</span>
          </div>
          {recent.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSelectRecent(q)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-[var(--foreground)] hover:bg-[var(--accent-light)]"
            >
              <span className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 shrink-0 text-[var(--foreground-muted-light)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {q}
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => handleRemoveRecent(e, q)}
                className="ml-2 shrink-0 text-[var(--foreground-muted-light)] hover:text-[var(--foreground)]"
                aria-label={`${q} 삭제`}
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
