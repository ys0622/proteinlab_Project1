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
                        <div className="flex flex-wrap gap-1.5">
                          <Link
                            href={detailHref(p.slug)}
                            className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:opacity-90"
                            style={{ background: "#FFF8F0", borderColor: "#E8922C", color: "#C75B00" }}
                          >
                            쿠팡
                          </Link>
                          <Link
                            href={detailHref(p.slug)}
                            className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:opacity-90"
                            style={{ background: "#E8F5E9", borderColor: "#03C75A", color: "#03C75A" }}
                          >
                            네이버쇼핑
                          </Link>
                          <Link
                            href={detailHref(p.slug)}
                            className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:opacity-90"
                            style={{ background: "#E8E8E8", borderColor: "#9e9e9e", color: "#424242" }}
                          >
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
