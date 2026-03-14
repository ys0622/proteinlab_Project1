"use client";

export default function HeroSection() {
  return (
    <section
      className="w-full border-b bg-[var(--hero-bg)] md:border-t"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="히어로"
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-2 pt-0.5 md:px-6 md:py-4">
        <div className="flex items-baseline gap-1.5 md:block">
          <h1
            className="text-[19px] font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            단백질 제품 비교 플랫폼
          </h1>
          <p
            className="shrink-0 text-[11px] leading-none text-[var(--foreground-muted)] md:mt-1 md:text-sm md:leading-normal"
            style={{ fontWeight: 400 }}
          >
            나에게 맞는 제품을 찾아보세요
          </p>
        </div>
      </div>
    </section>
  );
}
