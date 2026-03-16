import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "식사대용 단백질 전략 | ProteinLab",
  description:
    "단백질 보충 제품이 언제 식사대용에 가까워지는지, 보충용과 어떤 기준으로 구분해야 하는지 정리합니다.",
};

const replacementRows = [
  ["가벼운 RTD", "보충형에 가깝다", "단백질이 충분해도 칼로리와 포만감이 식사를 대체하기엔 부족한 경우가 많습니다."],
  ["바 형태 고단백", "상황별 식사 보완", "칼로리와 포만감이 어느 정도 있어 바쁜 일정에서 보완형으로 쓰기 쉽습니다."],
  ["바 + 음료 조합", "간편 식사 보완", "짧은 점심이나 이동 중 식사 보완이 필요할 때 실전성이 높습니다."],
];

const keyPoints = [
  {
    title: "포만감",
    body: "식사대용은 단백질만 높다고 되는 것이 아닙니다. 다음 끼니까지 버틸 수 있는 포만감이 중요합니다.",
  },
  {
    title: "칼로리",
    body: "칼로리가 너무 낮으면 보충형에 가깝고, 너무 높으면 목적에 따라 과한 선택이 될 수 있습니다.",
  },
  {
    title: "지속 가능성",
    body: "매일 반복해야 하는 루틴이라면 맛, 질감, 위장 부담까지 함께 봐야 실전에서 오래 갑니다.",
  },
];

const useCases = [
  "출근 전 아침을 거르기 쉬운 날",
  "오후 업무 중 간편하게 한 끼를 보완해야 하는 날",
  "운동 후 바로 식사하기 어렵지만 공복이 오래 가면 안 될 때",
];

export default function MealReplacementStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략 & 건강
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
            단백질 보충 제품이
            <br />
            언제 식사대용이 되는지 구분해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            모든 단백질 음료가 식사대용은 아닙니다. 포만감과 칼로리, 다음 끼니까지의 간격을 먼저 봐야 기준이 분명해집니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">제품 유형별 해석</h2>
            <div className="mt-4 rounded-2xl border border-[#dce8df] bg-white px-4 py-4">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">MEAL-REPLACEMENT CHECK</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 함량이 많다고 식사대용이 되지는 않습니다. 포만감, 칼로리, 다음 끼니까지 거리까지 같이 봐야 합니다.
              </p>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">유형</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                    <th className="px-3 py-3 font-semibold">실전 사인</th>
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용으로 볼 때 중요한 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {keyPoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이럴 때는 실전적으로 유입됩니다</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {useCases.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              식사대용은 한 번의 이벤트가 아니라 반복 가능한 루틴입니다. 그래서 위장 부담과 맛 지속성까지 함께 봐야 합니다.
            </blockquote>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
