import type { CompareLanding } from "./compareLandings";
import { getAllProducts, type ProductDetailProps } from "./products";
import { brandToSlug } from "../lib/brandHubs";
import { compareLandingHref } from "./compareCanonicalOverrides";
import { withSubject } from "../lib/koreanParticle";

/**
 * 데이터로 만드는 비교 랜딩(2026-10-20, 네이버 신규 유입용).
 * 문장 속 수치는 모두 등록 제품 데이터에서 계산한다. 제품이 빠지면 그 랜딩은 만들지 않는다.
 */

const CATEGORY_PAGE: Record<string, { href: string; title: string }> = {
  drink: { href: "/drinks", title: "단백질 음료 전체 비교" },
  bar: { href: "/bars", title: "단백질 바 전체 비교" },
  shake: { href: "/shake", title: "단백질 쉐이크 전체 비교" },
  yogurt: { href: "/yogurt", title: "단백질 요거트 전체 비교" },
  soymilk: { href: "/soymilk", title: "두유 전체 비교" },
  powder: { href: "/powder", title: "단백질 파우더 전체 비교" },
};

const fmt = (value: number | undefined) => (value == null ? "-" : String(Math.round(value * 10) / 10));

function basis(product: ProductDetailProps) {
  const capacity = product.capacity ?? "";
  switch (product.productType) {
    case "drink":
      return `1병(${capacity})`;
    case "soymilk":
      return `1팩(${capacity})`;
    case "shake":
      return `1회(${capacity})`;
    // 파우더 capacity는 한 통 용량(예: 2kg)이라 1회 제공량(g)을 쓴다.
    case "powder":
      return `1회(${product.servingSizeG ?? "-"}g)`;
    default:
      return `1개(${capacity})`;
  }
}

function label(product: ProductDetailProps) {
  return product.name.startsWith(product.brand) ? product.name : `${product.brand} ${product.name}`;
}

function nutrition(product: ProductDetailProps) {
  return `${label(product)} ${basis(product)}: 단백질 ${fmt(product.proteinPerServing)}g·당류 ${fmt(product.sugar)}g·${fmt(product.calories)}kcal`;
}

function range(products: ProductDetailProps[], pick: (p: ProductDetailProps) => number | undefined) {
  const values = products.map(pick).filter((v): v is number => v != null);
  if (!values.length) return "-";
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? fmt(min) : `${fmt(min)}~${fmt(max)}`;
}

// 파우더 단백질 함량(%) = 1회 단백질 ÷ 1회 제공량 × 100 (productFilters.getPowderProteinPercentage와 같은 정의)
function powderPct(product: ProductDetailProps) {
  return product.servingSizeG ? (product.proteinPerServing / product.servingSizeG) * 100 : undefined;
}

const sugarOrNone = (product: ProductDetailProps) => (product.sugar == null ? "표에 없음" : `${fmt(product.sugar)}g`);

function powderLine(product: ProductDetailProps, name = label(product)) {
  return `${name} ${basis(product)}: 단백질 ${fmt(product.proteinPerServing)}g(함량 ${fmt(powderPct(product))}%)·당류 ${sugarOrNone(product)}·${fmt(product.calories)}kcal`;
}

function powderGuides() {
  return [
    { href: "/guides/product-selection-comparison/protein-powder-scoop-guide", title: "단백질 보충제 1스쿱 단백질 비교", description: "등록 파우더 전체의 1회 제공량·1회 단백질·한 통 회분을 한 표로 봅니다." },
    { href: "/guides/product-selection-comparison/wpi-wpc-isp-powder-guide", title: "WPI·WPC·분리대두 차이", description: "원료 유형별 평균 단백질 함량과 당류를 비교합니다." },
  ];
}

// 파우더 비교 FAQ: 공통 FAQ(compareLandingFaq)는 1회 수치를 비교하므로, 1회 제공량이 다른 파우더는 함량·한 통 회분을 따로 답한다.
function powderFaq(items: ProductDetailProps[], names: Map<string, string>) {
  const name = (p: ProductDetailProps) => names.get(p.slug) ?? label(p);
  const withPct = items.filter((p) => powderPct(p) != null);
  const faq: { question: string; answer: string }[] = [];
  // 1회 제공량이 모두 같으면 1회 수치를 그대로 비교하면 되므로 이 질문은 넣지 않는다.
  if (withPct.length >= 2 && new Set(withPct.map((p) => p.servingSizeG)).size > 1) {
    const top = Math.max(...withPct.map((p) => Math.round((powderPct(p) ?? 0) * 10)));
    const best = withPct.filter((p) => Math.round((powderPct(p) ?? 0) * 10) === top).map(name);
    const lead = best.length === withPct.length ? "함량은 모두 같습니다" : `${withSubject(best.join("·"))} ${withPct.length === 2 ? "더" : "가장"} 높습니다`;
    faq.push({
      question: "1회 제공량이 다른데 어떻게 비교하나요?",
      answer: `1회 제공량은 ${items.map((p) => `${name(p)} ${p.servingSizeG ?? "-"}g`).join(", ")}입니다. 같은 무게 안의 단백질 비율(단백질 함량 %)로 보면 ${items.map((p) => `${name(p)} ${fmt(powderPct(p))}%`).join(", ")}이고, ${lead}.`,
    });
  }
  const servings = items.filter((p) => p.servingsPerContainer);
  if (servings.length >= 2) {
    faq.push({
      question: "한 통은 몇 회분인가요?",
      answer: `제조사 표기 기준 ${servings.map((p) => `${name(p)} ${p.capacity} ${p.servingsPerContainer}회분`).join(", ")}입니다. 가격은 쿠팡에서 직접 확인하세요.`,
    });
  }
  const noSugar = items.filter((p) => p.sugar == null);
  if (noSugar.length) {
    faq.push({
      question: "당류가 '표에 없음'인 제품은 당류 0g인가요?",
      answer: `아닙니다. ${noSugar.map(name).join(", ")} 제품은 성분표에 당류 줄이 없어 ProteinLab은 0g으로 보지 않고 '표에 없음'으로 둡니다. 원재료명과 표시 사항을 직접 확인하세요.`,
    });
  }
  return faq;
}

