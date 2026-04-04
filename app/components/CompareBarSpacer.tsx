"use client";

import { usePathname } from "next/navigation";
import { useCompare } from "../context/CompareContext";

const COMPARE_BAR_PATHS = [
  "/drinks",
  "/bars",
  "/yogurt",
  "/shake",
  "/recommend",
  "/ranking",
  "/search",
  "/brands",
  "/picks",
  "/favorites",
  "/compare",
  "/product",
];

/** 플로팅 비교 바가 있을 때 본문 하단 여백 */
export default function CompareBarSpacer() {
  const { selectedSlugs } = useCompare();
  const pathname = usePathname();
  const isProductPage = COMPARE_BAR_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (selectedSlugs.length === 0 || !isProductPage) return null;
  return <div style={{ height: "72px" }} aria-hidden />;
}
