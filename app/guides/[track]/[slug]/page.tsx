import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import guidesStaticData from "@/app/data/guidesStaticData.json";

type Track = "foundations" | "insights" | "practical";

const TRACK_META: Record<Track, { label: string; href: string }> = {
  foundations: { label: "기초 이해", href: "/guides/foundations" },
  insights: { label: "시장 인사이트", href: "/guides/insights" },
  practical: { label: "실전 가이드", href: "/guides/practical" },
};

const VALID_TRACKS: Track[] = ["foundations", "insights", "practical"];

function isValidTrack(t: string): t is Track {
  return VALID_TRACKS.includes(t as Track);
}

/** 마크다운 → HTML (서버사이드, 의존성 없음) */
function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h1 style="font-size:1.75rem;font-weight:800;color:#1a1a1a;margin:2rem 0 0.75rem">${esc(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h2 style="font-size:1.25rem;font-weight:700;color:#1a1a1a;margin:1.75rem 0 0.5rem">${esc(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h3 style="font-size:1.05rem;font-weight:700;color:#1a1a1a;margin:1.25rem 0 0.4rem">${esc(line.slice(4))}</h3>`);
    } else if (line.startsWith("- ")) {
      if (!inList) { html.push(`<ul style="margin:0.75rem 0 0.75rem 1.5rem;list-style:disc">`); inList = true; }
      html.push(`<li style="margin:0.25rem 0;color:#374151;line-height:1.7">${inline(line.slice(2))}</li>`);
    } else if (line.startsWith("![")) {
      if (inList) { html.push("</ul>"); inList = false; }
      const m = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (m) {
        html.push(`<img src="${m[2]}" alt="${esc(m[1])}" style="max-width:100%;border-radius:12px;margin:1.5rem 0;display:block" />`);
      }
    } else if (line.trim() === "") {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<div style="height:0.75rem"></div>`);
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<p style="margin:0 0 0.75rem;color:#374151;line-height:1.8;font-size:0.9375rem">${inline(line)}</p>`);
    }
  }

  if (inList) html.push("</ul>");
  return html.join("\n");
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, `<code style="background:#f3f0eb;padding:2px 6px;border-radius:4px;font-size:0.85em">$1</code>`);
}

export async function generateStaticParams() {
  const params: { track: string; slug: string }[] = [];
  for (const track of VALID_TRACKS) {
    for (const article of guidesStaticData[track].articles) {
      params.push({ track, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ track: string; slug: string }> }) {
  const { track, slug } = await params;
  if (!isValidTrack(track)) return {};
  const article = guidesStaticData[track].articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | ProteinLab`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ track: string; slug: string }> }) {
  const { track, slug } = await params;

  if (!isValidTrack(track)) notFound();

  const trackData = guidesStaticData[track];
  const article = trackData.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const meta = TRACK_META[track];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href={meta.href} className="hover:text-[var(--accent)]">{meta.label}</Link>
          </div>
          <span
            className="mt-3 inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
            style={{ background: trackData.accentBg, color: trackData.accentColor }}
          >
            {trackData.trackLabel}
          </span>
          <h1
            className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            {article.emoji} {article.title}
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">{article.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px]" style={{ color: "#999" }}>{article.readTime}</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ background: "#f3f0eb", color: "#6b6b6b" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {article.heroImage && (
        <div className="mx-auto max-w-[900px] px-4 pt-6 md:px-6">
          <img
            src={article.heroImage}
            alt={article.title}
            style={{
              width: "100%",
              maxHeight: "420px",
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
        </div>
      )}

      {/* Article content */}
      <main className="mx-auto max-w-[800px] px-4 py-8 md:px-6">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }} />
        ) : (
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ padding: "64px 24px" }}
          >
            <span style={{ fontSize: "3rem" }}>📝</span>
            <p className="mt-4 text-base font-semibold" style={{ color: "#1a1a1a" }}>
              콘텐츠 준비 중입니다
            </p>
            <p className="mt-2 text-sm" style={{ color: "#9ca3af" }}>
              관리자 페이지에서 본문을 등록해 주세요.
            </p>
            <Link
              href={meta.href}
              className="mt-6 rounded-full px-5 py-2 text-sm font-medium transition-colors hover:opacity-90"
              style={{ background: "var(--accent)", color: "white" }}
            >
              ← {meta.label}으로 돌아가기
            </Link>
          </div>
        )}
      </main>

      {/* Footer nav */}
      <div
        className="border-t"
        style={{ borderColor: "#e8e6e3" }}
      >
        <div className="mx-auto max-w-[800px] px-4 py-6 md:px-6">
          <Link
            href={meta.href}
            className="text-sm hover:underline"
            style={{ color: "var(--accent)" }}
          >
            ← {meta.label} 목록으로
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
