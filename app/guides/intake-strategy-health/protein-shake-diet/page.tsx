import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { MILK_200ML, drinkStats, shakeStats } from "@/app/lib/shakeStats";

const pageTitle = "단백질 쉐이크 다이어트 — 한 끼 대신? 간식 대신? 열량·단백질 기준과 연구";
const pageDescription =
  "단백질 쉐이크(단백질 음료 포함)로 다이어트할 때 한 끼 대용과 간식 대체 중 무엇이 맞는지, 식사대용 연구(Heymsfield 2003)와 고단백 감량 연구(Leidy 2015), 식약처 체중조절용 조제식품 기준(1회 200~400kcal), 등록 쉐이크 112개 열량·당류 분포로 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-shake-diet";

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
  "단백질 쉐이크 다이어트가 되는 원리는 하나입니다. 평소 먹던 한 끼나 간식을 '열량은 더 적고 단백질은 충분한' 쉐이크로 바꾸는 것. 먹던 식사에 쉐이크를 더하면 살은 빠지지 않습니다.",
  "하루 1~2끼를 식사대용 제품으로 바꾼 방식은 일반 저열량 식단보다 3개월에 약 2.5kg 더 감량했지만(Heymsfield 2003), 1년 뒤 차이는 통계적으로 뚜렷하지 않았습니다. 쉐이크는 시작을 돕는 도구이고, 유지는 식습관이 결정합니다.",
  `등록 쉐이크 ${shakeStats.total}개는 물에 타면 1포 ${shakeStats.minKcal}~${shakeStats.maxKcal}kcal(중앙값 ${shakeStats.medianKcal}kcal)로 한 끼로는 가볍습니다. 한 끼를 대신할 때는 우유나 과일·달걀을 더해 200~400kcal를 맞추고, 하루 한 끼 이상은 일반 식사를 하세요(식약처 권고).`,
];

const methodRows: Array<[string, string, string]> = [
  ["간식·야식을 쉐이크로", "가장 무난", "과자·빵·달달한 음료 대신이면 열량은 비슷하거나 줄고 단백질은 늘어납니다. 당류 5g 이하 제품이 맞습니다."],
  ["아침 한 끼를 쉐이크로", "효과적", "거르던 아침이면 오히려 열량이 늘 수 있으니 '먹던 아침'을 바꿀 때 씁니다. 우유 200mL를 더하면 한 끼 열량 범위에 듭니다."],
  ["하루 두 끼를 쉐이크로", "단기간만", "연구에서 감량 폭이 가장 컸던 방식이지만, 식약처는 하루 한 끼 이상 일반 식사를 권합니다. 장기간 계속하기 어렵습니다."],
  ["세 끼 모두 쉐이크", "권하지 않음", "채소·과일·다양한 식품을 놓치고, 성장기·임신·수유 중이거나 치료 중인 환자는 체중조절용 식품 섭취를 자제하라는 것이 식약처 안내입니다."],
  ["식사는 그대로 + 쉐이크 추가", "감량 효과 없음", "1포 150kcal 안팎이 그대로 더해집니다. 운동 후 단백질 보충이 목적일 때만 의미가 있습니다."],
];

const weights = [50, 60, 70, 80];

const mistakes = [
  "쉐이크만 마시고 저녁에 폭식하는 경우 — 하루 합계가 줄지 않습니다. 저녁 직전 허기가 크면 오후 간식을 쉐이크로 바꾸는 편이 낫습니다.",
  "물에 탄 쉐이크 1포(100~200kcal)로 한 끼를 계속 버티는 경우 — 열량이 너무 낮아 오래 못 갑니다. 한 끼라면 200~400kcal가 기준입니다.",
  "단백질 g만 보고 당류를 놓치는 경우 — 등록 쉐이크 중 당류 5g을 넘는 제품도 있습니다.",
  "감량 후 쉐이크를 끊으면서 원래 식사로 바로 돌아가는 경우 — 1년 연구에서 차이가 줄어든 이유 중 하나로 봅니다(추정).",
];

