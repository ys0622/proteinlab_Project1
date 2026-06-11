"use client";

import { useEffect, useRef } from "react";

interface ProductViewTrackerProps {
  slug: string;
  productType: string;
}

export default function ProductViewTracker({ slug, productType }: ProductViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    // 세션당 1회만 카운트 (같은 제품 반복 방문 방지)
    const sessionKey = `viewed:${slug}`;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "1");

    fetch("/api/track/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, productType }),
    }).catch(() => {/* 실패해도 UI에 영향 없음 */});
  }, [slug, productType]);

  return null;
}
