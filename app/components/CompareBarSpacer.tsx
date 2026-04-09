"use client";

import { useCompare } from "../context/CompareContext";

export default function CompareBarSpacer() {
  const { selectedSlugs } = useCompare();

  if (selectedSlugs.length === 0) return null;

  return <div style={{ height: "96px" }} aria-hidden />;
}
