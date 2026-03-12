import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";

export const metadata = {
  title: "단백질 기초 | ProteinLab",
  description:
    "단백질의 역할, 하루 권장량, 부족 신호, 소화와 흡수까지. Track A의 핵심 기초 콘텐츠를 한곳에 모았습니다.",
};

const topics = [
  {
    title: "단백질 역할 개요",
    href: "/guides/protein-basics/protein-functions",
    description: "근육, 면역, 호르몬까지. 단백질이 몸에서 어떤 역할을 하는지 가장 먼저 이해하는 출발점입니다.",
    question: "단백질은 몸에서 정확히 어떤 일을 할까?",
    related: ["근육과 단백질", "면역·호르몬과 단백질"],
    badge: "대표",
  },
  {
    title: "근육과 단백질",
    href: "/guides/basics/muscle",
    description: "근단백질 합성, 회복, 운동 후 섭취 타이밍까지. 근육 성장과 단백질의 연결을 데이터로 설명합니다.",
    question: "운동 후 왜 단백질을 챙겨야 할까?",
    related: ["운동 후 20~40g", "하루 총량 계산"],
    badge: "인기",
  },
  {
    title: "면역·호르몬과 단백질",
    href: "/guides/basics/immunity-hormone",
    description: "항체, 사이토카인, 호르몬, 효소까지. 단백질 부족이 면역과 대사에 미치는 영향을 정리합니다.",
    question: "단백질이 면역과 회복에도 중요할까?",
    related: ["항체와 면역단백질", "인슐린과 성장호르몬"],
    badge: "핵심",
  },
  {
    title: "단백질 부족 신호",
    href: "/guides/basics/deficiency-symptoms",
    description: "피로, 근육 감소, 붓기, 면역 저하처럼 반복되는 결핍 신호를 먼저 읽는 페이지입니다.",
    question: "요즘 자주 피곤한 것도 단백질 부족일까?",
    related: ["결핍 신호 6가지", "위험군 체크"],
    badge: "체크",
  },
  {
    title: "하루 단백질 권장량",
    href: "/guides/basics/daily-requirement",
    description: "체중과 활동량에 따라 단백질 권장량을 어떻게 계산해야 하는지 실전 기준으로 확인할 수 있습니다.",
    question: "나는 하루에 몇 g을 먹어야 할까?",
    related: ["체중 기준 계산", "운동량별 기준"],
    badge: "계산",
  },
  {
    title: "단백질 소화와 흡수",
    href: "/guides/basics/digestion",
    description: "먹은 단백질이 어떻게 분해되고 흡수되는지 이해하면 제품 선택과 섭취 타이밍까지 더 명확해집니다.",
    question: "먹은 단백질은 어디서 흡수될까?",
    related: ["소화효소", "흡수 과정"],
    badge: "확장",
  },
];

const highlightPoints = [
  "단백질의 역할을 먼저 이해하고",
  "내 몸에 필요한 총량을 계산한 뒤",
  "부족 신호와 실전 섭취 전략까지 연결하는 순서로 읽으면 흐름이 가장 자연스럽습니다.",
];

export default function ProteinBasicsTrackPage() {
  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <Header />

      <section className="w-full border-b border-t border-[#dce8df] bg-[linear-gradient(180deg,#edf8f1_0%,#faf5ed_100%)]">
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-7">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              guides
            </Link>
            <span>/</span>
            <span>단백질 기초</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#e7f3ec] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#2d6a4f]">
              TRACK A
            </span>
            <span className="text-xs text-[#728077]">단백질을 이해하는 첫 번째 허브</span>
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="text-[30px] font-black leading-[1.08] tracking-[-0.02em] text-[#153726] md:text-[42px]">
                단백질 기초를
                <br />
                더 빠르게 이해하는 방법
              </h1>
              <p className="mt-4 max-w-[720px] text-sm leading-7 text-[#5c6b62] md:text-[15px]">
                역할, 섭취량, 부족 신호, 흡수까지.
                <br />
                Track A는 단백질 관련 검색 유입을 가장 먼저 받아야 하는 핵심 페이지라서, 읽는 흐름이 바로 잡히도록 구성했습니다.
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {highlightPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-[#dce8df] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#244433] shadow-[0_12px_30px_rgba(24,52,38,0.05)]">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#d8e6dc] bg-[linear-gradient(135deg,#ffffff_0%,#eef7f1_58%,#f7efe4_100%)] p-5 shadow-[0_28px_70px_rgba(24,52,38,0.10)]">
              <GuideVisual
                track="protein-basics"
                title="단백질 기초"
                accentColor="#2d6a4f"
                accentBg="#e7f3ec"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">핵심 주제</p>
                  <p className="mt-1 text-lg font-bold text-[#173926]">6 Topics</p>
                </div>
                <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">추천 시작점</p>
                  <p className="mt-1 text-lg font-bold text-[#173926]">역할 개요</p>
                </div>
                <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">읽기 흐름</p>
                  <p className="mt-1 text-lg font-bold text-[#173926]">기초 → 실전</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-14 md:px-6">
        <section className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#163725]">Track A 핵심 주제</h2>
              <p className="mt-1 text-sm text-[#748077]">기초 개념을 먼저 잡고, 근육·면역·부족 신호로 병렬 확장할 수 있게 정리했습니다.</p>
            </div>
            <span className="hidden rounded-full border border-[#d7e6dd] bg-[#f1f8f3] px-3 py-1.5 text-xs font-semibold text-[#24543d] md:inline-flex">
              아래 카드에서 바로 이동
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex min-h-[280px] flex-col justify-between rounded-[28px] border border-[#dde7df] bg-[linear-gradient(180deg,#fffefb_0%,#ffffff_100%)] px-5 py-5 shadow-[0_20px_50px_rgba(24,34,28,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#bfd8c8] hover:shadow-[0_28px_70px_rgba(24,52,38,0.10)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#eef7f1] px-3 py-1 text-[11px] font-semibold text-[#24543d]">
                      {topic.badge}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b867f]">Track A</span>
                  </div>

                  <h3 className="mt-4 text-lg font-black leading-6 text-[#163725] transition-colors group-hover:text-[#24543d]">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#58665d]">{topic.description}</p>

                  <div className="mt-4 rounded-[22px] border border-[#edf2ed] bg-[#fbfcfa] px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#74857a]">핵심 질문</p>
                    <p className="mt-2 text-[13px] font-semibold leading-6 text-[#173926]">{topic.question}</p>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {topic.related.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[12px] leading-5 text-[#59655e]">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d6a4f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#24543d]">주제 보기</span>
                  <span className="rounded-full border border-[#d6e5db] bg-[#f2f8f4] px-3 py-1 text-[11px] font-semibold text-[#24543d]">
                    바로 이동
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
