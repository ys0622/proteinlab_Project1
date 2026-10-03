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
    <div id="comparison-table" className="scroll-mt-4 rounded-xl border border-[#e8e8e8] bg-white">
      {significantRows.length > 0 ? (
        <div className="border-b border-[#e8e8e8] px-3 py-2 md:px-4 md:py-3">
          <p className="text-xs font-semibold text-[var(--foreground)] md:text-sm">차이가 큰 항목부터 표시</p>
          <p className="mt-0.5 text-[10px] text-[var(--foreground-muted)] md:mt-1 md:text-xs">
            비교 제품 간 수치 차이가 30% 이상 나는 항목을 상단에 배치했습니다.
          </p>
        </div>
      ) : null}
      <div className="md:hidden">
        <div
          className="grid border-b border-[#e8e8e8] bg-[#f7f7f7]"
          style={{ gridTemplateColumns: `72px repeat(${products.length}, minmax(0, 1fr))` }}
        >
          <div className="flex items-center px-2 text-[11px] font-bold text-[var(--foreground-muted)]">
            항목
          </div>
          {products.map((product, productIndex) => {
            const imageUrl = getProductImageUrl(product.slug);

            return (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="min-w-0 border-l border-[#e8e8e8] px-1 py-1.5 text-center transition-colors hover:bg-white"
              >
                <span className="mx-auto flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-white">
                  {imageUrl ? (
                    <span className="relative block h-full w-full">
                      <Image src={imageUrl} alt="" fill className="object-contain" unoptimized />
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-[9px] font-semibold text-[#1F5A3D]">
                  제품 {productIndex + 1}
                </span>
                <span className="line-clamp-2 block break-keep text-[10px] font-semibold leading-[1.25] text-[var(--foreground)]">
                  {product.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div>
          {visibleRows.map(({ col, analysis }) => {
            const highlight = getHighlight(products, col.id);
            const isPriceRow = col.id === "priceLinks";

            return (
              <section
                key={col.id}
                className="grid border-b border-[#eceae6] last:border-b-0"
                style={{ gridTemplateColumns: `72px repeat(${products.length}, minmax(0, 1fr))` }}
                aria-label={col.label}
              >
                <div className="flex min-w-0 flex-col justify-center bg-[#fcfbf8] px-2 py-2">
                  <h3 className="break-keep text-[11px] font-bold leading-tight text-[var(--foreground)]">{col.label}</h3>
                  {analysis.isSignificant ? (
                    <span className="mt-0.5 text-[8px] font-bold text-[#1B7F5B]">
                      {Math.round(analysis.diffRatio * 100)}% 차이
                    </span>
                  ) : null}
                </div>
                {products.map((product, productIndex) => {
                    const isHighlighted = highlight?.indices.includes(productIndex);
                    const highlightType = isHighlighted ? highlight?.type : null;
                    const cellStyle =
                      highlightType === "highest"
                        ? { background: "#FFF3D6", borderColor: "#F0D89E" }
                        : highlightType === "lowest"
                          ? { background: "#E7F3EC", borderColor: "#C5DFCF" }
                          : undefined;
                    const highlightLabel =
                      highlightType === "highest"
                        ? highlight?.indices.length === 1
                          ? "최고"
                          : "공동 최고"
                        : highlightType === "lowest"
                          ? highlight?.indices.length === 1
                            ? "최저"
                            : "공동 최저"
                          : null;

                    if (isPriceRow) {
                      const rawCoupangUrl =
                        normalizeCoupangUrl(product.coupangUrl) ??
                        getKnownSourceCoupangUrlBySlug(product.slug);
                      const coupangHref = getCoupangRedirectHref(
                        rawCoupangUrl,
                        product.productType ?? null,
                        product.slug,
                      );
                      const naverHref =
                        product.naverUrl && product.naverUrl !== "#" && product.naverUrl !== ""
                          ? product.naverUrl
                          : getNaverSearchUrl(product.brand, product.name);
                      const officialHref =
                        product.officialUrl && product.officialUrl !== "#" && product.officialUrl !== ""
                          ? product.officialUrl
                          : getOfficialMallUrl(product.brand);

                      return (
                        <div key={product.slug} className="flex min-w-0 items-center border-l border-[#eceae6] px-1 py-1.5">
                          <PurchaseLinkRow
                            coupangHref={coupangHref}
                            naverHref={naverHref}
                            officialMallHref={officialHref}
                            size="sm"
                            coupangOnly
                            coupangImpressionTracking={{
                              productId: product.slug,
                              productName: product.name,
                              productBrand: product.brand,
                              productCategory: product.productType,
                              linkPosition: "comparison_result",
                              contentId: "compare_table_mobile",
                              itemPosition: productIndex + 1,
                            }}
                            onCoupangClick={() =>
                              purchaseClick({
                                productId: product.slug,
                                productName: product.name,
                                brand: product.brand,
                                store: "coupang",
                                destinationUrl: coupangHref ?? undefined,
                                placement: "comparison_result",
                              })
                            }
                          />
                        </div>
                      );
                    }

                    const display = formatCompareDisplayValue(col.getValue(product), col.id);

                    return (
                      <div
                        key={product.slug}
                        className="flex min-w-0 flex-wrap items-center justify-center border-l border-[#eceae6] px-1 py-2 text-center"
                        style={cellStyle}
                      >
                        <span className="break-words text-[11px] font-semibold leading-tight text-[var(--foreground)]">
                          {display}
                        </span>
                        {highlightLabel ? (
                          <span
                            className="ml-0.5 text-[8px] font-bold"
                            style={{ color: highlightType === "highest" ? "#B45309" : "#1B7F5B" }}
                          >
                            {highlightLabel}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
              </section>
            );
          })}
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
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
                            coupangImpressionTracking={{
                              productId: p.slug,
                              productName: p.name,
                              productBrand: p.brand,
                              productCategory: p.productType,
                              linkPosition: "comparison_result",
                              contentId: "compare_table",
                            }}
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
