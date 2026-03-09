"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const primaryTabs = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/products", label: "제품관리" },
  { href: "/admin/images", label: "이미지" },
  { href: "/admin/guides", label: "가이드" },
];

const moreTabs = [
  { href: "/admin/stats", label: "통계" },
  { href: "/admin/settings", label: "설정" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export default function AdminBottomTab() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      <div className="admin-bottom-tab">
        {primaryTabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`admin-bottom-tab__item ${isActive(pathname, tab.href) ? "is-active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
        <button
          type="button"
          className={`admin-bottom-tab__item ${menuOpen ? "is-active" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="admin-more-drawer"
        >
          더보기
        </button>
      </div>

      {menuOpen ? (
        <div id="admin-more-drawer" className="admin-more-drawer">
          {moreTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`admin-more-drawer__item ${isActive(pathname, tab.href) ? "is-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {tab.label}
            </Link>
          ))}
          <button
            type="button"
            className="admin-more-drawer__item text-red-600"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      ) : null}
    </>
  );
}

