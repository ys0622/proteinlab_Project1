import { barProductsWithGrades, mockProducts } from "../data/products";
import type { CurationDefinition, CurationGuideLink, CurationInfoSection } from "./curationSystem";
import { getCurationDefinition } from "./curationSystem";

type CategoryKey = "drink" | "bar" | "both";

interface LandingProfile {
  heroTitle?: string;
  heroDescription?: string;
  introText?: string;
  infoSections?: CurationInfoSection[];
  relatedGuideLinks?: CurationGuideLink[];
}

function getCategoryKey(curation: CurationDefinition): CategoryKey {
  const hasDrink = Boolean(curation.categories.drink);
  const hasBar = Boolean(curation.categories.bar);
  if (hasDrink && hasBar) return "both";
  return hasDrink ? "drink" : "bar";
}

function getCategoryLabel(categoryKey: CategoryKey) {
  if (categoryKey === "both") return "단백질 음료와 단백질 바";
  return categoryKey === "drink" ? "단백질 음료" : "단백질 바";
}

const landingProfiles: Record<string, Partial<Record<CategoryKey, LandingProfile>>> = {
  "zero-sugar": {
    drink: {
      heroTitle: "당류 0g 단백질 음료 추천",
      heroDescription:
        "당류를 최대한 줄이고 싶은 사용자에게 적합한 단백질 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "당류 부담을 줄이고 싶은 경우 먼저 확인해보세요.",
      infoSections: [
        {
          title: "당류 0g 제품을 보는 이유",
          bullets: [
            "당류 섭취를 최대한 줄이고 싶을 때 먼저 보기 좋습니다.",
            "식사 사이 가볍게 단백질만 보충하고 싶은 경우에 잘 맞습니다.",
            "단맛보다 성분 구성을 우선 보고 싶은 경우 비교 기준이 분명합니다.",
          ],
        },
      ],
    },
  },
  "light-protein-under-20": {
    drink: {
      heroTitle: "가볍게 마시기 좋은 단백질 음료 추천",
      heroDescription:
        "단백질 함량이 과하지 않아 일상적으로 마시기 쉬운 단백질 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "부담 없이 마시기 좋은 단백질 음료를 먼저 확인해보세요.",
      infoSections: [
        {
          title: "라이트 제품이 잘 맞는 상황",
          bullets: [
            "한 번에 과한 단백질보다 밸런스를 보고 싶은 경우",
            "식사 사이 간식 대용으로 마시고 싶은 경우",
            "초보자나 가벼운 보충용 제품을 찾는 경우",
          ],
        },
      ],
    },
  },
  "high-protein-20": {
    drink: {
      heroTitle: "고단백 단백질 음료 추천",
      heroDescription:
        "운동 후 회복이나 하루 단백질 보충량을 채우는 데 도움이 되는 고단백 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "한 번에 단백질을 충분히 보충하고 싶은 경우 먼저 확인해보세요.",
      infoSections: [
        {
          title: "고단백 음료를 먼저 보는 이유",
          bullets: [
            "운동 후 회복용으로 단백질 보충량을 빠르게 채우기 좋습니다.",
            "아침 식사나 간식에서 단백질 비중을 높이고 싶은 경우 선택지가 분명합니다.",
            "20g 이상 제품 안에서도 당류와 단백질 밀도를 함께 비교할 수 있습니다.",
          ],
        },
      ],
    },
  },
  "high-protein": {
    drink: {
      heroTitle: "초고단백 단백질 음료 추천",
      heroDescription:
        "한 번에 많은 단백질을 섭취하고 싶은 사용자에게 적합한 초고단백 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "단백질 함량을 최우선으로 볼 때 먼저 확인해보세요.",
      infoSections: [
        {
          title: "초고단백 제품이 필요한 상황",
          bullets: [
            "운동 강도가 높아 한 번에 큰 단백질량을 보충하고 싶은 경우",
            "식사 한 끼를 완전히 대체하진 않지만 단백질은 강하게 채우고 싶은 경우",
            "함량만 보지 않고 당류와 밀도까지 함께 확인해야 선택 실수가 줄어듭니다.",
          ],
        },
      ],
    },
  },
  "protein-water": {
    drink: {
      heroTitle: "워터형 단백질 음료 추천",
      heroDescription:
        "가볍고 깔끔하게 마시기 좋은 워터형 단백질 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "묵직한 타입보다 가볍게 마시고 싶다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "워터형이 잘 맞는 상황",
          bullets: [
            "운동 직후 부담 없이 마실 제품을 찾는 경우",
            "우유 베이스보다 깔끔한 타입을 선호하는 경우",
            "가벼운 음용감 안에서도 단백질 함량과 당류를 함께 확인할 수 있습니다.",
          ],
        },
      ],
    },
  },
  "lactose-free": {
    drink: {
      heroTitle: "락토프리 단백질 음료 추천",
      heroDescription:
        "유당 부담을 줄이고 싶은 사용자에게 적합한 락토프리 단백질 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "유당이 부담된다면 락토프리 제품부터 먼저 확인해보세요.",
      infoSections: [
        {
          title: "락토프리 제품을 볼 때",
          bullets: [
            "유당이 부담되는 경우 우선적으로 보기 좋은 기준입니다.",
            "락토프리라고 해서 모두 같은 영양 구성이 아니므로 단백질, 당류, 칼로리를 함께 봐야 합니다.",
            "ProteinLab에서는 락토프리 안에서도 단백질 밀도 차이를 같이 비교할 수 있습니다.",
          ],
        },
      ],
    },
  },
  "density-a": {
    drink: {
      heroTitle: "단백질 밀도 A 음료 추천",
      heroDescription:
        "같은 열량에서 단백질을 더 효율적으로 섭취할 수 있는 단백질 밀도 A 등급 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "효율적으로 단백질을 보충하고 싶다면 밀도 A 제품부터 확인해보세요.",
    },
    bar: {
      heroTitle: "단백질 밀도 높은 단백질 바 추천",
      heroDescription:
        "같은 열량에서 단백질을 효율적으로 섭취하기 좋은 단백질 밀도 상위 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "효율 좋은 단백질 바를 찾는다면 먼저 확인해보세요.",
    },
  },
  "diet-a": {
    drink: {
      heroTitle: "다이어트용 단백질 음료 추천",
      heroDescription:
        "칼로리와 당류 부담을 낮추면서 단백질을 보충하기 좋은 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "체중 관리 중에도 마시기 좋은 단백질 음료를 먼저 확인해보세요.",
      infoSections: [
        {
          title: "다이어트용 제품을 고를 때",
          bullets: [
            "칼로리와 당류를 낮추면서 단백질을 충분히 보충할 수 있는지가 중요합니다.",
            "단백질 함량만 높아도 열량이 높으면 일상 루틴에 부담이 될 수 있습니다.",
            "다이어트 큐레이션에서는 성분 밸런스가 좋은 제품을 우선 확인할 수 있습니다.",
          ],
        },
      ],
    },
  },
  "fitness-a": {
    drink: {
      heroTitle: "퍼포먼스용 단백질 음료 추천",
      heroDescription:
        "운동 후 단백질 보충 관점에서 성분 구성이 좋은 퍼포먼스 A 등급 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "운동 후 회복과 단백질 보충 효율을 함께 보고 싶다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "퍼포먼스 제품을 보는 이유",
          bullets: [
            "운동 후 단백질 보충량과 영양 구성을 함께 확인하고 싶은 경우 적합합니다.",
            "퍼포먼스 기준에서는 단백질 함량뿐 아니라 밀도와 당류까지 함께 보는 편이 좋습니다.",
            "회복용으로 먼저 볼 제품을 빠르게 좁히고 전체 비교로 이어갈 수 있습니다.",
          ],
        },
      ],
    },
  },
  vegan: {
    drink: {
      heroTitle: "식물성 단백질 음료 추천",
      heroDescription:
        "식물성 단백질 원료를 사용하는 단백질 음료를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "식물성 원료 기반 제품을 찾고 있다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "식물성 제품을 볼 때",
          bullets: [
            "원료 타입을 우선 보는 사용자에게 적합한 비교 기준입니다.",
            "식물성 제품 안에서도 단백질 함량과 당류, 칼로리 차이가 큽니다.",
            "ProteinLab에서는 식물성 제품끼리도 밀도와 효율을 함께 확인할 수 있습니다.",
          ],
        },
      ],
    },
  },
  "bar-high-protein-20": {
    bar: {
      heroTitle: "고단백 단백질 바 추천",
      heroDescription:
        "한 번에 20g 이상 단백질을 섭취할 수 있는 고단백 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "바 형태로도 단백질을 충분히 보충하고 싶다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "고단백 바를 먼저 보는 이유",
          bullets: [
            "간편하게 높은 단백질을 챙기고 싶은 경우 선택지가 명확합니다.",
            "고단백 바 안에서도 당류와 칼로리 차이가 커서 성분 비교가 중요합니다.",
            "운동 후, 이동 중, 간식 상황에 따라 더 맞는 제품을 고를 수 있습니다.",
          ],
        },
      ],
    },
  },
  "bar-high-protein-15": {
    bar: {
      heroTitle: "고단백 단백질 바 비교",
      heroDescription:
        "단백질 바 중에서도 단백질 함량이 높은 제품을 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "단백질 보충용 바를 찾는다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "15g 이상 제품을 보는 포인트",
          bullets: [
            "20g+보다 선택폭이 넓어 실제 구매 대안을 찾기 쉽습니다.",
            "단백질 함량이 높아도 당류와 칼로리 차이가 커서 함께 봐야 합니다.",
            "ProteinLab에서는 추천 제품과 전체 비교를 같은 기준으로 이어서 볼 수 있습니다.",
          ],
        },
      ],
    },
  },
  "bar-low-sugar": {
    bar: {
      heroTitle: "저당 단백질 바 추천",
      heroDescription:
        "당류 부담을 줄이고 싶은 사용자에게 적합한 저당 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "당류가 낮은 단백질 바를 먼저 비교해보세요.",
      infoSections: [
        {
          title: "저당 바를 볼 때",
          bullets: [
            "간식처럼 먹을 때 당류 부담을 줄이고 싶은 경우 먼저 보기 좋습니다.",
            "저당 제품 안에서도 단백질 함량과 칼로리 차이가 크기 때문에 같이 봐야 합니다.",
            "ProteinLab에서는 저당 기준 안에서도 단백질 밀도를 함께 비교할 수 있습니다.",
          ],
        },
      ],
    },
  },
  "bar-low-calorie": {
    bar: {
      heroTitle: "저칼로리 단백질 바 추천",
      heroDescription:
        "칼로리 부담을 낮추면서 단백질을 보충하기 좋은 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "가벼운 간식 대용 단백질 바를 찾는다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "저칼로리 바를 고를 때",
          bullets: [
            "칼로리만 낮고 단백질이 부족한 제품은 보충 효율이 떨어질 수 있습니다.",
            "저칼로리 안에서도 단백질 함량과 밀도를 같이 봐야 선택이 쉬워집니다.",
            "다이어트 간식이나 가벼운 보충용으로 보기 좋은 제품을 먼저 좁힐 수 있습니다.",
          ],
        },
      ],
    },
  },
  "bar-choco": {
    bar: {
      heroTitle: "초코 단백질 바 추천",
      heroDescription:
        "초코 계열 맛을 선호하는 사용자를 위해 초코 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "취향을 유지하면서도 성분 비교를 하고 싶다면 먼저 확인해보세요.",
    },
  },
  "bar-nut": {
    bar: {
      heroTitle: "견과 단백질 바 추천",
      heroDescription:
        "견과류 풍미가 있는 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "견과류 식감과 맛을 선호한다면 먼저 확인해보세요.",
    },
  },
  "bar-no-nut": {
    bar: {
      heroTitle: "무견과 단백질 바 추천",
      heroDescription:
        "견과류 없이 구성된 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "견과류 없는 단백질 바를 먼저 보고 싶다면 확인해보세요.",
    },
  },
  "bar-large": {
    bar: {
      heroTitle: "대용량 단백질 바 추천",
      heroDescription:
        "중량이 큰 단백질 바를 중심으로 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "한 개로도 든든한 단백질 바를 찾는다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "대용량 바가 잘 맞는 상황",
          bullets: [
            "한 개로 포만감을 기대하는 경우 먼저 보기 좋습니다.",
            "중량이 큰 만큼 칼로리와 당류 차이도 커서 성분 비교가 중요합니다.",
            "식사 대용에 가까운 느낌을 원하는 경우 추천 제품부터 보는 편이 좋습니다.",
          ],
        },
      ],
    },
  },
  "bar-small": {
    bar: {
      heroTitle: "소용량 단백질 바 추천",
      heroDescription:
        "가볍게 먹기 좋은 소용량 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 확인할 수 있습니다.",
      introText: "작은 용량으로 부담 없이 먹고 싶다면 먼저 확인해보세요.",
      infoSections: [
        {
          title: "소용량 바를 먼저 보는 이유",
          bullets: [
            "가볍게 먹기 좋은 간식형 제품을 찾을 때 선택지가 명확합니다.",
            "용량이 작아도 단백질 밀도와 당류 차이는 크게 벌어질 수 있습니다.",
            "러닝, 출근 전, 가벼운 간식 같은 상황에 맞춰 비교하기 좋습니다.",
          ],
        },
      ],
    },
  },
  running: {
    both: {
      relatedGuideLinks: [
        {
          href: "/guides/running/basics",
          title: "러너에게 좋은 단백질 선택 기준",
          description: "러닝 후 어떤 단백질 제품을 우선 봐야 하는지 데이터 기준으로 정리했습니다.",
        },
        {
          href: "/guides/running/race-week",
          title: "러닝 후 단백질 섭취 타이밍",
          description: "운동 직후와 일상 루틴에서 단백질을 언제 보충하면 좋은지 확인해보세요.",
        },
      ],
    },
  },
  convenience: {
    both: {
      relatedGuideLinks: [
        {
          href: "/?curation=convenience",
          title: "편의점 단백질 음료 비교",
          description: "편의점에서 찾기 쉬운 단백질 음료만 모아 바로 비교해보세요.",
        },
        {
          href: "/bars?curation=convenience",
          title: "편의점 단백질 바 비교",
          description: "편의점 기준 브랜드의 단백질 바를 한 번에 비교해볼 수 있습니다.",
        },
      ],
    },
  },
};

