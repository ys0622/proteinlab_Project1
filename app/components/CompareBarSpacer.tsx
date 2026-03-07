"use client";

import { useCompare } from "../context/CompareContext";

/** 플로팅 비교 바가 있을 때 본문 하단 여백 */
export default function CompareBarSpacer() {
  const { selectedSlugs } = useCompare();
  if (selectedSlugs.length === 0) return null;
  return <div style={{ height: "72px" }} aria-hidden />;
}
