"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminBottomTab from "./components/AdminBottomTab";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [checked, setChecked] = useState(isLoginPage);
  const [isAdmin, setIsAdmin] = useState(isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      setIsAdmin(true);
      return;
    }

    let cancelled = false;

    const checkAdminSession = async () => {
      try {
        const res = await fetch("/api/admin/check", { cache: "no-store" });
        if (!res.ok) throw new Error("admin check failed");
        const data = (await res.json()) as { isAdmin?: boolean };
        if (cancelled) return;

        if (data.isAdmin === true) {
          setIsAdmin(true);
          setChecked(true);
          return;
        }

        setIsAdmin(false);
        setChecked(true);
        router.replace("/admin/login");
      } catch {
        if (cancelled) return;
        setIsAdmin(false);
        setChecked(true);
        router.replace("/admin/login");
      }
    };

    void checkAdminSession();
    return () => {
      cancelled = true;
    };
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!checked || !isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <div className="admin-sidebar">
        <AdminSidebar />
      </div>
      <main className="admin-content flex-1 overflow-auto">{children}</main>
      <AdminBottomTab />
    </div>
  );
}