const faqItems = [
  {
    question: "단백질 쉐이크로 다이어트하면 살이 빠지나요?",
    answer:
      "먹던 한 끼나 간식을 쉐이크로 '바꿔서' 하루 열량이 줄면 빠집니다. 식사대용 제품으로 하루 1~2끼를 바꾼 연구에서는 3개월에 일반 저열량 식단보다 약 2.5kg 더 빠졌습니다. 반대로 식사에 더해 마시면 열량만 늘어납니다.",
  },
  {
    question: "단백질 쉐이크로 한 끼를 대신해도 되나요?",
    answer: `하루 한두 끼는 괜찮지만, 물에 탄 쉐이크 1포는 중앙값 ${shakeStats.medianKcal}kcal로 한 끼로는 가볍습니다. 식약처의 체중조절용 조제식품 기준(1회 200~400kcal)에 맞추려면 흰 우유 200mL(약 ${MILK_200ML.kcal}kcal, 추정)나 과일·달걀을 더하세요. 하루 한 끼 이상은 일반 식사를 하는 것이 식약처 권고입니다.`,
  },
  {
    question: "다이어트할 때 단백질은 하루 얼마나 먹어야 하나요?",
    answer:
      "감량 연구를 정리한 Leidy 등(2015)은 하루 체중 1kg당 1.2~1.6g, 끼니당 25~30g 정도의 고단백 식사가 포만감과 근육 유지에 유리하다고 정리했습니다. 체중 60kg이면 하루 72~96g입니다. 신장 질환이 있으면 의료진과 먼저 상의하세요.",
  },
  {
    question: "다이어트 쉐이크는 물에 타나요, 우유에 타나요?",
    answer:
      "간식 대신이면 물, 한 끼 대신이면 우유(또는 무가당 두유)가 맞습니다. 우유를 쓰면 열량과 단백질이 함께 늘어 한 끼 기준에 가까워지고 포만감도 오래갑니다.",
  },
  {
    question: "저녁만 단백질 쉐이크로 바꾸면 어떤가요?",
    answer:
      "저녁이 하루 중 가장 많이 먹는 끼니라면 효과가 큽니다. 다만 밤에 허기가 와서 야식을 먹게 되면 소용이 없으니, 우유를 더하거나 채소를 곁들여 포만감을 확보하세요.",
  },
  {
    question: "단백질 쉐이크와 단백질 음료 중 다이어트에는 무엇이 낫나요?",
    answer: `한 끼 대용이면 식이섬유·곡물이 든 쉐이크, 간식 대체나 운동 후 보충이면 열량이 낮은 단백질 음료가 맞습니다. 등록 제품 중앙값은 쉐이크 1포 ${shakeStats.medianKcal}kcal·식이섬유 ${shakeStats.medianFiber}g, 음료 1병 ${drinkStats.medianKcal}kcal입니다.`,
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/protein-drink-weight-gain",
    title: "단백질 쉐이크·음료 살찌나요",
    body: "1개 열량을 하루 기준으로 계산해 봤습니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-shake-effects",
    title: "단백질 쉐이크 효과",
    body: "근육·포만감·식사대용, 연구로 확인한 효과.",
  },
  {
    href: "/guides/product-selection-comparison/diet-protein-shake",
    title: "다이어트 단백질 쉐이크 비교",
    body: "칼로리·당류·식이섬유 기준으로 제품을 좁힙니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-shake-calorie-ranking",
    title: "단백질 쉐이크 칼로리 순위",
    body: "1포 열량이 낮은 순서로 봅니다.",
  },
  {
    href: "/guides/intake-strategy-health/weight-management-protein",
    title: "체중 관리와 단백질",
    body: "감량·유지 단계별 단백질 기준.",
  },
  {
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    title: "식사대용 전략",
    body: "식사대용과 보충용을 구분하는 법.",
  },
];

const sources = [
  "Heymsfield SB et al., Weight management using a meal replacement strategy: meta and pooling analysis from six studies. Int J Obes 2003;27(5):537-549",
  "Leidy HJ et al., The role of protein in weight loss and maintenance. Am J Clin Nutr 2015;101(6):1320S-1329S",
  "식품의약품안전처, 체중조절용 조제식품 안내(1회 섭취 열량 200~400kcal, 하루 한 끼 이상 일반 식사 권고) — 식약처 웹진 2013-05 및 보도자료",
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준",
  `ProteinLab 등록 제품 성분표 데이터: 단백질 쉐이크 ${shakeStats.total}개(1포 기준), 단백질 음료 ${drinkStats.total}개(1병 기준), 2026-11-02 집계`,
];

