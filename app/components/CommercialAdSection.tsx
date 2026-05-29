"use client";

import AdSenseBlock from "@/components/AdSenseBlock";
import type { PageType } from "@/lib/analytics";

const LANDING_AD_SLOT =
  process.env.NEXT_PUBLIC_ADSENSE_LANDING_SLOT?.trim() ??
  process.env.NEXT_PUBLIC_ADSENSE_GUIDE_BOTTOM_SLOT?.trim() ??
  "";

type CommercialAdSectionProps = {
  pageType: PageType;
  title?: string;
  description?: string;
  className?: string;
};

export default function CommercialAdSection({
  pageType,
  title = "관련 정보와 함께 광고가 포함될 수 있습니다",
  description = "제품 정보 페이지가 아닌 정보성 랜딩 구간에만 광고를 노출합니다.",
  className = "",
}: CommercialAdSectionProps) {
  if (!LANDING_AD_SLOT) return null;

  return (
    <section
      className={`rounded-[24px] border border-[#e6dfd4] bg-[#fffdf8] px-4 py-4 shadow-[0_12px_28px_rgba(37,32,24,0.05)] md:px-5 md:py-5 ${className}`}
    >
      <div className="mb-3">
        <h2 className="text-base font-semibold text-[var(--foreground)] md:text-lg">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{description}</p>
      </div>
      <AdSenseBlock slot={LANDING_AD_SLOT} pageType={pageType} />
    </section>
  );
}
