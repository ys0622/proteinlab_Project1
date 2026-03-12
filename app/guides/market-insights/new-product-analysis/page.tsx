import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "신제품 분석 | ProteinLab",
  description: "새로 나온 단백질 제품을 어떤 기준으로 읽어야 하는지 정리했습니다.",
};

const checkRows = [
  ["단백질 함량", "기존 대표 제품과 비교", "실제 강점인지 확인"],
  ["당류 · 칼로리", "숫자와 목적의 일치 여부", "체중 관리용인지 식사 보완형인지 해석"],
  ["포지셔닝", "저당, 워터형, 식물성 등", "완전히 새로운지, 기존 흐름의 연장인지 구분"],
];

export default function NewProductAnalysisPage() {
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
            <span>신제품 분석</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            신제품이 나왔을 때 무엇부터 봐야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            신제품은 단순 출시 소식보다 기존 제품 대비 단백질, 당류, 칼로리, 포지셔닝이 어떻게 달라졌는지 먼저 읽어야 합니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">신제품 체크 기준</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">기준</th>
                  <th className="px-3 py-3 font-semibold">무엇을 볼까</th>
                  <th className="px-3 py-3 font-semibold">읽는 이유</th>
                </tr>
              </thead>
              <tbody>
                {checkRows.map((row) => (
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
