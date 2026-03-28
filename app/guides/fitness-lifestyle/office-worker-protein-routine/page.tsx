import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "회사원 루틴용 단백질 제품 선택법 | 출근 전, 사무실, 퇴근 후 기준 | ProteinLab",
  description:
    "회사원이 아침, 사무실 간식, 점심 대체, 퇴근 후 운동 루틴에서 어떤 단백질 제품을 고르면 좋은지 상황별로 정리합니다.",
};

const routineRows = [
  ["출근 전 아침이 부족한 날", "쉐이크 또는 식사보완형 제품", "한 끼를 어느 정도 대신해야 하므로 포만감이 있는 쪽이 더 맞습니다."],
  ["오전 간식 대체", "가벼운 RTD 또는 요거트", "업무 중 부담 없이 먹기 좋고 칼로리 과잉도 막기 쉽습니다."],
  ["점심이 늦어지는 날", "단백질 바", "이동성과 보관성이 좋아서 회사 환경에 가장 무난합니다."],
  ["퇴근 후 운동 직후", "20g대 RTD", "운동 후 바로 보충하고 귀가 후 식사로 이어가기 좋습니다."],
  ["야근 중 허기 방어", "저당 RTD 또는 바", "당류가 높은 간식 대신 대체하기 쉬운 제품이 유리합니다."],
];

const decisionCards = [
  {
    title: "식사 대체가 필요한가",
    body: "출근 전 아침처럼 식사 빈칸을 메우는 상황이면 포만감 있는 쉐이크나 식사보완형이 먼저입니다.",
  },
  {
    title: "업무 중 조용하게 먹어야 하는가",
    body: "회의 전후나 자리에서 먹어야 하면 냄새, 소리, 섭취 속도를 같이 봐야 합니다. 바와 RTD가 무난합니다.",
  },
  {
    title: "운동 직후 바로 보충해야 하는가",
    body: "퇴근 후 운동까지 이어진다면 결국 가장 실용적인 건 빠르게 마실 수 있는 RTD입니다.",
  },
];

const commonMistakes = [
  "아침 대용인데 포만감 약한 RTD만 계속 고르는 경우",
  "사무실 간식인데 너무 무겁거나 냄새가 강한 제품을 선택하는 경우",
  "퇴근 후 운동하는데 회복용 제품 없이 일반 간식으로 끝내는 경우",
];

const dailyFlow = [
  {
    title: "아침이 자주 비는 직장인",
    body: "쉐이크나 식사보완형으로 시작하고, 오전 간식은 가벼운 RTD로 이어가는 방식이 안정적입니다.",
  },
  {
    title: "점심이 들쭉날쭉한 직장인",
    body: "서랍에 바를 두고, 점심 공백이 길어질 때만 꺼내는 식으로 관리하는 편이 현실적입니다.",
  },
  {
    title: "퇴근 후 운동하는 직장인",
    body: "운동 전에는 가볍게, 운동 후에는 20g대 RTD로 회복을 붙이는 흐름이 가장 실용적입니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/fitness-lifestyle/commute-protein-guide",
    title: "출근길 제품만 따로 보기",
    body: "이동 중 무엇을 먹기 좋은지에 집중해서 보고 싶다면 출근길 전용 가이드가 더 바로 맞습니다.",
  },
  {
    href: "/guides/fitness-lifestyle/convenience-store-workout-protein",
    title: "퇴근 후 운동용 편의점 제품 보기",
    body: "헬스장 가는 길이나 운동 직후에 바로 살 수 있는 제품군만 따로 비교할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "음료·바·쉐이크 전체 비교",
    body: "직장인 루틴에 어떤 카테고리가 더 맞는지 먼저 넓게 보고 싶다면 이 비교 페이지가 출발점입니다.",
  },
];

export default function OfficeWorkerProteinRoutinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>회사원 루틴용 단백질 제품 선택법</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            회사원 단백질 제품은
            <br />
            출근 전, 사무실, 퇴근 후 루틴이 다 다릅니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            직장인은 한 제품으로 모든 상황을 해결하려고 하면 오래 못 갑니다. 아침 식사 공백, 오전 간식, 점심 지연,
            퇴근 후 운동처럼 하루 루틴을 나눠서 보면 어떤 카테고리가 맞는지 훨씬 빨리 정리됩니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">회사원 루틴별 우선 제품</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 후보</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {routineRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">결국은 이 3가지를 먼저 나눠야 합니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">직장인 루틴별 추천 흐름</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {dailyFlow.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">회사원이 많이 하는 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {commonMistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 바로 보기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
