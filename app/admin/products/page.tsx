"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Product {
  slug: string;
  name: string;
  brand: string;
  manufacturer?: string;
  productType?: string;
  proteinPerServing?: number;
  imageStatus?: string;
  nutritionPerBottle?: Record<string, unknown>;
  capacity?: string;
  gradeTags?: string[];
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "drink" | "bar">("all");
  const [imageFilter, setImageFilter] = useState<"all" | "no-image" | "has-image">("all");
  const [reviewFilter, setReviewFilter] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const urlFilter = searchParams.get("filter");

  useEffect(() => {
    if (urlFilter === "review") setReviewFilter(true);
  }, [urlFilter]);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => {
        const all = [
          ...(data.drinks || []).map((p: Product) => ({ ...p, productType: "drink" })),
          ...(data.bars || []).map((p: Product) => ({ ...p, productType: "bar" })),
        ];
        setProducts(all);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = useCallback(async (slug: string) => {
    const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.slug !== slug));
      setDeleteConfirm(null);
    }
  }, []);

  const needsReview = (p: Product) => {
    const n = p.nutritionPerBottle;
    return !n || n.sodiumMg === undefined || n.fatG === undefined || n.carbsG === undefined;
  };

  const filtered = products.filter((p) => {
    if (typeFilter !== "all" && p.productType !== typeFilter) return false;
    if (imageFilter === "no-image" && p.imageStatus !== "no-image") return false;
    if (imageFilter === "has-image" && p.imageStatus === "no-image") return false;
    if (reviewFilter && !needsReview(p)) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.manufacturer?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">제품 관리</h1>
          <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
            전체 {products.length}개
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors"
        >
          + 제품 추가
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="제품명, 브랜드, slug 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as "all" | "drink" | "bar")}
          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none"
        >
          <option value="all">전체 카테고리</option>
          <option value="drink">단백질 음료</option>
          <option value="bar">단백질 바</option>
        </select>

        <select
          value={imageFilter}
          onChange={(e) => setImageFilter(e.target.value as "all" | "no-image" | "has-image")}
          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none"
        >
          <option value="all">모든 이미지 상태</option>
          <option value="no-image">이미지 없음</option>
          <option value="has-image">이미지 있음</option>
        </select>

        <button
          onClick={() => setReviewFilter((v) => !v)}
          className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
            reviewFilter
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground-muted)]"
          }`}
        >
          검토 필요만
        </button>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-xs text-[var(--foreground-muted)] mb-3">
          {filtered.length}개 표시 중
        </p>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-[var(--foreground-muted)]">로딩 중...</div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--beige-warm)]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">
                  제품명
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">
                  브랜드
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">
                  카테고리
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">
                  단백질
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">
                  이미지
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--foreground-muted)]">
                  상태
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[var(--foreground-muted)]">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.slug}
                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--beige-warm)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-[var(--foreground)]">{p.name}</div>
                      <div className="text-xs text-[var(--foreground-muted)]">{p.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">{p.brand}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.productType === "bar"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {p.productType === "bar" ? "바" : "음료"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">
                      {p.proteinPerServing}g
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.imageStatus === "no-image"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {p.imageStatus === "no-image" ? "없음" : "있음"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {needsReview(p) && (
                        <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700">
                          검토 필요
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/products/${p.slug}/edit`}
                        className="text-xs text-[var(--accent)] hover:underline mr-3"
                      >
                        수정
                      </Link>
                      {deleteConfirm === p.slug ? (
                        <>
                          <button
                            onClick={() => handleDelete(p.slug)}
                            className="text-xs text-red-600 hover:underline mr-1"
                          >
                            확인
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs text-[var(--foreground-muted)] hover:underline"
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(p.slug)}
                          className="text-xs text-[var(--foreground-muted)] hover:text-red-500"
                        >
                          삭제
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--foreground-muted)]">로딩 중...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
