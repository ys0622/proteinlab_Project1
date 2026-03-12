import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 시장 히스토리 | ProteinLab",
  description: "국내 단백질 시장이 어떤 흐름으로 성장했는지 시간축 기준으로 정리했습니다.",
};

const historyRows = [
  ["초기", "보충제 중심", "운동 목적 제품이 시장 중심"],
  ["확장기", "RTD 성장", "편의성과 대중성이 커지며 음료 시장 확대"],
  ["현재", "세분화", "저당, 워터형, 식물성, 고단백 등 목적별 분화"],
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
          <div className="mt-3"><span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span></div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">국내 단백질 시장은 어떻게 커졌을까?</h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <p className="text-sm leading-6 text-[var(--foreground-muted)]">초기 보충제 중심 시장에서 RTD와 대중형 브랜드로 확장되며 지금의 단백질 시장이 형성됐습니다.</p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead><tr className="border-b border-[#e8e6e3]"><th className="px-3 py-3 font-semibold">구간</th><th className="px-3 py-3 font-semibold">핵심 변화</th><th className="px-3 py-3 font-semibold">의미</th></tr></thead>
              <tbody>{historyRows.map((row)=><tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">{row.map((cell)=><td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
