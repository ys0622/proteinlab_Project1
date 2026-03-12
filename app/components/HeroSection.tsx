"use client";

export default function HeroSection() {
  return (
    <section
      className="w-full border-t border-b bg-[var(--hero-bg)]"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="히어로"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-3 md:px-6 md:py-4">
        <h1
          className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
          style={{ fontWeight: 700 }}
        >
          단백질 제품 비교 플랫폼
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
          나에게 맞는 제품을 찾아보세요
        </p>
      </div>
    </section>
  );
}
