import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 과다섭취 부작용 — 얼마부터 많은지, 신장에 무리가 가는지";
const pageDescription =
  "단백질을 많이 먹으면 생길 수 있는 문제(소화 불편, 열량 초과, 신장 질환자의 부담)와 얼마부터 많다고 보는지를 2020 한국인 영양소 섭취기준·메타분석·신장학회 지침으로 정리했습니다. 고단백 음료 40~60g 제품 기준도 함께 봅니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/high-protein-side-effects";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
    card: "summary" as const,
    title: pageTitle,
    description: pageDescription,
  },
};

const quickAnswer = [
  "단백질에는 공식 상한섭취량이 없습니다. 2020 한국인 영양소 섭취기준은 보충제·고단백 식사의 장기 영향에 대한 근거가 부족해 상한을 정하지 못했다고 밝혔습니다.",
  "신장 기능이 정상인 성인은 고단백 식사로 신장 기능이 나빠진다는 근거가 약합니다(28개 연구 메타분석, 2018). 반대로 만성 신장 질환이 있으면 단백질을 줄이는 것이 표준 치료입니다.",
  "건강한 사람에게 실제로 흔한 문제는 소화 불편(더부룩함·가스·묽은 변)과 열량 초과입니다. 한 번에 먹는 양을 줄이고 하루 목표량 안에서 먹으면 대부분 피할 수 있습니다.",
];

const thresholdRows: Array<[string, string, string]> = [
  ["권장섭취량", "체중 1kg당 0.91g (성인 남 60~65g, 여 50~55g)", "2020 한국인 영양소 섭취기준"],
  ["운동하는 사람 권장 범위", "체중 1kg당 1.4~2.0g", "ISSN 입장문 2017"],
  ["열량 비율 상단", "하루 섭취 열량의 20% (2,000kcal면 100g)", "2020 기준 에너지적정비율 7~20%"],
  ["메타분석의 '고단백' 기준", "1kg당 1.5g 이상, 열량의 20% 이상 또는 하루 100g 이상", "Devries 외 2018"],
  ["만성 신장 질환(투석 전 3~5기)", "체중 1kg당 0.55~0.6g으로 제한", "KDOQI 영양 지침 2020"],
];

const concernRows: Array<[string, string, string]> = [
  [
    "소화 불편 (더부룩함·가스·묽은 변)",
    "흔함",
    "한 번에 40g 이상을 빠르게 마시거나, 유당에 약한 사람이 우유 기반 음료를 마실 때 잘 생깁니다. 20~30g씩 나눠 마시거나 유당이 적은 WPI·두유 기반 제품으로 바꾸면 줄어드는 경우가 많습니다.",
  ],
  [
    "열량 초과로 체중 증가",
    "흔함",
    "단백질도 1g에 약 4kcal입니다. 식사는 그대로 두고 단백질 음료만 더하면 하루 열량이 늘어 체중이 오를 수 있습니다. 음료 1개 열량(100~300kcal)을 식사 일부와 바꾸는 편이 맞습니다.",
  ],
  [
    "신장 기능 저하",
    "건강한 성인은 근거 약함",
    "건강한 성인을 대상으로 한 28개 연구 메타분석에서 고단백 식사군과 보통 식사군의 사구체여과율 변화에 의미 있는 차이가 없었습니다. 다만 대부분 수개월 연구라 수십 년 영향은 확인되지 않았습니다.",
  ],
  [
    "신장 질환자의 악화",
    "주의 필요",
    "만성 신장 질환이 있으면 단백질 제한이 표준 치료입니다. 고단백 음료를 스스로 더하면 안 되고 담당 의료진과 먼저 상의해야 합니다.",
  ],
  [
    "다른 영양소 부족",
    "식단에 따라",
    "단백질 음료·쉐이크로 식사를 자주 대신하면 채소·통곡물에서 오는 식이섬유와 미량 영양소가 줄 수 있습니다.",
  ],
];

const whoShouldCareCards = [
  {
    title: "고함량 제품을 검토할 만한 경우",
    body: "근력 운동을 꾸준히 하고 체중이 많이 나가 하루 목표량이 120g을 넘는 경우. 그래도 한 번에 다 마시기보다 나눠 마시는 편이 소화에 낫습니다.",
  },
  {
    title: "40g대도 과할 수 있는 경우",
    body: "운동을 거의 하지 않고 식사에서 이미 단백질을 충분히 먹는 경우. 19~64세 한국인은 평균적으로 권장량의 116~138%를 이미 먹고 있습니다(국민건강영양조사 2013~2017).",
  },
  {
    title: "의료진 상담이 먼저인 경우",
    body: "만성 신장 질환, 신장 기능이 떨어진 당뇨병, 통풍, 간 질환이 있거나 임신 중인 경우. 단백질을 늘리기 전에 담당 의료진과 상의하세요.",
  },
];

