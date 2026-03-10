"use client";

export default function HeroSection() {
  return (
    <section
      className="w-full border-t border-b bg-[var(--hero-bg)]"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="히어로"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
        <h1
          className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
          style={{ fontWeight: 700 }}
        >
          단백질 제품, 제대로 비교하다
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
          셀렉스, 하이뮨, 더단백, 얼티브 등 국내 단백질 음료를 단백질 함량, 당류,
          밀도 등급 기준으로 비교합니다. 내 목적에 맞는 제품을 바로 찾아보세요.
        </p>
      </div>
    </section>
  );
}
