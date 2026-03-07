"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password) {
      setError("비밀번호를 입력하세요.");
      return;
    }
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setError("비밀번호가 올바르지 않습니다.");
      return;
    }
    document.cookie = "proteinlab_admin=true; path=/; max-age=86400";
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-[var(--foreground)]">관리자 로그인</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          관리자만 접근할 수 있습니다.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)]">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
          >
            로그인
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-[var(--foreground-muted)]">
          비밀번호는 .env에 <code className="rounded bg-[var(--beige-warm)] px-1">NEXT_PUBLIC_ADMIN_PASSWORD</code>로 설정하세요.
        </p>
        <Link href="/" className="mt-4 block text-center text-sm text-[var(--accent)] hover:underline">
          홈으로
        </Link>
      </div>
    </div>
  );
}
