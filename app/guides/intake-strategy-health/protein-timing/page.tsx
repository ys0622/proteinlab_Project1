import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 섭취 타이밍 가이드 | ProteinLab",
  description:
    "아침, 운동 후, 간식, 저녁까지 하루 전체 루틴에서 단백질을 언제 어떻게 나눠 먹을지 실전 기준으로 정리했습니다.",
};

const timingRows = [
  ["아침", "20~30g", "공복 시간이 길었다면 첫 식사에서 단백질을 먼저 채워두는 편이 안정적입니다."],
  ["운동 전", "부담 없게", "직전 식사 여부와 소화 부담을 먼저 보고 결정합니다."],
  ["운동 후", "20~30g", "운동 후 1시간 안팎에 회복 시작용 보충을 넣는 방식이 실전적입니다."],
  ["간식·저녁", "20~30g", "하루 총량이 부족할 때 간식이나 저녁 식사에서 보완합니다."],
];

const principles = [
  {
    title: "운동 직후만 보지 않기",
    body: "운동 직후 보충은 중요하지만, 실제 결과는 하루 총량과 분산 섭취가 더 크게 좌우합니다.",
  },
  {
    title: "한 번에 몰아먹지 않기",
    body: "여러 끼에 나눠 먹는 편이 지속하기 쉽고, 식사 루틴에도 자연스럽게 들어갑니다.",
  },
  {
    title: "생활 패턴에 맞추기",
    body: "출근 전 운동, 점심 운동, 저녁 운동마다 좋은 타이밍이 다르기 때문에 반복 가능한 루틴이 우선입니다.",
  },
];

const routineRows = [
  ["아침 운동형", "기상 후 가벼운 수분 보충, 운동 뒤 단백질", "운동 직후 회복 루틴 만들기"],
  ["저녁 운동형", "점심~간식에서 미리 총량 확보, 운동 후 RTD 또는 식사", "야식성 과식 줄이기"],
  ["운동 없는 날", "아침과 간식에서 균등 분배", "주간 총량 유지"],
];

export default function ProteinTimingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
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
            <span>단백질 섭취 타이밍</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질은
            <br />
            얼마나 먹을지와 언제 먹을지를 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 후 한 번만 따로 떼어 보기보다, 하루 전체 식사 안에서 단백질이 어떻게 분배되는지 보는 편이 더 실전적입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 기본 타이밍</h2>
            <div className="mt-4 rounded-2xl border border-[#dce8df] bg-white px-4 py-4">
              <div className="grid gap-3 md:grid-cols-4">
                {["아침", "운동 전후", "간식", "저녁"].map((label, index) => (
                  <div key={label} className="rounded-xl bg-[#f6fbf7] px-3 py-3 text-center">
                    <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">STEP {index + 1}</p>
                    <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">타이밍만 보고 놓치지 말아야 할 기준</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">생활 패턴별 적용 예시</h2>
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
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              좋은 타이밍은 정답이 하나인 것이 아니라, 내 일정 안에서 끊기지 않고 반복할 수 있는 배치입니다.
            </blockquote>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">TRACK C NOTE</p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 타이밍은 제품보다 루틴이 먼저입니다. 아침, 운동 후, 간식 중 하나라도 고정 포인트를 만들면 총량 관리가 훨씬 쉬워집니다.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
