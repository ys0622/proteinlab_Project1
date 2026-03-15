import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "영양성분 비교 보는 법 | ProteinLab",
  description:
    "단백질, 당류, 칼로리, 지방을 어떤 순서로 함께 비교해야 하는지 목적별 기준으로 정리합니다.",
};

const rows = [
  ["운동 후 보충", "단백질 함량 → 단백질 밀도 → 당류", "보충 효율이 우선이라 단백질과 밀도를 먼저 보는 편이 유리합니다."],
  ["체중 관리", "당류 → 칼로리 → 단백질 함량", "당류와 총열량을 먼저 좁혀야 목적에 맞는 제품이 빠르게 남습니다."],
  ["식사 보완", "칼로리 → 단백질 함량 → 당류", "총열량과 포만감을 먼저 보고 단백질을 보완하는 흐름이 자연스럽습니다."],
];

const compareTips = [
  {
    title: "비슷한 칼로리끼리 비교하기",
    body: "칼로리 구간을 먼저 맞춰두면 단백질 밀도와 당류 차이가 훨씬 잘 보입니다.",
  },
  {
    title: "단백질 g만 따로 보지 않기",
    body: "단백질이 높아도 당류와 칼로리가 함께 높으면 실제 용도는 달라질 수 있습니다.",
  },
  {
    title: "용도부터 정하고 성분 읽기",
    body: "운동 후용인지, 간식형인지, 식사 보완형인지 먼저 정하면 숫자 해석이 훨씬 쉬워집니다.",
  },
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
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 후 보충인지, 체중 관리인지, 식사 보완인지에 따라 먼저 봐야 할 숫자가 달라집니다.
            <br />
            성분표는 단백질 하나만 보는 것이 아니라 조합으로 읽어야 비교 실수가 줄어듭니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
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
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">비교 실수를 줄이는 3가지 팁</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {compareTips.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab 비교 화면에서는 단백질 함량뿐 아니라 당류, 칼로리, 단백질 밀도를 함께 볼 수 있습니다. 비교 순서를 정해두면 판단 속도가 훨씬 빨라집니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/compare" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                비교 페이지 보기
              </Link>
              <Link href="/guides/product-selection-comparison/nutrition-criteria" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                영양성분 기준 보기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
