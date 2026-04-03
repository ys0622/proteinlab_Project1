"use client";

export default function HeroSection() {
  return (
    <section
      className="w-full border-b bg-[var(--hero-bg)] md:border-t"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="단백질 제품 비교 플랫폼 소개"
    >
      <div className="mx-auto flex min-h-[148px] max-w-[1200px] flex-col justify-center px-4 py-5 md:min-h-[164px] md:px-6 md:py-6">
        <div>
          <h1
            className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            단백질 제품 비교 플랫폼
          </h1>
          <p
            className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]"
            style={{ fontWeight: 400 }}
          >
            음료·바·요거트·쉐이크 329종을 단백질, 당류, 칼로리 기준으로 한 번에 비교할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
