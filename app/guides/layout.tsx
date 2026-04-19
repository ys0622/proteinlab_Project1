import type { ReactNode } from "react";
import GuideAdInjector from "@/components/GuideAdInjector";

const GUIDE_BOTTOM_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_GUIDE_BOTTOM_SLOT;
const INSIGHT_MID_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_INSIGHT_MID_SLOT;

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GuideAdInjector guideSlot={GUIDE_BOTTOM_AD_SLOT} insightSlot={INSIGHT_MID_AD_SLOT} />
    </>
  );
}