function mergeInfoSections(
  baseSections: CurationInfoSection[],
  profileSections?: CurationInfoSection[],
) {
  if (!profileSections?.length) return baseSections;
  return [...profileSections, ...baseSections.slice(profileSections.length)];
}

function buildDefaultInfoSections(curation: CurationDefinition, categoryKey: CategoryKey): CurationInfoSection[] {
  const categoryLabel = getCategoryLabel(categoryKey);
  const situationTitle =
    curation.kind === "goal"
      ? `${curation.label} 상황에서 보는 포인트`
      : curation.kind === "context"
        ? `${curation.label} 환경에서 보는 포인트`
        : `${curation.label} 기준으로 보는 포인트`;
  const situationBullets =
    curation.kind === "goal"
      ? [
          `${curation.label} 목적에 맞는 제품을 먼저 추리고 추천 제품과 전체 비교를 나눠 볼 수 있습니다.`,
          `${categoryLabel}은 섞지 않고 각각 따로 비교합니다.`,
          "운동, 회복, 식사 사이 간식처럼 실제 사용 상황에 맞춰 제품을 고를 수 있습니다.",
        ]
      : curation.kind === "context"
        ? [
            `${curation.label} 환경에서 찾기 쉬운 제품을 먼저 추리고 비교할 수 있습니다.`,
            `${categoryLabel}은 섞지 않고 각각 따로 비교합니다.`,
            "브랜드나 접근성 기준으로 먼저 좁힌 뒤 성분 데이터를 함께 볼 수 있습니다.",
          ]
        : [
            `${curation.label} 기준에 맞는 제품을 먼저 추리고 추천 제품과 전체 비교를 나눠 볼 수 있습니다.`,
            `${categoryLabel}은 섞지 않고 각각 따로 비교합니다.`,
            "성분 기준 큐레이션 안에서도 단백질, 당류, 칼로리, 밀도를 함께 비교할 수 있습니다.",
          ];

  return [
    {
      title: "제품을 고를 때 보는 기준",
      bullets: [
        "단백질 함량",
        "당류",
        "칼로리",
        "단백질 밀도",
      ],
    },
    {
      title: situationTitle,
      bullets: situationBullets,
    },
    {
      title: "추천 제품과 전체 비교를 같이 보는 이유",
      bullets: [
        "추천 제품 섹션에서는 먼저 볼 가치가 높은 제품을 빠르게 확인할 수 있습니다.",
        "전체 비교 섹션에서는 같은 기준 안에서 제품 폭을 넓게 확인할 수 있습니다.",
        "모바일과 PC 모두 같은 데이터 기준으로 제품을 비교할 수 있습니다.",
      ],
    },
    {
      title: "ProteinLab 데이터 기준",
      bullets: [
        "ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 비교합니다.",
        "추천 제품은 strict 조건이 부족할 경우 필터 완화, 단백질 밀도 fallback, 카테고리 상위 제품 순으로 보강합니다.",
      ],
    },
  ];
}

