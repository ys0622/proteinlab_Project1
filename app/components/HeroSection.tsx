"use client";

import TrackedLink from "./TrackedLink";

const heroQuickLinks = [
  {
    href: "/ranking",
    label: "순위 보기",
    section: "hero_primary_cta",
  },
  {
    href: "/recommend",
    label: "맞춤 추천",
    section: "hero_primary_cta",
  },
  {
    href: "/compare",
    label: "비교함 열기",
    section: "hero_secondary_cta",
  },
] as const;

export default function HeroSection() {
  return (
    <section
      className="w-full border-b bg-[var(--hero-bg)] md:border-t"
      style={{ borderColor: "var(--hero-border)" }}
      aria-label="단백질 제품 비교 허브 소개"
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-3 pt-0 md:px-6 md:py-5">
        <div>
          <h1
            className="text-[19px] font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            단백질 제품 비교 허브
          </h1>
          <p
            className="mt-1 text-[11px] leading-snug text-[var(--foreground-muted)] md:mt-1.5 md:max-w-3xl md:text-sm md:leading-normal"
            style={{ fontWeight: 400 }}
          >
            음료, 바, 요거트, 쉐이크 322종을 단백질 함량, 당류, 칼로리 기준으로 바로 비교해보세요.
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
          {heroQuickLinks.map((item, index) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              trackingLabel={item.label}
              trackingSection={item.section}
              trackingPageType="home"
              className={
                index === 0
                  ? "inline-flex min-h-11 min-w-[132px] items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(47,111,74,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-95 md:text-sm"
                  : "inline-flex min-h-9 items-center rounded-full border border-[#d7e4d9] bg-white px-3.5 py-2 text-xs font-semibold text-[#24543d] transition-colors hover:border-[#24543d] hover:bg-[#f3faf5] md:text-sm"
              }
            >
              {item.label}
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
