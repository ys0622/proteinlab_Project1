import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료, 이제 근육 늘리려고만 마시지 않습니다";
const pageDescription =
  "예전에는 근육 생성·근비대 목적의 운동인이 주로 마셨지만, 최근에는 영양 보충과 식사대용 목적으로 마시는 일반 소비자가 크게 늘었습니다. 달라진 소비 이유를 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-mainstream-shift";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: pageTitle,
    description: pageDescription,
  },
};

const quickAnswer = [
  "과거 단백질 음료는 근력 운동·근비대 목적의 소비자가 중심이었지만, 최근에는 운동 여부와 무관하게 영양 보충·식사대용 목적의 소비가 크게 늘었습니다.",
  "목적이 다르면 골라야 할 제품도 달라집니다. 근비대 목적이 아니라면 초고단백보다 20~30g대 중단백 제품이 더 현실적인 경우가 많습니다.",
  "식사대용으로 쓸 경우 단백질 수치만 볼 게 아니라 식이섬유, 포만감, 당류·나트륨까지 함께 확인하는 것이 중요합니다.",
];

const shiftRows = [
  [
    "과거 (운동 중심)",
    "근육 생성·근비대",
    "운동 후 회복, 고강도 트레이닝 보충 목적. 40g 이상 고단백·저당 제품 선호.",
  ],
  [
    "최근 (영양 보충)",
    "바쁜 일상 속 영양 밸런스",
    "식사를 거르거나 간단히 때울 때 단백질과 함께 기본 영양을 채우려는 목적. 20~30g대 중단백 선호.",
  ],
  [
    "최근 (식사대용)",
    "다이어트·시간 절약",
    "한 끼를 대체하는 목적. 단백질뿐 아니라 포만감, 칼로리 총량, 식이섬유가 함께 중요해짐.",
  ],
  [
    "최근 (시니어·건강관리)",
    "근손실 예방·일상 관리",
    "운동 목적이 아니라 나이가 들며 자연스러운 근손실을 막기 위한 예방적 섭취. 소화 부담이 적은 제품 선호.",
  ],
];

const audienceCards = [
  {
    title: "운동을 하지 않는데 마셔도 될까요",
    body: "네, 다만 목적이 다릅니다. 근비대가 목적이 아니라면 초고단백보다 하루 식단에서 부족한 단백질을 채우는 정도(20~30g대)가 더 현실적입니다.",
  },
  {
    title: "식사대용으로 쓸 때 확인할 것",
    body: "단백질 수치만 보지 말고 식이섬유, 포만감, 칼로리, 당류·나트륨을 함께 확인해야 실제 한 끼 대체 효과가 있습니다.",
  },
  {
    title: "시니어·영양 관리 목적이라면",
    body: "고강도 운동 목적 제품보다 소화가 편하고 부담이 적은 제품이 우선입니다. 필요량 이상으로 고단백을 고집할 필요는 없습니다.",
  },
];

const faqItems = [
  {
    question: "운동을 안 해도 단백질 음료를 마셔도 되나요?",
    answer:
      "네, 최근에는 운동 목적이 아니라 영양 보충이나 식사대용으로 마시는 소비자가 늘고 있습니다. 다만 이 경우 초고단백보다 20~30g대 제품이 더 부담 없이 맞습니다.",
  },
  {
    question: "단백질 음료를 식사 대신 먹어도 괜찮나요?",
    answer:
      "단백질 수치만 볼 게 아니라 식이섬유, 포만감, 칼로리, 당류까지 함께 확인해야 합니다. 단백질만 높고 나머지 영양이 부족하면 한 끼 대체로는 부족할 수 있습니다.",
  },
  {
    question: "근육을 키울 목적이 아니어도 고단백 제품이 필요한가요?",
    answer:
      "아닙니다. 근비대 목적이 아니라면 40g 이상 초고단백 제품은 대부분 필요량을 초과합니다. 일상 영양 보충 목적이라면 20~30g대가 더 현실적입니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/protein-drink-without-exercise",
    title: "운동 안 해도 단백질 음료 마셔도 될까",
    body: "비운동자 관점에서 단백질 음료가 필요한 경우를 정리했습니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-meal-replacement",
    title: "단백질 음료 식사대용 가능할까",
    body: "식사대용으로 쓸 때 확인해야 할 영양 구성 기준을 정리했습니다.",
  },
  {
    href: "/topics/mid-protein-alternatives",
    title: "중단백 대안 추천",
    body: "근비대 목적이 아닐 때 더 적합한 20~29g대 제품을 모았습니다.",
  },
];

export default function ProteinDrinkMainstreamShiftPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    faq: faqItems,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략 & 건강</Link>
            <span>/</span>
            <span>대중화된 단백질 음료</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">소비 트렌드</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-07-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료, 이제
            <br />
            근육 늘리려고만 마시지 않습니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            예전에는 헬스장 다니는 사람들의 전유물처럼 여겨졌지만, 최근에는 운동 여부와 상관없이
            바쁜 일상 속 영양 보충이나 한 끼 대용으로 단백질 음료를 찾는 사람이 크게 늘었습니다.
            목적이 달라졌다면 골라야 할 제품 기준도 달라져야 합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e5deca] bg-[#fdfaf5] px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">짧게 답하면</h2>
            <ul className="mt-4 space-y-3">
              {quickAnswer.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#e8e3da] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7a5230]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">소비 이유가 어떻게 달라졌을까</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료 시장이 커지면서 "누가, 왜 마시는지"도 함께 다양해졌습니다. 아래 표는 목적별로
              어떤 소비자가 늘고 있는지, 그에 맞는 제품 방향이 무엇인지 정리한 것입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">구분</th>
                    <th className="px-3 py-3 font-semibold">주요 목적</th>
                    <th className="px-3 py-3 font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0ece5] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동인이 아니어도 궁금할 질문들</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {audienceCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#e8e3da] bg-[#fdfaf5] p-4">
                  <h3 className="text-sm font-semibold text-[#7a5230]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-[#fdfaf5] px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">결론</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료는 더 이상 "운동하는 사람만 먹는 것"이 아니라 일상 영양 관리 수단으로 자리잡고 있습니다.
              내가 운동 목적인지, 영양 보충 목적인지, 식사대용 목적인지에 따라 필요한 단백질 함량과 제품 구성이
              달라지므로, 제품을 고르기 전에 내 목적부터 명확히 하는 것이 가장 중요합니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-[#e8e3da] bg-[#fdfaf5] px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--foreground)]">{item.question}</summary>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 읽기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#e8e3da] bg-[#fdfaf5] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#7a5230]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GuideBuySection />
      <Footer />
    </div>
  );
}
