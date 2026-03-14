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
      "단백질 바는 간식형과 식사 보완형을 먼저 나누고 당류와 칼로리까지 함께 보는 기준을 정리합니다.",
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
    question: "그릭요거트는 단백질만 높으면 충분할까?",
    related: ["그릭요거트", "단백질 밀도", "당류", "대용량"],
    badge: "요거트",
  },
  {
    title: "저당 단백질 요거트 기준",
    href: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
    description:
      "저당 단백질 요거트를 고를 때 당류 기준을 어디에 두고, 단백질 함량과 함께 어떻게 읽어야 하는지 정리합니다.",
    question: "저당 요거트는 당류만 낮으면 충분할까?",
    related: ["저당 요거트", "당류 기준", "단백질 함량"],
    badge: "요거트",
  },
  {
    title: "드링킹 요거트 비교 가이드",
    href: "/guides/product-selection-comparison/drinking-yogurt-guide",
    description:
      "마시는 단백질 요거트를 비교할 때 용량, 단백질 함량, 당류를 어떻게 같이 봐야 하는지 정리합니다.",
    question: "드링킹 요거트는 편의성 말고 무엇을 같이 봐야 할까?",
    related: ["드링킹 요거트", "용량", "휴대성", "단백질 함량"],
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
    question: "영양성분은 어떤 조합으로 읽어야 실수를 줄일 수 있을까?",
    related: ["비교 순서", "숫자 해석", "용도별 판단"],
    badge: "실전",
  },
  {
    title: "영양성분 기준 익히기",
    href: "/guides/product-selection-comparison/nutrition-criteria",
    description:
      "좋은 제품을 고를 때 참고할 만한 단백질, 당류, 칼로리, 단백질 밀도 기준을 정리합니다.",
    question: "좋은 제품의 최소 기준은 어디부터 잡아야 할까?",
    related: ["단백질 기준", "당류 기준", "칼로리 기준"],
    badge: "기준",
  },
  {
    title: "추천 리스트 활용법",
    href: "/guides/product-selection-comparison/recommendation-lists",
    description:
      "추천, 큐레이션, picks, 비교 리스트를 어떤 상황에서 구분해서 읽어야 하는지 정리합니다.",
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
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK B
            </span>
            <span className="text-xs text-[#8b8b8b]">제품 비교 흐름을 이해하는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[var(--foreground)] md:text-[30px]">제품 선택 & 비교</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료, 단백질 바, 단백질 요거트를 고를 때는 숫자를 읽는 순서가 중요합니다.
              <br />
              Track B에서는 성분 비교, 추천 리스트, 랭킹 해석, 요거트 선택 기준까지 제품 탐색 흐름에 맞춰 정리합니다.
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
                대표 질문과 핵심 포인트를 먼저 보고 필요한 주제로 이동하세요.
              </p>
            </div>
            <div className="hidden rounded-full border border-[#d9e7dc] bg-[#eff7f1] px-3 py-1.5 text-xs font-medium text-[#24543d] md:block">
              인기: 영양성분 비교 읽는 법
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
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
                          {topic.badge}
                        </span>
                      </div>
                      <span className="rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">
                        LIVE
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-[#1f5138] transition-colors group-hover:text-[var(--accent)]">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[var(--foreground-muted)]">
                      {topic.description}
                    </p>

                    <div className="mt-4 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2.5">
                      <p className="text-[11px] font-semibold text-[#1f5138]">읽기 시간</p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]">5분 읽기</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">
                      인기
                    </span>
                    <span className="text-xs font-semibold text-[#2f5d46] transition-colors group-hover:text-[#1f4834]">
                      주제 보기
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
