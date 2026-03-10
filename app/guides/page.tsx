import type { SVGProps } from "react";
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

function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21.5z" />
      <path d="M5 6.5v15" />
      <path d="M9 8h6" />
      <path d="M9 11h6" />
    </svg>
  );
}

function CompareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 5v14" />
      <path d="M17 5v14" />
      <path d="M4 8h6" />
      <path d="M14 11h6" />
      <path d="M4 15h6" />
      <path d="M14 18h6" />
    </svg>
  );
}

function TimingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 13V9" />
      <path d="M12 13l3 2" />
      <path d="M9 3h6" />
    </svg>
  );
}

function FitnessIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 10v4" />
      <path d="M7 8v8" />
      <path d="M17 8v8" />
      <path d="M21 10v4" />
      <path d="M7 12h10" />
      <path d="M5 8h2" />
      <path d="M17 8h2" />
      <path d="M5 16h2" />
      <path d="M17 16h2" />
    </svg>
  );
}

function MarketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 19h16" />
      <path d="M7 16v-4" />
      <path d="M12 16V8" />
      <path d="M17 16v-6" />
      <path d="m6 9 4-3 3 2 5-3" />
    </svg>
  );
}

function ToolIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h2" />
      <path d="M12 11h2" />
      <path d="M16 11h0" />
      <path d="M8 15h2" />
      <path d="M12 15h6" />
    </svg>
  );
}

const trackCopy: Record<
  GuideTrackSlug,
  {
    title: string;
    eyebrow: string;
    summary: string;
    note: string;
    cta: string;
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }
> = {
  "protein-basics": {
    title: "단백질 기초",
    eyebrow: "역할과 필요량부터",
    summary: "단백질의 역할, 필요량, 흡수와 종류를 먼저 정리합니다.",
    note: "역할 · 섭취량 · 흡수 · 종류",
    cta: "단백질 기초 보기",
    Icon: BookIcon,
  },
  "product-selection-comparison": {
    title: "제품 선택 · 비교",
    eyebrow: "고르기 전에 보는 기준",
    summary: "음료와 바를 고를 때 봐야 할 기준과 비교 포인트를 모았습니다.",
    note: "선택 기준 · 성분 비교 · 추천 리스트",
    cta: "제품 선택 가이드 보기",
    Icon: CompareIcon,
  },
  "intake-strategy-health": {
    title: "섭취 전략 · 건강",
    eyebrow: "언제 얼마나 먹을지",
    summary: "언제, 얼마나, 어떤 상황에서 먹을지 실전 기준으로 안내합니다.",
    note: "타이밍 · 체중 관리 · 식사대용",
    cta: "섭취 전략 보기",
    Icon: TimingIcon,
  },
  "fitness-lifestyle": {
    title: "운동 · 라이프스타일",
    eyebrow: "운동 상황별 활용",
    summary: "러닝, 근력 운동, 입문자 상황에 맞춘 단백질 활용 가이드입니다.",
    note: "러닝 · 근력운동 · 스포츠 영양",
    cta: "운동 가이드 보기",
    Icon: FitnessIcon,
  },
  "market-insights": {
    title: "시장 인사이트",
    eyebrow: "브랜드와 시장 흐름",
    summary: "RTD 단백질 시장과 브랜드 흐름을 읽기 쉽게 정리합니다.",
    note: "시장 흐름 · 브랜드 분석 · 성분 트렌드",
    cta: "시장 인사이트 보기",
    Icon: MarketIcon,
  },
  tools: {
    title: "계산기 · 도구",
    eyebrow: "바로 써보는 계산 도구",
    summary: "하루 단백질 섭취량과 제품 활용에 바로 쓰는 계산 도구입니다.",
    note: "섭취량 계산기 · 개수 계산 · 밀도 계산",
    cta: "계산기 보기",
    Icon: ToolIcon,
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
            const Icon = copy.Icon;

            return (
              <Link
                key={track.slug}
                href={`/guides/${track.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8]"
              >
                <div>
                  <div className="border-b border-[#f0eeeb] px-5 pb-3 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                        style={{ background: track.accentBg, color: track.accentColor }}
                      >
                        {track.label}
                      </span>
                      <span className="text-[11px] text-[#8d8d8d]">{copy.eyebrow}</span>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-4">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
                        style={{
                          color: track.accentColor,
                          background: track.accentBg,
                          borderColor: `${track.accentColor}22`,
                        }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-bold text-[var(--foreground)]">{copy.title}</h2>
                        <p className="mt-1 text-xs text-[#8d8d8d]">{track.slots.length}개 주제</p>
                      </div>
                    </div>

                    <p className="text-[13px] leading-6 text-[var(--foreground-muted)]">{copy.summary}</p>
                    <span className="mt-4 inline-flex rounded-full bg-[#f5f2ed] px-3 py-1 text-[11px] font-medium text-[#6b6258]">
                      {copy.note}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <span className="flex items-center justify-center rounded-lg border border-[#e8e6e3] py-2.5 text-xs font-semibold text-[#374151] transition-colors group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)]">
                    {copy.cta}
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
