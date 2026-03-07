import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import ProductListWithFilters from "./components/ProductListWithFilters";
import { mockProducts } from "./data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-[1200px] px-4 pt-0 pb-2 md:px-6 md:pb-3">
        <ProductListWithFilters productType="drink" products={mockProducts} />
      </main>

      <Footer />
    </div>
  );
}