function brandHub(brand: string) {
  return { href: `/brands/${brandToSlug(brand)}`, title: `${brand} 브랜드 허브`, description: `${brand} 등록 제품의 상세 성분을 확인합니다.` };
}

type PairSpec = { slug: string; a: string; b: string; titleA: string; titleB: string; topic?: string; intro?: string };
// itemWord: 맛이 아니라 크기·라인이 다른 묶음은 "제품"으로 쓴다(기본 "맛").
type LineSpec = { slug: string; title: string; filter: (p: ProductDetailProps) => boolean; lineName: string; itemWord?: string };

const PAIRS: PairSpec[] = [
  { slug: "maeil-vs-yonsei-protein-soymilk", a: "maeil-soymilk-protein-plain-190", b: "yonsei-protein-plain-unsweetened-190", titleA: "매일두유 고단백", titleB: "연세두유 고단백" },
  { slug: "erom-vs-vegemil-protein-soymilk", a: "erom-protein-plain-190", b: "vegemil-protein-plain-190", titleA: "이롬 고단백 두유", titleB: "베지밀 고단백두유" },
  { slug: "gt-vs-maeil-protein-soymilk", a: "nam-gt-protein-190", b: "maeil-soymilk-protein-plain-190", titleA: "맛있는두유 GT 고단백", titleB: "매일두유 고단백" },
  { slug: "doctoru-vs-quest-proteinbar", a: "dryou-proteinbar-pro-choco-classic", b: "quest-nutrition-protein-bar-double-chocolate-chunk-60", titleA: "닥터유 프로 단백질바", titleB: "퀘스트 단백질바" },
  { slug: "post-vs-doctoru-proteinbar", a: "post-proteinbar", b: "dryou-proteinbar-nuts", titleA: "포스트 단백질바", titleB: "닥터유 단백질바" },
  { slug: "ultive-vegan-vs-sellex-dangsolve-drink", a: "ultive-vegan-protein-choco-250", b: "sellex-protein-dangsolve-corn-190", titleA: "얼티브 비건 프로틴", titleB: "셀렉스 당솔브", topic: "식물성 단백질 음료" },
  { slug: "oatmont-vs-sellex-profit-drink", a: "oatmont-protein-savory-250", b: "sellex-profit-milk-vanilla-250", titleA: "오트몬드 프로틴", titleB: "셀렉스 프로핏" },
  { slug: "mymil-vs-hymune-balance-drink", a: "mymil-newprotein-original-190", b: "hymune-protein-balance-190", titleA: "마이밀 뉴프로틴", titleB: "하이뮨 프로틴 밸런스" },
  { slug: "ultive-vs-mymil-furotein-drink", a: "ultive-protein-savory-250", b: "mymil-furotein-gosohan-250", titleA: "얼티브 프로틴", titleB: "마이밀 퓨로틴" },
  // 자동완성 "아이슬란딕 요거트 차이"(2026-10-20). 100g당 단백질은 두 제품 모두 12g으로 같다(데이터 기준).
  { slug: "lookt-icelandic-vs-yozm-greek-yogurt", a: "lookt-icelandic-thick-450", b: "yozm-plain-greek-450", titleA: "룩트 아이슬란딕 요거트", titleB: "요즘 그릭요거트", topic: "성분 차이" },
  { slug: "yozm-vs-greekday-greek-yogurt", a: "yozm-plain-greek-450", b: "greekday-signature-450", titleA: "YOZM 그릭요거트", titleB: "그릭데이 시그니처" },
  // 2026-11-04 단백질 파우더(11/3 카테고리 개설). 실제 등록 제품끼리만 묶는다.
  { slug: "optimum-gold-standard-vs-dymatize-elite-whey", a: "on-goldstandard-whey-doublerich-899", b: "dymatize-elite-whey-richchoco-2300", titleA: "옵티멈 골드스탠다드 웨이", titleB: "다이마타이즈 엘리트 웨이", topic: "단백질 보충제", intro: "ProteinLab 분류로 두 제품 모두 웨이(WPC 포함) 유형의 초콜릿 맛입니다." },
  { slug: "optimum-hydrowhey-vs-dymatize-iso100", a: "on-platinum-hydrowhey-turbochoco-1640", b: "dymatize-iso100-gourmetchoco-2300", titleA: "옵티멈 플래티넘 하이드로웨이", titleB: "다이마타이즈 ISO 100", topic: "단백질 보충제", intro: "ProteinLab 분류로 두 제품 모두 아이솔레이트(WPI) 유형의 초콜릿 맛입니다." },
  { slug: "selex-vs-hymune-protein-powder", a: "selex-protein-savory-304", b: "hymune-protein-balance-savory-304", titleA: "셀렉스 프로틴", titleB: "하이뮨 프로틴 밸런스", topic: "단백질 분말", intro: "두 제품 모두 304g 통의 고소한맛 분말입니다." },
  // 2026-11-05 신규 등록 제품이 비교 페이지에 하나도 안 걸려 있던 것(파스퇴르 단백질+).
  { slug: "pasteur-protein-plus-vs-hymune-balance-blacksesame", a: "pasteur-protein-plus-blackbean-blacksesame-195", b: "hymune-protein-balance-black-sesame-190", titleA: "파스퇴르 단백질+ 검은콩&검은깨", titleB: "하이뮨 프로틴 밸런스 흑임자", intro: "두 제품 모두 190mL 안팎의 검은깨·흑임자 맛 단백질 음료입니다." },
  { slug: "hymune-active-shake-injeolmi-vs-earlgrey", a: "hymune-active-protein-shake-injeolmi-40", b: "hymune-active-protein-shake-earlgrey-milktea-40", titleA: "하이뮨 액티브 쉐이크 인절미", titleB: "하이뮨 액티브 쉐이크 얼그레이밀크티", topic: "맛별 성분", intro: "같은 하이뮨 액티브 프로틴 쉐이크 40g 파우치의 두 가지 맛입니다." },
];

