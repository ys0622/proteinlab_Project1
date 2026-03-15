import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 바 선택 가이드 | ProteinLab",
  description:
    "단백질 바를 간식용, 식사 보완용, 운동 후 보충용으로 나눠 보고 당류, 칼로리, 단백질 밀도를 비교하는 기준을 정리합니다.",
};

const barRules = [
  {
    title: "간식형 바",
    body: "가볍게 먹는 용도라면 단백질 10~15g 전후인지, 당류와 칼로리가 과하지 않은지 먼저 확인하는 편이 실용적입니다.",
  },
  {
    title: "식사 보완형 바",
    body: "포만감과 총열량이 중요합니다. 단백질만 보지 말고 칼로리, 지방, 당류를 함께 봐야 식사 대용과 가까운지 판단할 수 있습니다.",
  },
  {
    title: "운동 후 보충형 바",
    body: "단백질 자체가 높아도 당류 구성이 과하거나 밀도가 낮으면 효율은 떨어질 수 있어 성분 조합을 같이 봐야 합니다.",
  },
];

const pitfalls = [
  "단백질 총량만 보고 고르면 당류와 칼로리가 예상보다 높은 제품을 고를 수 있습니다.",
  "표기상 멀티팩 상품은 1개 기준인지 전체 기준인지 다시 확인해야 비교 실수를 줄일 수 있습니다.",
  "단백질 바는 이름보다 용도가 중요합니다. 간식형과 식사 보완형을 같은 기준으로 보면 판단이 흐려집니다.",
];

const barMatrix = [
  ["간식형", "10~15g", "가능하면 낮게", "가볍게 먹는 용도"],
  ["식사 보완형", "12~20g", "중간 수준 허용", "포만감과 총열량을 같이 보기"],
  ["운동 후 보충형", "15g+", "과하지 않게 체크", "단백질 밀도와 당류 균형"],
];

export default function ProteinBarGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>단백질 바 선택 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 바는 간식형인지 식사 보완형인지부터 구분해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 단백질 바라도 간식형, 식사 보완형, 운동 후 보충형은 비교 기준이 다릅니다.
            <br />
            단백질 수치 하나보다 당류, 칼로리, 단백질 밀도를 어떤 맥락에서 보는지가 더 중요합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 구분해야 하는 3가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {barRules.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">용도별 체크 매트릭스</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">유형</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">당류</th>
                    <th className="px-3 py-3 font-semibold">대표 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {barMatrix.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 바를 볼 때 자주 놓치는 포인트</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {pitfalls.map((item) => (
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