function buildDefaultGuideLinks(curation: CurationDefinition): CurationGuideLink[] {
  const links: CurationGuideLink[] = [];

  if (curation.categories.drink) {
    links.push({
      href: `/?curation=${curation.slug}`,
      title: `${curation.label} 단백질 음료 비교`,
      description: `${curation.label} 기준에 맞는 단백질 음료를 바로 비교해보세요.`,
    });
  }

  if (curation.categories.bar) {
    links.push({
      href: `/bars?curation=${curation.slug}`,
      title: `${curation.label} 단백질 바 비교`,
      description: `${curation.label} 기준에 맞는 단백질 바를 바로 비교해보세요.`,
    });
  }

  links.push({
    href: curation.categories.bar
      ? "/guides/product-selection-comparison/protein-bar-guide"
      : "/guides/how-to-choose/checklist",
    title: curation.categories.bar ? "단백질 바 고르는 법" : "단백질 음료 고르는 법",
    description: "단백질 함량, 당류, 칼로리, 단백질 밀도를 어떻게 함께 봐야 하는지 정리했습니다.",
  });

  return links;
}

function resolveLandingProfile(curation: CurationDefinition, categoryKey: CategoryKey) {
  const profileGroup = landingProfiles[curation.slug] ?? {};
  return profileGroup[categoryKey] ?? profileGroup.both ?? null;
}

