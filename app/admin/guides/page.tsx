"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Guide {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  publishStatus?: "draft" | "published";
  updatedAt?: string;
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const staticGuides = [
    { href: "/admin/guides/static", label: "✏️ 가이드 콘텐츠 편집 (CMS)", isEdit: true },
    { href: "/guides", label: "가이드 목록 미리보기 →", isEdit: false },
  ];

  useEffect(() => {
    fetch("/api/admin/guides")
      .then((r) => r.json())
      .then((data) => {
        setGuides(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/guides/${id}`, { method: "DELETE" });
    if (res.ok) {
      setGuides((prev) => prev.filter((g) => g.id !== id));
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">가이드 CMS</h1>
          <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
            동적 가이드 {guides.length}개
          </p>
        </div>
        <Link
          href="/admin/guides/new"
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          + 가이드 작성
        </Link>
      </div>

      {/* Static guides notice */}
      <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-2">
          가이드 콘텐츠 관리
        </h2>
        <div className="flex flex-wrap gap-2">
          {staticGuides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              target={g.isEdit ? undefined : "_blank"}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-[var(--accent-light)] ${
                g.isEdit
                  ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--beige-warm)] text-[var(--foreground)]"
              }`}
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Dynamic guides */}
      <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">동적 가이드</h2>

      {loading ? (
        <div className="text-center py-8 text-[var(--foreground-muted)]">로딩 중...</div>
      ) : guides.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--foreground-muted)] text-sm">
          등록된 가이드가 없습니다.
          <Link href="/admin/guides/new" className="block mt-2 text-[var(--accent)] hover:underline">
            첫 가이드 작성하기
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--beige-warm)]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">제목</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">상태</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">수정일</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {guides.map((g) => (
                <tr
                  key={g.id}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--beige-warm)]"
                >
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{g.title}</td>
                  <td className="px-4 py-3 text-[var(--foreground-muted)] text-xs">{g.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        g.publishStatus === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {g.publishStatus === "published" ? "게시됨" : "초안"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--foreground-muted)]">
                    {g.updatedAt ? new Date(g.updatedAt).toLocaleDateString("ko-KR") : "—"}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/guides/${g.id}/edit`}
                      className="text-xs text-[var(--accent)] hover:underline mr-3"
                    >
                      수정
                    </Link>
                    {deleteConfirm === g.id ? (
                      <>
                        <button
                          onClick={() => handleDelete(g.id)}
                          className="text-xs text-red-600 hover:underline mr-1"
                        >
                          확인
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs text-[var(--foreground-muted)] hover:underline"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(g.id)}
                        className="text-xs text-[var(--foreground-muted)] hover:text-red-500"
                      >
                        삭제
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
