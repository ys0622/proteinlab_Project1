import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "추천·큐레이션·비교 페이지 차이 | 어디부터 봐야 할까",
  description:
    "추천, 큐레이션, Picks, 비교 페이지가 각각 어떤 상황에서 유용한지 정리했습니다. 단백질 제품을 고를 때 어디부터 봐야 할지 빠르게 확인해보세요.",
};

const items = [
  ["추천", "내 목적과 조건을 기준으로 후보를 빠르게 줄이고 싶을 때 먼저 보기 좋습니다."],
  ["큐레이션", "저당, 고단백, 다이어트처럼 특정 조건에 맞는 제품군을 묶어서 보고 싶을 때 유용합니다."],
  ["Picks", "가벼운 제품, 입문용 제품처럼 한 번 더 정리된 후보를 빠르게 확인하고 싶을 때 적합합니다."],
  ["비교 페이지", "후보가 2~4개 정도로 줄어든 뒤 숫자를 직접 비교해 최종 결정하고 싶을 때 가장 유용합니다."],
];

const flow = [
  {
    title: "먼저 조건을 좁히기",
    body: "브랜드보다 목적이 먼저라면 큐레이션이나 추천 페이지부터 보는 편이 빠릅니다.",
  },
  {
    title: "후보를 몇 개로 줄이기",
    body: "후보가 몇 개로 줄어들면 추천 결과나 Picks를 보면서 우선순위를 정리하기 좋습니다.",
  },
  {
    title: "마지막에 숫자 비교하기",
    body: "최종 선택 단계에서는 비교 페이지에서 단백질, 당류, 칼로리를 직접 나란히 보는 방식이 가장 명확합니다.",
  },
];

export default function RecommendationListsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>추천·큐레이션·비교 페이지 차이</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            추천, 큐레이션, 비교 페이지 중 어디부터 봐야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 제품을 고를 때는 무조건 비교 페이지부터 들어가기보다, 지금 단계에 맞는 페이지를 먼저 보는 편이 훨씬 빠릅니다.
            <br />
            추천, 큐레이션, Picks, 비교 페이지의 역할 차이를 알면 후보를 더 빨리 좁힐 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별로 먼저 볼 페이지</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {items.map((item) => (
                <li key={item[0]} className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4">
                  <span className="font-semibold text-[var(--foreground)]">{item[0]}</span>
                  <span className="ml-2">{item[1]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">제품 탐색 흐름 예시</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {flow.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
