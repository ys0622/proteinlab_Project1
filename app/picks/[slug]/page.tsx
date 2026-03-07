import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { mockProducts, mockBarProducts } from "../../data/products";
import { getPickBySlug, getAllPickSlugs } from "../../data/picksConfig";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPickSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);
  if (!pick) return { title: "큐레이션을 찾을 수 없음 | ProteinLab" };
  return {
    title: `${pick.title} | ProteinLab`,
    description: pick.description,
    openGraph: { title: `${pick.title} | ProteinLab`, description: pick.description },
  };
}

export default async function PickLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);
  if (!pick) notFound();

  const allProducts = pick.productType === "drink" ? mockProducts : mockBarProducts;
  const products = pick.filterProducts(allProducts);
  const listHref = pick.productType === "drink" ? "/" : "/bars";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="relative w-full border-t border-b"
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
              {pick.productType === "drink" ? "단백질 음료" : "단백질 바"}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{pick.title}</span>
          </nav>
          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl" style={{ fontWeight: 700 }}>
            {pick.title}
          </h1>
          {pick.contentData.description ? (
            <div className="mt-3">
              {pick.contentData.description.split("\n\n").map((para, i) => (
                <p key={i} className={`text-sm leading-relaxed text-[var(--foreground-muted)] ${i > 0 ? "mt-2" : "mt-0"}`}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm leading-relaxed text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
              {pick.description}
            </p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pt-3 pb-2 md:px-6">
          {(pick.contentData.recommendations.length > 0 || pick.contentData.criteria.length > 0) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {pick.contentData.recommendations.length > 0 && (
                <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3" style={{ borderRadius: "12px" }}>
                  <h2 className="text-xs font-semibold text-[var(--foreground)]">이런 분에게 추천</h2>
                  <ul className="mt-1.5 space-y-1">
                    {pick.contentData.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]">
                        <span className="mt-px shrink-0 text-[var(--accent)]">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pick.contentData.criteria.length > 0 && (
                <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3" style={{ borderRadius: "12px" }}>
                  <h2 className="text-xs font-semibold text-[var(--foreground)]">선택 기준</h2>
                  <ul className="mt-1.5 space-y-1">
                    {pick.contentData.criteria.map((crit, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]">
                        <span className="mt-px shrink-0">·</span>
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {pick.contentData.faq.length > 0 && (
            <div className="mt-3 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3" style={{ borderRadius: "12px" }}>
              <h2 className="text-xs font-semibold text-[var(--foreground)]">자주 묻는 질문</h2>
              <div className="mt-1.5 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {pick.contentData.faq.map((item, i) => (
                  <div key={i}>
                    <p className="text-xs font-medium text-[var(--foreground)]">Q. {item.q}?</p>
                    <p className="mt-0.5 text-xs leading-snug text-[var(--foreground-muted)]">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <section className="mt-8">
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              총 <span className="font-semibold text-[var(--foreground)]">{products.length}</span>개 제품
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="제품 목록">
              {products.map((product) => (
                <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
              ))}
            </div>
            {products.length === 0 && (
              <p className="mt-4 text-sm text-[var(--foreground-muted)]">이 큐레이션에 해당하는 제품이 없습니다.</p>
            )}
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={listHref} className="rounded-lg border border-[var(--accent)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-light)]">
              {pick.productType === "drink" ? "단백질 음료 전체 보기" : "단백질 바 전체 보기"}
            </Link>
            <Link href="/" className="rounded-lg border border-[#e2e2e2] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-light)]">
              홈으로
            </Link>
          </div>
      </main>

      <Footer />
    </div>
  );
}
