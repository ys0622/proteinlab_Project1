import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 음료로 한 끼 대체해도 될까 | 식사 보완형 음료 기준 정리 | ProteinLab",
  description:
    "단백질 음료를 식사 대신 마셔도 되는지, 식사 보완형 음료와 단순 보충용 RTD의 차이, 언제 쉐이크로 넘어가야 하는지 정리합니다.",
};

const rows = [
  ["단백질만 높은 RTD", "보충용에 가까움", "칼로리와 포만감이 낮아 한 끼 전체 대체보다는 부족분 보완에 더 가깝습니다."],
  ["균형 영양형 음료", "식사 보완용", "칼로리와 영양소가 더 붙어 있어 음료 중에서는 한 끼 대체에 가장 가까운 편입니다."],
  ["파우치 쉐이크", "식사 대용에 유리", "음료만으로 버티기 어렵다면 결국 쉐이크 쪽으로 넘어가는 편이 더 현실적입니다."],
];

const steps = [
  "한 끼를 완전히 대체하려면 단백질 숫자보다 포만감과 칼로리를 먼저 봐야 합니다.",
  "아침처럼 짧은 대체라면 가벼운 제품도 가능하지만, 점심·저녁 대체는 식사 보완형이 더 잘 맞습니다.",
  "단순 RTD를 식사 대신 매번 마시는 습관은 허기와 간식 섭취로 다시 돌아오는 경우가 많습니다.",
];

const links = [
  { href: "/guides/product-selection-comparison/protein-drink-for-50s", title: "식사 보완형 음료 비교", body: "음료 안에서 한 끼 대체에 가까운 후보를 먼저 좁히고 싶다면 이쪽이 더 직접적입니다." },
  { href: "/guides/product-selection-comparison/meal-replacement-protein-shake-guide", title: "식사대용 단백질 쉐이크", body: "음료로는 포만감이 부족하다고 느껴지면 쉐이크 비교로 넘어가는 편이 자연스럽습니다." },
  { href: "/guides/product-selection-comparison/protein-category-guide", title: "음료 vs 쉐이크 vs 바 비교", body: "한 끼 대체가 목적이면 카테고리 전체를 먼저 넓게 비교해도 판단이 빨라집니다." },
];

const mistakes = [
  "단백질 숫자만 보고 식사대용이 될 거라고 생각하는 경우",
  "가벼운 보충용 RTD를 점심·저녁 전체 대체에 계속 쓰는 경우",
  "포만감은 부족한데 간식만 늘어나서 총칼로리가 더 올라가는 경우",
];

const cases = [
  {
    title: "아침 대체",
    body: "짧은 공백을 막는 용도라면 가벼운 제품도 가능하지만, 점심 전 허기를 버틸 정도는 되는지 같이 봐야 합니다.",
  },
  {
    title: "점심 보완",
    body: "회의나 이동 때문에 제대로 먹기 어려운 날은 포만감이 더 붙은 쉐이크나 균형 영양형이 잘 맞습니다.",
  },
  {
    title: "저녁 대체",
    body: "체중 관리 목적이라도 너무 가벼우면 밤 간식으로 돌아오기 쉽습니다. 총칼로리보다 지속성이 중요해집니다.",
  },
];

export default function ProteinDrinkMealReplacementPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>단백질 음료 식사대용</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료로 한 끼를 대신할 수는 있습니다.
            <br />
            하지만 식사 보완형 음료와 보충용 RTD는 분리해서 봐야 합니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            식사 대용은 단백질 숫자만 보고 결정하면 실패하기 쉽습니다. 포만감, 칼로리, 다음 끼니까지 버티는 힘까지
            같이 봐야 실제로 잘 맞는 제품을 찾을 수 있습니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용 가능한 제품과 아닌 제품의 차이</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">유형</th>
                    <th className="px-3 py-3 font-semibold">판단</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">실제로는 이렇게 고르면 됩니다</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {steps.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용도 상황별로 다릅니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {cases.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">실패하는 패턴</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {mistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">바로 이어서 보면 좋은 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {links.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
