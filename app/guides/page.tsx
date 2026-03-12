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
    subtitle: "단백질을 처음부터 이해하는 트랙",
    title: "단백질 기초",
    description:
      "단백질이 몸에서 어떤 역할을 하는지, 얼마나 먹어야 하는지, 부족하면 어떤 신호가 오는지 차근차근 정리합니다.",
    buttonLabel: "기초 가이드 보기",
    featuredTopics: ["단백질이란 무엇인가", "하루 단백질 섭취량", "단백질 부족 신호"],
    popularTopic: "하루 단백질 섭취량 계산",
  },
  "product-selection-comparison": {
    icon: "🔎",
    subtitle: "제품을 고르기 전에 보는 비교 트랙",
    title: "제품 선택 · 비교",
    description:
      "단백질 음료와 단백질 바를 고를 때 무엇을 봐야 하는지, 성분표를 어떻게 읽어야 하는지 데이터 기준으로 안내합니다.",
    buttonLabel: "제품 선택 가이드 보기",
    featuredTopics: ["단백질 음료 고르는 법", "단백질 바 비교 기준", "영양성분표 읽는 법"],
    popularTopic: "단백질 음료 고르는 법",
  },
  "intake-strategy-health": {
    icon: "⚙️",
    subtitle: "언제, 얼마나, 어떻게 먹을지 보는 트랙",
    title: "섭취 전략 · 건강",
    description:
      "운동 전후, 다이어트, 식사 대용, 시니어 건강처럼 목적과 상황에 따라 달라지는 단백질 섭취 전략을 정리합니다.",
    buttonLabel: "섭취 전략 보기",
    featuredTopics: ["운동 후 단백질 타이밍", "체중 관리 섭취 전략", "식사대용 활용법"],
    popularTopic: "운동 후 단백질 섭취 타이밍",
  },
  "fitness-lifestyle": {
    icon: "🏃",
    subtitle: "운동과 생활 루틴에 맞춘 트랙",
    title: "운동 · 라이프스타일",
    description:
      "러닝, 근력 운동, 운동 입문처럼 활동 방식에 따라 어떤 단백질 루틴이 맞는지 실전형으로 설명합니다.",
    buttonLabel: "운동 가이드 보기",
    featuredTopics: ["러닝 후 회복 전략", "근력 운동과 단백질", "운동 입문 루틴"],
    popularTopic: "러닝 후 단백질 가이드",
  },
  "market-insights": {
    icon: "📈",
    subtitle: "브랜드와 시장 흐름을 보는 트랙",
    title: "시장 인사이트",
    description:
      "RTD 단백질 시장, 브랜드 흐름, 성분 트렌드를 한눈에 파악할 수 있도록 시장 관점의 콘텐츠를 모았습니다.",
    buttonLabel: "시장 인사이트 보기",
    featuredTopics: ["RTD 시장 흐름", "브랜드 분석", "성분 트렌드"],
    popularTopic: "국내 단백질 시장 흐름",
  },
  tools: {
    icon: "🧮",
    subtitle: "바로 계산하고 적용하는 도구 트랙",
    title: "계산기 · 도구",
    description:
      "체중과 활동량을 기준으로 하루 단백질 권장량을 계산하고, 제품 선택에 바로 연결할 수 있는 도구를 제공합니다.",
    buttonLabel: "계산기 보기",
    featuredTopics: ["하루 단백질 계산", "제품 개수 계산", "단백질 밀도 계산"],
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
            단백질 기초부터 제품 선택, 섭취 전략, 운동 활용까지 필요한 트랙부터 바로 살펴보세요.
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
                className="group flex h-full min-h-[316px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] transition-colors hover:border-[#cfe1d7]"
              >
                <div className="px-5 pb-5 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                      style={{ background: track.accentBg, color: track.accentColor }}
                    >
                      {track.label}
                    </span>
                    <span className="text-[11px] text-[#8d8d8d]" style={clampOneLine}>
                      {copy.subtitle}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <span
                      aria-hidden
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-[#eff7f2] text-lg"
                    >
                      {copy.icon}
                    </span>
                    <div className="min-w-0">
                      <h2
                        className="text-lg font-bold transition-colors group-hover:text-[var(--accent)]"
                        style={{ color: deepGreen }}
                      >
                        {copy.title}
                      </h2>
                      <p className="mt-1 text-xs text-[#8d8d8d]">{track.slots.length}개 주제</p>
                    </div>
                  </div>

                  <p
                    className="mt-3 min-h-[44px] text-[13px] leading-[1.7] text-[var(--foreground-muted)]"
                    style={clampTwoLines}
                  >
                    {copy.description}
                  </p>

                  <div className="mt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7c8b84]">
                      대표 콘텐츠
                    </p>
                    <ul className="mt-2 space-y-1.5">
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
                    <p
                      className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]"
                      style={clampOneLine}
                    >
                      {copy.popularTopic}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <span className="flex items-center justify-center rounded-lg border border-[#d7e6dd] py-2.5 text-xs font-semibold text-[#374151] transition-colors group-hover:border-[#cfe1d7] group-hover:bg-[#eff7f2]">
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
