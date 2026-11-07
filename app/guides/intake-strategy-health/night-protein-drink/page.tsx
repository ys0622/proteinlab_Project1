import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import TrackedLink from "@/app/components/TrackedLink";
import { getDrinkProducts } from "@/app/data/drinkProductsData";

// 2026-11-02 질문 허브 A-2: "자기 전 단백질" 질문형 제목과 연구 근거를 더했다(기존 제목 "밤에 단백질 음료 마셔도 될까 | 야식·저녁 보충 기준 정리").
const _pageTitle = "자기 전 단백질 — 근육에 효과 있을까, 살찔까? 연구로 본 밤 단백질 음료 기준";
const _pageDesc = "자기 전 단백질 연구(Res 2012, Snijders 2015 12주 근육 단면적 +8.4 vs +4.8cm², Kouw 2017 노인 40g)와 한계, 살찌는지(하루 총열량), 야식 대신 마실 때 당류·열량 기준, 밤 단백질 음료 후보 성분까지 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/night-protein-drink" },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/night-protein-drink",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const timingRows = [
  ["저녁 식사 후 보충", "가능", "식사에서 단백질이 부족했다면 가벼운 보충용 RTD는 무난합니다."],
  ["운동 후 늦은 시간", "상황 따라 가능", "운동 직후 회복 목적이라면 늦은 시간이어도 보충 자체가 더 중요할 수 있습니다."],
  ["야식처럼 반복적으로 섭취", "비추천", "배고픔 해소용으로 칼로리와 당류가 있는 제품을 반복하면 체중 관리가 흔들리기 쉽습니다."],
  ["자기 전 30~40g 고단백", "근력 운동을 하는 경우", "연구에서 쓴 양은 카제인 30~40g입니다. 운동을 안 하고 열량을 줄이는 중이라면 20g 전후 저당 제품이 부담이 적습니다."],
];

const checkCards = [
  {
    title: "1. 저녁 식사 단백질이 부족했나",
    body: "고기, 계란, 두부 같은 단백질 식품이 적었다면 가벼운 보충이 의미 있을 수 있습니다.",
  },
  {
    title: "2. 배고픔 해소용인가 회복용인가",
    body: "회복과 보충 목적이라면 기준이 단순하지만, 허기 해결용이라면 포만감과 칼로리까지 함께 봐야 합니다.",
  },
  {
    title: "3. 당류와 총칼로리가 적당한가",
    body: "밤 시간대에는 같은 단백질 20g이라도 당류와 칼로리 차이가 체감상 훨씬 큽니다.",
  },
];

const mistakeList = [
  "밤에는 무조건 안 좋다고 생각해서 식사 부족분까지 무시하는 경우",
  "바로 자기 전이니까 고단백일수록 좋다고 생각하고 40g 제품부터 찾는 경우",
  "야식 대용으로 가볍지 않은 제품을 반복해서 마시는 경우",
];

const sleepStudyRows: Array<[string, string, string]> = [
  ["Res 2012", "젊은 남성, 저녁 근력 운동 뒤 자기 전 카제인 40g vs 위약", "자기 전에 먹은 단백질이 밤사이 소화·흡수되어 근육 합성에 쓰였고, 밤사이 단백질 균형이 위약보다 좋았음"],
  ["Snijders 2015", "젊은 남성 44명, 12주 근력 운동 중 자기 전 단백질 27.5g vs 위약", "허벅지 근육 단면적 증가 +8.4cm² vs +4.8cm², 근력 증가도 더 컸음. 다만 보충군은 하루 총 단백질도 더 많았음"],
  ["Kouw 2017", "건강한 노인 남성 48명(평균 72세), 자기 전 카제인 40g·20g·20g+류신 vs 위약", "40g에서만 밤사이 근육 합성이 위약보다 높았고, 20g은 뚜렷한 차이가 없었음"],
];

const sleepSources = [
  "Res PT et al., Protein ingestion before sleep improves postexercise overnight recovery. Med Sci Sports Exerc 2012;44(8):1560-1569",
  "Snijders T et al., Protein ingestion before sleep increases muscle mass and strength gains during prolonged resistance-type exercise training in healthy young men. J Nutr 2015;145(6):1178-1184",
  "Kouw IWK et al., Protein ingestion before sleep increases overnight muscle protein synthesis rates in healthy older men: a randomized controlled trial. J Nutr 2017;147(12):2252-2261",
  "Bray GA et al., Effect of dietary protein content on weight gain, energy expenditure, and body composition during overeating. JAMA 2012;307(1):47-55",
];

