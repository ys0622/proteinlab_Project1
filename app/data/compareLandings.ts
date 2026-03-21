export interface CompareLanding {
  slug: string;
  title: string;
  description: string;
  intro: string;
  bullets: string[];
  productSlugs: string[];
  relatedLinks: { href: string; title: string; description: string }[];
}

const compareLandings: CompareLanding[] = [
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
    title: "닥터유 프로틴바 vs 커클랜드 프로틴바 비교",
    description: "국내 대표 프로틴바와 커클랜드 프로틴바를 단백질 총량과 당류 기준으로 비교합니다.",
    intro: "단백질 바 검색에서 자주 비교되는 조합을 고정 URL로 만든 랜딩입니다.",
    bullets: ["국내/해외 대표 프로틴바 비교", "고단백 바 검색어 대응", "상세 페이지 진입 유도에 적합"],
    productSlugs: ["dryou-proteinbar-pro-choco-classic", "kirkland-proteinbar-choco-brownie"],
    relatedLinks: [
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
    bullets: ["쉐이크 비교 검색 대응", "식사대용/보충형 판단에 유용", "추천 페이지와 연결하기 좋음"],
    productSlugs: ["labnosh-slimshake-injeolmi-45", "danbaekhani-proteinshake-signature-40"],
    relatedLinks: [
      { href: "/topics/meal-replacement-protein-shake", title: "식사대용 쉐이크 추천", description: "식사대용 기준의 전체 후보군을 확인합니다." },
      { href: "/recommend", title: "맞춤 추천", description: "운동 목적에 맞춰 카테고리를 다시 좁힙니다." },
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
];

export function getAllCompareLandings() {
  return compareLandings;
}

export function getCompareLandingBySlug(slug: string) {
  return compareLandings.find((item) => item.slug === slug) ?? null;
}
