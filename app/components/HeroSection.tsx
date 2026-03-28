"use client";

export default function HeroSection() {
  return (
    <section
      className="w-full border-b bg-[var(--hero-bg)] md:border-t"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="단백질 제품 비교 플랫폼 소개"
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-1 pt-0 md:px-6 md:py-4">
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
            음료·바·요거트·쉐이크 322개 이상 · 단백질·당류·칼로리 성분 기준 직접 비교
          </p>
        </div>
      </div>
    </section>
  );
}
