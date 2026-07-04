import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "고단백 음료 부담·부작용 — 60g 제품까지 나온 지금 알아야 할 것";
const pageDescription =
  "단백질 40~60g대 초고함량 음료가 늘면서 소화 부담, 신장 부담, 과다 섭취 우려가 함께 커지고 있습니다. 실제로 문제가 되는 경우와 아닌 경우를 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/high-protein-side-effects";

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
  "신장 기능이 정상인 성인이 일시적으로 40~60g을 섭취하는 것 자체는 일반적으로 심각한 위험으로 보지 않습니다.",
  "다만 소화 부담(더부룩함, 가스, 묽은 변)은 실제로 흔하게 나타나는 반응이며, 한 번에 먹는 양을 줄이면 개선되는 경우가 많습니다.",
  "기존 신장질환, 당뇨 합병증 등 단백질 제한이 필요한 상태라면 고함량 제품을 임의로 늘리지 말고 반드시 전문가와 먼저 상담해야 합니다.",
];

const concernRows = [
  [
    "소화 불편 (더부룩함·가스·묽은 변)",
    "흔함",
    "한 번에 흡수 가능한 양을 넘어서면 장에서 미처리 단백질이 늘어나 발생하기 쉽습니다. 20~30g씩 나눠 마시면 대부분 완화됩니다.",
  ],
  [
    "신장 부담 우려",
    "건강한 성인은 낮음",
    "정상 신기능인 경우 장기간 고단백 식단의 신장 손상 근거는 명확하지 않습니다. 다만 기존 신장질환자는 예외입니다.",
  ],
  [
    "칼로리·나트륨 과다",
    "제품에 따라 다름",
    "고단백 제품일수록 칼로리·나트륨도 함께 높은 경우가 있어 단백질 수치만 보고 고르면 안 됩니다.",
  ],
  [
    "맛 피로감으로 인한 중도 포기",
    "매우 흔함",
    "고함량 제품은 농도가 진해 단맛·비린맛이 강하게 느껴지는 경우가 많습니다. 완주 못 할 제품보다 매일 마실 수 있는 제품이 낫습니다.",
  ],
];

const whoShouldCareCards = [
  {
    title: "이런 분은 60g대도 검토 가능",
    body: "체중이 많이 나가고 근력 운동 강도가 높으며, 하루 단백질 목표량 자체가 150g을 넘는 경우. 그래도 한 번에 다 마시기보다 나눠 마시는 방법을 권장합니다.",
  },
  {
    title: "이런 분은 40g대도 부담일 수 있음",
    body: "평소 운동을 거의 하지 않거나, 식사에서 이미 단백질을 충분히 섭취하고 있는 경우. 이때 고함량 제품은 필요량을 크게 초과할 수 있습니다.",
  },
  {
    title: "이런 분은 전문가 상담이 먼저",
    body: "신장질환, 통풍, 특정 대사질환이 있는 경우. 고단백 제품을 스스로 판단해 늘리지 말고 담당 의료진과 먼저 상의해야 합니다.",
  },
];

const faqItems = [
  {
    question: "프로틴 60g 한 번에 마셔도 되나요?",
    answer:
      "신장 기능이 정상인 성인이라면 60g을 한 번에 마시는 것 자체가 즉시 위험한 것은 아닙니다. 다만 소화 부담(더부룩함, 가스)이 흔하게 나타날 수 있어 나눠 마시는 것을 권장합니다.",
  },
  {
    question: "단백질을 너무 많이 먹으면 부작용이 있나요?",
    answer:
      "건강한 성인 기준으로는 장기간 고단백 식단이 신장을 손상시킨다는 근거는 명확하지 않습니다. 다만 소화 불편, 칼로리·나트륨 과다 섭취는 실제로 흔히 발생하는 문제입니다.",
  },
  {
    question: "40g대 고단백 음료도 부담스러운데 괜찮은 건가요?",
    answer:
      "평소 운동을 하지 않거나 식사에서 이미 단백질을 충분히 섭취하고 있다면 40g대도 필요량을 초과할 수 있습니다. 이 경우 20~29g대 중단백 제품이 더 적합할 수 있습니다.",
  },
  {
    question: "신장질환이 있는데 고단백 음료를 먹어도 되나요?",
    answer:
      "신장질환, 통풍 등 단백질 섭취 제한이 필요한 상태라면 고함량 제품을 임의로 늘리지 말고 반드시 담당 의료진과 먼저 상담해야 합니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/protein-50g-at-once",
    title: "단백질 50g, 한 번에 먹어도 될까",
    body: "체중별·타이밍별로 50g 섭취가 적절한지 판단하는 기준을 정리했습니다.",
  },
  {
    href: "/topics/mid-protein-alternatives",
    title: "고단백이 부담스럽다면 — 중단백 대안",
    body: "맛이나 양이 부담스러울 때 선택할 수 있는 20~25g대 제품을 모았습니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 이상 고단백 RTD 비교",
    body: "60g이 과하다고 느껴질 때 바로 아래 구간 제품을 함께 비교합니다.",
  },
  {
    href: "/guides/intake-strategy-health/light-protein-under-20g",
    title: "저함량 단백질 음료, 오히려 필요한 사람들",
    body: "20g 미만 저함량·소용량 라인이 더 잘 맞는 경우를 정리했습니다.",
  },
];

export default function HighProteinSideEffectsPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    faq: faqItems.map((item) => ({ question: item.question, answer: item.answer })),
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
            <span>고단백 부담·부작용</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">섭취량 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-07-01</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            60g 단백질 음료까지 나온 지금,
            <br />
            부담과 부작용을 먼저 짚고 갑니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            초고함량 제품이 잘 팔린다는 이야기가 나오지만, 실제로는 소수의 헤비 유저가 반복 구매하는 경우가 많고
            대다수는 과다 섭취·소화 부담·맛 피로감 때문에 선뜻 손이 가지 않습니다. 걱정되는 부분을 하나씩 정리했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">실제로 걱정되는 부분, 하나씩 보면</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">우려 사항</th>
                    <th className="px-3 py-3 font-semibold">실제 빈도</th>
                    <th className="px-3 py-3 font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {concernRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">누구에게 필요하고, 누구에게는 과할까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {whoShouldCareCards.map((item) => (
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
              고단백 제품 자체가 위험한 건 아니지만, "많을수록 좋다"는 접근은 대다수에게 맞지 않습니다.
              소화 부담과 맛 피로감 때문에 완주하지 못하는 경우가 실제로 훨씬 많으므로, 하루 목표량을 먼저 계산하고
              그 목표에 맞는 구간(20g·30g·40g·50g 이상)을 고르는 순서가 가장 안전하고 꾸준히 지속하기 쉽습니다.
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
