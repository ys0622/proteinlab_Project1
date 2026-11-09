import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import yogurtProducts from "@/app/data/yogurtProductsData.json";

// 2026-11-09 질문 허브: 네이버 자동완성 "그릭요거트 하루 권장량·하루에 몇개·하루 2개·하루 용량·하루 2번", "요거트 하루 섭취량·적정량"(전용 페이지 없음).
// 1컵 단백질·열량·당류와 대용량 100g당 값은 등록 요거트 성분표(떠먹는 그릭·아이슬란딕·프로틴 요거트, 마시는 요거트 제외)에서,
// 권장섭취량·실제 섭취량은 daily-requirement와 같은 출처(2020 한국인 영양소 섭취기준, 김은정 외 J Nutr Health 2022 Table 1)에서,
// 당류 기준은 WHO 2015 지침에서 가져온다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/greek-yogurt-per-day";

type YogRow = {
  slug: string;
  capacity: string;
  variant?: string;
  yogurtType?: string;
  proteinPerServing: number;
  calories?: number;
  sugar?: number;
  coupangUrl?: string;
};
const grams = (capacity: string) => {
  const m = /^([\d.]+)\s*g$/i.exec(capacity.trim());
  return m ? Number(m[1]) : null;
};
const spoonable = (yogurtProducts as YogRow[]).filter(
  (d) => d.yogurtType !== "드링킹 요거트" && typeof d.proteinPerServing === "number" && d.proteinPerServing > 0 && grams(d.capacity) !== null,
);
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const pct = (part: number, whole: number) => Math.round((part / whole) * 100);
const nums = (rows: YogRow[], key: "proteinPerServing" | "calories" | "sugar") =>
  rows.map((d) => d[key]).filter((v): v is number => typeof v === "number");
const isPlain = (d: YogRow) => (d.variant ?? "").includes("플레인");

// 1컵: 200g 이하 소포장. 대용량: 400g 이상 통 제품(덜어 먹는 제품).
const cups = spoonable.filter((d) => (grams(d.capacity) ?? 0) <= 200);
const tubs = spoonable.filter((d) => (grams(d.capacity) ?? 0) >= 400);

const cupGrams = Math.round(median(cups.map((d) => grams(d.capacity) ?? 0)));
const cupProtein = round1(median(nums(cups, "proteinPerServing")));
const cupKcal = Math.round(median(nums(cups, "calories")));
const cupSugar = round1(median(nums(cups, "sugar")));

const cupGroups = [
  { label: "플레인", rows: cups.filter(isPlain) },
  { label: "맛 첨가(과일·그래놀라 등)", rows: cups.filter((d) => !isPlain(d)) },
].map((g) => ({
  label: g.label,
  count: g.rows.length,
  protein: round1(median(nums(g.rows, "proteinPerServing"))),
  kcal: Math.round(median(nums(g.rows, "calories"))),
  sugar: round1(median(nums(g.rows, "sugar"))),
}));
const plainCup = cupGroups[0];
const flavorCup = cupGroups[1];

// 대용량은 100g당 값으로 바꿔 중앙값을 낸다.
const per100 = (d: YogRow, key: "proteinPerServing" | "calories" | "sugar") => {
  const g = grams(d.capacity) ?? 0;
  const v = d[key];
  return typeof v === "number" && g > 0 ? (v / g) * 100 : null;
};
const tubPer100 = (key: "proteinPerServing" | "calories" | "sugar") =>
  median(tubs.map((d) => per100(d, key)).filter((v): v is number => v !== null));
const tubProtein100 = round1(tubPer100("proteinPerServing"));
const tubKcal100 = Math.round(tubPer100("calories"));
const tubSugar100 = round1(tubPer100("sugar"));
const tubProteinRange = tubs.map((d) => per100(d, "proteinPerServing") ?? 0);
const tubProteinMin = round1(Math.min(...tubProteinRange));
const tubProteinMax = round1(Math.max(...tubProteinRange));
const scoops = [100, 150, 200, 300];

const cupSugars = nums(cups, "sugar");
const cupSugarMin = Math.min(...cupSugars);
const cupSugarMax = Math.max(...cupSugars);
const cupHighSugar = cupSugars.filter((v) => v >= 10).length;