const nightCases = [
  {
    title: "다이어트 중 저녁 보충",
    body: "저당·저칼로리 20g 전후 제품을 먼저 보는 편이 좋습니다. 포만감이 더 필요하면 음료보다 다른 형태가 더 맞을 수 있습니다.",
  },
  {
    title: "운동 후 늦은 귀가",
    body: "식사까지 공백이 길다면 RTD 보충이 무난합니다. 다만 자기 직전이라면 너무 무겁지 않은 제품이 더 낫습니다.",
  },
  {
    title: "부모님·중장년 건강 보완",
    body: "야식이 아니라 건강 보완 목적이라면 식사 보완형 제품이 더 잘 맞습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "단백질 섭취 타이밍 전체 보기",
    body: "밤 시간대만 따로 보기보다 하루 전체 루틴에서 어디에 배치할지 같이 보면 기준이 더 선명합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-for-diabetes",
    title: "저당 제품부터 비교하기",
    body: "밤에 마실 제품은 당류와 칼로리를 먼저 걸러내는 편이 안전합니다. 저당 기준 비교 페이지로 바로 이어집니다.",
  },
  {
    href: "/guides/intake-strategy-health/post-workout-protein",
    title: "운동 후 보충 기준 보기",
    body: "늦은 시간 운동 뒤 회복용으로 마실지 고민 중이라면 운동 후 보충 기준 페이지를 같이 보는 편이 더 정확합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-for-50s",
    title: "중장년용 보완 제품 보기",
    body: "야식이 아니라 건강 보완 목적이라면 식사 보완형 제품군을 따로 보는 편이 더 빠릅니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-daily",
    title: "매일 마셔도 되는지 확인하기",
    body: "밤에 자주 마시는 습관이 생긴다면 하루 전체 섭취량과 식사 패턴을 같이 확인해야 합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-weight-gain",
    title: "밤에 마시면 살찌는지 보기",
    body: "체중 관리가 목적이라면 밤 시간대 섭취보다 총칼로리와 반복 빈도가 더 중요한 판단 기준입니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-sugar",
    title: "밤 시간대 당류 기준 보기",
    body: "야식 대체로 마실 때는 단백질보다 당류와 칼로리를 먼저 확인하는 편이 좋습니다.",
  },
];

const productRecommendations = [
  {
    href: "/product/takefit-max-choco-250",
    productId: "takefit-max-choco-250",
    title: "테이크핏 맥스 초코",
    label: "운동 후 가벼운 보충",
    body: "단백질 24g, 당류 0.7g 제품이라 늦은 시간 운동 뒤에도 당류 부담을 먼저 줄이고 싶은 경우에 비교하기 좋습니다.",
  },
  {
    href: "/product/hymune-balance-active-deepchoco-250",
    productId: "hymune-balance-active-deepchoco-250",
    title: "하이뮨 프로틴 밸런스 액티브 딥초코",
    label: "일상 보완형 후보",
    body: "단백질 20g 제품군으로, 운동용보다는 저녁 식사에서 부족한 단백질을 보완하는 후보로 먼저 볼 만합니다.",
  },
  {
    href: "/product/sellex-profit-milk-vanilla-250",
    productId: "sellex-profit-milk-vanilla-250",
    title: "셀렉스 프로핏 밀크 바닐라",
    label: "저당·저칼로리 확인",
    body: "단백질 20g, 당류와 칼로리 부담을 함께 보는 사용자에게 비교 기준점으로 쓰기 좋은 RTD 후보입니다.",
  },
];
const nightProducts = productRecommendations.map((item) => {
  const product = getDrinkProducts().find((candidate) => candidate.slug === item.productId);
  if (!product) throw new Error(`Unknown drink product: ${item.productId}`);
  return product;
});

