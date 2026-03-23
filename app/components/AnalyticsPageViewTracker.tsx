"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isAnalyticsReady, pageView } from "@/lib/analytics";

export default function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedUrlRef.current === url) return;

    let cancelled = false;
    let attempts = 0;

    const track = () => {
      if (cancelled || lastTrackedUrlRef.current === url) return;

      if (pageView(url)) {
        lastTrackedUrlRef.current = url;
        return;
      }

      attempts += 1;
      if (attempts >= 20 || isAnalyticsReady()) return;

      window.setTimeout(track, 250);
    };

    track();

    return () => {
      cancelled = true;
    };
  }, [pathname, searchParams]);

  return null;
}
