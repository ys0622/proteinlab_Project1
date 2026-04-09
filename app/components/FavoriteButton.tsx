"use client";

import type { MouseEvent } from "react";
import { useFavorites } from "../context/FavoritesContext";

interface FavoriteButtonProps {
  slug: string;
  compact?: boolean;
}

export default function FavoriteButton({
  slug,
  compact = false,
}: FavoriteButtonProps) {
  const { isFavorited, toggle } = useFavorites();
  const favorited = isFavorited(slug);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggle(slug);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorited ? "즐겨찾기에서 제거" : "즐겨찾기에 추가"}
      className="flex items-center justify-center rounded-[10px] border transition-colors active:scale-[0.98]"
      style={{
        height: compact ? "27px" : "34px",
        width: compact ? "29px" : "38px",
        flexShrink: 0,
        ...(favorited
          ? { borderColor: "#e85c5c", background: "#fff5f5", color: "#e85c5c" }
          : { borderColor: "#e2e2e2", background: "white", color: "#bbb" }),
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={compact ? "h-[14px] w-[14px]" : "h-[16px] w-[16px]"}
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20.5s-6.5-4.35-8.75-8.16C1.55 9.47 2.18 5.9 5.4 4.76c2.03-.72 3.93.02 5.1 1.55 1.17-1.53 3.07-2.27 5.1-1.55 3.22 1.14 3.85 4.71 2.15 7.58C18.5 16.15 12 20.5 12 20.5Z" />
      </svg>
    </button>
  );
}
