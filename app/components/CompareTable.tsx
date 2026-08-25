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
import AffiliateDisclosure from "./AffiliateDisclosure";
import PurchaseLinkRow from "./PurchaseLinkRow";

interface CompareTableProps {
  products: ProductDetailProps[];
  visibleColumnIds: CompareColumnId[];
}

const SIGNIFICANT_DIFF_RATIO = 0.3;

type CompareColumn = NonNullable<ReturnType<typeof getCompareColumn>>;

interface RowAnalysis {
  diffRatio: number;
  isSignificant: boolean;
  isIdentical: boolean;
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

function analyzeRow(products: ProductDetailProps[], col: CompareColumn): RowAnalysis {
  if (col.id === "priceLinks") {
    return { diffRatio: 0, isSignificant: false, isIdentical: false };
  }

  const normalizedDisplays = products.map((product) =>
    normalizeCompareDisplayValue(formatCompareDisplayValue(col.getValue(product), col.id)),
  );
  const meaningfulDisplays = normalizedDisplays.filter((value) => value !== "-" && value !== "");
  const isIdentical =
    products.length > 1 &&
    meaningfulDisplays.length === products.length &&
    new Set(meaningfulDisplays).size === 1;

  if (!col.highlight || !col.toNumber) {
    return { diffRatio: 0, isSignificant: false, isIdentical };
  }

  const validValues = products
    .map((product) => col.toNumber!(col.getValue(product)))
    .filter((value): value is number => value != null && !Number.isNaN(value));

  if (validValues.length < 2) {
    return { diffRatio: 0, isSignificant: false, isIdentical };
  }

  const max = Math.max(...validValues);
  const min = Math.min(...validValues);
  const denominator = Math.max(Math.abs(max), Math.abs(min), 1);
  const diffRatio = (max - min) / denominator;

  return {
    diffRatio,
    isSignificant: diffRatio >= SIGNIFICANT_DIFF_RATIO && !isIdentical,
    isIdentical,
  };
}

export default function CompareTable({ products, visibleColumnIds }: CompareTableProps) {
  const columns = visibleColumnIds
    .map((id) => getCompareColumn(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCompareColumn>>[];
  const analyzedRows = columns.map((col) => ({
    col,
    analysis: analyzeRow(products, col),
  }));
  const significantRows = analyzedRows.filter((row) => row.analysis.isSignificant);
  const compactRows = analyzedRows.filter((row) => row.analysis.isIdentical);
  const standardRows = analyzedRows.filter(
    (row) => !row.analysis.isSignificant && !row.analysis.isIdentical && row.col.id !== "priceLinks",
  );
  const purchaseRows = analyzedRows.filter((row) => row.col.id === "priceLinks");
  const visibleRows = [...significantRows, ...standardRows, ...purchaseRows];

  return (
    <div className="rounded-xl border border-[#e8e8e8] bg-white">
      {significantRows.length > 0 ? (
        <div className="border-b border-[#e8e8e8] px-4 py-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">차이가 큰 항목 먼저 보기</p>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">
            비교 제품 간 수치 차이가 30% 이상 나는 항목을 상단에 배치했습니다.
          </p>
        </div>
      ) : null}
      <div className="overflow-x-auto">
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
            {visibleRows.map(({ col, analysis }, rowIndex) => {
              const highlight = getHighlight(products, col.id);
              const isPriceRow = col.id === "priceLinks";

              return (
                <tr key={col.id} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}>
                  <td className="border-b border-[#eee] px-4 py-3 font-medium text-[var(--foreground-muted)]">
                    <span>{col.label}</span>
                    {analysis.isSignificant ? (
                      <span className="mt-1 block text-[10px] font-semibold text-[#1B7F5B]">
                        차이 {Math.round(analysis.diffRatio * 100)}%
                      </span>
                    ) : null}
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
      {compactRows.length > 0 ? (
        <details className="border-t border-[#e8e8e8] px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
            차이가 거의 없는 항목 {compactRows.length}개
          </summary>
          <div className="mt-3 grid gap-2 text-xs text-[var(--foreground-muted)]">
            {compactRows.map(({ col }) => (
              <div key={col.id} className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-[var(--foreground)]">{col.label}</span>
                <span>
                  {products
                    .map((product) => formatCompareDisplayValue(col.getValue(product), col.id))
                    .filter((value, index, values) => values.indexOf(value) === index)
                    .join(" / ")}
                </span>
              </div>
            ))}
          </div>
        </details>
      ) : null}
      <div className="px-4 pb-3 pt-2">
        <AffiliateDisclosure className="mb-0" />
      </div>
    </div>
  );
}
