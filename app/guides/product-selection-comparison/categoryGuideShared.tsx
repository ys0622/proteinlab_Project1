import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AffiliateDisclosure from "@/app/components/AffiliateDisclosure";
import CommercialAdSection from "@/app/components/CommercialAdSection";
import TrackedLink from "@/app/components/TrackedLink";
import TrackedCoupangLink from "@/app/components/TrackedCoupangLink";
import { getProductBySlug } from "@/app/data/products";
import { getCoupangRedirectHref } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";

export interface CategoryGuideLink {
  title: string;
  href: string;
  description: string;
}

export interface CategoryPurchaseLink {
  label: string;
  slug: string;
}

export interface CategoryExternalLink {
  label: string;
  href: string;
  description: string;
}

export interface CategoryMetricRow {
  label: string;
  values: string[];
  slug?: string;
}

export interface CategoryGuideSection {
  title: string;
  items: {
    title: string;
    body: string;
  }[];
}

export interface CategoryGuideConfig {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  badge: string;
  readingTime: string;
  updatedAt?: string;
  methodologyNote?: string;
  intro: string;
  summary: string[];
  comparisonTitle: string;
  comparisonColumns: string[];
  comparisonRows: CategoryMetricRow[];
  sections: CategoryGuideSection[];
  relatedGuides: CategoryGuideLink[];
  purchaseLinks: CategoryPurchaseLink[];
  showPurchaseLinks?: boolean;
  conversion?: {
    contentId: string;
    conclusion: string;
    products: Array<{ slug: string; reason: string }>;
    compareHref?: string;
  };
  externalLinks?: CategoryExternalLink[];
  faq?: {
    question: string;
    answer: string;
  }[];
  jsonLd?: Record<string, unknown>[];
}

function ConversionLinks({ conversion }: { conversion: NonNullable<CategoryGuideConfig["conversion"]> }) {
  const products = conversion.products
    .slice(0, 3)
    .map((item) => ({ ...item, product: getProductBySlug(item.slug) }))
    .filter((item): item is typeof item & { product: NonNullable<typeof item.product> } => item.product != null);

  return (
    <section className="border-y border-[#d9e4f0] py-5">
      <h2 className="text-lg font-bold text-[var(--foreground)]">빠른 선택</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{conversion.conclusion}</p>
      <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
        {products.map(({ product, reason }) => (
          <TrackedLink
            key={product.slug}
            href={`/product/${product.slug}`}
            trackingLabel={`${formatProductLabel(product.brand, product.name)} 상세 보기`}
            trackingSection="guide_featured_product"
            trackingPageType="guide"
            contentId={conversion.contentId}
            productId={product.slug}
            linkPosition="hero"
            ctaType="product_detail"
            className="min-w-[74vw] shrink-0 border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-white md:min-w-0"
          >
            <p className="text-sm font-semibold text-[#4a6178]">{formatProductLabel(product.brand, product.name)}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{reason}</p>
          </TrackedLink>
        ))}
      </div>
      {conversion.compareHref ? (
        <TrackedLink
          href={conversion.compareHref}
          trackingLabel="선택한 제품 비교하기"
          trackingSection="guide_featured_compare"
          trackingPageType="guide"
          contentId={conversion.contentId}
          linkPosition="hero"
          ctaType="compare"
          className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)] underline"
        >
          선택한 제품 비교하기
        </TrackedLink>
      ) : null}
    </section>
  );
}

const trackBHubLink: CategoryGuideLink = {
  title: "다른 비교 가이드 더 보기",
  href: "/guides/product-selection-comparison",
  description: "브랜드 비교와 제품 선택 가이드를 이어서 볼 수 있습니다.",
};

export function buildCategoryGuideMetadata(config: CategoryGuideConfig): Metadata {
  const canonical = `https://proteinlab.kr/guides/product-selection-comparison/${config.slug}`;
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      type: "article",
      locale: "ko_KR",
      siteName: "ProteinLab",
      images: [{ url: "/proteinlab-logo.png", width: 715, height: 717, alt: "ProteinLab" }],
      ...(config.updatedAt ? { modifiedTime: config.updatedAt } : {}),
    },
    twitter: {
      card: "summary",
      title: config.title,
      description: config.description,
    },
  };
}

