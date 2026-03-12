import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 RTD 시장 | ProteinLab",
  description: "단백질 RTD 시장의 구조와 브랜드 경쟁 포인트를 정리했습니다.",
};

const rtdRows = [
  ["편의성", "즉시 섭취 가능", "운동 직후, 출근길, 간식 상황에 강함"],
  ["유통", "편의점·대형마트 확장", "반복 구매 진입 장벽이 낮음"],
  ["세분화", "워터형 · 밀크형 · 식물성", "같은 RTD 안에서도 목적별 경쟁이 심화"],
];

export default function ProteinRTDMarketPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights">시장 인사이트</Link>
            <span>/</span>
            <span>단백질 RTD 시장</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            RTD 단백질 시장은 왜 이렇게 커졌을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            파우더보다 빠르게 커진 이유는 편의성, 유통, 목적별 세분화에 있습니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">RTD 시장을 키운 3가지</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">요인</th>
                    <th className="px-3 py-3 font-semibold">주요 변화</th>
                    <th className="px-3 py-3 font-semibold">시장 의미</th>
                  </tr>
                </thead>
                <tbody>
                  {rtdRows.map((row) => (
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
          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">지금 RTD를 볼 때 중요한 기준</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>운동 보충용인지 식사 보완형인지 먼저 구분해야 합니다.</li>
              <li>같은 RTD라도 워터형과 밀크형은 포만감과 활용 상황이 다릅니다.</li>
              <li>브랜드 메시지가 강해 보여도 실제 숫자가 맞는지 확인해야 합니다.</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
