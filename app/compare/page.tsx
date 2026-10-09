"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import CommercialAdSection from "../components/CommercialAdSection";
import CompareSummary from "../components/CompareSummary";
import CompareTable from "../components/CompareTable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MetricBadgeGroup from "../components/MetricBadgeGroup";
import ProductBadge from "../components/ProductBadge";
import { formatProductBadgeLabel, getProductBadgeTone } from "../components/productBadgeUtils";
import { useCompare } from "../context/CompareContext";
import type { ProductDetailProps } from "../data/products";
import { getAllProducts, getProductBySlug } from "../data/products";
import { getAllCompareLandings } from "../data/compareLandings";
import { getRecentProducts } from "../components/RecentlyViewedTracker";
import { COMPARE_COLUMNS, type CompareColumnId } from "../lib/compareColumns";
import { getQuickCurations, getCurationDefinition, type CurationCategory } from "../lib/curationSystem";
import { formatProductLabel } from "../lib/productLabel";
import { getProductImageUrl } from "../lib/productImage";
import { hybridScore } from "../lib/productScoring";
import { compareAdd, compareComplete, compareView, internalCtaClick } from "../../lib/analytics";

const compareFaqItems = [
  {
    question: "몇 개까지 한 번에 비교할 수 있나요?",
    answer: "최대 3개까지 나란히 비교할 수 있습니다. 4개 이상 후보가 있다면 먼저 2개씩 겨루듯 좁혀 나가는 편이 더 빠르게 결정됩니다.",
  },
  {
    question: "표시 항목은 어떤 기준으로 골라야 하나요?",
    answer: "다이어트가 목적이면 당류·칼로리를, 운동 후 보충이 목적이면 단백질 함량과 밀도(100mL당 단백질)를 먼저 켜서 보는 것이 좋습니다. 나트륨이나 BCAA는 필요할 때만 추가로 확인하면 됩니다.",
  },
  {
    question: "비교 링크를 공유하면 어떻게 되나요?",
    answer: "'공유 링크 복사'를 누르면 지금 선택한 제품 조합이 그대로 담긴 주소가 만들어집니다. 그 링크를 열면 누구나 같은 비교표를 바로 볼 수 있어 대화방에서 의견을 나눌 때 유용합니다.",
  },
];

const compareFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: compareFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const MAX_PRODUCTS = 3;
const OPERATOR_COMPARE_SLUGS = new Set([
  "proteone-vs-itthefit-shake",
  "takefit-vs-hymune-drink",
  "newcare-vs-sellex-drink",
  "takefit-max-vs-takefit-monster",
]);

