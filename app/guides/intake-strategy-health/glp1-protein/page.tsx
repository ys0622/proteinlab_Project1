import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import drinkProducts from "@/app/data/drinkProductsData.json";

const pageTitle = "마운자로·위고비 단백질 — 근육 빠짐 막으려면 하루 얼마나? 2025 학회 권고로 정리";
const pageDescription =
  "마운자로(티르제파타이드)·위고비(세마글루타이드) 같은 GLP-1 비만 치료 중 단백질을 정리했습니다. 임상시험에서 빠진 체중 중 제지방 비율(약 25~40%), 2025 미국 4개 학회 공동 권고(하루 80~120g 또는 감량 중 1.2~1.6g/kg, 근력 운동 병행), 식사량이 적을 때 채우는 법과 250mL 이하 고단백 음료 성분표까지.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/glp1-protein";

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

// 식사량이 줄어 한 번에 많이 마시기 어려운 경우를 위해 250mL 이하·단백질 20g 이상·당류 3g 이하 음료를 성분표에서 고른다.
type DrinkRow = { slug: string; brand: string; name: string; capacity: string; proteinPerServing: number; calories: number; sugar: number; coupangUrl?: string };
const FALLBACK_LINK = "gaIdNRGs2u";
const volumeMl = (capacity: string) => {
  const match = String(capacity).match(/([\d.]+)\s*m[lL]/);
  return match ? Number(match[1]) : null;
};
const smallDrinks = (drinkProducts as DrinkRow[])
  .filter((d) => {
    const ml = volumeMl(d.capacity);
    return ml !== null && ml <= 250 && d.proteinPerServing >= 20 && d.sugar <= 3 && !(d.coupangUrl ?? "").includes(FALLBACK_LINK);
  })
  .map((d) => ({ ...d, ml: volumeMl(d.capacity) as number, per100: Math.round((d.proteinPerServing / (volumeMl(d.capacity) as number)) * 1000) / 10 }))
  .sort((a, b) => b.per100 - a.per100 || a.calories - b.calories);
// 표는 브랜드마다 1개씩(맛만 다른 제품이 줄을 채우지 않게)
const smallDrinkTable = smallDrinks.filter((d, i, arr) => arr.findIndex((x) => x.brand === d.brand) === i).slice(0, 8);

const quickAnswer = [
  "마운자로·위고비 같은 GLP-1 계열 비만 치료제는 식욕과 식사량을 줄여 체중을 낮춥니다. 이때 지방만 빠지지 않고 근육 등 제지방도 함께 빠집니다. 임상시험의 체성분 하위 연구에서 빠진 체중 중 제지방 비율은 마운자로(SURMOUNT-1) 약 4분의 1, 위고비(STEP 1) 약 40%였습니다.",
  "2025년 미국 4개 학회(ACLM·ASN·OMA·TOS) 공동 권고는 단백질을 충분히 먹고 근력 운동을 함께 하라고 정리했습니다. 수치로는 하루 80~120g, 감량 중 체중 1kg당 1.2~1.6g이 제안되며, 하루 0.4~0.5g/kg 아래로 내려가지 않게 하고 2g/kg 이상을 오래 먹는 것은 피하라고 했습니다.",
  "단백질만 늘려서는 근육을 지키기 어렵고 근력 운동이 같이 있어야 합니다. 식사량이 적으면 끼니마다 단백질 반찬부터 먹고, 모자라면 작은 용량의 고단백 음료로 채웁니다. 신장 질환이 있거나 메스꺼움·구토가 심하면 처방한 의료진과 먼저 상담하세요.",
];

const leanRows: Array<[string, string, string, string]> = [
  ["마운자로(티르제파타이드)", "SURMOUNT-1 체성분 하위 연구(Look 2025, 72주, 160명)", "지방량 약 34% 감소, 제지방량 약 11% 감소", "빠진 체중의 약 4분의 1"],
  ["위고비(세마글루타이드 2.4mg)", "STEP 1 체성분 하위 연구(Wilding 2021, 68주, 140명)", "제지방량 약 10% 감소", "빠진 체중의 약 40%(계산 방식에 따라 차이)"],
];

const adviceRows: Array<[string, string]> = [
  ["하루 단백질", "하루 80~120g, 또는 감량 중 체중 1kg당 1.2~1.6g이 제안됨. 비만이면 실제 체중으로 계산한 값이 과하게 나올 수 있어 고정 g 목표가 대안으로 제시됨"],
  ["하한·상한", "하루 0.4~0.5g/kg 아래로 내려가지 않게, 2g/kg 이상을 오래 먹는 것은 피함"],
  ["근력 운동", "단백질만으로는 근육 유지에 부족할 가능성이 높아 근력 운동을 함께 권고"],
  ["식사의 질", "식사량이 줄어드는 만큼 단백질·채소·과일·통곡물 등 영양 밀도가 높은 음식 위주로, 부족해지기 쉬운 영양소를 살핌"],
];

