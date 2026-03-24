import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AffiliateDisclosure from "@/app/components/AffiliateDisclosure";
import { getProductBySlug } from "@/app/data/products";
import { getCoupangRedirectHref } from "@/app/lib/purchaseLinks";

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
  externalLinks?: CategoryExternalLink[];
  faq?: {
    question: string;
    answer: string;
  }[];
  jsonLd?: Record<string, unknown>[];
}

const trackBHubLink: CategoryGuideLink = {
  title: "Track B 전체 허브 보기",
  href: "/guides/product-selection-comparison",
  description: "브랜드 비교, 라인업, 바·요거트·쉐이크 허브를 한 번에 다시 봅니다.",
};

export function buildCategoryGuideMetadata(config: CategoryGuideConfig): Metadata {
  const canonical = `https://proteinlab.kr/guides/product-selection-comparison/${config.slug}`;
  return {
    title: `${config.title} | ProteinLab`,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical },
    openGraph: {
      title: `${config.title} | ProteinLab`,
      description: config.description,
      url: canonical,
      type: "article",
      locale: "ko_KR",
      siteName: "ProteinLab",
      images: [{ url: "/proteinlab-logo.png", alt: `${config.title} - ProteinLab` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.title} | ProteinLab`,
      description: config.description,
      images: ["/proteinlab-logo.png"],
    },
  };
}

function PurchaseCards({ links }: { links: CategoryPurchaseLink[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {links.map((item) => {
        const product = getProductBySlug(item.slug);
        if (!product) return null;
        const href = getCoupangRedirectHref(product.coupangUrl, "guide", product.slug);
        return (
          <a
            key={item.slug}
            href={href ?? "#"}
            className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] px-4 py-4 transition-colors hover:bg-[#eef3f9]"
            target={href ? "_blank" : undefined}
            rel={href ? "noreferrer noopener" : undefined}
          >
            <p className="text-xs font-semibold tracking-[0.08em] text-[#4a6178]">쿠팡 링크</p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.label}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
              {product.brand} {product.name}
            </p>
          </a>
        );
      })}
    </div>
  );
}

function ExternalCards({ links }: { links: CategoryExternalLink[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-2xl border border-[#d9e4f0] bg-white px-4 py-4 transition-colors hover:bg-[#f7f9fc]"
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

export function CategoryGuidePage({ config }: { config: CategoryGuideConfig }) {
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
            <p className="text-xs font-semibold tracking-[0.08em] text-[#4a6178]">핵심 요약</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {config.summary.map((item) => (
                <li key={item} className="rounded-xl border border-[#d9e4f0] bg-white px-4 py-3">{item}</li>
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
                    {config.comparisonColumns.map((column) => (
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

          {config.externalLinks?.length ? (
            <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">구매 채널</h2>
              <div className="mt-5">
                <ExternalCards links={config.externalLinks} />
              </div>
            </section>
          ) : null}

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[var(--foreground)]">쿠팡 추천 링크</h2>
              <AffiliateDisclosure />
            </div>
            <div className="mt-3">
              <PurchaseCards links={config.purchaseLinks} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
