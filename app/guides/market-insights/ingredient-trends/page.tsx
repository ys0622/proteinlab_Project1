import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "성분 트렌드 | ProteinLab",
  description: "고단백, 저당, 식물성, 워터형 같은 단백질 제품의 핵심 트렌드를 정리했습니다.",
};

const trendCards = [
  {
    title: "저당",
    body: "체중 관리와 일상 간식 수요가 커지면서 단순 고단백보다 저당 조건이 더 중요해졌습니다.",
  },
  {
    title: "워터형",
    body: "가볍게 마시고 싶어 하는 수요가 늘며 워터형 RTD가 하나의 독립 카테고리로 자리잡았습니다.",
  },
  {
    title: "식물성",
    body: "선호 식이와 라이프스타일 차원에서 식물성 단백질 제품이 꾸준히 확장 중입니다.",
  },
];

export default function IngredientTrendsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights">시장 인사이트</Link>
            <span>/</span>
            <span>성분 트렌드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            요즘 단백질 제품은 어떤 성분 키워드로 바뀌고 있을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            고단백 하나만으로는 설명이 부족해졌고, 저당 · 워터형 · 식물성 같은 키워드가 제품 선택 기준을 바꾸고 있습니다.
          </p>
        </div>
      </section>
      <main className="guide-article-page guide-article-page--track-e mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <div className="grid gap-3 md:grid-cols-3">
            {trendCards.map((item) => (
              <article key={item.title} className="rounded-xl border border-[#efe8f4] bg-[#fbfafc] p-4">
                <h2 className="text-sm font-semibold text-[#5a4271]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
