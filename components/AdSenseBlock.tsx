"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { adClick, adImpression, getDeviceType, getPageType, type PageType } from "@/lib/analytics";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSenseBlockProps = {
  slot?: string;
  className?: string;
  format?: string;
  pageType?: PageType;
};

export default function AdSenseBlock({
  slot,
  className = "",
  format = "auto",
  pageType,
}: AdSenseBlockProps) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pushedRef = useRef(false);
  const impressionTrackedRef = useRef(false);
  const adSlot = slot?.trim() ?? "";

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !adSlot || pushedRef.current) return;

    pushedRef.current = true;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or AdSense script delays must not break page rendering.
    }
  }, [adSlot]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || !adSlot || impressionTrackedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || impressionTrackedRef.current) return;

        impressionTrackedRef.current = true;
        adImpression({
          pageType: pageType ?? getPageType(pathname),
          pagePath: pathname,
          adSlot,
          deviceType: getDeviceType(),
        });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [adSlot, pageType, pathname]);

  if (!ADSENSE_CLIENT_ID || !adSlot) return null;

  return (
    <div
      ref={wrapperRef}
      className={`ad-sense-block my-8 min-h-[120px] w-full overflow-hidden rounded-2xl border border-[#e8e2d8] bg-[#fbfaf7] px-3 py-4 md:min-h-[140px] ${className}`}
      onClick={() => {
        adClick({
          pageType: pageType ?? getPageType(pathname),
          pagePath: pathname,
          adSlot,
          deviceType: getDeviceType(),
        });
      }}
    >
      <p className="mb-2 text-center text-[11px] font-medium tracking-[0.08em] text-[var(--foreground-muted)]">
        AD
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
