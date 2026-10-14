import type { ComparePageConfig, RelatedGuideLink } from "./productCompareShared";
import { formatProductLabel } from "../../lib/productLabel";
import { getDrinkProducts } from "@/app/data/drinkProductsData";
import { soymilkProducts } from "@/app/data/products";

// 두유 가이드 3편. 수치는 전부 ProteinLab 두유·음료 데이터에서 계산한다(성분표 기준).
const UPDATED = "2026-10-14";
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
    datePublished: UPDATED,
    dateModified: UPDATED,
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
  title: "저당 두유 추천 | 당류 2g 이하 두유 비교",
  seoTitle: `저당 두유 추천 | 당류 2g 이하 두유 ${lowSugar.length}종 비교`,
  description: `ProteinLab에 등록된 두유 ${soy.length}종 중 당류 2g 이하 ${lowSugar.length}종을 단백질·열량과 함께 비교합니다. 무가당과 저당의 차이, 성분표에서 확인할 것을 정리했습니다.`,
  keywords: ["저당 두유", "무가당 두유", "당류 낮은 두유", "저당 두유 추천", "고단백 저당 두유"],
  badge: "저당 두유",
  readingTime: "4분 읽기",
  updatedAt: UPDATED,
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
  ],
  faq: [
    { question: "저당 두유는 당류가 몇 g 이하인가요?", answer: `법적으로 정해진 단일 기준을 쓰기보다, ProteinLab은 1팩 당류 2g 이하를 저당 두유로 묶어 비교합니다. 이 기준에 맞는 등록 제품은 ${lowSugar.length}종입니다.` },
    { question: "무가당 두유는 당류가 0g인가요?", answer: `아닙니다. 무가당 표기 제품도 콩에서 오는 당류가 성분표에 표시됩니다. 등록된 무가당 계열 제품의 당류는 0.5~1.8g 범위입니다.` },
    { question: "저당이면서 단백질이 높은 두유가 있나요?", answer: `당류 2g 이하이면서 단백질 11g 이상인 제품은 등록 기준 ${lowSugarHighProtein}종입니다. 가장 단백질이 높은 제품은 ${label(lowSugarTop[0])}(${fmt(proteinOf(lowSugarTop[0]))}g, 당류 ${fmt(sugarOf(lowSugarTop[0]))}g)입니다.` },
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

export const soymilkGuideConfigs: ComparePageConfig[] = [
  lowSugarSoymilkConfig,
  blackbeanSoymilkConfig,
  soymilkVsProteinDrinkConfig,
];
