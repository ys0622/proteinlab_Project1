import Link from "next/link";
import ProductCard from "./ProductCard";
import TrackedLink from "./TrackedLink";
import type { ProductDetailProps } from "../data/products";
import type { CurationDefinition } from "../lib/curationSystem";

interface CurationLandingTemplateProps {
  curation: CurationDefinition;
  drinkProducts: ProductDetailProps[];
  recommendedDrinks: ProductDetailProps[];
  barProducts: ProductDetailProps[];
  recommendedBars: ProductDetailProps[];
  yogurtProducts: ProductDetailProps[];
  recommendedYogurts: ProductDetailProps[];
  shakeProducts: ProductDetailProps[];
  recommendedShakes: ProductDetailProps[];
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
    <section className="mt-6 md:mt-8">
      <div className="mb-3 space-y-1 md:mb-4">
        <h2 className="text-base font-bold text-[var(--foreground)] md:text-lg">{title}</h2>
        {note ? <p className="text-[13px] leading-6 text-[var(--foreground-muted)] md:text-sm">{note}</p> : null}
      </div>

      {products.length > 0 ? (
        <div className="product-grid" aria-label={title}>
          {products.map((product) => (
            <ProductCard
              key={product.slug ?? `${product.brand}-${product.name}`}
              {...product}
              purchaseLinkCategory="ranking"
            />
          ))}
        </div>
      ) : (
        <div
          className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]"
          style={{ borderRadius: "12px" }}
        >
          현재 조건에 맞는 제품이 충분하지 않아 이 구간은 비워 두었습니다.
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
  shakeProducts,
  recommendedShakes,
}: CurationLandingTemplateProps) {
  const drinkCopy = curation.categories.drink?.landingCopy;
  const barCopy = curation.categories.bar?.landingCopy;
  const yogurtCopy = curation.categories.yogurt?.landingCopy;
  const shakeCopy = curation.categories.shake?.landingCopy;
  const hasDrinkCategory = Boolean(curation.categories.drink);
  const hasBarCategory = Boolean(curation.categories.bar);
  const hasYogurtCategory = Boolean(curation.categories.yogurt);
  const hasShakeCategory = Boolean(curation.categories.shake);
  const isPopularLanding = curation.slug === "popular";
  const relatedLinksTitle = curation.relatedLinksTitle ?? "관련 가이드";

  return (
    <>
      <section
        className="relative w-full border-b border-t"
        style={{
          background: "var(--hero-bg)",
          borderColor: "var(--hero-border)",
          paddingTop: "12px",
          paddingBottom: "14px",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <nav className="mb-2 text-[12px] text-[var(--foreground-muted)] md:mb-2.5 md:text-sm">
            <Link href="/" className="hover:text-[var(--accent)]">
              단백질 제품
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{curation.label} 큐레이션</span>
          </nav>

          <div className="flex items-center gap-2.5 md:items-start md:gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm md:mt-0.5 md:h-11 md:w-11 md:text-lg"
              style={{ background: "var(--curation-chip-bg)" }}
              aria-hidden
            >
              {curation.icon}
            </span>
            <div>
              <h1 className="text-lg font-bold leading-tight text-[var(--foreground)] md:text-3xl">
                {curation.heroTitle ?? `${curation.label} 큐레이션`}
              </h1>

              {curation.introText ? (
                <p className="mt-1.5 max-w-3xl text-[13px] font-medium leading-6 text-[var(--foreground-muted)] md:mt-2 md:text-sm">
                  {curation.introText}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-4 md:px-6">
        {isPopularLanding && curation.relatedGuideLinks?.length ? (
          <section className="mt-6 md:mt-8">
            <div className="mb-3 space-y-1 md:mb-4">
              <h2 className="text-base font-bold text-[var(--foreground)] md:text-lg">{relatedLinksTitle}</h2>
              <p className="text-[13px] leading-6 text-[var(--foreground-muted)] md:text-sm">
                이 조건과 함께 많이 보는 비교 페이지와 가이드를 묶어 두었습니다.
              </p>
            </div>
            <div className="grid gap-2.5 md:grid-cols-3 md:gap-3">
              {curation.relatedGuideLinks.map((guide) => (
                <TrackedLink
                  key={guide.href}
                  href={guide.href}
                  trackingLabel={guide.title}
                  trackingSection="curation_related_links"
                  trackingPageType="curation"
                  className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-4 py-3.5 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] md:py-4"
                  style={{ borderRadius: "12px" }}
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">{guide.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
                    {guide.description}
                  </p>
                </TrackedLink>
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

        {hasShakeCategory ? (
          <>
            <ProductSection
              title={shakeCopy?.recommendationTitle ?? "추천 단백질 쉐이크"}
              note={shakeCopy?.recommendationNote}
              products={recommendedShakes}
            />
            <ProductSection
              title={shakeCopy?.comparisonTitle ?? "단백질 쉐이크 비교"}
              products={shakeProducts}
            />
          </>
        ) : null}

        {!isPopularLanding && curation.relatedGuideLinks?.length ? (
          <section
            className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-4 py-4 md:mt-10"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="text-sm font-semibold text-[var(--foreground)]">{relatedLinksTitle}</h2>
            <div className="mt-3 grid gap-2.5 md:grid-cols-2 md:gap-3">
              {curation.relatedGuideLinks.map((guide) => (
                <TrackedLink
                  key={guide.href}
                  href={guide.href}
                  trackingLabel={guide.title}
                  trackingSection="curation_related_links"
                  trackingPageType="curation"
                  className="rounded-xl border border-[var(--border)] bg-[var(--filter-box-bg)] px-4 py-3 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)]"
                  style={{ borderRadius: "12px" }}
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">{guide.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
                    {guide.description}
                  </p>
                </TrackedLink>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
