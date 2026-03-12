import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import type { ProductDetailProps } from "../../data/products";

type RunningCurationType = "drink" | "bar";

interface RunningCurationContentProps {
  type: RunningCurationType;
  products: ProductDetailProps[];
  recommendedProducts: ProductDetailProps[];
}

const commonDescriptionBullets = [
  "러닝과 같은 유산소 운동 후에는 근육 회복과 에너지 보충이 필요합니다.",
  "적절한 단백질 섭취는 운동 후 근육 손상 회복에 도움이 될 수 있습니다.",
  "러너가 단백질 제품을 선택할 때는 단백질 함량, 당류, 칼로리, 단백질 밀도가 중요합니다.",
  "ProteinLab에서는 이 데이터를 기준으로 러닝에 적합한 제품을 큐레이션합니다.",
];

const guideLinks = [
  {
    href: "/guides/running/basics",
    title: "러너에게 좋은 단백질 선택 기준",
    description: "러닝 후 회복과 일상 보충에 맞는 단백질 기준을 정리한 가이드입니다.",
  },
  {
    href: "/guides/running/race-week",
    title: "러닝 후 단백질 섭취 타이밍",
    description: "훈련 직후와 레이스 전후에 어떤 방식으로 단백질을 보충할지 확인하세요.",
  },
];

const contentByType = {
  drink: {
    breadcrumb: "러닝 음료 큐레이션",
    title: "러닝 후 단백질 음료 추천",
    heroLabel: "러너에게 적합한 단백질 음료를 데이터 기준으로 확인하세요.",
    criteriaBullets: [
      "단백질 15g 이상, 25g 이하",
      "당류 10g 이하",
      "단백질 밀도 B 이상",
      "워터형 단백질 음료와 가벼운 RTD 단백질 음료를 우선 추천",
    ],
    recommendationTitle: "러너에게 추천하는 단백질 음료",
    listTitle: "러닝에 적합한 단백질 음료 비교",
    listAriaLabel: "러닝 단백질 음료 목록",
    backHref: "/",
    backLabel: "단백질 음료",
    secondaryHref: "/bars",
    secondaryLabel: "단백질 바 전체 보기",
  },
  bar: {
    breadcrumb: "러닝 바 큐레이션",
    title: "러닝 후 단백질 바 추천",
    heroLabel: "러너에게 적합한 단백질 바를 데이터 기준으로 확인하세요.",
    criteriaBullets: [
      "단백질 10g 이상, 20g 이하",
      "당류가 낮은 제품",
      "소화 부담이 낮은 단백질 바를 우선 추천",
      "단백질 밀도, 단백질 함량, 당류를 함께 비교",
    ],
    recommendationTitle: "러너에게 추천하는 단백질 바",
    listTitle: "러닝에 적합한 단백질 바 비교",
    listAriaLabel: "러닝 단백질 바 목록",
    backHref: "/bars",
    backLabel: "단백질 바",
    secondaryHref: "/",
    secondaryLabel: "단백질 음료 전체 보기",
  },
} satisfies Record<
  RunningCurationType,
  {
    breadcrumb: string;
    title: string;
    heroLabel: string;
    criteriaBullets: string[];
    recommendationTitle: string;
    listTitle: string;
    listAriaLabel: string;
    backHref: string;
    backLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  }
>;

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

          <div className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
            <p>
              러닝이나 마라톤 후에는
              <br />
              근육 회복과 에너지 보충이 중요합니다.
            </p>
            <p>
              ProteinLab에서는
              <br />
              단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로
              <br />
              러닝 후 회복에 적합한 {type === "drink" ? "단백질 음료" : "단백질 바"}를 비교할 수
              있습니다.
            </p>
            <p className="font-medium text-[var(--foreground)]">{content.heroLabel}</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-3 md:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div
            className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="text-xs font-semibold text-[var(--foreground)]">러닝 설명</h2>
            <ul className="mt-1.5 space-y-1">
              {commonDescriptionBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]"
                >
                  <span className="mt-px shrink-0 text-[var(--accent)]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="text-xs font-semibold text-[var(--foreground)]">제품 큐레이션 기준</h2>
            <ul className="mt-1.5 space-y-1">
              {content.criteriaBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]"
                >
                  <span className="mt-px shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">
            {content.recommendationTitle}
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-2 text-lg font-bold text-[var(--foreground)]">{content.listTitle}</h2>
          <p className="mb-4 text-sm text-[var(--foreground-muted)]">
            총 <span className="font-semibold text-[var(--foreground)]">{products.length}</span>개 제품
          </p>
          <div
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3"
            aria-label={content.listAriaLabel}
          >
            {products.map((product) => (
              <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
            ))}
          </div>
        </section>

        <section
          className="mt-10 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
          style={{ borderRadius: "12px" }}
        >
          <h2 className="text-xs font-semibold text-[var(--foreground)]">러닝 가이드</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {guideLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-3 transition-colors hover:bg-[var(--accent-light)]"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{guide.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--foreground-muted)]">
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
