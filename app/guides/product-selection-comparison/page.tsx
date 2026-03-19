import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "제품 선택 & 비교 가이드 | 단백질 음료·바·요거트 비교 기준 | ProteinLab",
  description:
    "단백질 음료, 단백질 바, 단백질 요거트를 어떤 기준으로 비교하고 선택해야 하는지 Track B에서 제품 탐색 흐름 중심으로 정리합니다.",
};

const topics = [
  {
    title: "단백질 음료 선택 가이드",
    href: "/guides/product-selection-comparison/protein-drink-guide",
    description: "단백질 음료를 고를 때 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떤 순서로 봐야 하는지 정리합니다.",
    question: "단백질 음료는 어떤 숫자부터 봐야 비교가 쉬울까?",
    related: ["단백질 g", "당류", "칼로리", "단백질 밀도"],
    badge: "입문",
  },
  {
    title: "다이어트 단백질 음료 기준",
    href: "/guides/product-selection-comparison/diet-protein-drink-guide",
    description: "체중 관리 목적에서 칼로리, 당류, 단백질 밀도를 어떤 순서로 봐야 하는지 정리합니다.",
    question: "다이어트용 단백질 음료는 단백질만 높으면 충분할까?",
    related: ["당류", "저칼로리", "단백질 밀도"],
    badge: "음료",
  },
  {
    title: "저당 단백질 음료 추천 기준",
    href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide",
    description: "당류가 낮은 단백질 음료를 고를 때 확인해야 할 기준과 예외를 정리합니다.",
    question: "저당 단백질 음료는 당류 몇 g부터 봐야 할까?",
    related: ["저당", "워터형", "RTD"],
    badge: "음료",
  },
  {
    title: "단백질 쉐이크 추천 가이드",
    href: "/guides/product-selection-comparison/protein-shake-guide",
    description: "파우치형 중심의 간편 섭취 단백질 쉐이크를 비교할 때 단백질, 당류, 칼로리, 식이섬유를 어떤 순서로 봐야 하는지 정리합니다.",
    question: "단백질 쉐이크는 무엇부터 비교해야 선택이 빨라질까?",
    related: ["쉐이크", "단백질", "당류", "식이섬유"],
    badge: "쉐이크",
  },
  {
    title: "식사대용 단백질 쉐이크",
    href: "/guides/product-selection-comparison/meal-replacement-protein-shake-guide",
    description: "식사대용 쉐이크를 고를 때 포만감, 칼로리, 식이섬유, 단백질을 어떤 순서로 봐야 하는지 정리합니다.",
    question: "식사대용 쉐이크는 운동용 쉐이크와 무엇이 다를까?",
    related: ["식사대용", "포만감", "칼로리"],
    badge: "쉐이크",
  },
  {
    title: "단백질 음료 vs 단백질 쉐이크",
    href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake",
    description: "RTD 단백질 음료와 파우치형 단백질 쉐이크를 용도와 성분 기준으로 나눠서 비교합니다.",
    question: "운동 후에는 음료가 맞을까, 쉐이크가 맞을까?",
    related: ["RTD", "쉐이크", "비교"],
    badge: "비교",
  },
  {
    title: "저당 단백질 쉐이크",
    href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide",
    description: "당류가 낮은 단백질 쉐이크를 고를 때 단백질과 칼로리, 식이섬유까지 함께 보는 기준을 정리합니다.",
    question: "저당 쉐이크는 당류만 낮으면 충분할까?",
    related: ["저당", "당류", "쉐이크"],
    badge: "쉐이크",
  },
  {
    title: "운동 후 단백질 쉐이크",
    href: "/guides/product-selection-comparison/post-workout-protein-shake-guide",
    description: "운동 후 보충용 쉐이크를 고를 때 단백질 함량과 단백질 밀도를 어떻게 봐야 하는지 정리합니다.",
    question: "운동 후 쉐이크는 단백질만 높으면 괜찮을까?",
    related: ["운동 후", "고단백", "밀도"],
    badge: "쉐이크",
  },
  {
    title: "단백질 바 선택 가이드",
    href: "/guides/product-selection-comparison/protein-bar-guide",
    description: "단백질 바를 간식, 식사 보완, 운동 후 보충용으로 나눠 보는 기준을 정리합니다.",
    question: "단백질 바는 간식과 식사 보완 중 어디에 더 가까울까?",
    related: ["당류", "칼로리", "단백질 총량"],
    badge: "입문",
  },
  {
    title: "식사대용 단백질 바 기준",
    href: "/guides/product-selection-comparison/meal-replacement-protein-bar-guide",
    description: "식사대용 바는 포만감, 총열량, 단백질을 어떤 순서로 읽어야 하는지 정리합니다.",
    question: "식사대용 단백질 바는 간식형 바와 무엇이 다를까?",
    related: ["식사대용", "포만감", "총열량"],
    badge: "바",
  },
  {
    title: "단백질 요거트 추천 기준",
    href: "/guides/product-selection-comparison/protein-yogurt-guide",
    description: "그릭, 드링킹, 대용량 요거트를 어떤 기준으로 나눠 보고 비교해야 하는지 정리합니다.",
    question: "단백질 요거트는 어떤 유형부터 나눠 봐야 할까?",
    related: ["그릭", "드링킹", "대용량", "단백질 함량"],
    badge: "요거트",
  },
  {
    title: "그릭요거트 추천 기준",
    href: "/guides/product-selection-comparison/greek-yogurt-guide",
    description: "그릭요거트 안에서 단백질 밀도, 당류, 용량을 어떤 순서로 읽어야 하는지 정리합니다.",
    question: "그릭요거트는 꾸덕함만 보고 고르면 될까?",
    related: ["그릭요거트", "단백질 밀도", "당류", "용량"],
    badge: "요거트",
  },
  {
    title: "무가당 그릭요거트 추천 기준",
    href: "/guides/product-selection-comparison/unsweetened-greek-yogurt-guide",
    description: "무가당 그릭요거트를 고를 때 당류, 단백질 밀도, 대용량 여부를 함께 읽는 방법을 정리합니다.",
    question: "무가당 그릭요거트는 제품명만 보면 충분할까?",
    related: ["무가당", "플레인", "100g 기준"],
    badge: "요거트",
  },
  {
    title: "저당 단백질 요거트 기준",
    href: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
    description: "저당 단백질 요거트를 비교할 때 당류만이 아니라 단백질까지 함께 보는 기준을 정리합니다.",
    question: "저당 요거트는 당류만 낮으면 괜찮을까?",
    related: ["저당 요거트", "당류 기준", "단백질 함량"],
    badge: "요거트",
  },
  {
    title: "드링킹 요거트 비교 가이드",
    href: "/guides/product-selection-comparison/drinking-yogurt-guide",
    description: "마시는 요거트를 비교할 때 용량 대비 단백질과 당류를 읽는 순서를 정리합니다.",
    question: "드링킹 요거트는 휴대성만 보고 고르면 될까?",
    related: ["드링킹", "용량", "당류", "단백질"],
    badge: "요거트",
  },
  {
    title: "단백질 요거트 순위 보는 법",
    href: "/guides/product-selection-comparison/protein-yogurt-ranking-guide",
    description: "요거트 랭킹에서 단백질 밀도, 다이어트, 퍼포먼스 점수를 어떻게 읽는지 정리합니다.",
    question: "요거트 랭킹 1위는 어떤 기준으로 정해질까?",
    related: ["랭킹", "단백질 밀도", "다이어트", "퍼포먼스"],
    badge: "요거트",
  },
  {
    title: "영양성분 비교 보는 법",
    href: "/guides/product-selection-comparison/nutrition-comparison",
    description: "단백질, 당류, 칼로리, 지방을 어떤 조합으로 읽어야 비교 실수가 줄어드는지 정리합니다.",
    question: "영양성분은 어떤 조합으로 읽어야 덜 헷갈릴까?",
    related: ["비교 순서", "숫자 해석", "목적별 판단"],
    badge: "실전",
  },
  {
    title: "영양성분 기준 읽기",
    href: "/guides/product-selection-comparison/nutrition-criteria",
    description: "좋은 제품을 고를 때 참고하는 단백질, 당류, 칼로리, 밀도 기준을 정리합니다.",
    question: "최소 기준은 어디부터 잡는 게 좋을까?",
    related: ["단백질 기준", "당류 기준", "칼로리 기준"],
    badge: "기준",
  },
  {
    title: "추천 리스트 보는 법",
    href: "/guides/product-selection-comparison/recommendation-lists",
    description: "추천, 큐레이션, picks, 비교 리스트를 어떤 상황에서 구분해서 봐야 하는지 정리합니다.",
    question: "추천 페이지와 큐레이션은 언제 다르게 봐야 할까?",
    related: ["추천", "큐레이션", "비교 흐름"],
    badge: "탐색",
  },
  {
    title: "랭킹 & 점수 보는 법",
    href: "/guides/product-selection-comparison/ranking-content",
    description: "랭킹, 순위, 점수를 어떤 기준으로 읽어야 하는지 이해하기 쉽게 정리합니다.",
    question: "순위와 점수는 각각 무엇을 뜻할까?",
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
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK B</span>
            <span className="text-xs text-[#8b8b8b]">제품 비교 흐름을 이해하는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[var(--foreground)] md:text-[30px]">제품 선택 & 비교</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료, 단백질 바, 단백질 요거트는 숫자를 읽는 순서가 중요합니다.
              <br />
              Track B에서는 영양성분 비교, 추천 리스트, 랭킹 해석, 선택 기준까지 제품 탐색 흐름에 맞춰 정리합니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">질문과 상황을 먼저 보고 필요한 주제로 이동하세요.</p>
            </div>
            <div className="hidden rounded-full border border-[#d9e7dc] bg-[#eff7f1] px-3 py-1.5 text-xs font-medium text-[#24543d] md:block">
              추천: 영양성분 비교 보는 법
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
                      <span className="rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">LIVE</span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-[#1f5138] transition-colors group-hover:text-[var(--accent)]">{topic.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[var(--foreground-muted)]">{topic.description}</p>

                    <div className="mt-4 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2.5">
                      <p className="text-[11px] font-semibold text-[#1f5138]">대표 질문</p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]">{topic.question}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">{topic.related[0]}</span>
                    <span className="text-xs font-semibold text-[#2f5d46] transition-colors group-hover:text-[#1f4834]">주제 보기</span>
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
