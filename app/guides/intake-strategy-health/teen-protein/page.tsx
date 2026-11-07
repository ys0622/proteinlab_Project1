import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import drinkProducts from "@/app/data/drinkProductsData.json";

// 2026-11-03 질문 허브 A-2: '청소년 단백질 섭취량' 질문형 새 페이지. 기준·섭취량은 김은정 외 J Nutr Health 2022 Table 1·3에서 옮겼다.
const pageTitle = "청소년 단백질 섭취량 — 중학생·고등학생 하루 얼마나? 남 60~65g·여 55g, 실제 섭취량까지";
const pageDescription =
  "청소년 단백질 하루 권장량(2020 한국인 영양소 섭취기준 12~14세 남 60g·여 55g, 15~18세 남 65g·여 55g)과 성장 몫이 더해진 이유, 국민건강영양조사로 본 실제 섭취량(15~18세 여자 4명 중 1명 이상이 평균필요량 미만), 열량 대비 적정 비율, 운동하는 청소년, 카페인·당류 주의와 간식용 단백질 음료 성분표까지 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/teen-protein";

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

// 간식으로 마실 때를 가정해 250mL 이하·단백질 10~25g·당류 5g 이하이고 커피맛이 아닌 음료를 성분표에서 고른다.
type DrinkRow = { slug: string; brand: string; name: string; flavor?: string; capacity: string; proteinPerServing: number; calories: number; sugar: number; coupangUrl?: string };
const FALLBACK_LINK = "gaIdNRGs2u";
const volumeMl = (capacity: string) => {
  const match = String(capacity).match(/([\d.]+)\s*m[lL]/);
  return match ? Number(match[1]) : null;
};
const teenDrinks = (drinkProducts as DrinkRow[])
  .filter((d) => {
    const ml = volumeMl(d.capacity);
    const coffee = /커피|카페|라떼|coffee/i.test(`${d.name} ${d.flavor ?? ""} ${d.slug}`);
    return ml !== null && ml <= 250 && d.proteinPerServing >= 10 && d.proteinPerServing <= 25 && d.sugar <= 5 && !coffee && !(d.coupangUrl ?? "").includes(FALLBACK_LINK);
  })
  .map((d) => ({ ...d, ml: volumeMl(d.capacity) as number }))
  .sort((a, b) => a.sugar - b.sugar || b.proteinPerServing - a.proteinPerServing || a.calories - b.calories);
// 표는 브랜드마다 1개씩(맛만 다른 제품이 줄을 채우지 않게)
const teenDrinkTable = teenDrinks.filter((d, i, arr) => arr.findIndex((x) => x.brand === d.brand) === i).slice(0, 8);

const quickAnswer = [
  "2020 한국인 영양소 섭취기준의 청소년 단백질 권장섭취량은 12~14세(중학생) 남자 60g·여자 55g, 15~18세(고등학생) 남자 65g·여자 55g입니다. 몸이 자라는 데 쓰이는 '성장 몫'이 성인 기준에 더해진 값이라, 고등학생 남자는 성인 남자와 같은 65g입니다.",
  "국민건강영양조사(2013~2017)에서 청소년 평균 섭취량은 남자 89~96g, 여자 63~66g으로 권장량을 넘었습니다. 다만 평균일 뿐이고, 15~18세 여자는 하위 25%가 하루 42.7g으로 평균필요량(45g)에도 못 미쳤습니다.",
  "대부분은 식사로 충분하고, 끼니를 거르거나 다이어트로 식사량을 줄인 경우에 부족해지기 쉽습니다. 간식으로 단백질 음료를 고른다면 당류가 낮고 커피맛이 아닌 제품(식약처 청소년 카페인 체중 1kg당 하루 2.5mg 이하)이 맞습니다.",
];

// 김은정 외 2022 Table 3(2020 기준)·Table 1(국민건강영양조사 2013~2017): [구분, 평균필요량, 권장섭취량, 에너지필요추정량, 평균 섭취량, 권장량 대비, 하위 25% 섭취량]
const teenRows: Array<[string, number, number, number, string, string, string]> = [
  ["남자 12~14세", 50, 60, 2500, "89.1g", "149%", "61.7g"],
  ["남자 15~18세", 55, 65, 2700, "96.4g", "148%", "59.1g"],
  ["여자 12~14세", 45, 55, 2000, "66.4g", "121%", "47.8g"],
  ["여자 15~18세", 45, 55, 2000, "63.5g", "116%", "42.7g"],
];

