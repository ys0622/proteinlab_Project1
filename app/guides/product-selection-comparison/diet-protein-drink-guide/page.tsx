import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "다이어트 단백질 음료 기준 | 저당·저칼로리·단백질 밀도 비교 | ProteinLab",
  description:
    "다이어트용 단백질 음료를 고를 때 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떻게 함께 봐야 하는지 정리한 가이드입니다.",
};

const criteriaCards = [
  {
    title: "1. 당류를 먼저 본다",
    body: "체중 관리 목적이라면 단백질 함량만 보지 말고 당류를 먼저 거르는 편이 안전합니다.",
  },
  {
    title: "2. 칼로리와 포만감을 같이 본다",
    body: "너무 가벼운 제품은 간식형에 가깝고, 너무 높은 제품은 식사 보완형에 가까울 수 있습니다.",
  },
  {
    title: "3. 단백질 밀도로 마지막 비교를 한다",
    body: "남은 후보끼리는 단백질 밀도와 단백질 함량을 함께 보면서 효율을 비교하는 편이 좋습니다.",
  },
];

const checklistRows = [
  ["당류", "가장 먼저 확인", "다이어트 목적이라면 당류가 낮은 제품부터 좁혀야 실제 선택이 쉬워집니다."],
  ["칼로리", "식사 보완형인지 구분", "간식형인지 식사 보완형인지에 따라 적정 칼로리 범위가 달라집니다."],
  ["단백질 함량", "최소 기준 확인", "단백질이 충분하지 않으면 포만감과 보완용 가치가 약해질 수 있습니다."],
  ["단백질 밀도", "숫자 조합 확인", "같은 칼로리와 용량이라면 단백질 밀도가 높은 제품이 더 효율적일 수 있습니다."],
];

const flowCards = [
  {
    title: "체중 관리용",
    body: "저당과 적당한 칼로리를 먼저 보고, 그다음 단백질 함량과 밀도를 같이 확인하는 흐름이 적합합니다.",
  },
  {
    title: "식사 보완용",
    body: "칼로리와 포만감을 먼저 보고, 당류가 지나치게 높지 않은지 확인한 뒤 단백질 함량을 비교하는 편이 좋습니다.",
  },
  {
    title: "운동 후 가볍게",
    body: "당류가 과하지 않으면서 단백질 밀도가 적당한 제품이 비교에 유리합니다.",
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
            체중 관리용 단백질 음료는 단백질 함량만 높은 제품보다 당류, 칼로리, 단백질 밀도를 함께 봐야 비교가 정확해집니다.
            <br />
            ProteinLab 기준으로 다이어트용 단백질 음료를 고를 때 먼저 볼 숫자와 비교 순서를 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다이어트용 단백질 음료 핵심 기준 3가지</h2>
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
              다이어트용 단백질 음료는 저당, 저칼로리만으로 끝나지 않습니다. 너무 가벼우면 포만감이 약하고, 너무 무거우면 간식보다 식사 보완형에 가까워집니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/picks/diet-a"
                className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                다이어트용 단백질 음료 보기
              </Link>
              <Link
                href="/guides/product-selection-comparison/protein-drink-guide"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                단백질 음료 선택 가이드
              </Link>
              <Link
                href="/ranking"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                랭킹 보기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
