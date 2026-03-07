"use client";

export default function HeroSection() {
  return (
    <section
      className="w-full border-t border-b bg-[var(--hero-bg)]"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="히어로"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
        <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl" style={{ fontWeight: 700 }}>
          단백질 제품, 제대로 비교하다
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
          국내 단백질 제품의 성분과 영양 정보를 비교 정리하는 플랫폼입니다. 단백질 함량, 당류, 단백질 밀도 등 핵심 지표를 한눈에 확인하세요.
        </p>
      </div>
    </section>
  );
}
