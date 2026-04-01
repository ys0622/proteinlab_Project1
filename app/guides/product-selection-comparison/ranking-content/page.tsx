import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "순위와 점수 보는 법 | 단백질 제품 랭킹 해석 가이드 | ProteinLab",
  description:
    "단백질 제품 순위와 점수가 어떤 기준으로 계산되는지, 랭킹을 어떻게 읽어야 하는지 정리했습니다. 저당, 다이어트, 운동 후 기준까지 함께 확인해보세요.",
};

const points = [
  {
    title: "랭킹",
    body: "같은 기준에서 상대적으로 상위에 있는지 보여주는 결과입니다. 빠르게 후보를 좁힐 때 유용합니다.",
  },
  {
    title: "순위",
    body: "현재 데이터 안에서 몇 번째 위치인지 보여주는 숫자입니다. 상위권 여부를 직관적으로 파악할 수 있습니다.",
  },
  {
    title: "점수",
    body: "사용자가 해석하기 쉽게 100점 기준으로 환산한 지표입니다. 비슷한 제품끼리 미세한 차이를 볼 때 도움이 됩니다.",
  },
];

const readRows = [
  ["가벼운 제품 랭킹", "같은 기준에서 칼로리 부담이 낮은 제품", "다이어트용이나 아침용 후보를 빠르게 줄일 때 먼저 보기 좋습니다."],
  ["다이어트 점수", "칼로리와 당류 부담을 줄인 제품", "체중 관리나 식단 정리 목적이라면 우선 확인할 만한 지표입니다."],
  ["운동 후 점수", "운동 후 보충 효율이 좋은 제품", "운동 직후 보충용 후보를 고를 때 유용합니다."],
];

export default function RankingContentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>순위와 점수 보는 법</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 제품 순위는 숫자만 보면 끝이 아닙니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 1위라도 어떤 기준에서 1위인지에 따라 해석은 달라집니다.
            <br />
            랭킹, 순위, 점수를 구분해서 보면 내 목적에 맞는 제품을 더 빨리 고를 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">랭킹, 순위, 점수의 차이</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {points.map((point) => (
                <article key={point.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{point.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">지표별로 읽는 기준</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">지표</th>
                    <th className="px-3 py-3 font-semibold">무엇을 보는가</th>
                    <th className="px-3 py-3 font-semibold">언제 유용한가</th>
                  </tr>
                </thead>
                <tbody>
                  {readRows.map((row) => (
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
              랭킹은 같은 제품군 안에서 비교해야 의미가 있습니다. 음료 랭킹과 쉐이크 랭킹처럼 카테고리가 다르면 숫자만으로 직접 비교하면 해석이 흔들릴 수 있습니다.
            </blockquote>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
