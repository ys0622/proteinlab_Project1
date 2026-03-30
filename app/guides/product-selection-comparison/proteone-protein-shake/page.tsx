import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "프로티원 단백질 쉐이크 추천 | 성분·종류 비교 | ProteinLab",
  description: "프로티원 단백질 쉐이크 종류별 단백질·당류·칼로리를 비교했습니다. 초코·커피맛 중 어떤 제품이 내 목적에 맞는지 확인해보세요.",
};

const productRows = [
  ["프로티원 단백쉐이크 초코맛", "23g", "1g", "128kcal", "18.0g/100kcal", "고단백·저칼로리 균형"],
  ["프로티원 단백쉐이크 커피맛", "22g", "1g", "108kcal", "20.4g/100kcal", "칼로리 최저·밀도 최고"],
];

const strengthCards = [
  {
    title: "단백질 밀도 상위권",
    body: "프로티원 커피맛은 단백질 밀도 20.4g/100kcal로 전체 쉐이크 중 최상위권입니다. 같은 칼로리 대비 단백질을 가장 효율적으로 섭취할 수 있습니다.",
  },
  {
    title: "저당·저칼로리",
    body: "두 제품 모두 당류 1g으로 저당 기준을 충족합니다. 커피맛은 칼로리 108kcal로 전체 쉐이크 중 가장 낮은 수준입니다.",
  },
  {
    title: "고단백",
    body: "초코맛 기준 단백질 23g으로 고단백 기준을 충족합니다. 운동 후 보충용으로 단백질 밀도와 함량 모두 좋은 편입니다.",
  },
];

const faqItems = [
  { question: "프로티원 초코맛과 커피맛 중 뭐가 더 좋나요?", answer: "칼로리를 최대한 낮추고 싶다면 커피맛(108kcal)이 유리합니다. 단백질 함량을 조금 더 높이고 싶다면 초코맛(23g)이 더 맞습니다." },
  { question: "프로티원 쉐이크는 운동 후에 먹어도 되나요?", answer: "네, 고단백·저당·저칼로리 균형이 좋아 운동 후 보충용으로 적합합니다. 단백질 밀도가 높아 효율적인 보충이 가능합니다." },
  { question: "프로티원 쉐이크는 어디서 살 수 있나요?", answer: "쿠팡, 네이버쇼핑, 공식몰 등 온라인 채널에서 구매할 수 있습니다. 올리브영 등 오프라인 채널도 확인해보세요." },
];

export default function ProteoneProteinShakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">제품 선택 & 비교</Link>
            <span>/</span>
            <span>프로티원 단백질 쉐이크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK B</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            프로티원 단백질 쉐이크 종류별 비교
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            프로티원 단백질 쉐이크는 고단백·저당·저칼로리 균형이 뛰어난 브랜드입니다.
            <br />
            초코맛·커피맛 종류별 성분을 직접 비교해서 목적에 맞는 제품을 고르세요.
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
                        <td key={cell} className={`px-3 py-3 ${i === 0 ? "font-medium text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">프로티원 쉐이크 강점</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {strengthCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
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
              <Link href="/guides/product-selection-comparison/post-workout-protein-shake-guide" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                운동 후 단백질 쉐이크 가이드 →
              </Link>
              <Link href="/shake" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                쉐이크 전체 비교 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
