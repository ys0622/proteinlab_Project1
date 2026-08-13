"use client";

import { useEffect, useId, useRef, useState } from "react";
import SortInfoPopover from "./SortInfoPopover";

export const sortOptions = [
  { value: "recommended", label: "추천순" },
  { value: "protein_desc", label: "단백질 많은 순" },
  { value: "sugar_asc", label: "당류 낮은 순" },
  { value: "calories_asc", label: "칼로리 낮은 순" },
  { value: "recent_desc", label: "최근 등록순" },
  { value: "density", label: "단백질 밀도순" },
] as const;

export type SortOptionValue = (typeof sortOptions)[number]["value"];

export const RECOMMENDED_SORT_DESCRIPTION =
  "추천순은 단백질 밀도, 단백질량, 당류, 칼로리, 인기도를 함께 반영한 균형형 정렬입니다.";

interface SortBarProps {
  sort: SortOptionValue;
  onSortChange: (sort: SortOptionValue) => void;
  className?: string;
}

export default function SortBar({
  sort,
  onSortChange,
  className = "",
}: SortBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  const selectedOption =
    sortOptions.find((option) => option.value === sort) ?? sortOptions[0];

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuButtonRef.current?.contains(target) ||
        menuPanelRef.current?.contains(target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className={`flex items-center ${className}`.trim()}>
      <div className="relative ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap md:gap-1.5">
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
              className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white px-2.5 py-1 text-[13px] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:px-3 md:py-1.5 md:text-sm"
              style={{ fontWeight: 400, whiteSpace: "nowrap" }}
            >
              {selectedOption.label}
              <span className="ml-1 text-xs" aria-hidden="true">
                ▾
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

        <div className="sort-info-inline">
          <SortInfoPopover
            label="i"
            description={RECOMMENDED_SORT_DESCRIPTION}
          />
        </div>
      </div>
    </div>
  );
}
