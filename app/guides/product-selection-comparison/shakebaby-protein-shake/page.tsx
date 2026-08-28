import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";

export const metadata = {
  alternates: { canonical: "https://proteinlab.kr/guides/product-selection-comparison/shakebaby-protein-shake" },
  title: "쉐이크베이비 단백질 쉐이크 추천 | 초코·딸기·말차·곡물·스윗콘 비교 2026",
  description:
    "쉐이크베이비 단백질 쉐이크 5종을 초코, 딸기, 말차, 곡물, 스윗콘 플레이크 기준으로 직접 비교했습니다. 단백질, 당류, 칼로리, 단백질 밀도를 함께 보며 어떤 맛이 더 잘 맞는지 빠르게 확인해보세요.",
};

const productRows = [
  ["쉐이크베이비 단백질 쉐이크 (초코맛)", "22g", "2g", "163kcal", "13.5g/100kcal", "단백질 총량 가장 높음"],
  ["쉐이크베이비 단백질 쉐이크 (말차맛)", "21g", "2g", "164kcal", "12.8g/100kcal", "은은한 맛·무난한 두 번째 선택"],
  ["쉐이크베이비 단백질 쉐이크 (스윗콘 플레이크맛)", "20g", "3g", "163kcal", "12.3g/100kcal", "디저트형 맛"],
  ["쉐이크베이비 단백질 쉐이크 (딸기맛)", "20g", "3g", "167kcal", "12.0g/100kcal", "산뜻한 맛 선호 시"],
  ["쉐이크베이비 단백질 쉐이크 (곡물맛)", "20g", "2g", "166kcal", "12.0g/100kcal", "담백한 맛 선호 시"],
];

const strengthCards = [
  {
    title: "맛 선택 폭이 5종으로 가장 넓다",
    body: "초코, 딸기, 말차, 곡물, 스윗콘 플레이크까지 한 브랜드 안에서 고를 수 있는 맛이 많아 취향에 따라 바꿔가며 마시기 좋습니다.",
  },
  {
    title: "단백질·칼로리 편차가 작다",
    body: "5종 모두 단백질 20~22g, 칼로리 163~167kcal 구간에 몰려 있어 맛만 바꿔도 영양 설계가 크게 흔들리지 않습니다.",
  },
  {
    title: "당류도 2~3g대로 안정적",
    body: "전 라인이 당류 3g 이하라 저당 기준으로도 무난하게 후보에 넣을 수 있습니다.",
  },
];

const faqItems = [
  {
    question: "쉐이크베이비에서 가장 먼저 볼 맛은 무엇인가요?",
    answer: "단백질 총량 기준으로는 초코맛이 22g으로 가장 높습니다. 처음이라면 초코맛이나 말차맛부터 시작하는 편이 무난합니다.",
  },
  {
    question: "쉐이크베이비는 저당 쉐이크로 봐도 되나요?",
    answer: "5종 모두 당류 2~3g으로 ProteinLab 저당 기준인 3g 이하를 충족합니다. 저당이면서 맛 선택 폭이 넓은 편입니다.",
  },
  {
    question: "쉐이크베이비와 단백하니 중 어느 쪽이 더 맞나요?",
    answer: "칼로리와 밀도는 단백하니가 조금 더 가볍고, 쉐이크베이비는 맛 종류가 더 다양합니다. 숫자 우선이면 단백하니, 맛 다양성이 우선이면 쉐이크베이비가 더 잘 맞습니다.",
  },
];

export default function ShakebabyProteinShakePage() {
  const jsonLd = buildGuideJsonLd({
    title: "쉐이크베이비 단백질 쉐이크 추천 | 초코·딸기·말차·곡물·스윗콘 비교 2026",
    description:
      "쉐이크베이비 단백질 쉐이크 5종을 초코, 딸기, 말차, 곡물, 스윗콘 플레이크 기준으로 직접 비교했습니다. 단백질, 당류, 칼로리, 단백질 밀도를 함께 보며 어떤 맛이 더 잘 맞는지 빠르게 확인해보세요.",
    url: "https://proteinlab.kr/guides/product-selection-comparison/shakebaby-protein-shake",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}

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
            <span>쉐이크베이비 단백질 쉐이크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            쉐이크베이비 단백질 쉐이크 추천 | 초코·딸기·말차·곡물·스윗콘 비교
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            쉐이크베이비는 5가지 맛을 한 번에 갖춘 신규 브랜드로, 단백질과 칼로리 편차가 작아 맛으로 고르기 좋습니다.
            <br />
            초코, 딸기, 말차, 곡물, 스윗콘 플레이크 중 어떤 맛이 더 가볍고 저당 기준에 잘 맞는지 성분 기준으로 바로 확인해보세요.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">쉐이크베이비 쉐이크 강점</h2>
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
                href="/guides/product-selection-comparison/shakebaby-vs-danbaekhani"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                단백하니와 바로 비교 →
              </Link>
              <Link
                href="/guides/product-selection-comparison/protein-shake-top7"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                쉐이크 TOP 7 보기 →
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
      <GuideBuySection />
      <Footer />
    </div>
  );
}
