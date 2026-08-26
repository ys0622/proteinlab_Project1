"use client";

import Link from "next/link";
import { useCompare } from "../context/CompareContext";

export default function CompareBar() {
  const { selectedSlugs, clear } = useCompare();

  if (selectedSlugs.length === 0) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-2 z-[90] mx-auto flex w-[min(960px,calc(100%-16px))] items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-white shadow-[0_16px_40px_rgba(17,24,39,0.22)] md:bottom-4 md:w-[min(960px,calc(100%-24px))] md:gap-3 md:rounded-2xl md:px-6 md:py-4"
      style={{
        background: "#2F5D46",
      }}
    >
      <span className="min-w-0 text-xs font-medium leading-tight md:text-sm">
        <span className="md:hidden">선택 {selectedSlugs.length}/3</span>
        <span className="hidden md:inline">{selectedSlugs.length}개 선택됨 (최대 3개)</span>
      </span>
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={clear}
          className="min-h-10 rounded-lg border border-white bg-transparent px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 md:px-4 md:text-sm"
        >
          초기화
        </button>
        <Link
          href="/compare"
          className="flex min-h-10 items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-medium leading-tight transition-opacity hover:opacity-90 md:px-4 md:text-sm"
          style={{ color: "#2F5D46" }}
        >
          비교하기
          <span className="hidden md:inline"> ({selectedSlugs.length})</span>
        </Link>
      </div>
    </div>
  );
}
