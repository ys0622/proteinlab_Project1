import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideNextReads from "@/app/components/GuideNextReads";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

// 2026-11-02 질문 허브 2차: '근육 합성' 질문형으로 같은 주소를 다시 썼다(기존 제목 "근육 성장에 단백질이 필요한 이유").
const pageTitle = "근육 합성에 단백질 얼마나? — 한 끼 20~40g·하루 1.6g/kg, 연구로 정리한 근단백질 합성";
const pageDescription =
  "근단백질 합성(MPS)을 높이는 조건을 연구로 정리했습니다. 근력 운동 + 한 끼 20~40g(Moore 2009, Witard 2014, Macnaughton 2016, Trommelen 2023), 하루 체중 1kg당 약 1.6g(Morton 2018), 하루 4번 나누기(Areta 2013), 자기 전 단백질, 나이에 따른 차이까지.";
const canonical = "https://proteinlab.kr/guides/basics/muscle";

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
  "근육은 늘 분해와 합성을 반복합니다. 근육이 늘려면 합성이 분해보다 많아야 하고, 이를 가장 크게 올리는 두 가지가 근력 운동과 단백질 섭취입니다. 둘 중 하나만으로는 효과가 작습니다.",
  "한 끼 단백질은 20~40g이 연구로 가장 많이 확인된 범위입니다. 젊은 남성의 하체 운동 뒤에는 20g에서 합성이 거의 최대였지만(Moore 2009), 전신 운동 뒤에는 40g이 20g보다 더 높았습니다(Macnaughton 2016). 100g을 먹으면 합성이 더 오래 이어졌다는 연구(Trommelen 2023)도 있어 '30g 넘으면 버려진다'는 말은 맞지 않습니다.",
  "몇 달 단위로 근육을 늘리는 데는 하루 총량이 더 중요합니다. 49개 연구를 모은 메타분석(Morton 2018)에서 하루 체중 1kg당 약 1.6g을 넘으면 근육 증가가 더 커지지 않았습니다. 이 총량을 3~4끼에 나눠 먹는 것이 가장 실용적입니다.",
];

const factorRows: Array<[string, string, string]> = [
  ["근력 운동", "가장 큰 자극", "운동 뒤 최소 24시간 동안 근육이 단백질에 더 민감하게 반응합니다. 운동 없이 단백질만 늘리면 합성 증가가 작습니다."],
  ["한 끼 단백질 양", "20~40g", "Moore 2009(하체 운동): 20g에서 거의 최대. Witard 2014: 40g이 20g보다 근원섬유 합성 약 20% 높음. Macnaughton 2016(전신 운동): 40g > 20g"],
  ["하루 총량", "체중 1kg당 약 1.6g", "Morton 2018 메타분석: 이 이상에서는 근육 증가가 더 커지지 않음(범위가 넓은 추정치, 상한으로 보면 안 됨)"],
  ["나누어 먹기", "하루 4번 × 20g 정도", "Areta 2013: 12시간 동안 80g을 4번 × 20g으로 나눈 쪽이 8번 × 10g, 2번 × 40g보다 합성이 높았음"],
  ["자기 전", "카제인 30~40g 연구", "Res 2012: 저녁 운동 뒤 자기 전 40g이 밤사이 합성을 높임. Snijders 2015: 12주 근력 운동 중 자기 전 27.5g 보충 쪽이 근육 크기·근력 증가가 더 컸음"],
  ["단백질 종류", "류신 많은 단백질이 유리", "Tang 2009: 운동 직후 합성은 유청 > 대두 > 카제인 순. 장기 근육 증가에서는 식물성·동물성 차이가 뚜렷하지 않았다는 메타분석도 있음(Messina 2018)"],
  ["나이", "많을수록 더 필요", "Moore 2015: 한 끼 최대 반응에 필요한 양이 노인 약 0.40g/kg, 젊은 성인 약 0.24g/kg. 70kg이면 노인 약 28g, 젊은 성인 약 17g"],
];

const doseRows: Array<[string, string, string]> = [
  ["Moore 2009", "젊은 남성, 하체 운동 뒤 달걀 단백질 0·5·10·20·40g", "20g에서 근육 합성이 거의 최대, 40g은 더 크게 오르지 않고 산화(에너지로 쓰임)가 늘었음"],
  ["Witard 2014", "젊은 남성, 하체 운동 뒤 유청 0·10·20·40g", "40g이 20g보다 근원섬유 단백질 합성이 약 20% 높았음"],
  ["Macnaughton 2016", "젊은 남성, 전신 운동 뒤 유청 20g vs 40g", "40g 쪽 합성이 더 높았고, 제지방량 많고 적음과 관계없었음"],
  ["Trommelen 2023", "젊은 남성, 운동 뒤 우유 단백질 25g vs 100g", "100g 쪽이 합성이 더 크고, 12시간 측정 동안 더 오래 이어졌음. 중간 양(50g 등)은 비교하지 않았음"],
];

