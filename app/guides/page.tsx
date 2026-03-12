import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GuideVisual from "../components/GuideVisual";
import { getGuideTracks, type GuideTrackSlug } from "../data/guidesTracks";

export const metadata = {
  title: "단백질 가이드 | ProteinLab",
  description:
    "단백질 기초, 제품 비교, 섭취 전략, 운동 루틴까지. ProteinLab의 핵심 가이드를 한 번에 탐색할 수 있습니다.",
};

const tracks = getGuideTracks();

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
    icon: "🧪",
    subtitle: "단백질을 처음부터 이해하는 출발점",
    title: "단백질 기초",
    description:
      "단백질이 몸에서 어떤 역할을 하고, 얼마나 먹어야 하며, 부족하면 어떤 신호가 오는지 가장 먼저 정리하는 트랙입니다.",
    buttonLabel: "기초 가이드 보기",
    featuredTopics: ["단백질의 역할", "하루 단백질 섭취량", "단백질 부족 신호"],
    popularTopic: "하루 단백질 섭취량 계산",
  },
  "product-selection-comparison": {
    icon: "🔎",
    subtitle: "수치를 보고 제품을 고르는 비교 트랙",
    title: "제품 선택 · 비교",
    description:
      "단백질 음료와 단백질 바를 비교할 때 무엇을 먼저 봐야 하는지, 성분표를 어떻게 읽는지 데이터 중심으로 정리합니다.",
    buttonLabel: "비교 가이드 보기",
    featuredTopics: ["단백질 음료 고르는 법", "성분표 읽는 기준", "제품 비교 체크포인트"],
    popularTopic: "단백질 음료 고르는 법",
  },
  "intake-strategy-health": {
    icon: "⚙️",
    subtitle: "언제 어떻게 먹을지 정리하는 전략 트랙",
    title: "섭취 전략 · 건강",
    description:
      "운동 후 회복, 식사 대용, 체중 관리처럼 상황에 따라 달라지는 단백질 섭취 전략을 실제 사용 기준으로 안내합니다.",
    buttonLabel: "섭취 전략 보기",
    featuredTopics: ["운동 후 단백질 타이밍", "체중 관리 섭취 전략", "식사 대용 활용법"],
    popularTopic: "운동 후 단백질 타이밍",
  },
  "fitness-lifestyle": {
    icon: "🏃",
    subtitle: "운동과 라이프스타일에 맞춘 루틴 트랙",
    title: "운동 · 라이프스타일",
    description:
      "러닝, 근력운동, 초보 운동 루틴처럼 실제 생활 패턴 속에서 단백질을 어떻게 연결할지 더 직관적으로 보여줍니다.",
    buttonLabel: "운동 가이드 보기",
    featuredTopics: ["러닝 후 회복 전략", "근력운동과 단백질", "초보 운동 루틴"],
    popularTopic: "러닝 후 단백질 전략",
  },
  "market-insights": {
    icon: "📊",
    subtitle: "브랜드와 시장 흐름을 읽는 인사이트 트랙",
    title: "시장 인사이트",
    description:
      "ProteinLab 데이터와 시장 흐름을 함께 보면서 브랜드별 특징, 카테고리 변화, 소비 패턴을 빠르게 파악할 수 있습니다.",
    buttonLabel: "시장 인사이트 보기",
    featuredTopics: ["RTD 시장 흐름", "브랜드별 포지션", "성분 트렌드"],
    popularTopic: "국내 RTD 단백질 시장 흐름",
  },
  tools: {
    icon: "🧮",
    subtitle: "계산하고 바로 적용하는 도구 트랙",
    title: "계산기 · 도구",
    description:
      "하루 권장량과 제품 사용량을 계산하고, 실제 비교와 선택까지 연결되는 실전형 도구를 모아둔 트랙입니다.",
    buttonLabel: "도구 보기",
    featuredTopics: ["하루 권장량 계산", "제품 개수 계산", "비교용 체크도구"],
    popularTopic: "하루 단백질 섭취량 계산기",
  },
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

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <Header />

      <section className="w-full border-b border-t border-[#dce8df] bg-[linear-gradient(180deg,#f4fbf6_0%,#fbf8f2_100%)]">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-[#cfe1d7] bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-[#24543d]">
                PROTEINLAB GUIDE
              </span>
              <h1 className="mt-4 text-3xl font-black leading-[1.12] text-[#163725] md:text-[42px]">
                단백질 가이드를
                <br />
                한눈에 탐색하세요
              </h1>
              <p className="mt-4 max-w-[720px] text-sm leading-7 text-[#5c6b62] md:text-[15px]">
                단백질 기초부터 제품 비교, 섭취 전략, 운동 루틴까지.
                <br />
                검색 유입이 들어와도 바로 읽고 싶어지는 가이드 허브를 목표로 구성했습니다.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#d8e6dc] bg-[linear-gradient(135deg,#ffffff_0%,#eef7f1_62%,#f7f1e8_100%)] p-5 shadow-[0_30px_70px_rgba(24,52,38,0.10)]">
              <GuideVisual
                track="protein-basics"
                title="ProteinLab Guide"
                accentColor="#24543d"
                accentBg="#e8f4ec"
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">핵심 축</p>
                  <p className="mt-1 text-lg font-bold text-[#163725]">6 Tracks</p>
                </div>
                <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">탐색 방식</p>
                  <p className="mt-1 text-lg font-bold text-[#163725]">Guide → Compare</p>
                </div>
                <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">콘텐츠 톤</p>
                  <p className="mt-1 text-lg font-bold text-[#163725]">Data First</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-14 md:px-6">
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => {
            const copy = trackCopy[track.slug];

            return (
              <Link
                key={track.slug}
                href={`/guides/${track.slug}`}
                className="group flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[28px] border border-[#dde7df] bg-[linear-gradient(180deg,#fffefb_0%,#ffffff_100%)] shadow-[0_20px_50px_rgba(24,34,28,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#bfd8c8] hover:shadow-[0_28px_70px_rgba(24,52,38,0.10)]"
              >
                <div className="px-5 pb-5 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                      style={{ background: track.accentBg, color: track.accentColor }}
                    >
                      {track.label}
                    </span>
                    <span className="text-[11px] text-[#7f877f]" style={clampOneLine}>
                      {copy.subtitle}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-[#eff7f2] text-lg">
                      {copy.icon}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-xl font-black tracking-[-0.02em] text-[#173926] transition-colors group-hover:text-[#24543d]">
                        {copy.title}
                      </h2>
                      <p className="mt-1 text-xs text-[#7f877f]">{track.slots.length}개 주제</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <GuideVisual
                      track={track.slug}
                      title={copy.title}
                      accentColor={track.accentColor}
                      accentBg={track.accentBg}
                    />
                  </div>

                  <p className="mt-3 min-h-[48px] text-[13px] leading-7 text-[#5b675f]" style={clampTwoLines}>
                    {copy.description}
                  </p>

                  <div className="mt-4 rounded-[22px] border border-[#edf2ed] bg-[#fbfcfa] px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#74857a]">대표 콘텐츠</p>
                    <ul className="mt-3 space-y-2">
                      {copy.featuredTopics.slice(0, 3).map((topic) => (
                        <li key={`${track.slug}-${topic}`} className="flex items-start gap-2 text-[12px] leading-5 text-[#55625a]">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d6a4f]" />
                          <span style={clampOneLine}>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-[20px] border border-[#d9e9de] bg-[linear-gradient(135deg,#f0f8f2_0%,#ffffff_100%)] px-4 py-3">
                    <p className="text-[11px] font-bold tracking-[0.12em] text-[#24543d]">인기 콘텐츠</p>
                    <p className="mt-1 text-[13px] font-semibold leading-5 text-[#173926]" style={clampOneLine}>
                      {copy.popularTopic}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <span className="flex items-center justify-center rounded-xl border border-[#d8e6dc] bg-[#f3faf5] py-3 text-sm font-bold text-[#24543d] transition-colors group-hover:border-[#bfd8c8] group-hover:bg-[#eaf5ee]">
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
