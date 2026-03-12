import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getGuideTracks, type GuideTrackSlug } from "../data/guidesTracks";

export const metadata = {
  title: "단백질 가이드 | ProteinLab",
  description:
    "단백질 기초, 제품 선택, 섭취 전략, 운동 라이프스타일까지 한 번에 탐색할 수 있는 ProteinLab 가이드 모음입니다.",
};

const tracks = getGuideTracks();
const deepGreen = "#1f5138";

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

const trackCopy: Record<
  GuideTrackSlug,
  {
    icon: string;
    subtitle: string;
    title: string;
    description: string;
    buttonLabel: string;
    featuredTopics: string[];
    popularTopic: string;
  }
> = {
  "protein-basics": {
    icon: "🧬",
    subtitle: "단백질을 처음 이해하는 시작점",
    title: "단백질 기초",
    description:
      "단백질이 몸에서 어떤 역할을 하는지, 하루에 얼마나 먹어야 하는지, 부족하면 어떤 신호가 오는지 핵심부터 정리합니다.",
    buttonLabel: "기초 가이드 보기",
    featuredTopics: ["단백질이란 무엇인가", "하루 단백질 섭취량", "단백질 부족 신호"],
    popularTopic: "하루 단백질 섭취량 계산",
  },
  "product-selection-comparison": {
    icon: "🧪",
    subtitle: "제품을 고르기 전에 보는 비교 기준",
    title: "제품 선택 · 비교",
    description:
      "단백질 음료와 단백질 바를 고를 때 무엇을 먼저 봐야 하는지, 영양성분과 랭킹을 어떻게 읽어야 하는지 데이터 기준으로 안내합니다.",
    buttonLabel: "비교 가이드 보기",
    featuredTopics: ["단백질 음료 고르는 법", "단백질 바 비교 기준", "영양성분 읽는 법"],
    popularTopic: "단백질 음료 선택 가이드",
  },
  "intake-strategy-health": {
    icon: "⏱️",
    subtitle: "언제, 얼마나, 어떻게 먹을지",
    title: "섭취 전략 · 건강",
    description:
      "운동 전후, 체중 관리, 식사대용, 노년 전략까지 실제 생활에서 바로 적용할 수 있는 단백질 섭취 기준을 정리합니다.",
    buttonLabel: "섭취 전략 보기",
    featuredTopics: ["운동 후 단백질 타이밍", "체중 관리와 단백질", "식사대용 전략"],
    popularTopic: "운동 후 단백질",
  },
  "fitness-lifestyle": {
    icon: "🏃",
    subtitle: "운동 루틴과 생활 패턴에 맞춘 가이드",
    title: "운동 · 라이프스타일",
    description:
      "러닝, 마라톤, 근력운동, 운동 초보 루틴까지 운동 방식에 따라 어떤 단백질 전략이 맞는지 실전형으로 정리합니다.",
    buttonLabel: "운동 가이드 보기",
    featuredTopics: ["러닝 후 회복 전략", "근력운동과 단백질", "운동 초보 루틴"],
    popularTopic: "러닝 단백질 가이드",
  },
  "market-insights": {
    icon: "📊",
    subtitle: "브랜드와 시장 흐름을 읽는 콘텐츠",
    title: "시장 인사이트",
    description:
      "RTD 시장의 흐름, 브랜드 포지셔닝, 성분 트렌드를 읽고 지금 어떤 제품이 왜 주목받는지 구조적으로 이해할 수 있게 정리합니다.",
    buttonLabel: "시장 인사이트 보기",
    featuredTopics: ["RTD 시장 흐름", "브랜드 분석", "성분 트렌드"],
    popularTopic: "국내 단백질 시장 흐름",
  },
  tools: {
    icon: "🧮",
    subtitle: "바로 계산하고 적용하는 도구",
    title: "계산기 · 도구",
    description:
      "체중과 목표를 기준으로 하루 단백질 섭취량을 계산하고, 제품 선택과 연결해 바로 실행할 수 있는 도구를 제공합니다.",
    buttonLabel: "도구 보기",
    featuredTopics: ["하루 단백질 계산기", "제품 개수 계산", "단백질 밀도 계산"],
    popularTopic: "하루 단백질 섭취량 계산기",
  },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            단백질 가이드
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            단백질 기초부터 제품 선택, 섭취 전략, 운동 라이프스타일까지 필요한 주제를 빠르게 찾을 수 있도록 트랙별로 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => {
            const copy = trackCopy[track.slug];

            return (
              <Link
                key={track.slug}
                href={`/guides/${track.slug}`}
                className="group flex h-full min-h-[292px] flex-col justify-between overflow-hidden rounded-2xl border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
              >
                <div className="h-1.5 w-full" style={{ background: track.accentColor }} />

                <div>
                  <div
                    className="border-b border-[#e7eee9] px-5 py-4"
                    style={{ background: `linear-gradient(135deg, ${track.accentBg} 0%, #fffdf8 100%)` }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                        style={{ color: track.accentColor }}
                      >
                        {track.label}
                      </span>
                      <span className="rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">
                        {track.slots.length}개 주제
                      </span>
                    </div>

                    <div className="mt-4 flex items-start gap-3">
                      <span
                        aria-hidden
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-white text-lg"
                      >
                        {copy.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f7f76]" style={clampOneLine}>
                          {copy.subtitle}
                        </p>
                        <h2
                          className="mt-1 text-lg font-bold transition-colors group-hover:text-[var(--accent)]"
                          style={{ color: deepGreen }}
                        >
                          {copy.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-4">
                    <p className="text-[13px] leading-[1.7] text-[var(--foreground-muted)]" style={clampTwoLines}>
                      {copy.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7c8b84]">
                        대표 콘텐츠
                      </p>

                      <div className="mt-2 hidden flex-wrap gap-2 md:flex">
                        {copy.featuredTopics.slice(0, 3).map((topic) => (
                          <span
                            key={`${track.slug}-featured-chip-${topic}`}
                            className="inline-flex items-center rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <ul className="mt-2 space-y-1.5 md:hidden">
                        {copy.featuredTopics.slice(0, 3).map((topic) => (
                          <li
                            key={`${track.slug}-featured-${topic}`}
                            className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]"
                          >
                            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8c9c0]" />
                            <span style={clampOneLine}>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2.5">
                      <p className="text-[11px] font-semibold" style={{ color: deepGreen }}>
                        인기 콘텐츠
                      </p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]" style={clampOneLine}>
                        {copy.popularTopic}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <span className="flex items-center justify-center rounded-lg border border-[#cfe0d5] bg-white py-2.5 text-xs font-semibold text-[#2f5d46] transition-colors group-hover:bg-[#eef5f0] group-hover:text-[#1f4834]">
                    {copy.buttonLabel}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
