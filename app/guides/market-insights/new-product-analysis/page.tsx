import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "신제품 분석 | ProteinLab",
  description: "새로 나온 단백질 제품을 어떤 기준으로 읽어야 하는지 포지션, 성분, 타겟 관점에서 정리했습니다.",
};

const readingFrameCards = [
  {
    title: "포지션부터 파악하기",
    body: "신제품이 어떤 소비자를 겨냥하는지 먼저 봐야 합니다. 운동 보충·다이어트·식사대용·고령 건강 중 어디인지에 따라 성분 해석이 달라집니다.",
  },
  {
    title: "성분표 직접 확인",
    body: "마케팅 문구보다 단백질 g, 당류, 칼로리, 단백질 밀도를 직접 확인해야 합니다. 강조하는 키워드와 실제 수치가 다른 경우가 많습니다.",
  },
  {
    title: "기존 제품과 비교",
    body: "신제품은 기존 제품과 비교했을 때 무엇이 다른지가 핵심입니다. 단백질 함량, 당류, 칼로리, 가격을 같은 카테고리 제품과 나란히 봐야 합니다.",
  },
  {
    title: "유통 채널 확인",
    body: "편의점 전용인지 온라인 중심인지에 따라 가격과 용량이 다릅니다. 채널별 전략이 다를 수 있어 구매 전 확인이 필요합니다.",
  },
];

const checklistRows = [
  ["단백질 함량", "한 병·개당 g 수치", "20g 이상인지, 밀도가 높은지"],
  ["당류", "g 수치 직접 확인", "저당 표기라도 절대값 확인 필요"],
  ["칼로리", "kcal 수치", "보충용인지 식사 보완형인지 판단"],
  ["단백질 밀도", "칼로리 대비 단백질 효율", "비슷한 칼로리라면 밀도 높은 쪽이 유리"],
  ["원료 단백질 종류", "유청·카제인·식물성 등", "흡수 속도와 소화 특성 차이 있음"],
  ["포지션 타겟", "마케팅 메시지 분석", "실제 성분과 타겟이 맞는지 확인"],
];

const commonMistakes = [
  "신제품이라서 무조건 더 좋을 것이라는 기대 — 성분 수치는 직접 확인해야 합니다.",
  "브랜드 인지도만 보고 선택 — 같은 브랜드라도 라인별로 성분과 포지션이 다릅니다.",
  "편의점 가격이 온라인보다 비쌀 수 있다는 점을 놓치는 경우 — 채널별 가격 비교가 필요합니다.",
  "마케팅 키워드(저당, 고단백 등)를 그대로 믿는 경우 — 기준이 제품마다 다를 수 있습니다.",
];

export default function NewProductAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">시장 인사이트</Link>
            <span>/</span>
            <span>신제품 분석</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            새로 나온 단백질 제품, 어떤 기준으로 읽어야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            신제품은 마케팅 메시지가 강하고 비교 기준이 없어 판단하기 어렵습니다.
            <br />
            포지션, 성분, 유통 채널 관점에서 읽는 법을 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품을 읽는 4가지 프레임</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              새 제품일수록 마케팅 메시지가 강합니다. 이 4가지 관점으로 보면 실체가 보입니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {readingFrameCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품 체크리스트</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              새 제품을 볼 때 이 항목들을 순서대로 확인하면 판단이 빨라집니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">확인 방법</th>
                    <th className="px-3 py-3 font-semibold">판단 기준</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td key={cell} className={`px-3 py-3 ${i === 0 ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품 볼 때 자주 하는 실수</h2>
            <ul className="mt-4 space-y-3">
              {commonMistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/market-insights/brand-analysis"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                브랜드 분석 보기 →
              </Link>
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
                제품 비교하기 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