const mealRows: Array<[string, string, string]> = [
  ["80g", "약 27g", "음료 1병(20~25g)을 더하면 끼니당 약 18~20g"],
  ["100g", "약 33g", "음료 1병을 더하면 끼니당 약 25g"],
  ["120g", "40g", "음료 1병을 더하면 끼니당 약 32g"],
];

const faqItems = [
  {
    question: "마운자로·위고비 맞으면서 단백질은 하루 얼마나 먹어야 하나요?",
    answer:
      "2025년 미국 4개 학회 공동 권고에서는 하루 80~120g, 또는 감량 중 체중 1kg당 1.2~1.6g이 제안됩니다. 한국 성인 권장섭취량(체중 1kg당 0.91g)보다 높은 수준입니다. 신장 질환이 있으면 단백질을 늘리기 전에 의료진과 상담해야 합니다.",
  },
  {
    question: "GLP-1 주사로 살이 빠지면 근육도 빠지나요?",
    answer:
      "네, 일부는 빠집니다. 임상시험 체성분 하위 연구에서 빠진 체중 중 제지방은 마운자로 약 4분의 1, 위고비 약 40%였습니다. 다만 지방이 더 많이 빠져 몸에서 제지방이 차지하는 비율은 오히려 올라갔습니다. 근력 운동과 충분한 단백질이 제지방 손실을 줄이는 방법으로 권고됩니다.",
  },
  {
    question: "입맛이 없어 단백질을 다 못 먹겠어요.",
    answer:
      "식사 때 단백질 반찬(고기·생선·달걀·두부)을 먼저 먹고, 한 번에 많이 먹기 어려우면 끼니를 나누는 방법이 있습니다. 음식으로 모자라면 용량이 작은 단백질 음료(250mL 이하에 단백질 20g 이상)가 부담이 적습니다. 메스꺼움·구토가 계속되면 처방 의료진과 상담하세요.",
  },
  {
    question: "단백질 음료나 쉐이크로 식사를 대신해도 되나요?",
    answer:
      "식사량이 이미 줄어든 상태에서 식사까지 음료로 바꾸면 단백질 외의 영양소가 부족해지기 쉽습니다. 공동 권고도 영양 밀도가 높은 식사를 우선으로 둡니다. 음료는 식사로 모자란 단백질을 채우는 보충으로 쓰는 것이 맞습니다.",
  },
  {
    question: "단백질을 많이 먹으면 근육이 안 빠지나요?",
    answer:
      "단백질만으로는 부족합니다. 공동 권고는 단백질 섭취와 함께 근력 운동처럼 근육에 부하를 주는 운동을 강조합니다. 근육 합성은 운동 자극과 단백질이 함께 있을 때 가장 크게 올라갑니다.",
  },
];

const relatedLinks = [
  { href: "/guides/basics/muscle", title: "근육 합성에 단백질 얼마나?", body: "한 끼 20~40g·하루 총량·나누기, 연구로 정리." },
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "체중·나이·운동량별 하루 총량 계산." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다 섭취 부작용", body: "신장·소화 문제는 어디부터 조심해야 하나." },
  { href: "/guides/intake-strategy-health/protein-shake-diet", title: "단백질 쉐이크 다이어트", body: "식사 대신·간식 대신, 열량과 단백질 기준." },
  { href: "/guides/intake-strategy-health/weight-management-protein", title: "체중 관리와 단백질", body: "감량 중 근육을 지키는 식사 구성." },
  { href: "/guides/intake-strategy-health/protein-50g-at-once", title: "단백질 한 번에 몇 g?", body: "한 끼에 몰아 먹어도 되는지." },
];

const sources = [
  "Mozaffarian D et al., Nutritional priorities to support GLP-1 therapy for obesity: a joint Advisory from the American College of Lifestyle Medicine, the American Society for Nutrition, the Obesity Medicine Association, and The Obesity Society. Am J Clin Nutr / Obesity 2025",
  "Look M et al., Body composition changes during weight reduction with tirzepatide in the SURMOUNT-1 study of adults with obesity or overweight. Diabetes Obes Metab 2025",
  "Wilding JPH et al., Once-weekly semaglutide in adults with overweight or obesity (STEP 1). N Engl J Med 2021;384:989-1002 (DXA 하위 연구 포함)",
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준",
  `ProteinLab 등록 단백질 음료 성분표: 250mL 이하·단백질 20g 이상·당류 3g 이하 ${smallDrinks.length}개, 2026-11-02 집계`,
];

