import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 전 단백질 | ProteinLab",
  description:
    "운동 전에 단백질을 먹는 것이 어떤 상황에서 유리한지, 소화 부담을 줄이는 방법과 함께 정리합니다.",
};

export default function PreWorkoutProteinPage() {
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
            <span>운동 전 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 전 단백질은 양보다 소화 편의성이 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 전에 단백질을 먹는 것이 항상 필요한 것은 아닙니다.
            <br />
            공복 운동인지, 직전 식사가 있었는지, 소화 부담이 없는지가 더 중요합니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>• 직전 식사를 했다면 추가 단백질보다 소화 편의성을 우선해서 보는 편이 좋습니다.</li>
            <li>• 공복 운동이라면 부담이 적은 요거트, 우유, 가벼운 RTD 제품이 더 현실적입니다.</li>
            <li>• 운동 직전에는 고지방·고섬유질 식품보다 가벼운 탄수화물과 단백질 조합이 더 안정적입니다.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

