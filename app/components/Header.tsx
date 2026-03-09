"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems, type NavigationChildItem } from "@/data/navigation";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function hasActiveChild(pathname: string, children: NavigationChildItem[]): boolean {
  return children.some((child) => isActive(pathname, child.href));
}

export default function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const open = openPath === pathname;

  useEffect(() => {
    let cancelled = false;

    const checkAdminSession = async () => {
      try {
        const res = await fetch("/api/admin/check", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as { isAdmin?: boolean };
        if (!cancelled) setIsAdmin(data.isAdmin === true);
      } catch {
        // Keep false when session check fails.
      }
    };

    void checkAdminSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleNavItems = navigationItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <header className="sticky top-0 z-50 border-b border-[#f0eeeb] bg-white">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-bold text-[var(--accent)]">
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            <Image src="/proteinlab-logo.png" alt="" width={32} height={32} className="object-contain" priority />
          </span>
          ProteinLab
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="메인 메뉴">
          {visibleNavItems.map((item) => {
            if (item.children) {
              const parentActive = hasActiveChild(pathname, item.children);
              return (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)] ${
                      parentActive ? "bg-[var(--accent-light)] font-semibold text-[var(--accent)]" : "text-[var(--foreground)]"
                    }`}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>

                  <div className="absolute left-0 top-full z-50 hidden min-w-[180px] overflow-hidden rounded-md border border-[var(--border)] bg-white py-1 shadow-md group-hover:block group-focus-within:block">
                    {item.children.map((child) => {
                      const childActive = isActive(pathname, child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`dropdown-item ${childActive ? "bg-[var(--accent-light)] font-semibold text-[var(--accent)]" : ""}`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (!item.href) return null;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)] ${
                  active ? "bg-[var(--accent-light)] font-semibold text-[var(--accent)]" : "text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--foreground)] hover:bg-[var(--accent-light)] md:hidden"
          onClick={() => setOpenPath((current) => (current === pathname ? null : pathname))}
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

      {open && (
        <nav className="border-t border-[#f0eeeb] bg-white px-4 py-2 md:hidden" aria-label="모바일 메뉴">
          {visibleNavItems.map((item) => {
            if (item.children) {
              const parentActive = hasActiveChild(pathname, item.children);
              return (
                <div key={item.label} className="border-b border-[#f5f5f5] py-1 last:border-0">
                  <p className={`px-1 py-2 text-sm font-semibold ${parentActive ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                    {item.label}
                  </p>
                  {item.children.map((child) => {
                    const childActive = isActive(pathname, child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`dropdown-item pl-5 ${childActive ? "bg-[var(--accent-light)] font-semibold text-[var(--accent)]" : ""}`}
                        onClick={() => setOpenPath(null)}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              );
            }

            if (!item.href) return null;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center border-b border-[#f5f5f5] py-3 text-sm font-medium last:border-0 ${
                  active ? "font-semibold text-[var(--accent)]" : "text-[var(--foreground)]"
                }`}
                onClick={() => setOpenPath(null)}
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
