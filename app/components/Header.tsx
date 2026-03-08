"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "제품 목록", href: "/" },
  { label: "제품 추천", href: "/recommend" },
  { label: "등급 랭킹", href: "/ranking" },
  { label: "등급 기준", href: "/grade-criteria" },
  { label: "브랜드 이벤트", href: "/official-events" },
  { label: "단백질 가이드", href: "/guides" },
  { label: "문의", href: "/contact" },
  { label: "관리", href: "/admin", adminOnly: true },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 경로 바뀌면 닫기
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#f0eeeb]">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* 로고 */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-bold text-[var(--accent)]">
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            <Image src="/proteinlab-logo.png" alt="" width={32} height={32} className="object-contain" priority />
          </span>
          ProteinLab
        </Link>

        {/* 데스크톱 네비 */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="메인 메뉴">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)] ${
                  active
                    ? "bg-[var(--accent-light)] text-[var(--accent)] font-semibold"
                    : item.adminOnly
                      ? "text-[var(--foreground-muted)]"
                      : "text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 모바일 햄버거 */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--foreground)] hover:bg-[var(--accent-light)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="13" x2="21" y2="13" />
              <line x1="3" y1="19" x2="21" y2="19" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {open && (
        <nav
          className="md:hidden border-t border-[#f0eeeb] bg-white px-4 py-2"
          aria-label="모바일 메뉴"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-3 text-sm font-medium border-b border-[#f5f5f5] last:border-0 ${
                  active
                    ? "text-[var(--accent)] font-semibold"
                    : item.adminOnly
                      ? "text-[var(--foreground-muted)]"
                      : "text-[var(--foreground)]"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
