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
      </main>
      <Footer />
    </div>
  );
}

