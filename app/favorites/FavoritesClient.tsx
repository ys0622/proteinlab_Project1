"use client";

import Link from "next/link";
import { useFavorites } from "../context/FavoritesContext";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface ProductEntry {
  slug: string;
  name: string;
  brand: string;
  category: string;
  protein: number;
  calories: number | null;
  sugar: number | null;
}

interface ProductsJson {
  products: ProductEntry[];
}

export default function FavoritesClient() {
  const { favoriteSlugs, clear } = useFavorites();
  const [allProducts, setAllProducts] = useState<ProductEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then((r) => r.json())
      .then((data: ProductsJson) => {
        setAllProducts(data.products ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const favorites = allProducts.filter((p) => favoriteSlugs.includes(p.slug));

  if (!loaded) {
    return (
      <div className="py-20 text-center text-sm text-[var(--foreground-muted)]">불러오는 중...</div>
    );
  }

  if (favoriteSlugs.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-4xl mb-4">♡</p>
        <p className="text-base font-semibold text-[var(--foreground)]">즐겨찾기가 비어 있습니다</p>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          제품 카드 하단의 ♡ 버튼을 눌러 즐겨찾기에 추가하세요.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          제품 둘러보기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">즐겨찾기</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--foreground-muted)]">{favorites.length}개</span>
          <button
            type="button"
            onClick={clear}
            className="text-xs text-[var(--foreground-muted)] underline hover:text-[var(--foreground)]"
          >
            전체 삭제
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {favorites.map((product) => (
          <ProductCard
            key={product.slug}
            slug={product.slug}
            brand={product.brand}
            name={product.name}
            capacity=""
            tags={[]}
            proteinPerServing={product.protein}
            calories={product.calories ?? undefined}
            sugar={product.sugar ?? undefined}
            density="-"
            productType={product.category as "drink" | "bar" | "yogurt" | "shake"}
          />
        ))}
      </div>

      {favorites.length < favoriteSlugs.length && (
        <p className="mt-4 text-xs text-[var(--foreground-muted)]">
          일부 제품은 데이터를 불러오지 못했습니다.
        </p>
      )}
    </div>
  );
}
