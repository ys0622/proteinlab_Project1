import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideTrack, getGuideTracks, type GuideTrackSlug } from "@/app/data/guidesTracks";

const topicChipsMap: Record<GuideTrackSlug, string[]> = {
  "protein-basics": ["기초", "역할"],
  "product-selection-comparison": ["비교", "선택"],
  "intake-strategy-health": ["섭취", "건강"],
  "fitness-lifestyle": ["운동", "라이프"],
  "market-insights": ["시장", "트렌드"],
  tools: ["계산", "도구"],
};

const clampTwoLines = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

export async function generateStaticParams() {
  return getGuideTracks().map((track) => ({ track: track.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const trackData = getGuideTrack(track);

  if (!trackData) return {};

  return {
    title: `${trackData.title} | ProteinLab Guides`,
    description: trackData.description,
  };
}

export default async function GuideTrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const trackData = getGuideTrack(track);

  if (!trackData) notFound();

  const topicChips = topicChipsMap[trackData.slug];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>{trackData.title}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: trackData.accentBg, color: trackData.accentColor }}
            >
              {trackData.label}
            </span>
            <span className="text-xs text-[#8b8b8b]">{trackData.slots.length}개 주제</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {trackData.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            {trackData.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
            <p className="text-xs text-[#8b8b8b]">순차적으로 콘텐츠가 확장됩니다</p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {trackData.slots.map((slot) => (
              <Link
                key={slot.slug}
                href={`/guides/${trackData.slug}/${slot.slug}`}
                className="group flex min-h-[248px] h-full flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5"
              >
                <div>
                  <div className="guide-visual__chips">
                    {topicChips.map((chip) => (
                      <span key={`${slot.slug}-${chip}`} className="guide-visual__chip">
                        {chip}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 text-base font-bold text-[var(--foreground)]">{slot.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]" style={clampTwoLines}>
                    {slot.description}
                  </p>
                </div>

                <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent)]">
                  주제 보기
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