const cardClass = "rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function Glp1ProteinPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    smallDrinkTable.slice(0, 3).map((d) => ({ slug: d.slug, contextLabel: `${d.ml}mL · 단백질 ${d.proteinPerServing}g · ${d.calories}kcal` })),
  );

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
            <span>마운자로·위고비 단백질</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">건강 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            마운자로·위고비 맞는 중 단백질, 하루 얼마나 먹어야 할까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            GLP-1 계열 비만 치료제로 체중이 빠질 때 근육을 덜 잃으려면 무엇을 먹어야 하는지, 임상시험 결과와 2025년 학회 공동
            권고로 정리했습니다. 이 글은 약 사용법이 아니라 식사 정보이며, 복용·용량은 처방 의료진의 판단을 따르세요.
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
          <GuideBuySection topic="highProtein" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중이 빠질 때 근육은 얼마나 빠지나 — 임상시험 체성분</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>약</th>
                    <th className={thClass}>연구</th>
                    <th className={thClass}>체성분 변화(DXA)</th>
                    <th className={thClass}>빠진 체중 중 제지방</th>
                  </tr>
                </thead>
                <tbody>
                  {leanRows.map(([drug, study, change, share]) => (
                    <tr key={drug} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{drug}</td>
                      <td className={tdClass}>{study}</td>
                      <td className={tdClass}>{change}</td>
                      <td className={tdClass}>{share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              제지방에는 근육뿐 아니라 수분·장기 등도 들어 있어 &apos;근육이 그만큼 빠졌다&apos;와 같은 말은 아닙니다. 두 연구 모두 지방이
              더 많이 빠져 몸에서 제지방이 차지하는 비율은 올라갔습니다. 다만 식사 자체가 줄어드는 치료라 단백질이 모자라기 쉽고,
              나이가 많거나 근육이 원래 적은 사람은 더 신경 써야 합니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">2025 학회 공동 권고 — 단백질과 운동</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>항목</th>
                    <th className={thClass}>권고 내용</th>
                  </tr>
                </thead>
                <tbody>
                  {adviceRows.map(([item, detail]) => (
                    <tr key={item} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{item}</td>
                      <td className={tdClass}>{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              미국생활습관의학회(ACLM), 미국영양학회(ASN), 비만의학회(OMA), 비만학회(TOS)가 함께 낸 권고입니다. 한국 성인
              권장섭취량은 체중 1kg당 0.91g(2020 한국인 영양소 섭취기준)이라, 감량 중 제안되는 양은 이보다 높습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 목표를 끼니로 나누면</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>하루 목표</th>
                    <th className={thClass}>3끼로만 나누면</th>
                    <th className={thClass}>단백질 음료 1병을 더하면</th>
                  </tr>
                </thead>
                <tbody>
                  {mealRows.map(([goal, meal, withDrink]) => (
                    <tr key={goal} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{goal}</td>
                      <td className={tdClass}>{meal}</td>
                      <td className={tdClass}>{withDrink}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              식사량이 반 가까이 줄면 끼니당 25~30g을 음식으로만 채우기 어렵습니다. 그래서 끼니마다 단백질 반찬을 먼저 먹고, 남는
              양은 하루 한두 번 음료로 채우는 방식이 현실적입니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">적게 마셔도 단백질이 많은 음료 — 250mL 이하 성분표</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록된 단백질 음료 중 250mL 이하·단백질 20g 이상·당류 3g 이하 제품은 {smallDrinks.length}개입니다. 100mL당 단백질이
              높은 순으로 브랜드마다 하나씩 골랐습니다(1병 기준 성분표 값).
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>100mL당 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {smallDrinkTable.map((d) => (
                    <tr key={d.slug} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="hover:text-[#7a5230] hover:underline">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.ml}mL</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{d.calories}kcal</td>
                      <td className={tdClass}>{d.sugar}g</td>
                      <td className={tdClass}>{d.per100}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              유당이 들어 있으면 배가 불편할 수 있어 락토프리 표시를 확인하는 것도 방법입니다. 단백질 음료는 식사를 대신하는 것이
              아니라 모자란 단백질을 채우는 용도로 쓰세요.
            </p>
          </section>

          <GuideCompareListCta category="drink" slugs={smallDrinkTable.slice(0, 3).map((d) => d.slug)} />

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
