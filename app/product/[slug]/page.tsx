import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminQuickEdit from "../../components/AdminQuickEdit";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MetricBadgeGroup from "../../components/MetricBadgeGroup";
import NutritionDetailSection from "../../components/NutritionDetailSection";
import ProductBadge from "../../components/ProductBadge";
import type { ProductDetailProps } from "../../data/products";
import {
  formatProductBadgeLabel,
  getMetricBadgeAriaLabel,
  getMetricBadgeTooltip,
  getProductBadgeTone,
} from "../../components/productBadgeUtils";
import ProductReviewSection from "../../components/ProductReviewSection";
import PurchaseLinkRow from "../../components/PurchaseLinkRow";
import ServingBasisNotice from "../../components/ServingBasisNotice";
import { getNutritionDetail } from "../../data/products";
import { getCategoryHref, getCategoryLabel } from "../../lib/categories";
import { getProductBySlugAsync } from "../../lib/productData";
import { getProductImageUrl } from "../../lib/productImage";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  normalizeCoupangUrl,
} from "../../lib/purchaseLinks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getProductKindLabel(productType?: "drink" | "bar" | "yogurt" | "shake") {
  return getCategoryLabel(productType ?? "drink");
}

function getMetricLine(product: ProductDetailProps) {
  const parts = [
    `단백질 ${product.proteinPerServing}g`,
    product.calories != null ? `${product.calories}kcal` : null,
    product.sugar != null ? `당류 ${product.sugar}g` : null,
    product.density ? product.density : null,
  ].filter(Boolean);

  return parts.join(" · ");
}

