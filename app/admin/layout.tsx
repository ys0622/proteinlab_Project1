"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminBottomTab from "./components/AdminBottomTab";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
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
