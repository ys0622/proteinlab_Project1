import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllProducts } from "../data/products";
import { getCategoryLabel, type ProductCategory } from "../lib/categories";
import { getBrandSummary } from "../lib/brandHubs";

export const metadata = {
  title: "단백질 브랜드 모음 | 셀렉스·하이뮨·랩노쉬 제품 비교 허브",
  description:
    "셀렉스, 하이뮨, 랩노쉬, 더단백, 닥터유 등 주요 단백질 브랜드별 제품을 한곳에서 모아 비교할 수 있는 브랜드 허브입니다.",
};

export default async function BrandsPage() {
  const products = getAllProducts();
  const brands = getBrandSummary(products);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            단백질 브랜드 허브
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            셀렉스, 하이뮨, 랩노쉬, 더단백처럼 브랜드명으로 검색한 뒤 바로 제품 목록과 비교 페이지로 넘어갈 수 있게 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
                className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5 transition-colors hover:bg-[var(--accent-light)]"
            >
              <p className="text-lg font-semibold text-[var(--foreground)]">{brand.brand}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                제품 {brand.total}개 ·{" "}
                {brand.categories.map((category) => getCategoryLabel(category as ProductCategory)).join(", ")}
              </p>
              <p className="mt-3 text-xs font-semibold text-[var(--accent)]">브랜드 제품 바로 보기</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
