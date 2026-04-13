import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { getCompareLandingBySlug, getAllCompareLandings } from "../../data/compareLandings";
import { getAllProducts } from "../../data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCompareLandings().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const landing = getCompareLandingBySlug(slug);

  if (!landing) {
    return { title: "비교 페이지를 찾을 수 없음 | ProteinLab" };
  }

  const canonical = `https://proteinlab.kr/compare/${landing.slug}`;
  const title = `${landing.title} — 단백질 성분 비교표`;
  const description = `${landing.description} 비교표로 수치를 나란히 확인하고 제품 상세까지 바로 이어서 볼 수 있습니다.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function CompareLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const landing = getCompareLandingBySlug(slug);
  if (!landing) notFound();

  const allProducts = getAllProducts();
  const products = landing.productSlugs
    .map((productSlug) => allProducts.find((item) => item.slug === productSlug))
    .filter((item): item is NonNullable<typeof item> => item != null);

  const compareHref = `/compare?slugs=${landing.productSlugs.join(",")}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
        { "@type": "ListItem", position: 2, name: "제품 비교", item: "https://proteinlab.kr/compare" },
        { "@type": "ListItem", position: 3, name: landing.title, item: `https://proteinlab.kr/compare/${landing.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: landing.title,
      description: landing.description,
      url: `https://proteinlab.kr/compare/${landing.slug}`,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <nav className="mb-3 text-sm text-[var(--foreground-muted)]">
            <Link href="/compare" className="hover:text-[var(--accent)]">
              제품 비교
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{landing.title}</span>
          </nav>
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            {landing.title}
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {landing.description} 비교표로 바로 들어가고 제품 상세까지 이어서 확인할 수 있게 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">비교 포인트</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{landing.intro}</p>
          <ul className="mt-4 space-y-2">
            {landing.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm leading-6 text-[var(--foreground-muted)]">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            href={compareHref}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            비교표 바로 보기
          </Link>
        </section>

        <section className="mt-8">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">비교 대상 제품</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              제품 상세를 보거나 비교표에서 수치를 바로 나란히 확인할 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                {...product}
                purchaseLinkCategory="ranking"
              />
            ))}
          </div>
        </section>

        {landing.relatedLinks.length > 0 ? (
          <section className="mt-8 rounded-2xl border border-[#e8e6e3] bg-white p-5">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[var(--foreground)]">비교 전후로 같이 보면 좋은 페이지</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                이 비교만 보고 끝내지 않고 브랜드 허브, 주제 허브, 랭킹까지 이어서 보면 후보를 더 빨리 좁힐 수 있습니다.
              </p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {landing.relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white"
                >
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
