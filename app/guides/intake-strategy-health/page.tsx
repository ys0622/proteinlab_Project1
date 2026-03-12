import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "섭취 전략 · 건강 | ProteinLab",
  description:
    "운동 전후 섭취, 체중 관리, 근육 유지, 노년 단백질, 식사대용 전략까지 Track C에서 정리합니다.",
};

const topics = [
  {
    title: "단백질 섭취 타이밍",
    href: "/guides/intake-strategy-health/protein-timing",
    description:
      "하루 중 언제 먹는 것이 좋은지, 운동 전후가 아니라 일상 식사 배치까지 포함해 기본 흐름을 정리합니다.",
    question: "단백질은 언제 먹어야 가장 실용적일까?",
    related: ["식사 분배", "운동 전후", "간식 타이밍"],
    badge: "핵심",
  },
  {
    title: "운동 전 단백질",
    href: "/guides/intake-strategy-health/pre-workout-protein",
    description:
      "운동 전에 먹는 단백질이 어떤 상황에서 유리한지, 소화 부담은 어떻게 줄여야 하는지 정리합니다.",
    question: "운동 전에 단백질을 먹는 것이 항상 좋을까?",
    related: ["소화 부담", "운동 전 간식", "탄수화물 병행"],
    badge: "실전",
  },
  {
    title: "운동 후 단백질",
    href: "/guides/intake-strategy-health/post-workout-protein",
    description:
      "운동 후 회복에 필요한 단백질 타이밍과 용도별 제품 선택 기준을 회복 관점에서 설명합니다.",
    question: "운동 후에는 무엇을 먼저 챙겨야 할까?",
    related: ["회복 타이밍", "단백질 20~30g", "회복용 제품"],
    badge: "인기",
  },
  {
    title: "체중 관리와 단백질",
    href: "/guides/intake-strategy-health/weight-management-protein",
    description:
      "감량과 유지 단계에서 단백질을 어떻게 활용해야 하는지, 저당 제품을 어떤 기준으로 볼지 정리합니다.",
    question: "체중 관리를 할 때 단백질은 어떻게 써야 할까?",
    related: ["저당", "칼로리", "포만감"],
    badge: "관리",
  },
  {
    title: "근육 유지 전략",
    href: "/guides/intake-strategy-health/muscle-maintenance-protein",
    description:
      "감량기와 운동 병행 상황에서 근육 유지가 왜 중요한지, 총량과 분배 관점에서 정리합니다.",
    question: "근손실을 줄이려면 무엇부터 바꿔야 할까?",
    related: ["총량", "분배", "근육 유지"],
    badge: "유지",
  },
  {
    title: "노년 단백질 전략",
    href: "/guides/intake-strategy-health/senior-protein-strategy",
    description:
      "노년층이 부담을 줄이면서 단백질을 꾸준히 섭취하기 위한 기준과 제품 선택 포인트를 다룹니다.",
    question: "노년층은 어떤 방식으로 단백질을 챙겨야 할까?",
    related: ["부담 낮은 선택", "식사 보완", "꾸준한 섭취"],
    badge: "건강",
  },
  {
    title: "식사대용 전략",
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    description:
      "식사대용과 보충용의 차이를 구분하고, 어떤 경우에 단백질 음료를 식사대용으로 볼 수 있는지 정리합니다.",
    question: "단백질 음료는 언제 식사대용이 될 수 있을까?",
    related: ["포만감", "총열량", "식사대용 기준"],
    badge: "판단",
  },
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
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
            <span className="text-xs text-[#8b8b8b]">섭취 전략과 건강 관리를 연결하는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[#6a5036] md:text-[30px]">섭취 전략 · 건강</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              운동 전후, 체중 관리, 노년기, 식사대용까지.
              <br />
              단백질을 언제, 어떻게, 어떤 목적으로 활용할지 Track C에서 실전 중심으로 정리합니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">
                기본 타이밍부터 운동 전후, 체중 관리와 식사대용까지 실제 섭취 전략 흐름에 맞춰 배치했습니다.
              </p>
            </div>
            <div className="hidden rounded-full border border-[#eadfd4] bg-[#fbf6f1] px-3 py-1.5 text-xs font-medium text-[#7a5230] md:block">
              인기: 운동 후 단백질
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex h-full min-h-[228px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4 transition-colors hover:border-[#d9c8b6] sm:min-h-[248px] sm:px-5 sm:py-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#f8f1ea] px-3 py-1 text-[11px] font-semibold text-[#7a5230]">
                      {topic.badge}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9a8e83]">Track C</span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-[#6a5036] transition-colors group-hover:text-[var(--accent)]">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>

                  <div className="mt-4 rounded-xl border border-[#f0e7e0] bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9a8e83]">핵심 질문</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--foreground)]">{topic.question}</p>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {topic.related.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b68b69]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#f8f1ea] px-2.5 py-1 text-[11px] font-semibold text-[#7a5230]">
                    보기
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-[#6a5036]">주제 보기</span>
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

