import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 후 단백질 가이드 | ProteinLab",
  description:
    "운동 후 단백질을 언제, 얼마나, 어떤 기준으로 챙길지 회복 타이밍과 제품 선택 기준 중심으로 정리했습니다.",
};

const recoveryTimelineRows = [
  ["운동 직후 0~1시간", "20~30g", "물 또는 수분 보충과 함께 가볍게 회복을 시작합니다."],
  ["1~2시간 내 식사", "단백질 + 탄수화물", "다음 식사에서 회복 총량을 보완합니다."],
  ["나머지 식사", "하루 총량 분산", "운동 직후 한 번만으로 끝내지 말고 하루 전체 루틴을 맞춥니다."],
];

const quickChoices = [
  {
    title: "가볍게 회복하고 싶을 때",
    body: "워터형 RTD나 드링킹 타입처럼 부담이 적은 형태가 잘 맞습니다.",
  },
  {
    title: "운동 후 식사까지 시간이 길 때",
    body: "바나 RTD처럼 바로 먹을 수 있는 제품이 더 실전적입니다. 다만 당류와 칼로리도 같이 봐야 합니다.",
  },
  {
    title: "헬스장이나 이동 중 바로 챙길 때",
    body: "보관이 쉽고 마시기 빠른 형태가 유리합니다. 다음 식사와의 간격도 함께 보세요.",
  },
];

const mistakes = [
  "운동 직후 한 번만 먹고 하루 총량을 놓치는 경우",
  "단백질만 보고 당류와 칼로리를 확인하지 않는 경우",
  "회복용으로 샀지만 실제로는 식사대용에 가까운 제품을 고르는 경우",
];

export default function PostWorkoutProteinPage() {
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
            <span>운동 후 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 후 단백질은
            <br />
            회복을 시작하는 첫 번째 신호입니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 후 단백질은 언제, 얼마나, 어떤 제품으로 넣을지까지 함께 봐야 실전 루틴이 됩니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 후 회복 타임라인</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              운동 직후 20~30g을 먼저 채우고, 이후 식사에서 탄수화물과 단백질을 함께 보완하는 방식이 가장 안정적입니다.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {["0~1시간", "1~2시간", "하루 전체"].map((label) => (
                <div key={label} className="rounded-xl border border-[#dce8df] bg-white px-3 py-3 text-center">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">RECOVERY</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{label}</p>
                </div>
              ))}
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
                  {recoveryTimelineRows.map((row) => (
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
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              회복용 제품은 단백질 함량만 높다고 끝이 아닙니다. 다음 식사와의 간격, 당류, 칼로리, 포만감까지 같이 봐야 목적에 맞는 선택이 됩니다.
            </blockquote>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">RECOVERY NOTE</p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              운동 후 보충은 빠를수록 좋다는 말보다, 다음 식사까지 얼마나 비는지와 하루 총량이 유지되는지가 더 중요합니다.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
