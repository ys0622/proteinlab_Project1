import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "러닝 단백질 가이드 | 주간 필요량·회복 타이밍 기본편",
  description:
    "러닝과 마라톤을 하는 사람에게 필요한 단백질 주간 필요량, 운동 후 회복 타이밍, 식사 분배 기준을 기본편 기준으로 정리한 가이드입니다.",
};

const dailyNeedRows = [
  ["일반 러닝 주간", "1.6 g/kg/day", "지구력 운동 회복과 근육 유지에 필요한 기본 범위입니다."],
  ["강도 높은 주간", "1.8~2.0 g/kg/day", "인터벌과 근력 운동을 함께 할 때는 기준을 조금 더 올려 봅니다."],
  ["감량 병행 시기", "2.0 g/kg/day 전후", "총열량이 낮을수록 근손실을 줄이기 위해 단백질 비중이 중요해집니다."],
];

const mealRows = [
  ["60kg", "24~30g", "운동 후 회복 식사 1회 기준으로 보기 좋습니다."],
  ["70kg", "28~35g", "고품질 단백질을 한 끼에 담기 좋은 범위입니다."],
  ["80kg", "32~40g", "하루 4회 분산 섭취를 고려하기 좋은 수치입니다."],
];

const timingPoints = [
  {
    title: "운동 직후 0~1시간",
    body: "단백질 20~30g과 수분 보충을 같이 챙기면 회복 신호를 빠르게 만드는 데 도움이 됩니다.",
  },
  {
    title: "하루 4회 분산 섭취",
    body: "한 번에 몰아 먹기보다 식사와 간식으로 나누어 먹는 편이 러너의 회복과 유지에 더 유리합니다.",
  },
  {
    title: "취침 전 보충",
    body: "카제인 계열이나 소화가 편한 단백질은 야간 회복과 공복 시간 보완에 활용할 수 있습니다.",
  },
];

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
      <p className="text-sm font-semibold text-[#24543d]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
    </article>
  );
}

function GaugeBar({ label, value, width, note }: { label: string; value: string; width: string; note: string }) {
  return (
    <div className="rounded-2xl border border-[#d9e7dc] bg-white p-4 shadow-[0_12px_30px_rgba(24,52,38,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#163725]">{label}</p>
        <span className="rounded-full bg-[#eef7f1] px-3 py-1 text-[11px] font-semibold text-[#24543d]">{value}</span>
      </div>
      <div className="mt-3 h-3 rounded-full bg-[#edf3ef]">
        <div className="h-3 rounded-full bg-[linear-gradient(90deg,#2d6a4f_0%,#78aa83_100%)]" style={{ width }} />
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{note}</p>
    </div>
  );
}

export default function RunningProteinGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>러닝 단백질 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            러닝과 마라톤을 하면 단백질 전략도 달라집니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            러너는 일반 성인보다 회복을 위해 더 많은 단백질이 필요합니다.
            <br />
            이 페이지는 러닝 기본편으로 주간 필요량, 1회 섭취 기준, 회복 타이밍을 먼저 정리하고,
            봄 재개 루틴이나 마라톤 레이스 주간은 별도 페이지에서 나눠서 보는 흐름에 맞춰 구성했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#8a4b2f]">KEY NUMBERS</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">러너가 먼저 볼 숫자 3가지</h2>
              </div>
              <span className="rounded-full bg-[#fcf1ea] px-3 py-1 text-xs font-semibold text-[#8a4b2f]">러닝 기본 기준</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <GaugeBar label="일일 권장량" value="1.6~2.0 g/kg" width="84%" note="일반 성인 기준보다 높은 범위입니다." />
              <GaugeBar label="1회 권장량" value="0.4~0.5 g/kg" width="64%" note="60kg 기준 한 번에 24~30g 정도입니다." />
              <GaugeBar label="운동 후 회복 창" value="0~1시간" width="76%" note="운동 직후 보충은 회복 루틴을 빠르게 만듭니다." />
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 단백질 필요량</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              러닝과 마라톤 훈련을 할 때는 체중 1kg당 1.6~2.0g/day 정도를 기본 범위로 봅니다. 강도가 높거나 감량을 병행하면 조금 더 올라갈 수 있습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">훈련 상황</th>
                    <th className="px-3 py-3 font-semibold">권장량</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyNeedRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">1회 기준과 분산 섭취</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              보통 한 번에 체중 1kg당 0.4~0.5g 정도를 기준으로 잡으면 좋습니다. 러너는 하루 4회 이상으로 나누어 먹는 편이 실제 적용에 더 유리합니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">체중</th>
                    <th className="px-3 py-3 font-semibold">1회 권장량</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {mealRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {timingPoints.map((point) => (
                <InsightCard key={point.title} title={point.title} body={point.body} />
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/fitness-lifestyle/spring-running-start-guide" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">봄 러닝 재개 루틴 보기</Link>
              <Link href="/guides/fitness-lifestyle/marathon-protein-guide" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">마라톤 주간 전략 보기</Link>
              <Link href="/curation/running" className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">러닝 큐레이션 보기</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
