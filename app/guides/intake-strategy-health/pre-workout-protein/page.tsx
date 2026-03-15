import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 전 단백질 가이드 | ProteinLab",
  description:
    "운동 전 단백질이 필요한 상황과 소화 부담을 줄이는 기준을 간단하고 실전적으로 정리한 가이드입니다.",
};

const beforeWorkoutRows = [
  ["직전 식사를 한 경우", "추가 보충보다 식사 상태 확인", "소화 부담을 줄이고 운동 집중도를 유지하려면 마지막 식사와의 간격을 먼저 봐야 합니다."],
  ["공복 운동", "가벼운 보충 가능", "RTD나 액상형처럼 부담이 적은 형태가 맞는 경우가 많습니다."],
  ["장시간 유산소 예정", "탄수화물 우선", "운동 직전에는 단백질보다 에너지 보충이 먼저일 때가 많습니다."],
];

const quickRules = [
  {
    title: "직전 식사 간격 먼저 보기",
    body: "마지막 식사가 2~3시간 이내였다면 운동 전 단백질을 추가로 챙기지 않아도 되는 경우가 많습니다.",
  },
  {
    title: "소화 부담이 적은 형태 고르기",
    body: "운동 직전에는 꾸덕한 바보다 가벼운 RTD나 소량 쉐이크가 맞는 경우가 많습니다.",
  },
  {
    title: "운동 강도에 맞춰 판단하기",
    body: "웨이트, 러닝, 장거리 유산소는 필요한 보충 우선순위가 서로 다릅니다. 같은 기준으로 볼 필요는 없습니다.",
  },
];

export default function PreWorkoutProteinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략 & 건강</Link>
            <span>/</span>
            <span>운동 전 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 전 단백질은
            <br />
            무조건이 아니라 상황 판단이 먼저입니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 전에 단백질을 챙길지보다 소화 부담과 직전 식사 유무를 먼저 점검하는 편이 더 실전적입니다.
          </p>
        </div>
      </section>
      <main className="guide-article-page guide-article-page--track-c mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">운동 전 판단 기준</h2>
          <div className="mt-4 rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">QUICK INFOGRAPHIC</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              최근 식사 여부, 운동 강도, 소화 부담 순서로 체크하면 운동 전 보충이 필요한지 빠르게 판단할 수 있습니다.
            </p>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">상황</th>
                  <th className="px-3 py-3 font-semibold">추천</th>
                  <th className="px-3 py-3 font-semibold">이유</th>
                </tr>
              </thead>
              <tbody>
                {beforeWorkoutRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {quickRules.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
