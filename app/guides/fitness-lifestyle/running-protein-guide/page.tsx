import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "러닝 단백질 가이드 | 러너의 필요량과 섭취 타이밍 | ProteinLab",
  description:
    "러너에게 필요한 단백질 양, 운동 후 회복 타이밍, 하루 분산 섭취 기준을 데이터 중심으로 정리했습니다.",
};

const dailyNeedRows = [
  ["일반 러닝 훈련기", "1.6 g/kg/day", "지구력 훈련 회복과 유지에 필요한 기본 범위입니다."],
  ["고강도 훈련기", "1.8~2.0 g/kg/day", "인터벌, 템포런, 근력 운동을 함께 할 때 더 중요합니다."],
  ["탄수화물 제한·감량기", "2.0 g/kg/day 이상", "에너지 부족 환경에서 근손실을 줄이기 위한 기준입니다."],
];

const mealRows = [
  ["60kg", "24~30g", "운동 후 회복 식사 1회 기준으로 보기 좋습니다."],
  ["70kg", "28~35g", "고품질 단백질을 한 번에 넣기 좋은 범위입니다."],
  ["80kg", "32~40g", "하루 4회 분산 섭취를 고려하기 좋은 수치입니다."],
];

const timingPoints = [
  {
    title: "운동 직후 0~1시간",
    body: "단백질 20~30g을 탄수화물과 함께 넣으면 회복 시작 신호를 빠르게 만들기 좋습니다.",
  },
  {
    title: "하루 4회 분산 섭취",
    body: "한 번에 몰아 먹기보다 식사와 간식으로 나눠 먹는 쪽이 러너의 회복과 유지에 더 유리합니다.",
  },
  {
    title: "취침 전 보완 단백질",
    body: "카제인 계열이나 소화가 느린 단백질은 야간 회복과 공복 구간 보완에 활용할 수 있습니다.",
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
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동 & 라이프스타일</Link>
            <span>/</span>
            <span>러닝 단백질 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            러닝 & 마라톤 단백질 섭취 기준
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            러너는 일반 성인보다 더 많은 단백질이 필요합니다.
            <br />
            하루 필요량, 한 끼 기준, 회복 타이밍을 먼저 이해하면 제품 비교도 훨씬 쉬워집니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#8a4b2f]">KEY NUMBERS</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">러너에게 중요한 단백질 숫자 3개</h2>
              </div>
              <span className="rounded-full bg-[#fcf1ea] px-3 py-1 text-xs font-semibold text-[#8a4b2f]">러닝 기본 기준</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <GaugeBar label="일일 권장량" value="1.6~2.0 g/kg" width="84%" note="일반 성인 0.8 g/kg보다 높은 범위입니다." />
              <GaugeBar label="한 끼 권장량" value="0.4~0.5 g/kg" width="64%" note="60kg 기준 한 번에 24~30g 정도가 됩니다." />
              <GaugeBar label="운동 후 타이밍" value="0~1시간" width="76%" note="운동 직후 탄수화물과 함께 넣는 것이 회복에 유리합니다." />
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 단백질 필요량</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              장거리 러닝과 마라톤 훈련기에는 체중 1kg당 1.6~2.0g/day 수준을 기본 범위로 봅니다. 강도가 높거나 감량을 병행하면 더 올라갈 수 있습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">한 끼 기준과 분산 섭취</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              보통 한 끼에 체중 1kg당 0.4~0.5g 정도를 기준으로 잡으면 좋습니다. 러너는 하루 4회 이상으로 나누어 먹는 방식이 실제 적용에 유리합니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">체중</th>
                    <th className="px-3 py-3 font-semibold">한 끼 권장량</th>
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
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: Witard et al. (2025), ISSN Position Stand (2007), Moore et al. (2021), Nikolaidis et al. (2021)
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/fitness-lifestyle/marathon-protein-guide" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                레이스 주간 전략 보기
              </Link>
              <Link href="/curation/running" className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                러닝 큐레이션 보기
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