function normalizeLandingCuration(curation: CurationDefinition): CurationDefinition {
  const categoryKey = getCategoryKey(curation);
  const categoryLabel = getCategoryLabel(categoryKey);
  const profile = resolveLandingProfile(curation, categoryKey);
  const baseSections = buildDefaultInfoSections(curation, categoryKey);

  return {
    ...curation,
    heroTitle: curation.heroTitle ?? profile?.heroTitle ?? `${curation.label} ${categoryLabel} 추천`,
    heroDescription:
      curation.heroDescription ??
      profile?.heroDescription ??
      `ProteinLab에서는 ${curation.label} 기준에 맞는 ${categoryLabel}을 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터 기준으로 비교할 수 있습니다.`,
    introText:
      curation.introText ?? profile?.introText ?? `${curation.label} 기준에 맞는 제품을 데이터 기준으로 확인하세요.`,
    infoSections:
      curation.infoSections?.length
        ? curation.infoSections
        : mergeInfoSections(baseSections, profile?.infoSections),
    relatedGuideLinks:
      curation.relatedGuideLinks?.length
        ? curation.relatedGuideLinks
        : profile?.relatedGuideLinks?.length
          ? profile.relatedGuideLinks
          : buildDefaultGuideLinks(curation),
    seoTitle: curation.seoTitle ?? `${curation.label} 큐레이션 | ProteinLab`,
    seoDescription:
      curation.seoDescription ??
      `ProteinLab에서 ${curation.label} 기준의 ${categoryLabel}을 비교해보세요.`,
  };
}

export function getCurationLandingData(slug: string) {
  const definition = getCurationDefinition(slug);
  if (!definition) return null;

  const curation = normalizeLandingCuration(definition);

  const drinkProducts = curation.categories.drink
    ? mockProducts.filter(curation.categories.drink.filter)
    : [];
  const barProducts = curation.categories.bar
    ? barProductsWithGrades.filter(curation.categories.bar.filter)
    : [];

  const recommendedDrinks = curation.categories.drink
    ? curation.categories.drink.recommend(mockProducts).slice(0, 6)
    : [];
  const recommendedBars = curation.categories.bar
    ? curation.categories.bar.recommend(barProductsWithGrades).slice(0, 6)
    : [];

  return {
    curation,
    drinkProducts,
    recommendedDrinks,
    barProducts,
    recommendedBars,
  };
}
