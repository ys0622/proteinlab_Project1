import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "영양성분 기준 잡기 | ProteinLab",
  description:
    "좋은 제품을 고를 때 참고할 수 있는 단백질, 당류, 칼로리, 단백질 밀도 기준을 정리합니다.",
};

const criteria = [
  ["단백질 음료", "20g 전후", "일반 보충과 회복용 비교의 시작점으로 보기 좋습니다."],
  ["단백질 바", "10~20g", "간식형과 식사 보완형을 구분하는 기준으로 유용합니다."],
  ["당류", "낮을수록 유리", "저당 목적이라면 다른 숫자보다 먼저 확인하는 편이 안전합니다."],
  ["단백질 밀도", "A~B 우선", "열량 대비 단백질 효율을 빠르게 판단할 수 있습니다."],
];

const notes = [
  "기준은 절대값이라기보다 출발점에 가깝습니다.",
  "운동 후 회복, 체중 관리, 식사 보완처럼 목적에 따라 우선순위는 달라질 수 있습니다.",
  "같은 기준이라도 음료와 바는 섭취 맥락이 달라서 해석을 구분해야 합니다.",
];

export default function NutritionCriteriaPage() {
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
            <span>영양성분 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            성분표를 볼 때 최소 기준을 먼저 잡아두면 비교가 쉬워집니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            기준이 없으면 숫자가 많아질수록 비교가 더 어려워집니다.
            <br />
            단백질, 당류, 칼로리 — 항목별 최소 기준을 먼저 잡아두면 필요한 제품만 빠르게 걸러낼 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">기본 기준표</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">기준</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((row) => (
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">기준을 볼 때 같이 기억할 점</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {notes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/product-selection-comparison/nutrition-comparison"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                영양성분 비교 읽는 법 →
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                내 목적에 맞는 제품 찾기 →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
