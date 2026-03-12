import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 섭취 타이밍 | ProteinLab",
  description:
    "하루 중 단백질을 언제 먹는 것이 좋은지, 운동 전후와 일반 식사 분배 기준을 함께 정리합니다.",
};

const timingRows = [
  ["아침", "20~30g", "공복 시간이 길었다면 단백질을 먼저 채워 하루 총량을 맞추기 쉽습니다."],
  ["운동 전", "소화 부담 적게", "운동 직전에는 양보다 소화 편의성이 중요합니다."],
  ["운동 후", "20~30g", "회복용이면 운동 후 1시간 안쪽에 챙기는 편이 실전에서 쓰기 쉽습니다."],
  ["저녁·취침 전", "20~30g", "하루 총량이 부족하다면 저녁이나 야식이 보완 구간이 될 수 있습니다."],
];

export default function ProteinTimingPage() {
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
            <span>단백질 섭취 타이밍</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질은 얼마나보다 언제 먹는지도 중요합니다
          </h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">하루 기본 타이밍</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">구간</th>
                  <th className="px-3 py-3 font-semibold">권장량</th>
                  <th className="px-3 py-3 font-semibold">포인트</th>
                </tr>
              </thead>
              <tbody>
                {timingRows.map((row) => (
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

