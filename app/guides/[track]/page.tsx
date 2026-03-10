import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideTrack, getGuideTracks } from "@/app/data/guidesTracks";

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
            <p className="text-xs text-[#8b8b8b]">순차적으로 콘텐츠가 확장됩니다.</p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {trackData.slots.map((slot) => (
              <Link
                key={slot.slug}
                href={`/guides/${trackData.slug}/${slot.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5"
              >
                <div>
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">
                    GUIDE TOPIC
                  </p>
                  <h3 className="mt-2 text-base font-bold text-[var(--foreground)]">{slot.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {slot.description}
                  </p>

                  <div className="mt-4 rounded-xl border border-[#eef1f3] bg-[#fafbfc] px-3 py-3">
                    <p className="text-xs font-semibold text-[#6f7a84]">이런 내용을 다룰 예정입니다</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                      {slot.searchIntent}
                    </p>
                  </div>
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
