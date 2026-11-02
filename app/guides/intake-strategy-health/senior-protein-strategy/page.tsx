import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import drinkProducts from "@/app/data/drinkProductsData.json";

// 2026-11-02 질문 허브 A-2: '노인 단백질 섭취량' 질문형으로 같은 주소를 다시 썼다(기존 제목 "어르신 단백질 보충 | 노인 단백질 음료·두유 성분 비교").
const pageTitle = "노인 단백질 섭취량 — 65세 이상 하루 얼마나? 권장량·체중별 표와 근감소증 기준";
const pageDescription =
  "65세 이상 단백질 하루 권장량(2020 한국인 영양소 섭취기준 남 60g·여 50g), 유럽 PROT-AGE·ESPEN 권고(체중 1kg당 1.0~1.2g), 한국 노인이 실제로 먹는 양(75세 이상 여성 권장량의 75%), 한 끼 양, 근감소증 자가 점검과 신장 질환 주의점, 작은 용량 단백질 음료 성분표까지 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/senior-protein-strategy";

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

// 식사량이 적은 어르신을 위해 250mL 이하·단백질 10g 이상·당류 5g 이하 음료를 성분표에서 고른다.
type DrinkRow = { slug: string; brand: string; name: string; capacity: string; proteinPerServing: number; calories: number; sugar: number; coupangUrl?: string };
const FALLBACK_LINK = "gaIdNRGs2u";
const volumeMl = (capacity: string) => {
  const match = String(capacity).match(/([\d.]+)\s*m[lL]/);
  return match ? Number(match[1]) : null;
};
const seniorDrinks = (drinkProducts as DrinkRow[])
  .filter((d) => {
    const ml = volumeMl(d.capacity);
    return ml !== null && ml <= 250 && d.proteinPerServing >= 10 && d.sugar <= 5 && !(d.coupangUrl ?? "").includes(FALLBACK_LINK);
  })
  .map((d) => ({ ...d, ml: volumeMl(d.capacity) as number }))
  .sort((a, b) => b.proteinPerServing - a.proteinPerServing || a.ml - b.ml || a.calories - b.calories);
// 표는 브랜드마다 1개씩(맛만 다른 제품이 줄을 채우지 않게)
const seniorDrinkTable = seniorDrinks.filter((d, i, arr) => arr.findIndex((x) => x.brand === d.brand) === i).slice(0, 8);
const smallBottleCount = seniorDrinks.filter((d) => d.ml <= 200).length;

const quickAnswer = [
  "2020 한국인 영양소 섭취기준의 65세 이상 단백질 권장섭취량은 남자 하루 60g, 여자 50g입니다. 근감소증과 노쇠를 막기 위해 50~64세와 같은 수준으로 정했습니다. 체중으로 보면 1kg당 약 0.91g입니다.",
  "유럽 노인 단백질 연구그룹(PROT-AGE 2013)과 유럽임상영양대사학회(ESPEN 2014)는 건강한 65세 이상에게 이보다 높은 체중 1kg당 1.0~1.2g, 급성·만성 질환이 있으면 1.2~1.5g을 권합니다. 60kg이면 하루 60~72g입니다.",
  "실제로는 나이가 들수록 덜 먹습니다. 국민건강영양조사(2013~2017)에서 75세 이상 여성의 하루 평균 섭취량은 37.7g으로 권장량의 75%였습니다. 한 끼에 체중 1kg당 약 0.4g(60kg이면 24g)을 3끼에 고르게 먹고, 근력 운동을 같이 하는 것이 연구에서 확인된 방법입니다. 신장 질환이 있으면 먼저 의료진과 상담하세요.",
];

// 2020 한국인 영양소 섭취기준(단백질) — basics/daily-requirement와 같은 값
const kdriRows: Array<[string, number, number, number, number]> = [
  ["50~64세", 50, 60, 40, 50],
  ["65~74세", 50, 60, 40, 50],
  ["75세 이상", 50, 60, 40, 50],
];

// 국민건강영양조사 2013~2017 하루 평균 섭취량(같은 자료 Table 1)
const intakeRows: Array<[string, string, string]> = [
  ["남자 65~74세", "69.2g", "115%"],
  ["남자 75세 이상", "58.0g", "97%"],
  ["여자 65~74세", "49.6g", "99%"],
  ["여자 75세 이상", "37.7g", "75%"],
];

