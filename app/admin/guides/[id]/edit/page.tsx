"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Guide {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  heroImage?: string;
  content?: string;
  tags?: string[];
  publishStatus?: "draft" | "published";
  updatedAt?: string;
}

const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

export default function GuideEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/guides/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setGuide(data);
        setLoading(false);
      })
      .catch(() => {
        setError("가이드를 불러올 수 없습니다.");
        setLoading(false);
      });
  }, [id]);

  const set = (field: keyof Guide, value: unknown) => {
    setGuide((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!guide) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/guides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guide),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const d = await res.json();
        setError(d.error ?? "저장 실패");
      }
    } catch {
      setError("서버 오류");
    } finally {
      setSaving(false);
    }
  };

  // Basic markdown to HTML (minimal, no deps)
  const renderMarkdown = (md: string) => {
    return md
      .split("\n")
      .map((line) => {
        if (line.startsWith("# ")) return `<h1 class="text-2xl font-bold mt-4 mb-2">${line.slice(2)}</h1>`;
        if (line.startsWith("## ")) return `<h2 class="text-xl font-semibold mt-3 mb-1">${line.slice(3)}</h2>`;
        if (line.startsWith("### ")) return `<h3 class="text-lg font-medium mt-2 mb-1">${line.slice(4)}</h3>`;
        if (line.startsWith("- ")) return `<li class="ml-4 list-disc">${line.slice(2)}</li>`;
        if (line.trim() === "") return "<br/>";
        return `<p class="mb-1">${line
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.+?)\*/g, "<em>$1</em>")}</p>`;
      })
      .join("\n");
  };

  if (loading) return <div className="p-6 text-center text-[var(--foreground-muted)]">로딩 중...</div>;
  if (!guide) return (
    <div className="p-6 text-center text-[var(--foreground-muted)]">
      가이드를 찾을 수 없습니다.
      <Link href="/admin/guides" className="block mt-4 text-[var(--accent)] hover:underline">목록으로</Link>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/guides" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]">
            ← 목록
          </Link>
          <h1 className="text-xl font-semibold text-[var(--foreground)] mt-1">가이드 수정</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreview((v) => !v)}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            {preview ? "편집" : "미리보기"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
          >
            {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Meta */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">기본 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">제목</label>
              <input
                value={guide.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Slug</label>
              <input
                value={guide.slug}
                onChange={(e) => set("slug", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">요약</label>
              <textarea
                value={guide.summary ?? ""}
                onChange={(e) => set("summary", e.target.value)}
                className={`${inputCls} min-h-[60px] resize-y`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">히어로 이미지 URL</label>
              <input
                value={guide.heroImage ?? ""}
                onChange={(e) => set("heroImage", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">태그 (쉼표 구분)</label>
              <input
                value={(guide.tags ?? []).join(", ")}
                onChange={(e) =>
                  set(
                    "tags",
                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                  )
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">게시 상태</label>
              <select
                value={guide.publishStatus ?? "draft"}
                onChange={(e) => set("publishStatus", e.target.value)}
                className={inputCls}
              >
                <option value="draft">초안</option>
                <option value="published">게시됨</option>
              </select>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">
            본문 {preview && <span className="text-xs font-normal text-[var(--foreground-muted)]">— 미리보기</span>}
          </h2>

          {preview ? (
            <div
              className="prose prose-sm max-w-none text-[var(--foreground)] min-h-[300px] rounded-lg border border-[var(--border)] p-4 bg-[var(--background)]"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(guide.content ?? "") }}
            />
          ) : (
            <>
              <textarea
                value={guide.content ?? ""}
                onChange={(e) => set("content", e.target.value)}
                className={`${inputCls} min-h-[400px] resize-y font-mono text-xs`}
                placeholder="Markdown으로 작성하세요..."
              />
              <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                # H1 · ## H2 · **굵게** · *기울임* · - 목록
              </p>
            </>
          )}
        </section>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.push("/admin/guides")}
          className="rounded-full border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
        >
          목록으로
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
        >
          {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
        </button>
      </div>
    </div>
  );
}
