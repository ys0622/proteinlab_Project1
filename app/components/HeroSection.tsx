"use client";

import { usePathname } from "next/navigation";
import ShareButton from "./ShareButton";

const PAGE_META: Record<string, { title: string; desc: string }> = {
  "/drinks": { title: "단백질 음료 비교 | ProteinLab", desc: "RTD 단백질 음료 성분 비교" },
  "/bars":   { title: "단백질 바 비교 | ProteinLab",   desc: "단백질 바 성분 비교" },
  "/yogurt": { title: "단백질 요거트 비교 | ProteinLab", desc: "단백질 요거트 성분 비교" },
  "/shake":  { title: "단백질 쉐이크 비교 | ProteinLab", desc: "단백질 쉐이크 성분 비교" },
};

interface HeroSectionProps {
  totalCount: number;
}

export default function HeroSection({ totalCount }: HeroSectionProps) {
  const pathname = usePathname();
  const meta = PAGE_META[pathname] ?? { title: "단백질 제품 비교 | ProteinLab", desc: "단백질 제품 성분 비교" };

  return (
    <section
      className="w-full border-b bg-[var(--hero-bg)] md:border-t"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="단백질 제품 비교 플랫폼 소개"
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-1 pt-0 md:px-6 md:py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1
              className="text-[19px] font-bold leading-tight text-[var(--foreground)] md:text-3xl"
              style={{ fontWeight: 700 }}
            >
              단백질 제품 비교 플랫폼
            </h1>
            <p
              className="mt-0.5 text-[11px] leading-snug text-[var(--foreground-muted)] md:mt-1 md:text-sm md:leading-normal"
              style={{ fontWeight: 400 }}
            >
              음료·바·요거트·쉐이크 {totalCount}개 · 단백질·당류·칼로리 성분 기준 직접 비교
            </p>
          </div>
          <div className="shrink-0 pt-0.5">
            <ShareButton
              url={pathname}
              title={meta.title}
              description={meta.desc}
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
}
