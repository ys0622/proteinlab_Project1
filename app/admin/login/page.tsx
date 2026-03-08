"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("비밀번호를 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const text = await res.text();
      let data: { error?: string; ok?: boolean } = {};
      try {
        data = JSON.parse(text);
      } catch {
        setError(`서버 오류 (${res.status}): 응답을 확인할 수 없습니다.`);
        return;
      }

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error ?? "로그인에 실패했습니다.");
      }
    } catch (err) {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-8 shadow-sm">
        <div className="mb-6">
          <Link
            href="/"
            className="text-lg font-bold text-[var(--accent)]"
          >
            ProteinLab
          </Link>
          <h1 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
            관리자 로그인
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            이 영역은 관리자만 접근할 수 있습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              autoComplete="current-password"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[var(--accent)] py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
