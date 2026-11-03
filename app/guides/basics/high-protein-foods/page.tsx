import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import drinkProducts from "@/app/data/drinkProductsData.json";
import barProducts from "@/app/data/barProductsData.json";
import yogurtProducts from "@/app/data/yogurtProductsData.json";

// 2026-11-03 질문 허브: '단백질 많은 음식' 새 페이지(11/2 보류분).
// 음식 수치는 식품의약품안전처 식품영양성분 데이터베이스(various.foodsafetykorea.go.kr/nutrient)의
// '원재료성 식품' 상세 화면에서 식품코드별로 2026-11-03에 직접 확인한 100g당 값이다(자료원 표기: 국립식량과학원·국립수산과학원).
// 그릭요거트는 원재료성 식품에 일반 항목이 없고 개별 제품만 있어 음식 표에서 뺐다(제품 표에서 성분표 값으로 비교).
const pageTitle = "단백질 많은 음식 순위 — 100g당·한 번 먹는 양·열량 대비, 식약처 식품영양성분 DB 25가지";
const pageDescription =
  "단백질 많은 음식 25가지를 식약처 식품영양성분 데이터베이스 100g당 값으로 정리했습니다. 황태포 79g·건멸치 60.3g, 구운 돼지 안심 30.2g·구운 소고기 설도 28.45g·삶은 닭가슴살 28.1g, 삶은 달걀 13.5g, 두부 9.6g, 우유 3.1g. 한 번 먹는 양으로 계산한 단백질, 열량 100kcal당 단백질 순위, 편의점에서 살 수 있는 음식과 단백질 음료·바·요거트 비교까지.";
const canonical = "https://proteinlab.kr/guides/basics/high-protein-foods";

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

type FoodGroup = "고기" | "생선·해산물" | "달걀" | "콩·두부" | "견과" | "우유·유제품";
type Food = {
  name: string; // 화면 이름
  dbName: string; // DB 식품명 그대로
  code: string; // DB 식품코드
  group: FoodGroup;
  protein: number; // 100g당 g
  kcal: number; // 100g당 kcal
  fat: number; // 100g당 g
  sodium: number; // 100g당 mg
  portionG: number; // 계산용 양(g)
  portionLabel: string;
  store?: boolean; // 편의점에서 흔히 파는 형태
};

const DB_DETAIL = "https://various.foodsafetykorea.go.kr/nutrient/general/food/detail.do";