const weights = [50, 60, 70, 80, 90];

const faqItems = [
  {
    question: "근육 합성에는 한 번에 단백질 몇 g이 필요한가요?",
    answer:
      "젊은 성인은 한 끼 20~25g(체중 1kg당 약 0.25g)에서 합성 반응이 크게 올라가고, 전신 운동을 했거나 나이가 많으면 30~40g이 더 낫다는 연구가 있습니다. 한 번에 정확한 상한은 없고, 하루 총량을 채우는 것이 먼저입니다.",
  },
  {
    question: "단백질 30g 넘게 먹으면 버려지나요?",
    answer:
      "아닙니다. 흡수는 거의 다 됩니다. 남는 아미노산 일부가 에너지로 쓰일 뿐, 100g을 먹었을 때 합성이 더 오래 이어졌다는 연구(Trommelen 2023)도 있습니다. 다만 같은 양이면 여러 끼에 나누는 편이 하루 합성에는 유리했습니다(Areta 2013).",
  },
  {
    question: "운동 후 30분 안에 꼭 먹어야 근육이 붙나요?",
    answer:
      "운동 뒤 근육의 민감도는 24시간 이상 이어집니다. 30분을 놓쳤다고 효과가 사라지지는 않으며, 운동 전후 몇 시간 안에 단백질이 든 식사를 하면 충분합니다. 하루 총량이 더 큰 차이를 만듭니다.",
  },
  {
    question: "운동을 안 하면 단백질을 먹어도 근육 합성이 안 되나요?",
    answer:
      "단백질만 먹어도 합성은 일시적으로 오르지만, 운동을 했을 때보다 작고 근육이 눈에 띄게 늘지는 않습니다. 근육을 늘리려면 근력 운동이 같이 있어야 합니다.",
  },
  {
    question: "나이가 들면 단백질을 더 먹어야 하나요?",
    answer:
      "네. 나이가 들면 같은 양에 대한 근육 반응이 둔해집니다(Moore 2015에서 한 끼 필요량이 노인 약 0.40g/kg, 젊은 성인 약 0.24g/kg). PROT-AGE 연구그룹은 65세 이상에게 하루 1.0~1.2g/kg을 제안합니다. 신장 질환이 있다면 의료진과 먼저 상담하세요.",
  },
];

const relatedLinks = [
  { href: "/guides/intake-strategy-health/protein-50g-at-once", title: "단백질 한 번에 몇 g 흡수?", body: "30g 상한설과 50g 섭취를 연구로 확인했습니다." },
  { href: "/guides/intake-strategy-health/protein-timing", title: "단백질 먹는 시간", body: "운동 직후·자기 전·아침 중 언제가 나은지." },
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "체중·나이·운동량별 하루 총량 계산." },
  { href: "/guides/intake-strategy-health/protein-shake-effects", title: "단백질 쉐이크 효과", body: "보충제로 근육이 얼마나 더 느는지." },
  { href: "/guides/basics/protein-source-types", title: "식물성 vs 동물성 단백질", body: "WPI·WPC·MPI와 단백질 종류별 차이." },
  { href: "/guides/intake-strategy-health/lean-massup-protein-intake", title: "린매스업 단백질 섭취", body: "체지방을 덜 늘리며 근육을 늘리는 식사." },
];

