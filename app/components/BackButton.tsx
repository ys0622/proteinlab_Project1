"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]"
    >
      ← 뒤로
    </button>
  );
}
