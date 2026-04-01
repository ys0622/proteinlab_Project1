import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "밤에 단백질 음료 마셔도 될까 | 야식·저녁 보충 기준 정리 | ProteinLab",
  description:
    "저녁이나 자기 전에 단백질 음료를 마셔도 되는지, 야식처럼 마실 때 주의할 점과 칼로리·당류 기준을 실전적으로 정리했습니다.",
};

const timingRows = [
  ["저녁 식사 후 보충", "가능", "식사에서 단백질이 부족했다면 가벼운 보충용 RTD는 무난합니다."],
  ["운동 후 늦은 시간", "상황 따라 가능", "운동 직후 회복 목적이라면 늦은 시간이어도 보충 자체가 더 중요할 수 있습니다."],
  ["야식처럼 반복적으로 섭취", "비추천", "배고픔 해소용으로 칼로리와 당류가 있는 제품을 반복하면 체중 관리가 흔들리기 쉽습니다."],
  ["자기 직전 40g 고단백", "대체로 비추천", "소화 부담과 칼로리 부담이 같이 커질 수 있어 목적이 분명할 때만 고려하는 편이 낫습니다."],
];

const checkCards = [
  {
    title: "1. 저녁 식사 단백질이 부족했나",
    body: "고기, 계란, 두부 같은 단백질 식품이 적었다면 가벼운 보충이 의미 있을 수 있습니다.",
  },
  {
    title: "2. 배고픔 해소용인가 회복용인가",
    body: "회복과 보충 목적이라면 기준이 단순하지만, 허기 해결용이라면 포만감과 칼로리까지 함께 봐야 합니다.",
  },
  {
    title: "3. 당류와 총칼로리가 적당한가",
    body: "밤 시간대에는 같은 단백질 20g이라도 당류와 칼로리 차이가 체감상 훨씬 큽니다.",
  },
];

const mistakeList = [
  "밤에는 무조건 안 좋다고 생각해서 식사 부족분까지 무시하는 경우",
  "바로 자기 전이니까 고단백일수록 좋다고 생각하고 40g 제품부터 찾는 경우",
  "야식 대용으로 가볍지 않은 제품을 반복해서 마시는 경우",
];

const nightCases = [
  {
    title: "다이어트 중 저녁 보충",
    body: "저당·저칼로리 20g 전후 제품을 먼저 보는 편이 좋습니다. 포만감이 더 필요하면 음료보다 다른 형태가 더 맞을 수 있습니다.",
  },
  {
    title: "운동 후 늦은 귀가",
    body: "식사까지 공백이 길다면 RTD 보충이 무난합니다. 다만 자기 직전이라면 너무 무겁지 않은 제품이 더 낫습니다.",
  },
  {
    title: "부모님·중장년 건강 보완",
    body: "야식이 아니라 건강 보완 목적이라면 식사 보완형 제품이 더 잘 맞습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "단백질 섭취 타이밍 전체 보기",
    body: "밤 시간대만 따로 보기보다 하루 전체 루틴에서 어디에 배치할지 같이 보면 기준이 더 선명합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-for-diabetes",
    title: "저당 제품부터 비교하기",
    body: "밤에 마실 제품은 당류와 칼로리를 먼저 걸러내는 편이 안전합니다. 저당 기준 비교 페이지로 바로 이어집니다.",
  },
  {
    href: "/guides/intake-strategy-health/post-workout-protein",
    title: "운동 후 보충 기준 보기",
    body: "늦은 시간 운동 뒤 회복용으로 마실지 고민 중이라면 운동 후 보충 기준 페이지를 같이 보는 편이 더 정확합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-for-50s",
    title: "중장년용 보완 제품 보기",
    body: "야식이 아니라 건강 보완 목적이라면 식사 보완형 제품군을 따로 보는 편이 더 빠릅니다.",
  },
];

export default function NightProteinDrinkPage() {
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
            <span>밤에 단백질 음료 마셔도 될까</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            밤에 단백질 음료를 마셔도 됩니다.
            <br />
            다만 야식처럼 마실지, 보충용으로 마실지부터 나눠 봐야 합니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            저녁이나 자기 전에 마신다는 이유만으로 무조건 피할 필요는 없습니다. 중요한 건 밤이라는 시간대보다 부족한 단백질을 채우는 보충인지, 허기를 달래는 야식인지, 그리고 당류와 칼로리가 어떤 제품인지입니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">밤 시간대에 마셔도 되는 경우</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">판단</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">밤에는 이 3가지만 보면 됩니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {checkCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별로는 이렇게 다릅니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {nightCases.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">많이 하는 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {mistakeList.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 보면 좋은 비교 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
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
