"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type {
  AdminGuideArticle,
  AdminGuidesStaticData,
  AdminGuideSection,
  AdminMainTrack,
} from "@/app/lib/adminGuidesStatic";

const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

function ArticleEditor({
  article,
  index,
  onChange,
}: {
  article: AdminGuideArticle;
  index: number;
  onChange: (idx: number, updated: AdminGuideArticle) => void;
}) {
  const set = (field: keyof AdminGuideArticle, value: string | string[]) =>
    onChange(index, { ...article, [field]: value });

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {article.emoji} {article.title || `콘텐츠 ${index + 1}`}
          </p>
          <p className="mt-0.5 text-xs text-[var(--foreground-muted)]">{article.href}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            article.status === "live" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {article.status === "live" ? "라이브" : "예정"}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-[72px_1fr]">
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">아이콘</label>
          <input value={article.emoji} onChange={(e) => set("emoji", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">제목</label>
          <input value={article.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_1fr_120px]">
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">slug</label>
          <input value={article.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">미리보기 링크</label>
          <input value={article.href} onChange={(e) => set("href", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">읽기 시간</label>
          <input value={article.readTime} onChange={(e) => set("readTime", e.target.value)} className={inputCls} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">설명</label>
        <textarea
          value={article.description}
          onChange={(e) => set("description", e.target.value)}
          className={`${inputCls} min-h-[72px] resize-y`}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">태그</label>
        <input
          value={article.tags.join(", ")}
          onChange={(e) =>
            set(
              "tags",
              e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
          className={inputCls}
        />
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  onChange,
}: {
  section: AdminGuideSection;
  onChange: (updated: AdminGuideSection) => void;
}) {
  const setField = (field: keyof AdminGuideSection, value: string) => onChange({ ...section, [field]: value });
  const setArticle = (index: number, updated: AdminGuideArticle) => {
    const articles = [...section.articles];
    articles[index] = updated;
    onChange({ ...section, articles });
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 space-y-4">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">트랙 메타</h3>
        <div className="grid gap-3 md:grid-cols-[72px_1fr]">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">아이콘</label>
            <input value={section.emoji} onChange={(e) => setField("emoji", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">트랙 제목</label>
            <input value={section.title} onChange={(e) => setField("title", e.target.value)} className={inputCls} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">트랙 설명</label>
          <textarea
            value={section.description}
            onChange={(e) => setField("description", e.target.value)}
            className={`${inputCls} min-h-[84px] resize-y`}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">Track label</label>
            <input value={section.trackLabel} onChange={(e) => setField("trackLabel", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">대표 색상</label>
            <input value={section.accentColor} onChange={(e) => setField("accentColor", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">배경 색상</label>
            <input value={section.accentBg} onChange={(e) => setField("accentBg", e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">등록 콘텐츠</h3>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">
              {section.articles.length}개 콘텐츠가 현재 CMS 인벤토리에 잡혀 있습니다.
            </p>
          </div>
          <Link
            href={section.previewHref}
            target="_blank"
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            트랙 미리보기
          </Link>
        </div>

        <div className="space-y-3">
          {section.articles.map((article, index) => (
            <ArticleEditor key={`${section.id}-${article.slug}-${index}`} article={article} index={index} onChange={setArticle} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MainPageEditor({
  tracks,
  onChange,
}: {
  tracks: AdminMainTrack[];
  onChange: (tracks: AdminMainTrack[]) => void;
}) {
  const setTrackField = (index: number, field: keyof AdminMainTrack, value: string | number) => {
    const next = [...tracks];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">메인 트랙 카드</h3>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">현재 Guides 메인에 노출되는 Track 카드 목록입니다.</p>
      </div>
      <div className="space-y-4">
        {tracks.map((track, index) => (
          <div key={track.id} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: track.accentBg, color: track.accentColor }}>
                {track.subtitle}
              </span>
              <span className="text-xs text-[var(--foreground-muted)]">{track.count}개 콘텐츠</span>
            </div>
            <div className="grid gap-3 md:grid-cols-[72px_1fr]">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">아이콘</label>
                <input value={track.emoji} onChange={(e) => setTrackField(index, "emoji", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">트랙 제목</label>
                <input value={track.title} onChange={(e) => setTrackField(index, "title", e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">설명</label>
              <textarea
                value={track.description}
                onChange={(e) => setTrackField(index, "description", e.target.value)}
                className={`${inputCls} min-h-[72px] resize-y`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function StaticGuidesEditorPage() {
  const [data, setData] = useState<AdminGuidesStaticData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<string>("mainPage");

  useEffect(() => {
    fetch("/api/admin/guides/static")
      .then((response) => response.json())
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch(() => {
        setError("가이드 CMS 데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  const tabs = useMemo(() => {
    if (!data) return [];
    return [
      { id: "mainPage", label: "메인 페이지" },
      ...data.sections.map((section) => ({ id: section.id, label: `${section.trackLabel} · ${section.title}` })),
    ];
  }, [data]);

  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/guides/static", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const payload = await response.json();
        setError(payload.error ?? "가이드 저장에 실패했습니다.");
      }
    } catch {
      setError("가이드 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }, [data]);

  if (loading) {
    return <div className="p-6 text-center text-[var(--foreground-muted)]">로딩 중...</div>;
  }

  if (!data) {
    return <div className="p-6 text-center text-red-500">{error || "가이드 데이터를 불러오지 못했습니다."}</div>;
  }

  const activeSection = data.sections.find((section) => section.id === activeTab);
  const previewHref = activeSection?.previewHref ?? "/guides";

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link href="/admin/guides" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]">
            ← 가이드 CMS
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-[var(--foreground)]">단백질 가이드 정적 콘텐츠 CMS</h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            Track A부터 Track F까지 현재 등록된 가이드 랜딩과 하위 콘텐츠를 한 번에 검토합니다.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={previewHref}
            target="_blank"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            미리보기
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
          >
            {saving ? "저장 중..." : saved ? "저장 완료" : "저장"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-[var(--border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border border-[var(--border)] border-b-[var(--background-card)] bg-[var(--background-card)] text-[var(--accent)] -mb-px"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "mainPage" ? (
        <MainPageEditor
          tracks={data.mainPage.tracks}
          onChange={(tracks) => setData({ ...data, mainPage: { ...data.mainPage, tracks } })}
        />
      ) : activeSection ? (
        <SectionEditor
          section={activeSection}
          onChange={(updated) =>
            setData({
              ...data,
              sections: data.sections.map((section) => (section.id === updated.id ? updated : section)),
            })
          }
        />
      ) : null}
    </div>
  );
}
