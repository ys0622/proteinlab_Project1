"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
  type CookieConsent,
} from "@/lib/cookieConsent";

type Props = {
  measurementId: string;
};

export default function AnalyticsConsentManager({ measurementId }: Props) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const syncConsent = () => setConsent(readCookieConsent());
    const handleConsentChange = (event: Event) => {
      const nextConsent = (event as CustomEvent<CookieConsent>).detail ?? readCookieConsent();
      setConsent(nextConsent);
      if (!nextConsent.analytics) {
        window.gtag?.("consent", "update", {
          analytics_storage: "denied",
          ad_storage: nextConsent.advertising ? "granted" : "denied",
          ad_user_data: nextConsent.advertising ? "granted" : "denied",
          ad_personalization: nextConsent.advertising ? "granted" : "denied",
        });
      }
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    window.addEventListener("storage", syncConsent);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  if (!consent?.analytics) return null;

  const advertisingConsent = consent.advertising ? "granted" : "denied";

  return (
    <>
      <Script
        id="ga4-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: '${advertisingConsent}',
            ad_user_data: '${advertisingConsent}',
            ad_personalization: '${advertisingConsent}'
          });
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
