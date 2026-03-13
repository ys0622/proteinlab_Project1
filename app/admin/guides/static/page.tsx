"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type {
  AdminGuideArticle,
  AdminGuidesStaticData,
  AdminGuideSection,
  AdminMainTrack,
} from "@/app/lib/adminGuidesStatic";

const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const STORAGE_KEY = "proteinlab_admin_guides_static_draft_v1";

type StorageMode = "browser" | "kv";

interface StaticApiPayload {
  data: AdminGuidesStaticData;
  savedAt?: string;
  storageMode?: StorageMode;
  message?: string;
}

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
    <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {article.emoji} {article.title || `콘텐츠 ${index + 1}`}
          </p>
          <p className="mt-0.5 truncate text-xs text-[var(--foreground-muted)]">{article.href}</p>
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
    const nextArticles = [...section.articles];
    nextArticles[index] = updated;
    onChange({ ...section, articles: nextArticles });
  };

  return (
    <div className="space-y-5">
      <section className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
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
          <div key={track.id} className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
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

function downloadJson(data: AdminGuidesStaticData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "proteinlab-guides-static-draft.json";
  link.click();
  URL.revokeObjectURL(url);
}

export default function StaticGuidesEditorPage() {
  const [data, setData] = useState<AdminGuidesStaticData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [activeTab, setActiveTab] = useState<string>("mainPage");
  const [savedAt, setSavedAt] = useState<string>("");
  const [storageMode, setStorageMode] = useState<StorageMode>("browser");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("/api/admin/guides/static")
      .then((response) => response.json())
      .then((payload: StaticApiPayload) => {
        const browserDraft = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
        const browserSavedAt = typeof window !== "undefined" ? window.localStorage.getItem(`${STORAGE_KEY}:savedAt`) : "";

        if (payload.storageMode === "kv") {
          setData(payload.data);
          setSavedAt(payload.savedAt ?? "");
          setStorageMode("kv");
          setNotice("Cloudflare KV 서버 초안을 불러왔습니다.");
          setLoading(false);
          return;
        }

        if (browserDraft) {
          try {
            setData(JSON.parse(browserDraft) as AdminGuidesStaticData);
            setSavedAt(browserSavedAt ?? "");
            setStorageMode("browser");
            setNotice("브라우저에 저장된 로컬 초안을 불러왔습니다.");
            setLoading(false);
            return;
          } catch {
            window.localStorage.removeItem(STORAGE_KEY);
            window.localStorage.removeItem(`${STORAGE_KEY}:savedAt`);
          }
        }

        setData(payload.data);
        setSavedAt(payload.savedAt ?? "");
        setStorageMode(payload.storageMode ?? "browser");
        setNotice(payload.message ?? "");
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

  const persistBrowserDraft = useCallback((nextData: AdminGuidesStaticData) => {
    if (typeof window === "undefined") return "";
    const now = new Date().toISOString();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    window.localStorage.setItem(`${STORAGE_KEY}:savedAt`, now);
    return now;
  }, []);

  const handleSave = useCallback(async () => {
    if (!data || typeof window === "undefined") return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/guides/static", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const payload = (await response.json()) as { savedAt?: string; storageMode?: StorageMode };
        setSavedAt(payload.savedAt ?? "");
        setStorageMode(payload.storageMode ?? "kv");
        setNotice("Cloudflare KV 서버 초안으로 저장했습니다.");
      } else {
        const now = persistBrowserDraft(data);
        setSavedAt(now);
        setStorageMode("browser");
        setNotice("서버 저장을 사용할 수 없어 브라우저 초안으로 저장했습니다.");
      }

      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch {
      const now = persistBrowserDraft(data);
      setSavedAt(now);
      setStorageMode("browser");
      setNotice("서버 저장에 실패해 브라우저 초안으로 저장했습니다.");
    } finally {
      setSaving(false);
    }
  }, [data, persistBrowserDraft]);

  const handleReset = useCallback(async () => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(`${STORAGE_KEY}:savedAt`);

    try {
      await fetch("/api/admin/guides/static", { method: "DELETE" });
    } catch {
      // ignore
    }

    window.location.reload();
  }, []);

  const handleExport = useCallback(() => {
    if (!data) return;
    downloadJson(data);
  }, [data]);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImportFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const parsed = JSON.parse(text) as AdminGuidesStaticData;
        setData(parsed);
        const now = persistBrowserDraft(parsed);
        setSavedAt(now);
        setStorageMode("browser");
        setNotice("JSON 초안을 가져왔습니다. 필요하면 저장 버튼으로 다시 저장하세요.");
        setError("");
      } catch {
        setError("JSON 파일을 읽지 못했습니다. 내보내기 형식의 파일인지 확인해주세요.");
      } finally {
        event.target.value = "";
      }
    },
    [persistBrowserDraft],
  );

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
      <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} className="hidden" />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link href="/admin/guides" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]">
            ← 가이드 CMS
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-[var(--foreground)]">정적 가이드 콘텐츠 CMS</h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            Track A부터 Track F까지 현재 사이트에 연결된 가이드 랜딩과 하위 콘텐츠 인벤토리를 관리합니다.
          </p>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">
            서버 저장은 Cloudflare KV가 연결된 경우에만 활성화되며, 그렇지 않으면 브라우저 초안 모드로 동작합니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={previewHref}
            target="_blank"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            미리보기
          </Link>
          <button
            onClick={handleImportClick}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            JSON 가져오기
          </button>
          <button
            onClick={handleExport}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            JSON 내보내기
          </button>
          <button
            onClick={handleReset}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            초안 초기화
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
          >
            {saving ? "저장 중..." : saved ? "저장 완료" : storageMode === "kv" ? "서버 저장" : "브라우저 저장"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</div>
      ) : null}

      {notice ? (
        <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-4 py-3 text-sm text-[var(--foreground-muted)]">
          {notice}
        </div>
      ) : null}

      <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-4 py-3 text-sm text-[var(--foreground-muted)]">
        저장 방식:{" "}
        <span className="font-semibold text-[var(--foreground)]">{storageMode === "kv" ? "Cloudflare KV 서버 초안" : "브라우저 로컬 초안"}</span>
        {savedAt ? <span className="ml-2">· 마지막 저장: {new Date(savedAt).toLocaleString("ko-KR")}</span> : null}
      </div>

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

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
        >
          {saving ? "저장 중..." : saved ? "저장 완료" : storageMode === "kv" ? "서버 저장" : "브라우저 저장"}
        </button>
      </div>
    </div>
  );
}