export default function ComparePage() {
  const router = useRouter();
  const { selectedSlugs, remove, clear, toggle, canAdd } = useCompare();
  const chipRefs = useRef<Partial<Record<CompareColumnId, HTMLButtonElement | null>>>({});
  const [fetchedState, setFetchedState] = useState<{
    slugs: string;
    products: ProductDetailProps[];
  } | null>(null);
  const [visibleIds, setVisibleIds] = useState<CompareColumnId[]>([
    "proteinSource",
    "proteinPerServing",
    "bcaa",
    "calories",
    "sugar",
    "fat",
    "sodium",
    "fiber",
    "density",
    "priceLinks",
  ]);
  const [focusedColumnId, setFocusedColumnId] = useState<CompareColumnId | null>(null);
  const lastTrackedCompareKeyRef = useRef<string | null>(null);
  const [pickerQuery, setPickerQuery] = useState("");
  const [pickerCategory, setPickerCategory] = useState<string>("drink");
  const [pickerBrand, setPickerBrand] = useState<string>("all");
  const [pickerCurationSlug, setPickerCurationSlug] = useState<string | null>(null);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [viewCounts, setViewCounts] = useState<Record<string, Record<string, number>>>({});
  const allProducts = useMemo(() => getAllProducts(), []);
  const recommendedComparisons = useMemo(
    () => getAllCompareLandings().filter((item) => OPERATOR_COMPARE_SLUGS.has(item.slug)),
    [],
  );

  useEffect(() => {
    // 인기순 정렬을 위한 실제 조회수 — 없어도 품질 점수만으로 동작하므로 실패해도 무방.
    fetch("/api/popular")
      .then((res) => res.json())
      .then((data) => setViewCounts(data.views ?? {}))
      .catch(() => setViewCounts({}));
  }, []);

  const quickCurationChips = useMemo(
    () => getQuickCurations(pickerCategory as CurationCategory).filter((item) => item.slug !== "popular"),
    [pickerCategory],
  );

  useEffect(() => {
    // Recent products are client-only local storage state restored after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecentSlugs(getRecentProducts());
  }, []);

  const fallbackProducts = useMemo(
    () =>
      selectedSlugs
        .map((slug) => getProductBySlug(slug))
        .filter((p): p is NonNullable<typeof p> => p != null),
    [selectedSlugs],
  );
  const validSelectedSlugs = useMemo(
    () => fallbackProducts.map((product) => product.slug).filter((slug): slug is string => Boolean(slug)),
    [fallbackProducts],
  );

  useEffect(() => {
    const invalidSlugs = selectedSlugs.filter((slug) => !getProductBySlug(slug));
    invalidSlugs.forEach(remove);
  }, [remove, selectedSlugs]);

  useEffect(() => {
    if (selectedSlugs.length === 0) return;

    const slugs = selectedSlugs.join(",");
    let cancelled = false;

    fetch(`/api/products/compare?slugs=${encodeURIComponent(slugs)}`)
      .then((res) => res.json())
      .then((data: { products?: ProductDetailProps[] }) => {
        if (!cancelled && Array.isArray(data.products) && data.products.length > 0) {
          setFetchedState({ slugs, products: data.products });
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [selectedSlugs]);

  useEffect(() => {
    if (!focusedColumnId) return;
    const timer = window.setTimeout(() => setFocusedColumnId(null), 1800);
    return () => window.clearTimeout(timer);
  }, [focusedColumnId]);

  const slugsKey = selectedSlugs.join(",");
  const products =
    fetchedState?.slugs === slugsKey && fetchedState.products.length > 0
      ? fetchedState.products
      : fallbackProducts;

  const pickerBrands = useMemo(
    () => [...new Set(allProducts.filter((product) => product.productType === pickerCategory).map((product) => product.brand))].sort((a, b) => a.localeCompare(b, "ko")),
    [allProducts, pickerCategory],
  );
  const pickerCurationFilter = useMemo(() => {
    if (!pickerCurationSlug) return null;
    const curation = getCurationDefinition(pickerCurationSlug);
    const categoryConfig = curation?.categories[pickerCategory as CurationCategory];
    return categoryConfig?.filter ?? null;
  }, [pickerCurationSlug, pickerCategory]);

  const pickerProducts = useMemo(() => {
    const query = pickerQuery.trim().toLowerCase();
    const filtered = allProducts
      .filter((product) => product.productType === pickerCategory)
      .filter((product) => pickerBrand === "all" || product.brand === pickerBrand)
      .filter((product) => !query || `${product.brand} ${product.name}`.toLowerCase().includes(query))
      .filter((product) => !pickerCurationFilter || pickerCurationFilter(product));

    if (query) return filtered;

    // 검색어가 없을 땐 선택한 카테고리 안에서 인기순(하이브리드 점수)으로 보여준다.
    return [...filtered]
      .sort((a, b) => {
        const viewsA = viewCounts[a.productType ?? ""]?.[a.slug ?? ""] ?? 0;
        const viewsB = viewCounts[b.productType ?? ""]?.[b.slug ?? ""] ?? 0;
        return hybridScore(b, viewsB) - hybridScore(a, viewsA);
      })
      .slice(0, 8);
  }, [allProducts, pickerBrand, pickerCategory, pickerCurationFilter, pickerQuery, viewCounts]);
  const recentProducts = useMemo(
    () => recentSlugs.map((slug) => getProductBySlug(slug)).filter((product): product is NonNullable<typeof product> => product != null).slice(0, 4),
    [recentSlugs],
  );
  const addProduct = (slug: string) => {
    if (!selectedSlugs.includes(slug) && canAdd) {
      compareAdd(slug, selectedSlugs.length + 1);
      toggle(slug);
    }
  };

  useEffect(() => {
    const key = products.map((product) => product.slug).join(",");
    if (products.length < 2 || !key || lastTrackedCompareKeyRef.current === key) return;
    lastTrackedCompareKeyRef.current = key;
    compareView(products.length);
    compareComplete(products.length, products.map((product) => product.slug).filter((slug): slug is string => Boolean(slug)));
  }, [products]);

  useEffect(() => {
    if (selectedSlugs.length === 0) return;
    const next = validSelectedSlugs.length > 0
      ? `/compare?products=${validSelectedSlugs.join(",")}`
      : "/compare";
    router.replace(next, { scroll: false });
  }, [router, selectedSlugs.length, validSelectedSlugs]);

  const toggleColumn = (id: CompareColumnId) => {
    setVisibleIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSummaryChipSelect = (columnId: CompareColumnId) => {
    if (!visibleIds.includes(columnId)) {
      setVisibleIds((prev) => [...prev, columnId]);
    }

    setFocusedColumnId(columnId);

    window.requestAnimationFrame(() => {
      chipRefs.current[columnId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    });
  };

  const handleCopyShareLink = async () => {
    const path = `/compare?products=${products.map((product) => product.slug).join(",")}`;
    const url = typeof window !== "undefined" ? window.location.origin + path : "";
    await navigator.clipboard.writeText(url);
    alert("공유 링크를 복사했습니다.");
  };

  const selectedCategory =
    products.length > 0 && products.every((product) => product.productType === products[0]?.productType)
      ? products[0]?.productType
      : null;

  const compareDescription =
    selectedCategory === "drink"
      ? "단백질 음료를 단백질 함량, 당류, 칼로리, 원료 기준으로 한 번에 비교합니다. 운동 후용인지 식사 보완용인지 구분하기 쉽게 정리했습니다."
      : selectedCategory === "bar"
        ? "단백질 바를 단백질 함량, 당류, 칼로리 기준으로 비교합니다. 간식용인지 운동 중 보완용인지 구분하기 쉽게 정리했습니다."
        : selectedCategory === "yogurt"
          ? "단백질 요거트를 단백질 함량, 당류, 칼로리, 유형 기준으로 비교합니다. 그릭과 드링킹 차이도 함께 보기 쉽게 구성했습니다."
          : selectedCategory === "shake"
            ? "단백질 쉐이크를 단백질 함량, 당류, 식이섬유, 용도 기준으로 비교합니다. 식사대용인지 운동 후 보완용인지 구분하기 쉽게 정리했습니다."
            : "단백질 음료, 바, 요거트, 쉐이크를 최대 3개까지 한 화면에서 비교합니다.";

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section style={{ background: "#FAF8F3" }}>
          <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
            <h1 className="text-2xl font-bold" style={{ color: "#16412D", fontWeight: 700 }}>
              제품 비교
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
              비교할 제품을 먼저 담아보세요. 단백질 함량, 당류, 칼로리를 한 화면에서 바로 볼 수 있습니다. 최대 3개까지 비교할 수 있습니다.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="비교 카테고리 선택">
              {(
                [
                  { value: "drink", label: "음료" },
                  { value: "bar", label: "바" },
                  { value: "yogurt", label: "요거트" },
                  { value: "shake", label: "쉐이크" },
                ] as const
              ).map((tab) => {
                const active = pickerCategory === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setPickerCategory(tab.value);
                      setPickerBrand("all");
                      setPickerCurationSlug(null);
                    }}
                    className="rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors"
                    style={
                      active
                        ? { background: "var(--accent)", color: "#fff" }
                        : { background: "#fff", color: "var(--foreground-muted)", border: "1px solid var(--border)" }
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-[1fr_100px] gap-2 md:grid-cols-[1fr_160px] md:gap-3">
              <input value={pickerQuery} onChange={(event) => setPickerQuery(event.target.value)} placeholder="제품명 또는 브랜드 검색" className="min-h-11 min-w-0 rounded-lg border bg-white px-3 text-sm" style={{ borderColor: "var(--border)" }} aria-label="비교할 제품 검색" />
              <select value={pickerBrand} onChange={(event) => setPickerBrand(event.target.value)} className="min-h-11 min-w-0 rounded-lg border bg-white px-2 text-sm md:px-3" style={{ borderColor: "var(--border)" }} aria-label="브랜드 선택">
                <option value="all">전체 브랜드</option>{pickerBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>

            {quickCurationChips.length > 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 shrink-0 text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
                  빠른 필터
                </span>
                {quickCurationChips.map((chip) => {
                  const active = pickerCurationSlug === chip.slug;
                  return (
                    <button
                      key={chip.slug}
                      type="button"
                      onClick={() => setPickerCurationSlug(active ? null : chip.slug)}
                      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors"
                      style={
                        active
                          ? { background: "var(--accent)", borderColor: "var(--accent)", color: "#fff" }
                          : { background: "#fff", borderColor: "var(--border)", color: "var(--foreground-muted)" }
                      }
                      aria-pressed={active}
                    >
                      <span aria-hidden>{chip.icon}</span>
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <p className="mt-4 text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
              {pickerQuery.trim() || pickerCurationFilter ? "검색 결과" : "인기 제품부터 담아보세요"}
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {pickerProducts.map((product) => {
                const gradeTags = (product.gradeTags ?? []).slice(0, 2);
                const imageUrl = getProductImageUrl(product.slug ?? "");
                return (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => addProduct(product.slug!)}
                    disabled={selectedSlugs.includes(product.slug!) || !canAdd}
                    className="flex min-h-11 items-center justify-between gap-2.5 rounded-lg border bg-white px-3 py-2 text-left text-sm transition-colors hover:border-[var(--accent)] disabled:opacity-50"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white">
                      {imageUrl ? (
                        <Image src={imageUrl} alt="" fill className="object-contain" unoptimized />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-keep leading-snug">{formatProductLabel(product.brand, product.name)}</span>
                      {gradeTags.length > 0 ? (
                        <MetricBadgeGroup className="mt-1">
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
                    </span>
                    <span className="shrink-0 text-[var(--accent)]">비교 추가</span>
                  </button>
                );
              })}
            </div>
            {recentProducts.length > 0 ? <div className="mt-5"><p className="text-sm font-semibold">최근 본 제품</p><div className="mt-2 flex flex-wrap gap-2">{recentProducts.map((product) => <button key={product.slug} type="button" onClick={() => addProduct(product.slug)} disabled={selectedSlugs.includes(product.slug) || !canAdd} className="min-h-11 rounded-full border bg-white px-3 text-xs disabled:opacity-50" style={{ borderColor: "var(--border)" }}>{formatProductLabel(product.brand, product.name)}</button>)}</div></div> : null}
            <div className="mt-5"><p className="text-sm font-semibold">추천 비교 조합</p><div className="mt-2 grid gap-2 md:grid-cols-2">{recommendedComparisons.map((item) => <Link key={item.slug} href={`/compare?products=${item.productSlugs.join(",")}`} className="rounded-lg border bg-white px-3 py-3 text-sm hover:border-[var(--accent)]" style={{ borderColor: "var(--border)" }}>{item.title}</Link>)}</div></div>
            <p className="mt-5 text-xs leading-5" style={{ color: "var(--foreground-muted)" }}>제품을 2개 이상 선택하면 단백질·당류·칼로리·용량·밀도와 구매 채널을 나란히 비교할 수 있습니다.</p>
            <Link
              href="/products"
              onClick={() =>
                internalCtaClick({
                  destinationUrl: "/products",
                  contentId: "compare_empty_state:product_picker",
                })
              }
              className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              제품 고르러 가기
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header />

      <section style={{ background: "#FAF8F3" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#16412D", fontWeight: 700 }}>
                제품 비교
              </h1>
              <p className="mt-1 text-sm" style={{ color: "#6b6b6b" }}>
                {compareDescription}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#d9d6cf] bg-white px-4 py-2 text-sm font-medium hover:bg-[#f5f5f5]"
                style={{ color: "#3d3d3d" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                공유 링크 복사
              </button>
              <button
                type="button"
                onClick={() => {
                  clear();
                  router.push("/products");
                }}
                className="rounded-lg border border-[#d9d6cf] bg-white px-4 py-2 text-sm font-medium hover:bg-[#f5f5f5]"
                style={{ color: "#3d3d3d" }}
              >
                비교 초기화
              </button>
            </div>
          </div>

          <div className="mt-5">
            <div
              className={`grid items-stretch gap-2 md:flex md:flex-wrap md:items-center md:gap-3 ${
                products.length >= 3 ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              {products.map((p) => (
                <div
                  key={p.slug}
                  className="relative flex min-w-0 flex-col items-center gap-1 rounded-xl border border-[#e8e6e3] bg-white p-2 text-center md:flex-row md:gap-3 md:p-3 md:pr-2 md:text-left"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-white md:h-12 md:w-12">
                    {getProductImageUrl(p.slug) ? (
                      <Image src={getProductImageUrl(p.slug)!} alt="" fill className="object-contain" unoptimized />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] md:text-xs" style={{ color: "#7a7a7a" }}>{p.brand}</p>
                    <p className="line-clamp-2 break-keep text-[11px] font-semibold leading-snug md:text-sm md:font-medium" style={{ color: "#1a1a1a" }}>{p.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(p.slug)}
                    className="absolute right-1 top-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/90 hover:bg-[#eee] md:static md:h-8 md:w-8 md:bg-transparent"
                    style={{ color: "#999" }}
                    aria-label="제품 제거"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              ))}
              {products.length < MAX_PRODUCTS && (
                <Link
                  href="/products"
                  onClick={() =>
                    internalCtaClick({
                      destinationUrl: "/products",
                      contentId: "compare_selected_products:add_product",
                    })
                  }
                  className="flex min-h-[88px] min-w-0 items-center justify-center rounded-xl border-2 border-dashed border-[#d9d6cf] px-2 text-center text-xs font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] md:h-[72px] md:min-h-0 md:w-[140px] md:flex-shrink-0 md:text-sm"
                  style={{ borderRadius: "12px", color: "#999", background: "rgba(255,255,255,0.5)" }}
                >
                  + 제품 추가
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <CompareSummary
            products={products}
            visibleColumnIds={visibleIds}
            onChipSelect={handleSummaryChipSelect}
          />

          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: "#3d3d3d" }}>
              표시 항목 선택
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              {COMPARE_COLUMNS.map((col) => {
                const on = visibleIds.includes(col.id);
                const isFocused = focusedColumnId === col.id;

                return (
                  <button
                    key={col.id}
                    type="button"
                    ref={(node) => {
                      chipRefs.current[col.id] = node;
                    }}
                    onClick={() => toggleColumn(col.id)}
                    className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                    style={{
                      background: on ? "#16412D" : isFocused ? "#E8F0EA" : "#f3f3f3",
                      color: on ? "white" : isFocused ? "#16412D" : "#6b6b6b",
                      border: on ? "none" : isFocused ? "1px solid #9db6a5" : "1px solid #e0e0e0",
                      boxShadow: isFocused ? "0 0 0 2px rgba(47,93,70,0.12)" : "none",
                    }}
                  >
                    {col.label}
                  </button>
                );
              })}
            </div>
          </div>

          <CompareTable products={products} visibleColumnIds={visibleIds} />

          <section className="rounded-2xl border p-5 md:p-6" style={{ borderColor: "#e8e6e3" }}>
            <h2 className="text-lg font-bold" style={{ color: "#16412D" }}>비교표는 이렇게 보면 편합니다</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6" style={{ color: "#5B6660" }}>
              <li>• 목적부터 정하기: 다이어트면 당류·칼로리, 운동 후 보충이면 단백질과 밀도를 먼저 켜세요.</li>
              <li>• 숫자만 보지 말고 원료(단백질 종류)와 나트륨까지 같이 보면 실제 체감 차이가 더 잘 보입니다.</li>
              <li>• 후보가 4개 이상이면 2개씩 먼저 겨루듯 좁힌 뒤, 남은 후보로 다시 비교하세요.</li>
            </ul>
          </section>

          <section className="rounded-2xl border p-5 md:p-6" style={{ borderColor: "#e8e6e3", background: "#FAF8F3" }}>
            <h2 className="text-lg font-bold" style={{ color: "#16412D" }}>💬 자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {compareFaqItems.map((item) => (
                <div key={item.question} className="rounded-xl border bg-white p-4" style={{ borderColor: "#e8e6e3" }}>
                  <p className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>Q. {item.question}</p>
                  <p className="mt-2 text-sm leading-6" style={{ color: "#5B6660" }}>A. {item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="mt-6">
          <CommercialAdSection pageType="compare" />
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqJsonLd) }} />
      <Footer />
    </div>
  );
}
