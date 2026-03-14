import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 바 선택 가이드 | ProteinLab",
  description:
    "단백질 바를 간식형과 식사 보완형으로 나누고 당류, 칼로리, 단백질 함량을 함께 보는 기준을 정리합니다.",
};

const barRules = [
  {
    title: "간식형 바",
    body: "가볍게 먹는 용도라면 단백질 10~15g 전후, 당류와 칼로리가 지나치게 높지 않은지 먼저 봅니다.",
  },
  {
    title: "식사 보완형 바",
    body: "포만감과 총열량이 더 중요해집니다. 단백질만 보지 말고 칼로리와 지방도 함께 확인해야 합니다.",
  },
  {
    title: "운동 후 보충형 바",
    body: "단백질 함량이 높아도 식감이나 당류 때문에 실제 사용감이 달라질 수 있어 성분표와 상황을 같이 봐야 합니다.",
  },
];

const pitfalls = [
  "단백질 함량만 보고 고르면 당류와 칼로리가 예상보다 높을 수 있습니다.",
  "소포장 제품은 전체 기준 영양정보인지 1개 기준인지 다시 확인하는 것이 중요합니다.",
  "견과류 제품은 지방이 높으면 식사 대체형에 더 가까워질 수 있어 총열량을 같이 봐야 합니다.",
];

export default function ProteinBarGuidePage() {
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
            <span>단백질 바 선택 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 바는 간식형인지 식사 보완형인지부터 구분해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            간식으로 먹을지, 식사를 보완할지에 따라 봐야 할 숫자가 달라집니다.
            <br />
            단백질 수치 하나만 보고 고르면 실제 용도와 맞지 않을 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 구분해야 하는 3가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {barRules.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 바를 볼 때 자주 놓치는 포인트</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {pitfalls.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/product-selection-comparison/nutrition-criteria" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                영양성분 기준 보기
              </Link>
              <Link href="/bars" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                단백질 바 비교하기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