// 식약처 식품영양성분 DB(원재료성 식품) 100g당 값. 2026-11-03 확인.
const foods: Food[] = [
  { name: "닭가슴살, 삶은 것", dbName: "닭고기, 가슴, 삶은것", code: "R109-008000446-0000", group: "고기", protein: 28.09, kcal: 127, fat: 0.93, sodium: 40, portionG: 100, portionLabel: "100g" },
  { name: "닭가슴살, 조미 훈제", dbName: "닭가슴살, 조미훈제", code: "R109-008000417-0000", group: "고기", protein: 24.11, kcal: 114, fat: 1.62, sodium: 466, portionG: 100, portionLabel: "100g", store: true },
  { name: "소고기 설도(수입), 구운 것", dbName: "소고기, 수입산, 설도, 구운것(석쇠)", code: "R109-027011352-0000", group: "고기", protein: 28.45, kcal: 164, fat: 4.67, sodium: 38, portionG: 100, portionLabel: "100g" },
  { name: "소고기 우둔(한우 1등급), 생것", dbName: "소고기, 한우(1등급), 우둔, 생것", code: "R109-027066201-0000", group: "고기", protein: 23.0, kcal: 162, fat: 6.92, sodium: 50, portionG: 100, portionLabel: "100g(생것)" },
  { name: "돼지 안심, 구운 것", dbName: "돼지고기, 안심, 구운것(팬)", code: "R109-014008751-0000", group: "고기", protein: 30.23, kcal: 172, fat: 4.76, sodium: 57, portionG: 100, portionLabel: "100g" },
  { name: "황태포", dbName: "명태, 황태, 포, 말린것", code: "R211-107033937-0001", group: "생선·해산물", protein: 79.0, kcal: 349, fat: 0.4, sodium: 438, portionG: 20, portionLabel: "20g" },
  { name: "건멸치", dbName: "건멸치", code: "R211-105030102-0000", group: "생선·해산물", protein: 60.29, kcal: 310, fat: 5.42, sodium: 1455, portionG: 15, portionLabel: "15g" },
  { name: "연어, 생것", dbName: "연어, 생것", code: "R211-201093901-0000", group: "생선·해산물", protein: 20.6, kcal: 106, fat: 1.9, sodium: 95, portionG: 100, portionLabel: "100g" },
  { name: "고등어, 구운 것", dbName: "고등어, 구운것", code: "R211-021013950-0000", group: "생선·해산물", protein: 25.2, kcal: 264, fat: 22.4, sodium: 120, portionG: 100, portionLabel: "100g" },
  { name: "참치통조림", dbName: "참치통조림", code: "R211-059070128-0000", group: "생선·해산물", protein: 23.0, kcal: 197, fat: 10.63, sodium: 219, portionG: 100, portionLabel: "100g", store: true },
  { name: "흰다리새우, 생것", dbName: "새우, 흰다리새우, 생것", code: "R211-717413901-0000", group: "생선·해산물", protein: 21.17, kcal: 98, fat: 0.89, sodium: 122, portionG: 100, portionLabel: "100g" },
  { name: "달걀, 삶은 것", dbName: "달걀, 삶은것", code: "R110-003000046-0000", group: "달걀", protein: 13.49, kcal: 145, fat: 8.69, sodium: 128, portionG: 100, portionLabel: "100g", store: true },
  { name: "달걀흰자, 삶은 것", dbName: "달걀, 난백, 삶은것", code: "R110-003005046-0000", group: "달걀", protein: 11.63, kcal: 51, fat: 0.01, sodium: 145, portionG: 100, portionLabel: "100g" },
  { name: "대두(노란콩), 삶은 것", dbName: "대두, 노란색, 삶은것", code: "R104-012020046-0000", group: "콩·두부", protein: 17.82, kcal: 201, fat: 9.5, sodium: 4, portionG: 50, portionLabel: "50g" },
  { name: "낫토", dbName: "낫토", code: "R121-043010000-0000", group: "콩·두부", protein: 17.24, kcal: 181, fat: 8.47, sodium: 7, portionG: 50, portionLabel: "50g" },
  { name: "두부", dbName: "두부", code: "R121-043020300-0000", group: "콩·두부", protein: 9.62, kcal: 97, fat: 4.63, sodium: 1, portionG: 150, portionLabel: "150g", store: true },
  { name: "순두부", dbName: "두부, 순두부", code: "R121-043020500-0000", group: "콩·두부", protein: 6.85, kcal: 44, fat: 1.35, sodium: 4, portionG: 200, portionLabel: "200g" },
  { name: "렌틸콩(빨간색), 삶은 것", dbName: "렌즈콩(렌틸콩), 빨간색, 말린것, 삶은것", code: "R104-020018183-0000", group: "콩·두부", protein: 9.79, kcal: 150, fat: 0.88, sodium: 1, portionG: 100, portionLabel: "100g" },
  { name: "병아리콩, 삶은 것", dbName: "병아리콩, 말린것, 삶은것", code: "R104-021000083-0000", group: "콩·두부", protein: 9.18, kcal: 183, fat: 3.2, sodium: 0, portionG: 100, portionLabel: "100g" },
  { name: "땅콩, 볶은 것", dbName: "땅콩, 볶은것", code: "R105-007000058-0000", group: "견과", protein: 28.5, kcal: 567, fat: 46.24, sodium: 4, portionG: 30, portionLabel: "30g", store: true },
  { name: "아몬드, 볶은 것", dbName: "아몬드, 볶은것", code: "R105-020000058-0000", group: "견과", protein: 23.45, kcal: 594, fat: 51.29, sodium: 2, portionG: 30, portionLabel: "30g", store: true },
  { name: "우유", dbName: "우유", code: "R113-009000000-0000", group: "우유·유제품", protein: 3.09, kcal: 67, fat: 3.85, sodium: 40, portionG: 200, portionLabel: "200mL(200g으로 계산)", store: true },
  { name: "요구르트(떠먹는, 플레인)", dbName: "요구르트, 호상, 플레인", code: "R121-026061100-0000", group: "우유·유제품", protein: 4.53, kcal: 86, fat: 3.21, sodium: 56, portionG: 100, portionLabel: "100g", store: true },
  { name: "체다 치즈", dbName: "치즈, 체다", code: "R121-038070000-0000", group: "우유·유제품", protein: 18.76, kcal: 298, fat: 21.3, sodium: 928, portionG: 20, portionLabel: "20g", store: true },
  { name: "코티지 치즈", dbName: "치즈, 카테지", code: "R121-038090000-0000", group: "우유·유제품", protein: 13.3, kcal: 99, fat: 4.5, sodium: 400, portionG: 100, portionLabel: "100g" },
];