const faqItems = [
  {
    question: "단백질 과다섭취 부작용에는 무엇이 있나요?",
    answer:
      "건강한 성인에게 흔한 것은 소화 불편(더부룩함·가스·묽은 변)과 열량 초과로 인한 체중 증가입니다. 신장 손상은 건강한 성인에서는 근거가 약하지만, 신장 질환이 있는 사람에게는 실제 부담이 되므로 제한이 필요합니다.",
  },
  {
    question: "하루 단백질 몇 g부터 과다섭취인가요?",
    answer:
      "공식 상한선은 없습니다. 참고 기준으로는 운동하는 사람 권장 범위의 위쪽인 체중 1kg당 2.0g, 또는 하루 열량의 20%(2,000kcal 기준 100g)를 넘기 시작하면 '많이 먹는 편'으로 볼 수 있습니다. 이 선을 넘는다고 바로 해롭다는 뜻은 아닙니다.",
  },
  {
    question: "단백질을 많이 먹으면 신장에 무리가 가나요?",
    answer:
      "신장 기능이 정상인 성인을 대상으로 한 메타분석(2018, 28개 연구)에서는 고단백 식사가 신장 기능을 떨어뜨린다는 결과가 나오지 않았습니다. 그러나 이미 신장 기능이 떨어진 사람은 단백질 제한이 권고됩니다(KDOQI 2020, 투석 전 체중 1kg당 0.55~0.6g).",
  },
  {
    question: "프로틴 60g을 한 번에 마셔도 되나요?",
    answer:
      "신장 기능이 정상인 성인이라면 한 번에 60g이 바로 위험하지는 않습니다. 다만 소화 불편이 생기기 쉽고, 한 끼 근육 합성에 쓰이는 양은 대략 20~40g으로 알려져 있어 나눠 마시는 편이 효율적입니다.",
  },
  {
    question: "단백질 음료를 마시면 설사를 하는데 왜 그런가요?",
    answer:
      "우유 기반 음료의 유당, 감미료(당알코올), 한 번에 많은 양이 흔한 원인입니다. 유당을 줄인 WPI·두유 기반 제품으로 바꾸거나 양을 나누면 나아지는 경우가 많습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/basics/daily-requirement",
    title: "단백질 하루 섭취량",
    body: "성별·나이·체중별 권장량과 운동할 때 기준을 먼저 계산해 보세요.",
  },
  {
    href: "/guides/intake-strategy-health/protein-50g-at-once",
    title: "단백질 50g, 한 번에 먹어도 될까",
    body: "한 번에 흡수·활용되는 양과 나눠 먹는 기준을 정리했습니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-diarrhea",
    title: "단백질 음료 마시고 설사할 때",
    body: "유당·감미료·양 중 어디가 원인인지 구분하는 법.",
  },
  {
    href: "/topics/mid-protein-alternatives",
    title: "고단백이 부담스럽다면 — 중단백 대안",
    body: "맛이나 양이 부담스러울 때 선택할 수 있는 20~25g대 제품을 모았습니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 이상 고단백 RTD 비교",
    body: "고함량 제품의 열량·당류·나트륨을 같이 비교합니다.",
  },
  {
    href: "/guides/intake-strategy-health/light-protein-under-20g",
    title: "저함량 단백질 음료, 오히려 필요한 사람들",
    body: "20g 미만 저함량·소용량 라인이 더 잘 맞는 경우를 정리했습니다.",
  },
];

const sources = [
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (상한섭취량 미설정 사유, 에너지적정비율, 국민건강영양조사 섭취량)",
  "Devries MC et al., Changes in Kidney Function Do Not Differ between Healthy Adults Consuming Higher- Compared with Lower- or Normal-Protein Diets: A Systematic Review and Meta-Analysis. J Nutr 2018;148(11):1760-1775",
  "Ikizler TA et al., KDOQI Clinical Practice Guideline for Nutrition in CKD: 2020 Update. Am J Kidney Dis 2020;76(3 Suppl 1):S1-S107",
  "Jäger R. et al., ISSN Position Stand: Protein and Exercise. J Int Soc Sports Nutr 2017;14:20",
];

const cardClass = "rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]";

