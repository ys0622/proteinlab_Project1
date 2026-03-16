import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "근력운동과 단백질 전략 | ProteinLab",
  description:
    "러닝과 근력운동을 함께 하는 사람에게 필요한 단백질 타이밍, 회복 포인트, 주간 총량 기준을 정리합니다.",
};

const focusRows = [
  ["근력운동 직후", "20~40g", "근육 회복과 다음 세션 준비를 위한 기본 범위"],
  ["러닝 병행 주간", "1.6~2.0 g/kg/day", "지구력과 근력 훈련을 동시에 고려한 총량 기준"],
  ["감량기 근손실 방어", "2.0 g/kg/day 전후", "총열량이 낮을수록 단백질 비중이 중요해집니다."],
];

const liftCards = [
  {
    title: "근력운동 후 1시간",
    body: "러닝과 함께 근력운동을 하는 주간에는 운동 후 회복 창을 놓치지 않는 편이 좋습니다. 탄수화물과 단백질을 함께 먹으면 회복 체감이 안정적입니다.",
  },
  {
    title: "주간 총량 유지",
    body: "근력운동이 2~3회 이상 늘어나면 총 단백질 섭취가 부족하지 않은지 먼저 확인해야 합니다. 운동일만이 아니라 휴식일도 중요합니다.",
  },
  {
    title: "러닝과 병행할 때 우선순위",
    body: "러닝 볼륨과 근력운동을 동시에 하면 회복 부담이 커집니다. 주간 전체 식사 흐름 안에서 단백질과 탄수화물을 같이 설계하는 편이 안정적입니다.",
  },
];

const sampleRows = [
  ["아침", "계란, 그릭요거트, 토스트", "단백질과 탄수화물로 하루를 시작"],
  ["운동 후", "쉐이크 또는 RTD 단백질 음료", "빠른 회복 루틴 연결"],
  ["저녁", "생선, 닭가슴살, 밥", "총량 확보와 근육 회복 대비"],
];

const scheduleRows = [
  ["러닝만 하는 날", "운동 후 20~30g", "회복과 다음 훈련 준비"],
  ["근력운동만 하는 날", "운동 후 20~40g", "근육 회복과 자극 유지"],
  ["러닝+근력 병행일", "운동 후 30g 전후 + 전체 식사 보강", "세션 부담을 함께 고려"],
  ["휴식일", "식사별 총량 유지", "주간 평균 섭취량 유지"],
];

const checklist = [
  "근력운동 후 단백질만 보지 말고 탄수화물도 함께 챙기기",
  "러닝 병행 주간에는 휴식일에도 총 단백질 섭취를 유지하기",
  "감량기라면 단백질 비중이 높은 제품을 우선 보기",
  "고강도 하체 운동 다음 날 러닝이 있다면 회복 간격까지 같이 설계하기",
];

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
      <p className="text-sm font-semibold text-[#24543d]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
    </article>
  );
}

export default function StrengthTrainingProteinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">
              운동 & 라이프스타일
            </Link>
            <span>/</span>
            <span>근력운동과 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            근력운동을 병행하면 단백질 전략이 달라집니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            러닝만 할 때보다 회복 부담이 커지기 때문에,
            <br />
            근력운동이 들어가는 주간에는 총량과 운동 직후 회복 타이밍을 더 신경 써야 합니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">KEY NUMBERS</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">근력운동 병행 시 먼저 보는 기준</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">회복과 총량</span>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">기준</th>
                    <th className="px-3 py-3 font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {focusRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">러닝과 병행할 때 왜 더 중요할까?</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {liftCards.map((card) => (
                <InsightCard key={card.title} title={card.title} body={card.body} />
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 식사 예시</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              근력운동을 병행한다면 운동 직후만 챙기기보다 아침부터 저녁까지 포함한 총량 흐름을 만드는 편이 좋습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">타이밍</th>
                    <th className="px-3 py-3 font-semibold">예시</th>
                    <th className="px-3 py-3 font-semibold">포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">주간 훈련 조합 적용법</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              러닝과 근력운동을 같이 하는 사람에게는 운동 종류보다 주간 훈련 전체를 기준으로 총 섭취 전략을 보는 편이 더 실전적입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">권장 섭취</th>
                    <th className="px-3 py-3 font-semibold">목적</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">근력운동 병행 체크리스트</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {checklist.map((item) => (
                <label
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#dce8df] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] shadow-[0_10px_26px_rgba(45,106,79,0.05)]"
                >
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#c8dfd0] bg-[#eef7f1] text-[11px] font-bold text-[#2d6a4f]">
                    OK
                  </span>
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/fitness-lifestyle/running-protein-guide"
                className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                러닝 단백질 가이드 보기
              </Link>
              <Link
                href="/guides/fitness-lifestyle/sports-nutrition-guide"
                className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                스포츠 영양 가이드 보기
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
