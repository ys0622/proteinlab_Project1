"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const COOKIE_CONSENT_KEY = "proteinlab_cookie_consent";

export default function CookieSettingsPage() {
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({ functional, analytics, advertising, timestamp: Date.now() })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1
            className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            쿠키 설정
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            사이트 이용에 필요한 쿠키 동의 여부를 선택할 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-8 space-y-6">
          {/* 기능 쿠키 */}
          <div
            className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "#d9d6cf" }}
          >
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">기능 쿠키</h2>
              <p className="mt-1 text-[13px] text-[var(--foreground-muted)]">
                다크모드 설정, 비교 바구니 등 사용자 선택 저장 (localStorage 포함). 사이트 기본 기능에 필요합니다.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={functional}
                onChange={(e) => setFunctional(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span className="text-sm font-medium text-[var(--foreground)]">필수</span>
            </label>
          </div>

          {/* 분석 쿠키 */}
          <div
            className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "#d9d6cf" }}
          >
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">분석 쿠키</h2>
              <p className="mt-1 text-[13px] text-[var(--foreground-muted)]">
                방문자 통계 파악 (Google Analytics 등 도입 시 적용). 서비스 개선에 활용됩니다.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span className="text-sm font-medium text-[var(--foreground)]">동의</span>
            </label>
          </div>

          {/* 광고 쿠키 */}
          <div
            className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "#d9d6cf" }}
          >
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">광고 쿠키</h2>
              <p className="mt-1 text-[13px] text-[var(--foreground-muted)]">
                Google AdSense 등 제3자 광고 서비스. 관심 기반 맞춤 광고에 사용됩니다.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={advertising}
                onChange={(e) => setAdvertising(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span className="text-sm font-medium text-[var(--foreground)]">동의</span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            {saved ? "저장됨 ✓" : "설정 저장"}
          </button>
          <Link
            href="/privacy"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            개인정보 처리방침 보기
          </Link>
        </div>

        <p className="mt-6 text-[13px] text-[var(--foreground-muted)]">
          브라우저 설정에서 쿠키를 거부하거나 삭제할 수도 있습니다. 쿠키를 비활성화해도 사이트의 주요 기능은 정상 이용 가능합니다.
        </p>
      </main>

      <Footer />
    </div>
  );
}
