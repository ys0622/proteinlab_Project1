"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "제품 목록", href: "/" },
  { label: "제품 추천", href: "/recommend" },
  { label: "등급 랭킹", href: "/ranking" },
  { label: "등급 기준", href: "/grade-criteria" },
  { label: "브랜드 이벤트 & 혜택", href: "/official-events" },
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

  return (
    <header className="sticky top-0 z-10 bg-[#ffffff]">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="shrink-0 text-lg font-bold text-[var(--accent)]">
          ProteinLab
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 md:gap-2" aria-label="메인 메뉴">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)] ${
                  active
                    ? "bg-[var(--accent-light)] text-[var(--accent)]"
                    : item.adminOnly
                      ? "text-[var(--foreground-muted)]"
                      : "text-[var(--foreground)]"
                }`}
                style={active ? { fontWeight: 700 } : undefined}
                title={item.adminOnly ? "관리자 전용" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
