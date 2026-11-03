import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import soymilkProducts from "@/app/data/soymilkProductsData.json";

// 2026-11-03 질문 허브 A-2: '임산부 단백질' 질문형 새 페이지. 임신·수유 부가량은 한국영양학회 2020 섭취기준 요약표(법제처 별표 인용본)에서 확인했다.
const pageTitle = "임산부 단백질 하루 얼마나? — 임신 2분기 +15g·3분기 +30g·수유기 +25g, 2020 섭취기준으로 정리";
const pageDescription =
  "임산부 단백질 하루 권장량을 2020 한국인 영양소 섭취기준으로 정리했습니다. 임신 전 권장량(여성 50~55g)에 임신 2분기 +15g, 3분기 +30g, 수유기 +25g을 더합니다. 나이·시기별 표, 체중별 계산, 더 높게 추정한 연구(Stephens 2015), 고단백 보충제를 권하지 않는 이유(WHO 2016), 카페인 주의와 고단백 두유 성분표까지.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/pregnancy-protein";

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

// 대두 기반이고 카페인이 없는 두유 중 한 팩 단백질 8g 이상·당류 5g 이하를 성분표에서 고른다.
type SoyRow = { slug: string; brand: string; name: string; capacity: string; proteinPerServing: number; calories: number; sugar: number; coupangUrl?: string };
const FALLBACK_LINK = "gaIdNRGs2u";
const soyCandidates = (soymilkProducts as SoyRow[])
  .filter((d) => d.proteinPerServing >= 8 && d.sugar <= 5 && !(d.coupangUrl ?? "").includes(FALLBACK_LINK))
  .sort((a, b) => b.proteinPerServing - a.proteinPerServing || a.sugar - b.sugar || a.calories - b.calories);
// 표는 브랜드마다 1개씩(맛만 다른 제품이 줄을 채우지 않게)
const soyTable = soyCandidates.filter((d, i, arr) => arr.findIndex((x) => x.brand === d.brand) === i).slice(0, 8);

const quickAnswer = [
  "2020 한국인 영양소 섭취기준은 임신 전 권장량에 임신 2분기 하루 15g, 3분기 30g을 더하도록 정했습니다. 1분기에는 추가량이 없습니다. 수유기에는 하루 25g을 더합니다.",
  "임신 전 권장량이 여성 19~29세 55g, 30~49세 50g이므로, 30대 임신부라면 2분기 65g, 3분기 80g, 수유기 75g입니다. 20대라면 각각 70g, 85g, 80g입니다.",
  "안정 동위원소로 잰 연구(Stephens 2015)는 임신 초기 체중 1kg당 1.22g, 후기 1.52g으로 이보다 높게 추정했지만 공식 기준은 아닙니다. 반대로 고단백 보충제(열량의 25% 넘게 단백질)는 WHO가 권하지 않습니다. 식사로 채우고, 모자라면 당류 낮은 우유·두유·요거트로 보충하는 것이 기본입니다.",
];

// 한국영양학회 2020 섭취기준: 여성 권장섭취량(19~29세 55g, 30~49세 50g) + 임신 2·3분기 부가량 +15·+30g, 수유부 +25g
const baseRows: Array<[string, number]> = [
  ["19~29세", 55],
  ["30~49세", 50],
];
const stageAdds: Array<[string, number]> = [
  ["임신 전·1분기", 0],
  ["임신 2분기", 15],
  ["임신 3분기", 30],
  ["수유기", 25],
];

const weights = [50, 55, 60, 65, 70, 75];

const evidenceRows: Array<[string, string, string]> = [
  ["2020 한국인 영양소 섭취기준", "임신 2분기 +15g, 3분기 +30g, 수유 +25g", "태아·태반·모체 조직에 쌓이는 단백질과 모유로 나가는 단백질을 더한 양. 1분기는 추가 없음"],
  ["Stephens 2015 (J Nutr)", "임신 11~20주 1.22g/kg, 31~38주 1.52g/kg", "건강한 임신부 29명을 지표 아미노산 산화법으로 잰 평균필요량 추정. 기존 기준보다 높지만 소규모 연구이고 공식 기준에 반영되지 않음"],
  ["WHO 산전관리 권고(2016)", "균형 잡힌 열량·단백질 보충은 영양 부족 지역에서 권고", "열량의 25% 넘게 단백질인 고단백 보충은 권하지 않음. 이득이 확인되지 않았고 작은 아기 출산 위험이 늘 수 있다는 근거가 있어서"],
];

