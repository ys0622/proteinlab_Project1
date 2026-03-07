"use client";

import type { ProductDetailProps } from "../data/products";
import { type CompareColumnId, getCompareColumn } from "../lib/compareColumns";
import Link from "next/link";

interface CompareTableProps {
  products: ProductDetailProps[];
  visibleColumnIds: CompareColumnId[];
}

function getNumericValues(
  products: ProductDetailProps[],
  colId: CompareColumnId
): (number | null)[] {
  const col = getCompareColumn(colId);
  if (!col?.highlight || !col.toNumber) return [];
  return products.map((p) => col.toNumber!(col.getValue(p)));
}

function getHighlight(
  products: ProductDetailProps[],
  colId: CompareColumnId
): { type: "highest" | "lowest"; indices: number[] } | null {
  const col = getCompareColumn(colId);
  if (!col?.highlight) return null;
  const nums = getNumericValues(products, colId);
  const valid = nums
    .map((n, i) => ({ n, i }))
    .filter((x) => x.n != null && !Number.isNaN(x.n)) as { n: number; i: number }[];
  if (valid.length === 0) return null;
  if (col.highlight === "higher") {
    const max = Math.max(...valid.map((x) => x.n));
    return { type: "highest", indices: valid.filter((x) => x.n === max).map((x) => x.i) };
  }
  const min = Math.min(...valid.map((x) => x.n));
  return { type: "lowest", indices: valid.filter((x) => x.n === min).map((x) => x.i) };
}

export default function CompareTable({ products, visibleColumnIds }: CompareTableProps) {
  const columns = visibleColumnIds
    .map((id) => getCompareColumn(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCompareColumn>>[];

  const detailHref = (slug: string) => `/product/${slug}`;

  return (
    <div className="overflow-x-auto rounded-xl border border-[#e8e8e8]">
      <table className="w-full min-w-[600px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#e8e8e8] bg-[#f7f7f7]">
            <th className="px-4 py-3 font-semibold text-[var(--foreground)]" style={{ width: "140px" }}>
              항목
            </th>
            {products.map((p) => (
              <th key={p.slug} className="border-l border-[#e8e8e8] px-4 py-3 text-center">
                <div className="font-medium text-[var(--foreground)]">{p.name}</div>
                <div className="mt-0.5 text-xs text-[var(--foreground-muted)]">{p.brand}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns.map((col, rowIndex) => {
            const highlight = getHighlight(products, col.id);
            const isPriceRow = col.id === "priceLinks";

            return (
              <tr
                key={col.id}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}
              >
                <td className="border-b border-[#eee] px-4 py-3 font-medium text-[var(--foreground-muted)]">
                  {col.label}
                </td>
                {products.map((p, colIndex) => {
                  const isHighlighted = highlight?.indices.includes(colIndex);
                  const bgStyle =
                    isHighlighted && highlight?.type === "highest"
                      ? { background: "#FFF3D6" }
                      : isHighlighted && highlight?.type === "lowest"
                        ? { background: "#E7F3EC" }
                        : undefined;
                  const label =
                    isHighlighted && highlight
                      ? highlight.type === "highest"
                        ? "공동 최고"
                        : highlight.indices.length > 1
                          ? "공동 최저"
                          : "최저"
                      : null;

                  if (isPriceRow) {
                    return (
                      <td
                        key={p.slug}
                        className="border-b border-l border-[#eee] px-4 py-3"
                        style={bgStyle}
                      >
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Link
                            href={detailHref(p.slug)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-white pl-2.5 pr-3 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                            style={{ borderRadius: "999px", height: "32px" }}
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#ff5722] text-white" aria-hidden="true">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22 22 0 01-3.95 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                            </span>
                            쿠팡
                          </Link>
                          <Link
                            href={detailHref(p.slug)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-white pl-2.5 pr-3 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                            style={{ borderRadius: "999px", height: "32px" }}
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#03c75a] text-white" aria-hidden="true">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
                            </span>
                            네이버쇼핑
                          </Link>
                          <Link
                            href={detailHref(p.slug)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-white pl-2.5 pr-3 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                            style={{ borderRadius: "999px", height: "32px" }}
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#5c5c5c] text-white" aria-hidden="true">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            </span>
                            공식몰
                          </Link>
                        </div>
                      </td>
                    );
                  }

                  const value = col.getValue(p);
                  const display = value !== undefined && value !== "" ? String(value) : "—";

                  return (
                    <td
                      key={p.slug}
                      className="border-b border-l border-[#eee] px-4 py-3"
                      style={bgStyle}
                    >
                      <span className={isHighlighted ? "font-semibold text-[var(--foreground)]" : ""}>
                        {display}
                      </span>
                      {label && (
                        <span
                          className="ml-1 text-xs"
                          style={{
                            color: highlight?.type === "highest" ? "#E65100" : "#1B7F5B",
                          }}
                        >
                          ({label})
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
