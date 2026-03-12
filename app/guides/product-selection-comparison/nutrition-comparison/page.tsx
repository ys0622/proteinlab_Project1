import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "영양성분 비교 읽는 법 | ProteinLab",
  description:
    "단백질, 당류, 칼로리, 지방을 어떤 순서로 함께 봐야 하는지 비교 중심으로 정리합니다.",
};

const rows = [
  ["운동 후 회복", "단백질 함량 → 단백질 밀도 → 당류", "회복 효율이 우선이라 단백질과 밀도를 먼저 보는 편이 실용적입니다."],
  ["저당 간식", "당류 → 단백질 함량 → 칼로리", "당류를 먼저 좁혀야 목적에 맞는 제품만 남습니다."],
  ["식사 보완", "칼로리 → 단백질 함량 → 당류", "총열량과 포만감을 먼저 보고 단백질을 보완하는 관점이 자연스럽습니다."],
];

const compareTips = [
  {
    title: "비슷한 칼로리끼리 비교하기",
    body: "칼로리 구간이 비슷한 제품끼리 놓고 보면 단백질 밀도와 당류 차이가 더 잘 보입니다.",
  },
  {
    title: "단백질 g만 단독으로 보지 않기",
    body: "단백질이 높아도 당류와 칼로리가 같이 높으면 저당·가벼운 보충 목적과는 어긋날 수 있습니다.",
  },
  {
    title: "용도부터 정하고 성분표 읽기",
    body: "회복용인지, 간식용인지, 식사 보완용인지 먼저 정해두면 숫자 해석이 훨씬 쉬워집니다.",
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
            제품 비교를 빠르게 하려면 단백질만 보는 습관부터 바꿔야 합니다.
            <br />
            상황에 따라 우선순위가 달라지기 때문에, 어떤 목적에서 무엇을 먼저 볼지 정해두는 것이 핵심입니다.
          </p>
        </div>
      </section>

      <main className="guide-article-page guide-article-page--track-b mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
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
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">비교 실수를 줄이는 3가지 팁</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {compareTips.map((item) => (
                <article key={item.title} className="rounded-xl border border-[#e8eef3] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#3f556d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-5 rounded-xl border border-[#eef1f3] bg-[#fbfcfd] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab 비교 화면에서는 단백질 함량뿐 아니라 당류, 칼로리, 단백질 밀도를 함께 볼 수 있습니다. 비교는 항상 숫자의 조합으로 판단하는 것이 안전합니다.
            </blockquote>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link href="/compare" className="inline-flex items-center justify-center rounded-lg border border-[#4a6178] bg-[#4a6178] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3c5065]">
                비교 페이지 보기 →
              </Link>
              <Link href="/guides/product-selection-comparison/nutrition-criteria" className="inline-flex items-center justify-center rounded-lg border border-[#d8e2eb] px-5 py-3 text-sm font-semibold text-[#3f556d] transition-colors hover:bg-[#eef4f9]">
                영양성분 기준 보기 →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
