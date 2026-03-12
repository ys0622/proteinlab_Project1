import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "등급 · 랭킹 읽는 법 | ProteinLab",
  description:
    "등급과 랭킹이 어떤 기준으로 계산되는지, 점수와 순위를 어떻게 이해해야 하는지 설명합니다.",
};

const points = [
  {
    title: "등급",
    body: "단백질 밀도, 다이어트, 퍼포먼스처럼 특정 목적에 맞춰 요약한 지표입니다.",
  },
  {
    title: "랭킹",
    body: "현재 데이터셋 안에서 상대적으로 어디에 위치하는지 보여주는 순위입니다.",
  },
  {
    title: "점수",
    body: "사용자 이해를 돕기 위해 100점 기준으로 환산한 상대 점수입니다.",
  },
];

const readRows = [
  ["단백질 밀도 랭킹", "열량 대비 단백질 효율이 좋은 제품", "가벼운 보충용, 고효율 비교에 유리"],
  ["다이어트 등급", "당류·칼로리·단백질 밀도를 함께 고려", "체중 관리나 저당 선택에 유리"],
  ["퍼포먼스 등급", "운동 후 보충 관점의 함량과 구성", "회복과 단백질 보충 목적에 유리"],
];

export default function RankingContentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 · 비교</Link>
            <span>/</span>
            <span>등급 · 랭킹 읽는 법</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            랭킹은 순위만 보는 것이 아니라 기준을 같이 읽어야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 1위라도 어떤 지표에서 1위인지에 따라 의미가 달라집니다.
            <br />
            등급, 랭킹, 점수를 구분해서 보면 제품 비교가 훨씬 직관적입니다.
          </p>
        </div>
      </section>

      <main className="guide-article-page guide-article-page--track-b mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">등급 · 랭킹 · 점수의 차이</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {points.map((point) => (
                <article key={point.title} className="rounded-xl border border-[#e8eef3] bg-[#f9fbfd] p-4">
                  <h3 className="text-sm font-semibold text-[#3f556d]">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{point.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">지표별로 읽는 포인트</h2>
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
            <blockquote className="mt-5 rounded-xl border border-[#eef1f3] bg-[#fbfcfd] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              랭킹은 항상 제품군과 비교 기준을 함께 보는 것이 중요합니다. 음료 랭킹과 바 랭킹을 같은 의미로 읽으면 오해하기 쉽습니다.
            </blockquote>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link href="/ranking" className="inline-flex items-center justify-center rounded-lg border border-[#4a6178] bg-[#4a6178] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3c5065]">
                랭킹 보기 →
              </Link>
              <Link href="/grade-criteria" className="inline-flex items-center justify-center rounded-lg border border-[#d8e2eb] px-5 py-3 text-sm font-semibold text-[#3f556d] transition-colors hover:bg-[#eef4f9]">
                등급 기준 보기 →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
