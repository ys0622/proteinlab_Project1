import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "제품 선택 · 비교 | ProteinLab",
  description:
    "단백질 음료와 단백질 바를 고를 때 필요한 기준, 비교 포인트, 추천 리스트 읽는 법을 Track B에서 정리합니다.",
};

const topics = [
  {
    title: "단백질 음료 선택 가이드",
    href: "/guides/product-selection-comparison/protein-drink-guide",
    description:
      "단백질 음료를 고를 때는 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떤 순서로 봐야 하는지부터 정리해야 합니다.",
    question: "단백질 음료는 어떤 숫자부터 보면 비교가 쉬워질까?",
    related: ["단백질 g", "당류", "칼로리", "단백질 밀도"],
    badge: "핵심",
  },
  {
    title: "단백질 바 선택 가이드",
    href: "/guides/product-selection-comparison/protein-bar-guide",
    description:
      "단백질 바는 간식형과 식사 보완형을 구분하는 것이 먼저입니다. 당류와 칼로리도 함께 봐야 실제 용도와 맞습니다.",
    question: "단백질 바는 간식과 식사 보완 중 어디에 더 가까울까?",
    related: ["당류", "칼로리", "단백질 함량"],
    badge: "핵심",
  },
  {
    title: "영양성분 비교 읽는 법",
    href: "/guides/product-selection-comparison/nutrition-comparison",
    description:
      "성분표는 숫자 하나보다 조합이 중요합니다. 목적별로 무엇을 먼저 비교해야 하는지 표와 카드로 정리합니다.",
    question: "성분표는 어떤 조합으로 읽어야 실수를 줄일 수 있을까?",
    related: ["비교 순서", "숫자 해석", "용도별 판단"],
    badge: "실전",
  },
  {
    title: "영양성분 기준 잡기",
    href: "/guides/product-selection-comparison/nutrition-criteria",
    description:
      "좋은 제품을 고를 때 참고할 수 있는 최소 기준을 먼저 잡아두면 비교 속도가 빨라집니다.",
    question: "좋은 제품을 판단할 최소 기준은 어디부터 잡아야 할까?",
    related: ["단백질 기준", "당류 기준", "칼로리 기준"],
    badge: "기준",
  },
  {
    title: "추천 리스트 활용법",
    href: "/guides/product-selection-comparison/recommendation-lists",
    description:
      "추천, 큐레이션, picks, 비교 리스트가 각각 어떤 상황에서 유용한지 알면 제품 탐색 흐름이 훨씬 자연스러워집니다.",
    question: "추천 페이지와 큐레이션은 어떤 상황에서 다르게 써야 할까?",
    related: ["추천", "큐레이션", "비교 흐름"],
    badge: "탐색",
  },
  {
    title: "등급 · 랭킹 읽는 법",
    href: "/guides/product-selection-comparison/ranking-content",
    description:
      "등급, 랭킹, 점수는 역할이 다릅니다. 무엇을 기준으로 읽어야 하는지 이해하면 순위 해석이 쉬워집니다.",
    question: "랭킹 1위는 어떤 기준으로 정해지고, 점수는 무엇을 뜻할까?",
    related: ["등급", "랭킹", "100점 환산"],
    badge: "데이터",
  },
];

const startCards = [
  {
    title: "1. 성분표 읽기",
    body: "단백질 음료와 단백질 바를 볼 때 어떤 숫자를 먼저 봐야 하는지 익힙니다.",
  },
  {
    title: "2. 기준 잡기",
    body: "단백질, 당류, 칼로리, 단백질 밀도의 최소 기준을 세웁니다.",
  },
  {
    title: "3. 추천과 랭킹 해석",
    body: "추천 리스트, 큐레이션, 등급과 랭킹을 어떤 상황에서 쓰는지 연결합니다.",
  },
];

export default function ProductSelectionComparisonPage() {
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
            <span>제품 선택 · 비교</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
            <span className="text-xs text-[#8b8b8b]">제품 비교 흐름을 이해하는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[#3f556d] md:text-[30px]">제품 선택 · 비교</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료와 단백질 바를 고를 때는 숫자를 보는 순서가 중요합니다.
              <br />
              Track B에서는 성분표를 읽는 법부터 추천 리스트, 등급과 랭킹 해석까지 제품 비교 흐름에 맞춰 정리합니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5 rounded-2xl border border-[#d8e2eb] bg-[#f7fafc] px-5 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">먼저 읽으면 좋은 흐름</h2>
              <p className="mt-1 text-xs text-[#7b8792]">
                처음 보는 사용자라면 성분표 읽기부터 시작하고, 그다음 기준과 랭킹 해석으로 넘어가면 비교가 쉬워집니다.
              </p>
            </div>
            <div className="hidden rounded-full border border-[#d8e2eb] bg-white px-3 py-1.5 text-xs font-medium text-[#4a6178] md:block">
              시작 추천: 단백질 음료 선택 가이드
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {startCards.map((item) => (
              <article key={item.title} className="rounded-xl border border-[#dfe7ee] bg-white p-4">
                <h3 className="text-sm font-semibold text-[#3f556d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">
                제품을 보는 기본 기준부터 추천과 랭킹 해석까지, 비교에 필요한 순서대로 주제를 배치했습니다.
              </p>
            </div>
            <div className="hidden rounded-full border border-[#d8e2eb] bg-[#f4f8fc] px-3 py-1.5 text-xs font-medium text-[#4a6178] md:block">
              인기: 영양성분 비교 읽는 법
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex h-full min-h-[228px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4 transition-colors hover:border-[#c8d5e2] sm:min-h-[248px] sm:px-5 sm:py-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#eef4f9] px-3 py-1 text-[11px] font-semibold text-[#4a6178]">
                      {topic.badge}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#8d98a1]">Track B</span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-[#3f556d] transition-colors group-hover:text-[var(--accent)]">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>

                  <div className="mt-4 rounded-xl border border-[#e8eef3] bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8d98a1]">핵심 질문</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--foreground)]">{topic.question}</p>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {topic.related.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7d9ab4]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#eef4f9] px-2.5 py-1 text-[11px] font-semibold text-[#4a6178]">
                    보기
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-[#3f556d]">주제 보기</span>
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
