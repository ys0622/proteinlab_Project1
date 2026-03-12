import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";
import { getGuideTrack, getGuideTracks, type GuideTrackSlug } from "@/app/data/guidesTracks";

const deepGreen = "#1f5138";

const trackPageCopy: Record<
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
      "역할, 권장 섭취량, 부족 신호까지 단백질 기초를 먼저 이해할 수 있도록 핵심 주제를 모았습니다.",
    featuredTopics: ["단백질이란 무엇인가", "하루 단백질 섭취량", "단백질 부족 신호"],
    popularTopic: "하루 단백질 섭취량 계산",
  },
  "product-selection-comparison": {
    icon: "🔎",
    eyebrow: "고르기 전에 먼저 보는 기준",
    description:
      "단백질 음료와 단백질 바를 비교할 때 무엇을 봐야 하는지, 성분표를 어떻게 읽어야 하는지 정리합니다.",
    featuredTopics: ["단백질 음료 고르는 법", "단백질 바 비교 기준", "영양성분표 읽는 법"],
    popularTopic: "단백질 음료 고르는 법",
  },
  "intake-strategy-health": {
    icon: "⚙️",
    eyebrow: "상황에 맞는 섭취 전략",
    description:
      "운동 전후, 다이어트, 식사 대용, 시니어 건강처럼 상황에 따라 달라지는 단백질 섭취 전략을 안내합니다.",
    featuredTopics: ["운동 후 단백질 타이밍", "체중 관리 섭취 전략", "식사대용 활용법"],
    popularTopic: "운동 후 단백질 섭취 타이밍",
  },
  "fitness-lifestyle": {
    icon: "🏃",
    eyebrow: "운동과 생활 루틴에 맞춘 가이드",
    description:
      "러닝, 마라톤, 근력 운동, 운동 입문처럼 활동 방식에 따라 어떤 단백질 루틴이 맞는지 설명합니다.",
    featuredTopics: ["러닝 후 회복 전략", "근력 운동과 단백질", "운동 입문 루틴"],
    popularTopic: "러닝 후 단백질 가이드",
  },
  "market-insights": {
    icon: "📈",
    eyebrow: "국내 단백질 시장 흐름 정리",
    description:
      "RTD 단백질 시장, 브랜드 흐름, 성분 트렌드를 복잡한 설명 없이 빠르게 파악할 수 있도록 정리합니다.",
    featuredTopics: ["RTD 시장 흐름", "브랜드 분석", "성분 트렌드"],
    popularTopic: "국내 단백질 시장 흐름",
  },
  tools: {
    icon: "🧮",
    eyebrow: "바로 써먹는 계산 도구",
    description:
      "하루 단백질 권장량과 제품 활용량을 계산해 실제 비교와 선택까지 이어갈 수 있는 도구를 모았습니다.",
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

const proteinBasicsParallelSlots = [
  {
    slug: "protein-functions",
    title: "단백질 역할 개요",
    description: "단백질이 근육, 면역, 호르몬, 회복에 어떻게 쓰이는지 먼저 이해하는 출발점입니다.",
    searchIntent: "단백질은 몸에서 어떤 일을 하나",
    internalLinkTargets: [] as { label: string; href: string }[],
    href: "/guides/protein-basics/protein-functions",
  },
  {
    slug: "muscle",
    title: "근육과 단백질",
    description: "근육 성장과 회복에 단백질이 왜 필요한지, 언제 어떻게 먹어야 하는지 정리합니다.",
    searchIntent: "근육 성장에 단백질이 왜 필요한가",
    internalLinkTargets: [{ label: "단백질 역할 개요", href: "/guides/protein-basics/protein-functions" }],
    href: "/guides/basics/muscle",
  },
  {
    slug: "immunity-hormone",
    title: "면역·호르몬과 단백질",
    description: "항체, 면역세포, 호르몬과 효소가 왜 단백질과 연결되는지 이해할 수 있게 정리합니다.",
    searchIntent: "면역과 호르몬에 단백질이 왜 중요한가",
    internalLinkTargets: [{ label: "단백질 역할 개요", href: "/guides/protein-basics/protein-functions" }],
    href: "/guides/basics/immunity-hormone",
  },
  {
    slug: "deficiency-symptoms",
    title: "단백질 부족 신호",
    description: "피로, 근육 감소, 면역 저하처럼 단백질 부족 시 나타날 수 있는 신호를 모았습니다.",
    searchIntent: "단백질 부족 증상에는 무엇이 있나",
    internalLinkTargets: [{ label: "하루 단백질 권장량", href: "/guides/basics/daily-requirement" }],
    href: "/guides/basics/deficiency-symptoms",
  },
];

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

  const copy = trackPageCopy[trackData.slug];
  const topicChips = topicChipsMap[trackData.slug];
  const displaySlots =
    trackData.slug === "protein-basics"
      ? proteinBasicsParallelSlots
      : trackData.slots.map((slot) => ({ ...slot, href: `/guides/${trackData.slug}/${slot.slug}` }));
  if (trackData.slug === "protein-basics") {
    trackData.slots = proteinBasicsParallelSlots as typeof trackData.slots;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>{trackData.title}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: trackData.accentBg, color: trackData.accentColor }}
            >
              {trackData.label}
            </span>
            <span className="text-xs text-[#8b8b8b]">{copy.eyebrow}</span>
            <span className="text-xs text-[#8b8b8b]">{trackData.slots.length}개 주제</span>
          </div>

          <div className="mt-3 flex items-start gap-3">
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-[#eff7f2] text-lg"
            >
              {copy.icon}
            </span>
            <div className="min-w-0">
              <h1 className="text-[26px] font-bold leading-tight md:text-[30px]" style={{ color: deepGreen }}>
                {trackData.title}
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
                {copy.description}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {copy.featuredTopics.slice(0, 3).map((topic) => (
              <span
                key={`${trackData.slug}-${topic}`}
                className="inline-flex items-center rounded-full border border-[#d7e6dd] bg-[#fffdf8] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground-muted)]"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-[#6f7f76] md:hidden">
            <span aria-hidden>↓</span>
            <span>아래 카드에서 바로 주제를 선택할 수 있습니다.</span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">핵심 질문과 연결 콘텐츠를 함께 확인하세요.</p>
            </div>
            <div className="hidden rounded-full border border-[#d7e6dd] bg-[#f4faf6] px-3 py-1.5 text-xs font-medium md:block" style={{ color: deepGreen }}>
              인기: {copy.popularTopic}
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displaySlots.map((slot) => (
              <Link
                key={slot.slug}
                href={slot.href}
                className="group flex h-full min-h-[228px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4 transition-colors hover:border-[#cfe1d7] sm:min-h-[248px] sm:px-5 sm:py-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="guide-visual__chips">
                      {topicChips.map((chip) => (
                        <span key={`${slot.slug}-${chip}`} className="guide-visual__chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#7c8b84]">
                      Track
                    </span>
                  </div>

                  <h3
                    className="mt-3 text-base font-bold transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: deepGreen }}
                  >
                    {slot.title}
                  </h3>
                  <div className="mt-3 md:hidden">
                    <GuideVisual
                      track={trackData.slug}
                      title={slot.title}
                      accentColor={trackData.accentColor}
                      accentBg={trackData.accentBg}
                      variant="topic"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]" style={clampTwoLines}>
                    {slot.description}
                  </p>

                  <div className="mt-4 rounded-xl border border-[#edf3ef] bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7c8b84]">
                      핵심 질문
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--foreground)]" style={clampTwoLines}>
                      {slot.searchIntent}
                    </p>
                  </div>

                  {slot.internalLinkTargets.length > 0 ? (
                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: deepGreen }}>
                        연결 콘텐츠
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {slot.internalLinkTargets.slice(0, 2).map((target) => (
                          <li
                            key={`${slot.slug}-${target.href}`}
                            className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]"
                          >
                            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8c9c0]" />
                            <span style={clampOneLine}>{target.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#f4faf6] px-2.5 py-1 text-[11px] font-semibold" style={{ color: deepGreen }}>
                    인기
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold" style={{ color: deepGreen }}>
                    주제 보기
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
