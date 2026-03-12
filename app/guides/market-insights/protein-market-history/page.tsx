import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 시장 히스토리 | ProteinLab",
  description: "국내 단백질 시장이 어떤 흐름으로 성장했는지 시간축 기준으로 정리했습니다.",
};

const historyRows = [
  ["초기", "보충제 중심", "운동 목적 시장이 메인"],
  ["확장기", "RTD 성장", "편의성과 유통 확장으로 대중성이 커짐"],
  ["현재", "세분화", "저당, 워터형, 식물성 등 목적별 제품으로 분화"],
];

const turningPoints = [
  {
    title: "운동 보충제 시장에서 대중 시장으로",
    body: "초기에는 운동 목적 보충제 수요가 중심이었지만, RTD 성장 이후에는 일반 소비자도 쉽게 진입하는 구조가 됐습니다.",
  },
  {
    title: "편의성의 힘",
    body: "파우더보다 RTD가 빠르게 커진 배경에는 바로 마실 수 있는 사용성이 있습니다.",
  },
  {
    title: "성분 키워드의 세분화",
    body: "지금은 단순 고단백보다 저당, 식물성, 워터형처럼 목적 기준 키워드가 더 중요해졌습니다.",
  },
];

export default function ProteinMarketHistoryPage() {
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
            <span>단백질 시장 히스토리</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            국내 단백질 시장은 어떻게 커졌을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            보충제 중심 시장에서 RTD 대중 시장으로,
            <br />
            다시 목적별 세분화로 이어진 흐름을 읽습니다.
          </p>
        </div>
      </section>
      <main className="guide-article-page guide-article-page--track-e mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">시장 변화 3단계</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">단계</th>
                    <th className="px-3 py-3 font-semibold">주요 변화</th>
                    <th className="px-3 py-3 font-semibold">의미</th>
                  </tr>
                </thead>
                <tbody>
                  {historyRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">이 흐름에서 읽어야 할 핵심 포인트</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {turningPoints.map((item) => (
                <article key={item.title} className="rounded-xl border border-[#efe8f4] bg-[#fbfafc] p-4">
                  <h3 className="text-sm font-semibold text-[#5a4271]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
