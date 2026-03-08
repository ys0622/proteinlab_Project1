"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "대시보드", icon: "⊞" },
  { href: "/admin/products", label: "제품 관리", icon: "◫" },
  { href: "/admin/images", label: "이미지 작업", icon: "◻" },
  { href: "/admin/guides", label: "가이드 CMS", icon: "≡" },
  { href: "/admin/stats", label: "통계", icon: "↗" },
  { href: "/admin/settings", label: "설정", icon: "⊙" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-52 shrink-0 min-h-screen bg-[var(--white-warm)] border-r border-[var(--border)] flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <Link href="/" className="text-base font-bold text-[var(--accent)]">
          ProteinLab
        </Link>
        <p className="text-[10px] text-[var(--foreground-muted)] mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-[var(--accent-light)] text-[var(--accent)]"
                : "text-[var(--foreground-muted)] hover:bg-[var(--beige-warm)] hover:text-[var(--foreground)]"
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-3 border-t border-[var(--border)]">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:bg-[var(--beige-warm)] hover:text-[var(--foreground)] transition-colors"
        >
          <span className="text-base leading-none">←</span>
          사이트 보기
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <span className="text-base leading-none">↩</span>
          {loggingOut ? "로그아웃 중..." : "로그아웃"}
        </button>
      </div>
    </aside>
  );
}
