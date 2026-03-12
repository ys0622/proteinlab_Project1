import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "식사대용 전략 | ProteinLab",
  description:
    "식사대용과 보충용의 차이를 구분하고, 어떤 경우에 단백질 음료를 식사대용으로 볼 수 있는지 정리합니다.",
};

export default function MealReplacementStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health">섭취 전략 · 건강</Link>
            <span>/</span>
            <span>식사대용 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료는 언제 식사대용이 될 수 있을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            모든 단백질 음료가 식사대용인 것은 아닙니다.
            <br />
            포만감과 총열량, 영양구성을 함께 봐야 식사 보완용과 보충용을 구분할 수 있습니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>• 식사대용으로 보려면 단백질만이 아니라 총열량과 포만감이 함께 따라와야 합니다.</li>
            <li>• 가벼운 RTD 제품은 대체로 식사대용보다 보충용에 가깝습니다.</li>
            <li>• 바쁜 일정 때문에 식사를 거를 때는 식사대용과 보충용을 구분해서 선택해야 만족도가 높습니다.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
