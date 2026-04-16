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
import ProductDetailPurchaseActions from "../../components/ProductDetailPurchaseActions";
import RelatedLinkCards from "../../components/RelatedLinkCards";
import TrackedLink from "../../components/TrackedLink";
import {
  barProductsWithGrades,
  mockProducts,
  shakeProducts,
  type ProductDetailProps,
  yogurtProductsWithGrades,
} from "../../data/products";
import {
  formatProductBadgeLabel,
  getMetricBadgeAriaLabel,
  getMetricBadgeTooltip,
  getProductBadgeTone,
} from "../../components/productBadgeUtils";
import ProductReviewSection from "../../components/ProductReviewSection";
import ServingBasisNotice from "../../components/ServingBasisNotice";
import { getNutritionDetail } from "../../data/products";
import { brandToSlug } from "../../lib/brandHubs";
import { getCategoryHref, getCategoryLabel } from "../../lib/categories";
import { getProductBySlugAsync, getProductsByCategoryAsync } from "../../lib/productData";
import { getProductImageUrl } from "../../lib/productImage";
import { getReviews } from "../../lib/reviewData";
import { getSimilarProducts } from "../../lib/similarProducts";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  normalizeCoupangUrl,
} from "../../lib/purchaseLinks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return [...mockProducts, ...barProductsWithGrades, ...yogurtProductsWithGrades, ...shakeProducts]
    .filter((product) => product.slug)
    .map((product) => ({
      slug: product.slug,
    }));
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
  ].filter(Boolean);
  const tail =
    product.productType === "drink"
      ? "비슷한 제품과 성분 비교, 구매 전 체크포인트를 바로 확인하세요."
      : product.productType === "shake"
        ? "다이어트·벌크업 기준으로 비슷한 쉐이크와 바로 비교해보세요."
        : product.productType === "bar"
          ? "칼로리·당류 기준으로 비슷한 단백질 바와 한눈에 비교하세요."
          : "당류·단백질 기준으로 비슷한 요거트와 한눈에 비교하세요.";
  return `${product.brand} ${product.name} — ${metrics.join(" · ")}. ${tail}`;
}

function buildProductTitle(product: ProductDetailProps): string {
  const kind = getProductKindLabel(product.productType);
  const protein = `단백질 ${product.proteinPerServing}g`;
  const second =
    product.sugar != null
      ? `당류 ${product.sugar}g`
      : product.calories != null
        ? `${product.calories}kcal`
        : null;
  const metrics = second ? `${protein} · ${second}` : protein;
  return `${product.brand} ${product.name} ${metrics} — ${kind} 성분 비교`;
}

