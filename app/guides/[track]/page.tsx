import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideTrack, getGuideTracks, type GuideTrackSlug } from "@/app/data/guidesTracks";

const deepGreen = "#1f5138";

const heroCopyMap: Record<
  GuideTrackSlug,
  {
    icon: string;
    eyebrow: string;
    description: string;
    featuredTopics: string[];
    popularTopic: string;
  }
> = {
  "protein-basics": {
    icon: "🧬",
    eyebrow: "단백질을 이해하는 첫 단계",
    description:
      "역할, 권장 섭취량, 흡수 방식, 부족 신호까지 단백질을 처음부터 이해할 수 있도록 핵심 기초를 정리했습니다.",
    featuredTopics: ["단백질이란 무엇인가", "하루 단백질 섭취량", "단백질 부족 신호"],
    popularTopic: "하루 단백질 섭취량 계산",
  },
  "product-selection-comparison": {
    icon: "🔎",
    eyebrow: "고르기 전에 먼저 보는 기준",
    description:
      "단백질 음료와 단백질 바를 비교할 때 무엇을 봐야 하는지, 성분표를 어떻게 읽어야 하는지 데이터 기준으로 정리합니다.",
    featuredTopics: ["단백질 음료 고르는 법", "단백질 바 비교 기준", "영양성분표 읽는 법"],
    popularTopic: "단백질 음료 고르는 법",
  },
  "intake-strategy-health": {
    icon: "⚙️",
    eyebrow: "상황에 맞는 섭취 전략",
    description:
      "다이어트, 운동 전후, 식사 대용, 시니어 건강까지 목적과 생활 패턴에 따라 달라지는 단백질 섭취 전략을 안내합니다.",
    featuredTopics: ["운동 후 단백질 타이밍", "체중 관리 섭취 전략", "식사대용 활용법"],
    popularTopic: "운동 후 단백질 섭취 타이밍",
  },
  "fitness-lifestyle": {
    icon: "🏃",
    eyebrow: "운동하는 사람을 위한 실전 가이드",
    description:
      "러닝, 마라톤, 근력 운동, 운동 입문까지 활동 방식에 따라 어떤 단백질 루틴이 맞는지 실전형으로 정리합니다.",
    featuredTopics: ["러닝 후 회복 전략", "근력 운동과 단백질", "운동 입문 루틴"],
    popularTopic: "러닝 후 단백질 가이드",
  },
  "market-insights": {
    icon: "📈",
    eyebrow: "국내 단백질 시장 흐름 정리",
    description:
      "RTD 단백질 시장, 브랜드 움직임, 성분 트렌드를 복잡한 설명 없이 빠르게 파악할 수 있도록 정리합니다.",
    featuredTopics: ["RTD 시장 흐름", "브랜드 분석", "성분 트렌드"],
    popularTopic: "국내 단백질 시장 흐름",
  },
  tools: {
    icon: "🧮",
    eyebrow: "바로 써먹는 계산 도구",
    description:
      "하루 단백질 권장량과 제품 활용량을 빠르게 계산해 실제 제품 비교와 선택까지 이어갈 수 있도록 구성했습니다.",
    featuredTopics: ["하루 단백질 계산", "제품 개수 계산", "단백질 밀도 계산"],
    popularTopic: "하루 단백질 섭취량 계산기",
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

const clampOneLine = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
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
        className="w-full border-b border-t bg-[var(--hero-bg)]"
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

          <div className="mt-4 flex items-start gap-3">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-[#eff7f2] text-xl"
            >
              {heroCopy.icon}
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: deepGreen }}>
                {trackData.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
                {heroCopy.description}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_280px]">
            <div className="rounded-xl border border-[#d7e6dd] bg-[#fffdf8] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7c8b84]">
                대표 콘텐츠
              </p>
              <ul className="mt-2 space-y-1.5">
                {heroCopy.featuredTopics.slice(0, 3).map((topic) => (
                  <li
                    key={`${trackData.slug}-featured-${topic}`}
                    className="flex items-start gap-2 text-sm leading-6 text-[var(--foreground-muted)]"
                  >
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8c9c0]" />
                    <span style={clampOneLine}>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-4 py-4">
              <p className="text-[11px] font-semibold" style={{ color: deepGreen }}>
                인기 콘텐츠
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-[var(--foreground)]">
                {heroCopy.popularTopic}
              </p>
            </div>
          </div>
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
                className="group flex h-full min-h-[248px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5 transition-colors hover:border-[#cfe1d7]"
              >
                <div>
                  <div className="guide-visual__chips">
                    {topicChips.map((chip) => (
                      <span key={`${slot.slug}-${chip}`} className="guide-visual__chip">
                        {chip}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 text-base font-bold transition-colors group-hover:text-[var(--accent)]" style={{ color: deepGreen }}>
                    {slot.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]" style={clampTwoLines}>
                    {slot.description}
                  </p>
                </div>

                <span className="mt-4 inline-flex items-center text-sm font-semibold" style={{ color: deepGreen }}>
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
