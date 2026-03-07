import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import FilterSection from "./components/FilterSection";
import SortBar from "./components/SortBar";
import ProductCard from "./components/ProductCard";
import { mockProducts } from "./data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <main className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
        <HeroSection />

        {/* 1. 제품 검색 (최상단) */}
        <div className="mt-6" style={{ marginTop: "24px" }}>
          <SearchBar />
        </div>

        {/* 2. 필터 영역 (검색창 바로 아래, 순서: 브랜드 → 단백질 함량 → 단백질 급원 → 맛 → 용량 → 빠른 큐레이션) */}
        <div className="mt-6" style={{ marginTop: "24px" }}>
          <FilterSection />
        </div>

        {/* 3. 제품 정렬 영역 */}
        <div className="mt-6" style={{ marginTop: "24px" }}>
          <SortBar total={mockProducts.length} />
        </div>

        {/* 4. 제품 카드 영역 (desktop 4열, tablet 3열, mobile 2열) */}
        <section
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          style={{ marginTop: "24px" }}
          aria-label="제품 목록"
        >
          {mockProducts.map((product, i) => (
            <ProductCard
              key={`${product.brand}-${product.name}-${i}`}
              {...product}
            />
          ))}
        </section>
      </main>

      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