const pointRows: Array<[string, string]> = [
  ["성장 몫", "청소년 기준은 성인 필요량(체중 1kg당 0.73g 평균필요량)에 몸이 자라며 쌓이는 단백질을 더해 정합니다. 2020 개정에서 이 몫을 이용효율까지 반영해 다시 계산해 2015년보다 기준이 올라갔습니다."],
  ["열량 대비 비율", "2020 기준의 단백질 에너지적정비율은 열량의 7~20%입니다. 하루 2,000kcal라면 단백질 35~100g 범위입니다."],
  ["다이어트 중", "식사량을 줄이면 단백질도 같이 줄어 권장량 아래로 내려가기 쉽습니다. 끼니마다 단백질 반찬(고기·생선·달걀·두부·우유)을 먼저 챙깁니다."],
  ["운동하는 청소년", "청소년 선수만을 위한 별도 공식 기준은 없습니다. 운동 시 1.4~2.0g/kg(ISSN 2017)은 주로 성인 연구에서 나온 값이라, 식사로 권장량 이상을 고르게 먹는 것이 먼저입니다."],
  ["키·성장", "권장량을 넘는 단백질 보충이 키를 더 크게 한다는 내용은 섭취기준에 제시돼 있지 않습니다. 권장량을 꾸준히 채우는 것이 기준입니다."],
];

const faqItems = [
  {
    question: "청소년 단백질 하루 권장량은 얼마인가요?",
    answer:
      "2020 한국인 영양소 섭취기준에서 12~14세는 남자 60g·여자 55g, 15~18세는 남자 65g·여자 55g입니다. 성인 기준에 성장에 필요한 몫이 더해진 값입니다.",
  },
  {
    question: "중학생·고등학생이 단백질 음료를 마셔도 되나요?",
    answer:
      "식사로 권장량을 채우는 것이 먼저이고, 아침을 거르는 등 모자랄 때 간식으로 마시는 것은 괜찮습니다. 당류가 낮고 커피맛이 아닌 제품을 고르세요. 식약처는 청소년 카페인을 체중 1kg당 하루 2.5mg 이하로 권고합니다.",
  },
  {
    question: "청소년이 단백질을 많이 먹으면 키가 크나요?",
    answer:
      "권장량을 꾸준히 먹는 것은 성장에 필요하지만, 그 이상 보충하면 키가 더 큰다는 내용은 공식 섭취기준에 없습니다. 한국 청소년은 평균적으로 이미 권장량보다 많이 먹고 있습니다.",
  },
  {
    question: "운동하는 고등학생은 단백질을 얼마나 먹나요?",
    answer:
      "청소년 선수용 별도 공식 기준은 없습니다. 성인 운동 기준(체중 1kg당 1.4~2.0g, ISSN 2017)을 그대로 적용하기보다, 늘어난 열량만큼 식사를 늘려 단백질도 함께 채우는 것이 기본입니다. 체중 감량을 하는 종목이라면 지도자·영양사와 상의하세요.",
  },
  {
    question: "다이어트 중인 여학생은 단백질이 부족한가요?",
    answer:
      "부족해지기 쉽습니다. 15~18세 여자 평균 섭취량은 63.5g이지만 하위 25%는 42.7g으로 평균필요량(45g)보다 적었습니다(국민건강영양조사 2013~2017). 식사량을 줄여도 끼니마다 단백질 반찬은 남기는 것이 좋습니다.",
  },
];

