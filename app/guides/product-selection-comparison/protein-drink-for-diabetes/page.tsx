import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import drinkProducts from "@/app/data/drinkProductsData.json";

// 2026-11-08 질문 허브 A-2: 템플릿 비교 글(손으로 넣은 탄수화물 값)을 '당뇨 단백질 음료' 질문형 페이지로 다시 썼다.
// 단백질 권고는 대한당뇨병학회 2023 진료지침 개정 요약(J Korean Diabetes 2023;24(3):120-126)에서 확인했고,
// 신장질환 동반 기준은 kidney-disease-protein 페이지와 같은 KDOQI 2020 값을 쓴다. 제품 표는 성분표 데이터에서 계산한다.
const pageTitle = "당뇨 단백질 음료, 마셔도 될까? — 학회 기준과 당류·탄수화물로 고르는 법";
const pageDescription =
  "당뇨가 있어도 단백질 음료를 마실 수 있는지 대한당뇨병학회 2023 진료지침으로 정리했습니다. 신장 기능이 정상이면 단백질은 제한하지 않고 가당음료를 줄이라고 권고합니다. 당류·탄수화물이 낮은 단백질 음료와 당류가 많은 제품을 성분표로 비교하고, 당뇨병성 신장병일 때 단백질 기준(KDOQI 2020)도 함께 봅니다.";
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/protein-drink-for-diabetes";

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

type DrinkRow = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  proteinPerServing: number;
  calories: number;
  sugar: number;
  coupangUrl?: string;
  nutritionPerBottle?: { carbsG?: number };
};
const FALLBACK_LINK = "gaIdNRGs2u";
const drinks = (drinkProducts as DrinkRow[]).filter((d) => typeof d.sugar === "number");
const purchasable = (d: DrinkRow) => !(d.coupangUrl ?? "").includes(FALLBACK_LINK);
const carbsOf = (d: DrinkRow) => d.nutritionPerBottle?.carbsG;

const lowSugarCount = drinks.filter((d) => d.sugar <= 1).length;
const highSugarCount = drinks.filter((d) => d.sugar >= 10).length;

// 당류 1g 이하이면서 탄수화물 표기가 있는 제품을 탄수화물 적은 순(같으면 단백질 많은 순)으로, 브랜드마다 1개
const lowCarbTable = drinks
  .filter((d) => d.sugar <= 1 && typeof carbsOf(d) === "number" && purchasable(d))
  .sort((a, b) => (carbsOf(a) as number) - (carbsOf(b) as number) || b.proteinPerServing - a.proteinPerServing)
  .filter((d, i, arr) => arr.findIndex((x) => x.brand === d.brand) === i)
  .slice(0, 10);

// 한 병 당류가 많은 순 6개(맛·라인 차이를 보여 주려고 브랜드 중복 허용)
const highSugarTable = [...drinks].sort((a, b) => b.sugar - a.sugar).slice(0, 6);

const quickAnswer = [
  "대한당뇨병학회 2023 진료지침은 신장 기능이 정상인 당뇨병 환자에게 단백질 섭취를 따로 제한하지 않습니다. 대신 탄수화물·단백질·지방 비율은 치료 목표에 맞춰 개별화하고, 가당음료는 줄이라고 권고합니다.",
  `그래서 단백질 음료는 단백질 g보다 한 병의 당류와 탄수화물을 먼저 봅니다. 등록된 단백질 음료 ${drinks.length}개 중 당류 1g 이하는 ${lowSugarCount}개이고, 10g 이상은 ${highSugarCount}개입니다. 같은 브랜드도 맛에 따라 당류가 0g에서 14g까지 달라집니다.`,
  "신장 기능이 떨어진 당뇨병성 신장병이라면 반대로 단백질 양을 정해야 합니다. KDOQI 2020은 투석 전 3~5기이면서 당뇨병이 있으면 체중 1kg당 0.6~0.8g을 제시합니다. 이때는 음료를 더하기 전에 의료진과 먼저 상의하세요.",
];

