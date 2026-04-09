"use client";

import Link from "next/link";
import { useCompare } from "../context/CompareContext";

export default function CompareBar() {
  const { selectedSlugs, clear } = useCompare();

  if (selectedSlugs.length === 0) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-3 z-[90] mx-auto flex w-[min(960px,calc(100%-24px))] items-center justify-between rounded-2xl text-white shadow-[0_16px_40px_rgba(17,24,39,0.22)] md:bottom-4"
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
