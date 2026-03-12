import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import type { ProductDetailProps } from "../../data/products";

type RunningCurationType = "drink" | "bar";

interface RunningCurationContentProps {
  type: RunningCurationType;
  products: ProductDetailProps[];
  recommendedProducts: ProductDetailProps[];
}

const guideLinks = [
  {
    href: "/guides/running/basics",
    title: "러너에게 좋은 단백질 선택 기준",
    description: "러닝 후 회복용 제품을 볼 때 단백질, 당류, 칼로리, 소화 부담을 어떻게 볼지 정리했습니다.",
  },
  {
    href: "/guides/running/race-week",
    title: "러닝 후 단백질 섭취 타이밍",
    description: "운동 직후와 레이스 전후에 단백질을 언제, 어떤 방식으로 보충할지 확인해보세요.",
  },
];

const contentByType = {
  drink: {
    breadcrumb: "러닝 음료 큐레이션",
    title: "러닝 후 단백질 음료 추천",
    heroLead:
      "러닝이나 마라톤 같은 유산소 운동 후에는 근육 회복과 에너지 보충이 중요합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 러닝 후 회복에 적합한 단백질 음료를 비교할 수 있습니다.",
    heroLabel: "러너에게 적합한 단백질 음료를 데이터 기준으로 확인하세요.",
    whyTitle: "러닝 후 단백질이 필요한 이유",
    whyBullets: [
      "러닝 후에는 미세한 근육 손상이 생기기 쉬워 회복용 단백질 보충이 중요합니다.",
      "장거리 러닝 뒤에는 글리코겐 보충과 함께 단백질을 넣어주는 편이 회복 루틴을 만들기 좋습니다.",
      "운동 직후 또는 식사와 가까운 타이밍에 단백질을 보충하면 일상 루틴으로 연결하기 쉽습니다.",
    ],
    criteriaTitle: "러너가 단백질 제품을 고르는 기준",
    criteriaBullets: [
      "단백질 함량: 운동 후 한 번에 15g 이상이면 회복용으로 보기 쉽습니다.",
      "당류: 필요 이상으로 높지 않은지 확인합니다.",
      "칼로리: 러닝 강도와 식사 계획에 맞는지 봅니다.",
      "단백질 밀도: 같은 열량이나 용량에서 단백질을 얼마나 효율적으로 얻는지 확인합니다.",
    ],
    compareTitle: "단백질 음료 vs 단백질 바",
    compareBullets: [
      "운동 직후에는 음료가 더 편합니다. 마시기 쉽고 흡수가 빠른 편입니다.",
      "간식이나 추가 회복용으로는 단백질 바가 더 적합할 수 있습니다.",
      "러닝 직후 부담이 적은 선택이 필요하면 워터형이나 가벼운 RTD를 먼저 보는 편이 좋습니다.",
    ],
    dataTitle: "ProteinLab 데이터 기준",
    dataBullets: [
      "ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도를 함께 봅니다.",
      "이번 러닝 큐레이션은 아래 조건을 우선 기준으로 삼았습니다.",
      "단백질 15g 이상, 25g 이하",
      "당류 10g 이하",
      "워터형 단백질 음료와 가벼운 RTD 우선",
    ],
    recommendationTitle: "러너에게 추천하는 단백질 음료",
    recommendationNote:
      "단백질 밀도, 단백질 함량, 당류, 워터형 여부를 함께 고려해 러닝 후 회복용으로 보기 좋은 제품을 먼저 골랐습니다.",
    listTitle: "러닝에 적합한 단백질 음료 비교",
    listAriaLabel: "러닝 단백질 음료 목록",
    backHref: "/",
    backLabel: "단백질 음료",
    secondaryHref: "/curation/running/bar",
    secondaryLabel: "러닝 단백질 바 보기",
  },
  bar: {
    breadcrumb: "러닝 바 큐레이션",
    title: "러닝 후 단백질 바 추천",
    heroLead:
      "러닝 후에는 과하게 무거운 간식보다 단백질과 에너지 보충이 균형 잡힌 바 제품이 유리할 수 있습니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 러닝 후 회복에 적합한 단백질 바를 비교할 수 있습니다.",
    heroLabel: "러너에게 적합한 단백질 바를 데이터 기준으로 확인하세요.",
    whyTitle: "러닝 후 단백질이 필요한 이유",
    whyBullets: [
      "러닝 후에는 근육 회복을 위한 단백질 보충이 필요합니다.",
      "장거리 러닝이나 공복 러닝 뒤에는 에너지 보충까지 함께 고려하는 편이 좋습니다.",
      "식사까지 시간이 비면 휴대하기 쉬운 바 제품이 보충 루틴을 만들기 좋습니다.",
    ],
    criteriaTitle: "러너가 단백질 제품을 고르는 기준",
    criteriaBullets: [
      "단백질 함량: 간식형 보충으로는 10g 이상이 보기 좋습니다.",
      "당류: 지나치게 높지 않은 제품을 우선 봅니다.",
      "칼로리: 회복 간식인지, 식사 대용에 가까운지 구분해서 봅니다.",
      "단백질 밀도: 같은 크기에서 단백질을 얼마나 효율적으로 담았는지 봅니다.",
    ],
    compareTitle: "단백질 음료 vs 단백질 바",
    compareBullets: [
      "운동 직후에는 음료가 더 간편할 수 있습니다.",
      "이동 중이나 간식처럼 챙기기에는 단백질 바가 더 편합니다.",
      "러닝 직후에는 가벼운 음료, 이후 간식 타이밍에는 단백질 바 조합도 가능합니다.",
    ],
    dataTitle: "ProteinLab 데이터 기준",
    dataBullets: [
      "ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도를 함께 비교합니다.",
      "이번 러닝 바 큐레이션은 아래 조건을 우선 기준으로 삼았습니다.",
      "단백질 10g 이상, 20g 이하",
      "당류가 낮은 제품 우선",
      "소화 부담이 낮은 단백질 바 우선",
    ],
    recommendationTitle: "러너에게 추천하는 단백질 바",
    recommendationNote:
      "당류가 낮고, 단백질 밀도와 단백질 함량이 좋은 제품을 우선순위로 정렬했습니다.",
    listTitle: "러닝에 적합한 단백질 바 비교",
    listAriaLabel: "러닝 단백질 바 목록",
    backHref: "/bars",
    backLabel: "단백질 바",
    secondaryHref: "/curation/running/drink",
    secondaryLabel: "러닝 단백질 음료 보기",
  },
} satisfies Record<
  RunningCurationType,
  {
    breadcrumb: string;
    title: string;
    heroLead: string;
    heroLabel: string;
    whyTitle: string;
    whyBullets: string[];
    criteriaTitle: string;
    criteriaBullets: string[];
    compareTitle: string;
    compareBullets: string[];
    dataTitle: string;
    dataBullets: string[];
    recommendationTitle: string;
    recommendationNote: string;
    listTitle: string;
    listAriaLabel: string;
    backHref: string;
    backLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  }
