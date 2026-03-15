import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "다이어트 단백질 음료 기준 | 저당·저칼로리·고단백 밀도 비교 | ProteinLab",
  description:
    "다이어트용 단백질 음료를 고를 때 당류, 칼로리, 단백질 밀도를 어떤 순서로 비교해야 하는지 ProteinLab 기준으로 정리합니다.",
};

const criteriaCards = [
  {
    title: "1. 당류를 먼저 본다",
    body: "체중 관리 목적이라면 단백질 g만 보지 말고 당류 컷을 먼저 걸러야 합니다. 같은 20g 제품이라도 당류 차이로 용도가 달라집니다.",
  },
  {
    title: "2. 칼로리와 포만감을 같이 본다",
    body: "너무 가벼우면 간식형에 가깝고, 너무 높으면 식사 보완형에 가까워집니다. 다이어트용은 이 균형이 중요합니다.",
  },
  {
    title: "3. 마지막이 단백질 밀도다",
    body: "후보를 추린 뒤에는 100kcal당 단백질 효율을 보면 같은 칼로리에서 더 실용적인 제품을 고르기 쉽습니다.",
  },
];

const checklistRows = [
  ["당류", "가급적 먼저 확인", "다이어트 목적이라면 당류가 낮은 제품부터 좁히는 편이 실제 선택과 가깝습니다."],
  ["칼로리", "식사 보완형인지 간식형인지 구분", "칼로리와 포만감 수준을 같이 봐야 맥락을 읽을 수 있습니다."],
  ["단백질 함량", "최소 기준 이상인지 확인", "단백질이 너무 낮으면 보충용으로서 의미가 약해집니다."],
  ["단백질 밀도", "후보군 최종 비교", "비슷한 열량에서 효율을 가르는 마지막 지표입니다."],
];

const thresholdBars = [
  { label: "당류 컷", value: "5g 이하 우선", width: "36%" },
  { label: "칼로리 컷", value: "120~170kcal 체크", width: "58%" },
  { label: "단백질 컷", value: "20g 전후 우선", width: "64%" },
  { label: "밀도 컷", value: "100kcal당 효율 비교", width: "72%" },
];

const flowCards = [
  {
    title: "체중 관리용",
    body: "당류와 칼로리를 먼저 좁힌 뒤, 그 안에서 단백질 밀도와 단백질 함량을 비교하는 흐름이 가장 안정적입니다.",
  },
  {
    title: "식사 보완형",
    body: "칼로리와 포만감이 먼저입니다. 당류가 과하지 않은지 확인한 뒤 단백질이 충분한지 보완적으로 체크합니다.",
  },
  {
    title: "운동 후 가볍게",
    body: "당류가 과하지 않으면서 단백질 밀도가 괜찮은 제품이 유리합니다. 너무 무거우면 식사대용형과 목적이 섞입니다.",
  },
];

export default function DietProteinDrinkGuidePage() {
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
            <span>다이어트 단백질 음료 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            다이어트 단백질 음료는 단백질만 보면 부족합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            체중 관리용 단백질 음료는 단백질 수치만 높다고 끝이 아닙니다.
            <br />
            당류, 칼로리, 단백질 밀도를 어떤 순서로 비교해야 하는지 ProteinLab 기준으로 정리합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다이어트용 음료 기준 3가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {criteriaCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">무엇부터 비교해야 하는지</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">체크 포인트</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">빠르게 보는 기준표</h2>
            <div className="mt-5 space-y-4">
              {thresholdBars.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-[#24543d]">{item.label}</span>
                    <span className="text-[var(--foreground-muted)]">{item.value}</span>
                  </div>
                  <div className="mt-2 h-2.5 rounded-full bg-[#e7efe9]">
                    <div className="h-2.5 rounded-full bg-[#2d6a4f]" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">목적별로 보는 흐름</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {flowCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              다이어트용 단백질 음료는 고단백과 저칼로리만으로 끝나지 않습니다. 너무 가벼우면 포만감이 약하고, 너무 무거우면 식사 보완형에 가까워집니다.
            </blockquote>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
