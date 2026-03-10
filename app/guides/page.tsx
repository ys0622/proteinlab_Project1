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

const clampTwoLines = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

const trackCopy: Record<
  GuideTrackSlug,
  {
    subtitle: string;
    title: string;
    description: string;
    buttonLabel: string;
    topTags: string[];
    keywordTags: string[];
  }
> = {
  "protein-basics": {
    subtitle: "단백질, 처음부터 제대로",
    title: "단백질 기초",
    description:
      "역할, 섭취량, 흡수 방식, 부족 신호까지 단백질을 이해하는 데 필요한 기초를 정리했습니다.",
    buttonLabel: "기초 가이드 보기",
    topTags: ["역할", "섭취량", "흡수"],
    keywordTags: ["기초 개념", "부족 신호", "단백질 이해"],
  },
  "product-selection-comparison": {
    subtitle: "고르기 전에 꼭 확인할 것",
    title: "제품 선택 · 비교",
    description:
      "워터형 vs 밀크형, 성분표 읽는 법, 나에게 맞는 단백질 음료 고르는 기준을 알려드립니다.",
    buttonLabel: "제품 선택 가이드 보기",
    topTags: ["워터형", "밀크형", "성분표"],
    keywordTags: ["선택 기준", "제품 비교", "음료 가이드"],
  },
  "intake-strategy-health": {
    subtitle: "언제, 얼마나, 어떻게",
    title: "섭취 전략 · 건강",
    description:
      "다이어트, 근성장, 노년기, 식사 대용 등 목적과 상황에 따라 달라지는 섭취 전략을 안내합니다.",
    buttonLabel: "섭취 전략 보기",
    topTags: ["다이어트", "근성장", "식사 대용"],
    keywordTags: ["섭취 타이밍", "건강 전략", "상황별 가이드"],
  },
  "fitness-lifestyle": {
    subtitle: "운동하는 사람을 위한 가이드",
    title: "운동 · 라이프스타일",
    description:
      "러닝, 근력 운동, 입문자까지 운동 목적별 단백질 활용법을 정리했습니다.",
    buttonLabel: "운동 가이드 보기",
    topTags: ["러닝", "근력 운동", "입문자"],
    keywordTags: ["운동 목적", "활용법", "라이프스타일"],
  },
  "market-insights": {
    subtitle: "국내 단백질 시장 흐름",
    title: "시장 인사이트",
    description:
      "RTD 단백질 시장 규모, 브랜드 동향, 성분 트렌드를 데이터 기반으로 읽기 쉽게 정리했습니다.",
    buttonLabel: "시장 인사이트 보기",
    topTags: ["RTD 시장", "브랜드", "성분 트렌드"],
    keywordTags: ["시장 규모", "동향 분석", "데이터 기반"],
  },
  tools: {
    subtitle: "바로 써보는 계산 도구",
    title: "계산기 · 도구",
    description:
      "내 체중에 맞는 하루 단백질 권장량, 제품 개수 계산까지 바로 사용할 수 있는 도구 모음입니다.",
    buttonLabel: "계산기 보기",
    topTags: ["권장량", "제품 개수", "바로 계산"],
    keywordTags: ["하루 섭취량", "계산 도구", "실전 활용"],
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
                className="group flex min-h-[316px] h-full flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8]"
              >
                <div className="px-5 pb-5 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                      style={{ background: track.accentBg, color: track.accentColor }}
                    >
                      {track.label}
                    </span>
                    <span className="text-[11px] text-[#8d8d8d]">{copy.subtitle}</span>
                  </div>

                  <div className="guide-visual__chips mt-3">
                    {copy.topTags.map((tag) => (
                      <span key={`${track.slug}-top-${tag}`} className="guide-visual__chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-4 text-lg font-bold text-[var(--foreground)]">{copy.title}</h2>
                  <p className="mt-1 text-xs text-[#8d8d8d]">{track.slots.length}개 주제</p>

                  <p
                    className="mt-3 min-h-[44px] text-[13px] leading-[1.7] text-[var(--foreground-muted)]"
                    style={clampTwoLines}
                  >
                    {copy.description}
                  </p>

                  <div className="guide-visual__chips mt-4">
                    {copy.keywordTags.map((tag) => (
                      <span key={`${track.slug}-keyword-${tag}`} className="guide-visual__chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <span className="flex items-center justify-center rounded-lg border border-[#e8e6e3] py-2.5 text-xs font-semibold text-[#374151] transition-colors group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)]">
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
