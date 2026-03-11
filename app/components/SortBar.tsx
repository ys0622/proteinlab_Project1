"use client";

import { useEffect, useId, useRef, useState } from "react";

export const sortOptions = [
  { value: "recommended", label: "추천순" },
  { value: "popular", label: "인기순" },
  { value: "protein_desc", label: "단백질 많은 순" },
  { value: "density", label: "단백질 밀도순" },
  { value: "sugar_asc", label: "당류 낮은 순" },
  { value: "volume_desc", label: "용량 큰 순" },
  { value: "volume_asc", label: "용량 작은 순" },
  { value: "sugar_desc", label: "당류 높은 순" },
] as const;

export type SortOptionValue = (typeof sortOptions)[number]["value"];

export const RECOMMENDED_SORT_DESCRIPTION =
  "추천순은 단백질 밀도, 당류, 칼로리, 가격 효율 등 제품 비교에 중요한 요소를 종합적으로 고려한 순서입니다.";

interface SortBarProps {
  total?: number;
  categoryLabel?: string;
  sort: SortOptionValue;
  onSortChange: (sort: SortOptionValue) => void;
}

export default function SortBar({
  total = 101,
  categoryLabel = "단백질 음료",
  sort,
  onSortChange,
}: SortBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const infoButtonRef = useRef<HTMLButtonElement | null>(null);
  const infoPanelRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const infoId = useId();

  const selectedOption =
    sortOptions.find((option) => option.value === sort) ?? sortOptions[0];

  useEffect(() => {
    if (!menuOpen && !infoOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuButtonRef.current?.contains(target) ||
        menuPanelRef.current?.contains(target) ||
        infoButtonRef.current?.contains(target) ||
        infoPanelRef.current?.contains(target)
      ) {
        return;
      }

      setMenuOpen(false);
      setInfoOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [infoOpen, menuOpen]);

  return (
    <div className="flex flex-col gap-2 border-b border-[var(--border)] py-2">
      <div className="flex items-center justify-between gap-2">
        <span
          className="min-w-0 text-sm text-[var(--foreground-muted)]"
          style={{ fontWeight: 400 }}
        >
          전체 {total}개 {categoryLabel} 비교
        </span>

        <div className="relative ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap">
          <span
            className="hidden text-sm text-[var(--foreground-muted)] sm:inline"
            style={{ fontWeight: 400 }}
          >
            정렬
          </span>

          <div className="relative flex shrink-0 items-center gap-1">
            <button
              ref={menuButtonRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={`정렬 기준 선택: ${selectedOption.label}`}
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ fontWeight: 400, whiteSpace: "nowrap" }}
            >
              {selectedOption.label}
              <span className="ml-1 text-xs" aria-hidden="true">
                ▼
              </span>
            </button>

            {menuOpen ? (
              <div
                id={menuId}
                ref={menuPanelRef}
                role="listbox"
                aria-label="정렬 옵션"
                className="absolute right-0 top-full z-20 mt-2 min-w-[180px] rounded-xl border border-[var(--border)] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={sort === option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                      sort === option.value
                        ? "bg-[var(--accent-light)] text-[var(--accent)]"
                        : "text-[var(--foreground)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                    }`}
                    style={{ fontWeight: 400, whiteSpace: "nowrap" }}
                  >
                    <span>{option.label}</span>
                    {sort === option.value ? (
                      <span className="ml-3 text-xs" aria-hidden="true">
                        ✓
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative flex shrink-0 items-center">
            <button
              ref={infoButtonRef}
              type="button"
              aria-label="추천순 기준 설명 보기"
              aria-expanded={infoOpen}
              aria-controls={infoId}
              onClick={() => setInfoOpen((current) => !current)}
              onMouseEnter={() => setInfoOpen(true)}
              onMouseLeave={() => setInfoOpen(false)}
              onFocus={() => setInfoOpen(true)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-white text-xs text-[var(--foreground-muted)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
            >
              i
            </button>

            {infoOpen ? (
              <div
                id={infoId}
                ref={infoPanelRef}
                role="tooltip"
                onMouseEnter={() => setInfoOpen(true)}
                onMouseLeave={() => setInfoOpen(false)}
                className="absolute right-0 top-full z-20 mt-2 w-[260px] rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-xs leading-5 text-[var(--foreground-muted)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:w-[320px]"
              >
                {RECOMMENDED_SORT_DESCRIPTION}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