const relatedLinks = [
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 실제 섭취량." },
  { href: "/guides/basics/deficiency-symptoms", title: "단백질 부족 증상", body: "부족할 때 나타나는 신호와 점검법." },
  { href: "/guides/basics/muscle", title: "근육 합성에 단백질 얼마나?", body: "운동할 때 한 끼 양·하루 총량." },
  { href: "/guides/intake-strategy-health/protein-drink-weight-gain", title: "단백질 음료 살찌나요", body: "1병 열량을 하루 기준으로 계산." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다 섭취 부작용", body: "많이 먹으면 생기는 문제." },
  { href: "/guides/intake-strategy-health/protein-drink-sugar", title: "단백질 음료 당류", body: "당류 표시 읽는 법." },
];

const sources = [
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준",
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (Table 1 국민건강영양조사 2013~2017 연령별 섭취량·백분위, Table 2 성장 필요량, Table 3 연령별 기준·에너지적정비율)",
  "Jäger R et al., International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr 2017;14:20",
  "식품의약품안전처, 카페인 일일 최대 섭취 권고량(어린이·청소년 체중 1kg당 2.5mg 이하)",
  `ProteinLab 등록 단백질 음료 성분표: 250mL 이하·단백질 10~25g·당류 5g 이하·커피맛 제외 ${teenDrinks.length}개, 2026-11-03 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function TeenProteinPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    teenDrinkTable.slice(0, 3).map((d) => ({ slug: d.slug, contextLabel: `${d.ml}mL · 단백질 ${d.proteinPerServing}g · 당류 ${d.sugar}g` })),
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
            <span>청소년 단백질</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">대상별 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-03</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            청소년 단백질, 하루 얼마나 먹어야 할까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            청소년 단백질 섭취량은 12~14세 남자 60g·여자 55g, 15~18세 남자 65g·여자 55g이 하루 권장량입니다(2020
            한국인 영양소 섭취기준). 다이어트·운동할 때의 기준도 함께 정리했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">청소년 단백질 섭취량은 하루 얼마인가요?</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>구분</th>
                    <th className={thClass}>평균필요량</th>
                    <th className={thClass}>권장섭취량</th>
                    <th className={thClass}>실제 평균 섭취량</th>
                    <th className={thClass}>권장량 대비</th>
                    <th className={thClass}>하위 25% 섭취량</th>
                  </tr>
                </thead>
                <tbody>
                  {teenRows.map(([group, ear, rni, , intake, ratio, p25]) => (
                    <tr key={group} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{group}</td>
                      <td className={tdClass}>{ear}g</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{rni}g</td>
                      <td className={tdClass}>{intake}</td>
                      <td className={tdClass}>{ratio}</td>
                      <td className={tdClass}>{p25}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              평균필요량은 절반의 사람이 충분한 양, 권장섭취량은 대부분의 사람이 부족하지 않은 양입니다. 섭취량은 국민건강영양조사
              2013~2017 평균과 하위 25% 값입니다. 남학생은 하위 25%도 평균필요량을 넘지만, 15~18세 여학생은 하위 25%가 평균필요량
              45g에 못 미칩니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">열량으로 본 적정 범위 (에너지의 7~20%)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>구분</th>
                    <th className={thClass}>에너지필요추정량</th>
                    <th className={thClass}>단백질 7%</th>
                    <th className={thClass}>단백질 20%</th>
                    <th className={thClass}>권장섭취량은 열량의</th>
                  </tr>
                </thead>
                <tbody>
                  {teenRows.map(([group, , rni, kcal]) => (
                    <tr key={group} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{group}</td>
                      <td className={tdClass}>{kcal.toLocaleString()}kcal</td>
                      <td className={tdClass}>{Math.round((kcal * 0.07) / 4)}g</td>
                      <td className={tdClass}>{Math.round((kcal * 0.2) / 4)}g</td>
                      <td className={tdClass}>{(((rni * 4) / kcal) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 1g = 4kcal로 계산했습니다. 권장섭취량은 열량의 약 10~11%라, 보통 식사에서 단백질 반찬을 챙기면 채워지는
              양입니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">청소년 단백질에서 자주 헷갈리는 것</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <tbody>
                  {pointRows.map(([title, body]) => (
                    <tr key={title} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} w-32 font-semibold text-[var(--foreground)]`}>{title}</td>
                      <td className={tdClass}>{body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">간식으로 고를 때 — 당류 낮고 커피맛 아닌 단백질 음료</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 음료 중 250mL 이하·단백질 10~25g·당류 5g 이하이고 커피맛이 아닌 {teenDrinks.length}개에서 브랜드별로 당류가 낮은
              순으로 골랐습니다.
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
                  {teenDrinkTable.map((d) => (
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
              성분은 제조사 표기 1병 기준입니다. 음료는 식사를 대신하기보다 거른 끼니를 메우는 용도로 쓰고, 이미 식사로 충분히 먹는다면
              그만큼 열량이 더해진다는 점도 함께 보세요.
            </p>
          </section>

          <GuideCompareListCta category="drink" slugs={teenDrinkTable.slice(0, 3).map((d) => d.slug)} />

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