const intakeRows: Array<[string, string, string]> = [
  ["신장 기능 정상", "단백질 섭취를 제한하지 않음. 비율은 치료 목표·선호에 맞춰 개별화", "대한당뇨병학회 2023 진료지침"],
  ["참고: 일반 성인 권장량", "체중 1kg당 0.91g (남성 65g, 여성 50~55g)", "2020 한국인 영양소 섭취기준"],
  ["만성콩팥병 3~5기(투석 전) + 당뇨병", "체중 1kg당 0.6~0.8g", "KDOQI 2020 영양 지침"],
  ["투석 중", "체중 1kg당 1.0~1.2g (당뇨병 동반도 같음)", "KDOQI 2020 영양 지침"],
];

const checkRows: Array<[string, string]> = [
  ["1. 당류", "한 병 당류가 가장 먼저입니다. 학회 지침이 줄이라고 한 가당음료에 해당하는지 보는 칸입니다. 아래 표는 1g 이하만 골랐습니다."],
  ["2. 탄수화물", "당류가 0g이어도 탄수화물이 남을 수 있습니다(덱스트린·곡물 원료 등). 혈당에 영향을 주는 것은 당류를 포함한 전체 탄수화물입니다."],
  ["3. 열량", "체중 관리가 함께 필요하면 열량을 봅니다. 같은 저당 제품도 한 병 48kcal부터 250kcal까지 차이가 납니다."],
  ["4. 단백질 양", "식사로 모자란 만큼만 채웁니다. 신장 기능 검사(사구체여과율·알부민뇨)에 이상이 있으면 양을 먼저 의료진과 정합니다."],
];

const faqItems = [
  {
    question: "당뇨가 있어도 단백질 음료를 마셔도 되나요?",
    answer:
      "신장 기능이 정상이라면 대한당뇨병학회 2023 진료지침은 단백질 섭취를 제한하지 않습니다. 다만 가당음료를 줄이라고 권고하므로 한 병 당류와 탄수화물이 낮은 제품을 고르고, 처음 마실 때는 혈당 반응을 확인하세요.",
  },
  {
    question: "당뇨 환자는 단백질을 하루 얼마나 먹어야 하나요?",
    answer:
      "학회 지침은 당뇨병 환자에게 따로 정한 단백질 양을 두지 않고 개별화하도록 합니다. 일반 성인 권장량은 체중 1kg당 0.91g(2020 한국인 영양소 섭취기준)입니다. 당뇨병성 신장병(투석 전 3~5기)이면 KDOQI 2020 기준 0.6~0.8g/kg으로 낮아집니다.",
  },
  {
    question: "당류 0g이면 혈당이 안 오르나요?",
    answer:
      "당류 0g이어도 탄수화물이 있을 수 있고, 단백질과 지방도 열량이 있습니다. 성분표의 탄수화물 칸까지 같이 보세요. 단맛은 수크랄로스 같은 감미료에서 나오며 감미료는 당류로 표시되지 않습니다.",
  },
  {
    question: "당뇨병성 신장병이 있으면 단백질 음료를 피해야 하나요?",
    answer:
      "투석 전 단계라면 단백질 양을 줄여야 할 수 있어 한 병 20~50g짜리 고단백 음료는 하루 허용량의 상당 부분을 차지합니다. 마시기 전에 의료진과 하루 양을 정하세요. 투석 중에는 오히려 1.0~1.2g/kg으로 늘리는 것이 기준입니다.",
  },
  {
    question: "당뇨에 좋은 단백질 음료가 따로 있나요?",
    answer:
      "혈당을 낮추는 효과가 확인된 일반 단백질 음료는 없습니다. 고를 때 기준은 당류·탄수화물이 낮고 필요한 만큼의 단백질이 들어 있는지입니다. 환자용 당뇨식(특수의료용도식품)은 별도 제품군이므로 의료진·영양사의 안내에 따르세요.",
  },
];

const relatedLinks = [
  { href: "/guides/intake-strategy-health/kidney-disease-protein", title: "신장 질환 단백질 섭취량", body: "만성콩팥병 단계별 단백질 기준(KDIGO·KDOQI)." },
  { href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide", title: "저당 단백질 음료 비교", body: "당류 낮은 음료를 단백질·열량으로 비교." },
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 실제 섭취량." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다 섭취 부작용", body: "많이 먹으면 생기는 문제, 어디부터 조심할지." },
  { href: "/guides/intake-strategy-health/senior-protein-strategy", title: "노인 단백질 섭취량", body: "65세 이상 권장량과 근감소 예방 기준." },
  { href: "/guides/intake-strategy-health/protein-drink-empty-stomach", title: "공복 단백질 음료", body: "빈속에 마실 때 확인할 것." },
];

