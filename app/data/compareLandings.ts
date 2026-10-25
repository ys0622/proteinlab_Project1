import { getBarProducts } from "./barProductsData";
import { getGeneratedCompareLandings, withAutoRelatedLandings } from "./compareLandingsGenerated";

export interface CompareLanding {
  slug: string;
  title: string;
  description: string;
  intro: string;
  bullets: string[];
  productSlugs: string[];
  relatedLinks: { href: string; title: string; description: string }[];
}

const barProductsBySlug = new Map(getBarProducts().map((product) => [product.slug, product]));

function getRequiredBarProduct(slug: string) {
  const product = barProductsBySlug.get(slug);
  if (!product) throw new Error(`비교 랜딩에 등록되지 않은 단백질바 slug: ${slug}`);
  return product;
}

function formatRange(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}` : `${min}~${max}`;
}

function formatBarNutrition(label: string, product: ReturnType<typeof getRequiredBarProduct>) {
  return `${label} 1개(${product.capacity}): 단백질 ${product.proteinPerServing}g·당류 ${product.sugar}g·${product.calories}kcal`;
}

const barebellsQuestProducts = {
  barebells: getRequiredBarProduct("barebells-proteinbar-cookies-cream-55"),
  quest: getRequiredBarProduct("quest-nutrition-protein-bar-cookie-cream-60"),
};

const barebellsGrenadeProducts = {
  barebells: getRequiredBarProduct("barebells-proteinbar-peanut-butter-55"),
  grenade: getRequiredBarProduct("grenade-carbkilla-peanut-nutter-60"),
};

const barebellsRegularProducts = [
  "barebells-proteinbar-white-chocolate-almond-55",
  "barebells-proteinbar-cookies-cream-55",
  "barebells-proteinbar-salty-peanut-55",
  "barebells-proteinbar-peanut-butter-55",
].map(getRequiredBarProduct);

const barebellsSoftProducts = [
  "barebells-soft-proteinbar-caramel-choco-55",
  "barebells-soft-proteinbar-marshmallow-rocky-road-55",
  "barebells-soft-proteinbar-lemon-cheesecake-55",
].map(getRequiredBarProduct);

const barebellsFlavorProducts = [...barebellsRegularProducts, ...barebellsSoftProducts];

const kirklandFlavorProducts = [
  "kirkland-proteinbar-choco-brownie",
  "kirkland-proteinbar-choco-chip-cookie-dough-60",
].map(getRequiredBarProduct);

function formatProductRange(
  products: ReturnType<typeof getRequiredBarProduct>[],
  selector: (product: ReturnType<typeof getRequiredBarProduct>) => number,
) {
  return formatRange(products.map(selector));
}

const compareLandings: CompareLanding[] = [
  {
    slug: "maeil-vs-vegemil-soymilk",
    title: "매일두유 vs 베지밀 고단백 두유 플레인 비교",
    description: "매일두유 고단백 플레인과 베지밀 고단백두유 플레인을 1팩 단백질, 당류, 칼로리, 나트륨, 칼슘 표기 기준으로 비교합니다.",
    intro: "고단백 두유에서 가장 자주 비교되는 두 브랜드의 플레인 제품을 성분표 수치로 직접 비교하는 랜딩입니다. 두 제품은 단백질 12g, 열량 90kcal, 당류 1.2g이 같아서 나머지 표기 차이를 확인하는 것이 핵심입니다.",
    bullets: ["1팩(190mL) 기준 단백질·열량·당류가 같은 두 플레인 제품", "지방 4.1g(매일) vs 4g(베지밀), 나트륨 200mg으로 비슷함", "칼슘은 베지밀 성분표에 110mg이 표기되어 있고, 알룰로오스는 매일두유 성분표에 4g이 별도 표기됨"],
    productSlugs: ["maeil-soymilk-protein-plain-190", "vegemil-protein-plain-190"],
    relatedLinks: [
      { href: "/soymilk", title: "두유 전체 비교", description: "등록된 두유를 단백질 구간, 당류, 열량 기준으로 한 화면에서 비교합니다." },
      { href: "/curation/soymilk-high-protein", title: "고단백 두유 보기", description: "1팩 단백질 11g 이상 두유만 모아서 비교합니다." },
      { href: "/guides/product-selection-comparison/high-protein-soymilk-guide", title: "고단백 두유 고르는 법", description: "단백질, 당류, 열량을 어떤 순서로 보면 좋은지 정리했습니다." },
    ],
  },
  {
    slug: "yonsei-pro-vs-erom-pro-soymilk",
    title: "연세두유 고단백 Pro vs 이롬 고단백 두유 Pro 24g 비교",
    description: "1팩 단백질 24g인 연세두유 고단백 Pro 플레인과 이롬 고단백 두유 Pro 24g를 당류, 열량, 지방, 나트륨 기준으로 비교합니다.",
    intro: "두유 중 1팩 단백질이 가장 높은 두 제품(240mL, 24g)을 성분표 수치로 직접 비교하는 랜딩입니다. 단백질은 같고 당류·열량·지방·나트륨이 갈립니다.",
    bullets: ["둘 다 240mL 1팩 단백질 24g", "당류는 이롬 1g, 연세두유 2.2g이고 열량은 이롬 175kcal, 연세두유 180kcal", "지방은 연세두유 5.3g, 이롬 7g이고 나트륨은 연세두유 200mg, 이롬 320mg"],
    productSlugs: ["yonsei-protein-pro-plain-240", "erom-protein-pro-plain-240"],
    relatedLinks: [
      { href: "/guides/product-selection-comparison/soymilk-protein-ranking", title: "두유 단백질 함량 순위", description: "1팩 단백질 높은 순으로 두유를 정리했습니다." },
      { href: "/guides/product-selection-comparison/soymilk-brand-comparison", title: "두유 브랜드 비교", description: "매일두유·베지밀·연세두유·이롬의 수치 범위를 비교합니다." },
      { href: "/soymilk", title: "두유 전체 비교", description: "등록된 두유를 한 화면에서 비교합니다." },
    ],
  },
  {
    slug: "maeil-vs-vegemil-blackbean-soymilk",
    title: "매일두유 vs 베지밀 고단백 검은콩 두유 비교",
    description: "매일두유 고단백 검은콩과 베지밀 고단백두유 검은콩을 1팩 단백질, 당류, 열량, 지방 기준으로 비교합니다.",
    intro: "같은 190mL 단백질 12g 검은콩 두유인데 당류가 크게 갈리는 두 제품을 성분표 수치로 비교하는 랜딩입니다.",
    bullets: ["둘 다 190mL 1팩 단백질 12g", "당류는 매일두유 1.7g, 베지밀 7.5g이고 열량은 매일두유 105kcal, 베지밀 135kcal", "지방은 매일두유 4.8g, 베지밀 5.5g이고 나트륨은 200mg, 210mg으로 비슷함"],
    productSlugs: ["maeil-soymilk-protein-blackbean-190", "vegemil-protein-blackbean-190"],
    relatedLinks: [
      { href: "/guides/product-selection-comparison/blackbean-soymilk-guide", title: "검은콩 두유 비교", description: "검은콩·서리태 두유를 단백질·당류로 비교합니다." },
      { href: "/compare/maeil-vs-vegemil-soymilk", title: "매일두유 vs 베지밀 플레인", description: "플레인 두 제품도 비교해 보세요." },
      { href: "/soymilk", title: "두유 전체 비교", description: "등록된 두유를 한 화면에서 비교합니다." },
    ],
  },

  {
    slug: "newcare-41g-vs-labnosh-max-drink",
    title: "뉴케어 올프로틴 41g vs 랩노쉬 프로틴 맥스 52g 비교",
    description: "뉴케어 올프로틴 41g와 랩노쉬 프로틴 맥스 52g를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다.",
    intro: "고단백 RTD 음료에서 가장 주목받는 두 제품을 직접 비교하는 랜딩입니다. 41g vs 52g 차이를 성분 기준으로 확인하세요.",
    bullets: ["고단백 RTD 음료 탑 티어 비교", "BCAA 9100mg(랩노쉬) vs 완전단백질(뉴케어) 차이", "운동 목적 vs 일상 보충 관점 비교"],
    productSlugs: ["newcare-all-protein-41g", "labnosh-protein-max-choco-400"],
    relatedLinks: [
      { href: "/topics/newcare-all-protein", title: "뉴케어 올프로틴 전용 페이지", description: "뉴케어 올프로틴 라인업과 성분 정보를 상세히 확인합니다." },
      { href: "/topics/high-protein-drink-20g", title: "고단백 20g 이상 음료", description: "단백질 함량 기준 전체 후보군을 한 번에 봅니다." },
    ],
  },
  {
    slug: "newcare-vs-danbaek-drink",
    title: "뉴케어 올프로틴 vs 더단백 드링크 비교",
    description: "뉴케어 올프로틴과 더단백 드링크를 단백질, 당류, 칼로리, 밀도 기준으로 비교합니다.",
    intro: "가장 많이 찾는 RTD 음료군 중에서 뉴케어와 더단백을 직접 비교하는 랜딩입니다.",
    bullets: ["고단백 RTD 대표 제품 비교", "운동 후 보충용 검색과 연결하기 좋음", "상세 페이지로 분기하기 쉬운 조합"],
    productSlugs: ["newcare-all-protein-choco-245", "danbaek-drink-coffee-250"],
    relatedLinks: [
      { href: "/topics/protein-drink-recommend", title: "단백질 음료 추천", description: "음료 허브에서 전체 후보군을 다시 봅니다." },
      { href: "/ranking", title: "순위 페이지", description: "두 제품이 전체 순위에서 어디쯤인지 확인합니다." },
    ],
  },
  {
    slug: "sellex-vs-hymune-drink",
    title: "셀렉스 프로핏 vs 하이뮨 액티브 비교",
    description: "셀렉스 프로핏과 하이뮨 액티브를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "브랜드 검색량이 높은 셀렉스와 하이뮨의 대표 RTD 제품을 직접 비교하는 페이지입니다.",
    bullets: ["브랜드 검색 유입 대응", "퍼포먼스/일상 보충 비교에 적합", "브랜드 허브로 확장하기 좋은 조합"],
    productSlugs: ["sellex-profit-milk-vanilla-250", "hymune-balance-active-deepchoco-250"],
    relatedLinks: [
      { href: "/brands/sellex", title: "셀렉스 브랜드 허브", description: "셀렉스 제품군 전체를 확인합니다." },
      { href: "/brands/hymune", title: "하이뮨 브랜드 허브", description: "하이뮨 제품군 전체를 확인합니다." },
    ],
  },
  {
    slug: "protein-water-vs-rtd-drink",
    title: "프로틴 워터 vs 일반 RTD 단백질 음료 비교",
    description: "워터형 단백질 음료와 일반 RTD 음료를 음용감, 당류, 단백질 밀도로 비교합니다.",
    intro: "가볍게 마시는 프로틴 워터와 일반 RTD 음료를 목적별로 비교하는 랜딩입니다.",
    bullets: ["워터형 검색 유입 대응", "가벼운 섭취 vs 보충감 비교", "저당 음료 랜딩과 연계 가능"],
    productSlugs: ["danbaek-water-apple-400", "sellex-profit-milk-vanilla-250"],
    relatedLinks: [
      { href: "/topics/protein-water", title: "프로틴 워터 추천", description: "워터형 제품군만 다시 봅니다." },
      { href: "/topics/low-sugar-protein-drink", title: "저당 단백질 음료", description: "당류 기준으로도 비교할 수 있습니다." },
    ],
  },
  {
    slug: "doctoru-vs-benof-bar",
    title: "닥터유 프로틴바 vs 베노프 소프트바 비교",
    description: "닥터유와 베노프 대표 단백질 바를 단백질 함량, 당류, 칼로리 기준으로 비교합니다.",
    intro: "바 카테고리에서 가장 검색량이 큰 두 브랜드를 직접 비교하는 랜딩입니다.",
    bullets: ["대표 바 브랜드 비교", "간식형 vs 보충형 체감 차이 확인", "브랜드 허브로 이어지기 좋음"],
    productSlugs: ["dryou-proteinbar-pro-crunch", "benof-softbar-cookie-cream"],
    relatedLinks: [
      { href: "/brands/dryou", title: "닥터유 브랜드 허브", description: "닥터유 제품군 전체를 확인합니다." },
      { href: "/brands/benof", title: "베노프 브랜드 허브", description: "베노프 제품군 전체를 확인합니다." },
    ],
  },
  {
    slug: "doctoru-vs-kirkland-bar",
    title: "커클랜드 프로틴바 성분·칼로리 | 닥터유 단백질바와 비교",
    description: "국내 대표 프로틴바와 커클랜드 프로틴바를 단백질 총량과 당류 기준으로 비교합니다.",
    intro: "단백질 바 검색에서 자주 비교되는 조합을 고정 URL로 만든 랜딩입니다.",
    bullets: ["국내/해외 대표 프로틴바 비교", "고단백 바 검색어 대응", "상세 페이지 진입 유도에 적합"],
    productSlugs: ["dryou-proteinbar-pro-choco-classic", "kirkland-proteinbar-choco-brownie"],
    relatedLinks: [
      { href: "/compare/kirkland-proteinbar-flavor-comparison", title: "커클랜드 맛별 비교", description: "초콜릿 브라우니와 초코칩 쿠키도우의 성분을 비교합니다." },
      { href: "/topics/high-protein-bar", title: "고단백 단백질 바", description: "단백질 높은 바만 다시 좁혀 봅니다." },
      { href: "/ranking", title: "랭킹 페이지", description: "바 전체 순위도 함께 확인합니다." },
    ],
  },
  {
    slug: "yopro-vs-yoplait-yogurt",
    title: "요프로 vs 요플레 프로틴 요거트 비교",
    description: "요프로와 요플레 프로틴 요거트를 단백질 밀도, 당류, 용량 기준으로 비교합니다.",
    intro: "요거트 카테고리에서 브랜드 탐색 유입을 직접 받는 비교 랜딩입니다.",
    bullets: ["프로틴 요거트 대표 브랜드 비교", "떠먹는 타입과 드링킹 타입 탐색에 적합", "브랜드/상세 페이지로 분기하기 좋음"],
    productSlugs: ["yopro-plain-150", "yoplait-protein-plain-100"],
    relatedLinks: [
      { href: "/brands/yopro", title: "요프로 브랜드 허브", description: "요프로 제품군 전체를 확인합니다." },
      { href: "/brands/yoplait", title: "요플레 브랜드 허브", description: "요플레 제품군 전체를 확인합니다." },
    ],
  },
  {
    slug: "greek-yogurt-brand-compare",
    title: "후디스 vs 매일바이오 그릭요거트 비교",
    description: "후디스 그릭요거트와 매일 바이오 그릭요거트를 단백질 밀도, 당류, 용량 기준으로 비교합니다.",
    intro: "그릭요거트 검색에서 자주 비교되는 브랜드 조합을 별도 랜딩으로 구성했습니다.",
    bullets: ["그릭요거트 브랜드 직접 비교", "대용량과 소용량 탐색 흐름에 적합", "고단백/저당 랜딩으로 연결 가능"],
    productSlugs: ["who-greek-plain-450", "maeil-bio-greek-unsweetened-150"],
    relatedLinks: [
      { href: "/topics/high-protein-greek-yogurt", title: "고단백 그릭요거트", description: "그릭요거트 전체 후보군을 다시 봅니다." },
      { href: "/topics/low-sugar-yogurt", title: "저당 단백질 요거트", description: "당류 기준으로 다시 좁힙니다." },
    ],
  },
  {
    slug: "labnosh-vs-flymill-shake",
    title: "랩노쉬 vs 플라이밀 단백질 쉐이크 비교",
    description: "랩노쉬와 플라이밀 쉐이크를 식이섬유, 당류, 단백질, 칼로리 기준으로 비교합니다.",
    intro: "쉐이크 카테고리에서 가장 자주 비교되는 두 브랜드를 직접 비교하는 랜딩입니다.",
    bullets: ["쉐이크 브랜드 검색 대응", "식사대용 탐색에 적합", "브랜드 허브와 상세 페이지 연결이 좋음"],
    productSlugs: ["labnosh-slimshake-double-choco-45", "flymill-proteinshake-choco-45"],
    relatedLinks: [
      { href: "/brands/labnosh", title: "랩노쉬 브랜드 허브", description: "랩노쉬 제품군 전체를 확인합니다." },
      { href: "/brands/flymill", title: "플라이밀 브랜드 허브", description: "플라이밀 제품군 전체를 확인합니다." },
    ],
  },
  {
    slug: "labnosh-vs-danbaekhani-shake",
    title: "랩노쉬 vs 단백하니 쉐이크 비교",
    description: "랩노쉬와 단백하니 단백질 쉐이크를 단백질, 당류, 식이섬유 기준으로 비교합니다.",
    intro: "국내 파우치형 쉐이크 브랜드 비교 검색을 직접 받는 랜딩입니다.",
    bullets: ["쉐이크 비교 검색 대응", "식사대용/보충형 판단에 유용", "관련 제품 비교로 이어보기 좋음"],
    productSlugs: ["labnosh-slimshake-injeolmi-45", "danbaekhani-proteinshake-signature-40"],
    relatedLinks: [
      { href: "/topics/meal-replacement-protein-shake", title: "식사대용 쉐이크 추천", description: "식사대용 기준의 전체 후보군을 확인합니다." },
      { href: "/recommend", title: "맞춤 추천", description: "운동 목적에 맞춰 카테고리를 다시 좁힙니다." },
    ],
  },
  {
    slug: "danbaek-vs-sellex-drink",
    title: "더단백 vs 셀렉스 단백질 음료 비교",
    description: "더단백과 셀렉스 RTD 음료를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "편의점과 온라인에서 함께 많이 비교되는 더단백과 셀렉스 대표 음료 조합입니다.",
    bullets: ["국내 RTD 브랜드 비교", "입문용 단백질 음료 탐색에 적합", "브랜드 허브와 상세 페이지로 이어지기 좋음"],
    productSlugs: ["danbaek-drink-coffee-250", "sellex-profit-milk-vanilla-250"],
    relatedLinks: [
      { href: "/brands/danbaek", title: "더단백 브랜드 허브", description: "더단백 음료와 바 라인을 한 번에 봅니다." },
      { href: "/brands/sellex", title: "셀렉스 브랜드 허브", description: "셀렉스 제품군 전체 구성을 확인합니다." },
    ],
  },
  {
    slug: "takefit-vs-hymune-drink",
    title: "테이크핏 vs 하이뮨 단백질 음료 비교",
    description: "테이크핏과 하이뮨 음료를 당류, 단백질, 칼로리 기준으로 비교합니다.",
    intro: "대중적인 RTD 음료 브랜드인 테이크핏과 하이뮨을 직접 비교하는 랜딩입니다.",
    bullets: ["대중형 RTD 브랜드 비교", "운동 전후 가볍게 마실 제품 탐색용", "브랜드별 라인업 확장 탐색에 적합"],
    productSlugs: ["takefit-max-choco-250", "hymune-balance-active-deepchoco-250"],
    relatedLinks: [
      { href: "/brands/hymune", title: "하이뮨 브랜드 허브", description: "하이뮨 드링크와 관련 제품군을 모아 봅니다." },
      { href: "/ranking", title: "음료 순위 보기", description: "비교한 제품이 전체 음료 순위에서 어느 위치인지 확인합니다." },
    ],
  },
  {
    slug: "newcare-vs-sellex-drink",
    title: "뉴케어 vs 셀렉스 단백질 음료 비교",
    description: "뉴케어 올프로틴과 셀렉스 프로핏을 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "온라인 검색에서 자주 겹치는 뉴케어와 셀렉스 대표 음료 조합을 고정 URL로 묶었습니다.",
    bullets: ["브랜드 검색 유입 대응", "단백질 음료 대표 라인 비교", "상세 정보와 비교 페이지를 함께 보기 좋음"],
    productSlugs: ["newcare-all-protein-choco-245", "sellex-profit-milk-vanilla-250"],
    relatedLinks: [
      { href: "/topics/protein-drink-recommend", title: "단백질 음료 추천", description: "대표 RTD 음료를 한 번에 다시 비교합니다." },
      { href: "/brands/sellex", title: "셀렉스 브랜드 허브", description: "셀렉스 제품군 전체를 확인합니다." },
    ],
  },
  {
    slug: "doctoru-vs-benof-crunch-bar",
    title: "닥터유 vs 베노프 프로틴바 비교",
    description: "닥터유 프로틴바와 베노프 청키초코 바를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "바 카테고리에서 식감과 영양 밸런스를 함께 비교하기 좋은 국내 조합입니다.",
    bullets: ["국내 바 브랜드 비교", "간식형과 보충형 체감 차이 확인", "브랜드 허브로 확장 탐색하기 좋음"],
    productSlugs: ["dryou-proteinbar-pro-crunch", "benof-proteinbar-chunky-choco"],
    relatedLinks: [
      { href: "/brands/dryou", title: "닥터유 브랜드 허브", description: "닥터유 음료와 바 라인을 함께 확인합니다." },
      { href: "/brands/benof", title: "베노프 브랜드 허브", description: "베노프 바와 쉐이크를 브랜드 단위로 봅니다." },
    ],
  },
  {
    slug: "yopro-vs-maeilbio-yogurt",
    title: "요프로 vs 매일 바이오 단백질 요거트 비교",
    description: "요프로와 매일 바이오 그릭 요거트를 단백질, 당류, 용량 기준으로 비교합니다.",
    intro: "마시는 타입과 그릭 타입 사이에서 고민하는 사용자가 많이 찾는 요거트 비교 조합입니다.",
    bullets: ["브랜드 검색 유입 대응", "떠먹는 타입과 그릭 타입 비교", "요거트 허브 페이지로 이어지기 좋음"],
    productSlugs: ["yopro-plain-150", "maeil-bio-greek-plain-150"],
    relatedLinks: [
      { href: "/brands/yopro", title: "요프로 브랜드 허브", description: "요프로 제품군 전체를 확인합니다." },
      { href: "/brands/maeil-bio", title: "매일 바이오 브랜드 허브", description: "매일 바이오 요거트 라인을 모아 봅니다." },
    ],
  },
  {
    slug: "greekday-vs-maeilbio-yogurt",
    title: "매일 바이오 그릭요거트 성분·칼로리 | 그릭데이와 비교",
    description: "그릭데이와 매일 바이오 그릭요거트를 단백질, 당류, 용량 기준으로 비교합니다.",
    intro: "대용량 그릭요거트와 일반 그릭요거트 브랜드를 함께 비교하는 랜딩입니다.",
    bullets: ["그릭요거트 브랜드 비교", "대용량 구매 전 탐색용", "주제 랜딩과 브랜드 허브 연결에 적합"],
    productSlugs: ["greekday-signature-450", "maeil-bio-greek-unsweetened-400"],
    relatedLinks: [
      { href: "/topics/high-protein-greek-yogurt", title: "고단백 그릭요거트", description: "그릭요거트 전체 후보를 다시 비교합니다." },
      { href: "/brands/maeil-bio", title: "매일 바이오 브랜드 허브", description: "매일 바이오 제품군을 브랜드 단위로 봅니다." },
    ],
  },
  {
    slug: "greekday-vs-who-yogurt",
    title: "그릭데이 vs 후디스 그릭요거트 비교",
    description: "그릭데이와 후디스 그릭요거트를 단백질, 당류, 용량 기준으로 비교합니다.",
    intro: "그릭요거트 입문층이 많이 찾는 브랜드 조합을 비교용 랜딩으로 분리했습니다.",
    bullets: ["그릭요거트 입문 비교", "브랜드명 검색 유입 대응", "요거트 상세 페이지 유입에 적합"],
    productSlugs: ["greekday-light-450", "who-greek-plain-450"],
    relatedLinks: [
      { href: "/topics/low-sugar-yogurt", title: "저당 요거트 주제 랜딩", description: "당류 기준으로 다시 제품을 추립니다." },
      { href: "/brands/maeil-bio", title: "매일계 요거트 허브", description: "매일 바이오와 연관 제품군을 같이 확인합니다." },
    ],
  },
  {
    slug: "proteone-vs-itthefit-shake",
    title: "프로티원 쉐이크 성분·칼로리 | 잇더핏과 맛별 비교",
    description: "40g 파우치 기준 프로티원 초코맛은 단백질 23g·당류 1g·128kcal, 커피맛은 22g·1g·108kcal, 잇더핏 더블초코는 21.3g·0.6g·122kcal입니다. 맛별 성분과 가격 확인 링크를 함께 정리했습니다.",
    intro: "같은 40g 파우치형 쉐이크라도 단백질은 프로티원 초코맛이 가장 많고(23g), 열량은 프로티원 커피맛이 가장 낮으며(108kcal), 당류는 잇더핏이 가장 낮습니다(0.6g). 목적에 따라 어느 차이를 먼저 볼지 정리했습니다.",
    bullets: ["단백질 우선: 프로티원 초코 23g > 커피 22g > 잇더핏 21.3g", "열량 우선: 프로티원 커피맛 108kcal", "당류 우선: 잇더핏 0.6g, 프로티원 두 맛은 1g"],
    productSlugs: ["proteone-proteinshake-choco-40", "proteone-proteinshake-coffee-40", "itthefit-proteinshake-double-choco-40"],
    relatedLinks: [
      { href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", title: "저당 단백질 쉐이크 선택 기준", description: "두 제품 외에 당류가 낮은 쉐이크와 성분표를 이어서 비교합니다." },
      { href: "/topics/meal-replacement-protein-shake", title: "식사대용 쉐이크", description: "쉐이크 카테고리 전체를 다시 비교합니다." },
      { href: "/recommend", title: "맞춤 추천", description: "운동 목적과 섭취 상황에 맞는 제품을 다시 추립니다." },
    ],
  },
  {
    slug: "flymill-vs-itthefit-shake",
    title: "플라이밀 vs 잇더핏 단백질 쉐이크 비교",
    description: "플라이밀 초코와 잇더핏 더블초코 쉐이크를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "제품 수가 많은 두 파우치형 쉐이크 브랜드의 초코 계열 대표 제품을 같은 기준으로 비교합니다.",
    bullets: ["초코 계열 대표 맛 비교", "단백질 22g와 21.3g 차이 확인", "당류와 칼로리를 함께 보는 다이어트 관점 비교"],
    productSlugs: ["flymill-proteinshake-choco-45", "itthefit-proteinshake-double-choco-40"],
    relatedLinks: [
      { href: "/brands/flymill", title: "플라이밀 쉐이크 13종", description: "플라이밀 전체 맛과 성분을 비교합니다." },
      { href: "/brands/itthefit", title: "잇더핏 쉐이크 9종", description: "잇더핏 전체 맛과 성분을 비교합니다." },
      { href: "/curation/shake-dessert-flavor", title: "초코·디저트 쉐이크", description: "다른 초코 계열 제품까지 함께 확인합니다." },
    ],
  },
  {
    slug: "labnosh-vs-itthefit-shake",
    title: "랩노쉬 vs 잇더핏 단백질 쉐이크 비교",
    description: "랩노쉬 슬림쉐이크 더블초코와 잇더핏 더블초코를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "더블초코 맛을 찾을 때 함께 검토하기 좋은 두 제품을 식사대용과 가벼운 보충 관점에서 비교합니다.",
    bullets: ["더블초코 동일 맛 비교", "165kcal와 122kcal 열량 차이", "단백질과 당류를 함께 보는 선택 기준"],
    productSlugs: ["labnosh-slimshake-double-choco-45", "itthefit-proteinshake-double-choco-40"],
    relatedLinks: [
      { href: "/brands/labnosh", title: "랩노쉬 쉐이크 9종", description: "랩노쉬 슬림쉐이크 전체 맛을 비교합니다." },
      { href: "/brands/itthefit", title: "잇더핏 쉐이크 9종", description: "잇더핏 전체 맛과 성분을 비교합니다." },
      { href: "/curation/shake-low-sugar", title: "저당 쉐이크", description: "당류 3g 이하 쉐이크를 다시 좁혀봅니다." },
    ],
  },
  {
    slug: "milit-vs-kkobak-shake",
    title: "밀잇 vs 꼬박꼬밥 단백질 쉐이크 비교",
    description: "밀잇 커피맛과 꼬박꼬밥 고단저당 커피 쉐이크를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "커피맛 파우치 쉐이크 중 단백질 총량과 저당 설계 차이가 뚜렷한 두 제품을 비교합니다.",
    bullets: ["커피맛 쉐이크 직접 비교", "단백질 16g와 20g 차이", "당류 1.9g와 1.1g 비교"],
    productSlugs: ["milit-proteinshake-coffee-40", "kkobak-kobab-high-protein-low-sugar-coffee-40"],
    relatedLinks: [
      { href: "/brands/milit", title: "밀잇 쉐이크 7종", description: "밀잇 맛별 성분을 비교합니다." },
      { href: "/brands/kkobak-kobab", title: "꼬박꼬밥 쉐이크 6종", description: "꼬박꼬밥 고단저당 라인을 비교합니다." },
      { href: "/curation/shake-coffee-latte", title: "커피·라떼 쉐이크", description: "커피 계열 쉐이크 전체 후보를 확인합니다." },
    ],
  },
  {
    slug: "delight-project-vs-shakebaby-shake",
    title: "딜라이트 프로젝트 vs 쉐이크베이비 단백질 쉐이크 비교",
    description: "딜라이트 프로젝트 너티초코와 쉐이크베이비 초코맛을 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "맛 선택 폭이 넓은 두 브랜드의 초코 계열 제품을 단백질 보충과 디저트 만족감 관점에서 비교합니다.",
    bullets: ["초코 계열 신제품 비교", "단백질 19g와 22g 차이", "당류와 칼로리 부담 비교"],
    productSlugs: ["delight-project-shake-nutty-choco-45", "shakebaby-proteinshake-choco-45"],
    relatedLinks: [
      { href: "/brands/delight-project", title: "딜라이트 프로젝트 8종", description: "딜라이트 프로젝트 맛별 성분을 비교합니다." },
      { href: "/brands/shakebaby", title: "쉐이크베이비 5종", description: "쉐이크베이비 전체 맛을 비교합니다." },
      { href: "/guides/product-selection-comparison/delight-project-shake-flavors", title: "딜라이트 프로젝트 맛 가이드", description: "8가지 맛의 차이를 자세히 확인합니다." },
    ],
  },
  {
    slug: "flymill-vs-allthebetter-shake",
    title: "플라이밀 vs 올더배러 단백질 쉐이크 비교",
    description: "플라이밀과 올더배러 쉐이크를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "맛 선택 폭이 넓은 쉐이크 브랜드 두 곳을 직접 비교하는 랜딩입니다.",
    bullets: ["쉐이크 브랜드 비교", "맛 구성과 저당 라인 탐색에 적합", "상세 페이지와 브랜드 허브 연결용"],
    productSlugs: ["flymill-proteinshake-choco-45", "allthebetter-proteinshake-low-sugar-chocolate-mousse-45"],
    relatedLinks: [
      { href: "/brands/flymill", title: "플라이밀 브랜드 허브", description: "플라이밀 쉐이크 라인을 브랜드 단위로 봅니다." },
      { href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", title: "저당 단백질 쉐이크", description: "당류 기준으로 다시 제품을 비교합니다." },
    ],
  },
  {
    slug: "takefit-max-vs-takefit-monster",
    title: "테이크핏 몬스터 vs 맥스 성분·칼로리 차이 | 단백질 45g·24g 비교",
    description: "테이크핏 맥스 250mL·24g과 몬스터 350mL·45g의 칼로리, 당류, 단백질 밀도를 직접 비교해 매일용과 집중 보충용 차이를 정리했습니다.",
    intro: "테이크핏 맥스와 몬스터는 같은 브랜드지만 맥스는 250mL·단백질 24g인 매일용 표준형, 몬스터는 350mL·45g인 집중 보충형입니다. 두 제품의 칼로리·당류·단백질 밀도를 나란히 비교해 운동량과 한 번에 마시는 부담에 맞는 선택을 정리했습니다.",
    bullets: ["테이크핏 맥스 24g vs 몬스터 45g 차이", "250mL vs 350mL 용량 선택 기준", "칼로리·당류·단백질 밀도 비교"],
    productSlugs: ["takefit-max-goso-250", "takefit-monster-goso-350"],
    relatedLinks: [
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "테이크핏 전 제품 라인업을 확인합니다." },
      { href: "/guides/product-selection-comparison/takefit-lineup", title: "테이크핏 맥스·몬스터·프로·익스트림 비교", description: "두 제품 외에 워터형 프로와 60g대 익스트림까지 전체 라인업을 비교합니다." },
      { href: "/guides/product-selection-comparison/high-protein-40g-comparison", title: "40g 이상 고단백 음료 비교", description: "몬스터를 다른 40g대 고단백 RTD와 나란히 비교합니다." },
      { href: "/topics/high-protein-drink-20g", title: "고단백 음료 20g 이상", description: "단백질 함량 기준으로 전체 후보군을 봅니다." },
    ],
  },
  {
    slug: "takefit-vs-newcare",
    title: "테이크핏 vs 뉴케어 올프로틴 비교",
    description: "테이크핏 맥스와 뉴케어 올프로틴을 단백질 함량, 당류, 칼로리, 가격 기준으로 비교합니다.",
    intro: "편의점·마트에서 쉽게 볼 수 있는 두 RTD 단백질 음료를 성분 기준으로 직접 비교합니다.",
    bullets: ["국내 대표 RTD 단백질 음료 비교", "남양유업 vs 대상웰라이프 브랜드 대결", "운동 후 보충·일상 섭취 관점 모두 제시"],
    productSlugs: ["takefit-max-goso-250", "newcare-all-protein-choco-245"],
    relatedLinks: [
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "테이크핏 전 제품을 한 번에 봅니다." },
      { href: "/brands/newcare", title: "뉴케어 브랜드 허브", description: "뉴케어 전 제품을 한 번에 봅니다." },
    ],
  },
  {
    slug: "danbaek-vs-takefit",
    title: "더단백 드링크 vs 테이크핏 비교",
    description: "빙그레 더단백 드링크와 남양 테이크핏을 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "편의점에서 나란히 놓인 더단백과 테이크핏을 성분표 기준으로 골라내는 비교 랜딩입니다.",
    bullets: ["빙그레 vs 남양 RTD 단백질 비교", "편의점 구매 시 선택 기준 제시", "저당·고단백 라인 비교"],
    productSlugs: ["danbaek-drink-coffee-250", "takefit-max-choco-250"],
    relatedLinks: [
      { href: "/brands/danbaek", title: "더단백 브랜드 허브", description: "빙그레 더단백 전 라인을 확인합니다." },
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "남양 테이크핏 전 라인을 확인합니다." },
    ],
  },
  {
    slug: "newcare-vs-hymune",
    title: "뉴케어 올프로틴 25g vs 하이뮨 액티브 20g | RTD 성분 비교",
    description: "뉴케어 올프로틴 초콜릿 25g과 하이뮨 액티브 딥초코 20g의 칼로리·당류·단백질 밀도를 비교해 운동 후 RTD 선택 차이를 정리합니다.",
    intro: "이 페이지는 뉴케어와 하이뮨의 전체 브랜드 비교가 아니라, 뉴케어 올프로틴 초콜릿 245mL·25g과 하이뮨 액티브 딥초코 250mL·20g 두 RTD의 직접 비교입니다. 비슷한 용량에서 단백질 총량과 칼로리 차이를 확인할 수 있습니다.",
    bullets: ["뉴케어 25g vs 하이뮨 액티브 20g", "245mL vs 250mL 비슷한 용량 비교", "칼로리·당류·단백질 밀도 차이"],
    productSlugs: ["newcare-all-protein-choco-245", "hymune-balance-active-deepchoco-250"],
    relatedLinks: [
      { href: "/brands/newcare", title: "뉴케어 브랜드 허브", description: "뉴케어 전 제품을 확인합니다." },
      { href: "/brands/hymune", title: "하이뮨 브랜드 허브", description: "하이뮨 전 제품을 확인합니다." },
      { href: "/guides/product-selection-comparison/newcare-vs-hymune", title: "뉴케어 41g vs 하이뮨 10g 시니어 비교", description: "부모님·50대 검색 의도라면 고단백형과 일상 영양보완형 차이를 확인합니다." },
    ],
  },
  {
    slug: "sellex-vs-takefit",
    title: "셀렉스 프로핏 vs 테이크핏 맥스 비교",
    description: "매일유업 셀렉스 프로핏과 남양 테이크핏 맥스를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "퍼포먼스와 일상 보충을 각각 대표하는 셀렉스와 테이크핏을 성분 기준으로 비교합니다.",
    bullets: ["셀렉스 vs 테이크핏 대표 제품 비교", "운동 목적별 선택 기준 제시", "브랜드 검색 유입 대응"],
    productSlugs: ["sellex-profit-milk-vanilla-250", "takefit-max-goso-250"],
    relatedLinks: [
      { href: "/brands/sellex", title: "셀렉스 브랜드 허브", description: "셀렉스 전 제품을 확인합니다." },
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "테이크핏 전 제품을 확인합니다." },
    ],
  },
  {
    slug: "takefit-pro-500-vs-max-250",
    title: "테이크핏 프로 500mL vs 테이크핏 맥스 250mL 비교",
    description: "테이크핏 프로 500mL PET병과 테이크핏 맥스 250mL를 단백질, 칼로리, 가성비 기준으로 비교합니다.",
    intro: "같은 브랜드 내에서 용량과 타겟이 다른 프로 라인과 맥스 라인을 성분 기준으로 구분합니다.",
    bullets: ["테이크핏 프로 vs 맥스 완전 분석", "500mL vs 250mL 용량별 선택 기준", "다이어트·벌크업 목적별 추천"],
    productSlugs: ["takefit-pro-lemon-500", "takefit-max-goso-250"],
    relatedLinks: [
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "테이크핏 전 라인업을 한 번에 봅니다." },
      { href: "/compare/takefit-max-vs-takefit-monster", title: "테이크핏 맥스 vs 몬스터", description: "맥스와 몬스터 용량 차이를 비교합니다." },
    ],
  },
  {
    slug: "high-protein-vs-moderate-protein",
    title: "고단백 52g vs 중단백 25g, 나는 어느 쪽이 맞을까",
    description: "초고단백 52g 음료와 중단백 25g 음료를 비교하며 내게 맞는 단백질 함량 구간을 판단하는 기준을 정리했습니다.",
    intro: "40g 이상 초고단백 제품이 늘고 있지만, 실제로는 소수의 헤비 유저가 반복 구매하고 대다수는 과다 섭취·소화 부담·맛 피로감 때문에 망설입니다. 두 구간을 직접 비교해 내게 맞는 쪽을 판단해보세요.",
    bullets: ["초고단백 vs 중단백 판단 기준 제시", "운동 강도·하루 목표량 기준으로 구분", "부담 없이 꾸준히 마실 수 있는 구간 안내"],
    productSlugs: ["labnosh-protein-max-choco-400", "newcare-all-protein-choco-245"],
    relatedLinks: [
      { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "고단백 음료 부담·부작용 가이드", description: "60g대 제품까지 나온 지금, 실제 부담 요인을 정리했습니다." },
      { href: "/topics/mid-protein-alternatives", title: "중단백 대안 추천", description: "부담 없는 20~29g대 제품만 모아 봅니다." },
    ],
  },
  {
    slug: "drink-vs-bar-post-workout",
    title: "운동 후 단백질 음료 vs 단백질 바 비교",
    description: "운동 후 보충 관점에서 음료와 바를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "형태가 다른 카테고리를 직접 비교하는 입문형 랜딩입니다.",
    bullets: ["음료 vs 바 검색 의도 대응", "운동 후 보충 맥락 설명에 적합", "가이드 페이지로 이어지기 좋음"],
    productSlugs: ["newcare-all-protein-choco-245", "dryou-proteinbar-pro-crunch"],
    relatedLinks: [
      { href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake", title: "음료 vs 쉐이크 가이드", description: "형태별 차이를 읽을 수 있습니다." },
      { href: "/guides/intake-strategy-health/post-workout-protein", title: "운동 후 단백질 가이드", description: "보충 타이밍과 기준을 확인합니다." },
    ],
  },
  {
    slug: "hymune-active-vs-ultra",
    title: "하이뮨 액티브 vs 울트라 비교 | 단백질·당류·칼로리",
    description: "하이뮨 액티브 딥초코 1병(250mL)은 단백질 20g·당류 0g·110kcal, 울트라 1병(400mL)은 단백질 49g·당류 0.9g·250kcal입니다.",
    intro: "하이뮨 액티브 딥초코 1병(250mL)과 울트라 1병(400mL)을 용량과 영양성분표 수치로 비교합니다. 액티브는 단백질 20g, 울트라는 단백질 49g으로 표시되어 있습니다.",
    bullets: ["액티브 딥초코 1병(250mL): 단백질 20g·당류 0g·110kcal", "울트라 1병(400mL): 단백질 49g·당류 0.9g·250kcal", "1병 용량 비교: 액티브 250mL·울트라 400mL"],
    productSlugs: ["hymune-balance-active-deepchoco-250", "hymune-ultra-400"],
    relatedLinks: [
      { href: "/brands/hymune", title: "하이뮨 브랜드 허브", description: "하이뮨 음료와 바 제품을 함께 확인합니다." },
      { href: "/guides/product-selection-comparison/himune-lineup", title: "하이뮨 라인업 가이드", description: "하이뮨 제품군의 성분표를 이어서 비교합니다." },
      { href: "/drinks", title: "단백질 음료 전체 비교", description: "등록된 음료를 같은 항목으로 비교합니다." },
    ],
  },
  {
    slug: "sellex-profit-vs-lactosefree",
    title: "셀렉스 프로핏 vs 락토프리 비교 | 성분·용량",
    description: "셀렉스 프로핏 밀크 바닐라 1병(250mL)은 단백질 20g·당류 0g·105kcal, 프로틴 락토프리 오리지널 1팩(190mL)은 단백질 14g·당류 1.4g·140kcal입니다.",
    intro: "셀렉스 프로핏 밀크 바닐라 1병(250mL)과 프로틴 락토프리 오리지널 1팩(190mL)을 비교합니다. 표시 단백질은 각각 20g과 14g이며, 당류는 각각 0g과 1.4g입니다.",
    bullets: ["프로핏 밀크 바닐라 1병(250mL): 단백질 20g·당류 0g·105kcal", "프로틴 락토프리 오리지널 1팩(190mL): 단백질 14g·당류 1.4g·140kcal", "1회 용량 비교: 프로핏 250mL·락토프리 190mL"],
    productSlugs: ["sellex-profit-milk-vanilla-250", "sellex-protein-lactosefree-original-190"],
    relatedLinks: [
      { href: "/brands/sellex", title: "셀렉스 브랜드 허브", description: "셀렉스 전체 제품을 확인합니다." },
      { href: "/guides/product-selection-comparison/selexs-lineup", title: "셀렉스 라인업 가이드", description: "셀렉스 제품군을 성분 기준으로 비교합니다." },
      { href: "/guides/product-selection-comparison/lactose-free-protein-drink", title: "락토프리 단백질 음료 가이드", description: "락토프리 음료 후보를 함께 확인합니다." },
    ],
  },
  {
    slug: "sellex-profit-flavor-comparison",
    title: "셀렉스 프로핏 맛 비교 | 밀크 바닐라·딸기초코·모카 초콜릿",
    description: "셀렉스 프로핏 밀크 바닐라·딸기초코·모카 초콜릿은 모두 1병 250mL·단백질 20g·당류 0g이며, 열량은 각각 105kcal·100kcal·105kcal입니다.",
    intro: "셀렉스 프로핏 3가지 맛을 1병(250mL) 기준으로 비교합니다. 세 제품은 단백질 20g과 당류 0g이 같고, 딸기초코는 100kcal, 밀크 바닐라와 모카 초콜릿은 105kcal입니다.",
    bullets: ["밀크 바닐라 1병(250mL): 단백질 20g·당류 0g·105kcal", "딸기초코 1병(250mL): 단백질 20g·당류 0g·100kcal", "모카 초콜릿 1병(250mL): 단백질 20g·당류 0g·105kcal"],
    productSlugs: ["sellex-profit-milk-vanilla-250", "sellex-profit-strawberry-choco-250", "sellex-profit-mocha-chocolate-250"],
    relatedLinks: [
      { href: "/brands/sellex", title: "셀렉스 브랜드 허브", description: "셀렉스 전체 제품과 맛을 확인합니다." },
      { href: "/guides/product-selection-comparison/selexs-lineup", title: "셀렉스 라인업 가이드", description: "프로핏 외 셀렉스 제품군도 비교합니다." },
      { href: "/drinks", title: "단백질 음료 전체 비교", description: "등록된 음료를 성분 기준으로 비교합니다." },
    ],
  },
  {
    slug: "labnosh-protein-drink-vs-max",
    title: "랩노쉬 프로틴 드링크 성분·칼로리 | 맥스 52g과 비교",
    description: "랩노쉬 프로틴 드링크 퍼펙트 초코 1병(350mL)은 단백질 27g·당류 0g·135kcal, 맥스 초코 1병(400mL)은 단백질 52g·당류 0g·235kcal입니다.",
    intro: "랩노쉬 프로틴 드링크 퍼펙트 초코 1병(350mL)과 맥스 초코 1병(400mL)을 비교합니다. 표시 단백질은 각각 27g과 52g이며 두 제품 모두 당류 0g입니다.",
    bullets: ["퍼펙트 초코 1병(350mL): 단백질 27g·당류 0g·135kcal", "맥스 초코 1병(400mL): 단백질 52g·당류 0g·235kcal", "1병 용량 비교: 퍼펙트 초코 350mL·맥스 초코 400mL"],
    productSlugs: ["labnosh-protein-perfect-choco-350", "labnosh-protein-max-choco-400"],
    relatedLinks: [
      { href: "/brands/labnosh", title: "랩노쉬 브랜드 허브", description: "랩노쉬 드링크와 쉐이크를 함께 확인합니다." },
      { href: "/guides/product-selection-comparison/labnosh-lineup", title: "랩노쉬 라인업 가이드", description: "랩노쉬 제품군의 성분 차이를 확인합니다." },
      { href: "/guides/product-selection-comparison/high-protein-50g-comparison", title: "단백질 50g대 음료 비교", description: "고함량 음료 후보를 이어서 비교합니다." },
    ],
  },
  {
    slug: "doctoru-40g-vs-62g-drink",
    title: "닥터유 40g vs 62g 비교 | 용량·당류·칼로리",
    description: "닥터유 프로 단백질 드링크 초콜릿 1병(350mL)은 단백질 40g·당류 4.2g·247kcal, 말차맛 1병(450mL)은 단백질 62g·당류 3.6g·329kcal입니다.",
    intro: "닥터유 프로 단백질 드링크 초콜릿 1병(350mL)과 말차맛 1병(450mL)을 비교합니다. 표시 단백질은 각각 40g과 62g이며, 용량은 각각 350mL와 450mL입니다.",
    bullets: ["초콜릿 1병(350mL): 단백질 40g·당류 4.2g·247kcal", "말차맛 1병(450mL): 단백질 62g·당류 3.6g·329kcal", "1병 용량 비교: 초콜릿 350mL·말차맛 450mL"],
    productSlugs: ["dryou-protein-40g-choco-350", "dryou-protein-62g-matcha-450"],
    relatedLinks: [
      { href: "/brands/dryou", title: "닥터유 브랜드 허브", description: "닥터유 음료와 바 제품을 확인합니다." },
      { href: "/guides/product-selection-comparison/doctoru-lineup", title: "닥터유 라인업 가이드", description: "닥터유 단백질 음료 제품군을 비교합니다." },
      { href: "/guides/product-selection-comparison/high-protein-50g-comparison", title: "단백질 50g대 음료 비교", description: "고함량 음료를 같은 기준으로 확인합니다." },
    ],
  },
  {
    slug: "kirkland-vs-quest-proteinbar",
    title: "커클랜드 vs 퀘스트 프로틴바 비교 | 단백질·당류·칼로리",
    description: "커클랜드 초콜릿 브라우니 1개(60g)는 단백질 21g·당류 1g·190kcal, 퀘스트 더블 초콜릿 청크 1개(60g)는 단백질 20g·당류 1g·180kcal입니다.",
    intro: "커클랜드 초콜릿 브라우니와 퀘스트 더블 초콜릿 청크를 각각 1개(60g) 기준으로 비교합니다. 단백질은 21g과 20g, 당류는 두 제품 모두 1g입니다.",
    bullets: ["커클랜드 초콜릿 브라우니 1개(60g): 단백질 21g·당류 1g·190kcal", "퀘스트 더블 초콜릿 청크 1개(60g): 단백질 20g·당류 1g·180kcal", "1개 중량 비교: 커클랜드 60g·퀘스트 60g"],
    productSlugs: ["kirkland-proteinbar-choco-brownie", "quest-nutrition-protein-bar-double-chocolate-chunk-60"],
    relatedLinks: [
      { href: "/compare/kirkland-proteinbar-flavor-comparison", title: "커클랜드 맛별 비교", description: "커클랜드 두 가지 맛의 성분과 열량을 확인합니다." },
      { href: "/brands/kirkland", title: "커클랜드 브랜드 허브", description: "커클랜드 등록 제품을 확인합니다." },
      { href: "/brands/quest-nutrition", title: "퀘스트 뉴트리션 브랜드 허브", description: "퀘스트 프로틴바 맛별 제품을 확인합니다." },
      { href: "/bars", title: "단백질 바 전체 비교", description: "등록된 단백질 바를 같은 항목으로 비교합니다." },
    ],
  },
  {
    slug: "proteone-vs-flymill-shake",
    title: "프로티원 vs 플라이밀 쉐이크 비교 | 단백질·당류·칼로리",
    description: "프로티원 초코 1회(40g)는 단백질 23g·당류 1g·128kcal, 플라이밀 초코 1회(45g)는 단백질 22g·당류 3.6g·150kcal입니다.",
    intro: "프로티원 초코 1회(40g)와 플라이밀 초코 1회(45g)를 비교합니다. 표시 단백질은 각각 23g과 22g이며, 당류는 각각 1g과 3.6g입니다.",
    bullets: ["프로티원 초코 1회(40g): 단백질 23g·당류 1g·128kcal", "플라이밀 초코 1회(45g): 단백질 22g·당류 3.6g·150kcal", "1회 제공량 비교: 프로티원 40g·플라이밀 45g"],
    productSlugs: ["proteone-proteinshake-choco-40", "flymill-proteinshake-choco-45"],
    relatedLinks: [
      { href: "/brands/proteone", title: "프로티원 브랜드 허브", description: "프로티원 쉐이크 맛별 제품을 확인합니다." },
      { href: "/brands/flymill", title: "플라이밀 브랜드 허브", description: "플라이밀 쉐이크 맛별 제품을 확인합니다." },
      { href: "/shake", title: "단백질 쉐이크 전체 비교", description: "등록된 쉐이크를 성분 기준으로 비교합니다." },
    ],
  },
  {
    slug: "danbaek-vs-hymune-choco-drink",
    title: "더단백 vs 하이뮨 비교 | 초콜릿 단백질 음료 성분",
    description: "더단백 초콜릿 1병(250mL)은 단백질 20g·당류 0.8g·105kcal, 하이뮨 액티브 딥초코 1병(250mL)은 단백질 20g·당류 0g·110kcal입니다.",
    intro: "더단백 초콜릿과 하이뮨 액티브 딥초코를 각각 1병(250mL) 기준으로 비교합니다. 두 제품은 단백질 20g이 같고, 당류는 각각 0.8g과 0g입니다.",
    bullets: ["더단백 초콜릿 1병(250mL): 단백질 20g·당류 0.8g·105kcal", "하이뮨 액티브 딥초코 1병(250mL): 단백질 20g·당류 0g·110kcal", "1병 용량과 단백질 비교: 두 제품 모두 250mL·20g"],
    productSlugs: ["danbaek-drink-chocolate-250", "hymune-balance-active-deepchoco-250"],
    relatedLinks: [
      { href: "/brands/danbaek", title: "더단백 브랜드 허브", description: "더단백 음료와 쉐이크를 확인합니다." },
      { href: "/brands/hymune", title: "하이뮨 브랜드 허브", description: "하이뮨 전체 제품을 확인합니다." },
      { href: "/guides/product-selection-comparison/danbaek-vs-himune", title: "더단백·하이뮨 가이드", description: "두 브랜드의 제품군을 이어서 살펴봅니다." },
    ],
  },
  {
    slug: "labnosh-max-vs-takefit-monster",
    title: "랩노쉬 맥스 vs 테이크핏 몬스터 비교 | 고단백 음료 성분",
    description: "랩노쉬 맥스 초코 1병(400mL)은 단백질 52g·당류 0g·235kcal, 테이크핏 몬스터 고소한맛 1병(350mL)은 단백질 45g·당류 1g·195kcal입니다.",
    intro: "랩노쉬 맥스 초코 1병(400mL)과 테이크핏 몬스터 고소한맛 1병(350mL)을 비교합니다. 표시 단백질은 각각 52g과 45g이며, 당류는 각각 0g과 1g입니다.",
    bullets: ["랩노쉬 맥스 초코 1병(400mL): 단백질 52g·당류 0g·235kcal", "테이크핏 몬스터 고소한맛 1병(350mL): 단백질 45g·당류 1g·195kcal", "1병 용량 비교: 랩노쉬 맥스 400mL·테이크핏 몬스터 350mL"],
    productSlugs: ["labnosh-protein-max-choco-400", "takefit-monster-goso-350"],
    relatedLinks: [
      { href: "/brands/labnosh", title: "랩노쉬 브랜드 허브", description: "랩노쉬 전체 제품을 확인합니다." },
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "테이크핏 전체 제품을 확인합니다." },
      { href: "/guides/product-selection-comparison/high-protein-50g-comparison", title: "단백질 50g대 음료 비교", description: "고함량 음료 후보를 이어서 확인합니다." },
    ],
  },
  {
    slug: "newcare-41g-vs-takefit-monster",
    title: "뉴케어 41g vs 테이크핏 몬스터 비교 | 단백질·당류·칼로리",
    description: "뉴케어 올프로틴 41g 초코맛 1병(350mL)은 단백질 41g·당류 0.8g·210kcal, 테이크핏 몬스터 고소한맛 1병(350mL)은 단백질 45g·당류 1g·195kcal입니다.",
    intro: "뉴케어 올프로틴 41g 초코맛과 테이크핏 몬스터 고소한맛을 각각 1병(350mL) 기준으로 비교합니다. 표시 단백질은 41g과 45g, 당류는 0.8g과 1g입니다.",
    bullets: ["뉴케어 올프로틴 41g 초코맛 1병(350mL): 단백질 41g·당류 0.8g·210kcal", "테이크핏 몬스터 고소한맛 1병(350mL): 단백질 45g·당류 1g·195kcal", "1병 용량 비교: 두 제품 모두 350mL"],
    productSlugs: ["newcare-all-protein-41g", "takefit-monster-goso-350"],
    relatedLinks: [
      { href: "/brands/newcare", title: "뉴케어 브랜드 허브", description: "뉴케어 전체 제품을 확인합니다." },
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "테이크핏 전체 제품을 확인합니다." },
      { href: "/guides/product-selection-comparison/high-protein-40g-comparison", title: "단백질 40g대 음료 비교", description: "고함량 음료 후보를 같은 기준으로 비교합니다." },
    ],
  },
  {
    slug: "doctoru-62g-vs-takefit-extreme",
    title: "닥터유 62g vs 테이크핏 익스트림 비교 | 450mL 고단백 음료",
    description: "닥터유 프로 단백질 드링크 말차맛 1병(450mL)은 단백질 62g·당류 3.6g·329kcal, 테이크핏 익스트림 1병(450mL)은 단백질 60g·당류 1.3g·259kcal입니다.",
    intro: "닥터유 프로 단백질 드링크 말차맛과 테이크핏 익스트림을 각각 1병(450mL) 기준으로 비교합니다. 표시 단백질은 62g과 60g, 당류는 3.6g과 1.3g입니다.",
    bullets: ["닥터유 말차맛 1병(450mL): 단백질 62g·당류 3.6g·329kcal", "테이크핏 익스트림 1병(450mL): 단백질 60g·당류 1.3g·259kcal", "1병 용량 비교: 두 제품 모두 450mL"],
    productSlugs: ["dryou-protein-62g-matcha-450", "takefit-extreme-450"],
    relatedLinks: [
      { href: "/brands/dryou", title: "닥터유 브랜드 허브", description: "닥터유 전체 제품을 확인합니다." },
      { href: "/brands/takefit", title: "테이크핏 브랜드 허브", description: "테이크핏 전체 제품을 확인합니다." },
      { href: "/guides/product-selection-comparison/high-protein-50g-comparison", title: "단백질 50g대 음료 비교", description: "고함량 음료의 성분표를 이어서 확인합니다." },
    ],
  },
  {
    slug: "proteone-vs-labnosh-shake",
    title: "프로티원 vs 랩노쉬 쉐이크 비교 | 초코 성분·용량",
    description: "프로티원 초코 1회(40g)는 단백질 23g·당류 1g·128kcal, 랩노쉬 슬림쉐이크 더블초코 1회(45g)는 단백질 20g·당류 1.1g·165kcal입니다.",
    intro: "프로티원 초코 1회(40g)와 랩노쉬 슬림쉐이크 더블초코 1회(45g)를 비교합니다. 표시 단백질은 각각 23g과 20g이며, 당류는 각각 1g과 1.1g입니다.",
    bullets: ["프로티원 초코 1회(40g): 단백질 23g·당류 1g·128kcal", "랩노쉬 더블초코 1회(45g): 단백질 20g·당류 1.1g·165kcal", "1회 제공량 비교: 프로티원 40g·랩노쉬 45g"],
    productSlugs: ["proteone-proteinshake-choco-40", "labnosh-slimshake-double-choco-45"],
    relatedLinks: [
      { href: "/brands/proteone", title: "프로티원 브랜드 허브", description: "프로티원 쉐이크 맛별 제품을 확인합니다." },
      { href: "/brands/labnosh", title: "랩노쉬 브랜드 허브", description: "랩노쉬 쉐이크와 음료를 확인합니다." },
      { href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", title: "저당 단백질 쉐이크 가이드", description: "당류가 낮은 쉐이크 후보를 이어서 비교합니다." },
    ],
  },
  {
    slug: "barebells-vs-quest-proteinbar",
    title: "베어벨즈(베어벨스) vs 퀘스트 단백질바 비교 | 성분·당류·칼로리",
    description: `${formatBarNutrition("베어벨즈 쿠키 앤 크림", barebellsQuestProducts.barebells)}, ${formatBarNutrition("퀘스트 쿠키 앤 크림", barebellsQuestProducts.quest)}입니다.`,
    intro: `베어벨즈와 퀘스트의 쿠키 앤 크림 제품을 1개 기준으로 비교합니다. 표시 단백질은 각각 ${barebellsQuestProducts.barebells.proteinPerServing}g과 ${barebellsQuestProducts.quest.proteinPerServing}g이며, 당류는 각각 ${barebellsQuestProducts.barebells.sugar}g과 ${barebellsQuestProducts.quest.sugar}g입니다.`,
    bullets: [
      formatBarNutrition("베어벨즈 쿠키 앤 크림", barebellsQuestProducts.barebells),
      formatBarNutrition("퀘스트 쿠키 앤 크림", barebellsQuestProducts.quest),
      `1개 중량 비교: 베어벨즈 ${barebellsQuestProducts.barebells.capacity}·퀘스트 ${barebellsQuestProducts.quest.capacity}`,
    ],
    productSlugs: [barebellsQuestProducts.barebells.slug, barebellsQuestProducts.quest.slug],
    relatedLinks: [
      { href: "/brands/barebells", title: "베어벨즈 브랜드 허브", description: "베어벨즈 일반·소프트 프로틴바를 확인합니다." },
      { href: "/brands/quest-nutrition", title: "퀘스트 뉴트리션 브랜드 허브", description: "퀘스트 프로틴바 맛별 제품을 확인합니다." },
      { href: "/compare/barebells-proteinbar-flavor-comparison", title: "베어벨즈 맛별 비교", description: "베어벨즈 일반·소프트 라인의 성분 범위를 비교합니다." },
    ],
  },
  {
    slug: "barebells-vs-grenade-proteinbar",
    title: "베어벨즈(베어벨스) vs 그레네이드 카브킬라 비교 | 성분·당류·칼로리",
    description: `${formatBarNutrition("베어벨즈 피넛 버터", barebellsGrenadeProducts.barebells)}, ${formatBarNutrition("그레네이드 카브킬라 피넛 너터", barebellsGrenadeProducts.grenade)}입니다.`,
    intro: `베어벨즈 피넛 버터와 그레네이드 카브킬라 피넛 너터를 1개 기준으로 비교합니다. 표시 단백질은 각각 ${barebellsGrenadeProducts.barebells.proteinPerServing}g과 ${barebellsGrenadeProducts.grenade.proteinPerServing}g이며, 당류는 각각 ${barebellsGrenadeProducts.barebells.sugar}g과 ${barebellsGrenadeProducts.grenade.sugar}g입니다.`,
    bullets: [
      formatBarNutrition("베어벨즈 피넛 버터", barebellsGrenadeProducts.barebells),
      formatBarNutrition("그레네이드 카브킬라 피넛 너터", barebellsGrenadeProducts.grenade),
      `1개 중량 비교: 베어벨즈 ${barebellsGrenadeProducts.barebells.capacity}·그레네이드 ${barebellsGrenadeProducts.grenade.capacity}`,
    ],
    productSlugs: [barebellsGrenadeProducts.barebells.slug, barebellsGrenadeProducts.grenade.slug],
    relatedLinks: [
      { href: "/brands/barebells", title: "베어벨즈 브랜드 허브", description: "베어벨즈 일반·소프트 프로틴바를 확인합니다." },
      { href: "/brands/grenade", title: "그레네이드 브랜드 허브", description: "등록된 그레네이드 카브킬라 제품을 확인합니다." },
      { href: "/bars", title: "단백질 바 전체 비교", description: "등록된 단백질 바를 같은 항목으로 비교합니다." },
    ],
  },
  {
    slug: "barebells-proteinbar-flavor-comparison",
    title: "베어벨즈(베어벨스) 프로틴바 맛별 비교 | 일반·소프트 성분·당류·칼로리",
    description: `등록된 베어벨즈 ${barebellsFlavorProducts.length}종을 비교합니다. 일반 프로틴바는 단백질 ${formatProductRange(barebellsRegularProducts, (product) => product.proteinPerServing)}g, 소프트 프로틴바는 ${formatProductRange(barebellsSoftProducts, (product) => product.proteinPerServing)}g입니다.`,
    intro: `베어벨즈 일반 프로틴바 ${barebellsRegularProducts.length}종과 소프트 프로틴바 ${barebellsSoftProducts.length}종을 1개(${barebellsFlavorProducts[0].capacity}) 기준으로 비교합니다. 일반 라인과 소프트 라인의 단백질·당류·칼로리 범위를 함께 확인할 수 있습니다.`,
    bullets: [
      `일반 프로틴바 ${barebellsRegularProducts.length}종: 단백질 ${formatProductRange(barebellsRegularProducts, (product) => product.proteinPerServing)}g·당류 ${formatProductRange(barebellsRegularProducts, (product) => product.sugar ?? 0)}g·${formatProductRange(barebellsRegularProducts, (product) => product.calories ?? 0)}kcal`,
      `소프트 프로틴바 ${barebellsSoftProducts.length}종: 단백질 ${formatProductRange(barebellsSoftProducts, (product) => product.proteinPerServing)}g·당류 ${formatProductRange(barebellsSoftProducts, (product) => product.sugar ?? 0)}g·${formatProductRange(barebellsSoftProducts, (product) => product.calories ?? 0)}kcal`,
      `등록 제품 ${barebellsFlavorProducts.length}종은 모두 1개 ${barebellsFlavorProducts[0].capacity} 기준으로 비교합니다.`,
    ],
    productSlugs: barebellsFlavorProducts.map((product) => product.slug),
    relatedLinks: [
      { href: "/brands/barebells", title: "베어벨즈 브랜드 허브", description: "베어벨즈 등록 제품의 상세 성분을 확인합니다." },
      { href: "/compare/barebells-vs-quest-proteinbar", title: "베어벨즈 vs 퀘스트", description: "쿠키 앤 크림 제품의 성분표를 비교합니다." },
      { href: "/compare/barebells-vs-grenade-proteinbar", title: "베어벨즈 vs 그레네이드", description: "피넛 계열 제품의 성분표를 비교합니다." },
    ],
  },
  {
    slug: "kirkland-proteinbar-flavor-comparison",
    title: "커클랜드 프로틴바 맛별 비교 | 성분·칼로리·맛",
    description: `등록된 커클랜드 프로틴바 ${kirklandFlavorProducts.length}종을 비교합니다. 한 개 기준 단백질 ${formatProductRange(kirklandFlavorProducts, (product) => product.proteinPerServing)}g, 당류 ${formatProductRange(kirklandFlavorProducts, (product) => product.sugar ?? 0)}g, 열량 ${formatProductRange(kirklandFlavorProducts, (product) => product.calories ?? 0)}kcal입니다.`,
    intro: `커클랜드 초콜릿 브라우니와 초코칩 쿠키도우를 한 개 기준으로 비교합니다. 두 제품의 단백질·당류·칼로리와 맛 이름을 등록 성분 데이터로 확인할 수 있습니다.`,
    bullets: kirklandFlavorProducts.map((product) => formatBarNutrition(product.name, product)),
    productSlugs: kirklandFlavorProducts.map((product) => product.slug),
    relatedLinks: [
      { href: "/brands/kirkland", title: "커클랜드 브랜드 허브", description: "커클랜드 등록 제품의 상세 성분을 확인합니다." },
      { href: "/compare/kirkland-vs-quest-proteinbar", title: "커클랜드 vs 퀘스트", description: "초콜릿 계열 프로틴바의 성분을 비교합니다." },
      { href: "/compare/doctoru-vs-kirkland-bar", title: "닥터유 vs 커클랜드", description: "국내외 프로틴바의 단백질·당류를 비교합니다." },
    ],
  },
];

const compareLandingOverrides: Record<string, Partial<CompareLanding>> = {
  "takefit-vs-hymune-drink": {
    title: "테이크핏 vs 하이뮨 단백질 음료 비교",
    description: "테이크핏과 하이뮨 단백질 음료를 단백질, 당류, 칼로리, 섭취 목적 기준으로 비교합니다.",
    intro:
      "테이크핏은 운동 후 가볍게 마시는 RTD 후보로, 하이뮨은 일상 보완과 중장년 건강관리 니즈까지 함께 비교되는 브랜드입니다. 두 제품은 브랜드 인지도보다 단백질 함량, 당류, 칼로리, 마시는 상황을 나눠 보는 편이 정확합니다.",
    bullets: [
      "운동 후 보충용인지, 식사 사이 일상 보완용인지 먼저 구분합니다.",
      "단백질 총량만 보지 말고 당류와 칼로리 부담을 같이 확인합니다.",
      "제품 상세에서 용량, 영양성분, 구매 채널까지 이어서 확인하기 좋은 조합입니다.",
    ],
    relatedLinks: [
      {
        href: "/brands/takefit",
        title: "테이크핏 전체 제품 보기",
        description: "테이크핏 라인업을 제품별 단백질, 당류, 칼로리 기준으로 다시 확인합니다.",
      },
      {
        href: "/brands/hymune",
        title: "하이뮨 전체 제품 보기",
        description: "하이뮨 음료와 관련 제품을 브랜드 단위로 모아 봅니다.",
      },
      {
        href: "/ranking",
        title: "단백질 음료 랭킹 보기",
        description: "두 제품이 전체 음료 후보 안에서 어떤 위치인지 함께 확인합니다.",
      },
    ],
  },
};

const compareLandingAliases: Record<string, string> = {
  // GA4/Search Console에서 유입이 확인된 기존 URL입니다.
  // 내부 데이터 slug는 제품 ID와 맞춰 hymune을 쓰지만, 사용자는 보통 브랜드명을 himune으로 검색합니다.
  "takefit-vs-himune-drink": "takefit-vs-hymune-drink",
  "sellex-vs-himune-drink": "sellex-vs-hymune-drink",
  "newcare-vs-himune": "newcare-vs-hymune",
};

function applyCompareLandingOverride(item: CompareLanding): CompareLanding {
  const override = compareLandingOverrides[item.slug];
  return override ? { ...item, ...override } : item;
}

// 손으로 쓴 랜딩 + 데이터로 만드는 랜딩(compareLandingsGenerated.ts). 같은 slug면 손으로 쓴 쪽을 쓴다.
let mergedLandings: CompareLanding[] | null = null;
function allLandings(): CompareLanding[] {
  if (!mergedLandings) {
    const own = new Set(compareLandings.map((item) => item.slug));
    mergedLandings = [...compareLandings, ...getGeneratedCompareLandings().filter((item) => !own.has(item.slug))];
  }
  return mergedLandings;
}

export function getAllCompareLandings() {
  return allLandings().map(applyCompareLandingOverride);
}

export function getAllCompareLandingStaticSlugs() {
  const canonicalSlugs = allLandings().map((item) => item.slug);
  return [...canonicalSlugs, ...Object.keys(compareLandingAliases)];
}

export function getCompareLandingBySlug(slug: string) {
  const canonicalSlug = compareLandingAliases[slug] ?? slug;
  const landing = allLandings().find((item) => item.slug === canonicalSlug);
  return landing ? withAutoRelatedLandings(applyCompareLandingOverride(landing), allLandings()) : null;
}
