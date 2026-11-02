import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 한 번에 흡수량 — 30g 넘으면 버려질까? 50g 한 번에 먹어도 될까";
const pageDescription =
  "\"단백질은 한 번에 30g까지만 흡수된다\"는 말이 맞는지 연구(Moore 2009, Areta 2013, Macnaughton 2016, Trommelen 2023)로 확인하고, 체중별 한 끼 단백질 양(1kg당 0.4g)과 50g 고단백 음료를 한 번에 마셔도 되는지 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-50g-at-once";

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
  "먹은 단백질은 양이 많아도 대부분 장에서 흡수됩니다. \"30g 넘으면 버려진다\"는 말은 흡수가 아니라 '한 끼 근육 합성 반응이 20~40g 근처에서 둔해진다'는 연구를 줄여 말한 것입니다.",
  "최근 연구(Trommelen 2023)에서는 운동 후 100g을 먹었을 때 25g보다 근육 합성 반응이 더 크고 12시간 넘게 이어졌습니다. 많이 먹은 만큼 더 오래 쓰일 수 있다는 뜻입니다.",
  "그래도 하루 총량이 같다면 여러 끼에 나눠 먹는 편이 유리하다는 결과가 있습니다(Areta 2013, 20g × 4회 > 40g × 2회). 실전 기준은 한 끼 체중 1kg당 약 0.4g, 하루 4끼 이상입니다.",
];

const studyRows: Array<[string, string, string]> = [
  [
    "Moore 외 2009",
    "근력 운동 후 달걀 단백질 0·5·10·20·40g",
    "근육 합성은 20g에서 거의 최대. 40g에서는 더 늘지 않고 아미노산 산화(에너지로 태움)가 늘었음",
  ],
  [
    "Areta 외 2013",
    "운동 후 12시간 동안 유청 80g을 10g×8회, 20g×4회, 40g×2회로 나눠 먹음",
    "20g×4회가 근육 합성이 가장 높았음. 같은 총량이면 나누는 방법이 차이를 만든다",
  ],
  [
    "Macnaughton 외 2016",
    "전신 근력 운동 후 유청 20g vs 40g",
    "40g이 근육 합성이 약 20% 더 높았음. 많이 쓰는 운동일수록 한 번에 쓰는 양이 늘 수 있음",
  ],
  [
    "Trommelen 외 2023",
    "전신 근력 운동 후 우유 단백질 0·25·100g, 12시간 측정",
    "100g이 25g보다 근육 합성이 더 크고 더 오래 지속. 한 번에 쓸 수 있는 양의 뚜렷한 상한이 보이지 않음",
  ],
];

const weights = [50, 60, 70, 80, 90];

const fitRows: Array<[string, string, string]> = [
  ["체중 80kg 이상 + 전신 근력 운동 직후", "가능", "한 끼 목표(0.4~0.55g/kg)가 32~44g 이상. 50g도 범위에 가깝습니다."],
  ["운동하는 60~70kg, 하루 목표 100g 이상", "가능하지만 나누는 편이 나음", "한 번에 50g보다 25g씩 두 번이 소화와 분산 모두 유리합니다."],
  ["아침 공복·식사 대용", "20~30g이 무난", "공복에 고함량은 더부룩함이 잦고, 다른 영양소가 부족한 한 끼가 됩니다."],
  ["운동을 거의 안 하고 식사가 규칙적", "대개 불필요", "식사로 권장량(남 60~65g, 여 50~55g)을 이미 채우는 경우가 많습니다."],
  ["신장 질환·단백질 제한 중", "의료진 상담 먼저", "고함량 제품을 임의로 더하면 안 됩니다."],
];

