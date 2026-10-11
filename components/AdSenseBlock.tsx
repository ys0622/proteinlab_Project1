"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
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
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const impressionTrackedRef = useRef(false);
  const adSlot = slot?.trim() ?? "";

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !adSlot || pushedRef.current) return;
    const ins = insRef.current;
    if (!ins) return;

    // 폭이 0인 상태(레이아웃 전, 숨김 상태)에서 push하면 "No slot size for availableWidth=0" 오류가 나므로
    // 슬롯에 실제 폭이 생긴 뒤에 한 번만 push한다.
    const push = () => {
      if (pushedRef.current) return;
      pushedRef.current = true;
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch {
        // Ad blockers or AdSense script delays must not break page rendering.
      }
    };

    if (ins.offsetWidth > 0) {
      push();
      return;
    }
    if (typeof ResizeObserver === "undefined") {
      push();
      return;
    }
    const observer = new ResizeObserver(() => {
      if (ins.offsetWidth > 0) {
        observer.disconnect();
        push();
      }
    });
    observer.observe(ins);
    return () => observer.disconnect();
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
    <>
      <Script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div
        ref={wrapperRef}
        className={`ad-sense-block relative my-6 box-border min-h-[96px] w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-[#e8e2d8] bg-[#fbfaf7] px-2 py-3 md:my-8 md:min-h-[140px] md:px-3 md:py-4 ${className}`}
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
          ref={insRef}
          className="adsbygoogle block"
          style={{ display: "block", width: "100%", maxWidth: "100%", minWidth: 0 }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="false"
        />
      </div>
    </>
  );
}
