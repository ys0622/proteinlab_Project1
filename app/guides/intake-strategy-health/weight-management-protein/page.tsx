import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "체중 관리용 단백질 가이드 | ProteinLab",
  description:
    "감량과 유지 단계에서 단백질을 어떻게 활용해야 하는지, 당류와 칼로리까지 함께 보는 기준으로 정리했습니다.",
};

const goalRows = [
  ["감량 초반", "저당 + 적정 단백질", "칼로리와 당류를 먼저 보고 포만감이 유지되는지 확인합니다."],
  ["유지 단계", "균형형 제품", "단백질만 높은 제품보다 식사대용 가능성과 포만감을 함께 봅니다."],
  ["운동 병행", "단백질 충분 + 회복 고려", "감량 중에도 회복이 부족하면 근손실 위험이 커질 수 있습니다."],
];

const compareCards = [
  {
    title: "당류 먼저 보기",
    body: "체중 관리 목적이라면 단백질 양만큼 당류도 중요합니다. 같은 단백질이라도 당류 차이가 꽤 큽니다.",
  },
  {
    title: "칼로리와 포만감 같이 보기",
    body: "칼로리가 너무 낮으면 포만감이 부족하고, 너무 높으면 간식보다 식사대용에 가까워질 수 있습니다.",
  },
  {
    title: "단백질 밀도 확인하기",
    body: "같은 칼로리 안에서 단백질 비중이 얼마나 되는지 보는 지표로, 감량기에 효율을 판단하기 좋습니다.",
  },
];

const avoidList = [
  "체중 관리를 위해 무조건 저칼로리 제품만 고르는 것",
  "단백질 양만 보고 당류를 확인하지 않는 것",
  "식사대용 제품과 가벼운 보충용 제품을 같은 기준으로 비교하는 것",
];

export default function WeightManagementProteinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략 & 건강
            </Link>
            <span>/</span>
            <span>체중 관리용 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            체중 관리는 단백질만으로 결정되지 않습니다
            <br />
            당류와 칼로리 조합까지 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            감량기와 유지기는 좋은 제품 기준이 조금 다릅니다. 단백질이 높아도 당류와 칼로리가 목적에 맞지 않으면 결과가 달라집니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">목표별로 보는 기준</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 기준</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {goalRows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">제품에서 먼저 확인할 것</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {compareCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중 관리용으로 볼 때 흔한 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {avoidList.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              다이어트용 제품이라고 모두 같은 카테고리가 아닙니다. 간식형, 회복형, 식사보완형을 먼저 나누면 비교가 훨씬 쉬워집니다.
            </blockquote>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">WEIGHT-MANAGEMENT NOTE</p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              체중 관리에서 좋은 제품은 가장 낮은 칼로리 제품이 아니라, 내 식사 패턴 안에서 과식을 줄이고 총량을 유지하게 만드는 제품입니다.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
