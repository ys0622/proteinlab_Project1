import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "신제품 분석 | ProteinLab",
  description: "새로 나온 단백질 제품을 어떤 기준으로 읽어야 하는지 포지셔닝, 성분, 가격 관점에서 정리했습니다.",
};

const readingFrameCards = [
  {
    title: "포지셔닝 먼저 파악하기",
    body: "신제품이 운동 보완형인지, 다이어트형인지, 식사대용형인지 먼저 정리해야 전체 해석이 쉬워집니다.",
  },
  {
    title: "성분을 직접 확인하기",
    body: "마케팅 문구보다 단백질 g, 당류, 칼로리, 밀도 수치를 직접 읽어야 실제 경쟁력이 보입니다.",
  },
  {
    title: "기존 제품과 비교하기",
    body: "무엇이 새롭고 무엇이 비슷한지, 기존 제품 대비 차별 포인트가 있는지부터 확인해야 합니다.",
  },
  {
    title: "유통 채널 확인하기",
    body: "편의점 전용인지 온라인 중심인지에 따라 가격과 용량 전략이 달라질 수 있습니다.",
  },
];

const checklistRows = [
  ["단백질 함량", "1회 제공량 기준 확인", "20g 이상인지, 밀도가 높은지"],
  ["당류", "g 수치 직접 확인", "저당 타깃이라면 더 엄격히 보기"],
  ["칼로리", "kcal 수치", "보완형인지 식사보완형인지 구분"],
  ["단백질 밀도", "칼로리 대비 단백질 효율", "비슷한 칼로리라면 밀도가 높은 쪽이 유리"],
  ["원료 유형", "유청, 카제인, 식물성 등", "흡수감과 소화 특성이 다를 수 있음"],
  ["브랜드 메시지", "광고 문구 해석", "실제 성분과 타깃이 일치하는지 확인"],
];

const commonMistakes = [
  "신제품이라서 무조건 더 좋을 것이라고 보는 것",
  "브랜드 이미지에만 기대어 SKU별 차이를 놓치는 것",
  "편의점 가격과 온라인 가격 차이를 비교하지 않는 것",
  "마케팅 키워드를 실제 성분 수치와 분리해서 보지 않는 것",
];

export default function NewProductAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
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
            신제품은 마케팅 문구가 강해서 비교 기준이 없으면 읽기 어렵습니다.
            <br />
            포지셔닝, 성분, 유통 채널 관점에서 읽는 법을 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품을 읽는 4가지 프레임</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              새 제품일수록 메시지가 강합니다. 아래 4가지 관점으로 보면 해석이 빨라집니다.
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
              새 제품을 볼 때 아래 항목을 순서대로 확인하면 판단이 빨라집니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품을 볼 때 자주 하는 실수</h2>
            <ul className="mt-4 space-y-3">
              {commonMistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              신제품 분석은 새로움 자체를 평가하는 일이 아니라, 기존 제품 대비 실제 차별 포인트가 있는지 확인하는 과정입니다.
            </blockquote>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
