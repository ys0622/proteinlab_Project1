import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AffiliateDisclosure from "@/app/components/AffiliateDisclosure";
import { getDrinkProducts } from "@/app/data/drinkProductsData";
import type { ProductDetailProps } from "@/app/data/products";
import { getCoupangRedirectHref } from "@/app/lib/purchaseLinks";

export interface RelatedGuideLink {
  title: string;
  href: string;
  description: string;
}

export interface PurchaseGuideLink {
  label: string;
  slug: string;
}

export interface CompareMetricRow {
  label: string;
  values: string[];
}

export interface ComparePageConfig {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  badge: string;
  readingTime: string;
  updatedAt?: string;
  ogImage?: string;
  methodologyNote?: string;
  intro: string;
  summary: string[];
  comparisonTitle: string;
  comparisonColumns?: string[];
  comparisonRows: CompareMetricRow[];
  sections: {
    title: string;
    items: {
      title: string;
      body: string;
    }[];
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
  relatedGuides: RelatedGuideLink[];
  purchaseLinks: PurchaseGuideLink[];
  jsonLd?: Record<string, unknown>[];
}

const drinkProducts = getDrinkProducts();
const trackBHubLink: RelatedGuideLink = {
  title: "다른 비교 가이드 더 보기",
  href: "/guides/product-selection-comparison",
  description: "브랜드 비교와 제품 선택 가이드를 이어서 볼 수 있습니다.",
};

export function getDrinkProduct(slug: string): ProductDetailProps {
  const product = drinkProducts.find((item) => item.slug === slug);
  if (!product) throw new Error(`Unknown drink product slug: ${slug}`);
  return product;
}

export function getMl(product: ProductDetailProps) {
  return Number.parseFloat(product.capacity?.replace(/[^0-9.]/g, "") ?? "0");
}

export function formatDensity(product: ProductDetailProps) {
  const ml = getMl(product);
  if (!ml) return "-";
  return `${(product.proteinPerServing / ml * 100).toFixed(1)}g`;
}

export function formatCalories100(product: ProductDetailProps) {
  const ml = getMl(product);
  if (!ml) return "-";
  return `${((product.calories ?? 0) / ml * 100).toFixed(1)}kcal`;
}

export function buildGuideMetadata(config: ComparePageConfig): Metadata {
  const canonical = `https://proteinlab.kr/guides/product-selection-comparison/${config.slug}`;
  const hasLargeOg = !!config.ogImage;
  const ogImage = config.ogImage ?? "/proteinlab-logo.png";
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
      images: [
        hasLargeOg
          ? { url: ogImage, width: 1200, height: 630, alt: `${config.title} - ProteinLab` }
          : { url: ogImage, width: 81, height: 88, alt: "ProteinLab" },
      ],
      ...(config.updatedAt ? { modifiedTime: config.updatedAt } : {}),
    },
    twitter: {
      card: hasLargeOg ? "summary_large_image" : "summary",
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
  };
}

function PurchaseLinks({ links }: { links: PurchaseGuideLink[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {links.map((item) => {
        const product = getDrinkProduct(item.slug);
        const href = getCoupangRedirectHref(product.coupangUrl, "guide", product.slug);
        return (
          <a
            key={item.slug}
            href={href ?? "#"}
            className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] px-4 py-4 transition-colors hover:bg-[#eef3f9]"
            target={href ? "_blank" : undefined}
            rel={href ? "noreferrer noopener" : undefined}
          >
            <p className="text-xs font-semibold tracking-[0.08em] text-[#4a6178]">쿠팡에서 가격 확인</p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.label}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
              {product.brand} {product.name}
            </p>
            <p className="mt-3 text-xs font-medium text-[#24543d]">옵션과 최신 가격 보기 →</p>
          </a>
        );
      })}
    </div>
  );
}

export function ComparisonGuidePage({ config }: { config: ComparePageConfig }) {
  const relatedGuides = [...config.relatedGuides, trackBHubLink].filter(
    (item, index, array) => array.findIndex((candidate) => candidate.href === item.href) === index,
  );

  return (
    <div className="min-h-screen bg-white">
      {(config.jsonLd ?? []).map((item, index) => (
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
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">{config.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">{config.intro}</p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#d9e4f0] bg-[#f7f9fc] px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#4a6178]">30초 요약</p>
              <span className="text-xs text-[var(--foreground-muted)]">먼저 이 3가지만 보면 됩니다</span>
            </div>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--foreground-muted)] md:grid-cols-3">
              {config.summary.map((item) => (
                <li key={item} className="rounded-xl border border-[#d9e4f0] bg-white px-4 py-3 md:min-h-[108px]">{item}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[var(--foreground)]">{config.comparisonTitle}</h2>
              <span className="text-xs text-[var(--foreground-muted)]">{config.methodologyNote ?? "ProteinLab DB 기준"}</span>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8edf3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    {(config.comparisonColumns ?? []).map((column) => (
                      <th key={column} className="px-3 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-[#eef2f6] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row.label}</td>
                      {row.values.map((value, index) => (
                        <td key={`${row.label}-${index}`} className="px-3 py-3 text-[var(--foreground-muted)]">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {config.sections.map((section) => (
            <section key={section.title} className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">{section.title}</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {section.items.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4">
                    <h3 className="text-sm font-semibold text-[#4a6178]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
          {config.faq?.length ? (
            <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
              <div className="mt-5 space-y-3">
                {config.faq.map((item) => (
                  <article key={item.question} className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4">
                    <h3 className="text-sm font-semibold text-[#4a6178]">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">관련 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {relatedGuides.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-[#eef3f9]">
                  <p className="text-sm font-semibold text-[#4a6178]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[var(--foreground)]">쿠팡에서 가격 보기</h2>
              <AffiliateDisclosure />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              후보가 좁혀졌다면 옵션과 최신 가격을 결제 전 한 번 더 확인해보세요.
            </p>
            <div className="mt-3">
              <PurchaseLinks links={config.purchaseLinks} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
