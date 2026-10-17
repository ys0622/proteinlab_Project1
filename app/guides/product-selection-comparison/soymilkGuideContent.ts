import type { ComparePageConfig, RelatedGuideLink } from "./productCompareShared";
import { formatProductLabel } from "../../lib/productLabel";
import { getDrinkProducts } from "@/app/data/drinkProductsData";
import { soymilkProducts } from "@/app/data/products";

// 두유 가이드 3편. 수치는 전부 ProteinLab 두유·음료 데이터에서 계산한다(성분표 기준).
const UPDATED = "2026-10-14";
const KEYWORD_UPDATED = "2026-10-18";
const BASE = "/guides/product-selection-comparison";

const fmt = (n: number) => (Math.round(n * 10) / 10).toString();
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const label = (p: { brand: string; name: string }) => formatProductLabel(p.brand, p.name);
const sugarOf = (p: { sugar?: number }) => p.sugar ?? 99;
const proteinOf = (p: { proteinPerServing: number }) => p.proteinPerServing;

const soy = soymilkProducts;
const drinks = getDrinkProducts().filter((p) => !p.needsServingCheck);

function articleJsonLd(config: ComparePageConfig) {
  const publishedAt = config.updatedAt ?? UPDATED;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    inLanguage: "ko-KR",
    mainEntityOfPage: `https://proteinlab.kr${BASE}/${config.slug}`,
    author: { "@type": "Organization", name: "ProteinLab", url: "https://proteinlab.kr" },
    publisher: {
      "@type": "Organization",
      name: "ProteinLab",
      url: "https://proteinlab.kr",
      logo: { "@type": "ImageObject", url: "https://proteinlab.kr/proteinlab-logo.png", width: 715, height: 717 },
    },
    image: { "@type": "ImageObject", url: "https://proteinlab.kr/proteinlab-logo.png" },
    datePublished: publishedAt,
    dateModified: publishedAt,
  };
}

