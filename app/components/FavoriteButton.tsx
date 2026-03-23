"use client";

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

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-label={favorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      className="flex items-center justify-center rounded-[10px] border transition-colors active:scale-[0.98]"
      style={{
        height: compact ? "27px" : "34px",
        width: compact ? "29px" : "38px",
        flexShrink: 0,
        fontSize: compact ? "12px" : "16px",
        ...(favorited
          ? { borderColor: "#e85c5c", background: "#fff5f5", color: "#e85c5c" }
          : { borderColor: "#e2e2e2", background: "white", color: "#bbb" }),
      }}
    >
      {favorited ? "♥" : "♡"}
    </button>
  );
}