const round1 = (n: number) => Math.round(n * 10) / 10;
const portionProtein = (f: Food) => round1((f.protein * f.portionG) / 100);
const portionKcal = (f: Food) => Math.round((f.kcal * f.portionG) / 100);
const proteinPer100kcal = (f: Food) => round1((f.protein / f.kcal) * 100);

const byProtein100g = [...foods].sort((a, b) => b.protein - a.protein);
const byPortion = [...foods].sort((a, b) => portionProtein(b) - portionProtein(a));
const byEfficiency = [...foods].sort((a, b) => proteinPer100kcal(b) - proteinPer100kcal(a));
const storeFoods = foods.filter((f) => f.store).sort((a, b) => portionProtein(b) - portionProtein(a));

const findFood = (code: string) => foods.find((f) => f.code === code)!;
const chickenBoiled = findFood("R109-008000446-0000");
const chickenSmoked = findFood("R109-008000417-0000");
const egg = findFood("R110-003000046-0000");
const tofu = findFood("R121-043020300-0000");
const milk = findFood("R113-009000000-0000");
const anchovy = findFood("R211-105030102-0000");
const pollock = findFood("R211-107033937-0001");
const peanut = findFood("R105-007000058-0000");

// 가공 단백질 제품: ProteinLab 등록 성분표 값. 편의점·마트에서 한 번에 먹는 단위(음료 350mL 이하, 요거트 200g 이하)만, 브랜드당 1개.
type ProductRow = { slug: string; brand: string; name: string; capacity: string; proteinPerServing: number; calories: number; sugar: number; coupangUrl?: string };
const FALLBACK_LINK = "gaIdNRGs2u";
const capacityNumber = (capacity: string) => {
  const m = capacity.match(/([0-9.]+)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
};
function pickProducts(rows: ProductRow[], maxCapacity: number, count: number) {
  const sorted = rows
    .filter((d) => !!d.coupangUrl && !d.coupangUrl.includes(FALLBACK_LINK) && d.calories > 0 && capacityNumber(d.capacity) <= maxCapacity)
    .sort((a, b) => b.proteinPerServing - a.proteinPerServing || a.calories - b.calories);
  return sorted.filter((d, i, arr) => arr.findIndex((x) => x.brand === d.brand) === i).slice(0, count);
}
const drinkPicks = pickProducts(drinkProducts as ProductRow[], 350, 3);
const barPicks = pickProducts(barProducts as ProductRow[], 100, 3);
const yogurtPicks = pickProducts(yogurtProducts as ProductRow[], 200, 3);
const productRows: Array<{ kind: string; row: ProductRow }> = [
  ...drinkPicks.map((row) => ({ kind: "단백질 음료", row })),
  ...barPicks.map((row) => ({ kind: "단백질 바", row })),
  ...yogurtPicks.map((row) => ({ kind: "단백질 요거트", row })),
];

const quickAnswer = [
  `100g당 단백질이 가장 많은 음식은 말린 수산물입니다. 식약처 식품영양성분 DB 기준 황태포 ${pollock.protein}g, 건멸치 ${anchovy.protein}g입니다. 다만 한 번에 먹는 양이 적고 건멸치는 나트륨이 100g당 ${anchovy.sodium.toLocaleString()}mg입니다.`,
  `식사로 먹는 음식 중에서는 익힌 살코기가 100g당 28~30g으로 가장 많습니다(구운 돼지 안심 30.2g, 구운 소고기 설도 28.45g, 삶은 닭가슴살 ${chickenBoiled.protein}g). 삶은 달걀 ${egg.protein}g, 두부 ${tofu.protein}g, 우유 ${milk.protein}g이 뒤를 잇습니다.`,
  `편의점에서 바로 살 수 있는 것 중에는 훈제 닭가슴살(100g당 ${chickenSmoked.protein}g, 나트륨 ${chickenSmoked.sodium}mg)과 단백질 음료(350mL 이하 한 병에 최대 ${drinkPicks[0]?.proteinPerServing ?? "-"}g, ProteinLab 등록 성분표 기준)가 단백질이 가장 많습니다. 열량 대비로는 달걀흰자·황태포·닭가슴살·새우가 앞섭니다.`,
];

const faqItems = [
  {
    question: "단백질이 가장 많은 음식은 무엇인가요?",
    answer: `100g당으로는 황태포(${pollock.protein}g)와 건멸치(${anchovy.protein}g) 같은 말린 수산물이 가장 많습니다(식약처 식품영양성분 DB). 물기를 뺀 만큼 농축된 값이라 한 번에 먹는 양은 적습니다. 식사로 먹는 음식 중에서는 익힌 돼지 안심·소고기·닭가슴살이 100g당 28~30g입니다.`,
  },
  {
    question: "달걀 한 개에 단백질이 몇 g인가요?",
    answer: `식약처 DB의 삶은 달걀은 100g당 ${egg.protein}g입니다. 껍데기를 벗긴 달걀이 50g이라면 약 ${round1(egg.protein / 2)}g, 60g이라면 약 ${round1(egg.protein * 0.6)}g입니다. 달걀 크기마다 무게가 다르므로 무게에 100g당 값을 곱해 계산합니다.`,
  },
  {
    question: "닭가슴살 100g에 단백질은 얼마나 있나요?",
    answer: `식약처 DB 기준 생 닭가슴살은 100g당 22.97g, 삶은 닭가슴살은 ${chickenBoiled.protein}g, 조미 훈제 닭가슴살은 ${chickenSmoked.protein}g입니다. 익히면 수분이 빠져 같은 100g에 단백질이 더 많아집니다. 훈제 제품은 나트륨이 100g당 ${chickenSmoked.sodium}mg으로 삶은 것(${chickenBoiled.sodium}mg)보다 많습니다.`,
  },
  {
    question: "편의점에서 단백질 많은 음식은 무엇이 있나요?",
    answer: `훈제 닭가슴살, 삶은 달걀, 우유, 두부, 참치통조림, 치즈, 볶은 땅콩·아몬드 같은 견과가 있습니다. 한 번에 단백질을 20g 넘게 먹으려면 닭가슴살 100g(약 ${chickenSmoked.protein}g)이나 단백질 음료 한 병이 가장 쉽습니다. 제품마다 용량이 다르니 포장의 영양성분표를 확인하세요.`,
  },
  {
    question: "견과류는 단백질 공급원으로 좋은가요?",
    answer: `볶은 땅콩은 100g당 단백질 ${peanut.protein}g으로 많지만 열량이 ${peanut.kcal}kcal, 지방이 ${peanut.fat}g입니다. 30g을 먹으면 단백질 약 ${portionProtein(peanut)}g에 열량 약 ${portionKcal(peanut)}kcal입니다. 열량 대비 단백질은 고기·생선·달걀보다 낮아 주된 단백질원보다는 곁들이는 용도에 맞습니다.`,
  },
];

const relatedLinks = [
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 실제 섭취량." },
  { href: "/guides/basics/muscle", title: "근육 합성에 단백질 얼마나", body: "한 끼 20~40g, 하루 1.6g/kg 근거." },
  { href: "/guides/product-selection-comparison/convenience-store-protein-guide", title: "편의점 단백질 음료·바", body: "CU·GS25·세븐일레븐에서 고르는 기준." },
  { href: "/guides/fitness-lifestyle/convenience-store-workout-protein", title: "편의점 운동 전후 단백질", body: "운동 전후에 바로 살 수 있는 제품." },
  { href: "/guides/basics/deficiency-symptoms", title: "단백질 부족 증상", body: "부족할 때 나타나는 신호와 점검법." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다 섭취 부작용", body: "많이 먹으면 생기는 문제." },
];

const sources = [
  "식품의약품안전처 식품영양성분 데이터베이스(various.foodsafetykorea.go.kr/nutrient), 원재료성 식품 상세 화면 100g당 함량. 자료원 표기: 국립식량과학원(참치통조림·건멸치는 국립수산과학원). 2026-11-03 확인, 식품코드는 각 표에 표기",
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준(성인 단백질 권장섭취량)",
  `ProteinLab 등록 성분표: 단백질 음료 ${drinkProducts.length}개·바 ${barProducts.length}개·요거트 ${yogurtProducts.length}개 중 한 번 먹는 단위 제품, 2026-11-03 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";
const linkClass = "font-semibold text-[#2d6a4f] underline underline-offset-2";

function FoodName({ food }: { food: Food }) {
  return (
    <a
      href={`${DB_DETAIL}?searchFoodCd=${food.code}&searchRegionCd=ZZ&searchMonthCd=AVG`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="text-[var(--foreground)] underline decoration-dotted underline-offset-2"
      title={`식약처 식품영양성분 DB: ${food.dbName} (${food.code})`}
    >
      {food.name}
    </a>
  );
}

export default function HighProteinFoodsPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    [drinkPicks[0], barPicks[0], yogurtPicks[0]]
      .filter((d): d is ProductRow => !!d)
      .map((d) => ({ slug: d.slug, contextLabel: `${d.capacity} · 단백질 ${d.proteinPerServing}g · ${d.calories}kcal` })),
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
            <Link href="/guides/basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
            <span>/</span>
            <span>단백질 많은 음식</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">음식 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-03</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">단백질 많은 음식 순위 25가지</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            식약처 식품영양성분 데이터베이스에서 음식마다 100g당 단백질·열량·지방을 직접 찾아 정리했습니다. 100g당 순위, 한 번 먹는
            양으로 계산한 단백질, 열량 대비 순위를 따로 보고, 편의점에서 살 수 있는 음식과 단백질 제품도 비교합니다.
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
          <GuideBuySection topic="highProtein" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">100g당 단백질 순위 (식약처 식품영양성분 DB)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              모두 같은 100g으로 맞춘 값입니다. 음식 이름을 누르면 식약처 데이터베이스의 해당 식품 화면이 열립니다. 익힌 것과 생것은
              수분이 달라 값이 다릅니다(예: 닭가슴살 생것 22.97g, 삶은 것 {chickenBoiled.protein}g).
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>음식</th>
                    <th className={thClass}>분류</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>지방</th>
                    <th className={thClass}>나트륨</th>
                    <th className={thClass}>식품코드</th>
                  </tr>
                </thead>
                <tbody>
                  {byProtein100g.map((f, i) => (
                    <tr key={f.code} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={tdClass}>{i + 1}</td>
                      <td className={`${tdClass} font-semibold`}>
                        <FoodName food={f} />
                      </td>
                      <td className={tdClass}>{f.group}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{f.protein}g</td>
                      <td className={tdClass}>{f.kcal}kcal</td>
                      <td className={tdClass}>{f.fat}g</td>
                      <td className={tdClass}>{f.sodium.toLocaleString()}mg</td>
                      <td className={`${tdClass} whitespace-nowrap text-xs`}>{f.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              황태포·건멸치는 말려서 수분이 빠진 만큼 100g당 값이 크게 나옵니다. 실제로 한 번에 먹는 양은 아래 표에서 보세요. 그릭요거트는
              데이터베이스에 일반 항목이 없고 개별 제품만 있어 이 표에서 뺐습니다. 제품별 값은{" "}
              <Link href="/yogurt" className={linkClass}>
                단백질 요거트 비교
              </Link>
              에 있습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">한 번 먹는 양으로 계산하면</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              100g당 값에 아래 양을 곱했습니다. 양은 비교하기 쉽게 이 페이지가 정한 계산용 양입니다(고기·생선·달걀 100g, 두부 150g,
              우유 200mL, 견과 30g, 치즈 20g, 말린 수산물 15~20g). 공식 1회 분량이 아니며, 실제로 먹는 무게를 재서 같은 방법으로
              계산하면 됩니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>음식</th>
                    <th className={thClass}>계산용 양</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                  </tr>
                </thead>
                <tbody>
                  {byPortion.map((f) => (
                    <tr key={f.code} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold`}>
                        <FoodName food={f} />
                      </td>
                      <td className={tdClass}>{f.portionLabel}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{portionProtein(f)}g</td>
                      <td className={tdClass}>{portionKcal(f)}kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              성인 하루 권장량은 2020 한국인 영양소 섭취기준으로 50~65g입니다(성별·나이별 표는{" "}
              <Link href="/guides/basics/daily-requirement" className={linkClass}>
                단백질 하루 섭취량
              </Link>
              ). 고기·생선 100g을 두 끼 먹으면 40~60g이 됩니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">열량 대비 단백질 순위 — 100kcal당</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              다이어트 중이라면 100g당 값보다 열량 100kcal에 단백질이 얼마나 들어 있는지가 더 중요합니다. 100g당 단백질 ÷ 100g당 열량
              × 100으로 계산했습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>음식</th>
                    <th className={thClass}>100kcal당 단백질</th>
                    <th className={thClass}>100g당 단백질·열량</th>
                  </tr>
                </thead>
                <tbody>
                  {byEfficiency.map((f, i) => (
                    <tr key={f.code} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={tdClass}>{i + 1}</td>
                      <td className={`${tdClass} font-semibold`}>
                        <FoodName food={f} />
                      </td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{proteinPer100kcal(f)}g</td>
                      <td className={tdClass}>
                        {f.protein}g · {f.kcal}kcal
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              지방이 적은 달걀흰자·말린 생선·닭가슴살·새우가 위에 있고, 지방이 많은 견과·치즈·고등어는 아래에 있습니다. 같은 단백질을
              얻을 때 열량이 그만큼 더 따라옵니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점에서 살 수 있는 단백질 음식</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              편의점에서 흔히 파는 형태의 음식을 위 계산용 양 기준으로 모았습니다. 실제 제품은 용량과 양념이 제각각이라 포장의
              영양성분표가 우선입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>음식</th>
                    <th className={thClass}>계산용 양</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>나트륨</th>
                  </tr>
                </thead>
                <tbody>
                  {storeFoods.map((f) => (
                    <tr key={f.code} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold`}>
                        <FoodName food={f} />
                      </td>
                      <td className={tdClass}>{f.portionLabel}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{portionProtein(f)}g</td>
                      <td className={tdClass}>{portionKcal(f)}kcal</td>
                      <td className={tdClass}>{Math.round((f.sodium * f.portionG) / 100)}mg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">음식 대신 단백질 제품이라면 — 한 개 기준</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab에 등록된 제품 성분표에서 한 번에 먹는 단위(음료 350mL 이하, 요거트 200g 이하)만 골라 종류별로 단백질이 많은
              순서대로 브랜드당 1개씩 뽑았습니다. 100kcal당 단백질을 위 음식 표와 나란히 비교할 수 있습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>종류</th>
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>100kcal당 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map(({ kind, row: d }) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={tdClass}>{kind}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.capacity}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{d.calories}kcal</td>
                      <td className={tdClass}>{d.sugar}g</td>
                      <td className={tdClass}>{round1((d.proteinPerServing / d.calories) * 100)}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              성분은 제조사 표기 1개 기준입니다. 같은 100kcal당 단백질로 보면 음료는 삶은 닭가슴살({proteinPer100kcal(chickenBoiled)}g)과
              비슷한 제품이 있고, 바는 그보다 낮습니다. 식사를 대신하기보다 끼니 사이 모자란 양을 채우는 용도로 쓰는 것이 일반적입니다.
            </p>
          </section>

          <GuideCompareListCta category="drink" slugs={drinkPicks.map((d) => d.slug)} />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">고를 때 같이 볼 것</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">나트륨</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  건멸치(100g당 {anchovy.sodium.toLocaleString()}mg), 체다 치즈(928mg), 훈제 닭가슴살({chickenSmoked.sodium}mg)은 같은
                  단백질을 얻을 때 나트륨이 많이 따라옵니다. 같은 닭가슴살이라도 삶은 것은 {chickenBoiled.sodium}mg입니다.
                </p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">열량·지방</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  견과는 100g당 단백질이 많아 보여도 열량이 560kcal를 넘습니다. 다이어트 중이라면 100kcal당 단백질 표를 기준으로
                  고릅니다.
                </p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">조리 상태</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  생것과 익힌 것은 수분 차이로 100g당 값이 다릅니다. 무게를 잴 때 익히기 전인지 후인지에 맞는 값을 씁니다.
                </p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">질환이 있다면</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  콩팥 질환으로 단백질을 제한하고 있다면 양을 늘리기 전에 의료진과 상의합니다. 자세한 내용은{" "}
                  <Link href="/guides/intake-strategy-health/high-protein-side-effects" className={linkClass}>
                    단백질 과다 섭취 부작용
                  </Link>
                  에 있습니다.
                </p>
              </article>
            </div>
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
