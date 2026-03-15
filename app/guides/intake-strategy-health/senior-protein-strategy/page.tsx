import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "시니어 단백질 전략 | ProteinLab",
  description:
    "시니어가 부담을 줄이면서 단백질을 꾸준히 챙기는 방법과 제품 선택 기준을 정리한 가이드입니다.",
};

const seniorTips = [
  "한 번에 많이 먹기보다 부담이 적은 식사와 간식으로 나누는 쪽이 실천하기 쉽습니다.",
  "요거트나 액상형처럼 부드러운 형태는 씹는 부담과 위장 부담이 적어 사용하기 좋습니다.",
  "건강 관리 목적이라면 당류와 칼로리도 같이 보고, 꾸준히 유지할 수 있는 루틴이 우선입니다.",
];

const seniorRows = [
  ["아침", "부드러운 형태 우선", "첫 부담이 적고 단백질을 챙기기 쉬운 시작점이 됩니다."],
  ["오후 간식", "소량 보충", "하루 총량을 비우기 쉬운 구간을 메우기에 좋습니다."],
  ["저녁", "과하지 않게 마무리", "식사량이 적다면 저녁에 보충 지점을 만들면 안정적입니다."],
];

export default function SeniorProteinStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략 & 건강</Link>
            <span>/</span>
            <span>시니어 단백질 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            시니어기에는
            <br />
            꾸준히 먹을 수 있는 방식이 더 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            나이가 들수록 한 번에 많은 양보다 부담 없이 자주 챙기는 방식이 더 실전적입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <div className="rounded-2xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">SENIOR ROUTINE</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              아침, 간식, 저녁 구간별로 나눠 부담 없이 분산하는 방식이 가장 실전적입니다.
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            {seniorTips.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">구간</th>
                  <th className="px-3 py-3 font-semibold">전략</th>
                  <th className="px-3 py-3 font-semibold">실전 해석</th>
                </tr>
              </thead>
              <tbody>
                {seniorRows.map((row) => (
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
        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">SENIOR NOTE</p>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            시니어 루틴에서는 수치보다 부담 없이 반복할 수 있는 방식이 더 중요합니다. 그래서 맛과 위장 부담도 함께 확인해야 합니다.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