function getProductFaqs(product: ProductDetailProps) {
  const categoryHref = getCategoryHref((product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake");
  const categoryLabel = getProductKindLabel(product.productType);

  return [
    {
      question: `${product.brand} ${product.name}은 어떤 기준으로 보면 되나요?`,
      answer: `${product.brand} ${product.name}은 ${getMetricLine(product)} 기준으로 먼저 보는 편이 좋습니다. 같은 ${categoryLabel} 안에서는 단백질 총량, 당류, 칼로리, 용량당 밀도를 같이 비교해야 실제 체감 차이가 잘 보입니다.`,
    },
    {
      question: `이 제품과 비슷한 ${categoryLabel}은 어디서 더 볼 수 있나요?`,
      answer: `ProteinLab ${categoryLabel} 목록 페이지(${categoryHref})와 비교 페이지에서 비슷한 스펙 제품을 한 번에 볼 수 있습니다. 특히 같은 카테고리 제품끼리 비교하면 목적별 차이가 더 명확합니다.`,
    },
    {
      question: `구매 전에 마지막으로 확인할 포인트는 무엇인가요?`,
      answer: `제품 자체 스펙만 보지 말고, 박스 가격, 맛 옵션, 구매 채널, 그리고 내 사용 목적에 맞는지까지 같이 보는 편이 좋습니다. 다이어트 목적이면 당류와 칼로리, 운동 목적이면 단백질 총량과 밀도를 우선 확인하면 됩니다.`,
    },
  ];
}

function renderSummaryMetricValue(value: string, isCompact: boolean) {
  if (!isCompact) {
    return value;
  }

  const [metricValue, metricUnit] = value.split("/");

  if (!metricUnit) {
    return value;
  }

  return (
    <span className="flex min-w-0 flex-col">
      <span className="truncate">{metricValue}</span>
      <span className="text-[11px] font-semibold leading-tight text-[#6b6b6b]">
        /{metricUnit}
      </span>
    </span>
  );
}

function getShakePositioning(product: ProductDetailProps) {
  const calories = product.calories ?? 0;
  const fiber = product.nutritionPerBottle?.fiberG ?? 0;
  const sugar = product.sugar ?? 0;

  if (calories >= 150 && product.proteinPerServing >= 15 && fiber >= 4) {
    return "식사대용형";
  }
  if (sugar <= 3) {
    return "저당형";
  }
  return "운동보충형";
}

function buildProductDescription(product: ProductDetailProps): string {
  const metrics = [
    `단백질 ${product.proteinPerServing}g`,
    product.calories != null ? `${product.calories}kcal` : null,
    product.sugar != null ? `당류 ${product.sugar}g` : null,
    product.density ? `밀도 ${product.density}` : null,
  ].filter(Boolean);
  const tail =
    product.productType === "drink"
      ? "RTD 단백질 음료 비교, 비슷한 제품 추천, 구매 전 체크포인트까지 함께 확인할 수 있습니다."
      : product.productType === "shake"
        ? "쉐이크 비교, 다이어트 기준, 비슷한 제품 추천까지 함께 확인할 수 있습니다."
        : product.productType === "bar"
          ? "단백질 바 비교, 다이어트 기준, 비슷한 제품 추천까지 함께 확인할 수 있습니다."
          : "요거트 비교, 당류 기준, 비슷한 제품 추천까지 함께 확인할 수 있습니다.";
  return `${product.brand} ${product.name} 성분 정보입니다. ${metrics.join(" · ")}. ${tail}`;
}

function buildProductTitle(product: ProductDetailProps): string {
  const kind = getProductKindLabel(product.productType);
  const headline = [`단백질 ${product.proteinPerServing}g`];
  if (product.sugar != null) headline.push(`당류 ${product.sugar}g`);
  else if (product.calories != null) headline.push(`${product.calories}kcal`);
  return `${product.brand} ${product.name} | ${headline.join(" · ")} | ${kind} 비교`;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) return { title: "제품을 찾을 수 없음 | ProteinLab" };

  const imageUrl = getProductImageUrl(slug);
  const ogImage = imageUrl ? `https://proteinlab.kr${imageUrl}` : undefined;

  return {
    title: buildProductTitle(product),
    description: buildProductDescription(product),
    alternates: {
      canonical: `https://proteinlab.kr/product/${slug}`,
    },
    openGraph: ogImage
      ? {
          title: buildProductTitle(product),
          description: buildProductDescription(product),
          url: `https://proteinlab.kr/product/${slug}`,
          images: [{ url: ogImage, width: 800, height: 800, alt: `${product.brand} ${product.name}` }],
        }
      : undefined,
    twitter: {
      card: "summary_large_image",
      title: buildProductTitle(product),
      description: buildProductDescription(product),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) notFound();

  const gradeLabels = product.gradeTags ?? [];
  const gradeDescs = product.gradeDescriptions ?? ["-", "-", "-"];
  const isBar = product.productType === "bar";
  const isYogurt = product.productType === "yogurt";
  const isShake = product.productType === "shake";
  const productImageUrl = getProductImageUrl(product.slug);
  const category = (product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake";
  const faqItems = getProductFaqs(product);
  const hasCapacityInName = Boolean(product.capacity && product.name.includes(product.capacity));
  const metaParts = [
    product.manufacturer,
    hasCapacityInName ? null : product.capacity,
    product.variant && product.variant !== "일반" ? product.variant : null,
  ].filter(Boolean);
  const metaLine = metaParts.join(" ");
  const rawCoupangUrl =
    normalizeCoupangUrl(product.coupangUrl) ??
    getKnownSourceCoupangUrlBySlug(product.slug);
  const resolvedCoupangHref = getCoupangRedirectHref(
    rawCoupangUrl,
    product.productType ?? null,
    product.slug,
  );
  const naverHref = product.naverUrl && product.naverUrl !== "#" && product.naverUrl !== "" ? product.naverUrl : null;
  const officialMallHref = product.officialUrl && product.officialUrl !== "#" && product.officialUrl !== "" ? product.officialUrl : null;
  const isLactoseFreeDrink =
    product.productType === "drink" && product.variant?.trim() === "락토프리";

  const summaryMetrics = isBar
    ? [
        { label: "단백질", value: `${product.proteinPerServing}g`, isCompact: false },
        { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
        { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
        { label: "단백질 밀도", value: product.density ?? "-", isCompact: true },
        { label: "중량", value: product.capacity ?? "-", isCompact: false },
        { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
        { label: "나트륨", value: product.sodium !== undefined ? `${product.sodium}mg` : "-", isCompact: false },
      ]
    : isYogurt
      ? [
          { label: "단백질", value: `${product.proteinPerServing}g`, isCompact: false },
          { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
          { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
          { label: "단백질 밀도", value: product.density ?? "-", isCompact: true },
          { label: "중량", value: product.capacity ?? "-", isCompact: false },
          { label: "요거트 유형", value: product.yogurtType ?? "-", isCompact: false },
          { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
          { label: "나트륨", value: product.sodium !== undefined ? `${product.sodium}mg` : "-", isCompact: false },
        ]
      : isShake
        ? [
            { label: "단백질", value: `${product.proteinPerServing}g`, isCompact: false },
            { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
            { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
            { label: "단백질 밀도", value: product.density ?? "-", isCompact: true },
            { label: "용량", value: product.capacity ?? "-", isCompact: false },
            { label: "식이섬유", value: product.nutritionPerBottle?.fiberG != null ? `${product.nutritionPerBottle.fiberG}g` : "-", isCompact: false },
            { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
            { label: "섭취 포인트", value: getShakePositioning(product), isCompact: false },
          ]
      : [
          { label: "단백질", value: `${product.proteinPerServing}g`, isCompact: false },
          { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
          { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
          { label: "단백질 밀도", value: product.density ?? "-", isCompact: true },
          { label: "용량", value: product.capacity ?? "-", isCompact: false },
          { label: "락토프리", value: isLactoseFreeDrink ? "O" : "X", isCompact: false },
          { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
          { label: "나트륨", value: product.sodium !== undefined ? `${product.sodium}mg` : "-", isCompact: false },
        ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ProteinLab",
          item: "https://proteinlab.kr/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: getProductKindLabel(product.productType),
          item: `https://proteinlab.kr${getCategoryHref(category)}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${product.brand} ${product.name}`,
          item: `https://proteinlab.kr/product/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      brand: { "@type": "Brand", name: product.brand },
      description: buildProductDescription(product),
      ...(productImageUrl ? { image: `https://proteinlab.kr${productImageUrl}` } : {}),
      category: getProductKindLabel(product.productType),
      nutrition: {
        "@type": "NutritionInformation",
        proteinContent: `${product.proteinPerServing} g`,
        ...(product.calories != null ? { calories: `${product.calories} kcal` } : {}),
        ...(product.sugar != null ? { sugarContent: `${product.sugar} g` } : {}),
        ...(product.fat != null ? { fatContent: `${product.fat} g` } : {}),
        ...(product.sodium != null ? { sodiumContent: `${product.sodium} mg` } : {}),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="w-full border-b border-t bg-[#EFEDE6]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="flex items-center justify-between">
            <BackButton />
            <AdminQuickEdit slug={slug} />
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
            <div className="w-full flex-shrink-0 lg:max-w-[320px]">
              <div
                className="relative flex w-full min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-[#e8e6e3] bg-white sm:min-h-[240px] lg:h-full lg:min-h-0"
                style={{ borderRadius: "16px" }}
              >
                {productImageUrl ? (
                  <Image
                    src={productImageUrl}
                    alt={`${product.brand} ${product.name}`}
                    fill
                    className="object-contain p-1 sm:p-2"
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 320px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-[#f7f4ee] text-sm text-[var(--foreground-muted)]">
                    이미지 준비 중
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#6b6b6b]">
                  <Link href="/" className="hover:text-[#1a1a1a]">
                    홈
                  </Link>
                  <span>/</span>
                  <Link href={getCategoryHref(category)} className="hover:text-[#1a1a1a]">
                    {getProductKindLabel(product.productType)}
                  </Link>
                  <span>/</span>
                  <span className="text-[#3d3d3d]">{product.brand}</span>
                </div>
                <h1
                  className="line-clamp-2 font-semibold leading-snug"
                  style={{ fontSize: "20px", fontWeight: 600, color: "#1a1a1a" }}
                >
                  {product.name}
                </h1>
                <p className="mt-1 text-[13px]" style={{ color: "#6b6b6b" }}>
                  {metaLine}
                </p>
              </div>

              <div className="grid flex-1 grid-cols-3 content-start gap-2 sm:grid-cols-4" style={{ gap: "8px" }}>
                {summaryMetrics.map(({ label, value, isCompact }) => (
                  <div
                    key={label}
                    className="product-card__metric flex min-w-0 flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white px-2.5 py-2 text-left"
                    style={{ borderRadius: "10px" }}
                  >
                    <span className="product-card__metric-label" style={{ fontSize: "11px", color: "#6b6b6b" }}>
                      {label}
                    </span>
                    <span
                      className={`product-card__metric-value ${isCompact ? "product-card__metric-value--compact" : ""}`}
                      style={{
                        fontSize: isCompact ? "15px" : "16px",
                        fontWeight: 700,
                        color: "#3d3d3d",
                        lineHeight: 1.2,
                      }}
                    >
                      {renderSummaryMetricValue(value, isCompact)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <AffiliateDisclosure />
          {gradeLabels.length > 0 ? (
            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">등급 요약</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {gradeLabels.map((label, index) => {
                  const displayLabel = formatProductBadgeLabel(label);

                  return (
                    <div
                      key={`${label}-${index}`}
                      className="rounded-xl border border-[#e8e6e3] p-4"
                      style={{ borderRadius: "12px", background: "#FFFDF8" }}
                    >
                      <MetricBadgeGroup>
                        <ProductBadge
                          label={displayLabel}
                          tone={getProductBadgeTone(displayLabel)}
                          tooltip={getMetricBadgeTooltip(label) ?? undefined}
                          tooltipAriaLabel={getMetricBadgeAriaLabel(label)}
                        />
                      </MetricBadgeGroup>
                      <p className="mt-3 text-sm text-[var(--foreground-muted)]">
                        {gradeDescs[index] ?? "-"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          <div className="mt-8">
            {isBar ? (
              <ServingBasisNotice
                className="mb-3"
                detail
                needsServingCheck={product.needsServingCheck}
                note={product.servingCheckNote}
              />
            ) : null}
            <NutritionDetailSection
              rows={getNutritionDetail(product)}
              capacity={product.capacity}
              unit={isBar ? "piece" : isYogurt ? "cup" : isShake ? "pack" : "bottle"}
            />
          </div>

          <div className="mt-6">
            <ProductReviewSection slug={slug} />
          </div>

          <div
            className="mt-6 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">가격·구매 채널 확인</h2>
            {isShake && !resolvedCoupangHref && !naverHref && !officialMallHref ? (
              <p className="mb-3 text-sm leading-6 text-[var(--foreground-muted)]">
                이 쉐이크는 구매 채널 링크를 순차 확인 중입니다. 지금은 제품 비교와 상세 성분부터 확인한 뒤 브랜드 페이지에서 후보를 더 좁혀보는 편이 가장 빠릅니다.
              </p>
            ) : null}
            <PurchaseLinkRow
              coupangHref={resolvedCoupangHref}
              naverHref={naverHref}
              officialMallHref={officialMallHref}
              size="md"
            />
          </div>

          <section className="mt-8">
            <div className="mb-4 space-y-1">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">자주 묻는 질문</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                구매 전 많이 확인하는 기준만 빠르게 정리했습니다.
              </p>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4"
                  style={{ borderRadius: "12px" }}
                >
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={getCategoryHref(category)}
              className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
            >
              제품 목록으로
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
