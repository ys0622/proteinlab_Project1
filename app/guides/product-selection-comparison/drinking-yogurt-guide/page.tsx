import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "드링킹 단백질 요거트 비교 포인트 | ProteinLab",
  description:
    "드링킹 단백질 요거트를 비교할 때 용량, 단백질 함량, 당류, 휴대성을 어떻게 함께 봐야 하는지 정리합니다.",
};

const rows = [
  ["용량", "190mL, 210mL처럼 비슷해 보여도 총 단백질과 칼로리가 달라질 수 있습니다."],
  ["단백질 효율", "마시기 편해도 단백질이 낮으면 일반 드링킹 요거트와 차이가 줄어듭니다."],
  ["당류", "맛 제품은 당류가 높아질 수 있어 저당 목적이라면 따로 좁혀서 봐야 합니다."],
];

export default function DrinkingYogurtGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>드링킹 요거트 비교 포인트</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">TRACK B</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            드링킹 요거트는 휴대성보다 단백질 효율을 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            드링킹 요거트는 편하게 마시기 좋지만, 제품마다 단백질 함량과 당류 차이가 큽니다.
            <br />
            용량이 비슷해 보여도 영양 구성이 꽤 다를 수 있어 용량, 단백질, 당류를 같이 봐야 합니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">드링킹 요거트 비교 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {rows.map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/curation/yogurt-drinking" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                드링킹 요거트 추천 보기
              </Link>
              <Link href="/yogurt?curation=yogurt-drinking" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                드링킹 요거트만 비교하기
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
