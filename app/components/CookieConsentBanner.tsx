"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hasStoredCookieConsent, saveCookieConsent } from "@/lib/cookieConsent";

export default function CookieConsentBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!hasStoredCookieConsent()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible || pathname === "/cookie-settings") return null;

  const chooseAnalytics = (analytics: boolean) => {
    saveCookieConsent({ functional: true, analytics, advertising: false });
    setVisible(false);
  };

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-[620px] rounded-2xl border border-[#d9d6cf] bg-white p-4 shadow-[0_12px_36px_rgba(22,65,45,0.2)] md:bottom-5"
      aria-label="쿠키 동의"
    >
      <p className="text-sm font-bold text-[#16412D]">분석 쿠키 사용 안내</p>
      <p className="mt-1 text-xs leading-5 text-[#5E6E61]">
        사이트 개선을 위해 익명 이용 통계를 수집합니다. 동의하지 않아도 제품 비교 기능은 그대로 이용할 수 있습니다.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        <Link href="/cookie-settings" className="mr-auto px-1 text-xs font-semibold text-[#35604A] underline underline-offset-2">
          상세 설정
        </Link>
        <button
          type="button"
          onClick={() => chooseAnalytics(false)}
          className="min-h-9 rounded-lg border border-[#cfd8d1] px-3 text-xs font-bold text-[#35604A]"
        >
          필수만 사용
        </button>
        <button
          type="button"
          onClick={() => chooseAnalytics(true)}
          className="min-h-9 rounded-lg bg-[#1F5A3D] px-3 text-xs font-bold text-white"
        >
          분석 허용
        </button>
      </div>
    </aside>
  );
}
