"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "proteinlab-compare-slugs";
const MAX_COMPARE = 4;

function loadSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.every((x) => typeof x === "string") ? parsed.slice(0, MAX_COMPARE) : [];
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

type CompareContextValue = {
  selectedSlugs: string[];
  isSelected: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  canAdd: boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initial = loadSlugs();
    if (typeof window !== "undefined" && window.location.pathname === "/compare") {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("slugs");
      if (fromUrl) {
        const slugs = fromUrl.split(",").map((s) => s.trim()).filter(Boolean).slice(0, MAX_COMPARE);
        if (slugs.length > 0) {
          initial = slugs;
          saveSlugs(slugs);
        }
      }
    }
    setSelectedSlugs(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveSlugs(selectedSlugs);
  }, [mounted, selectedSlugs]);

  const isSelected = useCallback((slug: string) => selectedSlugs.includes(slug), [selectedSlugs]);
  const canAdd = selectedSlugs.length < MAX_COMPARE;

  const toggle = useCallback(
    (slug: string) => {
      setSelectedSlugs((prev) => {
        const i = prev.indexOf(slug);
        if (i >= 0) return prev.filter((_, j) => j !== i);
        if (prev.length >= MAX_COMPARE) return prev;
        return [...prev, slug];
      });
    },
    []
  );

  const remove = useCallback((slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setSelectedSlugs([]), []);

  const value: CompareContextValue = {
    selectedSlugs,
    isSelected,
    toggle,
    remove,
    clear,
    canAdd,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
