import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "섭취 전략 & 건강 | ProteinLab",
  description:
    "운동 전후 섭취, 체중 관리, 식사대용, 시니어 단백질 전략까지 일상에 바로 적용할 수 있는 ProteinLab Track C 가이드입니다.",
};

const featuredTopics = [
  {
    title: "운동 후 단백질",
    href: "/guides/intake-strategy-health/post-workout-protein",
    badge: "가장 많이 찾는 주제",
    description:
      "운동 직후 20~30g 보충 시점, 회복 루틴, 제품 선택 기준까지 한 번에 정리한 실전형 가이드입니다.",
    question: "운동 직후 무엇을 얼마나 먹는 것이 가장 실용적인가?",
  },
  {
    title: "단백질 섭취 타이밍",
    href: "/guides/intake-strategy-health/protein-timing",
    badge: "하루 루틴 설계",
    description:
      "아침, 운동 전후, 간식, 저녁까지 하루 전체 루틴 안에서 단백질을 언제 배치하면 좋은지 정리합니다.",
    question: "언제 먹어야 꾸준하게 실천하기 쉽고 효율이 좋아질까?",
  },
  {
    title: "체중 관리용 단백질",
    href: "/guides/intake-strategy-health/weight-management-protein",
    badge: "다이어트 실전",
    description:
      "단백질 양만이 아니라 당류, 칼로리, 포만감까지 같이 보는 체중 관리용 기준을 설명합니다.",
    question: "감량기에는 무엇부터 우선순위로 체크해야 할까?",
  },
];

const supportingTopics = [
  {
    title: "운동 전 단백질",
    href: "/guides/intake-strategy-health/pre-workout-protein",
    description: "운동 전 단백질이 필요한 상황과 소화 부담을 줄이는 선택 기준을 정리합니다.",
  },
  {
    title: "식사대용 전략",
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    description: "보충용 제품과 식사대용 제품을 어떤 기준으로 구분해야 하는지 설명합니다.",
  },
  {
    title: "근육 유지 전략",
    href: "/guides/intake-strategy-health/muscle-maintenance-protein",
    description: "감량기나 운동 병행 상황에서 총량과 분산 섭취를 어떻게 설계해야 하는지 정리합니다.",
  },
  {
    title: "시니어 단백질 전략",
    href: "/guides/intake-strategy-health/senior-protein-strategy",
    description: "부담을 줄이면서도 꾸준하게 단백질을 채우는 방법과 제품 선택 기준을 정리합니다.",
  },
];

type IntakeTopicCard = {
  title: string;
  href: string;
  description: string;
  badge?: string;
  question?: string;
};

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
            <span>섭취 전략 & 건강</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK C
            </span>
            <span className="text-xs text-[#8b8b8b]">운동, 체중 관리, 식사대용, 시니어 전략을 연결하는 단백질 루틴 트랙</span>
            <span className="text-xs text-[#8b8b8b]">7개 주제</span>
          </div>
          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[var(--foreground)] md:text-[30px]">섭취 전략 & 건강</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 많이 먹는 것보다 목적과 생활 패턴에 맞게 배치하는 것이 더 중요합니다.
              <br />
              Track C는 운동 전후, 체중 관리, 식사대용, 시니어 전략까지 실전에 바로 적용하는 기준을 모은 트랙입니다.
            </p>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">질문과 가이드부터 보고, 필요한 루틴 주제로 바로 이동하세요.</p>
            </div>
            <div className="hidden rounded-full border border-[#d9e7dc] bg-[#eff7f1] px-3 py-1.5 text-xs font-medium text-[#24543d] md:block">
              추천: 운동 후 단백질
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[...featuredTopics, ...supportingTopics].map((topic: IntakeTopicCard) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
              >
                <div className="h-1.5 w-full rounded-t-2xl bg-[#2d6a4f]" />
                <div className="flex flex-1 flex-col justify-between px-5 py-4">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">
                          {topic.badge ?? "보조 주제"}
                        </span>
                      </div>
                      <span className="rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">
                        LIVE
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-[#1f5138] transition-colors group-hover:text-[var(--accent)]">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[var(--foreground-muted)]">{topic.description}</p>
                    <div className="mt-4 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2.5">
                      <p className="text-[11px] font-semibold text-[#1f5138]">대표 질문</p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]">
                        {topic.question ?? "상황별로 어떤 섭취 기준이 다른지 확인할 수 있습니다."}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">
                      바로 보기
                    </span>
                    <span className="text-xs font-semibold text-[#2f5d46] transition-colors group-hover:text-[#1f4834]">
                      주제 읽기
                    </span>
                  </div>
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
