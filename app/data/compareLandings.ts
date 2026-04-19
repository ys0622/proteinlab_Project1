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
    slug: "doctoru-vs-benof-softbar",
    title: "닥터유 vs 베노프 소프트바 비교",
    description: "닥터유 프로틴바와 베노프 소프트바를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "보다 부드러운 식감을 찾는 사용자에게 맞는 바 비교 랜딩입니다.",
    bullets: ["소프트바 수요 대응", "간식형 단백질 바 비교", "상세 페이지 진입용 고정 랜딩"],
    productSlugs: ["dryou-proteinbar-pro-choco-classic", "benof-softbar-chocolate-caramel"],
    relatedLinks: [
      { href: "/topics/high-protein-bar", title: "고단백 바 주제 랜딩", description: "단백질 함량이 높은 바만 다시 모아 봅니다." },
      { href: "/recommend", title: "맞춤 추천", description: "사용 목적에 맞는 카테고리별 제품을 다시 추립니다." },
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
    title: "그릭데이 vs 매일 바이오 그릭요거트 비교",
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
    title: "프로티원 vs 잇더핏 단백질 쉐이크 비교",
    description: "프로티원과 잇더핏 쉐이크를 단백질, 당류, 칼로리 기준으로 비교합니다.",
    intro: "국내 파우치형 쉐이크 중 저당 성향 제품을 찾을 때 자주 비교되는 조합입니다.",
    bullets: ["국내 쉐이크 브랜드 비교", "저당 파우치형 탐색에 적합", "브랜드별 제품을 함께 비교하기 좋음"],
    productSlugs: ["proteone-proteinshake-choco-40", "itthefit-proteinshake-double-choco-40"],
    relatedLinks: [
      { href: "/topics/meal-replacement-protein-shake", title: "식사대용 쉐이크", description: "쉐이크 카테고리 전체를 다시 비교합니다." },
      { href: "/recommend", title: "맞춤 추천", description: "운동 목적과 섭취 상황에 맞는 제품을 다시 추립니다." },
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
      { href: "/topics/low-sugar-protein-shake", title: "저당 단백질 쉐이크", description: "당류 기준으로 다시 제품을 비교합니다." },
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
