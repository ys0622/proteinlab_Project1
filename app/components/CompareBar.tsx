"use client";

import Link from "next/link";
import { useCompare } from "../context/CompareContext";

export default function CompareBar() {
  const { selectedSlugs, clear } = useCompare();

  if (selectedSlugs.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between text-white"
      style={{
        background: "#2F5D46",
        padding: "16px 24px",
      }}
    >
      <span className="text-sm font-medium">
        {selectedSlugs.length}개 선택됨 (최대 4개)
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={clear}
          className="rounded-lg border border-white bg-transparent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          초기화
        </button>
        <Link
          href="/compare"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ color: "#2F5D46" }}
        >
          비교하기 ({selectedSlugs.length})
        </Link>
      </div>
    </div>
  );
}
