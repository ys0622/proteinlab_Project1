"use client";

import { useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAdminSession = async () => {
      try {
        const res = await fetch("/api/admin/check", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { isAdmin?: boolean };
        if (!cancelled) setIsAdmin(data.isAdmin === true);
      } catch {
        if (!cancelled) setIsAdmin(false);
      }
    };

    void checkAdminSession();
    return () => {
      cancelled = true;
    };
  }, []);

  return <HeaderClient isAdmin={isAdmin} />;
}

