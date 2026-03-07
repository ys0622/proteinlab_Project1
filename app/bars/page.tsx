import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductListWithFilters from "../components/ProductListWithFilters";
import { mockBarProducts } from "../data/products";

export const metadata = {
  title: "단백질 바 비교 | ProteinLab",
  description: "단백질 바 제품을 브랜드, 단백질 함량, 당류, 용량으로 비교해 보세요. proteinlab.kr 기준 큐레이션.",
};

export default function BarsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-[1200px] px-4 pt-0 pb-2 md:px-6 md:pb-3">
        <HeroSection />

        <ProductListWithFilters productType="bar" products={mockBarProducts} />
      </main>

      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
