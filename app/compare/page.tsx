"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CompareTable from "../components/CompareTable";
import { useCompare } from "../context/CompareContext";
import { getProductBySlug } from "../data/products";
import { getProductImageUrl } from "../lib/productImage";
import type { CompareColumnId } from "../lib/compareColumns";
import { COMPARE_COLUMNS } from "../lib/compareColumns";

const MAX_PRODUCTS = 4;

export default function ComparePage() {
  const router = useRouter();
  const { selectedSlugs, remove, clear } = useCompare();
  const [visibleIds, setVisibleIds] = useState<CompareColumnId[]>([
    "proteinSource",
    "proteinPerServing",
    "bcaa",
    "calories",
    "sugar",
    "fat",
    "sodium",
    "density",
    "priceLinks",
  ]);

  const products = useMemo(
    () =>
      selectedSlugs
        .map((slug) => getProductBySlug(slug))
        .filter((p): p is NonNullable<typeof p> => p != null),
    [selectedSlugs]
  );

  const toggleColumn = (id: CompareColumnId) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const headers = ["항목", ...products.map((p) => `${p.brand} ${p.name}`)];
    const rows = visibleIds
      .filter((id) => id !== "priceLinks")
      .map((id) => {
        const col = COMPARE_COLUMNS.find((c) => c.id === id);
        if (!col) return [];
        return [col.label, ...products.map((p) => String(col.getValue(p) ?? "—"))];
      });
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "proteinlab-compare.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyShareLink = async () => {
    const path = `/compare?slugs=${selectedSlugs.join(",")}`;
    const url = typeof window !== "undefined" ? window.location.origin + path : "";
    await navigator.clipboard.writeText(url);
    alert("공유 링크가 복사되었습니다.");
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="bg-[#EFEDE6]">
          <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
            <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a", fontWeight: 700 }}>제품 비교</h1>
            <p className="mt-1 text-sm" style={{ color: "#6b6b6b" }}>
              비교할 제품을 선택해 주세요. (최대 4개)
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              제품 목록으로
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header />

      {/* 히어로 영역 */}
      <section className="bg-[#EFEDE6]">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a", fontWeight: 700 }}>제품 비교</h1>
              <p className="mt-1 text-sm" style={{ color: "#6b6b6b" }}>
                최대 4개 제품을 나란히 비교합니다
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#d9d6cf] bg-white px-4 py-2 text-sm font-medium hover:bg-[#f5f5f5]"
                style={{ color: "#3d3d3d" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                CSV 내보내기
              </button>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#d9d6cf] bg-white px-4 py-2 text-sm font-medium hover:bg-[#f5f5f5]"
                style={{ color: "#3d3d3d" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                공유 링크 복사
              </button>
              <button
                type="button"
                onClick={() => { clear(); router.push("/"); }}
                className="rounded-lg border border-[#d9d6cf] bg-white px-4 py-2 text-sm font-medium hover:bg-[#f5f5f5]"
                style={{ color: "#3d3d3d" }}
              >
                초기화
              </button>
            </div>
          </div>

          {/* 선택된 제품 */}
          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-3">
              {products.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-3 rounded-xl border border-[#e8e6e3] bg-white p-3 pr-2"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#f7f7f7]">
                    {getProductImageUrl(p.slug) ? (
                      <Image
                        src={getProductImageUrl(p.slug)!}
                        alt=""
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs" style={{ color: "#7a7a7a" }}>{p.brand}</p>
                    <p className="truncate text-sm font-medium" style={{ color: "#1a1a1a" }}>{p.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(p.slug)}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-[#eee]"
                    style={{ color: "#999" }}
                    aria-label="제거"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              ))}
              {products.length < MAX_PRODUCTS && (
                <Link
                  href="/"
                  className="flex h-[72px] w-[140px] flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#d9d6cf] text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  style={{ borderRadius: "12px", color: "#999", background: "rgba(255,255,255,0.5)" }}
                >
                  + 제품 추가
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 본문 영역 */}
      <main className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
        <div className="flex flex-col gap-6">
          {/* 표시할 항목 선택 */}
          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: "#3d3d3d" }}>표시할 항목 선택</p>
            <div className="flex flex-wrap gap-2">
              {COMPARE_COLUMNS.map((col) => {
                const on = visibleIds.includes(col.id);
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => toggleColumn(col.id)}
                    className="rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                    style={{
                      background: on ? "#2F5D46" : "#f3f3f3",
                      color: on ? "white" : "#6b6b6b",
                      border: on ? "none" : "1px solid #e0e0e0",
                    }}
                  >
                    {col.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 비교 테이블 */}
          <CompareTable products={products} visibleColumnIds={visibleIds} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
