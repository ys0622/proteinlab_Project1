"use client";

import { useEffect } from "react";

const MAX_RECENT = 10;
const STORAGE_KEY = "pl_recent_products";

export function getRecentProducts(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function RecentlyViewedTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const prev = getRecentProducts().filter((s) => s !== slug);
    const next = [slug, ...prev].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, [slug]);

  return null;
}
