import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 섭취 타이밍 가이드 | 하루에 언제 먹어야 할까",
  description:
    "단백질을 아침, 운동 후, 간식, 저녁 중 언제 넣어야 할지 정리했습니다. 하루 총량과 분산 섭취 기준으로 바로 적용할 수 있는 루틴 가이드입니다.",
};

const timingRows = [
  ["아침", "20~30g", "공복 시간이 길었다면 첫 식사에서 단백질을 넣어 하루 시작 리듬을 안정적으로 만드는 편이 좋습니다."],
  ["운동 전", "상황별 판단", "직전 식사 여부와 소화 부담을 먼저 보고 결정합니다. 무조건 추가 보충이 필요한 구간은 아닙니다."],
  ["운동 후", "20~30g", "운동 후 1시간 안팎에서 회복 신호를 만들고 다음 식사까지 루틴을 연결하는 데 초점을 둡니다."],
  ["간식·저녁", "20~30g", "하루 총량이 부족할 때 간식이나 저녁 식사에서 보완하면 분산 섭취가 쉬워집니다."],
];

const principles = [
  {
    title: "운동 직후만 보지 않기",
    body: "운동 후 보충은 중요하지만 실제 결과는 하루 총량과 분산 섭취가 더 크게 좌우합니다. 타이밍은 총량을 채우기 위한 도구입니다.",
  },
  {
    title: "한 번에 몰아먹지 않기",
    body: "여러 끼에 나눠 먹는 쪽이 유지하기도 쉽고, 아침·간식·운동 후처럼 생활 루틴에 자연스럽게 녹이기 좋습니다.",
  },
  {
    title: "생활 루틴에 맞추기",
    body: "출근 전 운동, 저녁 운동, 학생 루틴처럼 하루 패턴이 다르면 좋은 타이밍도 달라집니다. 반복 가능한 배치가 우선입니다.",
  },
];

const routineRows = [
  ["아침 운동형", "기상 후 가벼운 보충, 운동 후 단백질 보충", "공복감을 줄이고 회복 루틴을 빠르게 만들기 좋습니다."],
  ["저녁 운동형", "점심~간식에서 미리 총량 확보, 운동 후 RTD 또는 식사", "운동 후 과식과 결식으로 이어지지 않게 루틴을 묶기 좋습니다."],
  ["운동 없는 날", "아침과 간식에서 고르게 분산", "운동과 관계없이 하루 전체 단백질 감각을 너무 낮추지 않는 데 유용합니다."],
];

const timingLinks = [
  {
    href: "/guides/intake-strategy-health/post-workout-protein",
    title: "운동 직후 보완 기준 더 보기",
    body: "운동 직후 루틴만 더 깊게 보고 싶다면 이 페이지로 바로 이어서 판단할 수 있습니다.",
  },
  {
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    title: "식사대용이 맞는지 바로 판단하기",
    body: "아침이나 저녁을 제품으로 대체하는 루틴까지 연결해서 보려면 이 페이지가 같이 필요합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "처음 마실 제품부터 바로 고르기",
    body: "타이밍은 알겠는데 어떤 제품부터 마실지 모르겠다면 입문용 비교 페이지로 바로 넘어가는 편이 더 빠릅니다.",
  },
];

export default function ProteinTimingPage() {
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
            <span>단백질 섭취 타이밍</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질은 얼마나 먹을지와 함께
            <br />
            언제 먹을지도 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 후 한 번만 보는 것보다 하루 전체 식사 안에서 단백질이 어떻게 분산되는지 보는 편이 더 실전적입니다.
            기준을 잡고 나면 내 생활 패턴에 맞는 제품 선택까지 바로 이어져야 실행이 쉬워집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질은 하루 중 언제 나눠 먹는 게 가장 실전적일까</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">타이밍만 보다가 놓치기 쉬운 기준은 무엇일까</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">출근 전 운동, 저녁 운동이면 배분이 어떻게 달라질까</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">루틴</th>
                    <th className="px-3 py-3 font-semibold">추천 배치</th>
                    <th className="px-3 py-3 font-semibold">목적</th>
                  </tr>
                </thead>
                <tbody>
                  {routineRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음 단계로 바로 넘어가기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              타이밍 감이 잡혔다면 다음은 운동 직후 루틴을 더 볼지, 식사대용 여부를 판단할지, 처음 마실 제품부터 고를지
              방향을 정하면 됩니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {timingLinks.map((item) => (
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