const sources = [
  "Moore DR et al., Ingested protein dose response of muscle and albumin protein synthesis after resistance exercise in young men. Am J Clin Nutr 2009;89(1):161-168",
  "Witard OC et al., Myofibrillar muscle protein synthesis rates subsequent to a meal in response to increasing doses of whey protein at rest and after resistance exercise. Am J Clin Nutr 2014;99(1):86-95",
  "Macnaughton LS et al., The response of muscle protein synthesis following whole-body resistance exercise is greater following 40 g than 20 g of ingested whey protein. Physiol Rep 2016;4(15):e12893",
  "Trommelen J et al., The anabolic response to protein ingestion during recovery from exercise has no upper limit in magnitude and duration in vivo in humans. Cell Rep Med 2023;4(12):101324",
  "Areta JL et al., Timing and distribution of protein ingestion during prolonged recovery from resistance exercise alters myofibrillar protein synthesis. J Physiol 2013;591(9):2319-2331",
  "Res PT et al., Protein ingestion before sleep improves postexercise overnight recovery. Med Sci Sports Exerc 2012;44(8):1560-1569",
  "Snijders T et al., Protein ingestion before sleep increases muscle mass and strength gains during prolonged resistance-type exercise training in healthy young men. J Nutr 2015;145(6):1178-1184",
  "Tang JE et al., Ingestion of whey hydrolysate, casein, or soy protein isolate: effects on mixed muscle protein synthesis at rest and following resistance exercise in young men. J Appl Physiol 2009;107(3):987-992",
  "Moore DR et al., Protein ingestion to stimulate myofibrillar protein synthesis requires greater relative protein intakes in healthy older versus younger men. J Gerontol A Biol Sci Med Sci 2015;70(1):57-62",
  "Morton RW et al., A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med 2018;52(6):376-384",
  "Messina M et al., No difference between the effects of supplementing with soy protein versus animal protein on gains in muscle mass and strength in response to resistance exercise. Int J Sport Nutr Exerc Metab 2018;28(6):674-685",
  "Bauer J et al., Evidence-based recommendations for optimal dietary protein intake in older people (PROT-AGE). J Am Med Dir Assoc 2013;14(8):542-559",
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준",
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function MuscleGuidePage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    dateModified: "2026-11-02",
    faq: faqItems,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
            <span>/</span>
            <span>근육 합성과 단백질</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">근육 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            근육 합성에 단백질은 얼마나, 어떻게 먹어야 할까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            근단백질 합성(MPS)은 근육 단백질이 새로 만들어지는 과정입니다. 한 끼 양, 하루 총량, 나누는 횟수, 자기 전, 나이까지
            사람을 대상으로 한 연구 결과로 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f6fbf7] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">짧게 답하면</h2>
            <ul className="mt-4 space-y-3">
              {quickAnswer.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <GuideBuySection topic="workout" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">근육 합성을 높이는 조건과 근거</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>조건</th>
                    <th className={thClass}>기준</th>
                    <th className={thClass}>연구 내용</th>
                  </tr>
                </thead>
                <tbody>
                  {factorRows.map(([factor, rule, detail]) => (
                    <tr key={factor} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{factor}</td>
                      <td className={tdClass}>{rule}</td>
                      <td className={tdClass}>{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              근육 합성은 운동 직후 몇 시간의 반응을 잰 값이고, 실제로 근육이 늘었는지는 몇 달 동안 근육량을 잰 연구로 따로
              봐야 합니다. 그래서 한 끼 양(단기)과 하루 총량(장기)을 나눠 정리했습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">한 끼에 몇 g? — 양을 바꿔 잰 연구</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>연구</th>
                    <th className={thClass}>대상·비교</th>
                    <th className={thClass}>결과</th>
                  </tr>
                </thead>
                <tbody>
                  {doseRows.map(([study, design, result]) => (
                    <tr key={study} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{study}</td>
                      <td className={tdClass}>{design}</td>
                      <td className={tdClass}>{result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              정리하면 20g은 &apos;충분한 출발점&apos;, 전신 운동·고령·체격이 큰 경우는 30~40g이 더 낫습니다. 한 번에 더 많이 먹어도
              손해는 아니지만, 같은 양이면 여러 끼에 나누는 편이 하루 전체 합성에 유리했습니다. 한 번에 먹는 양은{" "}
              <Link href="/guides/intake-strategy-health/protein-50g-at-once" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
                단백질 한 번에 몇 g 흡수되나
              </Link>
              에서 더 자세히 다뤘습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 총량 — 체중별 목표</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              한국 성인 권장섭취량은 체중 1kg당 0.91g(2020 한국인 영양소 섭취기준), 근력 운동으로 근육을 늘릴 때 연구에서
              효과가 더 커지지 않은 지점은 약 1.6g입니다. 끼니당 양은 하루 4번에 나눈 값입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>체중</th>
                    <th className={thClass}>권장량 0.91g/kg</th>
                    <th className={thClass}>근력 운동 1.6g/kg</th>
                    <th className={thClass}>1.6g/kg를 4번에 나누면</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((w) => (
                    <tr key={w} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{w}kg</td>
                      <td className={tdClass}>{Math.round(w * 0.91)}g</td>
                      <td className={tdClass}>{Math.round(w * 1.6)}g</td>
                      <td className={tdClass}>약 {Math.round((w * 1.6) / 4)}g씩</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              식사로 채우기 어려운 끼니(아침, 운동 후, 자기 전)에 단백질 음료 1병(20~25g)을 넣으면 끼니당 양을 맞추기 쉽습니다.
            </p>
          </section>

          <GuideCompareListCta
            category="drink"
            slugs={["takefit-max-goso-250", "newcare-all-protein-choco-245", "hymune-balance-active-vanilla-bonbon-zero-250"]}
          />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-[#e2ebe4] bg-[#f7fbf8] px-4 py-3">
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
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#2d6a4f]">{item.title}</h3>
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

      <GuideBuySection topic="workout" />
      <GuideNextReads path="/guides/basics/muscle" />
      <Footer />
    </div>
  );
}
