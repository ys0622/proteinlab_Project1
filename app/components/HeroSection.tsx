"use client";

import { useState } from "react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"drink" | "bar">("drink");

  return (
    <section className="border-b border-[var(--border)] pb-6">
      <h1 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
        단백질 제품, 제대로 비교하다
      </h1>
      <p className="mt-2 text-[var(--foreground-muted)]">
        국내 단백질 제품의 성분과 영양 정보를 비교·정리하는 플랫폼입니다.
      </p>
      <p className="mt-2 text-xs text-[var(--foreground-muted)]">
        영양성분: 제조사 공식 자료·제품 라벨 기반 수집 · 가격: 쿠팡 최저가 기준 참고값 (변동될 수 있음) · 마지막 업데이트 2026-03-05
      </p>
      {/* 탭: proteinlab.kr과 동일 */}
      <div className="mt-6 flex gap-0 border-b border-[var(--border)]">
        <button
          type="button"
          onClick={() => setActiveTab("drink")}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "drink"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          단백질음료
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bar")}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "bar"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          단백질바
        </button>
      </div>
    </section>
  );
}
