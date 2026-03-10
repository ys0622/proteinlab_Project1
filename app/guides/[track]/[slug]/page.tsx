import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideSlot, getGuideTrack, getGuideTracks } from "@/app/data/guidesTracks";

export async function generateStaticParams() {
  return getGuideTracks().flatMap((track) =>
    track.slots.map((slot) => ({
      track: track.slug,
      slug: slot.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  const trackData = getGuideTrack(track);
  const slot = getGuideSlot(track, slug);

  if (!trackData || !slot) return {};

  return {
    title: `${slot.title} | ${trackData.title} | ProteinLab`,
    description: slot.description,
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  const trackData = getGuideTrack(track);
  const slot = getGuideSlot(track, slug);

  if (!trackData || !slot) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href={`/guides/${trackData.slug}`} className="hover:text-[var(--accent)]">
              {trackData.title}
            </Link>
            <span>/</span>
            <span>{slot.title}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: trackData.accentBg, color: trackData.accentColor }}
            >
              {trackData.label}
            </span>
            <span className="text-xs text-[#8b8b8b]">가이드 준비 중</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {slot.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            {slot.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)]">
          <article className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <section>
              <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">요약</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                이 페이지는 향후 구체적인 콘텐츠를 작성하기 위한 구조입니다. 현재는 제목, 설명,
                검색 의도, 내부 링크 방향까지 먼저 정리해 둔 상태입니다.
              </p>
            </section>

            <section className="mt-6">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">
                향후 콘텐츠 작성 영역
              </p>
              <div className="mt-2 rounded-xl border border-dashed border-[#d9d4cd] bg-white px-4 py-4">
                <p className="text-sm font-semibold text-[var(--foreground)]">{slot.searchIntent}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  {slot.futureFocus.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-6">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">
                내부 링크 확장 구조
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {slot.internalLinkTargets.map((linkItem) => (
                  <Link
                    key={linkItem.href}
                    href={linkItem.href}
                    className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-4 transition-colors hover:border-[var(--accent)]"
                  >
                    <p className="text-sm font-semibold text-[var(--foreground)]">{linkItem.label}</p>
                    <p className="mt-1 text-xs text-[var(--foreground-muted)]">{linkItem.href}</p>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">이 페이지의 역할</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>개별 SEO 콘텐츠로 확장 가능한 주제 구조</li>
              <li>트랙 허브와 제품 탐색 페이지를 연결하는 중간 노드</li>
              <li>향후 비교 콘텐츠와 추천 리스트로 확장 가능한 기준 페이지</li>
            </ul>

            <div className="mt-5 rounded-xl border border-[#eef1f3] bg-[#fafbfc] px-4 py-4">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#6f7a84]">TRACK</p>
              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{trackData.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                {trackData.hubSummary}
              </p>
              <Link
                href={`/guides/${trackData.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]"
              >
                트랙으로 돌아가기
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