function PurchaseCards({ links }: { links: CategoryPurchaseLink[] }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
      {links.map((item) => {
        const product = getProductBySlug(item.slug);
        if (!product) return null;
        const coupangHref = getCoupangRedirectHref(product.coupangUrl, "guide", product.slug);
        const detailHref = `/product/${product.slug}`;
        return (
          <div
            key={item.slug}
            className="min-w-[74vw] shrink-0 rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] px-4 py-4 md:min-w-0"
          >
            <p className="text-xs font-semibold tracking-[0.08em] text-[#4a6178]">ProteinLab 추천</p>
            <Link href={detailHref} className="mt-2 block text-sm font-semibold text-[var(--foreground)] hover:underline">
              {item.label}
            </Link>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
              {product.brand} · 단백질 {product.proteinPerServing}g
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Link href={detailHref} className="text-xs font-medium text-[var(--accent)] hover:underline">
                성분 상세 보기 →
              </Link>
              {coupangHref && (
                <TrackedCoupangLink
                  href={coupangHref}
                  productId={product.slug}
                  productName={`${product.brand} ${product.name}`}
                  productBrand={product.brand}
                  productCategory={product.productType}
                  linkPosition="mid_content"
                  className="ml-auto rounded-full bg-[#fee500] px-3 py-1 text-xs font-bold text-[#1a1a1a]"
                >
                  최저가 확인
                </TrackedCoupangLink>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExternalCards({ links }: { links: CategoryExternalLink[] }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="min-w-[76vw] shrink-0 rounded-2xl border border-[#d9e4f0] bg-white px-4 py-4 transition-colors hover:bg-[#f7f9fc] md:min-w-0"
          target="_blank"
          rel="noreferrer noopener"
        >
          <p className="text-sm font-semibold text-[#4a6178]">{item.label}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
        </a>
      ))}
    </div>
  );
}

function buildCategoryJsonLd(config: CategoryGuideConfig): Record<string, unknown>[] {
  const canonical = `https://proteinlab.kr/guides/product-selection-comparison/${config.slug}`;
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: config.title,
      description: config.description,
      inLanguage: "ko-KR",
      mainEntityOfPage: canonical,
      author: { "@type": "Organization", name: "ProteinLab", url: "https://proteinlab.kr" },
      publisher: {
        "@type": "Organization",
        name: "ProteinLab",
        url: "https://proteinlab.kr",
        logo: { "@type": "ImageObject", url: "https://proteinlab.kr/proteinlab-logo.png", width: 715, height: 717 },
      },
      ...(config.updatedAt ? { dateModified: config.updatedAt } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr" },
        { "@type": "ListItem", position: 2, name: "가이드", item: "https://proteinlab.kr/guides" },
        { "@type": "ListItem", position: 3, name: "제품 선택·비교", item: "https://proteinlab.kr/guides/product-selection-comparison" },
        { "@type": "ListItem", position: 4, name: config.title, item: canonical },
      ],
    },
  ];
  if (config.faq && config.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return [...schemas, ...(config.jsonLd ?? [])];
}

export function CategoryGuidePage({ config }: { config: CategoryGuideConfig }) {
  const relatedGuides = [...config.relatedGuides, trackBHubLink].filter(
    (item, index, array) => array.findIndex((candidate) => candidate.href === item.href) === index,
  );
  const jsonLd = buildCategoryJsonLd(config);

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 · 비교</Link>
            <span>/</span>
            <span>{config.title}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">TRACK B</span>
            <span className="rounded-md bg-[#f7f9fc] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">{config.badge}</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">{config.readingTime}</span>
            {config.updatedAt ? <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 {config.updatedAt}</span> : null}
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">{config.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">{config.intro}</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          {config.conversion ? <ConversionLinks conversion={config.conversion} /> : null}
          <section className="rounded-[28px] border border-[#d9e4f0] bg-[#f7f9fc] px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <p className="text-xs font-semibold tracking-[0.08em] text-[#4a6178]">📌 핵심 요약</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--foreground-muted)] md:mt-4 md:gap-3">
              {config.summary.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-[#d9e4f0] bg-white px-3 py-2.5 md:px-4 md:py-3">
                  <span className="mt-0.5 shrink-0 text-[#4a8c6e]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[var(--foreground)]">{config.comparisonTitle}</h2>
              <span className="text-xs text-[var(--foreground-muted)]">{config.methodologyNote ?? "ProteinLab DB 기준"}</span>
            </div>
            {/* Mobile: compact scroll table */}
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] md:hidden">
              <table className="min-w-[640px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e8edf3] text-[var(--foreground)]">
                    <th className="whitespace-nowrap px-3 py-2 font-semibold">항목</th>
                    {config.comparisonColumns.map((column) => (
                      <th key={column} className="whitespace-nowrap px-3 py-2 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-[#eef2f6] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-2 font-medium text-[var(--foreground)]">{row.label}</td>
                      {row.values.map((value, index) =>
                        index === 0 && row.slug ? (
                          <td key={`${row.label}-${index}`} className="px-3 py-2 leading-5">
                            <TrackedLink
                              href={`/product/${row.slug}`}
                              trackingLabel={value}
                              trackingSection="category_guide_ranking_table"
                              trackingPageType="guide"
                              linkPosition="ranking"
                              ctaType="product_detail"
                              productId={row.slug}
                              className="font-medium text-[var(--accent)] hover:underline"
                            >
                              {value}
                            </TrackedLink>
                          </td>
                        ) : (
                          <td key={`${row.label}-${index}`} className="px-3 py-2 leading-5 text-[var(--foreground-muted)]">{value}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Desktop: table */}
            <div className="mt-5 hidden overflow-x-auto md:block">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8edf3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    {config.comparisonColumns.map((column) => (
                      <th key={column} className="px-3 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-[#eef2f6] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row.label}</td>
                      {row.values.map((value, index) =>
                        index === 0 && row.slug ? (
                          <td key={`${row.label}-${index}`} className="px-3 py-3">
                            <TrackedLink
                              href={`/product/${row.slug}`}
                              trackingLabel={value}
                              trackingSection="category_guide_ranking_table"
                              trackingPageType="guide"
                              linkPosition="ranking"
                              ctaType="product_detail"
                              productId={row.slug}
                              className="font-medium text-[var(--accent)] hover:underline"
                            >
                              {value}
                            </TrackedLink>
                          </td>
                        ) : (
                          <td key={`${row.label}-${index}`} className="px-3 py-3 text-[var(--foreground-muted)]">{value}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {config.sections.map((section, sIdx) => (
            <section key={section.title} className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">{section.title}</h2>
              <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-5 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
                {section.items.map((item, iIdx) => (
                  <article key={item.title} className="min-w-[78vw] shrink-0 rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 md:min-w-0">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ddeaf3] text-[10px] font-bold text-[#4a6178]">
                        {iIdx + 1}
                      </span>
                      <h3 className="text-sm font-semibold leading-5 text-[#4a6178]">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {config.faq?.length ? (
            <section className="rounded-[28px] border border-[#e5deca] bg-[#fdfaf5] px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">💬 자주 묻는 질문</h2>
              <div className="mt-5 space-y-3">
                {config.faq.map((item) => (
                  <article key={item.question} className="rounded-2xl border border-[#e8e3da] bg-white p-4">
                    <h3 className="text-sm font-semibold text-[#6b5a3e]">Q. {item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 관련 가이드</h2>
            <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-5 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
              {relatedGuides.map((item) => (
                <Link key={item.href} href={item.href} className="min-w-[76vw] shrink-0 rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-[#eef3f9] md:min-w-0">
                  <p className="text-sm font-semibold text-[#4a6178]">→ {item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {config.externalLinks?.length ? (
            <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">구매 채널</h2>
              <div className="mt-5">
                <ExternalCards links={config.externalLinks} />
              </div>
            </section>
          ) : null}

          {config.showPurchaseLinks !== false ? <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[var(--foreground)]">🛒 쿠팡에서 가격 보기</h2>
              <AffiliateDisclosure />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              제품이 어느 정도 좁혀졌다면 쿠팡에서 옵션과 최신 가격을 바로 확인해보세요.
            </p>
            <div className="mt-4">
              <PurchaseCards links={config.purchaseLinks} />
            </div>
          </section> : null}
        </div>
        <div className="mt-6">
          <CommercialAdSection pageType="guide" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
