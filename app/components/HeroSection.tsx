"use client";

import { usePathname } from "next/navigation";
import ShareButton from "./ShareButton";

const PAGE_META: Record<string, { h1: string; sub: string; title: string; desc: string }> = {
  "/drinks": {
    h1: "단백질 음료 추천 비교",
    sub: "RTD 단백질 드링크 {count}종 · 단백질·당류·칼로리 성분 기준 직접 비교",
    title: "단백질 음료 비교 | ProteinLab",
    desc: "RTD 단백질 음료 성분 비교",
  },
  "/bars": {
    h1: "단백질바 추천 비교",
    sub: "단백질바 {count}종 · 단백질·당류·칼로리·중량 기준 직접 비교",
    title: "단백질바 비교 | ProteinLab",
    desc: "단백질바 성분 비교",
  },
  "/yogurt": {
    h1: "단백질 요거트 추천 비교",
    sub: "단백질 요거트 {count}종 · 그릭·드링킹 유형별 성분 기준 직접 비교",
    title: "단백질 요거트 비교 | ProteinLab",
    desc: "단백질 요거트 성분 비교",
  },
  "/shake": {
    h1: "단백질 쉐이크 추천 비교",
    sub: "단백질 쉐이크 {count}종 · 식사대용·저당·고단백 성분 기준 직접 비교",
    title: "단백질 쉐이크 비교 | ProteinLab",
    desc: "단백질 쉐이크 성분 비교",
  },
  "/soymilk": {
    h1: "두유 추천 비교",
    sub: "두유 {count}종 · 1팩 단백질(고단백 11g+)·당류·칼로리 성분 기준 직접 비교",
    title: "두유 비교 | ProteinLab",
    desc: "두유 성분 비교",
  },
  "/powder": {
    h1: "단백질 파우더 추천 비교",
    sub: "단백질 파우더 {count}종 · 1회 단백질·단백질 함량(%)·원료 성분표 기준 직접 비교",
    title: "단백질 파우더 비교 | ProteinLab",
    desc: "단백질 파우더 성분 비교",
  },
};

interface HeroSectionProps {
  totalCount: number;
  categoryCount?: number;
  /** 검색어에 바로 답하는 한 줄(성분표 데이터로 계산). 없으면 그리지 않는다. */
  answer?: string;
}

export default function HeroSection({ totalCount, categoryCount, answer }: HeroSectionProps) {
  const pathname = usePathname();
  const meta = PAGE_META[pathname] ?? {
    h1: "단백질 제품 추천 비교",
    sub: "음료·바·요거트·쉐이크·두유 {count}종 · 단백질·당류·칼로리 성분 기준 직접 비교",
    title: "단백질 제품 비교 | ProteinLab",
    desc: "단백질 제품 성분 비교",
  };

  const count = categoryCount ?? totalCount;

  return (
    <section
      className="w-full border-b bg-[var(--hero-bg)] md:border-t"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="단백질 제품 비교 플랫폼 소개"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-1.5 md:px-6 md:py-2.5">
        <div className="flex items-center justify-between gap-3">
          <h1
            className="text-[15px] font-bold leading-tight text-[var(--foreground)] md:text-xl"
            style={{ fontWeight: 700 }}
          >
            {meta.h1} <span className="font-medium text-[var(--foreground-muted)]">({count}개 상품)</span>
          </h1>
          <div className="shrink-0">
            <ShareButton
              url={pathname}
              title={meta.title}
              description={meta.desc}
              compact
            />
          </div>
        </div>
        {answer ? <p className="mt-0.5 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">{answer}</p> : null}
      </div>
    </section>
  );
}
