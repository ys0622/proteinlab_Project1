import type { ComparePageConfig, RelatedGuideLink } from "./productCompareShared";
import type { GuideProductCardItem } from "@/app/components/GuideProductPhotoCards";
import { formatProductLabel } from "../../lib/productLabel";
import { powderProducts, type ProductDetailProps } from "@/app/data/products";
import { getPowderProteinPercentage, POWDER_TYPE_LABELS } from "@/app/lib/productFilters";

// 단백질 파우더 가이드 3편(2026-11-03). 수치는 전부 powderProductsData.json(성분표 대조값)에서 계산한다.
// 가격·판매량·외부 순위·효능 표현은 쓰지 않는다. 당류가 표에 없는 제품(null)은 0g으로 보지 않는다.
const UPDATED = "2026-11-03";
const BASE = "/guides/product-selection-comparison";

type PowderType = NonNullable<ProductDetailProps["powderType"]>;

const powder = powderProducts;
const fmt = (n: number) => (Math.round(n * 10) / 10).toString();
const label = (p: ProductDetailProps) => formatProductLabel(p.brand, p.name);
const pct = (p: ProductDetailProps) => getPowderProteinPercentage(p);
const pctText = (p: ProductDetailProps) => `${fmt(pct(p))}%`;
const hasSugar = (p: ProductDetailProps) => typeof p.sugar === "number";
const sugarText = (p: ProductDetailProps) => (hasSugar(p) ? `${fmt(p.sugar as number)}g` : "표에 없음");
const kcal = (p: ProductDetailProps) => p.calories ?? 0;
const kcalText = (p: ProductDetailProps) => `${fmt(kcal(p))}kcal`;
const serving = (p: ProductDetailProps) => p.servingSizeG ?? 0;
const carbsOf = (p: ProductDetailProps) => p.nutritionPerBottle?.carbsG;
const carbsMean = (list: ProductDetailProps[]) => {
  const known = list.map(carbsOf).filter((v): v is number => typeof v === "number");
  return known.length ? `${fmt(mean(known))}g` : "-";
};
const typeLabel = (p: ProductDetailProps) => (p.powderType ? POWDER_TYPE_LABELS[p.powderType] : "-");
const ofType = (...types: PowderType[]) => powder.filter((p) => p.powderType != null && types.includes(p.powderType));
const mean = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0);
const range = (values: number[], unit: string) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${fmt(min)}${unit}` : `${fmt(min)}~${fmt(max)}${unit}`;
};
const sugarMean = (list: ProductDetailProps[]) => {
  const known = list.filter(hasSugar);
  return known.length ? `${fmt(mean(known.map((p) => p.sugar as number)))}g (${known.length}종)` : "표시 제품 없음";
};
const originBadges = (p: ProductDetailProps) => (p.origin === "overseas" ? ["해외 직구"] : []);
const byPctThenSugar = (a: ProductDetailProps, b: ProductDetailProps) =>
  pct(b) - pct(a) || (a.sugar ?? 999) - (b.sugar ?? 999) || kcal(a) - kcal(b);

const powderListLink: RelatedGuideLink = {
  title: "단백질 파우더 전체 비교",
  href: "/powder",
  description: `등록된 파우더 ${powder.length}종을 유형·국내/해외 직구로 나눠 단백질 함량 순으로 봅니다.`,
};
const top10Link: RelatedGuideLink = {
  title: "단백질 파우더 추천 TOP 10",
  href: `${BASE}/protein-powder-top10`,
  description: "단백질 함량(%)이 높고 당류가 낮은 순으로 고른 10종입니다.",
};
const sourceLink: RelatedGuideLink = {
  title: "WPI·WPC·분리대두 파우더 차이",
  href: `${BASE}/wpi-wpc-isp-powder-guide`,
  description: "원료 유형별 평균 단백질 함량과 당류를 데이터로 비교합니다.",
};
const purposeLink: RelatedGuideLink = {
  title: "목적별 단백질 파우더",
  href: `${BASE}/protein-powder-by-purpose`,
  description: "시니어·식사대용·게이너·운동용 파우더의 1회 제공량과 열량을 비교합니다.",
};
const sourceTypesLink: RelatedGuideLink = {
  title: "단백질 원료 종류 정리",
  href: "/guides/basics/protein-source-types",
  description: "WPC·WPI·MPI·분리대두 등 원료 이름이 뜻하는 것을 정리한 기초 가이드입니다.",
};

const fullCardMetrics = (p: ProductDetailProps) => [
  { label: "1회 단백질", value: `${fmt(p.proteinPerServing)}g` },
  { label: "단백질 함량", value: pctText(p) },
  { label: "당류", value: sugarText(p) },
  { label: "열량", value: kcalText(p) },
  { label: "1회 제공량", value: `${fmt(serving(p))}g` },
];
const card = (p: ProductDetailProps, rank?: number, extraBadges: string[] = []): GuideProductCardItem => ({
  slug: p.slug,
  rank,
  badges: [...extraBadges, ...originBadges(p)],
  metrics: fullCardMetrics(p),
});

// ---------- 1) 단백질 파우더 추천 TOP 10 ----------
const generalTypes: PowderType[] = ["whey", "isolate", "plant", "blend", "senior"];
const generalPool = ofType(...generalTypes);
const top10Eligible = generalPool.filter(hasSugar).sort(byPctThenSugar);
const top10 = top10Eligible.slice(0, 10);
const noSugarGeneral = generalPool.filter((p) => !hasSugar(p)).sort(byPctThenSugar);
const top10OverseasCount = top10.filter((p) => p.origin === "overseas").length;
const top10ZeroSugar = top10.filter((p) => p.sugar === 0).length;
const excludedGainerMeal = ofType("gainer", "meal");

export const proteinPowderTop10Config: ComparePageConfig = {
  slug: "protein-powder-top10",
  title: "단백질 파우더 추천 TOP 10 | 함량·당류 비교",
  seoTitle: "단백질 파우더 추천 TOP 10 (2026) | 단백질 함량·당류로 고른 보충제",
  description: `ProteinLab 등록 단백질 파우더 ${powder.length}종 중 게이너·식사대용을 뺀 제품을 단백질 함량(1회 제공량 대비 단백질 %)이 높고 당류가 낮은 순으로 10종 골랐습니다. 1회 단백질·함량·당류·열량·원료를 성분표 수치로 비교합니다.`,
  keywords: ["단백질 파우더 추천", "단백질 보충제 추천", "프로틴 파우더 추천", "단백질 함량 높은 보충제", "저당 단백질 파우더", "WPI 보충제 추천"],
  badge: "파우더 TOP 10",
  readingTime: "5분 읽기",
  updatedAt: UPDATED,
  methodologyNote: `ProteinLab 파우더 ${powder.length}종 성분표 기준 · 게이너·식사대용 제외 · 당류 표시 제품만 순위`,
  intro: `단백질 파우더는 1회 제공량이 ${range(powder.map(serving), "g")}로 제품마다 달라서 1회 단백질 g만 보면 비교가 어렵습니다. 그래서 이 순위는 1회 제공량 중 단백질이 차지하는 비율(단백질 함량 %)을 먼저 보고, 같으면 당류가 낮은 순으로 정했습니다. 게이너·식사대용 ${excludedGainerMeal.length}종은 목적이 달라 따로 다룹니다.`,
  summary: [
    `1위는 ${label(top10[0])}(단백질 함량 ${pctText(top10[0])}, 1회 ${fmt(top10[0].proteinPerServing)}g, 당류 ${sugarText(top10[0])})입니다.`,
    `TOP 10의 단백질 함량은 ${range(top10.map(pct), "%")}이고, 10종 중 ${top10ZeroSugar}종은 당류 0g입니다. 해외 직구 제품은 ${top10OverseasCount}종입니다.`,
    `당류가 성분표에 없는 제품 ${noSugarGeneral.length}종은 순위에서 빼고 아래에 따로 적었습니다(당류를 0g으로 보지 않음).`,
  ],
  comparisonTitle: "단백질 파우더 TOP 10 (함량 높은 순 · 같으면 당류 낮은 순)",
  comparisonColumns: ["1회 단백질", "단백질 함량", "당류", "열량", "원료"],
  comparisonRows: top10.map((p, i) => ({
    label: `${i + 1}. ${label(p)}${p.origin === "overseas" ? " (해외 직구)" : ""}`,
    values: [`${fmt(p.proteinPerServing)}g / ${fmt(serving(p))}g`, pctText(p), sugarText(p), kcalText(p), p.proteinSource ?? "-"],
  })),
  productCards: [
    {
      title: "TOP 10 사진으로 보기",
      caption: "사진·이름을 누르면 성분표가 있는 상세 페이지로, 버튼을 누르면 쿠팡으로 갑니다. 사진은 준비 중인 제품이 있습니다.",
      items: top10.map((p, i) => card(p, i + 1, [typeLabel(p)])),
      moreLink: { href: "/powder", label: `파우더 ${powder.length}종 전체 비교 보기 →` },
    },
  ],
  sections: [
    {
      title: "순위를 정한 기준",
      items: [
        { title: "1. 단백질 함량(%)", body: `1회 단백질 ÷ 1회 제공량 × 100으로 계산합니다. 1회 제공량이 ${fmt(Math.min(...top10.map(serving)))}g인 제품과 ${fmt(Math.max(...top10.map(serving)))}g인 제품을 같은 기준으로 놓기 위해서입니다.` },
        { title: "2. 같으면 당류, 그다음 열량", body: `함량이 같은 제품은 당류가 낮은 쪽, 그래도 같으면 1회 열량이 낮은 쪽을 앞에 두었습니다. 10위 경계에서도 이 순서로 갈랐습니다.` },
        { title: "3. 제외한 제품", body: `게이너 ${ofType("gainer").length}종(1회 탄수화물 평균 ${carbsMean(ofType("gainer"))})과 식사대용 ${ofType("meal").length}종(평균 ${carbsMean(ofType("meal"))})은 단백질 외 성분 비중이 큰 제품이라 이 순위에서 뺐습니다. 목적별 가이드에서 따로 비교합니다.` },
      ],
    },
    {
      title: "당류가 성분표에 없는 제품",
      items: noSugarGeneral.map((p) => ({
        title: `${label(p)} (${typeLabel(p)})`,
        body: `단백질 함량 ${pctText(p)}, 1회 단백질 ${fmt(p.proteinPerServing)}g, 열량 ${kcalText(p)}. 표에 당류 줄이 없어 순위에서 뺐습니다. 당류는 제품 표시를 직접 확인하세요.`,
      })),
    },
    {
      title: "TOP 10을 읽을 때 주의할 점",
      items: [
        { title: "1회 제공량이 다릅니다", body: "함량 %가 같아도 1회 제공량이 크면 1회 단백질 g과 열량이 함께 커집니다. 표의 '1회 단백질 / 1회 제공량'을 같이 보세요." },
        { title: "원료 표기는 제품마다", body: "같은 '아이솔레이트'라도 분리유청단백(WPI)만 쓴 제품과 다른 원료를 섞은 제품이 있습니다. 원료 차이는 원료별 가이드에서 정리했습니다." },
        { title: "해외 직구 제품", body: `TOP 10 중 ${top10OverseasCount}종은 해외 직구 제품입니다. 배송·표시 사항이 국내 유통 제품과 다를 수 있으니 상세 페이지의 성분표를 확인하세요.` },
      ],
    },
  ],
  faq: [
    { question: "단백질 함량이 가장 높은 파우더는 무엇인가요?", answer: `당류가 표시된 제품 중에서는 ${label(top10[0])}(${pctText(top10[0])})입니다. 당류 표시가 없는 제품까지 포함하면 ${label(noSugarGeneral[0])}도 ${pctText(noSugarGeneral[0])}입니다.` },
    { question: "단백질 함량(%)은 어떻게 계산했나요?", answer: "성분표의 1회 제공량(g)에 들어 있는 단백질(g)을 1회 제공량으로 나누고 100을 곱했습니다. 예를 들어 30g 중 27g이 단백질이면 90%입니다." },
    { question: "게이너와 식사대용 파우더는 왜 빠졌나요?", answer: `1회 제공량이 크고 탄수화물·열량 비중이 큰 제품이라 단백질 함량으로 줄을 세우면 목적과 맞지 않습니다. 게이너 ${ofType("gainer").length}종·식사대용 ${ofType("meal").length}종은 목적별 가이드에서 비교합니다.` },
    { question: "당류 0g인 단백질 파우더는 몇 종인가요?", answer: `등록 ${powder.length}종 중 성분표 당류가 0g인 제품은 ${powder.filter((p) => p.sugar === 0).length}종입니다. 당류 줄이 아예 없는 제품 ${powder.filter((p) => !hasSugar(p)).length}종은 0g으로 세지 않았습니다.` },
    { question: "해외 직구 제품도 순위에 들어가나요?", answer: `네. 국내 유통 제품과 같은 기준으로 계산했고, TOP 10 중 ${top10OverseasCount}종이 해외 직구 제품입니다. 표와 카드에 '해외 직구'로 표시했습니다.` },
  ],
  relatedGuides: [powderListLink, sourceLink, purposeLink, sourceTypesLink],
  purchaseLinks: top10.slice(0, 3).map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};

// ---------- 2) WPI·WPC·분리대두 원료별 ----------
type SourceGroup = { key: PowderType; name: string; list: ProductDetailProps[] };
const sourceGroups: SourceGroup[] = [
  { key: "isolate", name: "아이솔레이트(WPI)", list: ofType("isolate") },
  { key: "whey", name: "웨이(WPC 포함)", list: ofType("whey") },
  { key: "plant", name: "식물성", list: ofType("plant") },
  { key: "blend", name: "혼합(유청+대두)", list: ofType("blend") },
];
const sourceMatch = (re: RegExp) => powder.filter((p) => re.test(p.proteinSource ?? ""));
const withWpi = sourceMatch(/WPI|분리유청/);
const withWpc = sourceMatch(/WPC|농축유청/);
const withIsp = sourceMatch(/ISP|분리대두/);
const isoGroup = sourceGroups[0];
const blendGroup = sourceGroups[3];
const isoMeanPct = mean(isoGroup.list.map(pct));
const blendMeanPct = mean(blendGroup.list.map(pct));
const isoLowest = [...isoGroup.list].sort((a, b) => pct(a) - pct(b))[0];
const sourceCardsPerGroup = (g: SourceGroup) => [...g.list].sort(byPctThenSugar).slice(0, 4);

export const wpiWpcIspPowderConfig: ComparePageConfig = {
  slug: "wpi-wpc-isp-powder-guide",
  title: "WPI·WPC·분리대두 파우더 차이 | 원료별 함량·당류",
  seoTitle: "WPI·WPC·분리대두 단백질 파우더 차이 — 원료별 함량·당류 비교",
  description: `ProteinLab 등록 단백질 파우더를 아이솔레이트(WPI)·웨이(WPC)·식물성·혼합으로 나눠 평균 단백질 함량(%)과 당류를 성분표 수치로 계산했습니다. 원료 이름 읽는 법과 유형별 대표 제품을 함께 봅니다.`,
  keywords: ["WPI WPC 차이", "분리유청단백 농축유청단백 차이", "분리대두단백 파우더", "아이솔레이트 단백질 파우더", "WPI 단백질 함량", "식물성 단백질 파우더"],
  badge: "원료별 비교",
  readingTime: "5분 읽기",
  updatedAt: UPDATED,
  methodologyNote: `ProteinLab 파우더 ${powder.length}종 중 4개 유형 ${sourceGroups.reduce((n, g) => n + g.list.length, 0)}종 · 평균은 산술평균 · 당류는 표시 제품만`,
  intro: `단백질 파우더 이름에 붙는 WPI·WPC·ISP는 단백질 원료 이름입니다. 등록 제품을 원료 유형으로 묶어 보면 아이솔레이트 ${isoGroup.list.length}종의 평균 단백질 함량은 ${fmt(isoMeanPct)}%, 혼합 ${blendGroup.list.length}종은 ${fmt(blendMeanPct)}%입니다. 다만 같은 유형 안에서도 제품별 차이가 있어 개별 성분표를 함께 봐야 합니다.`,
  summary: [
    `평균 단백질 함량은 ${sourceGroups.map((g) => `${g.name} ${fmt(mean(g.list.map(pct)))}%`).join(", ")}입니다.`,
    `평균 당류(표시 제품만)는 ${sourceGroups.map((g) => `${g.name} ${sugarMean(g.list)}`).join(", ")}입니다.`,
    `원료 표기로 세면 등록 ${powder.length}종 중 분리유청(WPI) 포함 ${withWpi.length}종, 농축유청(WPC) 포함 ${withWpc.length}종, 분리대두(ISP) 포함 ${withIsp.length}종입니다(여러 원료를 섞은 제품은 중복).`,
  ],
  comparisonTitle: "원료 유형별 평균 (성분표 1회 제공량 기준)",
  comparisonColumns: sourceGroups.map((g) => g.name),
  comparisonRows: [
    { label: "등록 제품 수", values: sourceGroups.map((g) => `${g.list.length}종`) },
    { label: "평균 단백질 함량", values: sourceGroups.map((g) => `${fmt(mean(g.list.map(pct)))}%`) },
    { label: "함량 범위", values: sourceGroups.map((g) => range(g.list.map(pct), "%")) },
    { label: "평균 1회 단백질", values: sourceGroups.map((g) => `${fmt(mean(g.list.map((p) => p.proteinPerServing)))}g`) },
    { label: "평균 당류", values: sourceGroups.map((g) => sugarMean(g.list)) },
    { label: "평균 열량", values: sourceGroups.map((g) => `${fmt(mean(g.list.map(kcal)))}kcal`) },
    { label: "해외 직구", values: sourceGroups.map((g) => `${g.list.filter((p) => p.origin === "overseas").length}종`) },
  ],
  productCards: sourceGroups.map((g) => ({
    title: `${g.name} · 함량 높은 순`,
    caption: `${g.name} ${g.list.length}종 중 단백질 함량 상위 ${Math.min(4, g.list.length)}종입니다. 원료: ${[...new Set(sourceCardsPerGroup(g).map((p) => p.proteinSource))].slice(0, 2).join(" / ")}${sourceCardsPerGroup(g).length > 2 ? " 등" : ""}`,
    items: sourceCardsPerGroup(g).map((p) => card(p)),
  })),
  sections: [
    {
      title: "원료 이름 읽는 법",
      items: [
        { title: "WPC · 농축유청단백", body: "우유에서 치즈를 만들고 남는 유청(whey)의 단백질을 농축한 원료입니다. 성분표 원재료명에 '농축유청단백' 또는 WPC로 적힙니다." },
        { title: "WPI · 분리유청단백", body: "유청에서 지방과 유당을 더 걸러 내 단백질 비율을 높인 원료입니다. '가수분해(H)'가 붙은 HWPI는 단백질을 잘게 분해한 원료입니다." },
        { title: "ISP · 분리대두단백", body: "대두(콩)에서 단백질을 분리한 식물성 원료입니다. 등록 제품에서는 유청과 섞어 쓰는 혼합형·시니어·식사대용 제품에 많이 들어 있습니다." },
      ],
    },
    {
      title: "데이터로 본 원료 유형 차이",
      items: [
        { title: "아이솔레이트가 평균 함량이 높습니다", body: `아이솔레이트 ${isoGroup.list.length}종의 평균 함량은 ${fmt(isoMeanPct)}%입니다. 다만 ${label(isoLowest)}처럼 1회 ${fmt(serving(isoLowest))}g에 단백질 ${fmt(isoLowest.proteinPerServing)}g(${pctText(isoLowest)})인 제품도 있어 이름만으로 판단하지 않는 편이 맞습니다.` },
        { title: "혼합형은 1회 단백질이 큽니다", body: `혼합 ${blendGroup.list.length}종은 평균 함량 ${fmt(blendMeanPct)}%로 낮지만, 1회 제공량이 ${range(blendGroup.list.map(serving), "g")}로 커서 평균 1회 단백질은 ${fmt(mean(blendGroup.list.map((p) => p.proteinPerServing)))}g입니다. 열량도 평균 ${fmt(mean(blendGroup.list.map(kcal)))}kcal로 함께 높습니다.` },
        { title: "당류는 유형보다 제품", body: `당류 0g 제품은 아이솔레이트에 ${isoGroup.list.filter((p) => p.sugar === 0).length}종, 혼합에 ${blendGroup.list.filter((p) => p.sugar === 0).length}종 있습니다. 당류가 표에 없는 제품(${sourceGroups.flatMap((g) => g.list).filter((p) => !hasSugar(p)).map(label).join(", ")})은 평균에서 뺐습니다.` },
      ],
    },
    {
      title: "이 가이드의 한계",
      items: [
        { title: "유형은 ProteinLab 분류", body: "유형은 제품명과 원재료 표기로 ProteinLab이 나눈 것입니다. 아이솔레이트로 분류한 제품 중에도 분리우유단백(MPI)·분리대두단백을 함께 쓴 제품이 있습니다." },
        { title: "제품 수가 적은 유형", body: `웨이 ${sourceGroups[1].list.length}종, 식물성 ${sourceGroups[2].list.length}종은 등록 수가 적어 평균이 제품 한두 개에 크게 흔들립니다.` },
        { title: "효과 비교가 아닙니다", body: "이 페이지는 성분표 수치만 비교합니다. 원료별 흡수나 효과 차이는 다루지 않습니다." },
      ],
    },
  ],
  faq: [
    { question: "WPI와 WPC는 무엇이 다른가요?", answer: "둘 다 유청 단백질 원료입니다. WPI(분리유청단백)는 유청에서 지방·유당을 더 걸러 낸 원료이고, WPC(농축유청단백)는 유청 단백질을 농축한 원료입니다. 원료 설명은 '단백질 원료 종류 정리' 가이드에 더 자세히 있습니다." },
    { question: "아이솔레이트 파우더는 단백질 함량이 얼마나 되나요?", answer: `등록 아이솔레이트 ${isoGroup.list.length}종의 단백질 함량은 ${range(isoGroup.list.map(pct), "%")}, 평균 ${fmt(isoMeanPct)}%입니다.` },
    { question: "분리대두단백(ISP)만 쓴 파우더도 있나요?", answer: `등록 제품 중 분리대두단백이 들어간 제품은 ${withIsp.length}종이지만 대부분 유청과 섞은 혼합형입니다. 식물성 유형은 ${sourceGroups[2].list.length}종(${sourceGroups[2].list.map(label).join(", ")})입니다.` },
    { question: "원료 유형별 당류 차이가 있나요?", answer: `표시 제품 평균은 ${sourceGroups.map((g) => `${g.name} ${sugarMean(g.list)}`).join(", ")}입니다. 유형보다 제품별 차이가 커서 성분표의 당류 줄을 직접 확인하는 편이 정확합니다.` },
  ],
  relatedGuides: [sourceTypesLink, powderListLink, top10Link, purposeLink],
  purchaseLinks: sourceGroups
    .map((g) => [...g.list].sort(byPctThenSugar)[0])
    .filter((p): p is ProductDetailProps => Boolean(p))
    .slice(0, 3)
    .map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};

// ---------- 3) 목적별 ----------
type PurposeGroup = { name: string; list: ProductDetailProps[] };
const workout = ofType("whey", "isolate", "blend", "plant");
const senior = ofType("senior");
const meal = ofType("meal");
const gainer = ofType("gainer");
const purposeGroups: PurposeGroup[] = [
  { name: "운동용(일반 보충제)", list: workout },
  { name: "시니어", list: senior },
  { name: "식사대용", list: meal },
  { name: "게이너", list: gainer },
];
const gainerOver1000 = gainer.filter((p) => kcal(p) >= 1000);
const gainerSorted = [...gainer].sort((a, b) => serving(b) - serving(a));
const seniorNoSugar = senior.filter((p) => !hasSugar(p));
const mealNoSugar = meal.filter((p) => !hasSugar(p));

export const proteinPowderByPurposeConfig: ComparePageConfig = {
  slug: "protein-powder-by-purpose",
  title: "목적별 단백질 파우더 비교 | 시니어·식사대용·게이너·운동용",
  seoTitle: "목적별 단백질 파우더 — 시니어·식사대용·게이너·운동용 비교",
  description: `ProteinLab 등록 단백질 파우더 ${powder.length}종을 운동용·시니어·식사대용·게이너로 나눠 1회 제공량, 1회 열량, 단백질, 당류를 성분표 수치로 비교합니다. 게이너는 1회 ${range(gainer.map(serving), "g")}에 최대 ${fmt(Math.max(...gainer.map(kcal)))}kcal입니다.`,
  keywords: ["목적별 단백질 파우더", "시니어 단백질 분말", "게이너 칼로리", "식사대용 쉐이크 파우더", "운동용 단백질 보충제", "단백질 파우더 종류"],
  badge: "목적별 비교",
  readingTime: "5분 읽기",
  updatedAt: UPDATED,
  methodologyNote: `ProteinLab 파우더 ${powder.length}종 성분표 1회 제공량 기준 · 운동용 = 웨이·아이솔레이트·혼합·식물성`,
  intro: `단백질 파우더는 목적에 따라 1회 제공량부터 다릅니다. 등록 제품 기준 운동용 보충제는 1회 ${range(workout.map(serving), "g")}, 시니어 분말은 ${range(senior.map(serving), "g")}인데 게이너는 ${range(gainer.map(serving), "g")}입니다. 1회 열량도 게이너는 ${range(gainer.map(kcal), "kcal")}로, 같은 '단백질 파우더'라도 같은 기준으로 비교하기 어렵습니다.`,
  summary: [
    `게이너 ${gainer.length}종은 1회 제공량 ${range(gainer.map(serving), "g")}, 1회 열량 ${range(gainer.map(kcal), "kcal")}이고, 1,000kcal를 넘는 제품이 ${gainerOver1000.length}종입니다.`,
    `시니어 분말 ${senior.length}종 중 ${seniorNoSugar.length}종은 건강기능식품 표시 등으로 성분표에 당류 줄이 없습니다. 이 경우 당류를 0g으로 보지 않습니다.`,
    `평균 단백질 함량은 ${purposeGroups.map((g) => `${g.name} ${fmt(mean(g.list.map(pct)))}%`).join(", ")}입니다.`,
  ],
  comparisonTitle: "목적별 파우더 수치 범위 (1회 제공량 기준)",
  comparisonColumns: purposeGroups.map((g) => g.name),
  comparisonRows: [
    { label: "등록 제품 수", values: purposeGroups.map((g) => `${g.list.length}종`) },
    { label: "1회 제공량", values: purposeGroups.map((g) => range(g.list.map(serving), "g")) },
    { label: "1회 열량", values: purposeGroups.map((g) => range(g.list.map(kcal), "kcal")) },
    { label: "평균 1회 단백질", values: purposeGroups.map((g) => `${fmt(mean(g.list.map((p) => p.proteinPerServing)))}g`) },
    { label: "평균 단백질 함량", values: purposeGroups.map((g) => `${fmt(mean(g.list.map(pct)))}%`) },
    { label: "평균 1회 탄수화물", values: purposeGroups.map((g) => carbsMean(g.list)) },
    { label: "당류 표시 제품", values: purposeGroups.map((g) => `${g.list.filter(hasSugar).length}/${g.list.length}종`) },
    { label: "평균 당류", values: purposeGroups.map((g) => sugarMean(g.list)) },
  ],
  productCards: [
    {
      title: "게이너: 1회 제공량·열량부터 다릅니다",
      caption: `게이너 ${gainer.length}종 전부입니다. 1회 제공량이 큰 순으로 놓았습니다.`,
      items: gainerSorted.map((p) => card(p)),
    },
    {
      title: "시니어 단백질 분말",
      caption: `시니어 ${senior.length}종 전부입니다. '표에 없음'은 성분표에 당류 줄이 없다는 뜻이며 0g이 아닙니다.`,
      items: [...senior].sort(byPctThenSugar).map((p) => card(p)),
    },
    {
      title: "식사대용 파우더",
      caption: `식사대용 ${meal.length}종 전부입니다. 단백질 함량 높은 순입니다.`,
      items: [...meal].sort(byPctThenSugar).map((p) => card(p)),
    },
    {
      title: "운동용(일반 보충제) · 함량 상위 4종",
      caption: `운동용 ${workout.length}종 중 단백질 함량 상위 4종입니다. 10종 순위는 TOP 10 가이드에 있습니다.`,
      items: [...workout].sort(byPctThenSugar).slice(0, 4).map((p) => card(p, undefined, [typeLabel(p)])),
      moreLink: { href: "/powder", label: `파우더 ${powder.length}종 전체 비교 보기 →` },
    },
  ],
  sections: [
    {
      title: "게이너를 숫자로 보면",
      items: gainerSorted.map((p) => ({
        title: label(p),
        body: `1회 ${fmt(serving(p))}g · ${kcalText(p)} · 단백질 ${fmt(p.proteinPerServing)}g(${pctText(p)}) · 당류 ${sugarText(p)}. 한 통 ${p.capacity}에 ${p.servingsPerContainer ?? "-"}회 분량입니다.`,
      })),
    },
    {
      title: "목적별로 먼저 볼 수치",
      items: [
        { title: "운동용: 단백질 함량(%)", body: `1회 제공량이 ${range(workout.map(serving), "g")}로 제품마다 달라 1회 단백질 g보다 함량 %로 비교하는 편이 공정합니다. 평균 ${fmt(mean(workout.map(pct)))}%입니다.` },
        { title: "시니어: 1회 단백질과 표시 방식", body: `시니어 분말은 1회 ${range(senior.map((p) => p.proteinPerServing), "g")} 단백질에 열량 ${range(senior.map(kcal), "kcal")}입니다. ${seniorNoSugar.length}종은 당류가 표에 없으니 원재료명과 표시 사항을 직접 확인하세요.` },
        { title: "식사대용·게이너: 열량과 탄수화물", body: `식사대용은 1회 ${range(meal.map(kcal), "kcal")}(평균 탄수화물 ${carbsMean(meal)}), 게이너는 ${range(gainer.map(kcal), "kcal")}(평균 탄수화물 ${carbsMean(gainer)})입니다. 단백질보다 열량·탄수화물이 크게 달라지는 제품군입니다.` },
      ],
    },
  ],
  faq: [
    { question: "게이너는 1회에 몇 kcal인가요?", answer: `등록 게이너 ${gainer.length}종의 1회 열량은 ${range(gainer.map(kcal), "kcal")}입니다. 1,000kcal를 넘는 제품은 ${gainerOver1000.map((p) => `${label(p)}(${kcalText(p)}, 1회 ${fmt(serving(p))}g)`).join(", ")}입니다.` },
    { question: "시니어 단백질 분말은 왜 당류가 안 나와 있나요?", answer: `건강기능식품 등은 영양·기능정보 표에 당류 줄이 없는 경우가 있습니다. 등록 시니어 ${senior.length}종 중 ${seniorNoSugar.length}종이 그렇고, ProteinLab은 이 값을 0g으로 보지 않고 '표에 없음'으로 표시합니다.` },
    { question: "식사대용 파우더와 일반 단백질 보충제는 무엇이 다른가요?", answer: `등록 데이터 기준 식사대용 ${meal.length}종의 평균 단백질 함량은 ${fmt(mean(meal.map(pct)))}%로, 운동용 ${workout.length}종 평균 ${fmt(mean(workout.map(pct)))}%보다 낮습니다. 1회 제공량에서 단백질 외 성분 비중이 크다는 뜻이며, 평균 1회 탄수화물은 식사대용 ${carbsMean(meal)}, 운동용 ${carbsMean(workout)}입니다.${mealNoSugar.length ? ` ${mealNoSugar.map(label).join(", ")}은 당류가 표에 없습니다.` : ""}` },
    { question: "어떤 유형을 골라야 하나요?", answer: "이 페이지는 성분표 수치로 유형별 차이를 보여 줄 뿐 개인에게 맞는 제품을 정해 주지 않습니다. 식단이나 건강 상태에 따라 필요한 열량·단백질이 다르니 필요하면 전문가와 상담하세요." },
  ],
  relatedGuides: [powderListLink, top10Link, sourceLink, sourceTypesLink],
  purchaseLinks: [
    [...workout].sort(byPctThenSugar)[0],
    [...senior].sort(byPctThenSugar)[0],
    [...meal].sort(byPctThenSugar)[0],
  ]
    .filter((p): p is ProductDetailProps => Boolean(p))
    .map((p) => ({ label: `${label(p)} 보기`, slug: p.slug })),
};

export const powderGuideConfigs: ComparePageConfig[] = [proteinPowderTop10Config, wpiWpcIspPowderConfig, proteinPowderByPurposeConfig];
