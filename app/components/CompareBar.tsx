"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "../context/CompareContext";
import useVisualViewportBox from "../lib/useVisualViewportBox";

export default function CompareBar() {
  const { selectedSlugs, clear } = useCompare();
  const pathname = usePathname();
  const viewport = useVisualViewportBox();
  const canCompare = selectedSlugs.length >= 2;

  if (selectedSlugs.length === 0 || pathname === "/compare") return null;

  return (
    // 웨일 전체화면 스크롤에서 bottom 고정이 화면 밖으로 밀리는 문제 때문에 보이는 화면 크기 상자의 바닥에 둔다(useVisualViewportBox).
    <div className="pointer-events-none fixed inset-x-0 z-[90] flex flex-col justify-end pb-2 md:pb-4" style={viewport}>
    <div
      className="pointer-events-auto mx-auto flex w-[min(960px,calc(100%-16px))] items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-white shadow-[0_16px_40px_rgba(17,24,39,0.22)] md:w-[min(960px,calc(100%-24px))] md:gap-3 md:rounded-2xl md:px-6 md:py-4"
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
        {canCompare ? (
          <Link
            href="/compare"
            className="flex min-h-10 items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-bold leading-tight transition-opacity hover:opacity-90 md:px-4 md:text-sm"
            style={{ color: "#2F5D46" }}
          >
            제품 비교하기
            <span className="hidden md:inline"> ({selectedSlugs.length})</span>
          </Link>
        ) : (
          <span className="flex min-h-10 items-center justify-center rounded-lg bg-white/15 px-3 py-2 text-xs font-semibold leading-tight text-white md:px-4 md:text-sm">
            하나 더 담아주세요
          </span>
        )}
      </div>
    </div>
    </div>
  );
}
