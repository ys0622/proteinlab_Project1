import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "근육 유지 전략 | ProteinLab",
  description:
    "감량기와 운동 병행 상황에서 근육 유지가 왜 중요한지, 총량과 분배 관점에서 정리합니다.",
};

export default function MuscleMaintenanceProteinPage() {
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
            <span>근육 유지 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            근육 유지는 총량과 분배를 같이 봐야 합니다
          </h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>• 감량기라면 단백질 총량이 먼저이고, 그다음이 운동 후 회복 타이밍입니다.</li>
            <li>• 운동을 하지 않는 날에도 하루 총량이 떨어지지 않게 식사 분배를 유지해야 합니다.</li>
            <li>• 단백질 제품은 식사 결손을 보완하는 도구로 보는 편이 실전에서 더 유용합니다.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

