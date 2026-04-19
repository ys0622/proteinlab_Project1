import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "플라이밀 단백질 쉐이크 추천 | 피넛버터·초코·쿠키앤크림 비교 2026",
  description:
    "플라이밀 단백질 쉐이크를 피넛버터, 초코, 쿠키앤크림 기준으로 직접 비교했습니다. 고단백, 저당, 입문용 중 어떤 맛이 더 맞는지 빠르게 확인해보세요.",
};

const productRows = [
  ["플라이밀 단백질 쉐이크 피넛버터", "24g", "1.2g", "179kcal", "13.4g/100kcal", "고단백·저당 기준 대표 제품"],
  ["플라이밀 단백질 쉐이크 초코", "22g", "3.6g", "150kcal", "14.7g/100kcal", "무난한 균형형"],
  ["플라이밀 단백질 쉐이크 쿠키앤크림", "20.3g", "2.8g", "173kcal", "11.7g/100kcal", "달콤한 맛 중심"],
];

const strengthCards = [
  {
    title: "브랜드 인지도",
    body: "플라이밀은 파우치형 단백질 쉐이크 시장에서 가장 먼저 비교되는 대표 브랜드입니다. 입문자도 많이 찾고 맛 라인업도 넓습니다.",
  },
  {
    title: "피넛버터 강세",
    body: "피넛버터맛은 단백질 24g, 당류 1.2g으로 플라이밀 안에서 가장 성분 경쟁력이 좋습니다. 고단백·저당 기준을 같이 만족합니다.",
  },
  {
    title: "맛 선택 폭",
    body: "초코, 바나나, 곡물, 라떼류까지 맛이 다양합니다. 성분 최우선보다 취향과 재구매 가능성을 같이 보는 사람에게 유리합니다.",
  },
];

const faqItems = [
  {
    question: "플라이밀에서 가장 먼저 볼 제품은 무엇인가요?",
    answer: "성분 기준으로는 피넛버터맛을 먼저 보는 편이 좋습니다. 단백질 24g, 당류 1.2g으로 플라이밀 라인업 안에서 고단백·저당 균형이 가장 좋습니다.",
  },
  {
    question: "플라이밀은 식사대용으로도 괜찮나요?",
    answer: "일부 제품은 칼로리와 맛 만족도가 있어 식사 보완용으로 볼 수 있습니다. 다만 식사대용 목적이라면 식이섬유와 칼로리까지 같이 확인하는 것이 좋습니다.",
  },
  {
    question: "플라이밀과 단백하니 중 어느 쪽이 더 저당인가요?",
    answer: "대표 제품 기준으로는 플라이밀 피넛버터가 당류 1.2g으로 낮습니다. 다만 칼로리와 단백질 밀도까지 같이 보면 단백하니가 더 유리한 맛도 있습니다.",
  },
];

export default function FlymillProteinShakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">
              제품 선택 & 비교
            </Link>
            <span>/</span>
            <span>플라이밀 단백질 쉐이크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            플라이밀 단백질 쉐이크 추천 | 피넛버터·초코·쿠키앤크림 비교
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            플라이밀은 고단백과 저당 기준에서 가장 먼저 비교되는 쉐이크 브랜드 중 하나입니다.
            <br />
            피넛버터처럼 고단백·저당 쪽이 더 맞는지, 초코·쿠키앤크림처럼 무난한 입문형이 더 맞는지 성분 기준으로 바로 좁혀보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">종류별 성분 비교</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품명</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">당류</th>
                    <th className="px-3 py-3 font-semibold">칼로리</th>
                    <th className="px-3 py-3 font-semibold">단백질 밀도</th>
                    <th className="px-3 py-3 font-semibold">특징</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td
                          key={cell}
                          className={`px-3 py-3 ${i === 0 ? "font-medium text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}
                        >
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">플라이밀 쉐이크 강점</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {strengthCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-[#fdfaf5] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">💬 자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-[#dce8df] bg-white px-5 py-4">
                  <p className="text-sm font-semibold text-[#24543d]">Q. {item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/product-selection-comparison/flymill-vs-danbaekhani"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                단백하니와 바로 비교 →
              </Link>
              <Link
                href="/guides/product-selection-comparison/oliveyoung-protein-shake"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                올리브영 쉐이크 추천 보기 →
              </Link>
              <Link
                href="/guides/product-selection-comparison/protein-shake-top7"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                TOP 7에서 위치 보기 →
              </Link>
              <Link
                href="/shake"
                className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                쉐이크 제품 바로 비교 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