function faqJsonLd(config: ComparePageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (config.faq ?? []).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

const related = (extra: RelatedGuideLink[]): RelatedGuideLink[] => [
  ...extra,
  { title: "두유 전체 비교", href: "/soymilk", description: "등록된 두유를 단백질 구간·당류·열량 기준으로 한 화면에서 비교합니다." },
  { title: "고단백 두유 고르는 법", href: `${BASE}/high-protein-soymilk-guide`, description: "1팩 단백질 구간(11g 이상·8~10g·5~7g)과 읽는 순서를 먼저 정리합니다." },
];

// ---------- 1) 저당 두유 ----------
const lowSugar = soy.filter((p) => sugarOf(p) <= 2).sort((a, b) => sugarOf(a) - sugarOf(b) || proteinOf(b) - proteinOf(a));
const lowSugarTop = [...lowSugar].sort((a, b) => proteinOf(b) - proteinOf(a) || sugarOf(a) - sugarOf(b)).slice(0, 3);
const lowSugarBest = lowSugar[0];
const lowSugarHighProtein = lowSugar.filter((p) => proteinOf(p) >= 11).length;
const sugarMedianAll = median(soy.map(sugarOf));
const highSugar = soy.filter((p) => sugarOf(p) >= 7);

export const lowSugarSoymilkConfig: ComparePageConfig = {
  slug: "low-sugar-soymilk-guide",
  dataSection: { category: "soymilk", mode: "lowSugar", limit: 12 },
  title: "무가당 두유 추천 | 성분·당류 비교",
  seoTitle: `무가당 두유 추천 | 당류 2g 이하 두유 ${lowSugar.length}종 비교`,
  description: `무가당 두유 추천을 찾을 때 확인할 표시 문구와 성분표 기준을 정리했습니다. ProteinLab 등록 두유 ${soy.length}종 중 당류 2g 이하 ${lowSugar.length}종을 단백질·열량과 함께 비교합니다.`,
  keywords: ["무가당 두유 추천", "저당 두유", "무가당 두유", "당류 낮은 두유", "저당 두유 추천", "고단백 저당 두유"],
  badge: "저당 두유",
  readingTime: "4분 읽기",
  updatedAt: KEYWORD_UPDATED,
  methodologyNote: `ProteinLab 두유 ${soy.length}종 성분표 기준 · 1팩 기준 당류 2g 이하`,
  intro: `두유는 이름이 비슷해도 1팩 당류가 ${fmt(Math.min(...soy.map(sugarOf)))}g부터 ${fmt(Math.max(...soy.map(sugarOf)))}g까지 차이가 납니다. 등록된 ${soy.length}종의 당류 중앙값은 ${fmt(sugarMedianAll)}g이고, 7g 이상인 제품도 ${highSugar.length}종 있습니다. 저당을 찾는다면 단백질 총량보다 당류를 먼저 걸러내는 편이 빠릅니다.`,
  summary: [
    `당류 2g 이하 두유는 등록 ${soy.length}종 중 ${lowSugar.length}종이고, 이 중 단백질 11g 이상은 ${lowSugarHighProtein}종입니다.`,
    `당류가 가장 낮은 제품은 ${label(lowSugarBest)}(${fmt(sugarOf(lowSugarBest))}g)입니다.`,
    "무가당 표기와 당류 수치는 별개이므로, 성분표의 당류 줄과 알룰로오스 표기를 같이 확인해야 합니다.",
  ],
  comparisonTitle: "당류 2g 이하 · 단백질 상위 3종",
  comparisonColumns: lowSugarTop.map(label),
  comparisonRows: [
    { label: "1팩 단백질", values: lowSugarTop.map((p) => `${fmt(proteinOf(p))}g`) },
    { label: "당류", values: lowSugarTop.map((p) => `${fmt(sugarOf(p))}g`) },
    { label: "열량", values: lowSugarTop.map((p) => `${p.calories}kcal`) },
    { label: "용량", values: lowSugarTop.map((p) => p.capacity ?? "-") },
    { label: "맛", values: lowSugarTop.map((p) => p.flavor ?? "-") },
  ],
  sections: [
    {
      title: "저당 두유를 고르는 순서",
      items: [
        { title: "1. 1팩 당류부터", body: `성분표의 당류 줄을 기준으로 2g 이하만 남기면 ${soy.length}종이 ${lowSugar.length}종으로 줄어듭니다. 같은 브랜드 안에서도 맛에 따라 당류가 크게 달라집니다.` },
        { title: "2. 단백질은 그다음", body: `당류 2g 이하 ${lowSugar.length}종의 단백질은 ${fmt(Math.min(...lowSugar.map(proteinOf)))}~${fmt(Math.max(...lowSugar.map(proteinOf)))}g입니다. 단백질을 우선하면 위 비교표처럼 상위 제품부터 보면 됩니다.` },
        { title: "3. 열량과 용량 확인", body: "190mL와 240mL 팩은 같은 단백질이라도 열량이 다릅니다. 용량이 다른 제품은 1팩 총량과 함께 100mL당 값도 비교하세요." },
      ],
    },
    {
      title: "무가당과 저당, 표기에서 헷갈리는 점",
      items: [
        { title: "무가당 ≠ 당류 0g", body: "무가당 표기여도 원료에서 오는 당류가 성분표에 잡힙니다. 등록 제품 중 무가당 표기 제품의 당류도 0.5g부터 1.8g까지 제각각입니다." },
        { title: "알룰로오스 표기", body: "일부 제품은 성분표에 알룰로오스를 당류와 별도 줄로 적습니다. 당류 수치가 낮아 보여도 별도 줄이 있는지 성분표를 직접 확인하세요." },
        { title: "당류 7g 이상 제품", body: `${highSugar.map(label).join(", ")}은 당류가 7g 이상입니다. 저당 기준에서는 제외하고 보는 편이 맞습니다.` },
      ],
    },
    {
      title: "무가당 두유 추천 검색에서 확인할 표시",
      items: [
        { title: "제품명보다 영양정보", body: "무가당이나 플레인이라는 제품명만으로 당류 수치를 판단하지 말고, 영양정보의 당류와 원재료명을 함께 확인하세요." },
        { title: "같은 브랜드도 제품별 확인", body: "같은 브랜드 안에서도 맛과 제품 라인에 따라 당류와 열량이 다르므로 개별 제품 성분표를 기준으로 비교해야 합니다." },
        { title: "단백질은 당류 확인 뒤 비교", body: `등록 제품 중 당류 2g 이하 후보를 먼저 남긴 뒤 한 팩 단백질을 비교하면 ${lowSugar.length}종 안에서 목적에 맞게 범위를 좁힐 수 있습니다.` },
      ],
    },
  ],
  faq: [
    { question: "저당 두유는 당류가 몇 g 이하인가요?", answer: `법적으로 정해진 단일 기준을 쓰기보다, ProteinLab은 1팩 당류 2g 이하를 저당 두유로 묶어 비교합니다. 이 기준에 맞는 등록 제품은 ${lowSugar.length}종입니다.` },
    { question: "무가당 두유는 당류가 0g인가요?", answer: `아닙니다. 무가당 표기 제품도 콩에서 오는 당류가 성분표에 표시됩니다. 등록된 무가당 계열 제품의 당류는 0.5~1.8g 범위입니다.` },
    { question: "저당이면서 단백질이 높은 두유가 있나요?", answer: `당류 2g 이하이면서 단백질 11g 이상인 제품은 등록 기준 ${lowSugarHighProtein}종입니다. 가장 단백질이 높은 제품은 ${label(lowSugarTop[0])}(${fmt(proteinOf(lowSugarTop[0]))}g, 당류 ${fmt(sugarOf(lowSugarTop[0]))}g)입니다.` },
    { question: "무가당 두유 추천 제품은 제품명만 보고 골라도 되나요?", answer: "아닙니다. 무가당·플레인 표기와 실제 당류 수치는 같은 뜻이 아니므로 영양정보의 당류와 원재료명을 제품별로 확인해야 합니다." },
    { question: "무가당 두유끼리는 무엇을 더 비교해야 하나요?", answer: "당류를 확인한 뒤 한 팩 단백질, 열량, 용량을 함께 보세요. 팩 크기가 다르면 총량뿐 아니라 용량당 수치도 같이 비교하는 편이 정확합니다." },
  ],
  relatedGuides: related([
    { title: "저당 두유 큐레이션", href: "/curation/soymilk-low-sugar", description: "당류 기준으로 걸러낸 두유만 모아 표로 봅니다." },
  ]),
  purchaseLinks: lowSugarTop.map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};
lowSugarSoymilkConfig.jsonLd = [articleJsonLd(lowSugarSoymilkConfig), faqJsonLd(lowSugarSoymilkConfig)];

// ---------- 2) 검은콩 두유 ----------
const black = soy.filter((p) => p.flavor === "검은콩");
const blackByProtein = [...black].sort((a, b) => proteinOf(b) - proteinOf(a) || sugarOf(a) - sugarOf(b));
const blackTop = blackByProtein.slice(0, 3);
const plain = soy.filter((p) => p.flavor === "플레인");
const blackLow = black.filter((p) => sugarOf(p) <= 2);
const blackHigh = black.filter((p) => sugarOf(p) >= 7);

export const blackbeanSoymilkConfig: ComparePageConfig = {
  slug: "blackbean-soymilk-guide",
  dataSection: { category: "soymilk", mode: "protein", limit: 12 },
  title: "검은콩 두유 추천 비교 | 단백질·당류 차이",
  seoTitle: `검은콩 두유 ${black.length}종 비교 | 단백질·당류 차이`,
  description: `검은콩·서리태 두유 ${black.length}종의 1팩 단백질과 당류를 플레인 두유와 비교합니다. 같은 검은콩이라도 당류가 0.5g부터 10g까지 벌어지는 이유를 성분표 기준으로 정리했습니다.`,
  keywords: ["검은콩 두유", "서리태 두유", "검은콩 두유 단백질", "검은콩 두유 당류", "검은콩 두유 추천"],
  badge: "검은콩 두유",
  readingTime: "4분 읽기",
  updatedAt: UPDATED,
  methodologyNote: `ProteinLab 두유 ${soy.length}종 중 검은콩·서리태 ${black.length}종 성분표 기준`,
  intro: `검은콩 두유는 고소한 맛 때문에 찾는 사람이 많지만, 성분표로 보면 제품 간 차이가 큽니다. 등록된 ${black.length}종은 1팩 단백질이 ${fmt(Math.min(...black.map(proteinOf)))}~${fmt(Math.max(...black.map(proteinOf)))}g, 당류가 ${fmt(Math.min(...black.map(sugarOf)))}~${fmt(Math.max(...black.map(sugarOf)))}g입니다. 검은콩이라는 이름만으로 고르지 말고 수치를 먼저 보세요.`,
  summary: [
    `검은콩 두유 ${black.length}종 중 당류 2g 이하는 ${blackLow.length}종, 7g 이상은 ${blackHigh.length}종입니다.`,
    `단백질이 가장 높은 검은콩 두유는 ${label(blackTop[0])}(${fmt(proteinOf(blackTop[0]))}g)입니다.`,
    `플레인 두유 ${plain.length}종의 단백질 중앙값은 ${fmt(median(plain.map(proteinOf)))}g, 검은콩 두유는 ${fmt(median(black.map(proteinOf)))}g입니다.`,
  ],
  comparisonTitle: "검은콩 두유 · 단백질 상위 3종",
  comparisonColumns: blackTop.map(label),
  comparisonRows: [
    { label: "1팩 단백질", values: blackTop.map((p) => `${fmt(proteinOf(p))}g`) },
    { label: "당류", values: blackTop.map((p) => `${fmt(sugarOf(p))}g`) },
    { label: "열량", values: blackTop.map((p) => `${p.calories}kcal`) },
    { label: "용량", values: blackTop.map((p) => p.capacity ?? "-") },
  ],
  sections: [
    {
      title: "검은콩 두유에서 먼저 볼 수치",
      items: [
        { title: "당류 편차가 가장 큽니다", body: `검은콩 두유의 당류는 ${fmt(Math.min(...black.map(sugarOf)))}g부터 ${fmt(Math.max(...black.map(sugarOf)))}g까지 벌어집니다. 고칼슘 계열(${blackHigh.map(label).join(", ")})은 당류가 7g 이상입니다.` },
        { title: "단백질은 제품군에 따라 갈립니다", body: `고단백 라인은 12g, 일반 라인은 5~6g 안팎입니다. 같은 검은콩 맛이라도 라인 이름(고단백·고칼슘·저당)을 구분해서 봐야 합니다.` },
        { title: "열량도 같이", body: `검은콩 두유 열량은 ${Math.min(...black.map((p) => p.calories ?? 0))}~${Math.max(...black.map((p) => p.calories ?? 0))}kcal입니다. 당류가 높은 제품이 열량도 높은 경향이 있습니다.` },
      ],
    },
    {
      title: "검은콩 두유 vs 플레인 두유",
      items: [
        { title: "단백질", body: `플레인 ${plain.length}종 중앙값 ${fmt(median(plain.map(proteinOf)))}g, 검은콩 ${black.length}종 중앙값 ${fmt(median(black.map(proteinOf)))}g입니다. 맛 유형만으로 단백질이 정해지지는 않습니다.` },
        { title: "당류", body: `플레인 중앙값 ${fmt(median(plain.map(sugarOf)))}g, 검은콩 중앙값 ${fmt(median(black.map(sugarOf)))}g입니다.` },
        { title: "선택 기준", body: "맛이 목적이면 검은콩, 수치가 목적이면 맛 유형보다 1팩 단백질과 당류로 후보를 좁히는 편이 정확합니다." },
      ],
    },
  ],
  faq: [
    { question: "검은콩 두유와 서리태 두유는 같은 건가요?", answer: "ProteinLab은 검은콩과 서리태 두유를 같은 맛 유형(검은콩)으로 묶어 비교합니다. 원료 표기는 제품마다 다르니 성분표의 원재료명을 확인하세요." },
    { question: "검은콩 두유는 단백질이 더 높나요?", answer: `맛 유형만으로는 아닙니다. 등록 제품 기준 검은콩 두유 단백질 중앙값은 ${fmt(median(black.map(proteinOf)))}g, 플레인은 ${fmt(median(plain.map(proteinOf)))}g입니다. 제품 라인(고단백 여부)이 더 크게 좌우합니다.` },
    { question: "당류가 낮은 검은콩 두유가 있나요?", answer: `당류 2g 이하 검은콩 두유는 ${blackLow.length}종입니다. 반대로 고칼슘 계열은 7g 이상이므로 성분표의 당류 줄을 먼저 확인하세요.` },
  ],
  relatedGuides: related([
    { title: "저당 두유 추천", href: `${BASE}/low-sugar-soymilk-guide`, description: "당류 2g 이하 두유를 단백질·열량과 함께 봅니다." },
    { title: "검은콩 두유 큐레이션", href: "/curation/soymilk-blackbean", description: "검은콩·서리태 두유만 모아 표로 봅니다." },
  ]),
  purchaseLinks: blackTop.map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};
blackbeanSoymilkConfig.jsonLd = [articleJsonLd(blackbeanSoymilkConfig), faqJsonLd(blackbeanSoymilkConfig)];

// ---------- 3) 두유 vs 단백질 음료 ----------
const soyMedProtein = median(soy.map(proteinOf));
const drinkMedProtein = median(drinks.map(proteinOf));
const soyMedKcal = median(soy.map((p) => p.calories ?? 0));
const drinkMedKcal = median(drinks.map((p) => p.calories ?? 0));
const soyMedSugar = median(soy.map(sugarOf));
const drinkMedSugar = median(drinks.map(sugarOf));
const soyHigh = soy.filter((p) => proteinOf(p) >= 20);
const drinkLow = drinks.filter((p) => proteinOf(p) <= 12);

export const soymilkVsProteinDrinkConfig: ComparePageConfig = {
  slug: "soymilk-vs-protein-drink",
  dataSection: [{ category: "soymilk", mode: "protein", limit: 6 }, { category: "drink", mode: "protein", limit: 6 }],
  title: "두유 vs 단백질 음료 | 단백질·열량·당류 중앙값 비교",
  seoTitle: `두유 vs 단백질 음료 차이 | 단백질 중앙값 ${fmt(soyMedProtein)}g vs ${fmt(drinkMedProtein)}g`,
  description: `ProteinLab 등록 두유 ${soy.length}종과 단백질 음료 ${drinks.length}종을 단백질·열량·당류 중앙값으로 비교합니다. 어떤 상황에 두유가, 어떤 상황에 음료가 맞는지 수치로 정리했습니다.`,
  keywords: ["두유 단백질 음료 차이", "두유 vs 프로틴 음료", "두유 단백질 함량", "고단백 두유 단백질 음료 비교"],
  badge: "카테고리 비교",
  readingTime: "4분 읽기",
  updatedAt: UPDATED,
  methodologyNote: `ProteinLab 두유 ${soy.length}종 · 단백질 음료 ${drinks.length}종(1회 제공량 비교 가능 제품) 중앙값 기준`,
  intro: `두유와 단백질 음료는 둘 다 마시는 단백질 보충 제품이지만, 등록 데이터로 보면 평균적인 단백질 수준이 두 배 가까이 다릅니다. 1팩 단백질 중앙값은 두유 ${fmt(soyMedProtein)}g, 단백질 음료 ${fmt(drinkMedProtein)}g입니다. 다만 두유 중에도 20g 이상인 제품이 ${soyHigh.length}종 있어 제품 단위로 봐야 합니다.`,
  summary: [
    `단백질 중앙값은 두유 ${fmt(soyMedProtein)}g, 음료 ${fmt(drinkMedProtein)}g로 음료가 높습니다.`,
    `열량 중앙값은 두유 ${fmt(soyMedKcal)}kcal, 음료 ${fmt(drinkMedKcal)}kcal이고, 당류 중앙값은 두유 ${fmt(soyMedSugar)}g, 음료 ${fmt(drinkMedSugar)}g입니다.`,
    `두유 중 단백질 20g 이상은 ${soyHigh.length}종, 음료 중 12g 이하는 ${drinkLow.length}종으로 두 범위가 겹칩니다.`,
  ],
  comparisonTitle: "등록 데이터 중앙값 비교 (1회 제공량 기준)",
  comparisonColumns: ["두유", "단백질 음료"],
  comparisonRows: [
    { label: "등록 제품 수", values: [`${soy.length}종`, `${drinks.length}종`] },
    { label: "1회 단백질 중앙값", values: [`${fmt(soyMedProtein)}g`, `${fmt(drinkMedProtein)}g`] },
    { label: "열량 중앙값", values: [`${fmt(soyMedKcal)}kcal`, `${fmt(drinkMedKcal)}kcal`] },
    { label: "당류 중앙값", values: [`${fmt(soyMedSugar)}g`, `${fmt(drinkMedSugar)}g`] },
    { label: "단백질 최고", values: [`${fmt(Math.max(...soy.map(proteinOf)))}g`, `${fmt(Math.max(...drinks.map(proteinOf)))}g`] },
    { label: "단백질 20g 이상 제품", values: [`${soyHigh.length}종`, `${drinks.filter((p) => proteinOf(p) >= 20).length}종`] },
  ],
  sections: [
    {
      title: "수치로 보는 차이",
      items: [
        { title: "단백질 총량", body: `단백질 음료는 중앙값이 ${fmt(drinkMedProtein)}g이고 최고 ${fmt(Math.max(...drinks.map(proteinOf)))}g까지 있습니다. 두유는 중앙값 ${fmt(soyMedProtein)}g, 최고 ${fmt(Math.max(...soy.map(proteinOf)))}g입니다.` },
        { title: "열량", body: `1회 열량 중앙값은 두유 ${fmt(soyMedKcal)}kcal, 음료 ${fmt(drinkMedKcal)}kcal입니다. 단, 음료는 용량이 큰 제품이 섞여 있어 단순 비교에는 한계가 있습니다.` },
        { title: "용량 구성", body: "두유는 140~250mL 소포장이 대부분이고, 단백질 음료는 190mL부터 450mL 이상까지 다양합니다. 용량이 다르면 100mL당 값도 같이 보세요." },
      ],
    },
    {
      title: "이럴 때는 이쪽",
      items: [
        { title: "가볍게 단백질을 채우고 싶다면", body: `소포장 두유 중 1팩 단백질 8~12g 제품이 많습니다. 등록 두유의 열량 중앙값은 ${fmt(soyMedKcal)}kcal입니다.` },
        { title: "한 번에 많은 단백질이 필요하다면", body: `단백질 음료가 선택지가 넓습니다. 다만 두유 중에도 ${soyHigh.map(label).join(", ")}처럼 20g 이상 제품이 있습니다.` },
        { title: "원료 기준으로 고르고 싶다면", body: "두유는 대두 기반, 단백질 음료는 우유 단백질·분리대두 등 원료가 다양합니다. 원료는 제품별 성분표의 원재료명으로 확인하세요." },
      ],
    },
  ],
  faq: [
    { question: "두유와 단백질 음료 중 단백질은 어느 쪽이 더 많나요?", answer: `등록 데이터 중앙값은 두유 ${fmt(soyMedProtein)}g, 단백질 음료 ${fmt(drinkMedProtein)}g로 음료가 높습니다. 다만 두유 중 ${soyHigh.length}종은 20g 이상이라 제품 단위로 비교해야 합니다.` },
    { question: "두유도 단백질 보충용으로 쓸 수 있나요?", answer: `1팩 단백질 5g 이상 제품을 등록 기준으로 삼고 있으며, 11g 이상인 제품은 ${soy.filter((p) => proteinOf(p) >= 11).length}종입니다. 필요한 양은 개인마다 다르니 하루 섭취량과 함께 보세요.` },
    { question: "두유와 음료는 왜 카테고리가 따로인가요?", answer: "소비자가 인식하는 제품 성격이 다르고 용량 구성과 비교 기준(1팩 단백질 구간)이 달라서 ProteinLab은 두유를 별도 카테고리로 비교합니다." },
  ],
  relatedGuides: related([
    { title: "단백질 음료 선택 가이드", href: `${BASE}/protein-drink-guide`, description: "단백질 음료를 단백질·당류·칼로리 순서로 고르는 기준입니다." },
    { title: "매일두유 vs 베지밀", href: "/compare/maeil-vs-vegemil-soymilk", description: "고단백 플레인 두유 두 제품을 직접 비교합니다." },
  ]),
  purchaseLinks: [
    ...[...soy].sort((a, b) => proteinOf(b) - proteinOf(a)).slice(0, 2).map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
    ...[...drinks].sort((a, b) => proteinOf(b) - proteinOf(a)).filter((p) => p.coupangUrl && !p.coupangUrl.includes("gaIdNRGs2u")).slice(0, 1).map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
  ],
};
soymilkVsProteinDrinkConfig.jsonLd = [articleJsonLd(soymilkVsProteinDrinkConfig), faqJsonLd(soymilkVsProteinDrinkConfig)];

// ---------- 4) 다이어트 두유 (열량 기준) ----------
const lowKcal = soy.filter((p) => (p.calories ?? 999) <= 100);
const lowKcalSorted = [...lowKcal].sort((a, b) => (a.calories ?? 0) - (b.calories ?? 0) || proteinOf(b) - proteinOf(a));
const lowKcalTop = [...lowKcal].sort((a, b) => proteinOf(b) - proteinOf(a) || (a.calories ?? 0) - (b.calories ?? 0)).slice(0, 3);
const lowKcalLowSugar = lowKcal.filter((p) => sugarOf(p) <= 2);
const kcalMedianAll = median(soy.map((p) => p.calories ?? 0));
const highKcal = soy.filter((p) => (p.calories ?? 0) >= 150);

export const dietSoymilkConfig: ComparePageConfig = {
  slug: "diet-soymilk-guide",
  dataSection: { category: "soymilk", mode: "lowCalorie", limit: 12 },
  title: "다이어트 두유 추천 | 100kcal 이하 두유 비교",
  seoTitle: `다이어트 두유 추천 | 100kcal 이하 두유 ${lowKcal.length}종 비교`,
  description: `ProteinLab 등록 두유 ${soy.length}종 중 1팩 100kcal 이하 ${lowKcal.length}종을 단백질·당류와 함께 비교합니다. 열량이 낮아도 단백질이 낮을 수 있어, 열량 대비 단백질까지 읽는 법을 정리했습니다.`,
  keywords: ["다이어트 두유", "저칼로리 두유", "두유 칼로리", "100kcal 이하 두유", "두유 열량 비교"],
  badge: "다이어트 두유",
  readingTime: "4분 읽기",
  updatedAt: UPDATED,
  methodologyNote: `ProteinLab 두유 ${soy.length}종 성분표 기준 · 1팩 열량 100kcal 이하`,
  intro: `등록된 두유 ${soy.length}종의 1팩 열량은 ${Math.min(...soy.map((p) => p.calories ?? 0))}kcal부터 ${Math.max(...soy.map((p) => p.calories ?? 0))}kcal까지이고 중앙값은 ${fmt(kcalMedianAll)}kcal입니다. 열량만 보면 낮은 제품을 고르기 쉽지만, 팩 용량과 단백질이 달라서 단백질까지 함께 봐야 비교가 됩니다.`,
  summary: [
    `1팩 100kcal 이하 두유는 ${soy.length}종 중 ${lowKcal.length}종이고, 이 중 당류 2g 이하는 ${lowKcalLowSugar.length}종입니다.`,
    `열량이 가장 낮은 제품은 ${label(lowKcalSorted[0])}(${lowKcalSorted[0].calories}kcal, 단백질 ${fmt(proteinOf(lowKcalSorted[0]))}g)입니다.`,
    `150kcal 이상 두유는 ${highKcal.length}종으로, 단백질이 높은 제품들입니다.`,
  ],
  comparisonTitle: "100kcal 이하 · 단백질 상위 3종",
  comparisonColumns: lowKcalTop.map(label),
  comparisonRows: [
    { label: "1팩 열량", values: lowKcalTop.map((p) => `${p.calories}kcal`) },
    { label: "1팩 단백질", values: lowKcalTop.map((p) => `${fmt(proteinOf(p))}g`) },
    { label: "100kcal당 단백질", values: lowKcalTop.map((p) => `${fmt((proteinOf(p) / (p.calories ?? 1)) * 100)}g`) },
    { label: "당류", values: lowKcalTop.map((p) => `${fmt(sugarOf(p))}g`) },
    { label: "용량", values: lowKcalTop.map((p) => p.capacity ?? "-") },
  ],
  sections: [
    {
      title: "열량으로 두유 고르는 순서",
      items: [
        { title: "1. 1팩 열량으로 후보 줄이기", body: `100kcal 이하만 남기면 ${soy.length}종이 ${lowKcal.length}종으로 줄어듭니다.` },
        { title: "2. 100kcal당 단백질 보기", body: `열량이 같아도 단백질은 ${fmt(Math.min(...lowKcal.map(proteinOf)))}~${fmt(Math.max(...lowKcal.map(proteinOf)))}g로 갈립니다. 열량 대비 단백질(100kcal당)로 보면 효율 차이가 드러납니다.` },
        { title: "3. 당류 확인", body: `100kcal 이하여도 당류가 높은 제품이 있습니다. 위 ${lowKcal.length}종 중 당류 2g 이하는 ${lowKcalLowSugar.length}종입니다.` },
      ],
    },
    {
      title: "열량이 높은 두유는 무엇이 다른가",
      items: [
        { title: "용량이 큽니다", body: `150kcal 이상 ${highKcal.length}종은 ${highKcal.map(label).join(", ")}입니다. 단백질 12~24g 제품이라 열량도 함께 높습니다.` },
        { title: "1팩 열량만 비교하지 마세요", body: "190mL와 240mL 제품은 팩 크기가 달라 1팩 열량을 그대로 비교하기 어렵습니다. 100mL당 열량도 같이 보세요." },
      ],
    },
  ],
  faq: [
    { question: "100kcal 이하 두유는 몇 종인가요?", answer: `ProteinLab 등록 ${soy.length}종 중 ${lowKcal.length}종입니다. 이 중 단백질이 가장 높은 제품은 ${label(lowKcalTop[0])}(${fmt(proteinOf(lowKcalTop[0]))}g, ${lowKcalTop[0].calories}kcal)입니다.` },
    { question: "열량이 낮으면 단백질도 낮은가요?", answer: `반드시 그렇지는 않습니다. 100kcal 이하 ${lowKcal.length}종의 단백질은 ${fmt(Math.min(...lowKcal.map(proteinOf)))}~${fmt(Math.max(...lowKcal.map(proteinOf)))}g로 폭이 넓습니다. 100kcal당 단백질을 같이 보세요.` },
    { question: "다이어트 중에는 두유를 어떻게 골라야 하나요?", answer: "이 가이드는 성분표 수치로 후보를 고르는 방법만 다룹니다. 개인에게 맞는 열량과 단백질 양은 식단 전체와 건강 상태에 따라 다르므로 필요하면 전문가와 상담하세요." },
  ],
  relatedGuides: related([
    { title: "저당 두유 추천", href: `${BASE}/low-sugar-soymilk-guide`, description: "당류 2g 이하 두유를 단백질·열량과 함께 봅니다." },
    { title: "저칼로리 두유 큐레이션", href: "/curation/soymilk-low-calorie", description: "열량이 낮은 두유만 모아 표로 봅니다." },
  ]),
  purchaseLinks: lowKcalTop.map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};
dietSoymilkConfig.jsonLd = [articleJsonLd(dietSoymilkConfig), faqJsonLd(dietSoymilkConfig)];

// ---------- 5) 두유 단백질 높은 순 ----------
const byProtein = [...soy].sort((a, b) => proteinOf(b) - proteinOf(a) || sugarOf(a) - sugarOf(b));
const proteinTop = byProtein.slice(0, 4);
const protein24 = soy.filter((p) => proteinOf(p) >= 20);
const protein11 = soy.filter((p) => proteinOf(p) >= 11);

export const proteinRankSoymilkConfig: ComparePageConfig = {
  slug: "soymilk-protein-ranking",
  dataSection: { category: "soymilk", mode: "protein", limit: 10 },
  title: "두유 단백질 함량 순위 | 1팩 단백질 높은 순 TOP 10",
  seoTitle: `두유 단백질 함량 순위 | 1팩 ${fmt(proteinOf(byProtein[0]))}g부터 TOP 10`,
  description: `ProteinLab 등록 두유 ${soy.length}종을 1팩 단백질 높은 순으로 정리했습니다. 20g 이상 ${protein24.length}종, 11g 이상 ${protein11.length}종이며 당류·열량·용량을 함께 보는 법을 안내합니다.`,
  keywords: ["두유 단백질 순위", "두유 단백질 함량", "단백질 높은 두유", "고단백 두유 순위", "두유 단백질 비교"],
  badge: "단백질 순위",
  readingTime: "4분 읽기",
  updatedAt: UPDATED,
  methodologyNote: `ProteinLab 두유 ${soy.length}종 1팩 단백질(g) 기준 · 성분표 수치`,
  intro: `두유 1팩 단백질은 ${fmt(Math.min(...soy.map(proteinOf)))}g부터 ${fmt(Math.max(...soy.map(proteinOf)))}g까지입니다. 등록 ${soy.length}종 중 20g 이상은 ${protein24.length}종, 11g 이상은 ${protein11.length}종입니다. 용량이 190mL부터 250mL까지 달라서, 1팩 단백질 순위와 100mL당 단백질을 같이 봐야 합니다.`,
  summary: [
    `1팩 단백질 1위는 ${label(proteinTop[0])}(${fmt(proteinOf(proteinTop[0]))}g, ${proteinTop[0].capacity})입니다.`,
    `단백질 20g 이상 두유는 ${protein24.length}종이고 모두 240mL 이상 팩입니다.`,
    `같은 12g이라도 당류는 0.5g부터 7.5g까지 차이가 납니다. 순위와 함께 당류를 확인하세요.`,
  ],
  comparisonTitle: "1팩 단백질 상위 4종",
  comparisonColumns: proteinTop.map(label),
  comparisonRows: [
    { label: "1팩 단백질", values: proteinTop.map((p) => `${fmt(proteinOf(p))}g`) },
    { label: "용량", values: proteinTop.map((p) => p.capacity ?? "-") },
    { label: "100mL당 단백질", values: proteinTop.map((p) => `${fmt((proteinOf(p) / (parseFloat(p.capacity ?? "190") || 190)) * 100)}g`) },
    { label: "당류", values: proteinTop.map((p) => `${fmt(sugarOf(p))}g`) },
    { label: "열량", values: proteinTop.map((p) => `${p.calories}kcal`) },
  ],
  sections: [
    {
      title: "순위를 읽는 법",
      items: [
        { title: "1팩 단백질과 100mL당 단백질은 다릅니다", body: "240mL 제품은 팩이 커서 1팩 단백질이 높게 나옵니다. 팩 크기가 다른 제품끼리는 100mL당 단백질로 다시 비교하세요." },
        { title: "단백질이 같다면 당류와 열량", body: "12g 제품만 해도 당류 0.5~7.5g, 열량 85~135kcal로 갈립니다. 단백질 순위가 같을 때는 당류와 열량으로 가르면 됩니다." },
        { title: "등록 기준", body: "ProteinLab은 소포장(250mL 이하) 대두 기반 두유 중 1팩 단백질이 g으로 표기된 5g 이상 제품만 등록합니다. %만 표기된 제품과 대용량은 제외합니다." },
      ],
    },
  ],
  faq: [
    { question: "단백질이 가장 높은 두유는 무엇인가요?", answer: `등록 기준 1팩 단백질 1위는 ${label(proteinTop[0])}(${fmt(proteinOf(proteinTop[0]))}g, ${proteinTop[0].capacity})입니다. 같은 24g 제품이 더 있어 당류·열량으로 비교해야 합니다.` },
    { question: "고단백 두유는 단백질이 몇 g부터인가요?", answer: `ProteinLab은 1팩 기준 11g 이상을 고단백(기준치 55g의 20%), 8~10g을 단백질 강화로 나눕니다. 11g 이상 등록 제품은 ${protein11.length}종입니다.` },
    { question: "190mL와 240mL 두유는 어떻게 비교하나요?", answer: "팩 크기가 달라 1팩 단백질을 그대로 비교하면 큰 팩이 유리합니다. 100mL당 단백질을 같이 확인하세요." },
  ],
  relatedGuides: related([
    { title: "두유 단백질 밀도 순위", href: "/ranking/soymilk/density/1", description: "100mL당 단백질 기준으로 계산한 순위를 봅니다." },
    { title: "저당 두유 추천", href: `${BASE}/low-sugar-soymilk-guide`, description: "당류 2g 이하 두유를 봅니다." },
  ]),
  purchaseLinks: proteinTop.slice(0, 3).map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};
proteinRankSoymilkConfig.jsonLd = [articleJsonLd(proteinRankSoymilkConfig), faqJsonLd(proteinRankSoymilkConfig)];

// ---------- 6) 두유 브랜드 비교 ----------
const brandNames = ["매일두유", "베지밀", "연세두유", "이롬"];
const brandItems = brandNames.map((brand) => ({ brand, list: soy.filter((p) => p.brand === brand) }));
const range = (list: typeof soy, f: (p: (typeof soy)[number]) => number, unit: string) => {
  const v = list.map(f);
  return Math.min(...v) === Math.max(...v) ? `${fmt(v[0])}${unit}` : `${fmt(Math.min(...v))}~${fmt(Math.max(...v))}${unit}`;
};

export const soymilkBrandCompareConfig: ComparePageConfig = {
  slug: "soymilk-brand-comparison",
  dataSection: [
    { category: "soymilk", brand: "매일두유", limit: 6 },
    { category: "soymilk", brand: "베지밀", limit: 6 },
    { category: "soymilk", brand: "연세두유", limit: 6 },
    { category: "soymilk", brand: "이롬", limit: 6 },
  ],
  title: "두유 브랜드 비교 | 매일두유·베지밀·연세두유·이롬 단백질·당류",
  seoTitle: "두유 브랜드 비교 | 매일두유·베지밀·연세두유·이롬 성분 차이",
  description: "매일두유·베지밀·연세두유·이롬의 등록 두유를 1팩 단백질, 당류, 열량 범위로 비교합니다. 브랜드 안에서도 제품마다 수치가 크게 다르다는 점을 성분표 기준으로 정리했습니다.",
  keywords: ["두유 브랜드 비교", "매일두유 베지밀 연세두유", "이롬 두유 비교", "고단백 두유 브랜드", "두유 브랜드 추천"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: UPDATED,
  methodologyNote: "ProteinLab 등록 두유 중 4개 브랜드 성분표 기준(브랜드별 등록 제품 수는 표 참조)",
  intro: "고단백 두유를 고를 때 브랜드부터 정하는 경우가 많지만, 같은 브랜드 안에서도 단백질은 6~24g, 당류는 0.8~10g처럼 크게 갈립니다. 4개 브랜드의 등록 제품 수치 범위를 나란히 놓고, 브랜드보다 제품 라인을 봐야 하는 이유를 정리했습니다.",
  summary: [
    "브랜드별 수치 범위가 넓어서, 브랜드명보다 제품 라인(고단백·저당·고칼슘)을 먼저 봐야 합니다.",
    `1팩 단백질 최고는 ${label([...soy].filter((p) => brandNames.includes(p.brand)).sort((a, b) => proteinOf(b) - proteinOf(a))[0])}입니다.`,
    "단백질 24g 제품은 연세두유와 이롬에 있고, 190mL 12g 제품은 네 브랜드 모두 있습니다.",
  ],
  comparisonTitle: "브랜드별 등록 두유 수치 범위",
  comparisonColumns: brandNames,
  comparisonRows: [
    { label: "등록 제품 수", values: brandItems.map((b) => `${b.list.length}종`) },
    { label: "1팩 단백질", values: brandItems.map((b) => range(b.list, proteinOf, "g")) },
    { label: "당류", values: brandItems.map((b) => range(b.list, sugarOf, "g")) },
    { label: "열량", values: brandItems.map((b) => range(b.list, (p) => p.calories ?? 0, "kcal")) },
  ],
  sections: [
    {
      title: "브랜드보다 라인을 먼저 보는 이유",
      items: [
        { title: "고단백 라인", body: "단백질 12g(190mL)부터 24g(240mL)까지가 한 브랜드 안에 함께 있습니다. 이름에 '고단백'이 있어도 g 수가 다릅니다." },
        { title: "저당·무가당 라인", body: "같은 브랜드의 플레인이라도 당류가 1g대인 제품과 4g 안팎인 제품이 있습니다." },
        { title: "고칼슘 라인", body: "고칼슘 표기 제품은 단백질이 낮고 당류가 높은 경우가 있습니다. 성분표의 당류 줄을 먼저 확인하세요." },
      ],
    },
    {
      title: "브랜드별 허브",
      items: brandItems.map((b) => ({ title: `${b.brand} ${b.list.length}종`, body: `단백질 ${range(b.list, proteinOf, "g")}, 당류 ${range(b.list, sugarOf, "g")}. 브랜드 허브에서 전체 제품을 표로 볼 수 있습니다.` })),
    },
  ],
  faq: [
    { question: "두유는 어느 브랜드가 단백질이 가장 높은가요?", answer: "브랜드가 아니라 제품 라인에 따라 다릅니다. 등록 기준 단백질 24g 제품은 연세두유와 이롬에 있고, 190mL 12g 제품은 매일두유·베지밀·연세두유·이롬 모두 있습니다." },
    { question: "브랜드마다 당류 차이가 큰가요?", answer: "브랜드 안에서도 제품별 편차가 큽니다. 같은 브랜드의 플레인과 검은콩, 고칼슘 라인의 당류가 크게 다를 수 있어 제품별 성분표를 확인해야 합니다." },
    { question: "브랜드 비교는 어디서 더 자세히 볼 수 있나요?", answer: "매일두유 vs 베지밀 고단백 플레인은 별도 비교 페이지가 있고, 각 브랜드 허브에서 등록 제품 전체를 표로 볼 수 있습니다." },
  ],
  relatedGuides: related([
    { title: "매일두유 vs 베지밀", href: "/compare/maeil-vs-vegemil-soymilk", description: "고단백 플레인 두 제품을 직접 비교합니다." },
    { title: "매일두유 브랜드 허브", href: "/brands/maeil-soymilk", description: "매일두유 등록 제품을 한 표로 봅니다." },
    { title: "베지밀 브랜드 허브", href: "/brands/vegemil", description: "베지밀 등록 제품을 한 표로 봅니다." },
  ]),
  purchaseLinks: brandItems.map((b) => [...b.list].sort((x, y) => proteinOf(y) - proteinOf(x))[0]).filter(Boolean).slice(0, 3).map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};
soymilkBrandCompareConfig.jsonLd = [articleJsonLd(soymilkBrandCompareConfig), faqJsonLd(soymilkBrandCompareConfig)];

// ---------- 7) 아침 두유 ----------
const morningSoymilkCandidates = [...lowSugar]
  .sort((a, b) => proteinOf(b) - proteinOf(a) || (a.calories ?? 0) - (b.calories ?? 0))
  .slice(0, 3);

export const morningSoymilkConfig: ComparePageConfig = {
  slug: "morning-soymilk-guide",
  dataSection: { category: "soymilk", mode: "protein", limit: 12 },
  title: "아침 두유 추천 | 단백질·당류 비교",
  seoTitle: "아침 두유 추천 | 한 팩 단백질·당류·열량 비교",
  description: `아침 두유 추천을 찾을 때 한 팩 단백질, 당류, 열량, 보관 방식을 확인하는 순서를 정리했습니다. 등록 두유 ${soy.length}종의 성분표를 기준으로 비교합니다.`,
  keywords: ["아침 두유 추천", "아침 두유", "아침 고단백 두유", "아침 무가당 두유", "두유 성분 비교"],
  badge: "아침 두유",
  readingTime: "4분 읽기",
  updatedAt: KEYWORD_UPDATED,
  methodologyNote: `ProteinLab 등록 두유 ${soy.length}종 성분표 기준 · 당류 2g 이하 후보 중 단백질 순 비교`,
  intro: `아침에 마실 두유는 제품명보다 한 팩의 단백질·당류·열량을 먼저 비교해야 합니다. 등록 두유 ${soy.length}종 가운데 ProteinLab의 저당 비교 기준에 맞는 ${lowSugar.length}종을 추린 뒤 단백질과 용량을 함께 확인했습니다.`,
  summary: [
    `당류 2g 이하 후보는 등록 두유 ${soy.length}종 중 ${lowSugar.length}종입니다.`,
    "같은 단백질 수치라도 팩 용량과 열량이 다를 수 있어 한 팩 기준과 용량당 수치를 함께 봐야 합니다.",
    "두유만으로 식사를 대신할지는 개인의 식사 구성에 따라 달라지므로 이 페이지는 제품 성분 비교만 제공합니다.",
  ],
  comparisonTitle: "아침용 성분 비교 후보",
  comparisonColumns: morningSoymilkCandidates.map(label),
  comparisonRows: [
    { label: "한 팩 단백질", values: morningSoymilkCandidates.map((p) => `${fmt(proteinOf(p))}g`) },
    { label: "당류", values: morningSoymilkCandidates.map((p) => `${fmt(sugarOf(p))}g`) },
    { label: "열량", values: morningSoymilkCandidates.map((p) => `${p.calories}kcal`) },
    { label: "용량", values: morningSoymilkCandidates.map((p) => p.capacity ?? "-") },
  ],
  sections: [
    {
      title: "아침 두유를 비교하는 순서",
      items: [
        { title: "한 팩 영양정보 확인", body: "단백질, 당류, 열량은 한 팩 기준으로 나란히 보고 팩 크기가 다르면 용량당 수치도 확인하세요." },
        { title: "제품 유형 확인", body: "플레인·검은콩·초코처럼 맛 유형이 달라지면 같은 브랜드 안에서도 당류와 열량이 달라질 수 있습니다." },
        { title: "식사 전체와 구분", body: "두유 한 팩의 영양정보와 아침 식사 전체의 구성은 같은 개념이 아닙니다. 이 표는 두유 제품끼리의 성분 차이만 비교합니다." },
      ],
    },
  ],
  faq: [
    { question: "아침 두유는 단백질이 높은 제품만 고르면 되나요?", answer: "단백질만으로 고르기보다 당류, 열량, 팩 용량을 함께 비교하세요. 같은 단백질이라도 맛과 제품 라인에 따라 다른 항목이 달라질 수 있습니다." },
    { question: "아침에는 무가당 두유가 더 낫나요?", answer: "개인에게 더 낫다고 단정할 수는 없습니다. 무가당 표기만 보지 말고 실제 당류 수치와 원재료명, 식사 전체 구성을 함께 확인하세요." },
    { question: "두유 한 팩으로 아침 식사를 대신할 수 있나요?", answer: "이 페이지는 두유의 영양성분 비교만 제공합니다. 식사 대체 여부는 개인의 식사 구성과 건강 상태에 따라 달라질 수 있습니다." },
  ],
  relatedGuides: related([
    { title: "무가당 두유 추천", href: `${BASE}/low-sugar-soymilk-guide`, description: "무가당 표시와 실제 당류 수치를 구분해 봅니다." },
    { title: "임산부 두유 성분 비교", href: `${BASE}/pregnancy-soymilk-guide`, description: "임신 중 두유를 찾을 때 확인할 원재료와 영양정보를 정리합니다." },
  ]),
  purchaseLinks: morningSoymilkCandidates.map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};
morningSoymilkConfig.jsonLd = [articleJsonLd(morningSoymilkConfig), faqJsonLd(morningSoymilkConfig)];

// ---------- 8) 임산부 두유 검색 가이드 ----------
const pregnancySoymilkExamples = [...soy]
  .filter((p) => p.flavor === "플레인")
  .sort((a, b) => sugarOf(a) - sugarOf(b) || proteinOf(b) - proteinOf(a))
  .slice(0, 3);

export const pregnancySoymilkConfig: ComparePageConfig = {
  slug: "pregnancy-soymilk-guide",
  dataSection: { category: "soymilk", mode: "lowSugar", limit: 12 },
  title: "임산부 두유 추천 검색 가이드 | 원재료·당류 비교",
  seoTitle: "임산부 두유 추천 | 원재료·단백질·당류 비교",
  description: `임산부 두유 추천을 검색할 때 제품명보다 원재료, 알레르기 표시, 한 팩 단백질·당류·열량을 확인하는 방법을 정리했습니다. 등록 두유 ${soy.length}종의 성분표 비교 정보이며 개인별 섭취 권고는 제공하지 않습니다.`,
  keywords: ["임산부 두유 추천", "임신 중 두유", "임산부 두유 성분", "무가당 두유", "두유 원재료"],
  badge: "성분표 확인",
  readingTime: "4분 읽기",
  updatedAt: KEYWORD_UPDATED,
  methodologyNote: `ProteinLab 등록 두유 ${soy.length}종 중 플레인 제품 성분표 비교 · 개인별 섭취 권고 아님`,
  intro: "임신 중 식품 선택은 개인의 알레르기, 식사 구성, 진료 내용에 따라 달라질 수 있습니다. 이 페이지는 의학적 판단이나 특정 제품의 섭취 권고를 제공하지 않고, 두유 라벨에서 원재료와 영양정보를 비교하는 방법만 정리합니다.",
  summary: [
    "대두 알레르기 표시와 원재료명을 먼저 확인합니다.",
    "무가당·플레인 같은 제품명과 실제 당류 수치는 별개이므로 영양정보를 직접 봅니다.",
    "개인별 섭취 가능 여부나 양은 제품 비교표로 판단하지 말고 담당 의료진의 안내를 따릅니다.",
  ],
  comparisonTitle: "플레인 두유 성분표 확인 예시",
  comparisonColumns: pregnancySoymilkExamples.map(label),
  comparisonRows: [
    { label: "단백질 원료", values: pregnancySoymilkExamples.map((p) => p.proteinSource ?? "대두") },
    { label: "한 팩 단백질", values: pregnancySoymilkExamples.map((p) => `${fmt(proteinOf(p))}g`) },
    { label: "당류", values: pregnancySoymilkExamples.map((p) => `${fmt(sugarOf(p))}g`) },
    { label: "열량", values: pregnancySoymilkExamples.map((p) => `${p.calories}kcal`) },
    { label: "용량", values: pregnancySoymilkExamples.map((p) => p.capacity ?? "-") },
  ],
  sections: [
    {
      title: "임신 중 두유 라벨에서 확인할 항목",
      items: [
        { title: "원재료와 알레르기 표시", body: "두유는 대두 기반 식품이므로 원재료명과 알레르기 표시를 먼저 확인합니다. 다른 원료가 함께 들어간 제품도 제품별 라벨로 구분하세요." },
        { title: "당류와 열량", body: "무가당이나 플레인이라는 이름만으로 영양성분을 판단하지 말고 한 팩 당류와 열량을 직접 비교합니다." },
        { title: "개인별 안내 우선", body: "알레르기, 질환, 복용 중인 약, 의료진이 안내한 식사 기준이 있다면 일반 제품 비교보다 그 안내를 우선해야 합니다." },
      ],
    },
  ],
  faq: [
    { question: "임산부에게 특정 두유를 추천하나요?", answer: "아니요. 이 페이지는 특정 제품의 섭취를 권하지 않고 등록 제품의 원재료와 영양성분을 비교하는 일반 정보만 제공합니다." },
    { question: "임신 중에는 무가당 두유만 골라야 하나요?", answer: "무가당 여부만으로 개인에게 맞는 제품을 정할 수 없습니다. 실제 당류, 원재료, 알레르기 표시와 개인별 식사 안내를 함께 확인하세요." },
    { question: "대두 알레르기가 있으면 어떻게 확인하나요?", answer: "제품의 원재료명과 알레르기 표시를 확인하고, 섭취 가능 여부는 담당 의료진과 상의하세요." },
  ],
  relatedGuides: related([
    { title: "무가당 두유 추천", href: `${BASE}/low-sugar-soymilk-guide`, description: "무가당 표시와 실제 당류 수치를 구분해 비교합니다." },
    { title: "아침 두유 추천", href: `${BASE}/morning-soymilk-guide`, description: "아침에 마실 두유를 단백질·당류·열량 기준으로 비교합니다." },
  ]),
  purchaseLinks: [],
};
pregnancySoymilkConfig.jsonLd = [articleJsonLd(pregnancySoymilkConfig), faqJsonLd(pregnancySoymilkConfig)];

export const soymilkGuideConfigs: ComparePageConfig[] = [
  lowSugarSoymilkConfig,
  blackbeanSoymilkConfig,
  soymilkVsProteinDrinkConfig,
  dietSoymilkConfig,
  proteinRankSoymilkConfig,
  soymilkBrandCompareConfig,
  morningSoymilkConfig,
  pregnancySoymilkConfig,
];
