import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../data/products";
import { getCategoryLabel, type ProductCategory } from "../../lib/categories";
import { getBrandSummary, slugToBrand } from "../../lib/brandHubs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return getBrandSummary(products).map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const products = getAllProducts();
  const brands = getBrandSummary(products);
  const { slug } = await params;
  const brand = slugToBrand(slug, brands.map((item) => item.brand));

  if (!brand) {
    return { title: "브랜드 페이지를 찾을 수 없음 | ProteinLab" };
  }

  return {
    title: `${brand} 단백질 제품 모음 | ProteinLab`,
    description: `${brand} 브랜드의 단백질 음료, 바, 요거트, 쉐이크 제품을 한 곳에서 비교합니다.`,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const products = getAllProducts();
  const brands = getBrandSummary(products);
  const { slug } = await params;
  const brandName = slugToBrand(slug, brands.map((item) => item.brand));
  const brand = brands.find((item) => item.brand === brandName);

  if (!brand) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <nav className="mb-3 text-sm text-[var(--foreground-muted)]">
            <Link href="/brands" className="hover:text-[var(--accent)]">
              브랜드
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{brand.brand}</span>
          </nav>
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            {brand.brand} 단백질 제품 모음
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {brand.brand} 브랜드 제품 {brand.total}개를 모았습니다. 제품 상세와 비교 페이지로 바로 이동할 수 있게 구성했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">브랜드 요약</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            카테고리: {brand.categories.map((category) => getCategoryLabel(category as ProductCategory)).join(", ")} / 총 제품 수: {brand.total}개
          </p>
        </section>

        <section className="mt-8">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">제품 목록</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드 검색 후 바로 제품 상세와 비교 페이지로 이동할 수 있게 구성했습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {brand.items.map((product) => (
              <ProductCard
                key={product.slug}
                {...product}
                purchaseLinkCategory="ranking"
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
