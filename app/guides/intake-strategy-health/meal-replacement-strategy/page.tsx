import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "식사대용 전략 | ProteinLab",
  description:
    "단백질 음료가 언제 식사대용이 될 수 있는지, 보충용 제품과 어떤 기준으로 구분해야 하는지 정리했습니다.",
};

const replacementRows = [
  ["가벼운 RTD", "보충용에 가까움", "단백질은 충분해도 칼로리와 포만감이 식사 수준은 아닌 경우가 많음"],
  ["밀크형 고단백", "상황에 따라 식사 보완", "칼로리와 포만감이 더 높아 식사 보완용으로 쓰기 쉬움"],
  ["바 + 음료 조합", "간편 식사 보완", "바쁜 일정에서 한 끼를 단순화할 때 활용 가능"],
];

const keyPoints = [
  {
    title: "포만감",
    body: "식사대용은 단백질만 높다고 되는 것이 아닙니다. 실제로 한 끼를 대신할 만큼 포만감이 유지되는지가 중요합니다.",
  },
  {
    title: "칼로리",
    body: "칼로리가 너무 낮으면 보충용에 가깝고, 너무 높으면 목적에 따라 과해질 수 있습니다. 상황에 맞는 범위를 봐야 합니다.",
  },
  {
    title: "지속 가능성",
    body: "매일 반복할 수 있는 맛과 부담 없는 위장감이 중요합니다. 식사대용은 한두 번의 이벤트가 아니라 습관이 되기 쉽기 때문입니다.",
  },
];

const useCases = [
  "출근 전 식사를 거르기 쉬운 날",
  "오후 업무 중 간편하게 한 끼를 보완해야 할 때",
  "운동 후 바로 식사하기 어렵지만 허기를 오래 두고 싶지 않을 때",
];

export default function MealReplacementStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략 · 건강
            </Link>
            <span>/</span>
            <span>식사대용 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료가
            <br />
            언제 식사대용이 되는지부터 구분해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            모든 단백질 음료가 식사대용은 아닙니다.
            <br />
            포만감과 칼로리, 실제로 한 끼를 대신할 수 있는지를 먼저 구분해야 선택 기준이 선명해집니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">제품 유형별 해석</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">유형</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                    <th className="px-3 py-3 font-semibold">포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {replacementRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용으로 볼 때 중요한 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {keyPoints.map((item) => (
                <article key={item.title} className="rounded-xl border border-[#e9ece8] bg-[#fbfcfb] p-4">
                  <h3 className="text-sm font-semibold text-[#6b563f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이럴 때 실전적으로 쓸 수 있습니다</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {useCases.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#eef1f3] bg-[#fbfcfd] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7a5230]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/guides/intake-strategy-health/weight-management-protein"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#6b563f] transition-colors hover:bg-[#f8f4ef]"
              >
                체중 관리와 단백질 보기
              </Link>
              <Link
                href="/curation/convenience"
                className="inline-flex items-center justify-center rounded-lg border border-[#7a5230] bg-[#7a5230] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#644226]"
              >
                편의점 큐레이션 보기
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
