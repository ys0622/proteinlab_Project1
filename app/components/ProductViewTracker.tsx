"use client";

import { useEffect, useRef } from "react";
import { productDetailView } from "@/lib/analytics";

interface ProductViewTrackerProps {
  slug: string;
  productType: string;
  productName?: string;
  brand?: string;
}

export default function ProductViewTracker({ slug, productType, productName, brand }: ProductViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    productDetailView({ productId: slug, productName, productBrand: brand, productCategory: productType });

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
