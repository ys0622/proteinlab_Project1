import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "랩노쉬 슬림쉐이크 추천 | 저당·식사대용 기준 정리 2026",
  description: "랩노쉬 슬림쉐이크를 저당, 식사대용, 다이어트 기준으로 직접 정리했습니다. 당류와 식이섬유를 같이 보면서 한 끼 대체용으로 맞는지 빠르게 확인해보세요.",
};

const strengthCards = [
  {
    title: "저당·식사대용 균형",
    body: "당류가 낮으면서 식이섬유가 포함돼 있어 저당 기준과 식사대용 기준을 동시에 만족하는 경우가 많습니다.",
  },
  {
    title: "다이어트 목적에 적합",
    body: "저당·저칼로리 기준으로 설계된 라인업이라 체중 관리 목적의 소비자에게 잘 맞습니다.",
  },
  {
    title: "온라인 중심 브랜드",
    body: "쿠팡·자사몰 중심으로 유통됩니다. 구독 구매 시 단가가 낮아지는 경우가 있어 정기 구매에 유리합니다.",
  },
];

const faqItems = [
  { question: "랩노쉬 슬림쉐이크는 식사 대신 먹어도 되나요?", answer: "식이섬유와 단백질 균형이 있어 식사대용으로 활용할 수 있습니다. 다만 장기간 식사 대체는 다양한 영양소 섭취를 위해 권장하지 않습니다." },
  { question: "랩노쉬 슬림쉐이크는 어디서 사나요?", answer: "쿠팡, 랩노쉬 공식몰, 네이버쇼핑에서 구매할 수 있습니다. 공식몰 정기 구독 시 할인 혜택이 있을 수 있습니다." },
  { question: "랩노쉬 슬림쉐이크 맛은 어떤가요?", answer: "더블초코맛이 가장 인기 있으며 달지 않은 편입니다. 저당 설계 특성상 일반 쉐이크보다 단맛이 약할 수 있습니다." },
];

export default function LabNosheLimShakePage() {
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
            <span>랩노쉬 슬림쉐이크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK B</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            랩노쉬 슬림쉐이크 추천 | 저당·식사대용 기준 정리
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            다이어트 중이거나 한 끼를 너무 무겁지 않게 대체하고 싶다면 랩노쉬 슬림쉐이크가 가장 먼저 후보로 들어옵니다.
            <br />
            저당과 식사대용 기준으로 왜 많이 비교되는지 핵심만 빠르게 확인해보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">랩노쉬 슬림쉐이크 강점</h2>
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
              <Link href="/guides/product-selection-comparison/low-sugar-protein-shake-guide" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                저당 기준 보기 →
              </Link>
              <Link href="/guides/product-selection-comparison/meal-replacement-protein-shake-guide" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                식사대용 기준 보기 →
              </Link>
              <Link href="/guides/product-selection-comparison/protein-shake-top7" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                TOP 7에서 위치 보기 →
              </Link>
              <Link href="/shake" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
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
