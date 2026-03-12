import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 후 단백질 | ProteinLab",
  description:
    "운동 후 회복에 필요한 단백질 타이밍과 제품 선택 기준을 회복 관점에서 정리합니다.",
};

const recoveryRows = [
  ["운동 직후", "20~30g", "가볍게 회복을 시작하는 구간"],
  ["1~2시간 내 식사", "탄수화물 + 단백질", "회복과 다음 식사 연결"],
  ["하루 총량 보완", "나머지 식사 분배", "운동 후 한 번으로 끝내지 않기"],
];

export default function PostWorkoutProteinPage() {
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
            <span>운동 후 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 후 단백질은 회복의 시작점입니다
          </h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">회복 흐름</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">구간</th>
                  <th className="px-3 py-3 font-semibold">권장</th>
                  <th className="px-3 py-3 font-semibold">의미</th>
                </tr>
              </thead>
              <tbody>
                {recoveryRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
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

