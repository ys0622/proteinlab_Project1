import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "노년 단백질 전략 | ProteinLab",
  description:
    "노년층이 부담을 줄이면서 단백질을 꾸준히 섭취하기 위한 기준과 제품 선택 포인트를 다룹니다.",
};

export default function SeniorProteinStrategyPage() {
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
            <span>노년 단백질 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            노년기에는 꾸준히 먹을 수 있는 방식이 더 중요합니다
          </h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>• 한 번에 많이 먹기보다 부담이 적은 식사와 간식으로 나눠 섭취하는 편이 실천하기 쉽습니다.</li>
            <li>• 씹기와 소화가 편한 음료형, 요거트형 보충이 현실적인 대안이 될 수 있습니다.</li>
            <li>• 건강 관리 목적이라면 당류와 칼로리도 같이 보되, 지속 가능한 섭취 습관이 우선입니다.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

