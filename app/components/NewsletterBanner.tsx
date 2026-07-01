"use client";

import { useState } from "react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "오류가 발생했습니다.");
        setStatus("error");
      } else {
        setStatus("done");
      }
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className="w-full rounded-2xl px-6 py-5 text-center"
        style={{ background: "#EDFAF3", border: "1px solid #B6E5CF" }}
      >
        <p className="text-[15px] font-bold" style={{ color: "#1B7F5B" }}>
          신청 완료! 신제품 소식이 나오면 알려드릴게요 ✓
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl px-5 py-5 md:px-6"
      style={{ background: "#F3F0EB", border: "1px solid #E4DDD3" }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex-1">
          <p className="text-[14px] font-bold text-[var(--foreground)]">
            🔔 신제품 출시 알림 받기
          </p>
          <p className="mt-0.5 text-[12px] text-[var(--foreground-muted)]">
            새 단백질 제품이 나오면 이메일로 알려드려요. 스팸 없이 신제품 소식만.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
            required
            className="min-w-0 flex-1 rounded-xl border bg-white px-3 py-2.5 text-[13px] text-[var(--foreground)] placeholder:text-[var(--foreground-muted-light)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] md:w-[200px] md:flex-none"
            style={{ borderColor: "#D6CFC5" }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: "#2D4A35" }}
          >
            {status === "loading" ? "…" : "신청"}
          </button>
        </form>
      </div>
      {status === "error" && (
        <p className="mt-2 text-[12px]" style={{ color: "#B53A2F" }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