const faqItems = [
  {
    question: "자기 전에 단백질 음료를 마셔도 괜찮나요?",
    answer: "괜찮습니다. 자기 전에 먹은 단백질도 밤사이 소화·흡수되어 근육 합성에 쓰인다는 연구가 있습니다(Res 2012). 다만 하루 총열량 안에서 마셔야 하므로, 운동을 안 하거나 체중을 줄이는 중이라면 20g 전후 저당·저열량 제품이 부담이 적습니다.",
  },
  {
    question: "자기 전 단백질은 근육에 효과가 있나요?",
    answer: "근력 운동을 하는 사람에게는 근거가 있습니다. 12주 동안 자기 전 단백질 27.5g을 먹은 쪽이 허벅지 근육 단면적이 더 늘었습니다(Snijders 2015, +8.4 vs +4.8cm²). 다만 이 연구는 보충군의 하루 총 단백질도 많아, 시간보다 총량 효과일 수 있습니다. 노인에서는 40g에서만 밤사이 근육 합성이 올랐습니다(Kouw 2017).",
  },
  {
    question: "자기 전에 단백질을 먹으면 살찌나요?",
    answer: "밤에 먹었다는 이유만으로 살이 더 찐다는 근거는 약합니다. 체중은 하루 총열량으로 정해지며, 과식 실험에서도 체지방은 단백질 비율과 관계없이 남는 열량만큼 늘었습니다(Bray 2012). 음료 1병 열량(약 100~200kcal)이 하루 총량을 넘기지 않게 보세요.",
  },
  {
    question: "야식 대신 단백질 음료를 마셔도 되나요?",
    answer: "배고픔 해소용으로 당류·칼로리가 있는 제품을 반복하면 체중 관리가 흔들리기 쉽습니다. 야식 대체가 목적이라면 저당·저칼로리 제품을 먼저 확인하는 것이 안전합니다.",
  },
  {
    question: "운동을 늦게 끝냈을 때도 밤에 마셔도 되나요?",
    answer: "운동 직후 회복 목적이라면 늦은 시간이어도 보충 자체가 더 중요할 수 있습니다. 다만 자기 직전이라면 너무 무겁지 않은 제품을 고르는 것이 낫습니다.",
  },
  {
    question: "세 후보 중 열량이 가장 낮은 제품은 무엇인가요?",
    answer: `셀렉스 프로핏 ${nightProducts[2].calories}kcal, 테이크핏 맥스 ${nightProducts[0].calories}kcal, 하이뮨 액티브 ${nightProducts[1].calories}kcal 순입니다.`,
  },
  {
    question: "밤 후보의 당류와 100kcal당 단백질은 어떻게 다른가요?",
    answer: `당류는 테이크핏 ${nightProducts[0].sugar}g, 하이뮨 ${nightProducts[1].sugar}g, 셀렉스 ${nightProducts[2].sugar}g입니다. 100kcal당 단백질은 각각 ${(nightProducts[0].proteinPerServing / (nightProducts[0].calories ?? 1) * 100).toFixed(1)}g, ${(nightProducts[1].proteinPerServing / (nightProducts[1].calories ?? 1) * 100).toFixed(1)}g, ${(nightProducts[2].proteinPerServing / (nightProducts[2].calories ?? 1) * 100).toFixed(1)}g입니다.`,
  },
];