const faqItems = [
  {
    question: "단백질은 한 번에 몇 g까지 흡수되나요?",
    answer:
      "흡수 자체에는 정해진 상한이 거의 없습니다. 많이 먹으면 소화·흡수가 느려질 뿐 대부분 흡수됩니다. 다만 한 끼 근육 합성 반응은 젊은 성인 기준 20~40g(체중 1kg당 약 0.25~0.4g) 근처에서 둔해진다는 연구가 많아, 실전에서는 한 끼 0.4g/kg 정도를 기준으로 나눠 먹습니다.",
  },
  {
    question: "단백질 30g 이상 먹으면 버려지나요?",
    answer:
      "버려지지 않습니다. 근육 합성에 바로 쓰이지 않은 아미노산도 다른 단백질을 만드는 데 쓰이거나 에너지로 쓰입니다. 2023년 연구에서는 100g을 먹었을 때 25g보다 근육 합성이 더 크고 오래 지속됐습니다.",
  },
  {
    question: "프로틴 50g을 한 번에 마셔도 되나요?",
    answer:
      "신장 기능이 정상인 성인이라면 위험하지 않습니다. 체중이 많이 나가거나 전신 운동 직후라면 의미도 있습니다. 하지만 하루 총량이 같다면 두 번에 나눠 마시는 편이 근육 합성과 소화 모두에 유리하다는 결과가 있어, 꼭 한 번에 마실 이유가 없다면 나누는 쪽을 권합니다.",
  },
  {
    question: "한 끼에 단백질 얼마나 먹어야 하나요?",
    answer:
      "Schoenfeld와 Aragon(2018)은 근육 성장을 목표로 할 때 한 끼 체중 1kg당 0.4g을 하루 4끼 이상 먹는 방법을 제안했습니다. 체중 60kg이면 한 끼 약 24g, 70kg이면 28g입니다.",
  },
  {
    question: "나이가 들면 한 번에 더 많이 먹어야 하나요?",
    answer:
      "고령층은 같은 양에 대한 근육 합성 반응이 젊은 사람보다 둔해 한 끼에 조금 더 많이 먹어야 한다는 연구가 많습니다. 유럽 PROT-AGE 연구그룹은 65세 이상에게 한 끼 25~30g을 제안했습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/basics/daily-requirement",
    title: "단백질 하루 섭취량",
    body: "한 끼 양보다 먼저 정할 하루 총량. 성별·나이·체중별 기준.",
  },
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "단백질 먹는 시간",
    body: "아침·운동 후·자기 전, 언제 먹을지 연구로 정리했습니다.",
  },
  {
    href: "/guides/intake-strategy-health/high-protein-side-effects",
    title: "단백질 과다섭취 부작용",
    body: "얼마부터 많은지, 신장에 무리가 가는지.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-50g-comparison",
    title: "50g 이상 초고함량 음료 비교",
    body: "실제 등록 제품의 단백질·열량·당류를 함께 비교합니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 이상 고단백 RTD 비교",
    body: "50g이 부담스러울 때 바로 아래 구간 제품.",
  },
  {
    href: "/topics/mid-protein-alternatives",
    title: "20~25g 중단백 대안",
    body: "한 끼 0.4g/kg에 맞는 무난한 구간의 제품들.",
  },
];

const sources = [
  "Moore DR et al., Ingested protein dose response of muscle and albumin protein synthesis after resistance exercise in young men. Am J Clin Nutr 2009;89(1):161-168",
  "Areta JL et al., Timing and distribution of protein ingestion during prolonged recovery from resistance exercise alters myofibrillar protein synthesis. J Physiol 2013;591(9):2319-2331",
  "Macnaughton LS et al., The response of muscle protein synthesis following whole-body resistance exercise is greater following 40 g than 20 g of ingested whey protein. Physiol Rep 2016;4(15):e12893",
  "Trommelen J et al., The anabolic response to protein ingestion during recovery from exercise has no upper limit in magnitude and duration in vivo in humans. Cell Rep Med 2023;4(12):101324",
  "Schoenfeld BJ, Aragon AA, How much protein can the body use in a single meal for muscle-building? J Int Soc Sports Nutr 2018;15:10",
  "Bauer J. et al., PROT-AGE Study Group. J Am Med Dir Assoc 2013;14(8):542-559",
];

