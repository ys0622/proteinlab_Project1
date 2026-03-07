"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeroSection() {
  const pathname = usePathname();
  const isBar = pathname === "/bars";

  return (
    <section
      className="relative w-full border-t border-b"
      style={{
        background: "var(--hero-bg)",
        borderColor: "var(--hero-border)",
        paddingTop: "16px",
        paddingBottom: "20px",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
      aria-label="히어로"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl" style={{ fontWeight: 700 }}>
          단백질 제품, 제대로 비교하다
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
          국내 단백질 제품의 성분과 영양 정보를 비교 정리하는 플랫폼입니다. 단백질 함량, 당류, 단백질 밀도 등 핵심 지표를 한눈에 확인하세요.
        </p>
        <div className="mt-2 flex gap-2">
          <Link
            href="/"
            className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${!isBar
              ? "bg-[var(--accent)] text-white"
              : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
            style={{ fontWeight: 400 }}
          >
            단백질 음료
          </Link>
          <Link
            href="/bars"
            className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${isBar
              ? "bg-[var(--accent)] text-white"
              : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
            style={{ fontWeight: 400 }}
          >
            단백질 바
          </Link>
        </div>
      </div>
    </section>
  );
}
