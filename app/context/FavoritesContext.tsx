"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "proteinlab-favorites";

function loadSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.every((x) => typeof x === "string") ? parsed : [];
  } catch {
    return [];
  }
}

function saveSlugs(slugs: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {}
}

type FavoritesContextValue = {
  favoriteSlugs: string[];
  isFavorited: (slug: string) => boolean;
  toggle: (slug: string) => void;
  clear: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavoriteSlugs(loadSlugs());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveSlugs(favoriteSlugs);
  }, [mounted, favoriteSlugs]);

  const isFavorited = useCallback((slug: string) => favoriteSlugs.includes(slug), [favoriteSlugs]);

  const toggle = useCallback((slug: string) => {
    setFavoriteSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const clear = useCallback(() => setFavoriteSlugs([]), []);

  return (
    <FavoritesContext.Provider value={{ favoriteSlugs, isFavorited, toggle, clear }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
