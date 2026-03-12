import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "글로벌 단백질 시장 | ProteinLab",
  description: "해외 단백질 시장 흐름을 통해 국내 제품과 브랜드 변화를 해석합니다.",
};

const compareRows = [
  ["해외", "기능별 세분화", "보충제, 식사대용, 식물성, 스낵이 더 세밀하게 분리"],
  ["국내", "RTD 중심 확장", "음료 카테고리 성장이 전체 시장 인지도를 끌어올림"],
];

export default function GlobalProteinMarketPage() {
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
            <span>글로벌 단백질 시장</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            글로벌 단백질 시장과 국내는 어떻게 다를까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            해외 흐름을 보면 국내 제품이 왜 RTD 중심으로 성장했고, 어떤 방향으로 더 세분화될지 읽을 수 있습니다.
          </p>
        </div>
      </section>
      <main className="guide-article-page guide-article-page--track-e mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">글로벌 vs 국내 시장</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">구분</th>
                  <th className="px-3 py-3 font-semibold">핵심 특징</th>
                  <th className="px-3 py-3 font-semibold">읽을 포인트</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
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