export default function NightProteinDrinkPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/night-protein-drink', dateModified: "2026-11-02", faq: faqItems });
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>자기 전 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
            <span className="ml-2 text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            자기 전 단백질, 근육에 효과 있을까?
            <br />
            연구 결과와 밤에 마실 때의 기준
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            자기 전 단백질은 저녁 근력 운동을 한 사람에게 카제인 30~40g을 먹인 연구에서 밤사이 근육 합성을 높였습니다(Res
            2012, Kouw 2017). 운동을 안 한다면 저녁 식사에서 부족한 양만 채우고 하루 총열량을 확인하세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="border-y border-[#dce8df] py-5">
            <h2 className="text-lg font-bold text-[var(--foreground)]">핵심 결론</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              근력 운동을 하는 사람에게 자기 전 단백질(연구에서는 카제인 30~40g)은 밤사이 근육 합성을 높였고, 12주 연구에서 근육
              증가도 더 컸습니다. 운동을 안 한다면 밤이라서 특별히 좋을 이유는 없고, 저녁 식사에서 모자란 단백질을 채우는 보충으로
              충분합니다. 살찌는지는 시간보다 하루 총열량이 정하므로, 야식 대신이라면 당류와 열량부터 확인하세요.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TrackedLink href="/topics/low-sugar-protein-drink" trackingLabel="저당 단백질 음료 보기" trackingSection="night_protein_hero" trackingPageType="guide" contentId="plv3:landing:guide:night-protein-drink" linkPosition="hero" ctaType="related_products" className="rounded-full border border-[#dce8df] px-4 py-2 text-sm font-semibold text-[#24543d] hover:bg-[#f6fbf7]">저당 단백질 음료 보기</TrackedLink>
              <TrackedLink href="/guides/product-selection-comparison/protein-drink-top10" trackingLabel="단백질 음료 후보 비교" trackingSection="night_protein_hero" trackingPageType="guide" contentId="plv3:landing:guide:night-protein-drink" linkPosition="hero" ctaType="compare" className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">단백질 음료 후보 비교</TrackedLink>
            </div>
          </section>
          <GuideBuySection topic="night" variant="top" />
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자기 전 단백질은 근육 합성에 효과 있나요?</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">연구</th>
                    <th className="px-3 py-3 font-semibold">대상·비교</th>
                    <th className="px-3 py-3 font-semibold">결과</th>
                  </tr>
                </thead>
                <tbody>
                  {sleepStudyRows.map(([study, design, result]) => (
                    <tr key={study} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className="px-3 py-3 font-semibold text-[var(--foreground)]">{study}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{design}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              연구는 대부분 근력 운동을 하는 사람, 천천히 소화되는 카제인 30~40g으로 했습니다. 운동하지 않는 사람이 20g 안팎 음료를
              마셨을 때도 같은 효과가 있는지는 확인되지 않았습니다. 하루 전체 배치는{" "}
              <Link href="/guides/intake-strategy-health/protein-timing" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
                단백질 먹는 시간
              </Link>
              , 한 끼 양은{" "}
              <Link href="/guides/basics/muscle" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
                근육 합성에 단백질 얼마나
              </Link>
              에 정리했습니다.
            </p>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">밤 시간대에 마셔도 되는 경우</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">판단</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">밤에는 이 3가지만 보면 됩니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {checkCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 overflow-x-auto"><table className="min-w-[680px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-[#dce8df]"><th className="px-3 py-3 font-semibold">제품</th><th className="px-3 py-3 text-right font-semibold">단백질</th><th className="px-3 py-3 text-right font-semibold">당류</th><th className="px-3 py-3 text-right font-semibold">열량</th><th className="px-3 py-3 text-right font-semibold">나트륨</th><th className="px-3 py-3 text-right font-semibold">100kcal당 단백질</th></tr></thead>
              <tbody>{nightProducts.map((product) => (
                <tr key={product.slug} className="border-b border-[#eef1f3] last:border-b-0"><td className="px-3 py-3 font-medium text-[var(--foreground)]">{product.brand} {product.name}</td><td className="px-3 py-3 text-right">{product.proteinPerServing}g</td><td className="px-3 py-3 text-right">{product.sugar}g</td><td className="px-3 py-3 text-right">{product.calories}kcal</td><td className="px-3 py-3 text-right">{product.sodium}mg</td><td className="px-3 py-3 text-right">{(product.proteinPerServing / (product.calories ?? 1) * 100).toFixed(1)}g</td></tr>
              ))}</tbody>
            </table></div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별로는 이렇게 다릅니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {nightCases.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">밤에 마실 제품은 이 후보부터 확인하세요</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              밤 시간대에는 고함량 제품을 무조건 고르기보다 당류, 칼로리, 마시는 목적을 먼저 맞추는 편이 안전합니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {productRecommendations.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  trackingLabel={`${item.title} 상세 보기`}
                  trackingSection="night_protein_product_recommendations"
                  trackingPageType="guide"
                  contentId="plv3:landing:guide:night-protein-drink"
                  productId={item.productId}
                  linkPosition="mid_content"
                  ctaType="product_detail"
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white"
                >
                  <span className="text-xs font-semibold text-[#7a5230]">{item.label}</span>
                  <h3 className="mt-2 text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)]">제품 상세 보기</span>
                </TrackedLink>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">많이 하는 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {mistakeList.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">💬 자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border border-[#dce8df] bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-[var(--foreground)]">Q. {item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 다음으로 보면 좋은 비교 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <section className="mt-6 rounded-2xl border border-[#e8e6e3] bg-white px-5 py-4">
          <h2 className="text-sm font-bold text-[var(--foreground)]">출처</h2>
          <ul className="mt-2 space-y-1 text-xs leading-5 text-[var(--foreground-muted)]">
            {sleepSources.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </section>
      </main>
      <GuideBuySection topic="night" />
      <Footer />
    </div>
  );
}
