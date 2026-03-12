import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "영양성분 비교 읽는 법 | ProteinLab",
  description:
    "단백질, 당류, 칼로리, 지방을 어떤 순서로 함께 봐야 하는지 비교 중심으로 정리합니다.",
};

const rows = [
  ["회복용", "단백질 함량 → 단백질 밀도 → 당류", "운동 후라면 과한 칼로리보다 회복 효율이 중요합니다."],
  ["저당 간식", "당류 → 단백질 함량 → 칼로리", "당류가 낮더라도 단백질이 너무 낮으면 목적과 어긋날 수 있습니다."],
  ["식사 보완", "칼로리 → 단백질 함량 → 당류", "포만감과 총열량을 먼저 보고 단백질을 보완하는 관점이 필요합니다."],
];

export default function NutritionComparisonPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 · 비교</Link>
            <span>/</span>
            <span>영양성분 비교</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            성분표는 숫자 하나보다 조합이 더 중요합니다
          </h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">상황별로 보는 순서가 달라집니다</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">목적</th>
                  <th className="px-3 py-3 font-semibold">우선 비교 항목</th>
                  <th className="px-3 py-3 font-semibold">이유</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
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
          <blockquote className="mt-5 rounded-xl border border-[#eef1f3] bg-[#fbfcfd] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
            ProteinLab 비교 화면에서는 단백질 함량뿐 아니라 당류, 칼로리, 단백질 밀도를 같이 볼 수 있습니다. 비교는 항상 숫자의 조합으로 판단하는 것이 안전합니다.
          </blockquote>
        </section>
      </main>
      <Footer />
    </div>
  );
}

