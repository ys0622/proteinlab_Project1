"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isAnalyticsReady, pageView } from "@/lib/analytics";

export default function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = useRef<string | null>(null);
  const lastTrackedLocationRef = useRef<string | null>(null);
  const query = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!pathname) return;

    const url = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedUrlRef.current === url) return;

    let cancelled = false;
    let attempts = 0;

    const track = () => {
      if (cancelled || lastTrackedUrlRef.current === url) return;

      const pageReferrer = lastTrackedLocationRef.current ?? document.referrer;
      const shouldUseFallback = attempts >= 20;
      if (pageView(url, pageReferrer, shouldUseFallback)) {
        lastTrackedUrlRef.current = url;
        lastTrackedLocationRef.current = window.location.href;
        return;
      }

      attempts += 1;
      if (attempts > 20 || isAnalyticsReady()) return;

      window.setTimeout(track, 250);
    };

    track();

    return () => {
      cancelled = true;
    };
  }, [pathname, query]);

  return null;
}
