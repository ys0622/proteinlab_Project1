import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideTrack, getGuideTracks, type GuideTrackSlug } from "@/app/data/guidesTracks";

const heroCopyMap: Record<
  GuideTrackSlug,
  {
    eyebrow: string;
    description: string;
  }
> = {
  "protein-basics": {
    eyebrow: "단백질을 이해하는 첫 단계",
    description:
      "역할, 권장 섭취량, 흡수 방식, 부족 신호까지 단백질을 제대로 이해하는 데 필요한 기초를 한곳에 모았습니다.",
  },
  "product-selection-comparison": {
    eyebrow: "고르기 전에 꼭 확인할 기준",
    description:
      "단백질 음료와 바를 비교할 때 필요한 선택 기준, 성분표 읽는 법, 제품별 차이를 사용자 관점에서 정리했습니다.",
  },
  "intake-strategy-health": {
    eyebrow: "상황에 맞는 섭취 기준",
    description:
      "다이어트, 근성장, 식사 대용, 노년기처럼 목적과 생활 패턴에 따라 달라지는 단백질 섭취 전략을 안내합니다.",
  },
  "fitness-lifestyle": {
    eyebrow: "운동하는 사람을 위한 활용 가이드",
    description:
      "러닝, 근력 운동, 운동 입문자처럼 활동 맥락에 맞춰 단백질을 어떻게 활용하면 좋은지 쉽게 정리했습니다.",
  },
  "market-insights": {
    eyebrow: "국내 단백질 시장 흐름 정리",
    description:
      "RTD 단백질 시장, 브랜드 움직임, 성분 트렌드를 복잡한 업계 표현 없이 읽기 쉽게 풀어낸 페이지입니다.",
  },
  tools: {
    eyebrow: "바로 써보는 계산 도구",
    description:
      "하루 단백질 권장량과 제품 활용량을 빠르게 계산해볼 수 있도록 실사용 중심의 도구를 모았습니다.",
  },
};

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

  const heroCopy = heroCopyMap[trackData.slug];
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
            <span className="text-xs text-[#8b8b8b]">{heroCopy.eyebrow}</span>
            <span className="text-xs text-[#8b8b8b]">{trackData.slots.length}개 주제</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {trackData.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            {heroCopy.description}
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
