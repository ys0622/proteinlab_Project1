import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "노년 단백질 전략 | ProteinLab",
  description:
    "노년층이 부담을 줄이면서 단백질을 꾸준히 챙기는 방법과 제품 선택 기준을 정리했습니다.",
};

const seniorTips = [
  "한 번에 많이 먹기보다 부담이 적은 식사와 간식으로 나누는 편이 실천하기 쉽습니다.",
  "음료형이나 부드러운 보충제는 씹기 부담이 낮아 활용하기 좋습니다.",
  "건강 관리 목적이라면 당류와 칼로리도 함께 보고, 지속 가능한 섭취 패턴을 우선합니다.",
];

export default function SeniorProteinStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략 · 건강
            </Link>
            <span>/</span>
            <span>노년 단백질 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            노년기에는
            <br />
            꾸준히 먹을 수 있는 방식이 더 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            나이가 들수록 단백질 흡수 효율이 낮아집니다. 한 번에 많이 먹는 것보다 부담 없이 자주 먹는 방식이 더 효과적입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            {seniorTips.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/guides/intake-strategy-health/muscle-maintenance-protein"
              className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
            >
              근육 유지 전략 보기 →
            </Link>
            <Link
              href="/recommend"
              className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
            >
              내 목적에 맞는 제품 찾기 →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
