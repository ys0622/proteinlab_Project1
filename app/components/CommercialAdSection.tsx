"use client";

import AdSenseBlock from "@/components/AdSenseBlock";
import type { PageType } from "@/lib/analytics";

const LANDING_AD_SLOT =
  process.env.NEXT_PUBLIC_ADSENSE_LANDING_SLOT?.trim() ??
  process.env.NEXT_PUBLIC_ADSENSE_GUIDE_BOTTOM_SLOT?.trim() ??
  "";

const SLOT_BY_PAGE_TYPE: Partial<Record<PageType, string>> = {
  category: process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT?.trim() ?? LANDING_AD_SLOT,
  compare: process.env.NEXT_PUBLIC_ADSENSE_COMPARE_SLOT?.trim() ?? LANDING_AD_SLOT,
  feed: process.env.NEXT_PUBLIC_ADSENSE_FEED_SLOT?.trim() ?? LANDING_AD_SLOT,
  guide: process.env.NEXT_PUBLIC_ADSENSE_GUIDE_BOTTOM_SLOT?.trim() ?? LANDING_AD_SLOT,
  insight: process.env.NEXT_PUBLIC_ADSENSE_INSIGHT_MID_SLOT?.trim() ?? LANDING_AD_SLOT,
  product: process.env.NEXT_PUBLIC_ADSENSE_PRODUCT_SLOT?.trim() ?? LANDING_AD_SLOT,
  ranking: process.env.NEXT_PUBLIC_ADSENSE_RANKING_SLOT?.trim() ?? LANDING_AD_SLOT,
  recommend: process.env.NEXT_PUBLIC_ADSENSE_RECOMMEND_SLOT?.trim() ?? LANDING_AD_SLOT,
};

type CommercialAdSectionProps = {
  pageType: PageType;
  title?: string;
  description?: string;
  className?: string;
};

export default function CommercialAdSection({
  pageType,
  title = "광고가 포함된 정보 영역입니다",
  description = "제품 정보 흐름을 방해하지 않는 보조 영역에만 광고를 노출합니다.",
  className = "",
}: CommercialAdSectionProps) {
  const adSlot = SLOT_BY_PAGE_TYPE[pageType] ?? LANDING_AD_SLOT;
  if (!adSlot) return null;

  return (
    <section
      className={`rounded-[24px] border border-[#e6dfd4] bg-[#fffdf8] px-4 py-4 shadow-[0_12px_28px_rgba(37,32,24,0.05)] md:px-5 md:py-5 ${className}`}
    >
      <div className="mb-3">
        <h2 className="text-base font-semibold text-[var(--foreground)] md:text-lg">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{description}</p>
      </div>
      <AdSenseBlock slot={adSlot} pageType={pageType} />
    </section>
  );
}
