import Link from "next/link";
import ProductCard from "./ProductCard";
import TrackedLink from "./TrackedLink";
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
  shakeProducts: ProductDetailProps[];
  recommendedShakes: ProductDetailProps[];
}

function buildQuickLinks(curation: CurationDefinition) {
  const links: Array<{ href: string; title: string; description: string }> = [];

  if (curation.categories.drink) {
    links.push({
      href: `/?curation=${curation.slug}`,
      title: `${curation.label} 음료 바로 비교하기`,
      description: `${curation.label} 기준에 맞는 단백질 음료만 먼저 좁혀봅니다.`,
    });
  }

  if (curation.categories.bar) {
    links.push({
      href: `/bars?curation=${curation.slug}`,
      title: `${curation.label} 단백질 바만 보기`,
      description: `${curation.label} 기준에 맞는 단백질 바 후보만 모아봅니다.`,
    });
  }

  if (curation.categories.yogurt) {
    links.push({
      href: `/yogurt?curation=${curation.slug}`,
      title: `${curation.label} 요거트만 보기`,
      description: `${curation.label} 기준에 맞는 요거트 제품만 빠르게 확인합니다.`,
    });
  }

  if (curation.categories.shake) {
    links.push({
      href: `/shake?curation=${curation.slug}`,
      title: `${curation.label} 쉐이크만 보기`,
      description: `${curation.label} 기준에 맞는 쉐이크 후보만 바로 비교합니다.`,
    });
  }

  links.push({
    href: "/ranking",
    title: "전체 순위에서 위치 보기",
    description: "지금 보는 조건의 제품이 전체 카테고리에서 어디쯤인지 같이 확인합니다.",
  });

  links.push({
    href: "/recommend",
    title: "맞춤 추천 다시 받기",
    description: "같은 조건이라도 목적과 운동 패턴에 맞춰 다시 좁혀볼 수 있습니다.",
  });

  return links.slice(0, 3);
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
  const infoSections = curation.infoSections ?? [];
  const hasDrinkCategory = Boolean(curation.categories.drink);
  const hasBarCategory = Boolean(curation.categories.bar);
  const hasYogurtCategory = Boolean(curation.categories.yogurt);
  const hasShakeCategory = Boolean(curation.categories.shake);
  const isPopularLanding = curation.slug === "popular";
  const relatedLinksTitle = curation.relatedLinksTitle ?? "관련 가이드";
  const quickLinks = buildQuickLinks(curation);

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

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">바로 이어서 보기</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                지금 보는 조건에서 실제 비교 목록이나 다음 추천 흐름으로 바로 이어집니다.
              </p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {quickLinks.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                trackingLabel={link.title}
                trackingSection="curation_quick_links"
                trackingPageType="curation"
                className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 transition-colors hover:bg-[var(--accent-light)]"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{link.title}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
                  {link.description}
                </p>
              </TrackedLink>
            ))}
          </div>
        </section>

        {isPopularLanding && curation.relatedGuideLinks?.length ? (
          <section className="mt-8">
            <div className="mb-4 space-y-1">
              <h2 className="text-lg font-bold text-[var(--foreground)]">{relatedLinksTitle}</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                이 조건과 함께 많이 보는 비교 페이지와 가이드를 묶어 두었습니다.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {curation.relatedGuideLinks.map((guide) => (
                <TrackedLink
                  key={guide.href}
                  href={guide.href}
                  trackingLabel={guide.title}
                  trackingSection="curation_related_links"
                  trackingPageType="curation"
                  className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 transition-colors hover:bg-[var(--accent-light)]"
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
          <section className="mt-10 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">{relatedLinksTitle}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {curation.relatedGuideLinks.map((guide) => (
                <TrackedLink
                  key={guide.href}
                  href={guide.href}
                  trackingLabel={guide.title}
                  trackingSection="curation_related_links"
                  trackingPageType="curation"
                  className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-3 transition-colors hover:bg-[var(--accent-light)]"
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
