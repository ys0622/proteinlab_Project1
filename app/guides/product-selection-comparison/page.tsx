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
      "RTD 단백질 음료를 볼 때 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떤 순서로 봐야 하는지 정리합니다.",
    question: "단백질 음료는 어떤 숫자부터 봐야 할까?",
    related: ["단백질 g", "당류", "칼로리", "단백질 밀도"],
    badge: "핵심",
  },
  {
    title: "단백질 바 선택 가이드",
    href: "/guides/product-selection-comparison/protein-bar-guide",
    description:
      "간식형과 식사 보완형을 구분하고, 단백질 바에서 특히 주의해서 봐야 하는 함량 포인트를 정리합니다.",
    question: "단백질 바는 간식과 식사 보완 중 어디에 더 가까울까?",
    related: ["당류", "칼로리", "단백질 함량"],
    badge: "핵심",
  },
  {
    title: "영양성분 비교 읽는 법",
    href: "/guides/product-selection-comparison/nutrition-comparison",
    description:
      "단백질, 당류, 칼로리, 지방을 함께 볼 때 어떤 조합이 좋은지 비교 중심으로 설명합니다.",
    question: "성분표는 어떤 조합으로 읽어야 실수하지 않을까?",
    related: ["성분표 읽기", "비교 순서", "숫자 해석"],
    badge: "실전",
  },
  {
    title: "영양성분 기준 잡기",
    href: "/guides/product-selection-comparison/nutrition-criteria",
    description:
      "좋은 제품을 고를 때 참고할 수 있는 최소 기준과 상황별 우선순위를 간단하게 정리합니다.",
    question: "좋은 제품을 판단할 최소 기준은 어디일까?",
    related: ["단백질 기준", "당류 기준", "칼로리 기준"],
    badge: "기준",
  },
  {
    title: "추천 리스트 활용법",
    href: "/guides/product-selection-comparison/recommendation-lists",
    description:
      "추천, picks, 큐레이션, 비교 리스트가 각각 어떤 상황에 맞는지 빠르게 이해할 수 있도록 정리합니다.",
    question: "추천 페이지와 큐레이션은 어떻게 다를까?",
    related: ["추천", "큐레이션", "비교 흐름"],
    badge: "탐색",
  },
  {
    title: "등급 · 랭킹 읽는 법",
    href: "/guides/product-selection-comparison/ranking-content",
    description:
      "등급과 랭킹이 무엇을 의미하는지, 점수와 순위를 어떻게 읽어야 하는지 데이터 기준으로 설명합니다.",
    question: "랭킹 1위는 어떤 기준으로 정해질까?",
    related: ["등급", "랭킹", "100점 환산"],
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
              Track B에서는 성분표, 추천 리스트, 등급과 랭킹을 읽는 법을 제품 비교 흐름에 맞춰 정리합니다.
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

