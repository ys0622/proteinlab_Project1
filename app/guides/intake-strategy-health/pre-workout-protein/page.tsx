import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 전 단백질 | ProteinLab",
  description:
    "운동 전 단백질이 필요한 상황과 소화 부담을 줄이는 선택 기준을 간단명료하게 정리했습니다.",
};

const beforeWorkoutRows = [
  ["직전 식사를 한 날", "추가 단백질은 선택", "소화 부담보다 운동 집중이 우선일 수 있음"],
  ["공복 운동", "가벼운 보완 가능", "부담 적은 RTD나 요거트형 간식이 현실적"],
  ["긴 운동 세션", "탄수화물 먼저", "운동 전에는 단백질보다 에너지 확보가 우선"],
];

export default function PreWorkoutProteinPage() {
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
            <span>운동 전 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 전 단백질은
            <br />
            무조건이 아니라 상황 판단이 먼저입니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 전에는 단백질 그 자체보다도 소화 부담과 직전 식사 여부를 먼저 봐야 합니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">운동 전 판단 기준</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">상황</th>
                  <th className="px-3 py-3 font-semibold">추천</th>
                  <th className="px-3 py-3 font-semibold">이유</th>
                </tr>
              </thead>
              <tbody>
                {beforeWorkoutRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
