import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "추천 리스트 활용법 | ProteinLab",
  description:
    "추천, 큐레이션, picks, 비교 페이지가 각각 어떤 상황에서 유용한지 정리합니다.",
};

const items = [
  ["추천", "목적 기반으로 몇 개의 후보를 빠르게 좁히고 싶을 때"],
  ["큐레이션", "상황이나 성분 조건에 맞는 제품군을 넓게 보고 싶을 때"],
  ["Picks", "특정 기준으로 먼저 정리된 리스트에서 빠르게 훑어볼 때"],
  ["비교 페이지", "여러 제품을 숫자로 직접 비교하고 싶을 때"],
];

const flow = [
  {
    title: "먼저 좁히기",
    body: "러닝, 편의점, 저당처럼 상황이 이미 정해져 있다면 큐레이션부터 보는 편이 빠릅니다.",
  },
  {
    title: "후보 고르기",
    body: "후보를 몇 개로 줄이고 싶다면 추천 결과를 보는 편이 부담이 적습니다.",
  },
  {
    title: "직접 비교하기",
    body: "마지막 판단은 비교 페이지에서 숫자를 나란히 놓고 보는 방식이 가장 명확합니다.",
  },
];

export default function RecommendationListsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 · 비교</Link>
            <span>/</span>
            <span>추천 리스트 활용법</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            추천과 큐레이션은 역할이 다릅니다
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별로 바로 찾는 법</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {items.map((item) => (
                <li key={item[0]} className="rounded-xl border border-[#eef1f3] bg-[#fbfcfd] px-4 py-4">
                  <span className="font-semibold text-[var(--foreground)]">{item[0]}</span>
                  <span className="ml-2">{item[1]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">제품 탐색 흐름 예시</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {flow.map((item) => (
                <article key={item.title} className="rounded-xl border border-[#e8eef3] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#3f556d]">{item.title}</h3>
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
