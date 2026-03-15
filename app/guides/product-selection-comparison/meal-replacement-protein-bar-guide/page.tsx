import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "식사대용 단백질 바 기준 | 포만감·칼로리·단백질 비교 | ProteinLab",
  description:
    "식사대용 단백질 바를 고를 때 포만감, 칼로리, 단백질 함량, 당류를 어떤 순서로 확인해야 하는지 ProteinLab 기준으로 정리합니다.",
};

const principles = [
  {
    title: "포만감이 먼저",
    body: "식사대용 바는 간식형과 달리 칼로리와 구성감이 어느 정도 있어야 합니다. 너무 가벼우면 식사 보완용으로는 부족합니다.",
  },
  {
    title: "단백질은 보완 기준",
    body: "식사대용이라도 단백질이 낮으면 의미가 약해집니다. 포만감과 함께 최소 단백질 기준을 확인해야 합니다.",
  },
  {
    title: "당류는 과하지 않게",
    body: "식사대용이라고 해서 당류가 높아도 되는 것은 아닙니다. 포만감과 당류의 균형이 중요합니다.",
  },
];

const matrix = [
  ["칼로리", "중간 이상", "식사 보완용인지 가늠하는 첫 기준"],
  ["단백질", "12g 이상 우선", "보완용으로 의미가 있는지 확인"],
  ["당류", "높지 않은지 체크", "식사대용형이라도 과한 당류는 피하기"],
  ["식이섬유/포만감", "부가 체크", "장시간 허기를 줄이는 데 참고"],
];

export default function MealReplacementProteinBarGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>식사대용 단백질 바 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            식사대용 단백질 바는 간식형과 기준이 다릅니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            식사대용 단백질 바는 단백질만 높다고 끝이 아닙니다.
            <br />
            포만감, 칼로리, 단백질, 당류를 함께 봐야 실제로 한 끼를 보완할 수 있는지 판단할 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용 바 기준 3가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {principles.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체크 매트릭스</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">권장 관점</th>
                    <th className="px-3 py-3 font-semibold">메모</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
