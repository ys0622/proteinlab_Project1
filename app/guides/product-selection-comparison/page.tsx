import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "제품 선택 & 비교 가이드 | 단백질 음료·바·요거트 | ProteinLab",
  description:
    "단백질 음료, 단백질 바, 단백질 요거트를 고를 때 필요한 비교 기준과 추천, 랭킹 읽는 법을 Track B에서 정리합니다.",
};

const topics = [
  {
    title: "단백질 음료 선택 가이드",
    href: "/guides/product-selection-comparison/protein-drink-guide",
    description:
      "단백질 음료를 고를 때 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떤 순서로 봐야 하는지 정리합니다.",
    question: "단백질 음료는 어떤 숫자부터 보면 비교가 쉬워질까?",
    related: ["단백질 g", "당류", "칼로리", "단백질 밀도"],
    badge: "입문",
  },
  {
    title: "단백질 바 선택 가이드",
    href: "/guides/product-selection-comparison/protein-bar-guide",
    description:
      "단백질 바는 간식형과 식사 보완형을 먼저 나누고, 당류와 칼로리까지 함께 보는 기준을 정리합니다.",
    question: "단백질 바는 간식형과 식사 보완형 중 어디에 가까운가?",
    related: ["당류", "칼로리", "단백질 함량"],
    badge: "입문",
  },
  {
    title: "단백질 요거트 추천 기준",
    href: "/guides/product-selection-comparison/protein-yogurt-guide",
    description:
      "그릭요거트, 드링킹 요거트, 대용량 요거트를 어떤 기준으로 나눠 봐야 하는지 정리합니다.",
    question: "단백질 요거트는 그릭, 드링킹, 대용량을 어떻게 나눠 봐야 할까?",
    related: ["단백질 함량", "당류", "그릭요거트", "드링킹 요거트"],
    badge: "요거트",
  },
  {
    title: "그릭요거트 추천 기준",
    href: "/guides/product-selection-comparison/greek-yogurt-guide",
    description:
      "꾸덕한 그릭요거트를 고를 때 단백질 밀도, 당류, 대용량 여부를 어떻게 함께 봐야 하는지 정리합니다.",
    question: "그릭요거트는 단백질만 높으면 좋은 걸까?",
    related: ["그릭요거트 추천", "단백질 밀도", "당류", "대용량"],
    badge: "요거트",
  },
  {
    title: "저당 단백질 요거트 기준",
    href: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
    description:
      "저당 단백질 요거트를 고를 때 당류 기준을 어디에 두고, 단백질 함량과 같이 어떻게 읽어야 하는지 정리합니다.",
    question: "저당 요거트는 당류만 낮으면 충분할까?",
    related: ["저당 요거트", "당류 기준", "단백질 함량"],
    badge: "요거트",
  },
  {
    title: "드링킹 요거트 비교 포인트",
    href: "/guides/product-selection-comparison/drinking-yogurt-guide",
    description:
      "마시는 단백질 요거트를 비교할 때 휴대성, 용량, 단백질 효율을 어떻게 같이 봐야 하는지 정리합니다.",
    question: "드링킹 요거트는 편의성 말고 무엇을 같이 봐야 할까?",
    related: ["드링킹 요거트", "용량", "휴대성", "단백질 효율"],
    badge: "요거트",
  },
  {
    title: "단백질 요거트 순위 읽는 법",
    href: "/guides/product-selection-comparison/protein-yogurt-ranking-guide",
    description:
      "단백질 요거트 랭킹에서 단백질 밀도, 다이어트, 퍼포먼스 점수를 어떻게 읽어야 하는지 정리합니다.",
    question: "요거트 랭킹 1위는 어떤 기준으로 정해질까?",
    related: ["요거트 순위", "단백질 밀도", "다이어트", "퍼포먼스"],
    badge: "요거트",
  },
  {
    title: "영양성분 비교 읽는 법",
    href: "/guides/product-selection-comparison/nutrition-comparison",
    description:
      "성분표는 숫자 하나보다 조합이 중요합니다. 목적별로 무엇을 먼저 비교해야 하는지 정리합니다.",
    question: "성분표는 어떤 조합으로 읽어야 실수를 줄일 수 있을까?",
    related: ["비교 순서", "숫자 해석", "용도별 판단"],
    badge: "실전",
  },
  {
    title: "영양성분 기준 세우기",
    href: "/guides/product-selection-comparison/nutrition-criteria",
    description:
      "좋은 제품을 고를 때 참고할 수 있는 단백질, 당류, 칼로리, 단백질 밀도 기준을 정리합니다.",
    question: "좋은 제품을 판단할 최소 기준은 어디부터 잡아야 할까?",
    related: ["단백질 기준", "당류 기준", "칼로리 기준"],
    badge: "기준",
  },
  {
    title: "추천 리스트 활용법",
    href: "/guides/product-selection-comparison/recommendation-lists",
    description:
      "추천, 큐레이션, picks, 비교 리스트를 어떤 상황에서 구분해 써야 하는지 정리합니다.",
    question: "추천 페이지와 큐레이션은 언제 다르게 봐야 할까?",
    related: ["추천", "큐레이션", "비교 흐름"],
    badge: "탐색",
  },
  {
    title: "랭킹 & 점수 읽는 법",
    href: "/guides/product-selection-comparison/ranking-content",
    description:
      "랭킹, 순위, 점수를 어떤 기준으로 읽어야 하는지 이해하기 쉽게 정리합니다.",
    question: "순위 1위는 어떤 기준이고 점수는 무엇을 뜻할까?",
    related: ["랭킹", "순위", "100점 환산"],
    badge: "데이터",
  },
];

const startCards = [
  {
    title: "1. 제품 유형 나누기",
    body: "음료, 바, 요거트를 먼저 나누고 같은 유형 안에서 성분을 비교해야 판단이 쉬워집니다.",
  },
  {
    title: "2. 성분 기준 세우기",
    body: "단백질, 당류, 칼로리, 단백질 밀도 기준을 먼저 잡아두면 필요한 제품만 빠르게 남길 수 있습니다.",
  },
  {
    title: "3. 추천과 랭킹 연결하기",
    body: "추천은 상황별 탐색, 랭킹은 상대 비교에 가깝습니다. 두 흐름을 같이 봐야 선택이 쉬워집니다.",
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
            <span>제품 선택 & 비교</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
            <span className="text-xs text-[#8b8b8b]">제품 비교 흐름을 이해하는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[#3f556d] md:text-[30px]">제품 선택 & 비교</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료, 단백질 바, 단백질 요거트를 고를 때는 숫자를 보는 순서가 중요합니다.
              <br />
              Track B에서는 성분 비교, 추천 리스트, 랭킹 해석, 요거트 선택 기준까지 제품 탐색 흐름에 맞춰 정리합니다.
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
                처음 보는 사용자라면 제품 유형 구분부터 시작하고, 그 다음 성분 기준과 랭킹 해석으로 넘어가면 비교가 쉬워집니다.
              </p>
            </div>
            <div className="hidden rounded-full border border-[#d8e2eb] bg-white px-3 py-1.5 text-xs font-medium text-[#4a6178] md:block">
              시작 추천: 단백질 요거트 추천 기준
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
                제품을 보는 기본 기준부터 추천과 랭킹 해석, 단백질 요거트 선택 기준까지 검색 의도에 맞는 주제로 정리했습니다.
              </p>
            </div>
            <div className="hidden rounded-full border border-[#d8e2eb] bg-[#f4f8fc] px-3 py-1.5 text-xs font-medium text-[#4a6178] md:block">
              신규: 단백질 요거트 가이드 묶음
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
