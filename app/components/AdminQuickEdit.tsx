"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export default function AdminQuickEdit({ slug }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAdminSession = async () => {
      try {
        const res = await fetch("/api/admin/check", { cache: "no-store" });
        if (!res.ok || cancelled) {
          return;
        }

        const data = (await res.json()) as { isAdmin?: boolean };
        if (!cancelled) {
          setIsAdmin(data.isAdmin === true);
        }
      } catch {
        if (!cancelled) {
          setIsAdmin(false);
        }
      }
    };

    void checkAdminSession();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <Link
      href={`/admin/products/${slug}/edit`}
      className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
      title="관리자 전용"
    >
      <span>✦</span>
      관리자 수정
    </Link>
  );
}
