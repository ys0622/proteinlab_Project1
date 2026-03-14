import Link from "next/link";
import ProductCard from "./ProductCard";
import type { ProductDetailProps } from "../data/products";
import type { CurationDefinition, CurationInfoSection } from "../lib/curationSystem";

interface CurationLandingTemplateProps {
  curation: CurationDefinition;
  drinkProducts: ProductDetailProps[];
  recommendedDrinks: ProductDetailProps[];
  barProducts: ProductDetailProps[];
  recommendedBars: ProductDetailProps[];
  yogurtProducts: ProductDetailProps[];
  recommendedYogurts: ProductDetailProps[];
}

function InfoCard({ section }: { section: CurationInfoSection }) {
  return (
    <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4">
      <h2 className="text-sm font-semibold text-[var(--foreground)]">{section.title}</h2>
      <ul className="mt-3 space-y-2">
        {section.bullets.map((item) => (
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

function ProductSection({
  title,
  note,
  products,
}: {
  title: string;
  note?: string;
  products: ProductDetailProps[];
}) {
  return (
    <section className="mt-8">
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-[var(--foreground)]">{title}</h2>
        {note ? <p className="text-sm leading-6 text-[var(--foreground-muted)]">{note}</p> : null}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.slug ?? `${product.brand}-${product.name}`}
              {...product}
              purchaseLinkCategory="ranking"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
          현재 조건에 맞는 제품이 충분하지 않아 이 섹션은 비어 있습니다.
        </div>
      )}
    </section>
  );
}

export default function CurationLandingTemplate({
  curation,
  drinkProducts,
  recommendedDrinks,
  barProducts,
  recommendedBars,
  yogurtProducts,
  recommendedYogurts,
}: CurationLandingTemplateProps) {
  const drinkCopy = curation.categories.drink?.landingCopy;
  const barCopy = curation.categories.bar?.landingCopy;
  const yogurtCopy = curation.categories.yogurt?.landingCopy;
  const infoSections = curation.infoSections ?? [];
  const hasDrinkCategory = Boolean(curation.categories.drink);
  const hasBarCategory = Boolean(curation.categories.bar);
  const hasYogurtCategory = Boolean(curation.categories.yogurt);
  const isPopularLanding = curation.slug === "popular";
  const relatedLinksTitle = curation.relatedLinksTitle ?? "관련 가이드";

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
            <Link href="/" className="hover:text-[var(--accent)]">
              단백질 제품
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{curation.label} 큐레이션</span>
          </nav>

          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {curation.heroTitle ?? `${curation.label} 큐레이션`}
          </h1>

          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            {curation.heroDescription ? <p>{curation.heroDescription}</p> : null}
            {curation.introText ? (
              <p className="font-medium text-[var(--foreground)]">{curation.introText}</p>
            ) : null}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-4 md:px-6">
        {infoSections.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {infoSections.map((section) => (
              <InfoCard key={section.title} section={section} />
            ))}
          </div>
        ) : null}

        {isPopularLanding && curation.relatedGuideLinks?.length ? (
          <section className="mt-8">
            <div className="mb-4 space-y-1">
              <h2 className="text-lg font-bold text-[var(--foreground)]">{relatedLinksTitle}</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                최근 많이 확인한 큐레이션부터 살펴보고, 각 랜딩 페이지에서 추천 제품과 전체 비교로
                이어가세요.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {curation.relatedGuideLinks.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 transition-colors hover:bg-[var(--accent-light)]"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">{guide.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {hasDrinkCategory ? (
          <>
            <ProductSection
              title={drinkCopy?.recommendationTitle ?? "추천 단백질 음료"}
              note={drinkCopy?.recommendationNote}
              products={recommendedDrinks}
            />
            <ProductSection
              title={drinkCopy?.comparisonTitle ?? "단백질 음료 비교"}
              products={drinkProducts}
            />
          </>
        ) : null}

        {hasBarCategory ? (
          <>
            <ProductSection
              title={barCopy?.recommendationTitle ?? "추천 단백질 바"}
              note={barCopy?.recommendationNote}
              products={recommendedBars}
            />
            <ProductSection
              title={barCopy?.comparisonTitle ?? "단백질 바 비교"}
              products={barProducts}
            />
          </>
        ) : null}

        {hasYogurtCategory ? (
          <>
            <ProductSection
              title={yogurtCopy?.recommendationTitle ?? "추천 단백질 요거트"}
              note={yogurtCopy?.recommendationNote}
              products={recommendedYogurts}
            />
            <ProductSection
              title={yogurtCopy?.comparisonTitle ?? "단백질 요거트 비교"}
              products={yogurtProducts}
            />
          </>
        ) : null}

        {!isPopularLanding && curation.relatedGuideLinks?.length ? (
          <section className="mt-10 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">{relatedLinksTitle}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {curation.relatedGuideLinks.map((guide) => (
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
        ) : null}
      </main>
    </>
  );
}
