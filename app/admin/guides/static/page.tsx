"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ────────────────────────── types ──────────────────────────
interface Article {
  slug: string;
  emoji: string;
  title: string;
  description: string;
  heroImage: string;
  content: string;
  readTime: string;
  tags: string[];
  href: string;
}

interface TrackPage {
  emoji: string;
  title: string;
  description: string;
  note?: string;
  trackLabel: string;
  accentColor: string;
  accentBg: string;
  articles: Article[];
}

interface MainTrack {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  count: number;
  href: string;
  accentColor: string;
  accentBg: string;
}

interface MainPage {
  title: string;
  description: string;
  tracks: MainTrack[];
}

interface StaticData {
  mainPage: MainPage;
  foundations: TrackPage;
  insights: TrackPage;
  practical: TrackPage;
}

// ────────────────────────── helpers ──────────────────────────
const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

const TABS = [
  { id: "mainPage", label: "메인 페이지" },
  { id: "foundations", label: "기초이해 (TRACK A)" },
  { id: "insights", label: "시장인사이트 (TRACK B)" },
  { id: "practical", label: "실전가이드 (TRACK C)" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ────────────────────────── ArticleEditor ──────────────────────────
function ArticleEditor({
  article,
  index,
  onChange,
  onDelete,
}: {
  article: Article;
  index: number;
  onChange: (idx: number, updated: Article) => void;
  onDelete: (idx: number) => void;
}) {
  const [contentPreview, setContentPreview] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const set = (field: keyof Article, value: string | string[]) =>
    onChange(index, { ...article, [field]: value });

  // 간단 마크다운 → HTML
  const renderMd = (md: string) =>
    md.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold mt-3 mb-1">{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold mt-2 mb-1">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-base font-medium mt-2 mb-0.5">{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc text-sm">{line.slice(2)}</li>;
      if (line.startsWith("![")) {
        const m = line.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (m) return <img key={i} src={m[2]} alt={m[1]} className="max-w-full rounded-lg my-2" />;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm leading-relaxed mb-1">{line}</p>;
    });

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
      {/* 헤더 (클릭으로 펼치기) */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--beige-warm)] transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
          <span>{article.emoji || "📄"}</span>
          <span>{article.title || `아티클 ${index + 1}`}</span>
          {article.slug && (
            <span className="text-xs font-normal text-[var(--foreground-muted)]">/{article.slug}</span>
          )}
          {article.heroImage && <span className="text-xs text-[var(--accent)]">📷</span>}
          {article.content && <span className="text-xs text-[var(--accent)]">📝</span>}
        </span>
        <span className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(index); }}
            className="text-xs text-red-500 hover:text-red-700 px-2 py-0.5 rounded"
          >
            삭제
          </button>
          <span className="text-[var(--foreground-muted)] text-xs">{expanded ? "▲" : "▼"}</span>
        </span>
      </button>

      {expanded && (
        <div className="border-t border-[var(--border)] p-4 space-y-4">
          {/* 기본 정보 */}
          <div className="grid grid-cols-[64px_80px_1fr] gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">이모지</label>
              <input value={article.emoji} onChange={(e) => set("emoji", e.target.value)} className={inputCls} placeholder="🥛" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">슬러그</label>
              <input value={article.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} placeholder="sources" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">제목</label>
              <input value={article.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">설명 (카드 요약)</label>
            <input value={article.description} onChange={(e) => set("description", e.target.value)} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">읽기 시간</label>
              <input value={article.readTime} onChange={(e) => set("readTime", e.target.value)} className={inputCls} placeholder="7분 읽기" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">태그 (쉼표 구분)</label>
              <input
                value={article.tags.join(", ")}
                onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
                className={inputCls}
                placeholder="기초, 급원"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">링크 (href) — 슬러그 기반 자동 생성됨</label>
            <input value={article.href} onChange={(e) => set("href", e.target.value)} className={inputCls} placeholder="/guides/foundations/sources" />
          </div>

          {/* 히어로 이미지 */}
          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">히어로 이미지 URL</label>
            <input
              value={article.heroImage}
              onChange={(e) => set("heroImage", e.target.value)}
              className={inputCls}
              placeholder="https://example.com/image.jpg 또는 /guide-images/my-image.jpg"
            />
            {article.heroImage && (
              <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]" style={{ maxHeight: 200 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.heroImage}
                  alt="히어로 미리보기"
                  className="w-full object-cover"
                  style={{ maxHeight: 200 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            )}
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">
              외부 URL(https://...) 또는 /public/ 기준 경로 사용 가능
            </p>
          </div>

          {/* 본문 콘텐츠 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-[var(--foreground-muted)]">
                본문 콘텐츠 (Markdown)
              </label>
              <button
                type="button"
                onClick={() => setContentPreview((v) => !v)}
                className="rounded-full border border-[var(--border)] px-3 py-0.5 text-xs text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
              >
                {contentPreview ? "편집" : "미리보기"}
              </button>
            </div>

            {contentPreview ? (
              <div
                className="min-h-[200px] rounded-lg border border-[var(--border)] bg-white p-4 text-sm overflow-auto"
                style={{ maxHeight: 400 }}
              >
                {article.content ? renderMd(article.content) : (
                  <p className="text-[var(--foreground-muted)] italic">콘텐츠를 입력하세요...</p>
                )}
              </div>
            ) : (
              <textarea
                value={article.content}
                onChange={(e) => set("content", e.target.value)}
                className={`${inputCls} min-h-[200px] resize-y font-mono text-xs`}
                placeholder={"# 제목\n\n본문 내용을 마크다운으로 작성하세요.\n\n## 소제목\n\n- 항목 1\n- 항목 2\n\n이미지 삽입: ![대체텍스트](이미지URL)"}
              />
            )}
            <p className="mt-1.5 text-xs text-[var(--foreground-muted)]">
              # H1 · ## H2 · ### H3 · **굵게** · *기울임* · - 목록 · ![alt](url) 이미지
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────── TrackPageEditor ──────────────────────────
function TrackPageEditor({
  data,
  onChange,
}: {
  data: TrackPage;
  onChange: (updated: TrackPage) => void;
}) {
  const set = (field: keyof TrackPage, value: unknown) =>
    onChange({ ...data, [field]: value });

  const setArticle = (idx: number, updated: Article) => {
    const articles = [...data.articles];
    articles[idx] = updated;
    set("articles", articles);
  };

  const deleteArticle = (idx: number) =>
    set("articles", data.articles.filter((_, i) => i !== idx));

  const addArticle = () =>
    set("articles", [
      ...data.articles,
      {
        slug: "",
        emoji: "📄",
        title: "",
        description: "",
        heroImage: "",
        content: "",
        readTime: "5분 읽기",
        tags: [],
        href: "",
      },
    ]);

  return (
    <div className="space-y-5">
      {/* Page meta */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 space-y-4">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">페이지 메타</h3>
        <div className="grid grid-cols-[72px_1fr] gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">이모지</label>
            <input value={data.emoji} onChange={(e) => set("emoji", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">제목</label>
            <input value={data.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">설명</label>
          <textarea
            value={data.description}
            onChange={(e) => set("description", e.target.value)}
            className={`${inputCls} min-h-[60px] resize-y`}
          />
        </div>
        {"note" in data && (
          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">하단 안내문 (note)</label>
            <input value={data.note ?? ""} onChange={(e) => set("note", e.target.value)} className={inputCls} placeholder="선택 입력" />
          </div>
        )}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">트랙 라벨</label>
            <input value={data.trackLabel} onChange={(e) => set("trackLabel", e.target.value)} className={inputCls} placeholder="TRACK A" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">강조색</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={data.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="h-9 w-10 cursor-pointer rounded border border-[var(--border)]" />
              <input value={data.accentColor} onChange={(e) => set("accentColor", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">배경색</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={data.accentBg} onChange={(e) => set("accentBg", e.target.value)} className="h-9 w-10 cursor-pointer rounded border border-[var(--border)]" />
              <input value={data.accentBg} onChange={(e) => set("accentBg", e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            아티클 목록 ({data.articles.length}개)
          </h3>
          <button
            onClick={addArticle}
            className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent-light)]"
          >
            + 아티클 추가
          </button>
        </div>

        {data.articles.length === 0 ? (
          <p className="text-sm text-[var(--foreground-muted)] text-center py-4">
            등록된 아티클이 없습니다.
          </p>
        ) : (
          <div className="space-y-2">
            {data.articles.map((article, i) => (
              <ArticleEditor
                key={i}
                article={article}
                index={i}
                onChange={setArticle}
                onDelete={deleteArticle}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ────────────────────────── MainPageEditor ──────────────────────────
function MainPageEditor({
  data,
  onChange,
}: {
  data: MainPage;
  onChange: (updated: MainPage) => void;
}) {
  const set = (field: keyof MainPage, value: unknown) =>
    onChange({ ...data, [field]: value });

  const setTrackField = (idx: number, field: keyof MainTrack, value: unknown) => {
    const tracks = [...data.tracks];
    tracks[idx] = { ...tracks[idx], [field]: value };
    set("tracks", tracks);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 space-y-4">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">페이지 메타</h3>
        <div>
          <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">제목</label>
          <input value={data.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">설명</label>
          <textarea value={data.description} onChange={(e) => set("description", e.target.value)} className={`${inputCls} min-h-[60px] resize-y`} />
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          트랙 카드 ({data.tracks.length}개)
        </h3>
        <div className="space-y-4">
          {data.tracks.map((track, i) => (
            <div key={track.id} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ background: track.accentBg, color: track.accentColor }}>
                  {track.subtitle}
                </span>
              </div>
              <div className="grid grid-cols-[72px_1fr_1fr] gap-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">이모지</label>
                  <input value={track.emoji} onChange={(e) => setTrackField(i, "emoji", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">제목</label>
                  <input value={track.title} onChange={(e) => setTrackField(i, "title", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">서브타이틀</label>
                  <input value={track.subtitle} onChange={(e) => setTrackField(i, "subtitle", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">설명</label>
                <textarea value={track.description} onChange={(e) => setTrackField(i, "description", e.target.value)} className={`${inputCls} min-h-[56px] resize-y`} />
              </div>
              <div className="grid grid-cols-[1fr_80px_1fr_1fr] gap-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">링크 (href)</label>
                  <input value={track.href} onChange={(e) => setTrackField(i, "href", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">글 수</label>
                  <input type="number" value={track.count} onChange={(e) => setTrackField(i, "count", Number(e.target.value))} className={inputCls} min={0} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">강조색</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={track.accentColor} onChange={(e) => setTrackField(i, "accentColor", e.target.value)} className="h-9 w-10 cursor-pointer rounded border border-[var(--border)]" />
                    <input value={track.accentColor} onChange={(e) => setTrackField(i, "accentColor", e.target.value)} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1">배경색</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={track.accentBg} onChange={(e) => setTrackField(i, "accentBg", e.target.value)} className="h-9 w-10 cursor-pointer rounded border border-[var(--border)]" />
                    <input value={track.accentBg} onChange={(e) => setTrackField(i, "accentBg", e.target.value)} className={inputCls} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ────────────────────────── main page ──────────────────────────
export default function StaticGuidesEditorPage() {
  const [data, setData] = useState<StaticData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("foundations");

  useEffect(() => {
    fetch("/api/admin/guides/static")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("데이터를 불러올 수 없습니다."); setLoading(false); });
  }, []);

  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/guides/static", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
  }, [data]);

  if (loading) return <div className="p-6 text-center text-[var(--foreground-muted)]">로딩 중...</div>;

  if (!data) return (
    <div className="p-6 text-center text-red-500">{error || "데이터를 불러올 수 없습니다."}</div>
  );

  const previewHref =
    activeTab === "mainPage" ? "/guides"
    : activeTab === "foundations" ? "/guides/foundations"
    : activeTab === "insights" ? "/guides/insights"
    : "/guides/practical";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/guides" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]">
            ← 가이드 CMS
          </Link>
          <h1 className="text-xl font-semibold text-[var(--foreground)] mt-1">가이드 콘텐츠 편집</h1>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
            각 트랙의 아티클 목록·본문·이미지를 수정합니다. 저장 후 재배포하면 반영됩니다.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={previewHref}
            target="_blank"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            미리보기 →
          </Link>
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
          {error.includes("501") && (
            <p className="mt-1 text-xs">
              Cloudflare 배포 환경에서는 파일 쓰기가 불가능합니다. 로컬에서 편집 후 git push → 재배포하거나,
              JSON 파일을 직접 수정하세요.
            </p>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "bg-[var(--background-card)] border border-b-[var(--background-card)] border-[var(--border)] text-[var(--accent)] -mb-px"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "mainPage" && (
        <MainPageEditor data={data.mainPage} onChange={(updated) => setData({ ...data, mainPage: updated })} />
      )}
      {activeTab === "foundations" && (
        <TrackPageEditor data={data.foundations} onChange={(updated) => setData({ ...data, foundations: updated })} />
      )}
      {activeTab === "insights" && (
        <TrackPageEditor data={data.insights} onChange={(updated) => setData({ ...data, insights: updated })} />
      )}
      {activeTab === "practical" && (
        <TrackPageEditor data={data.practical} onChange={(updated) => setData({ ...data, practical: updated })} />
      )}

      <div className="mt-6 flex justify-end">
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
