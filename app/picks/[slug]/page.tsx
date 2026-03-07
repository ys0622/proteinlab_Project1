import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
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

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-[1000px]">
          <nav className="mb-4 text-sm text-[var(--foreground-muted)]">
            <Link href={listHref} className="hover:text-[var(--accent)]">
              {pick.productType === "drink" ? "단백질 음료" : "단백질 바"}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{pick.title}</span>
          </nav>

          <header className="rounded-2xl border border-[var(--border)] bg-[#EFEDE6] px-6 py-8 md:py-10" style={{ background: "#EFEDE6" }}>
            <h1 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">{pick.title}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--foreground-muted)]">{pick.description}</p>
          </header>

          <div className="mt-8 prose prose-neutral max-w-none">
            <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-5 md:p-6" style={{ borderRadius: "12px" }}>
              <p className="mt-0 text-sm leading-relaxed text-[var(--foreground-muted)]">{pick.content}</p>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">※ 콘텐츠는 proteinlab.kr 기준으로 추후 반영 예정입니다.</p>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">해당 제품 ({products.length}개)</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="제품 목록">
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
        </div>
      </main>

      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
