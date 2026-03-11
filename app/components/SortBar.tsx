"use client";

import { useEffect, useId, useRef, useState } from "react";

export const sortOptions = [
  { value: "recommended", label: "추천순" },
  { value: "popular", label: "인기정렬" },
  { value: "protein_desc", label: "단백질 많은 순" },
  { value: "density", label: "단백질 밀도순" },
  { value: "sugar_asc", label: "당류 낮은 순" },
  { value: "volume_desc", label: "용량 큰 순" },
  { value: "volume_asc", label: "용량 작은 순" },
  { value: "sugar_desc", label: "당류 높은 순" },
] as const;

export type SortOptionValue = (typeof sortOptions)[number]["value"];

const recommendedDescription =
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
  const [infoOpen, setInfoOpen] = useState(false);
  const infoButtonRef = useRef<HTMLButtonElement | null>(null);
  const infoPanelRef = useRef<HTMLDivElement | null>(null);
  const infoPanelId = useId();

  useEffect(() => {
    if (!infoOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (infoButtonRef.current?.contains(target) || infoPanelRef.current?.contains(target)) {
        return;
      }
      setInfoOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [infoOpen]);

  return (
    <div className="flex flex-col gap-2 border-b border-[var(--border)] py-2">
      <div className="flex flex-col gap-2 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
        <span className="text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
          전체 {total}개 {categoryLabel} 비교
        </span>

        <div className="relative min-w-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <div className="relative inline-flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => onSortChange("recommended")}
                aria-pressed={sort === "recommended"}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors ${
                  sort === "recommended"
                    ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                    : "border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
                style={{ fontWeight: 400, whiteSpace: "nowrap" }}
              >
                추천순
              </button>
              <button
                ref={infoButtonRef}
                type="button"
                aria-label="추천순 기준 설명 보기"
                aria-expanded={infoOpen}
                aria-controls={infoPanelId}
                onClick={() => setInfoOpen((current) => !current)}
                onMouseEnter={() => setInfoOpen(true)}
                onMouseLeave={() => setInfoOpen(false)}
                onFocus={() => setInfoOpen(true)}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white text-xs text-[var(--foreground-muted)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                i
              </button>
              {infoOpen ? (
                <div
                  id={infoPanelId}
                  ref={infoPanelRef}
                  role="tooltip"
                  onMouseEnter={() => setInfoOpen(true)}
                  onMouseLeave={() => setInfoOpen(false)}
                  className="absolute left-0 top-full z-20 mt-2 w-[260px] rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-xs leading-5 text-[var(--foreground-muted)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:w-[320px]"
                >
                  {recommendedDescription}
                </div>
              ) : null}
            </div>

            {sortOptions
              .filter((option) => option.value !== "recommended")
              .map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSortChange(option.value)}
                  aria-pressed={sort === option.value}
                  className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-sm transition-colors ${
                    sort === option.value
                      ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                  style={{ fontWeight: 400, whiteSpace: "nowrap" }}
                >
                  {option.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
