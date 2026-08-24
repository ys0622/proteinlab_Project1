"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductDetailProps } from "../data/products";
import { type CompareColumnId, getCompareColumn } from "../lib/compareColumns";
import {
  formatCompareDisplayValue,
  normalizeCompareDisplayValue,
} from "../lib/compareDisplay";
import { getProductImageUrl } from "../lib/productImage";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  getNaverSearchUrl,
  getOfficialMallUrl,
  normalizeCoupangUrl,
} from "../lib/purchaseLinks";
import { purchaseClick } from "@/lib/analytics";
import MetricBadgeGroup from "./MetricBadgeGroup";
import ProductBadge from "./ProductBadge";
import { formatProductBadgeLabel, getProductBadgeTone } from "./productBadgeUtils";
import PurchaseLinkRow from "./PurchaseLinkRow";

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
    .map((n, i) => {
      const display = formatCompareDisplayValue(col.getValue(products[i]), colId);
      return {
        n,
        i,
        normalizedDisplay: normalizeCompareDisplayValue(display),
      };
    })
    .filter(
      (x): x is { n: number; i: number; normalizedDisplay: string } =>
        x.n != null && !Number.isNaN(x.n),
    );

  if (valid.length === 0) return null;

  if (col.highlight === "higher") {
    const max = Math.max(...valid.map((x) => x.n));
    const winners = valid.filter((x) => x.n === max);
    const displaySet = new Set(winners.map((x) => x.normalizedDisplay));
    const indices =
      displaySet.size === 1
        ? valid.filter((x) => displaySet.has(x.normalizedDisplay)).map((x) => x.i)
        : winners.map((x) => x.i);
    return { type: "highest", indices };
  }

  const min = Math.min(...valid.map((x) => x.n));
  const winners = valid.filter((x) => x.n === min);
  const displaySet = new Set(winners.map((x) => x.normalizedDisplay));
  const indices =
    displaySet.size === 1
      ? valid.filter((x) => displaySet.has(x.normalizedDisplay)).map((x) => x.i)
      : winners.map((x) => x.i);
  return { type: "lowest", indices };
}

export default function CompareTable({ products, visibleColumnIds }: CompareTableProps) {
  const columns = visibleColumnIds
    .map((id) => getCompareColumn(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCompareColumn>>[];

  return (
    <div className="overflow-x-auto rounded-xl border border-[#e8e8e8]">
      <table className="w-full min-w-[600px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#e8e8e8] bg-[#f7f7f7]">
            <th className="px-4 py-3 font-semibold text-[var(--foreground)]" style={{ width: "140px" }}>
              항목
            </th>
            {products.map((p) => {
              const imageUrl = getProductImageUrl(p.slug);
              const gradeTags = (p.gradeTags ?? []).slice(0, 2);

              return (
                <th key={p.slug} className="border-l border-[#e8e8e8] px-4 py-3 text-center align-top font-normal">
                  <Link
                    href={`/product/${p.slug}`}
                    className="mx-auto mb-2 block h-16 w-16 overflow-hidden rounded-lg bg-white"
                  >
                    {imageUrl ? (
                      <div className="relative h-full w-full">
                        <Image src={imageUrl} alt="" fill className="object-contain" unoptimized />
                      </div>
                    ) : null}
                  </Link>
                  <div className="font-medium text-[var(--foreground)]">{p.name}</div>
                  <div className="mt-0.5 text-xs text-[var(--foreground-muted)]">{p.brand}</div>
                  {gradeTags.length > 0 ? (
                    <MetricBadgeGroup className="mt-1.5 justify-center">
                      {gradeTags.map((tag) => (
                        <ProductBadge
                          key={tag}
                          label={formatProductBadgeLabel(tag)}
                          tone={getProductBadgeTone(formatProductBadgeLabel(tag))}
                          className="pointer-events-none"
                        />
                      ))}
                    </MetricBadgeGroup>
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {columns.map((col, rowIndex) => {
            const highlight = getHighlight(products, col.id);
            const isPriceRow = col.id === "priceLinks";

            return (
              <tr key={col.id} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}>
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
                        ? highlight.indices.length > 1
                          ? "공동 최고"
                          : "최고"
                        : highlight.indices.length > 1
                          ? "공동 최저"
                          : "최저"
                      : null;

                  if (isPriceRow) {
                    const rawCoupangUrl =
                      normalizeCoupangUrl(p.coupangUrl) ?? getKnownSourceCoupangUrlBySlug(p.slug);
                    const coupangHref = getCoupangRedirectHref(
                      rawCoupangUrl,
                      p.productType ?? null,
                      p.slug,
                    );
                    const naverHref =
                      p.naverUrl && p.naverUrl !== "#" && p.naverUrl !== ""
                        ? p.naverUrl
                        : getNaverSearchUrl(p.brand, p.name);
                    const officialHref =
                      p.officialUrl && p.officialUrl !== "#" && p.officialUrl !== ""
                        ? p.officialUrl
                        : getOfficialMallUrl(p.brand);

                    return (
                      <td
                        key={p.slug}
                        className="border-b border-l border-[#eee] px-4 py-3"
                        style={bgStyle}
                      >
                        <PurchaseLinkRow
                          coupangHref={coupangHref}
                          naverHref={naverHref}
                          officialMallHref={officialHref}
                          size="sm"
                          coupangOnly
                          onCoupangClick={() =>
                            purchaseClick({
                              productId: p.slug,
                              productName: p.name,
                              brand: p.brand,
                              store: "coupang",
                              destinationUrl: coupangHref ?? undefined,
                              placement: "comparison_result",
                            })
                          }
                        />
                      </td>
                    );
                  }

                  const display = formatCompareDisplayValue(col.getValue(p), col.id);

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