export default function HighProteinSideEffectsPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    dateModified: "2026-11-02",
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
            <span>단백질 과다섭취 부작용</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">섭취량 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 과다섭취 부작용, 얼마부터 많고 신장에는 괜찮을까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            40~60g짜리 단백질 음료까지 나오면서 &quot;너무 많이 먹는 건 아닐까&quot;라는 질문이 늘었습니다. 공식 기준과
            연구 결과로 얼마부터 많은지, 누구에게 실제로 문제가 되는지 정리했습니다.
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
          <GuideBuySection topic="general" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">얼마부터 &apos;많이&apos; 먹는 걸까 — 기준선 모음</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              상한섭취량이 없기 때문에 &quot;몇 g부터 해롭다&quot;는 공식 숫자는 없습니다. 대신 판단에 쓸 수 있는 기준선은 아래와
              같습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">기준</th>
                    <th className="px-3 py-3 font-semibold">양</th>
                    <th className="px-3 py-3 font-semibold">출처</th>
                  </tr>
                </thead>
                <tbody>
                  {thresholdRows.map(([label, amount, source]) => (
                    <tr key={label} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className="px-3 py-3 font-semibold text-[var(--foreground)]">{label}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{amount}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              예: 체중 60kg, 운동을 하지 않는 사람이 식사로 70g을 먹고 50g짜리 음료를 하루 2개 더하면 170g, 체중 1kg당 2.8g입니다.
              운동하는 사람 권장 범위의 위쪽(2.0g)도 크게 넘습니다. 같은 사람이 음료를 1개만 더해도 1kg당 2.0g이 됩니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">실제로 생길 수 있는 문제, 하나씩</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">문제</th>
                    <th className="px-3 py-3 font-semibold">얼마나 흔한가</th>
                    <th className="px-3 py-3 font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {concernRows.map(([concern, frequency, detail]) => (
                    <tr key={concern} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className="px-3 py-3 font-semibold text-[var(--foreground)]">{concern}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{frequency}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">신장(콩팥)에 대해 연구가 말하는 것</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                <strong className="text-[var(--foreground)]">건강한 성인:</strong> Devries 외(2018)는 건강한 성인을 대상으로
                고단백 식사(체중 1kg당 1.5g 이상, 열량의 20% 이상 또는 하루 100g 이상)와 보통·저단백 식사를 비교한 28개 연구를
                묶어 분석했습니다. 신장 기능 지표인 사구체여과율 변화에 의미 있는 차이가 없었습니다. 고단백 식사를 하면
                사구체여과율이 일시적으로 올라가는 것은 몸이 늘어난 단백질 대사물을 처리하는 정상 반응으로 해석됩니다.
              </p>
              <p>
                <strong className="text-[var(--foreground)]">한계:</strong> 포함된 연구 대부분이 수주~수개월 단위입니다. 수십 년
                고단백 식사의 영향은 아직 충분히 확인되지 않았고, 2020 한국인 영양소 섭취기준이 상한섭취량을 정하지 못한
                이유도 이 근거 부족입니다.
              </p>
              <p>
                <strong className="text-[var(--foreground)]">신장 질환이 있는 경우:</strong> 미국 신장재단 영양 지침(KDOQI 2020)은
                투석 전 만성 신장 질환(3~5기)에서 단백질을 체중 1kg당 0.55~0.6g(당뇨병이 함께 있으면 0.6~0.8g)으로 줄이도록 권합니다. 이 경우 고단백 음료는
                오히려 피해야 할 수 있습니다. 당뇨병이 오래됐거나 건강검진에서 신장 수치(크레아티닌·사구체여과율·단백뇨)를
                지적받았다면 단백질을 늘리기 전에 먼저 확인하세요.
              </p>
            </div>
          </section>

          <section className={cardClass}>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">부작용 없이 먹는 법</h2>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>
                <strong className="text-[var(--foreground)]">1. 하루 목표량부터 계산</strong> — 체중 × 0.91g(운동하면 1.4~2.0g).
                식사로 먹는 양을 빼고 모자란 만큼만 제품으로 채웁니다.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">2. 한 번에 20~40g</strong> — 근육 합성에 쓰이는 양도 이 정도이고
                소화 부담도 적습니다.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">3. 열량을 식사와 바꾸기</strong> — 음료를 더하는 대신 간식이나 식사
                일부를 바꿔 하루 열량이 늘지 않게 합니다.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">4. 배가 불편하면 원료를 바꾸기</strong> — 유당이 적은 WPI나 두유
                기반 제품을 고릅니다.
              </li>
            </ol>
          </section>

          <section className={cardClass}>
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

          <section className={cardClass}>
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

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-4">
            <h2 className="text-sm font-bold text-[var(--foreground)]">출처</h2>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-[var(--foreground-muted)]">
              {sources.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
              이 글은 일반 정보이며 진단이나 치료를 대신하지 않습니다. 질환이 있다면 담당 의료진과 상의하세요.
            </p>
          </section>
        </div>
      </main>
      <GuideBuySection topic="general" />
      <Footer />
    </div>
  );
}