const cardClass = "rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function Protein50gAtOncePage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    dateModified: "2026-11-02",
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
            <span>단백질 한 번에 흡수량</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">섭취량 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 한 번에 흡수량, 30g 넘으면 정말 버려질까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            &quot;한 번에 30g까지만 흡수된다&quot;는 말 때문에 40~50g짜리 음료를 망설이는 분이 많습니다. 이 말이 어디서 왔는지,
            최신 연구는 뭐라고 하는지, 그래서 한 끼에 몇 g이 적당한지 정리했습니다.
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
          <GuideBuySection topic="highProtein" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">&apos;흡수&apos;와 &apos;근육 합성&apos;은 다른 이야기</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                <strong className="text-[var(--foreground)]">흡수</strong>는 단백질이 소화돼 아미노산으로 장에서 혈액으로 들어가는
                것입니다. 양이 많으면 시간이 더 걸릴 뿐, 정해진 한도에서 멈추지 않습니다.
              </p>
              <p>
                <strong className="text-[var(--foreground)]">근육 합성</strong>은 흡수된 아미노산으로 근육 단백질을 만드는
                반응입니다. 여러 연구에서 한 끼 기준 20~40g 근처부터 반응이 더 커지지 않는 모습이 보였고, 이것이
                &quot;30g까지만 흡수&quot;라는 말로 바뀌어 퍼졌습니다.
              </p>
              <p>
                근육에 바로 쓰이지 않은 아미노산도 버려지지 않습니다. 몸의 다른 단백질을 만들거나 에너지로 쓰입니다. 그래서
                &quot;헛돈&quot;이 되는 것은 아니지만, 근육을 늘리는 것이 목적이라면 나눠 먹는 편이 효율적입니다.
              </p>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">연구는 뭐라고 했나 — 주요 연구 4개</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>연구</th>
                    <th className={thClass}>무엇을 비교했나</th>
                    <th className={thClass}>결과</th>
                  </tr>
                </thead>
                <tbody>
                  {studyRows.map(([study, design, result]) => (
                    <tr key={study} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{study}</td>
                      <td className={tdClass}>{design}</td>
                      <td className={tdClass}>{result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              정리하면, 한 번에 많이 먹어도 몸은 그 양을 더 오래 쓰지만, 같은 하루 총량이라면 3~4시간 간격으로 나누는 편이
              근육 합성이 더 높았습니다. 대부분 젊은 남성·근력 운동 직후 연구라는 한계도 있습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">그래서 한 끼에 몇 g? — 체중별 기준</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              Schoenfeld와 Aragon(2018)은 근육 성장을 목표로 할 때 한 끼 <strong>체중 1kg당 0.4g</strong>을 하루 4끼 이상,
              많이 먹는 경우 한 끼 <strong>0.55g</strong>까지를 제안했습니다(하루 1.6~2.2g/kg에 해당).
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>체중</th>
                    {weights.map((w) => (
                      <th key={w} className={thClass}>
                        {w}kg
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#f0ece5]">
                    <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>한 끼 0.4g/kg</td>
                    {weights.map((w) => (
                      <td key={w} className={tdClass}>
                        {Math.round(w * 0.4)}g
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>한 끼 0.55g/kg</td>
                    {weights.map((w) => (
                      <td key={w} className={tdClass}>
                        {Math.round(w * 0.55)}g
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              65세 이상은 같은 양에 대한 반응이 둔해 한 끼 25~30g을 권하는 의견이 있습니다(PROT-AGE 2013).
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">50g 음료를 한 번에 마셔도 될까 — 상황별</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>상황</th>
                    <th className={thClass}>판단</th>
                    <th className={thClass}>이유</th>
                  </tr>
                </thead>
                <tbody>
                  {fitRows.map(([situation, verdict, reason]) => (
                    <tr key={situation} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{situation}</td>
                      <td className={tdClass}>{verdict}</td>
                      <td className={tdClass}>{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              고함량 제품일수록 열량·당류·나트륨도 같이 확인하세요. 같은 50g이라도 제품마다 열량 차이가 큽니다.
            </p>
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
          </section>
        </div>
      </main>
      <GuideBuySection topic="highProtein" />
      <Footer />
    </div>
  );
}
