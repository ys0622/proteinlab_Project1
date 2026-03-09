import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import guidesData from "@/app/data/guidesData.json";

type Track = "basics" | "how-to-choose" | "by-goal";

const VALID_TRACKS: Track[] = ["basics", "how-to-choose", "by-goal"];

const TRACK_META: Record<Track, { label: string; href: string }> = {
  basics: { label: "🧬 단백질 기초", href: "/guides/basics" },
  "how-to-choose": { label: "🎯 제품 선택 가이드", href: "/guides/how-to-choose" },
  "by-goal": { label: "💪 목적별 활용", href: "/guides/by-goal" },
};

function isValidTrack(track: string): track is Track {
  return VALID_TRACKS.includes(track as Track);
}

type GuideItem = {
  slug?: string;
  track?: string;
  title?: string;
  description?: string;
  content?: string;
};

const guideItems = guidesData as GuideItem[];

function getArticle(track: Track, slug: string) {
  return guideItems.find((item) => item.track === track && item.slug === slug);
}

export async function generateStaticParams() {
  return guideItems
    .filter((item): item is Required<Pick<GuideItem, "track" | "slug">> & GuideItem =>
      typeof item.track === "string" &&
      typeof item.slug === "string" &&
      isValidTrack(item.track)
    )
    .map((item) => ({ track: item.track, slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ track: string; slug: string }> }) {
  const { track, slug } = await params;
  if (!isValidTrack(track)) return {};

  const article = getArticle(track, slug);
  if (!article) return {};

  return {
    title: `${article.title ?? "가이드"} | ProteinLab`,
    description: article.description ?? "ProteinLab 가이드",
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ track: string; slug: string }> }) {
  const { track, slug } = await params;

  if (!isValidTrack(track)) notFound();
  const article = getArticle(track, slug);
  if (!article) notFound();

  const trackMeta = TRACK_META[track];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href={trackMeta.href} className="hover:text-[var(--accent)]">
              {trackMeta.label}
            </Link>
          </div>
          <h1
            className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            {article.title ?? "가이드"}
          </h1>
          {article.description && (
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">{article.description}</p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-[800px] px-4 py-8 md:px-6">
        {article.content ? (
          <article className="whitespace-pre-wrap text-sm leading-7 text-[var(--foreground)]">
            {article.content}
          </article>
        ) : (
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-6 text-sm text-[var(--foreground-muted)]">
            본문이 비어 있습니다.
          </div>
        )}
      </main>

      <div className="border-t" style={{ borderColor: "#e8e6e3" }}>
        <div className="mx-auto max-w-[800px] px-4 py-6 md:px-6">
          <Link href={trackMeta.href} className="text-sm hover:underline" style={{ color: "var(--accent)" }}>
            {trackMeta.label} 목록으로
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
