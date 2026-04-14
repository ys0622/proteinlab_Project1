import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "영양성분 기준 정리 | 단백질 제품 비교할 때 먼저 볼 숫자",
  description:
    "단백질 제품을 고를 때 먼저 확인할 단백질, 당류, 칼로리, 단백질 바 기준을 목적별로 정리했습니다. 비교 전에 최소 기준부터 빠르게 잡아보세요.",
};

const criteria = [
  ["단백질 함량", "20g 전후", "일반 보충용과 고단백 제품을 구분할 때 가장 많이 쓰는 기본 기준입니다."],
  ["단백질 바", "10~20g", "같은 칼로리에서 얼마나 효율적인지 볼 때 자주 쓰이는 기준입니다."],
  ["당류", "가능한 한 낮게", "다이어트나 저당 목적이라면 다른 숫자보다 먼저 확인하는 편이 실용적입니다."],
  ["칼로리", "용도별 허용 범위 설정", "아침 대용인지, 간식인지에 따라 먼저 허용 범위를 정해야 비교가 빨라집니다."],
];

const notes = [
  "기준은 절대값이 아니라 출발점에 가깝습니다.",
  "운동 후 보충, 체중 관리, 식사 보완처럼 목적에 따라 우선순위는 달라집니다.",
  "같은 기준이라도 음료와 바, 요거트와 쉐이크는 해석이 다를 수 있어 카테고리 구분이 필요합니다.",
];

export default function NutritionCriteriaPage() {
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
            <span>영양성분 기준 정리</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            영양성분 기준만 잡아도 제품 비교가 훨씬 쉬워집니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            기준 없이 숫자만 보면 제품을 많이 볼수록 더 헷갈리기 쉽습니다.
            <br />
            단백질, 당류, 칼로리, 단백질 바에서 최소 기준만 먼저 잡아도 불필요한 후보를 빠르게 줄일 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">기본 비교 기준</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">기준은 외울 필요가 없습니다</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {notes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
