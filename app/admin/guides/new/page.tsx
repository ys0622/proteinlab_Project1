"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

export default function NewGuidePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    heroImage: "",
    content: "",
    tags: "",
    publishStatus: "draft" as "draft" | "published",
  });

  const set = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title") {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) {
      setError("제목과 slug는 필수입니다.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const id = `guide-${Date.now()}`;
      const res = await fetch("/api/admin/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          slug: form.slug,
          title: form.title,
          summary: form.summary || undefined,
          heroImage: form.heroImage || undefined,
          content: form.content,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          publishStatus: form.publishStatus,
        }),
      });

      if (res.ok) {
        router.push(`/admin/guides/${id}/edit`);
      } else {
        const d = await res.json();
        setError(d.error ?? "저장 실패");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/guides" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]">
            ← 목록
          </Link>
          <h1 className="text-xl font-semibold text-[var(--foreground)] mt-1">가이드 작성</h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Meta */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">기본 정보</h2>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">제목 *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Slug *</label>
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className={inputCls}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">요약</label>
            <textarea
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              className={`${inputCls} min-h-[60px] resize-y`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">히어로 이미지 URL</label>
            <input
              value={form.heroImage}
              onChange={(e) => set("heroImage", e.target.value)}
              className={inputCls}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">태그 (쉼표 구분)</label>
            <input
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              className={inputCls}
              placeholder="단백질, 다이어트, 초보자"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">게시 상태</label>
            <select
              value={form.publishStatus}
              onChange={(e) => set("publishStatus", e.target.value)}
              className={inputCls}
            >
              <option value="draft">초안</option>
              <option value="published">게시됨</option>
            </select>
          </div>
        </section>

        {/* Content */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">본문 (Markdown)</h2>
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            className={`${inputCls} min-h-[320px] resize-y font-mono text-xs`}
            placeholder="# 제목&#10;&#10;내용을 여기에 Markdown으로 작성하세요..."
          />
          <p className="mt-2 text-xs text-[var(--foreground-muted)]">
            Markdown 형식으로 작성하세요. # 제목, ## 소제목, **굵게**, *기울임*, - 목록
          </p>
        </section>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/guides"
            className="rounded-full border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
          >
            {saving ? "저장 중..." : "가이드 저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