const guidelineRows: Array<[string, string, string]> = [
  ["한국 권장섭취량(2020)", "체중 1kg당 약 0.91g (남 60g, 여 50g)", "대부분의 건강한 사람이 부족하지 않을 양. 65세 이상도 50~64세와 같은 기준"],
  ["PROT-AGE(2013)", "건강한 65세 이상 1.0~1.2g/kg", "운동하는 노인은 1.2g/kg 이상, 급성·만성 질환 1.2~1.5g/kg. 한 끼 25~30g 제안"],
  ["ESPEN(2014)", "건강한 노인 1.0~1.2g/kg", "급성·만성 질환으로 영양 불량 위험이 있으면 1.2~1.5g/kg"],
  ["예외: 신장 질환", "투석 전 만성 신장 질환 3~5기는 0.55~0.6g/kg", "KDOQI 2020. 고단백 권고가 적용되지 않으므로 의료진 지시를 따름"],
];

const evidenceRows: Array<[string, string, string]> = [
  ["Houston 2008 (Health ABC)", "70~79세 2,066명을 3년 추적", "단백질 섭취 상위 20%는 하위 20%보다 제지방이 약 40% 덜 줄었음(0.50kg vs 0.88kg 감소). 관찰 연구라 인과는 단정할 수 없음"],
  ["Moore 2015", "노인과 젊은 남성의 한 끼 반응 비교", "근육 합성이 최대에 가까워지는 한 끼 양이 노인 약 0.40g/kg, 젊은 성인 약 0.24g/kg. 같은 양에 대한 반응이 노인에서 둔함"],
  ["Kortebein 2007", "건강한 노인 10일 침상 안정", "다리 제지방 약 0.95kg 감소. 입원·와병처럼 움직이지 않는 기간에 근육이 빠르게 줄어듦"],
];

const weights = [45, 50, 55, 60, 65, 70, 75];

const awgsRows: Array<[string, string, string]> = [
  ["악력", "남자 28kg 미만, 여자 18kg 미만", "보건소·병원 악력계"],
  ["의자에서 5번 일어나기", "12초 이상 걸림", "팔짱 끼고 의자에서 5회 일어섰다 앉기"],
  ["보행 속도", "초속 1.0m 미만", "6m를 평소 걸음으로 걷는 시간"],
];

const mealTips: Array<[string, string]> = [
  ["끼니마다 나누기", "저녁 한 끼에 몰리지 않게 아침·점심에도 단백질 반찬을 하나씩 둡니다. PROT-AGE는 한 끼 25~30g을 제안합니다."],
  ["씹기 어려울 때", "달걀찜, 두부, 생선살, 다진 고기, 우유·요거트·두유처럼 부드러운 단백질 식품을 먼저 씁니다. 삼킴이 어렵다면 의료진 안내가 우선입니다."],
  ["입맛이 없을 때", "밥보다 단백질 반찬을 먼저 먹고, 모자라면 작은 용량의 단백질 음료를 간식으로 더합니다."],
  ["근력 운동", "의자 일어서기, 밴드 운동처럼 다리에 부하를 주는 운동을 같이 해야 단백질이 근육으로 이어집니다."],
];

const faqItems = [
  {
    question: "65세 이상 노인 단백질 하루 권장량은 얼마인가요?",
    answer:
      "2020 한국인 영양소 섭취기준에서 65세 이상 권장섭취량은 남자 60g, 여자 50g입니다(체중 1kg당 약 0.91g). 유럽 PROT-AGE·ESPEN은 건강한 노인에게 체중 1kg당 1.0~1.2g을 권합니다.",
  },
  {
    question: "노인은 젊은 사람보다 단백질을 더 먹어야 하나요?",
    answer:
      "체중당으로는 더 필요하다는 연구가 많습니다. 같은 양을 먹어도 근육 합성 반응이 둔해, 한 끼 최대 반응에 필요한 양이 노인 약 0.40g/kg으로 젊은 성인 약 0.24g/kg보다 높았습니다(Moore 2015). 그래서 PROT-AGE는 1.0~1.2g/kg을 제안합니다.",
  },
  {
    question: "어르신 단백질 음료는 어떤 것을 고르나요?",
    answer:
      "식사량이 적다면 용량이 작고(250mL 이하) 한 병 단백질이 10g 이상, 당류가 낮은 제품이 부담이 적습니다. 우유를 마시면 배가 불편한 분은 락토프리 표시를 확인하세요. 음료는 식사를 대신하기보다 모자란 끼니에 더하는 용도가 맞습니다.",
  },
  {
    question: "신장이 안 좋은 노인도 단백질을 늘려야 하나요?",
    answer:
      "아닙니다. 투석 전 만성 신장 질환(3~5기)은 오히려 단백질을 체중 1kg당 0.55~0.6g으로 줄이도록 권고됩니다(KDOQI 2020). 신장 기능 검사 결과가 있다면 단백질을 늘리기 전에 담당 의료진과 상담하세요.",
  },
  {
    question: "근감소증인지 집에서 확인할 수 있나요?",
    answer:
      "아시아 근감소증 기준(AWGS 2019)의 근력·신체 기능 항목으로 미리 점검할 수 있습니다. 악력이 남자 28kg·여자 18kg 미만이거나, 의자에서 5번 일어서는 데 12초 이상 걸리면 보건소나 병원에서 근육량 검사를 받아 보세요.",
  },
];

