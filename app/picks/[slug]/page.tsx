import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { mockBarProducts, mockProducts } from "../../data/products";
import { getAllPickSlugs, getPickBySlug } from "../../data/picksConfig";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPickSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);

  if (!pick) {
    return { title: "큐레이션을 찾을 수 없음 | ProteinLab" };
  }

  return {
    title: `${pick.title} | ProteinLab`,
    description: pick.description,
    openGraph: {
      title: `${pick.title} | ProteinLab`,
      description: pick.description,
    },
  };
}

export default async function PickLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);

  if (!pick) notFound();

  const allProducts = pick.productType === "drink" ? mockProducts : mockBarProducts;
  const products = pick.filterProducts(allProducts);
  const listHref = pick.productType === "drink" ? "/" : "/bars";
  const listLabel = pick.productType === "drink" ? "단백질 음료" : "단백질 바";

  return (
    <div className="min-h-screen bg-white">
      <Header />

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
            <Link href={listHref} className="hover:text-[var(--accent)]">
              {listLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{pick.title}</span>
          </nav>

          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {pick.title}
          </h1>

          {pick.contentData.description ? (
            <div className="mt-3">
              {pick.contentData.description.split("\n\n").map((paragraph, index) => (
                <p
                  key={`${pick.slug}-desc-${index}`}
                  className={`text-sm leading-relaxed text-[var(--foreground-muted)] ${
                    index > 0 ? "mt-2" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm leading-relaxed text-[var(--foreground-muted)]">
              {pick.description}
            </p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-3 md:px-6">
        {(pick.contentData.recommendations.length > 0 || pick.contentData.criteria.length > 0) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {pick.contentData.recommendations.length > 0 ? (
              <div
                className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
                style={{ borderRadius: "12px" }}
              >
                <h2 className="text-xs font-semibold text-[var(--foreground)]">이런 분께 추천</h2>
                <ul className="mt-1.5 space-y-1">
                  {pick.contentData.recommendations.map((recommendation) => (
                    <li
                      key={recommendation}
                      className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]"
                    >
                      <span className="mt-px shrink-0 text-[var(--accent)]">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {pick.contentData.criteria.length > 0 ? (
              <div
                className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
                style={{ borderRadius: "12px" }}
              >
                <h2 className="text-xs font-semibold text-[var(--foreground)]">선정 기준</h2>
                <ul className="mt-1.5 space-y-1">
                  {pick.contentData.criteria.map((criterion) => (
                    <li
                      key={criterion}
                      className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]"
                    >
                      <span className="mt-px shrink-0">•</span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {pick.contentData.faq.length > 0 ? (
          <div
            className="mt-3 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="text-xs font-semibold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-1.5 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {pick.contentData.faq.map((item) => (
                <div key={item.q}>
                  <p className="text-xs font-medium text-[var(--foreground)]">Q. {item.q}</p>
                  <p className="mt-0.5 text-xs leading-snug text-[var(--foreground-muted)]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <section className="mt-8">
          <p className="mb-4 text-sm text-[var(--foreground-muted)]">
            총 <span className="font-semibold text-[var(--foreground)]">{products.length}</span>개
            제품
          </p>
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3" aria-label="제품 목록">
            {products.map((product) => (
              <ProductCard
                key={product.slug ?? `${product.brand}-${product.name}`}
                {...product}
                purchaseLinkCategory="ranking"
              />
            ))}
          </div>
          {products.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--foreground-muted)]">
              이 큐레이션에 해당하는 제품이 아직 없습니다.
            </p>
          ) : null}
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={listHref}
            className="rounded-lg border border-[var(--accent)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-light)]"
          >
            {listLabel} 전체 보기
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-[#e2e2e2] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-light)]"
          >
            홈으로
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
