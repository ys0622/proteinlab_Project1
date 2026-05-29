import type { ReactNode } from "react";
import GuideAdInjector from "@/components/GuideAdInjector";

const GUIDE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_GUIDE_TOP_SLOT?.trim() ?? "";
const INSIGHT_SLOT = process.env.NEXT_PUBLIC_ADSENSE_INSIGHT_MID_SLOT?.trim() ?? "";

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GuideAdInjector guideSlot={GUIDE_SLOT} insightSlot={INSIGHT_SLOT} />
    </>
  );
}