function buildProductInternalLinks(product: ProductDetailProps) {
  const category = (product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake";
  const categoryHref = getCategoryHref(category);
  const categoryLabel = getProductKindLabel(product.productType);
  const compareLandingHref =
    category === "drink"
      ? "/compare/newcare-vs-sellex-drink"
      : category === "bar"
        ? "/compare/doctoru-vs-benof-bar"
        : category === "yogurt"
          ? "/compare/greek-yogurt-brand-compare"
          : "/compare/labnosh-vs-flymill-shake";
  const compareLandingTitle =
    category === "drink"
      ? "음료 비교 랜딩 보기"
      : category === "bar"
        ? "바 비교 랜딩 보기"
        : category === "yogurt"
          ? "요거트 비교 랜딩 보기"
          : "쉐이크 비교 랜딩 보기";
  const topicHref =
    category === "drink"
      ? "/topics/protein-drink-recommend"
      : category === "bar"
        ? "/topics/high-protein-bar"
        : category === "yogurt"
          ? "/topics/high-protein-greek-yogurt"
          : "/topics/meal-replacement-protein-shake";
  const topicTitle =
    category === "drink"
      ? "단백질 음료 토픽 보기"
      : category === "bar"
        ? "고단백 바 토픽 보기"
        : category === "yogurt"
          ? "고단백 그릭요거트 토픽 보기"
          : "식사대용 쉐이크 토픽 보기";
  const guideHref =
    category === "drink"
      ? "/guides/product-selection-comparison/protein-drink-guide"
      : category === "bar"
        ? "/guides/product-selection-comparison/protein-bar-guide"
        : category === "yogurt"
          ? "/guides/product-selection-comparison/protein-yogurt-guide"
          : "/guides/product-selection-comparison/protein-shake-guide";

  return [
    {
      href: categoryHref,
      title: `${categoryLabel} 더 보기`,
      description: `같은 카테고리 안에서 비슷한 스펙 제품을 한 번에 비교합니다.`,
    },
    {
      href: `/compare?slugs=${encodeURIComponent(product.slug)}`,
      title: "이 제품으로 비교 시작",
      description: "현재 제품을 기준으로 다른 제품과 수치를 나란히 비교합니다.",
    },
    {
      href: compareLandingHref,
      title: compareLandingTitle,
      description: "대표 비교 조합을 먼저 보고 비슷한 제품 차이를 빠르게 읽습니다.",
    },
    {
      href: topicHref,
      title: topicTitle,
      description: "같은 의도로 많이 찾는 제품 묶음을 바로 이어서 확인합니다.",
    },
    {
      href: `/brands/${brandToSlug(product.brand)}`,
      title: `${product.brand} 브랜드 보기`,
      description: "같은 브랜드 안에서 라인업 차이를 빠르게 확인합니다.",
    },
    {
      href: guideHref,
      title: `${categoryLabel} 선택 가이드`,
      description: "단백질, 당류, 칼로리를 어떤 순서로 볼지 바로 확인합니다.",
    },
  ];
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
  const reviews = await getReviews(slug);

  const gradeLabels = product.gradeTags ?? [];
  const gradeDescs = product.gradeDescriptions ?? ["-", "-", "-"];
  const isBar = product.productType === "bar";
  const isYogurt = product.productType === "yogurt";
  const isShake = product.productType === "shake";
  const productImageUrl = getProductImageUrl(product.slug);
  const category = (product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake";
  const categoryHref = getCategoryHref(category);
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
  const categoryProducts = await getProductsByCategoryAsync(category);
  const similarProducts = getSimilarProducts(product, categoryProducts, 3);
  const internalLinks = buildProductInternalLinks(product).slice(0, 4);

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

  const ratingValueMap = {
    up: 5,
    mid: 3,
    down: 1,
  } as const;
  const reviewCount = reviews.length;
  const aggregateRatingValue =
    reviewCount > 0
      ? reviews.reduce((sum, review) => sum + ratingValueMap[review.rating], 0) / reviewCount
      : null;

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
          item: `https://proteinlab.kr${categoryHref}`,
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
      name: `${product.brand} ${product.name}`,
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
      ...(resolvedCoupangHref
        ? {
            offers: {
              "@type": "Offer",
              url: resolvedCoupangHref,
              priceCurrency: "KRW",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "쿠팡" },
            },
          }
        : {}),
      ...(reviewCount > 0
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: Number((aggregateRatingValue ?? 0).toFixed(1)),
              reviewCount,
            },
          }
        : {}),
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
            <div className="w-full flex-shrink-0 lg:max-w-[240px]">
              <div
                className="relative flex w-full min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-[#e8e6e3] bg-white sm:min-h-[200px] lg:h-full lg:min-h-0"
                style={{ borderRadius: "16px" }}
              >
                {productImageUrl ? (
                  <Image
                    src={productImageUrl}
                    alt={`${product.brand} ${product.name}`}
                    fill
                    className="object-contain p-1 sm:p-2"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 240px"
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
                  <Link href={categoryHref} className="hover:text-[#1a1a1a]">
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

              <ProductDetailPurchaseActions
                brand={product.brand}
                coupangHref={resolvedCoupangHref}
                naverHref={naverHref}
                officialMallHref={officialMallHref}
                productName={product.name}
                slug={product.slug}
              />
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

          <RelatedLinkCards
            title="같이 보면 좋은 링크"
            description="비슷한 제품 비교와 카테고리 이동을 바로 이어갈 수 있습니다."
            links={internalLinks}
            sectionId="product_detail_internal_links"
          />

          {similarProducts.length > 0 ? (
            <section className="mt-8">
              <div className="mb-4 space-y-1">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">비슷한 제품</h2>
                <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                  같은 카테고리에서 스펙이 가까운 제품만 먼저 골랐습니다.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {similarProducts.map((candidate) => (
                  <TrackedLink
                    key={candidate.slug}
                    href={`/product/${candidate.slug}`}
                    trackingLabel={`${candidate.brand} ${candidate.name}`}
                    trackingSection="product_detail_similar_products"
                    trackingPageType="product_detail"
                    className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 transition-colors hover:bg-[var(--accent-light)]"
                  >
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {candidate.brand} {candidate.name}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
                      단백질 {candidate.proteinPerServing}g
                      {candidate.sugar != null ? ` · 당류 ${candidate.sugar}g` : ""}
                      {candidate.calories != null ? ` · ${candidate.calories}kcal` : ""}
                    </p>
                  </TrackedLink>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-3">
            <TrackedLink
              href={categoryHref}
              trackingLabel="제품 목록으로 돌아가기"
              trackingSection="product_detail_bottom_cta"
              trackingPageType="product_detail"
              className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
            >
              제품 목록으로
            </TrackedLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
