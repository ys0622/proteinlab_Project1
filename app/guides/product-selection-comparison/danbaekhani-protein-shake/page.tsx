import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백하니 단백질 쉐이크 추천 | 시그니처·초코·말차 비교 2026",
  description:
    "단백하니 단백질 쉐이크를 시그니처, 초코, 말차 기준으로 직접 비교했습니다. 저당, 칼로리, 단백질 밀도를 함께 보며 어떤 맛이 더 잘 맞는지 빠르게 확인해보세요.",
};

const productRows = [
  ["단백하니 단백질 쉐이크 시그니처", "22g", "2g", "155kcal", "14.2g/100kcal", "균형형 대표 제품"],
  ["단백하니 단백질 쉐이크 초코", "22g", "2g", "145kcal", "15.2g/100kcal", "무난한 입문형"],
  ["단백하니 단백질 쉐이크 말차", "22g", "2g", "140kcal", "15.7g/100kcal", "칼로리 가장 낮고 밀도 우수"],
];

const strengthCards = [
  {
    title: "칼로리와 밀도 균형",
    body: "단백하니는 단백질 22g을 유지하면서 칼로리를 140~155kcal 수준으로 잡아 단백질 밀도 기준이 안정적입니다.",
  },
  {
    title: "맛 선택 폭",
    body: "시그니처, 초코, 말차로 맛 포지션이 분명합니다. 성분이 크게 흔들리지 않으면서 취향 선택이 가능한 점이 장점입니다.",
  },
  {
    title: "올리브영 노출",
    body: "올영픽과 협업 이슈로 인지도가 올라간 브랜드입니다. 오프라인 테스트나 단품 구매를 고려하는 사람에게 접근성이 좋습니다.",
  },
];

const faqItems = [
  {
    question: "단백하니에서 가장 먼저 볼 맛은 무엇인가요?",
    answer: "성분 기준으로는 말차가 가장 가볍습니다. 칼로리 140kcal, 단백질 22g, 당류 2g으로 단백질 밀도가 가장 높아 첫 비교 후보로 좋습니다.",
  },
  {
    question: "단백하니는 저당 쉐이크로 봐도 되나요?",
    answer: "세 제품 모두 당류 2g으로 ProteinLab 저당 기준인 3g 이하를 충족합니다. 저당이면서 칼로리와 단백질 균형도 안정적인 편입니다.",
  },
  {
    question: "단백하니와 플라이밀 중 어느 쪽이 더 가벼운가요?",
    answer: "칼로리 기준으로는 단백하니가 더 가볍습니다. 플라이밀은 피넛버터맛처럼 고단백 강점이 있고, 단백하니는 칼로리와 맛 선택 폭이 더 강점입니다.",
  },
];

export default function DanbaekhaniProteinShakePage() {
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
            <span>단백하니 단백질 쉐이크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백하니 단백질 쉐이크 추천 | 시그니처·초코·말차 비교
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백하니는 저당 기준을 유지하면서도 칼로리와 맛 선택 폭 균형이 좋아 처음 고르는 사람에게 자주 비교됩니다.
            <br />
            시그니처, 초코, 말차 중 어떤 맛이 더 가볍고 저당 기준에 잘 맞는지 성분 기준으로 바로 확인해보세요.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백하니 쉐이크 강점</h2>
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
                플라이밀과 바로 비교 →
              </Link>
              <Link
                href="/guides/product-selection-comparison/oliveyoung-protein-shake"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                올리브영 쉐이크 추천 보기 →
              </Link>
              <Link
                href="/guides/product-selection-comparison/protein-shake-for-women"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                여성용 쉐이크 기준 보기 →
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