const relatedLinks = [
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 실제 섭취량." },
  { href: "/guides/basics/deficiency-symptoms", title: "단백질 부족 증상", body: "근력 감소·부종 등 신호와 근감소증 점검." },
  { href: "/guides/basics/muscle", title: "근육 합성에 단백질 얼마나?", body: "한 끼 양·하루 총량·나이에 따른 차이." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다 섭취 부작용", body: "신장 기능과 단백질, 어디부터 조심할지." },
  { href: "/guides/product-selection-comparison/protein-drink-for-50s", title: "50대 단백질 음료 비교", body: "등록 음료의 단백질·당류·열량 비교." },
  { href: "/guides/product-selection-comparison/high-protein-soymilk-guide", title: "단백질 두유 성분 비교", body: "대두 기반 제품을 찾는 경우." },
];

const sources = [
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준",
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (연령별 기준·국민건강영양조사 2013~2017 섭취량)",
  "Bauer J et al., Evidence-based recommendations for optimal dietary protein intake in older people: a position paper from the PROT-AGE Study Group. J Am Med Dir Assoc 2013;14(8):542-559",
  "Deutz NEP et al., Protein intake and exercise for optimal muscle function with aging: recommendations from the ESPEN Expert Group. Clin Nutr 2014;33(6):929-936",
  "Houston DK et al., Dietary protein intake is associated with lean mass change in older, community-dwelling adults: the Health, Aging, and Body Composition (Health ABC) Study. Am J Clin Nutr 2008;87(1):150-155",
  "Moore DR et al., Protein ingestion to stimulate myofibrillar protein synthesis requires greater relative protein intakes in healthy older versus younger men. J Gerontol A Biol Sci Med Sci 2015;70(1):57-62",
  "Kortebein P et al., Effect of 10 days of bed rest on skeletal muscle in healthy older adults. JAMA 2007;297(16):1772-1774",
  "Chen LK et al., Asian Working Group for Sarcopenia: 2019 Consensus Update on Sarcopenia Diagnosis and Treatment. J Am Med Dir Assoc 2020;21(3):300-307",
  "Ikizler TA et al., KDOQI Clinical Practice Guideline for Nutrition in CKD: 2020 Update. Am J Kidney Dis 2020;76(3 Suppl 1):S1-S107",
  `ProteinLab 등록 단백질 음료 성분표: 250mL 이하·단백질 10g 이상·당류 5g 이하 ${seniorDrinks.length}개, 2026-11-02 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function SeniorProteinStrategyPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    dateModified: "2026-11-02",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    seniorDrinkTable.slice(0, 3).map((d) => ({ slug: d.slug, contextLabel: `${d.ml}mL · 단백질 ${d.proteinPerServing}g · 당류 ${d.sugar}g` })),
  );

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
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략 & 건강</Link>
            <span>/</span>
            <span>노인 단백질 섭취량</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">대상별 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            노인 단백질, 하루 얼마나 먹어야 할까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            65세 이상 권장량, 국제 권고, 한국 노인의 실제 섭취량, 한 끼 양과 근감소증 점검까지 공식 기준과 연구로 정리했습니다.
            질환이 있거나 약을 먹고 있다면 이 글보다 담당 의료진의 안내가 우선입니다.
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
          <GuideProductHeroCards products={heroProducts} />
          <GuideBuySection topic="general" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">65세 이상 단백질 권장량 (2020 한국인 영양소 섭취기준)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>나이</th>
                    <th className={thClass}>남자 평균필요량</th>
                    <th className={thClass}>남자 권장섭취량</th>
                    <th className={thClass}>여자 평균필요량</th>
                    <th className={thClass}>여자 권장섭취량</th>
                  </tr>
                </thead>
                <tbody>
                  {kdriRows.map(([age, mEar, mRni, fEar, fRni]) => (
                    <tr key={age} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{age}</td>
                      <td className={tdClass}>{mEar}g</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{mRni}g</td>
                      <td className={tdClass}>{fEar}g</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{fRni}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              평균필요량은 절반의 사람이 충분한 양, 권장섭취량은 대부분의 사람이 부족하지 않은 양입니다. 2020년 개정에서 근감소증과
              노쇠 예방을 이유로 65세 이상 기준을 50~64세와 같은 수준으로 정했습니다. 나이대별 전체 표는{" "}
              <Link href="/guides/basics/daily-requirement" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
                단백질 하루 섭취량
              </Link>
              에 있습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">한국 노인은 실제로 얼마나 먹나</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>구분</th>
                    <th className={thClass}>하루 평균 섭취량</th>
                    <th className={thClass}>권장섭취량 대비</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeRows.map(([group, amount, ratio]) => (
                    <tr key={group} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{group}</td>
                      <td className={tdClass}>{amount}</td>
                      <td className={tdClass}>{ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              국민건강영양조사 2013~2017 평균입니다. 65~74세는 평균이 권장량 근처지만, 75세 이상 여성은 권장량의 4분의 3에
              그칩니다. 평균이므로 식사량이 적은 분은 이보다 더 모자랄 수 있습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">국제 권고는 체중 1kg당 1.0~1.2g</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>기준</th>
                    <th className={thClass}>하루 양</th>
                    <th className={thClass}>내용</th>
                  </tr>
                </thead>
                <tbody>
                  {guidelineRows.map(([name, amount, note]) => (
                    <tr key={name} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{name}</td>
                      <td className={tdClass}>{amount}</td>
                      <td className={tdClass}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중별 하루 목표와 한 끼 양</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>체중</th>
                    <th className={thClass}>권장량 0.91g/kg</th>
                    <th className={thClass}>PROT-AGE 1.0~1.2g/kg</th>
                    <th className={thClass}>한 끼 0.4g/kg</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((w) => (
                    <tr key={w} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{w}kg</td>
                      <td className={tdClass}>{Math.round(w * 0.91)}g</td>
                      <td className={tdClass}>
                        {Math.round(w * 1.0)}~{Math.round(w * 1.2)}g
                      </td>
                      <td className={tdClass}>약 {Math.round(w * 0.4)}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              한 끼 0.4g/kg은 노인에서 근육 합성 반응이 최대에 가까워진 양(Moore 2015)입니다. 3끼에 이 양을 먹으면 하루 1.2g/kg에
              가까워집니다. 밥과 채소 반찬만으로는 이 양에 못 미치기 쉬워, 끼니마다 고기·생선·달걀·두부 같은 단백질 반찬이 있어야 합니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질이 노인 근육에 주는 영향 — 연구</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>연구</th>
                    <th className={thClass}>대상</th>
                    <th className={thClass}>결과</th>
                  </tr>
                </thead>
                <tbody>
                  {evidenceRows.map(([study, design, result]) => (
                    <tr key={study} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{study}</td>
                      <td className={tdClass}>{design}</td>
                      <td className={tdClass}>{result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">근감소증 자가 점검 (AWGS 2019)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>항목</th>
                    <th className={thClass}>기준(이 경우 의심)</th>
                    <th className={thClass}>재는 법</th>
                  </tr>
                </thead>
                <tbody>
                  {awgsRows.map(([item, cutoff, how]) => (
                    <tr key={item} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{item}</td>
                      <td className={tdClass}>{cutoff}</td>
                      <td className={tdClass}>{how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              하나라도 해당하면 근감소증 가능성이 있어 근육량 검사를 받아 보는 것이 좋습니다. 진단은 근육량 측정까지 거쳐 의료진이
              내립니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사로 채우는 방법</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {mealTips.map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사량이 적을 때 — 작은 용량 단백질 음료 성분</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 음료 중 250mL 이하·단백질 10g 이상·당류 5g 이하 {seniorDrinks.length}개(200mL 이하는 {smallBottleCount}개)에서
              브랜드별로 단백질이 많은 순으로 골랐습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {seniorDrinkTable.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.ml}mL</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{d.calories}kcal</td>
                      <td className={tdClass}>{d.sugar}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              성분은 제조사 표기 1병 기준입니다. 우유를 마시면 배가 불편하면 락토프리 표시, 대두 알레르기가 있으면 원재료명을
              확인하세요. 신장 질환·당뇨가 있으면 제품을 고르기 전에 의료진과 상담하세요.
            </p>
          </section>

          <GuideCompareListCta category="drink" slugs={seniorDrinkTable.slice(0, 3).map((d) => d.slug)} />

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

      <GuideBuySection topic="general" />
      <Footer />
    </div>
  );
}