>;

function RunningInfoCard({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4">
      <h2 className="text-sm font-semibold text-[var(--foreground)]">{title}</h2>
      <ul className="mt-3 space-y-2">
        {bullets.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm md:leading-6"
          >
            <span className="mt-[3px] shrink-0 text-[var(--accent)]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RunningCurationContent({
  type,
  products,
  recommendedProducts,
}: RunningCurationContentProps) {
  const content = contentByType[type];

  return (
    <>
      <section
        className="relative w-full border-b border-t"
        style={{
          background: "var(--hero-bg)",
          borderColor: "var(--hero-border)",
          paddingTop: "16px",
          paddingBottom: "20px",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <nav className="mb-3 text-sm text-[var(--foreground-muted)]">
            <Link href={content.backHref} className="hover:text-[var(--accent)]">
              {content.backLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{content.breadcrumb}</span>
          </nav>

          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {content.title}
          </h1>

          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <p>{content.heroLead}</p>
            <p className="font-medium text-[var(--foreground)]">{content.heroLabel}</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-4 md:px-6">
        <div className="grid gap-3 md:grid-cols-2">
          <RunningInfoCard title={content.whyTitle} bullets={content.whyBullets} />
          <RunningInfoCard title={content.criteriaTitle} bullets={content.criteriaBullets} />
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <RunningInfoCard title={content.compareTitle} bullets={content.compareBullets} />
          <RunningInfoCard title={content.dataTitle} bullets={content.dataBullets} />
        </div>

        <section className="mt-8">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">{content.recommendationTitle}</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">{content.recommendationNote}</p>
          </div>

          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              현재 조건에 맞는 추천 제품이 충분하지 않아 전체 비교 리스트에서 함께 확인할 수 있도록 구성했습니다.
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">{content.listTitle}</h2>
            <p className="text-sm text-[var(--foreground-muted)]">
              총 <span className="font-semibold text-[var(--foreground)]">{products.length}</span>개 제품
            </p>
          </div>
          <div
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3"
            aria-label={content.listAriaLabel}
          >
            {products.map((product) => (
              <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">러닝 가이드</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {guideLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-3 transition-colors hover:bg-[var(--accent-light)]"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{guide.title}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={content.backHref}
            className="rounded-lg border border-[var(--accent)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-light)]"
          >
            {content.backLabel} 전체 보기
          </Link>
          <Link
            href={content.secondaryHref}
            className="rounded-lg border border-[#e2e2e2] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-light)]"
          >
            {content.secondaryLabel}
          </Link>
        </div>
      </main>
    </>
  );
}
