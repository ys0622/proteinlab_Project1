"use client";

"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="w-full border-b bg-[var(--hero-bg)] md:border-t"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="단백질 제품 비교 플랫폼 소개"
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:py-4">
        <div>
          <h1
            className="text-[19px] font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            단백질 제품 322종 비교
          </h1>
          <p
            className="mt-0.5 text-[11px] leading-snug text-[var(--foreground-muted)] md:mt-1 md:text-sm md:leading-normal"
            style={{ fontWeight: 400 }}
          >
            음료, 바, 요거트, 쉐이크를 단백질, 당류, 칼로리 기준으로 비교하고 저당, 40g, 다이어트, 50대 제품까지 바로 찾습니다.
          </p>
          <div className="mt-2 flex flex-wrap gap-2 md:mt-3">
            <Link
              href="/guides/product-selection-comparison/selex-vs-himune"
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)] md:text-xs"
            >
              셀렉스 vs 하이뮨
            </Link>
            <Link
              href="/guides/product-selection-comparison/high-protein-40g-comparison"
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)] md:text-xs"
            >
              40g 이상 비교
            </Link>
            <Link
              href="/guides/product-selection-comparison/protein-category-guide"
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)] md:text-xs"
            >
              카테고리부터 고르기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