// 구매 버튼: 1컵 제품 중 구매 가능한 링크가 있고 단백질이 1컵 중앙값 이상인 제품을 당류 낮은 순, 같으면 열량 낮은 순으로 3개.
const buySlugs = cups
  .filter((d) => d.proteinPerServing >= cupProtein && !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug))
  .sort((a, b) => (a.sugar ?? 99) - (b.sugar ?? 99) || (a.calories ?? 999) - (b.calories ?? 999))
  .slice(0, 3)
  .map((d) => d.slug);

// 2020 한국인 영양소 섭취기준 권장섭취량(g/일) — daily-requirement 페이지와 같은 값.
const kdri: Array<[string, number, number]> = [
  ["19~29세", 65, 55],
  ["30~49세", 65, 50],
  ["50~64세", 60, 50],
  ["65세 이상", 60, 50],
];
// 국민건강영양조사 2013~2017 하루 평균 섭취량과 권장섭취량 대비 비율(김은정 외 2022 Table 1).
const actualIntake: Array<[string, string, string]> = [
  ["남자 19~29세", "88.3g", "136%"],
  ["남자 30~49세", "88.8g", "137%"],
  ["남자 75세 이상", "58.0g", "97%"],
  ["여자 19~29세", "64.3g", "117%"],
  ["여자 30~49세", "63.0g", "126%"],
  ["여자 75세 이상", "37.7g", "75%"],
];

const pageTitle = `그릭요거트 하루 권장량은? 하루 몇 개·몇 g 단백질·당류 계산`;
const pageDescription = `그릭요거트는 하루 몇 개, 몇 g 먹어야 할까요? 등록 떠먹는 요거트 성분표로 1컵(보통 ${cupGrams}g) 단백질 중앙값 ${cupProtein}g·열량 ${cupKcal}kcal·당류 ${cupSugar}g, 대용량 100g당 단백질 ${tubProtein100}g을 구하고, 2020 한국인 영양소 섭취기준 권장섭취량과 비교해 1개·2개, 100~300g이 하루의 몇 %인지 계산했습니다.`;

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
  `그릭요거트만의 하루 권장량은 정해져 있지 않습니다. 기준이 되는 것은 음식 전체의 단백질 권장섭취량(2020 한국인 영양소 섭취기준: 남자 19~49세 65g, 여자 30세 이상 50g)이고, 그릭요거트는 그중 일부를 채웁니다.`,
  `1컵(200g 이하 소포장 ${cups.length}종, 보통 ${cupGrams}g)의 단백질은 보통 ${cupProtein}g입니다(중앙값). 권장섭취량의 ${pct(cupProtein, 65)}~${pct(cupProtein, 50)}%이고, 2개면 ${pct(cupProtein * 2, 65)}~${pct(cupProtein * 2, 50)}%입니다.`,
  `대용량(400g 이상 ${tubs.length}종)을 덜어 먹는다면 100g당 단백질 보통 ${tubProtein100}g(제품별 ${tubProteinMin}~${tubProteinMax}g)입니다. 200g을 먹으면 약 ${round1(tubProtein100 * 2)}g, 열량 약 ${tubKcal100 * 2}kcal입니다.`,
  `여러 개를 먹는다면 개수보다 당류를 먼저 보세요. 1컵 당류는 플레인이 보통 ${plainCup.sugar}g, 과일·그래놀라 등 맛 첨가 제품이 ${flavorCup.sugar}g입니다(중앙값).`,
];