const checkRows: Array<[string, string]> = [
  ["카페인", "식약처 임산부 하루 카페인 300mg 이하. 커피맛 단백질 음료는 카페인 표시를 확인합니다."],
  ["당류", "임신성 당뇨 검사를 받았거나 혈당 관리 중이라면 한 병 당류부터 봅니다. 아래 두유는 모두 당류 5g 이하입니다."],
  ["알레르기", "두유는 대두, 단백질 음료는 우유 단백이 주원료입니다. 원재료명과 알레르기 표시를 확인합니다."],
  ["보충제 성분", "단백질 외에 비타민·허브 추출물이 더해진 제품은 임신 중 섭취 가능 여부를 의료진과 확인합니다."],
];

const faqItems = [
  {
    question: "임산부 단백질 하루 권장량은 얼마인가요?",
    answer:
      "2020 한국인 영양소 섭취기준은 임신 전 권장량(19~29세 55g, 30~49세 50g)에 임신 2분기 15g, 3분기 30g을 더합니다. 30대라면 2분기 65g, 3분기 80g입니다. 1분기에는 추가량이 없습니다.",
  },
  {
    question: "임신 초기(1분기)에도 단백질을 더 먹어야 하나요?",
    answer:
      "공식 기준에서 1분기 추가량은 0g입니다. 태아와 모체 조직이 본격적으로 커지는 2분기부터 필요량이 늘어납니다. 입덧으로 식사량이 줄었다면 평소 권장량을 채우는 것부터 신경 쓰세요.",
  },
  {
    question: "모유 수유 중에는 단백질을 얼마나 먹나요?",
    answer: "수유기에는 임신 전 권장량에 하루 25g을 더합니다. 30대라면 하루 75g, 20대라면 80g입니다.",
  },
  {
    question: "임산부가 단백질 음료나 단백질 보충제를 먹어도 되나요?",
    answer:
      "식사로 모자란 양을 우유·두유·단백질 음료로 채우는 것은 일반적인 방법입니다. 다만 커피맛 제품의 카페인(식약처 임산부 하루 300mg 이하), 당류, 비타민·허브 추출물 같은 추가 성분을 확인하세요. 열량의 대부분이 단백질인 고단백 보충은 WHO가 권하지 않습니다.",
  },
  {
    question: "단백질을 많이 먹을수록 아기에게 좋은가요?",
    answer:
      "그렇지 않습니다. 권장량보다 크게 늘린 고단백 보충은 출생 체중을 늘리지 못했고 작은 아기 위험이 늘 수 있다는 근거가 있어 WHO는 권하지 않습니다. 열량과 단백질이 균형 잡힌 식사가 기준입니다.",
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/pregnancy-soymilk-guide", title: "임산부 두유 성분 비교", body: "두유 제품의 단백질·당류·열량 비교." },
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 실제 섭취량." },
  { href: "/guides/basics/deficiency-symptoms", title: "단백질 부족 증상", body: "부족할 때 나타나는 신호와 점검법." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다 섭취 부작용", body: "많이 먹으면 생기는 문제, 어디부터 조심할지." },
  { href: "/guides/product-selection-comparison/high-protein-soymilk-guide", title: "고단백 두유 비교", body: "대두 기반 제품의 성분 차이." },
  { href: "/guides/intake-strategy-health/protein-timing", title: "단백질 먹는 시간", body: "끼니마다 나누는 방법." },
];

const sources = [
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준 (요약표: 임신부 단백질 권장섭취량 2·3분기 부가량 +15·+30g, 수유부 +25g)",
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29",
  "Stephens TV et al., Protein requirements of healthy pregnant women during early and late gestation are higher than current recommendations. J Nutr 2015;145(1):73-78",
  "World Health Organization, WHO recommendations on antenatal care for a positive pregnancy experience. 2016 (A.1.2 균형 열량·단백질 보충, A.1.3 고단백 보충 비권고)",
  "식품의약품안전처, 카페인 일일 최대 섭취 권고량(임산부 300mg 이하)",
  `ProteinLab 등록 두유 성분표: 한 팩 단백질 8g 이상·당류 5g 이하 ${soyCandidates.length}개, 2026-11-03 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function PregnancyProteinPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    soyTable.slice(0, 3).map((d) => ({ slug: d.slug, contextLabel: `${d.capacity} · 단백질 ${d.proteinPerServing}g · 당류 ${d.sugar}g` })),
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
            <span>임산부 단백질</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">대상별 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-03</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            임산부 단백질, 하루 얼마나 먹어야 할까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            임신 시기·나이별 권장량을 2020 한국인 영양소 섭취기준으로 계산하고, 관련 연구와 WHO 권고, 제품을 고를 때 확인할 점을
            정리했습니다. 임신 중 식사와 보충제는 다니는 산부인과·영양 상담의 안내가 우선입니다.
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
          <GuideBuySection topic="lowSugar" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">임신 시기·나이별 단백질 권장량 (2020 한국인 영양소 섭취기준)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>시기</th>
                    <th className={thClass}>추가량</th>
                    {baseRows.map(([age]) => (
                      <th key={age} className={thClass}>
                        {age} 하루 권장량
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stageAdds.map(([stage, add]) => (
                    <tr key={stage} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{stage}</td>
                      <td className={tdClass}>{add === 0 ? "0g" : `+${add}g`}</td>
                      {baseRows.map(([age, base]) => (
                        <td key={age} className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                          {base + add}g
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              권장섭취량은 대부분의 사람(97~98%)이 부족하지 않은 양입니다. 임신 전 체중이 기준보다 많이 나가거나 적게 나가면 아래
              체중별 계산이 더 맞습니다. 성인 여성 전체 기준은{" "}
              <Link href="/guides/basics/daily-requirement" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
                단백질 하루 섭취량
              </Link>
              에 있습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중으로 계산하면</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              기준은 임신 전 체중 × 0.91g(성인 권장량)에 시기별 추가량을 더한 값입니다. 오른쪽 열은 Stephens 2015 연구의 후기 추정치
              1.52g/kg으로, 공식 기준이 아닌 참고용입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>임신 전 체중</th>
                    <th className={thClass}>임신 전 0.91g/kg</th>
                    <th className={thClass}>2분기 +15g</th>
                    <th className={thClass}>3분기 +30g</th>
                    <th className={thClass}>수유기 +25g</th>
                    <th className={thClass}>참고: 연구 후기 1.52g/kg</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((w) => {
                    const base = Math.round(w * 0.91);
                    return (
                      <tr key={w} className="border-b border-[#eef3ef] last:border-b-0">
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{w}kg</td>
                        <td className={tdClass}>{base}g</td>
                        <td className={tdClass}>{base + 15}g</td>
                        <td className={tdClass}>{base + 30}g</td>
                        <td className={tdClass}>{base + 25}g</td>
                        <td className={tdClass}>{Math.round(w * 1.52)}g</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">공식 기준과 연구 — 더 많이? 너무 많이?</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>근거</th>
                    <th className={thClass}>양</th>
                    <th className={thClass}>내용</th>
                  </tr>
                </thead>
                <tbody>
                  {evidenceRows.map(([name, amount, note]) => (
                    <tr key={name} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{name}</td>
                      <td className={tdClass}>{amount}</td>
                      <td className={tdClass}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              정리하면 공식 권장량을 식사로 채우는 것이 기준이고, 단백질만 크게 늘리는 보충은 근거가 없습니다. 입덧이나 식사량
              감소로 권장량에 못 미칠 때 우유·두유·요거트·단백질 음료로 모자란 만큼을 더하는 정도가 적당합니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">음료로 보충할 때 확인할 것</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {checkRows.map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">고단백 두유 성분 — 당류 5g 이하</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 두유 중 한 팩 단백질 8g 이상·당류 5g 이하 {soyCandidates.length}개에서 브랜드별로 단백질이 많은 순으로 골랐습니다.
              두유는 카페인이 없고 대두가 주원료입니다.
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
                  {soyTable.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.capacity}</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{d.calories}kcal</td>
                      <td className={tdClass}>{d.sugar}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              성분은 제조사 표기 1팩 기준입니다. 두유 제품을 더 자세히 비교하려면{" "}
              <Link href="/guides/product-selection-comparison/pregnancy-soymilk-guide" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
                임산부 두유 성분 비교
              </Link>
              를 보세요.
            </p>
          </section>

          <GuideCompareListCta category="soymilk" slugs={soyTable.slice(0, 3).map((d) => d.slug)} />

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

      <GuideBuySection topic="lowSugar" />
      <Footer />
    </div>
  );
}
