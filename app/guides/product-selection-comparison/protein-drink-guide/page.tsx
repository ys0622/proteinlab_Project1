import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 음료 선택 가이드 | ProteinLab",
  description:
    "단백질 음료를 고를 때 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떤 순서로 봐야 하는지 ProteinLab 기준으로 정리합니다.",
};

const checklistRows = [
  ["단백질 함량", "한 병당 20g 전후인지 먼저 확인", "운동 후 보충용인지 식사 보완용인지 1차 판단이 빨라집니다."],
  ["당류", "체중 관리 목적이면 가장 먼저 체크", "단백질이 높아도 당류가 높으면 실제 사용 맥락이 달라집니다."],
  ["칼로리", "식사 보완형인지 가벼운 보충형인지 구분", "칼로리가 낮으면 가벼운 보충, 높으면 식사 보완형에 가깝습니다."],
  ["단백질 밀도", "비슷한 후보 압축용", "같은 칼로리에서 어떤 제품이 더 효율적인지 마지막 비교에서 유용합니다."],
];

const drinkTypes = [
  {
    title: "밀크셰이크형 RTD",
    body: "포만감이 높은 편이라 식사 보완형으로 연결되기 쉽습니다. 당류와 칼로리를 같이 봐야 실제 목적과 맞는지 판단할 수 있습니다.",
  },
  {
    title: "워터형 RTD",
    body: "운동 중간이나 직후에 가볍게 마시기 좋습니다. 상대적으로 저칼로리 제품이 많아 체중 관리용 후보군으로도 자주 들어옵니다.",
  },
  {
    title: "고단백 보충형",
    body: "30g 전후 고단백 제품은 운동 후 보충에는 강점이 있지만, 칼로리와 당류가 함께 높은지 반드시 확인해야 합니다.",
  },
];

const flowCards = [
  {
    title: "운동 후 보충",
    body: "단백질 함량과 단백질 밀도를 먼저 보고, 당류가 과하지 않은지 확인하는 흐름이 보통 가장 적합합니다.",
  },
  {
    title: "식사 보완",
    body: "칼로리와 포만감이 먼저입니다. 그다음 단백질 함량을 비교해야 식사 보완 목적에 맞는 제품을 고를 수 있습니다.",
  },
  {
    title: "체중 관리",
    body: "당류와 칼로리를 먼저 좁히고, 마지막에 단백질 밀도와 단백질 함량을 비교하는 편이 실수 확률을 줄여줍니다.",
  },
];

const comparisonSteps = [
  { title: "1차", body: "유형부터 나누기", note: "워터형 / 밀크형 / 식사보완형" },
  { title: "2차", body: "당류·칼로리 거르기", note: "체중 관리와 식사 보완을 구분" },
  { title: "3차", body: "단백질 함량 비교", note: "20g 전후, 30g 이상 등 목적별 기준" },
  { title: "4차", body: "단백질 밀도 확인", note: "비슷한 후보끼리 마지막 압축" },
];

export default function ProteinDrinkGuidePage() {
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
            <span>단백질 음료 선택 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료는 숫자를 보는 순서가 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료는 무엇부터 비교해야 할지 모르면 제품이 많을수록 오히려 선택이 어려워집니다.
            <br />
            단백질 함량, 당류, 칼로리, 단백질 밀도는 목적에 따라 우선순위가 달라집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 봐야 하는 4가지</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">체크 포인트</th>
                    <th className="px-3 py-3 font-semibold">왜 중요한가</th>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">음료 유형별로 보는 법</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {drinkTypes.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">비교 순서 인포그래픽</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {comparisonSteps.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#2d6a4f]">{item.title}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.body}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별 비교 흐름</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {flowCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              비교에서 중요한 것은 숫자 하나가 아니라 조합입니다. 단백질이 높아도 당류와 칼로리가 함께 높으면 실제 용도는 완전히 달라질 수 있습니다.
            </blockquote>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