const LINES: LineSpec[] = [
  { slug: "quest-proteinbar-flavor-comparison", title: "퀘스트바 맛별 성분 비교 (퀘스트 프로틴바)", lineName: "퀘스트 프로틴바", filter: (p) => p.productType === "bar" && p.brand === "퀘스트 뉴트리션" },
  { slug: "flymill-shake-flavor-comparison", title: "플라이밀 단백질 쉐이크 맛별 비교", lineName: "플라이밀 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "플라이밀" },
  { slug: "labnosh-slimshake-flavor-comparison", title: "랩노쉬 슬림쉐이크 맛별 비교", lineName: "랩노쉬 슬림쉐이크", filter: (p) => p.productType === "shake" && p.brand === "랩노쉬" },
  { slug: "delight-project-shake-flavor-comparison", title: "딜라이트 프로젝트 단백질 쉐이크 맛별 비교", lineName: "딜라이트 프로젝트 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "딜라이트 프로젝트" },
  { slug: "bazio-shake-flavor-comparison", title: "바지오 단백질 쉐이크얌 맛별 비교", lineName: "바지오 쉐이크얌", filter: (p) => p.productType === "shake" && p.brand === "바지오" },
  { slug: "allthebetter-shake-flavor-comparison", title: "올더배러 단백질 쉐이크 맛별 비교", lineName: "올더배러 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "올더배러" },
  { slug: "danbaekhani-shake-flavor-comparison", title: "단백하니 단백질 쉐이크 맛별 비교", lineName: "단백하니 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "단백하니" },
  { slug: "danbaekhani-bar-flavor-comparison", title: "단백하니 프로틴바 맛별 비교", lineName: "단백하니 프로틴바", filter: (p) => p.productType === "bar" && p.brand === "단백하니" },
  { slug: "labnosh-bar-lineup-comparison", title: "랩노쉬 단백질바 종류별 비교 (푸드바·단백쿠키바)", lineName: "랩노쉬 단백질바", itemWord: "제품", filter: (p) => p.productType === "bar" && p.brand === "랩노쉬" },
  { slug: "hyeindam-shake-flavor-comparison", title: "혜인담 뚝딱쉐이크 맛별 비교", lineName: "혜인담 뚝딱쉐이크", filter: (p) => p.productType === "shake" && p.brand === "혜인담" },
  { slug: "takefit-breadmeal-shake-flavor-comparison", title: "테이크핏 브레드밀 단백질 쉐이크 맛별 비교", lineName: "테이크핏 브레드밀 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "테이크핏" },
  { slug: "lookt-shake-flavor-comparison", title: "룩트 단백질 쉐이크 맛별 비교", lineName: "룩트 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "룩트" },
  { slug: "fromeat-shake-flavor-comparison", title: "프롬잇 단백질 쉐이크 맛별 비교", lineName: "프롬잇 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "프롬잇" },
  { slug: "yonsei-severance-a2-protein-flavor-comparison", title: "연세 세브란스 A2 프로틴 맛별 비교", lineName: "연세 세브란스 A2 프로틴", filter: (p) => p.productType === "drink" && p.brand === "연세유업" },
  { slug: "ottogi-dayprotein-flavor-comparison", title: "오뚜기 데이프로틴 맛별 비교", lineName: "오뚜기 데이프로틴", filter: (p) => p.productType === "drink" && p.brand === "오뚜기" },
  { slug: "doctoru-protein-drink-lineup-comparison", title: "닥터유 프로 단백질 드링크 종류별 비교 (24g·40g·62g)", lineName: "닥터유 프로 단백질 드링크", itemWord: "제품", filter: (p) => p.productType === "drink" && p.brand === "닥터유" },
  { slug: "bsn-protein-crisp-flavor-comparison", title: "BSN 프로틴 크리스프 단백질바 맛별 비교", lineName: "BSN 프로틴 크리스프", filter: (p) => p.productType === "bar" && p.brand === "비에스엔" },
  { slug: "danbaek-bar-lineup-comparison", title: "더단백 단백질바 종류별 비교 (크런치바·마일드바)", lineName: "더단백 단백질바", itemWord: "제품", filter: (p) => p.productType === "bar" && p.brand === "더단백" },
  { slug: "proteone-shake-flavor-comparison", title: "프로티원 쉐이크 맛별 비교", lineName: "프로티원 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "프로티원" },
  { slug: "itthefit-shake-flavor-comparison", title: "잇더핏 단백질 쉐이크 맛별 비교", lineName: "잇더핏 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "잇더핏" },
  { slug: "soyjoy-flavor-comparison", title: "소이조이 맛별 비교", lineName: "소이조이", filter: (p) => p.productType === "bar" && p.brand === "소이조이" },
  { slug: "benof-proteinbar-flavor-comparison", title: "베노프 단백질바 맛별 비교", lineName: "베노프 단백질바", filter: (p) => p.productType === "bar" && p.brand === "베노프" },
  { slug: "ultive-protein-flavor-comparison", title: "얼티브 프로틴 맛별 비교", lineName: "얼티브 프로틴", filter: (p) => p.productType === "drink" && p.brand === "얼티브" },
  { slug: "vegemil-soymilk-flavor-comparison", title: "베지밀 두유 맛별 비교", lineName: "베지밀 두유", filter: (p) => p.productType === "soymilk" && p.brand === "베지밀" },
  // 2026-10-20 네이버 자동완성(닥터유 단백질바 미니·24g·칼로리, 하이뮨 액티브, 더단백 초코·커피·딸기, 마이밀 뉴프로틴·퓨로틴,
  // 오트몬드 초코·쿠키앤크림, 요즘 그릭요거트 블루베리·말차·플레인, 그릭데이 시그니처·라이트·유자, 매일 두유 종류 차이)에 맞춘 묶음.
  { slug: "dryou-proteinbar-lineup-comparison", title: "닥터유 단백질바 종류별 비교 (프로·미니·한입쏙)", lineName: "닥터유 단백질바", itemWord: "제품", filter: (p) => p.productType === "bar" && p.brand === "닥터유" },
  { slug: "hymune-balance-active-flavor-comparison", title: "하이뮨 프로틴 밸런스 액티브 맛별 비교", lineName: "하이뮨 프로틴 밸런스 액티브", filter: (p) => p.productType === "drink" && p.brand === "하이뮨" && p.name.includes("액티브") },
  { slug: "hymune-protein-balance-190-flavor-comparison", title: "하이뮨 프로틴 밸런스 190mL 맛별 비교", lineName: "하이뮨 프로틴 밸런스 190mL", filter: (p) => p.productType === "drink" && p.brand === "하이뮨" && p.name.startsWith("프로틴 밸런스 (") && p.capacity === "190mL" },
  // 2026-11-05 하이뮨 액티브 프로틴바·쉐이크 신규 등록분.
  { slug: "hymune-proteinbar-lineup-comparison", title: "하이뮨 단백질바 종류별 비교 (액티브 프로틴바·액티브바·프로틴밸런스바)", lineName: "하이뮨 단백질바", itemWord: "제품", filter: (p) => p.productType === "bar" && p.brand === "하이뮨" },
  { slug: "danbaek-drink-flavor-comparison", title: "더단백 드링크 맛별 비교", lineName: "더단백 드링크", filter: (p) => p.productType === "drink" && p.brand === "더단백" && p.name.includes("더단백 드링크") },
  { slug: "mymil-protein-lineup-comparison", title: "마이밀 뉴프로틴·퓨로틴 종류별 비교", lineName: "마이밀 프로틴 음료", itemWord: "제품", filter: (p) => p.productType === "drink" && p.brand === "마이밀" },
  { slug: "oatmont-protein-flavor-comparison", title: "오트몬드 프로틴 맛별 비교", lineName: "오트몬드 프로틴", filter: (p) => p.productType === "drink" && p.brand === "오트몬드" },
  { slug: "yozm-greek-yogurt-flavor-comparison", title: "요즘(YOZM) 그릭요거트 맛별 비교", lineName: "요즘(YOZM) 그릭요거트", filter: (p) => p.productType === "yogurt" && p.brand === "YOZM" },
  { slug: "greekday-greek-yogurt-lineup-comparison", title: "그릭데이 그릭요거트 종류별 비교 (시그니처·라이트·유자)", lineName: "그릭데이 그릭요거트", itemWord: "제품", filter: (p) => p.productType === "yogurt" && p.brand === "그릭데이" },
  { slug: "maeil-soymilk-lineup-comparison", title: "매일두유 종류별 비교 (고단백·99.9·렌틸콩)", lineName: "매일두유", itemWord: "제품", filter: (p) => p.productType === "soymilk" && p.brand === "매일두유" },
  // 2026-10-20 2차 자동완성(쉐이크·바·요거트·두유 브랜드 + 맛/성분/종류) 묶음. 랩노쉬 슬림쉐이크는 전용 가이드(labnoshe-slim-shake)가 있어 뺐다.
  // 자동완성 "식물성 단백질 음료 비교"(2026-10-20). 제품명에 식물성·비건이 들어간 음료만 묶는다.
  { slug: "plant-protein-drink-comparison", title: "식물성 단백질 음료 비교 (뉴케어·얼티브·하이뮨)", lineName: "식물성 단백질 음료", itemWord: "제품", filter: (p) => p.productType === "drink" && /식물성|비건/.test(p.name) },
  // 2026-10-21 음료 브랜드 라인별 맛 비교(자동완성: 뉴케어 올프로틴 고소한맛·41g, 테이크핏 맥스·몬스터 맛, 랩노쉬 프로틴 드링크, 셀렉스 당솔브·락토프리).
  { slug: "newcare-allprotein-245-flavor-comparison", title: "뉴케어 올프로틴 245mL 맛별 비교", lineName: "뉴케어 올프로틴 245mL", filter: (p) => p.productType === "drink" && p.brand === "뉴케어" && p.name.startsWith("올프로틴 (") && p.capacity === "245mL" },
  { slug: "newcare-allprotein-41g-flavor-comparison", title: "뉴케어 올프로틴 41g 맛별 비교", lineName: "뉴케어 올프로틴 41g", filter: (p) => p.productType === "drink" && p.brand === "뉴케어" && p.name.startsWith("올프로틴 41g") },
  { slug: "takefit-max-flavor-comparison", title: "테이크핏 맥스 맛별 비교", lineName: "테이크핏 맥스", filter: (p) => p.productType === "drink" && p.brand === "테이크핏" && p.name.startsWith("테이크핏 맥스") },
  { slug: "takefit-monster-flavor-comparison", title: "테이크핏 몬스터 맛별 비교", lineName: "테이크핏 몬스터", filter: (p) => p.productType === "drink" && p.brand === "테이크핏" && p.name.startsWith("테이크핏 몬스터") },
  { slug: "takefit-pro-flavor-comparison", title: "테이크핏 프로 500mL 맛별 비교", lineName: "테이크핏 프로", filter: (p) => p.productType === "drink" && p.brand === "테이크핏" && p.name.startsWith("테이크핏 프로") },
  { slug: "labnosh-protein-drink-flavor-comparison", title: "랩노쉬 프로틴 드링크 맛별 비교 (350mL)", lineName: "랩노쉬 프로틴 드링크", filter: (p) => p.productType === "drink" && p.brand === "랩노쉬" && p.capacity === "350mL" },
  { slug: "sellex-protein-190-lineup-comparison", title: "셀렉스 프로틴 190mL 종류별 비교 (오리지널·로우슈거·락토프리·당솔브)", lineName: "셀렉스 프로틴 190mL", itemWord: "제품", filter: (p) => p.productType === "drink" && p.brand === "셀렉스" && p.capacity === "190mL" },
  { slug: "danbaek-water-protein-flavor-comparison", title: "더단백 워터 프로틴 맛별 비교", lineName: "더단백 워터 프로틴", filter: (p) => p.productType === "drink" && p.brand === "더단백" && p.name.includes("워터 프로틴") },
  { slug: "milit-shake-flavor-comparison", title: "밀잇 쉐이크 맛별 비교", lineName: "밀잇 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "밀잇" },
  { slug: "kkobak-shake-flavor-comparison", title: "꼬박꼬밥 고단저당 쉐이크 맛별 비교", lineName: "꼬박꼬밥 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "꼬박꼬밥" },
  { slug: "shakebaby-flavor-comparison", title: "쉐이크베이비 맛별 비교", lineName: "쉐이크베이비", filter: (p) => p.productType === "shake" && p.brand === "쉐이크베이비" },
  { slug: "hansonhankki-shake-flavor-comparison", title: "한손한끼 쉐이크 맛별 비교", lineName: "한손한끼 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "한손한끼" },
  { slug: "maeilhankki-shake-flavor-comparison", title: "매일한끼 쉐이크 맛별 비교", lineName: "매일한끼 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "매일한끼" },
  { slug: "cruntin-shake-flavor-comparison", title: "크런틴 쉐이크 맛별 비교", lineName: "크런틴 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "크런틴" },
  { slug: "oneuldanbaek-bar-flavor-comparison", title: "오늘단백 단백질바 맛별 비교", lineName: "오늘단백 단백질바", filter: (p) => p.productType === "bar" && p.brand === "오늘단백" },
  { slug: "proteinbangatgan-bar-flavor-comparison", title: "프로틴방앗간 하루단백바 맛별 비교", lineName: "프로틴방앗간 하루단백바", filter: (p) => p.productType === "bar" && p.brand === "프로틴방앗간" },
  { slug: "myprotein-bar-comparison", title: "마이프로틴 프로틴바 종류별 비교", lineName: "마이프로틴 프로틴바", itemWord: "제품", filter: (p) => p.productType === "bar" && p.brand === "마이프로틴" },
  { slug: "ppaeba-proteinbar-flavor-comparison", title: "빼바 프로틴바 맛별 비교", lineName: "빼바 프로틴바", filter: (p) => p.productType === "bar" && p.brand === "빼바" },
  { slug: "kellogg-proteinbar-comparison", title: "켈로그 프로틴바 종류별 비교", lineName: "켈로그 프로틴바", itemWord: "제품", filter: (p) => p.productType === "bar" && p.brand === "켈로그" },
  { slug: "maeilbio-greek-yogurt-lineup-comparison", title: "매일 바이오 그릭요거트 종류별 비교 (무가당·투고·드링크)", lineName: "매일 바이오 그릭요거트", itemWord: "제품", filter: (p) => p.productType === "yogurt" && p.brand === "매일 바이오" },
  { slug: "yoplait-protein-yogurt-comparison", title: "요플레 프로틴 종류별 비교 (떠먹는·드링크·MAX)", lineName: "요플레 프로틴", itemWord: "제품", filter: (p) => p.productType === "yogurt" && p.brand === "요플레" },
  { slug: "foodis-greek-yogurt-comparison", title: "후디스 그릭요거트 종류별 비교", lineName: "후디스 그릭요거트", itemWord: "제품", filter: (p) => p.productType === "yogurt" && p.brand === "후디스" },
  { slug: "sangha-greek-yogurt-comparison", title: "상하목장 그릭요거트 종류별 비교", lineName: "상하목장 그릭요거트", itemWord: "제품", filter: (p) => p.productType === "yogurt" && p.brand === "상하목장" },
  { slug: "lookt-yogurt-comparison", title: "룩트 그릭요거트 종류별 비교 (마일드·띠크)", lineName: "룩트 요거트", itemWord: "제품", filter: (p) => p.productType === "yogurt" && p.brand === "룩트" },
  { slug: "yonsei-soymilk-lineup-comparison", title: "연세두유 고단백 종류별 비교", lineName: "연세두유", itemWord: "제품", filter: (p) => p.productType === "soymilk" && p.brand === "연세두유" },
  { slug: "erom-soymilk-lineup-comparison", title: "이롬 황성주 두유 종류별 비교", lineName: "이롬 두유", itemWord: "제품", filter: (p) => p.productType === "soymilk" && p.brand === "이롬" },
  { slug: "bobsnu-soymilk-lineup-comparison", title: "밥스누 약콩두유 종류별 비교", lineName: "밥스누 약콩두유", itemWord: "제품", filter: (p) => p.productType === "soymilk" && p.brand === "밥스누" },
  { slug: "wanjeon-soymilk-lineup-comparison", title: "완전두유 종류별 비교 (국산콩·서리태·검은콩)", lineName: "완전두유", itemWord: "제품", filter: (p) => p.productType === "soymilk" && p.brand === "완전두유" },
  // 2026-11-04 단백질 파우더 브랜드 종류별 묶음(등록 3종 이상인 브랜드).
  { slug: "newyorkwhey-protein-powder-lineup-comparison", title: "뉴욕웨이 단백질 보충제 종류별 비교 (라이트·WPI·올에이지·몬스터)", lineName: "뉴욕웨이 단백질 보충제", itemWord: "제품", filter: (p) => p.productType === "powder" && p.brand === "뉴욕웨이" },
  { slug: "selex-protein-powder-lineup-comparison", title: "셀렉스 단백질 분말 종류별 비교 (프로틴·락토프리·프로핏)", lineName: "셀렉스 단백질 분말", itemWord: "제품", filter: (p) => p.productType === "powder" && p.brand === "셀렉스" },
  { slug: "optimum-nutrition-protein-powder-lineup-comparison", title: "옵티멈 뉴트리션 단백질 보충제 비교 (골드스탠다드·하이드로웨이)", lineName: "옵티멈 뉴트리션 단백질 보충제", itemWord: "제품", filter: (p) => p.productType === "powder" && p.brand === "옵티멈뉴트리션" },
  { slug: "calobye-protein-drink-comparison", title: "칼로바이 프로틴 음료 종류별 비교 (스파클링·파워쉐이크)", lineName: "칼로바이 프로틴 음료", itemWord: "제품", filter: (p) => p.productType === "drink" && p.brand === "칼로바이" },
];

function buildPair(spec: PairSpec, bySlug: Map<string, ProductDetailProps>): CompareLanding | null {
  const a = bySlug.get(spec.a);
  const b = bySlug.get(spec.b);
  if (!a || !b) return null;
  const category = CATEGORY_PAGE[a.productType ?? "drink"];
  const subject = spec.topic ? `${spec.topic} ` : "";
  if (a.productType === "powder" && b.productType === "powder") {
    const names = new Map([[a.slug, spec.titleA], [b.slug, spec.titleB]]);
    return {
      slug: spec.slug,
      title: `${spec.titleA} vs ${spec.titleB} ${subject}비교 | 1회 단백질·함량·당류`,
      description: `${powderLine(a)}, ${powderLine(b)}입니다.`,
      intro: `${label(a)}, ${label(b)} 두 단백질 파우더를 성분표 1회 제공량 기준으로 비교합니다. 1회 단백질은 각각 ${fmt(a.proteinPerServing)}g·${fmt(b.proteinPerServing)}g이고, 1회 제공량 대비 단백질 함량은 ${fmt(powderPct(a))}%·${fmt(powderPct(b))}%입니다.${spec.intro ? ` ${spec.intro}` : ""}`,
      bullets: [
        powderLine(a),
        powderLine(b),
        `원료: ${label(a)} ${a.proteinSource ?? "-"} · ${label(b)} ${b.proteinSource ?? "-"}`,
        `한 통: ${label(a)} ${a.capacity ?? "-"}(${a.servingsPerContainer ?? "-"}회분) · ${label(b)} ${b.capacity ?? "-"}(${b.servingsPerContainer ?? "-"}회분)`,
      ],
      productSlugs: [a.slug, b.slug],
      faq: powderFaq([a, b], names),
      relatedLinks: [
        brandHub(a.brand),
        ...(a.brand === b.brand ? [] : [brandHub(b.brand)]),
        { href: category.href, title: category.title, description: "등록 파우더를 유형·단백질 함량 기준으로 비교합니다." },
        ...powderGuides(),
      ],
    };
  }
  return {
    slug: spec.slug,
    title: `${spec.titleA} vs ${spec.titleB} ${subject}비교 | 단백질·당류·칼로리`,
    description: `${nutrition(a)}, ${nutrition(b)}입니다.`,
    intro: `${label(a)}, ${label(b)} 두 제품을 표시 기준량으로 비교합니다. 표시 단백질은 각각 ${fmt(a.proteinPerServing)}g·${fmt(b.proteinPerServing)}g, 당류는 각각 ${fmt(a.sugar)}g·${fmt(b.sugar)}g입니다.`,
    bullets: [nutrition(a), nutrition(b), `용량 비교: ${label(a)} ${a.capacity ?? "-"} · ${label(b)} ${b.capacity ?? "-"}`],
    productSlugs: [a.slug, b.slug],
    relatedLinks: [
      brandHub(a.brand),
      ...(a.brand === b.brand ? [] : [brandHub(b.brand)]),
      { href: category.href, title: category.title, description: "등록 제품을 같은 항목으로 비교합니다." },
    ],
  };
}

// 같은 라인 안에서 제품을 구분하는 짧은 이름: 모든 제품명에 공통인 앞 단어를 떼고 괄호를 벗긴다.
// "단백질 쉐이크 (초코맛)"·"단백질 쉐이크 (커피맛)" → "초코맛"·"커피맛". 남는 게 없으면 전체 이름.
function shortItemNames(items: ProductDetailProps[]): Map<string, string> {
  const words = items.map((p) => p.name.split(/\s+/));
  let common = 0;
  while (words.every((w) => w.length > common + 1 && w[common] === words[0][common])) common += 1;
  const names = items.map((p, i) => {
    const rest = words[i].slice(common).join(" ").replace(/^\((.*)\)$/, "$1").trim();
    return rest || label(p);
  });
  // 줄인 이름이 겹치면(용량만 다른 제품 등) 용량을 붙인다.
  const fixed = names.map((name, i) => (names.indexOf(name) !== names.lastIndexOf(name) ? `${name} ${items[i].capacity ?? ""}`.trim() : name));
  return new Map(items.map((p, i) => [p.slug, fixed[i]]));
}

// "단백질은 초코맛이 23g으로 가장 많고" — 같은 값이 여럿이면 함께 적는다(최대 3개, 넘으면 "등 N종").
function extremePhrase(
  items: ProductDetailProps[],
  names: Map<string, string>,
  pick: (p: ProductDetailProps) => number | undefined,
  topic: string,
  unit: string,
  higher: boolean,
) {
  const values = items.map(pick).filter((v): v is number => v != null);
  if (values.length < 2) return null;
  const best = higher ? Math.max(...values) : Math.min(...values);
  const winners = items.filter((p) => pick(p) === best).map((p) => names.get(p.slug) ?? label(p));
  const particle = unit === "g" ? "으로" : "로";
  if (winners.length === items.length) return `${topic} 모두 ${fmt(best)}${unit}${particle} 같고`;
  const who = winners.length > 3 ? `${winners.slice(0, 3).join("·")} 등 ${winners.length}종` : winners.join("·");
  return `${topic} ${withSubject(who)} ${fmt(best)}${unit}${particle} 가장 ${higher ? "많고" : "낮고"}`;
}

function buildLine(spec: LineSpec, products: ProductDetailProps[]): CompareLanding | null {
  const items = products.filter(spec.filter);
  if (items.length < 3) return null;
  const brand = items[0].brand;
  const category = CATEGORY_PAGE[items[0].productType ?? "drink"];
  const word = spec.itemWord ?? "맛";
  const names = shortItemNames(items);
  if (items[0].productType === "powder") return buildPowderLine(spec, items, names, category);
  const phrases = [
    extremePhrase(items, names, (p) => p.proteinPerServing, "단백질은", "g", true),
    extremePhrase(items, names, (p) => p.sugar, "당류는", "g", false),
    extremePhrase(items, names, (p) => p.calories, "열량은", "kcal", false),
  ].filter((v): v is string => v !== null);
  const verdict = phrases.length
    ? `${spec.lineName} ${items.length}종 중 ${phrases.join(", ").replace(/(많고|낮고|같고)$/, (m) => ({ 많고: "많습니다", 낮고: "낮습니다", 같고: "같습니다" })[m] ?? m)}.`
    : undefined;
  return {
    slug: spec.slug,
    title: `${spec.title} | 단백질·당류·칼로리`,
    description: `등록된 ${spec.lineName} ${items.length}종을 비교합니다. 단백질 ${range(items, (p) => p.proteinPerServing)}g, 당류 ${range(items, (p) => p.sugar)}g, 열량 ${range(items, (p) => p.calories)}kcal 범위입니다.`,
    intro: `${spec.lineName} ${items.length}종의 표시 기준량 성분을 한 번에 비교합니다. ${word}마다 단백질·당류·칼로리가 어떻게 다른지 확인하고 제품 상세로 이어서 볼 수 있습니다.`,
    // 맛(제품)마다 한 줄: "초코맛 1회(40g): 단백질 23g·당류 1g·128kcal"
    bullets: items.map((p) => {
      const name = names.get(p.slug) ?? label(p);
      // 이름에 이미 용량이 붙어 있으면 "1개(150g)"의 괄호를 뺀다.
      const unit = p.capacity && name.endsWith(p.capacity) ? basis(p).replace(/\(.*\)$/, "") : basis(p);
      return `${name} ${unit}: 단백질 ${fmt(p.proteinPerServing)}g·당류 ${fmt(p.sugar)}g·${fmt(p.calories)}kcal`;
    }),
    verdict,
    productSlugs: items.map((p) => p.slug),
    relatedLinks: [brandHub(brand), { href: category.href, title: category.title, description: "다른 브랜드 제품과 같은 항목으로 비교합니다." }],
  };
}

// 파우더 묶음: 1회 제공량이 제품마다 달라 함량(%)을 함께 적고, 결론도 함량 기준으로 쓴다.
function buildPowderLine(
  spec: LineSpec,
  items: ProductDetailProps[],
  names: Map<string, string>,
  category: { href: string; title: string },
): CompareLanding {
  const word = spec.itemWord ?? "맛";
  const pctRounded = (p: ProductDetailProps) => {
    const v = powderPct(p);
    return v == null ? undefined : Math.round(v * 10) / 10;
  };
  const phrases = [
    extremePhrase(items, names, (p) => p.proteinPerServing, "1회 단백질은", "g", true),
    extremePhrase(items, names, pctRounded, "단백질 함량은", "%", true)?.replace(/가장 많고$/, "가장 높고") ?? null,
    extremePhrase(items, names, (p) => p.calories, "1회 열량은", "kcal", false),
  ].filter((v): v is string => v !== null);
  const verdict = phrases.length
    ? `${spec.lineName} ${items.length}종 중 ${phrases.join(", ").replace(/(많고|높고|낮고|같고)$/, (m) => ({ 많고: "많습니다", 높고: "높습니다", 낮고: "낮습니다", 같고: "같습니다" })[m] ?? m)}.`
    : undefined;
  return {
    slug: spec.slug,
    title: `${spec.title} | 1회 단백질·함량·당류`,
    description: `등록된 ${spec.lineName} ${items.length}종을 비교합니다. 1회 단백질 ${range(items, (p) => p.proteinPerServing)}g, 1회 제공량 ${range(items, (p) => p.servingSizeG)}g, 1회 열량 ${range(items, (p) => p.calories)}kcal 범위입니다.`,
    intro: `${spec.lineName} ${items.length}종의 성분표 1회 제공량 기준 수치를 한 번에 비교합니다. ${word}마다 1회 제공량이 달라 1회 단백질(g)과 함께 1회 제공량 대비 단백질 함량(%)을 적었습니다.`,
    bullets: items.map((p) => powderLine(p, names.get(p.slug) ?? label(p))),
    verdict,
    productSlugs: items.map((p) => p.slug),
    faq: powderFaq(items, names),
    relatedLinks: [
      brandHub(items[0].brand),
      { href: category.href, title: category.title, description: "다른 브랜드 파우더와 같은 항목으로 비교합니다." },
      ...powderGuides(),
    ],
  };
}

export function getGeneratedCompareLandings(): CompareLanding[] {
  const products = getAllProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return [
    ...PAIRS.map((spec) => buildPair(spec, bySlug)),
    ...LINES.map((spec) => buildLine(spec, products)),
  ].filter((item): item is CompareLanding => item !== null);
}

/**
 * 비교 랜딩끼리 이어 주는 링크(2026-10-20). 신규 방문자가 비교 페이지 하나만 보고 나가는 경우가 많아,
 * 같은 브랜드 제품이 들어간 비교를 먼저, 그다음 같은 제품군 비교를 relatedLinks 뒤에 최대 limit개 붙인다.
 */
export function withAutoRelatedLandings(landing: CompareLanding, all: CompareLanding[], limit = 3): CompareLanding {
  const products = getAllProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const brandsOf = (item: CompareLanding) => new Set(item.productSlugs.map((s) => bySlug.get(s)?.brand).filter(Boolean));
  const categoryOf = (item: CompareLanding) => bySlug.get(item.productSlugs[0] ?? "")?.productType;
  const myBrands = brandsOf(landing);
  const myCategory = categoryOf(landing);
  const existing = new Set(landing.relatedLinks.map((link) => link.href));
  const candidates = all.filter((item) => item.slug !== landing.slug && !existing.has(`/compare/${item.slug}`));
  const sameBrand = candidates.filter((item) => [...brandsOf(item)].some((b) => myBrands.has(b)));
  const sameCategory = candidates.filter((item) => !sameBrand.includes(item) && categoryOf(item) === myCategory);
  const picks = [...sameBrand, ...sameCategory].slice(0, limit);
  if (!picks.length) return landing;
  return {
    ...landing,
    relatedLinks: [
      ...landing.relatedLinks,
      ...picks.map((item) => ({
        href: compareLandingHref(item.slug),
        title: item.title.split(" | ")[0],
        description: "같은 브랜드·제품군의 다른 비교를 이어서 확인합니다.",
      })),
    ],
  };
}