const cardClass = "rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinShakeDietPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    faq: faqItems,
  });

  // 단백질 20g 이상·200kcal 이하·당류 5g 이하 중 열량 대비 단백질이 높은 쉐이크(성분표 기준)
  const heroProducts = resolveGuideHeroProducts([
    { slug: "proteone-proteinshake-coffee-40", contextLabel: "108kcal · 단백질 22g" },
    { slug: "thedanbaek-proteinshake-powder-choco-32", contextLabel: "110kcal · 단백질 20g" },
    { slug: "itthefit-proteinshake-double-choco-40", contextLabel: "122kcal · 단백질 21.3g" },
  ]);

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
            <span>단백질 쉐이크 다이어트</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">다이어트 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 쉐이크 다이어트, 한 끼 대신일까 간식 대신일까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 쉐이크나 단백질 음료로 살을 빼려면 언제, 무엇을 바꿔야 하는지. 식사대용 연구와 식약처 기준, 등록 쉐이크{" "}
            {shakeStats.total}개의 성분표로 정리했습니다.
          </p>
          <GuideProductHeroCards products={heroProducts} />
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
          <GuideBuySection topic="diet" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">방법별 판단 — 무엇을 쉐이크로 바꿀까</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>방법</th>
                    <th className={thClass}>판단</th>
                    <th className={thClass}>이유</th>
                  </tr>
                </thead>
                <tbody>
                  {methodRows.map(([method, verdict, reason]) => (
                    <tr key={method} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{method}</td>
                      <td className={tdClass}>{verdict}</td>
                      <td className={tdClass}>{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">연구는 뭐라고 했나</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                <strong className="text-[var(--foreground)]">식사대용(Heymsfield 2003)</strong> — 6개 연구를 묶은 분석에서 하루
                1~2끼를 식사대용 제품으로 바꾼 쪽은 같은 열량 목표의 일반 식단보다 3개월에 약 2.54kg 더 감량했습니다. 1년
                시점에도 더 빠진 쪽이었지만 차이가 통계적으로 뚜렷하지 않았습니다. 분석에 참여한 연구자 일부가 식사대용 제품
                회사와 관련이 있었다는 점도 함께 봐야 합니다.
              </p>
              <p>
                <strong className="text-[var(--foreground)]">고단백 감량(Leidy 2015)</strong> — 감량 중 단백질을 하루 1.2~1.6g/kg,
                끼니당 25~30g 정도로 먹으면 포만감이 높고, 빠지는 체중 중 근육 비율이 줄어드는 경향이 정리됐습니다.
              </p>
              <p>
                둘을 합치면, 쉐이크는 &apos;열량은 줄이고 단백질은 지키는 한 끼·간식&apos;을 만들기 쉬운 도구입니다. 효과는 쉐이크
                자체보다 바뀐 하루 열량에서 나옵니다.
              </p>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">감량 중 하루 단백질 목표 — 체중별</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>체중</th>
                    {weights.map((w) => (
                      <th key={w} className={thClass}>{w}kg</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#f0ece5]">
                    <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>하루 1.2g/kg</td>
                    {weights.map((w) => (
                      <td key={w} className={tdClass}>{Math.round(w * 1.2)}g</td>
                    ))}
                  </tr>
                  <tr className="border-b border-[#f0ece5]">
                    <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>하루 1.6g/kg</td>
                    {weights.map((w) => (
                      <td key={w} className={tdClass}>{Math.round(w * 1.6)}g</td>
                    ))}
                  </tr>
                  <tr>
                    <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>쉐이크 1포({shakeStats.medianProtein}g)가 채우는 몫</td>
                    {weights.map((w) => (
                      <td key={w} className={tdClass}>
                        {Math.round((shakeStats.medianProtein / (w * 1.2)) * 100)}~{Math.round((shakeStats.medianProtein / (w * 1.6)) * 100)}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              쉐이크 1포는 목표의 2~4할입니다. 나머지는 식사로 채워야 하므로, 쉐이크로 바꾸지 않은 끼니에도 단백질 반찬을 챙기세요.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">등록 쉐이크 {shakeStats.total}개 — 다이어트 기준으로 보면</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                      <th className={thClass}>1포 열량(물)</th>
                      <th className={thClass}>제품 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shakeStats.kcalBuckets.map((b) => (
                      <tr key={b.label} className="border-b border-[#f0ece5] last:border-b-0">
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{b.label}</td>
                        <td className={tdClass}>{b.count}개</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                      <th className={thClass}>1포 당류</th>
                      <th className={thClass}>제품 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shakeStats.sugarBuckets.map((b) => (
                      <tr key={b.label} className="border-b border-[#f0ece5] last:border-b-0">
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{b.label}</td>
                        <td className={tdClass}>{b.count}개</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>· 단백질 20g 이상·200kcal 이하·당류 5g 이하인 제품: {shakeStats.dietFit}개</li>
              <li>
                · 물에 탔을 때 식약처 한 끼 기준(200~400kcal)에 드는 제품: {shakeStats.mealRangeWater}개 → 흰 우유 200mL를 더하면{" "}
                {shakeStats.mealRangeMilk}개
              </li>
              <li>· 식이섬유 3g 이상(포만감에 유리): {shakeStats.fiber3Plus}개</li>
            </ul>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              간식 대신이면 열량이 낮은 쪽을, 한 끼 대신이면 식이섬유가 많은 제품을 우유와 함께 고르는 것이 기준입니다. 우유
              열량은 시판 흰 우유 표시값 기준 추정치입니다.
            </p>
          </section>

          <GuideCompareListCta
            category="shake"
            slugs={["proteone-proteinshake-coffee-40", "thedanbaek-proteinshake-powder-choco-32", "itthefit-proteinshake-double-choco-40"]}
          />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">쉐이크 다이어트에서 자주 하는 실수</h2>
            <ul className="mt-4 space-y-2">
              {mistakes.map((item) => (
                <li key={item} className="rounded-xl border border-[#e8e3da] bg-[#fdfaf5] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  {item}
                </li>
              ))}
            </ul>
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
      <GuideBuySection topic="diet" />
      <Footer />
    </div>
  );
}
