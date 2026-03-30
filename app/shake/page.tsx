import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import type { ProductCategory } from "../lib/categories";
import { getProductsByCategoryAsync } from "../lib/productData";
import Link from "next/link";

export const metadata = {
  title: "단백질 쉐이크 추천 비교 69종 | 저당·고단백·식사대용 기준 (2026) | ProteinLab",
  description:
    "단백질 쉐이크 67개를 단백질 함량, 당류, 칼로리, 식이섬유 기준으로 비교합니다. 운동보충·저당·식사대용 목적에 맞는 제품을 성분 데이터로 바로 선택하세요.",
  alternates: {
    canonical: "https://proteinlab.kr/shake",
  },
};

export default async function ShakePage() {
  const [drinks, bars, yogurts, products] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  const categoryCounts: Record<ProductCategory, number> = {
    drink: drinks.length,
    bar: bars.length,
    yogurt: yogurts.length,
    shake: products.length,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-0 md:px-6 md:pb-3">
        <section className="mb-6 rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">대표 쉐이크 가이드 바로가기</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            전체 목록을 보기 전에 많이 찾는 브랜드와 비교 가이드부터 보면 후보를 더 빨리 좁힐 수 있습니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/guides/product-selection-comparison/flymill-protein-shake"
              className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-4 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
            >
              플라이밀 쉐이크 추천 →
            </Link>
            <Link
              href="/guides/product-selection-comparison/danbaekhani-protein-shake"
              className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-4 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
            >
              단백하니 쉐이크 추천 →
            </Link>
            <Link
              href="/guides/product-selection-comparison/flymill-vs-danbaekhani"
              className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-4 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
            >
              플라이밀 vs 단백하니 →
            </Link>
            <Link
              href="/guides/product-selection-comparison/oliveyoung-protein-shake"
              className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-4 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
            >
              올리브영 쉐이크 추천 →
            </Link>
          </div>
        </section>
        <ProductListWithFilters
          productType="shake"
          products={products}
          categoryCounts={categoryCounts}
          tabsPlacement="before_grid"
        />
      </main>

      <Footer />
    </div>
  );
}
