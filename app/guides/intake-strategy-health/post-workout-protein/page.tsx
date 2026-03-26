import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 후 단백질 가이드 | 언제·얼마나 먹어야 할까",
  description:
    "운동 후 단백질을 언제, 얼마나, 어떤 제품으로 채워야 하는지 정리했습니다. 회복 루틴과 식사 간격까지 함께 보는 실전 가이드입니다.",
};

const recoveryTimelineRows = [
  ["운동 직후 0~1시간", "20~30g", "가벼운 보충과 함께 회복 루틴을 시작하는 구간입니다."],
  ["1~2시간 내 식사", "단백질 + 탄수화물", "다음 식사에서 회복 총량을 보완하고 루틴을 마무리합니다."],
  ["나머지 식사", "하루 총량 분산", "운동 직후 한 번으로 끝내지 말고 하루 전체 루틴과 연결하는 것이 중요합니다."],
];

const quickChoices = [
  {
    title: "가볍게 회복하고 싶을 때",
    body: "워터형이나 가벼운 RTD처럼 마시기 쉬운 형태가 부담이 적고, 운동 직후 루틴에 바로 넣기 좋습니다.",
  },
  {
    title: "운동 후 식사까지 시간이 길 때",
    body: "바나 RTD처럼 바로 영양 보완이 가능한 형태가 실전적입니다. 이때도 당류와 칼로리를 같이 봐야 합니다.",
  },
  {
    title: "샤워나 이동 중 바로 채워야 할 때",
    body: "보관이 쉽고 마시기 빠른 제품이 유리합니다. 이후 식사 간격까지 함께 고려하는 게 좋습니다.",
  },
];

const mistakes = [
  "운동 직후 한 번만 챙기고 하루 총량을 놓치는 경우",
  "단백질만 보고 당류와 칼로리를 확인하지 않는 경우",
  "회복용 제품이라고 생각했지만 실제로는 식사대용 제품을 고르는 경우",
];

const postWorkoutLinks = [
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 고단백 비교",
    body: "운동 직후 단백질 집중 보충용 RTD를 더 강하게 비교하고 싶다면 이 페이지가 맞습니다.",
  },
  {
    href: "/guides/product-selection-comparison/takefit-vs-himune",
    title: "운동용 20g대 비교",
    body: "가벼운 회복용 20g대 RTD를 고를 때는 이 비교가 더 직관적입니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "섭취 타이밍 가이드",
    body: "운동 후만이 아니라 하루 전체 루틴에서 어떻게 분산할지 함께 볼 수 있습니다.",
  },
];

export default function PostWorkoutProteinPage() {
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
            <span>운동 후 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 후 단백질은
            <br />
            회복 루틴의 시작점입니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 후 단백질은 언제, 얼마나, 어떤 제품으로 채우는지까지 함께 봐야 실제 회복 루틴으로 이어집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 후 회복 타임라인</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              운동 직후 20~30g을 먼저 채우고, 이후 식사에서 탄수화물과 단백질을 함께 보완하는 흐름이 가장 안정적입니다.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">구간</th>
                    <th className="px-3 py-3 font-semibold">권장량</th>
                    <th className="px-3 py-3 font-semibold">실전 해석</th>
                  </tr>
                </thead>
                <tbody>
                  {recoveryTimelineRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별로 고르는 회복 방식</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {quickChoices.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 후에 자주 놓치는 부분</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">관련 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {postWorkoutLinks.map((item) => (
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