const faqItems = [
  {
    question: "그릭요거트 하루 권장량은 얼마인가요?",
    answer: `그릭요거트만의 공식 권장량은 없습니다. 2020 한국인 영양소 섭취기준은 음식 전체에서 먹는 단백질의 권장섭취량(남자 19~49세 65g, 여자 19~29세 55g·30세 이상 50g)을 정하고 있습니다. 1컵(보통 ${cupGrams}g)에 단백질 ${cupProtein}g이면 그 ${pct(cupProtein, 65)}~${pct(cupProtein, 50)}%입니다.`,
  },
  {
    question: "그릭요거트 하루에 몇 개 먹어도 되나요?",
    answer: `정해진 개수는 없습니다. 1컵 단백질(보통 ${cupProtein}g)과 당류·열량을 보고 하루 식사에 맞추는 것이 기준입니다. 2개를 먹으면 단백질 약 ${round1(cupProtein * 2)}g, 열량 약 ${cupKcal * 2}kcal, 당류 약 ${round1(cupSugar * 2)}g입니다(중앙값 기준).`,
  },
  {
    question: "그릭요거트 하루 2개 먹어도 되나요?",
    answer: `플레인 1컵 2개면 당류 약 ${round1(plainCup.sugar * 2)}g, 맛 첨가 제품 2개면 약 ${round1(flavorCup.sugar * 2)}g입니다. WHO는 하루 유리당을 총열량의 10% 미만(2,000kcal 기준 50g)으로 권합니다. 라벨의 당류에는 우유에서 온 유당도 들어 있어 전부가 유리당은 아니지만, 맛 첨가 제품을 여러 개 먹는다면 당류가 낮은 제품을 고르세요.`,
  },
  {
    question: "대용량 그릭요거트는 하루 몇 g 먹으면 되나요?",
    answer: `대용량 제품의 100g당 단백질은 보통 ${tubProtein100}g입니다. 100g이면 권장섭취량의 ${pct(tubProtein100, 65)}~${pct(tubProtein100, 50)}%, 200g이면 ${pct(tubProtein100 * 2, 65)}~${pct(tubProtein100 * 2, 50)}%입니다. 제품마다 100g당 ${tubProteinMin}~${tubProteinMax}g으로 차이가 있어 라벨의 100g당 단백질을 먼저 보세요.`,
  },
  {
    question: "그릭요거트를 많이 먹으면 안 되는 사람이 있나요?",
    answer: "우유 알레르기가 있으면 피해야 합니다. 유당에 민감하면 유당을 줄인 제품을 고르는 방법이 있습니다. 신장 질환이 있거나 단백질 제한 식이를 하고 있다면 양을 늘리기 전에 의료진과 먼저 상의하세요.",
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/greek-yogurt-guide", title: "그릭요거트 단백질 함량 순위", body: "100g당 단백질 높은 순 전체 비교." },
  { href: "/yogurt", title: "요거트 전체 비교", body: "단백질·당류·열량으로 전체 제품 보기." },
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 계산법." },
  { href: "/guides/intake-strategy-health/soymilk-per-day", title: "두유 하루 몇 개", body: "1팩·2팩·3팩 단백질과 당류." },
  { href: "/guides/intake-strategy-health/protein-bar-per-day", title: "단백질바 하루 몇 개", body: "1개·2개 단백질과 열량." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다섭취 부작용", body: "많이 먹을 때 확인할 것." },
];

const sources = [
  "보건복지부·한국영양학회, 「2020 한국인 영양소 섭취기준」",
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (연령별 권장섭취량, 국민건강영양조사 2013~2017 섭취량)",
  "WHO, Guideline: Sugars intake for adults and children, 2015 (유리당 총열량의 10% 미만)",
  `ProteinLab 등록 떠먹는 요거트 ${spoonable.length}종(그릭·아이슬란딕·프로틴 요거트) 성분표(제조사 표기), 2026-11-09 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function GreekYogurtPerDayPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-09",
    dateModified: "2026-11-09",
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
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>그릭요거트 하루 권장량</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-09</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">그릭요거트 하루 몇 개, 몇 g 먹어야 할까</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            그릭요거트 1컵(보통 {cupGrams}g)은 단백질 {cupProtein}g, 열량 {cupKcal}kcal, 당류 {cupSugar}g이고, 대용량은 100g당 단백질
            {" "}{tubProtein100}g입니다. 하루 권장섭취량(성인 50~65g)과 실제 식사 섭취량, 당류를 함께 놓고 계산했습니다.
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

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">1컵 제품: 1개·2개</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              200g 이하 소포장 떠먹는 요거트 {cups.length}종의 중앙값입니다. 권장량 %는 남자 19~49세 65g / 여자 30세 이상 50g 기준입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>종류(제품 수)</th>
                    <th className={thClass}>개수</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>권장량 대비(남/여)</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {cupGroups.flatMap((g) =>
                    [1, 2].map((n) => (
                      <tr key={`${g.label}-${n}`} className="border-b border-[#eef3ef] last:border-b-0">
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{n === 1 ? `${g.label} ${g.count}종` : ""}</td>
                        <td className={tdClass}>{n}개</td>
                        <td className={tdClass}>{round1(g.protein * n)}g</td>
                        <td className={tdClass}>{pct(g.protein * n, 65)}% / {pct(g.protein * n, 50)}%</td>
                        <td className={tdClass}>{g.kcal * n}kcal</td>
                        <td className={tdClass}>{round1(g.sugar * n)}g</td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">대용량 제품: 몇 g 먹으면 얼마나</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              400g 이상 통 제품 {tubs.length}종의 100g당 중앙값(단백질 {tubProtein100}g, 열량 {tubKcal100}kcal, 당류 {tubSugar100}g)으로
              계산했습니다. 제품마다 100g당 단백질이 {tubProteinMin}~{tubProteinMax}g이라 라벨 값으로 다시 계산하면 더 정확합니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>먹는 양</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>권장량 대비(남/여)</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {scoops.map((g) => (
                    <tr key={g} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{g}g</td>
                      <td className={tdClass}>{round1((tubProtein100 * g) / 100)}g</td>
                      <td className={tdClass}>{pct((tubProtein100 * g) / 100, 65)}% / {pct((tubProtein100 * g) / 100, 50)}%</td>
                      <td className={tdClass}>{Math.round((tubKcal100 * g) / 100)}kcal</td>
                      <td className={tdClass}>{round1((tubSugar100 * g) / 100)}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">나이·성별 권장량 대비 1컵</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              1컵 = 1컵 제품 중앙값 {cupProtein}g. 권장섭취량은 2020 한국인 영양소 섭취기준입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>나이</th>
                    <th className={thClass}>남자 권장량</th>
                    <th className={thClass}>1컵 / 2컵</th>
                    <th className={thClass}>여자 권장량</th>
                    <th className={thClass}>1컵 / 2컵</th>
                  </tr>
                </thead>
                <tbody>
                  {kdri.map(([age, m, f]) => (
                    <tr key={age} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{age}</td>
                      <td className={tdClass}>{m}g</td>
                      <td className={tdClass}>{pct(cupProtein, m)}% / {pct(cupProtein * 2, m)}%</td>
                      <td className={tdClass}>{f}g</td>
                      <td className={tdClass}>{pct(cupProtein, f)}% / {pct(cupProtein * 2, f)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사로 이미 얼마나 먹고 있나</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              국민건강영양조사 2013~2017 하루 평균 단백질 섭취량입니다. 19~49세는 평균적으로 권장섭취량을 넘지만, 75세 이상은 평균이
              권장섭취량에 못 미칩니다. 평균이라 개인마다 다르니, 식사량이 적다면 요거트로 채울 몫이 커집니다.
            </p>
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
                  {actualIntake.map(([group, amount, ratio]) => (
                    <tr key={group} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{group}</td>
                      <td className={tdClass}>{amount}</td>
                      <td className={tdClass}>{ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">여러 개 먹을 때 같이 볼 것</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>- 당류: 1컵 제품 당류는 {cupSugarMin}~{cupSugarMax}g이고, 10g 이상인 제품이 {cupHighSugar}종입니다. 라벨의 당류는 우유에서 온 유당과 넣은 당을 합친 값이라, 플레인보다 과일·그래놀라·꿀이 들어간 제품이 높게 나옵니다.</li>
              <li>- 열량: 1컵 중앙값 {cupKcal}kcal(플레인 {plainCup.kcal}kcal, 맛 첨가 {flavorCup.kcal}kcal)입니다. 간식을 대신하면 하루 열량은 크게 늘지 않지만, 식사에 더하면 그만큼 늘어납니다. 그래놀라·과일을 더 올리면 그 열량도 더해집니다.</li>
              <li>- 우유 알레르기가 있으면 피하고, 신장 질환이 있거나 단백질 제한 식이를 하고 있다면 양을 늘리기 전에 의료진과 먼저 상의하세요.</li>
            </ul>
          </section>

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
                <li key={s}>- {s}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