const sources = [
  "문민경, 2023 당뇨병 진료지침 개정방향. 당뇨병(J Korean Diabetes) 2023;24(3):120-126 — 대한당뇨병학회 제8판 진료지침의 의학영양요법 요약(단백질 섭취 제한하지 않음, 비율 개별화, 가당음료 섭취 줄이기)",
  "Ikizler TA et al., KDOQI Clinical Practice Guideline for Nutrition in CKD: 2020 Update. Am J Kidney Dis 2020;76(3 Suppl 1):S1-S107 (투석 전 3~5기 당뇨 동반 0.6~0.8g/kg, 투석 1.0~1.2g/kg)",
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준 (성인 단백질 권장섭취량)",
  `ProteinLab 등록 단백질 음료 성분표 ${drinks.length}개: 한 병 당류·탄수화물·단백질·열량, 2026-11-08 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinDrinkForDiabetesPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-03-24",
    dateModified: "2026-11-08",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    lowCarbTable.slice(0, 3).map((d) => ({ slug: d.slug, contextLabel: `${d.capacity} · 단백질 ${d.proteinPerServing}g · 당류 ${d.sugar}g` })),
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
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">제품 선택·비교</Link>
            <span>/</span>
            <span>당뇨 단백질 음료</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">대상별 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-08</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            당뇨 있을 때 단백질 음료, 마셔도 될까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            신장 기능이 정상이면 마셔도 됩니다. 대한당뇨병학회 2023 진료지침은 당뇨병 환자의 단백질 섭취를 제한하지 않고 가당음료를
            줄이라고 권고하므로, 한 병 당류와 탄수화물이 낮은 제품을 고릅니다. 이 글은 일반 정보이며 치료 중이라면 의료진의 안내가
            우선입니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">당뇨가 있으면 단백질은 얼마나 먹어야 하나요?</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>상황</th>
                    <th className={thClass}>단백질 기준</th>
                    <th className={thClass}>근거</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeRows.map(([who, amount, src]) => (
                    <tr key={who} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{who}</td>
                      <td className={tdClass}>{amount}</td>
                      <td className={tdClass}>{src}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              당뇨병이 오래됐다면 건강검진의 신장 수치(사구체여과율·알부민뇨)를 먼저 확인하세요. 단계별 자세한 기준은{" "}
              <Link href="/guides/intake-strategy-health/kidney-disease-protein" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
                신장 질환 단백질 섭취량
              </Link>
              에 있습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">당뇨 단백질 음료 고르는 순서</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">당류 1g 이하 단백질 음료 — 탄수화물 적은 순</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 음료 중 한 병 당류 1g 이하 {lowSugarCount}개에서 탄수화물이 적은 순으로, 브랜드마다 1개씩 골랐습니다. 값은 제조사 성분표
              한 병 기준입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>탄수화물</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                  </tr>
                </thead>
                <tbody>
                  {lowCarbTable.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.capacity}</td>
                      <td className={tdClass}>{d.sugar}g</td>
                      <td className={tdClass}>{carbsOf(d)}g</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{d.calories}kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">당류가 많은 단백질 음료 — 먼저 확인할 제품</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료라는 이름이어도 한 병 당류가 10g 이상인 제품이 {highSugarCount}개 있습니다. 같은 브랜드의 저당 라인과 맛별 수치를
              나란히 보고 고르세요.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>탄수화물</th>
                    <th className={thClass}>단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {highSugarTable.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.capacity}</td>
                      <td className={tdClass}>{d.sugar}g</td>
                      <td className={tdClass}>{typeof carbsOf(d) === "number" ? `${carbsOf(d)}g` : "-"}</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <GuideCompareListCta category="drink" slugs={lowCarbTable.slice(0, 3).map((d) => d.slug)} />

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
