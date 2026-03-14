import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "섭취 전략 · 건강 | ProteinLab",
  description:
    "운동 전후 섭취, 체중 관리, 식사대용, 노년 단백질 전략까지 실제 생활에 바로 연결되는 단백질 섭취 전략을 정리했습니다.",
};

const featuredTopics = [
  {
    title: "운동 후 단백질",
    href: "/guides/intake-strategy-health/post-workout-protein",
    badge: "가장 먼저",
    description:
      "회복 타이밍, 20~30g 기준, 제품 선택 포인트까지 운동 후 섭취의 핵심만 먼저 정리했습니다.",
    question: "운동 후 무엇을 먼저 챙겨야 할까?",
    related: ["회복 타이밍", "20~30g 기준", "RTD와 식사 보완"],
  },
  {
    title: "단백질 섭취 타이밍",
    href: "/guides/intake-strategy-health/protein-timing",
    badge: "핵심 흐름",
    description:
      "운동 전후만이 아니라 아침, 간식, 저녁까지 하루 전체 흐름으로 단백질을 배치하는 방법을 다룹니다.",
    question: "언제 먹어야 가장 실전적으로 유지될까?",
    related: ["하루 분배", "생활 패턴", "운동 없는 날 기준"],
  },
  {
    title: "체중 관리와 단백질",
    href: "/guides/intake-strategy-health/weight-management-protein",
    badge: "목표별 전략",
    description:
      "단백질 함량만이 아니라 당류, 칼로리, 포만감까지 같이 보는 체중 관리용 선택 기준을 정리했습니다.",
    question: "감량기에는 무엇부터 봐야 할까?",
    related: ["저당 기준", "칼로리 해석", "단백질 밀도"],
  },
];

const supportingTopics = [
  {
    title: "운동 전 단백질",
    href: "/guides/intake-strategy-health/pre-workout-protein",
    description: "운동 전 섭취가 필요한 상황과 소화 부담을 줄이는 기준",
  },
  {
    title: "식사대용 전략",
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    description: "보충용 제품과 식사대용 제품을 어떻게 구분할지 정리",
  },
  {
    title: "근육 유지 전략",
    href: "/guides/intake-strategy-health/muscle-maintenance-protein",
    description: "감량기와 운동 병행 상황에서 총량과 분배를 보는 법",
  },
  {
    title: "노년 단백질 전략",
    href: "/guides/intake-strategy-health/senior-protein-strategy",
    description: "부담을 줄이면서 꾸준히 챙기는 방식과 제품 선택 기준",
  },
];

const readingFlow = [
  ["1단계", "운동 후 단백질", "운동 후 회복 기준부터 먼저 이해"],
  ["2단계", "단백질 섭취 타이밍", "하루 전체 흐름 속에서 배치"],
  ["3단계", "체중 관리와 단백질", "목표에 따라 당류·칼로리 기준 정리"],
];

export default function IntakeStrategyHealthPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>섭취 전략 · 건강</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK C
            </span>
            <span className="text-xs text-[#8b8b8b]">운동, 체중 관리, 식사대용, 건강 관리까지 연결하는 섭취 전략 트랙</span>
            <span className="text-xs text-[#8b8b8b]">7개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[var(--foreground)] md:text-[30px]">섭취 전략 · 건강</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 많이 먹는 것보다 내 생활 패턴과 목적에 맞게 배치하는 것이 중요합니다.
              <br />
              Track C는 운동 전후, 체중 관리, 식사대용, 노년 전략까지 실제 생활에 바로 적용할 수 있는 기준을 정리합니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="space-y-6">
          <section className="mt-5 rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[var(--foreground)]">먼저 읽으면 좋은 흐름</h2>
              <span className="hidden rounded-full border border-[#d9e7dc] bg-white px-3 py-1.5 text-xs font-medium text-[#24543d] md:block">
                추천 시작점: 운동 후 단백질
              </span>
            </div>
            <p className="mt-1 text-xs text-[#8b8b8b]">
              Track C는 운동 후 회복 기준을 먼저 잡고, 하루 타이밍과 목표별 전략으로 넓혀가는 순서가 가장 이해하기 쉽습니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <article className="rounded-2xl border border-[#dce8df] bg-white p-4">
                <p className="text-sm font-semibold text-[#24543d]">1단계 — 운동 후 단백질</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">운동 후 회복 기준부터 먼저 이해합니다.</p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-white p-4">
                <p className="text-sm font-semibold text-[#24543d]">2단계 — 단백질 섭취 타이밍</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">하루 전체 흐름 속에서 단백질을 배치합니다.</p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-white p-4">
                <p className="text-sm font-semibold text-[#24543d]">3단계 — 체중 관리와 단백질</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">목표에 따라 당류·칼로리 기준을 정리합니다.</p>
              </article>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">대표 주제</h2>
                <p className="mt-1 text-xs text-[#8b8b8b]">
                  운동 후 회복, 하루 타이밍, 체중 관리처럼 실전에서 가장 많이 찾는 질문부터 배치했습니다.
                </p>
              </div>
              <div className="hidden rounded-full border border-[#eadfd4] bg-[#fbf6f1] px-3 py-1.5 text-xs font-medium text-[#7a5230] md:block">
                인기 주제: 운동 후 · 체중 관리
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-3">
              {featuredTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="group flex h-full flex-col rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)] transition-colors hover:border-[#c8dfd0]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-[11px] font-semibold text-[#2d6a4f]">
                      {topic.badge}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9a8e83]">TRACK C</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#24543d] transition-colors group-hover:text-[var(--accent)]">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>
                  <div className="mt-4 flex items-center justify-end">
                    <span className="inline-flex items-center text-sm font-semibold text-[#24543d]">주제 보기 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-lg font-bold text-[var(--foreground)]">함께 읽으면 좋은 보조 주제</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {supportingTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 transition-colors hover:border-[#c8dfd0]"
                >
                  <p className="text-sm font-semibold text-[#24543d]">{topic.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
