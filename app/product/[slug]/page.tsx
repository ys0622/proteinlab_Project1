import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminQuickEdit from "../../components/AdminQuickEdit";
import BackButton from "../../components/BackButton";
import CompareButton from "../../components/CompareButton";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MetricBadgeGroup from "../../components/MetricBadgeGroup";
import NutritionDetailSection from "../../components/NutritionDetailSection";
import ProductBadge from "../../components/ProductBadge";
import ProductCard from "../../components/ProductCard";
import type { ProductDetailProps } from "../../data/products";
import {
  formatProductBadgeLabel,
  getMetricBadgeAriaLabel,
  getMetricBadgeTooltip,
  getProductBadgeTone,
} from "../../components/productBadgeUtils";
import ProductReviewSection from "../../components/ProductReviewSection";
import PurchaseLinkRow from "../../components/PurchaseLinkRow";
import RelatedLinkCards from "../../components/RelatedLinkCards";
import ServingBasisNotice from "../../components/ServingBasisNotice";
import { getNutritionDetail } from "../../data/products";
import { getCategoryHref, getCategoryLabel } from "../../lib/categories";
import {
  getProductBySlugAsync,
  getProductsByCategoryAsync,
  type ProductCategory,
} from "../../lib/productData";
import { getProductImageUrl } from "../../lib/productImage";
import { getSimilarProducts } from "../../lib/similarProducts";
import { getProductTrafficLinks } from "../../lib/trafficLinks";
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

function getShakeSummaryNote(product: ProductDetailProps) {
  const positioning = getShakePositioning(product);
  const fiber = product.nutritionPerBottle?.fiberG ?? 0;
  const sugar = product.sugar ?? 0;

  if (positioning === "식사대용형") {
    return `식이섬유 ${fiber}g와 칼로리 구성이 함께 들어 있어 한 끼 대체 관점에서도 보기 좋은 쉐이크입니다.`;
  }
  if (positioning === "저당형") {
    return `당류 ${sugar}g 기준으로 비교적 깔끔한 편이라 저당 쉐이크 축에서 먼저 보기 좋습니다.`;
  }
  return `단백질 ${product.proteinPerServing}g와 단백질 밀도를 먼저 보는 운동보충형 쉐이크에 가깝습니다.`;
}

function buildProductDescription(product: ProductDetailProps): string {
  const kind = getProductKindLabel(product.productType);
  const protein = `단백질 ${product.proteinPerServing}g`;
  const cal = product.calories != null ? `, ${product.calories}kcal` : "";
  const sugar = product.sugar != null ? `, 당류 ${product.sugar}g` : "";
  const grade = product.gradeTags?.length ? ` · ${product.gradeTags[0]} 등급` : "";
  return `${product.brand} ${product.name} ${kind} 상세 정보. ${protein}${cal}${sugar}${grade}. 단백질 밀도·영양 성분 비교.`;
}

function buildProductFaqItems(product: ProductDetailProps) {
  const categoryLabel = getProductKindLabel(product.productType);

  return [
    {
      question: `${product.brand} ${product.name}은 어떤 기준으로 비교하면 좋나요?`,
      answer: `${categoryLabel}는 단백질 함량, 당류, 칼로리, 단백질 밀도를 함께 보면 비교가 쉬워집니다. ProteinLab도 이 제품을 같은 기준으로 정리합니다.`,
    },
    {
      question: `${product.brand} ${product.name}은 어떤 사용자에게 잘 맞을 수 있나요?`,
      answer: `${product.brand} ${product.name}은 같은 카테고리 내에서 수치를 비교하며 제품을 고르려는 사용자에게 적합합니다. 순위 페이지와 맞춤 추천을 함께 보면 판단이 더 빨라집니다.`,
    },
    {
      question: `${product.brand} ${product.name}과 비슷한 제품은 어디서 더 볼 수 있나요?`,
      answer: `제품 상세 아래의 관련 링크, 카테고리 목록, 순위, 추천 페이지를 통해 비슷한 제품군을 바로 이어서 볼 수 있습니다.`,
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
    title: `${product.brand} ${product.name} | ProteinLab`,
    description: buildProductDescription(product),
    openGraph: ogImage
      ? {
          images: [{ url: ogImage, width: 800, height: 800, alt: `${product.brand} ${product.name}` }],
        }
      : undefined,
    twitter: {
      card: "summary_large_image",
      title: `${product.brand} ${product.name} | ProteinLab`,
      description: buildProductDescription(product),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) notFound();
  const categoryProducts = await getProductsByCategoryAsync(
    (product.productType ?? "drink") as ProductCategory,
  );

  const gradeLabels = product.gradeTags ?? [];
  const gradeDescs = product.gradeDescriptions ?? ["-", "-", "-"];
  const isBar = product.productType === "bar";
  const isYogurt = product.productType === "yogurt";
  const isShake = product.productType === "shake";
  const productImageUrl = getProductImageUrl(product.slug);
  const hasCapacityInName = Boolean(product.capacity && product.name.includes(product.capacity));
  const metaParts = [
    product.manufacturer,
    hasCapacityInName ? null : product.capacity,
    product.variant && product.variant !== "일반" ? product.variant : null,
  ].filter(Boolean);
  const metaLine = metaParts.join(" ");
  const productFacts = isBar
    ? []
      : isYogurt
      ? [
          product.storageType ? `보관 ${product.storageType}` : null,
          product.lactoseFree ? "락토프리" : null,
        ].filter(Boolean)
      : [
          product.drinkType ? `유형 ${product.drinkType}` : null,
          product.proteinSource ? `단백질원 ${product.proteinSource}` : null,
          product.bcaa ? `BCAA ${product.bcaa}` : null,
        ].filter(Boolean);

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
  const productTrafficLinks = getProductTrafficLinks(
    (product.productType ?? "drink") as ProductCategory,
    slug,
  );
  const faqItems = buildProductFaqItems(product);
  const similarProducts = getSimilarProducts(product, categoryProducts, 6);

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

  const productJsonLd = {
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
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr" },
      {
        "@type": "ListItem",
        position: 2,
        name: getProductKindLabel(product.productType),
        item: `https://proteinlab.kr${getCategoryHref((product.productType ?? "drink") as ProductCategory)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${product.brand} ${product.name}`,
        item: `https://proteinlab.kr/product/${slug}`,
      },
    ],
  };
  const faqJsonLd = {
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
  };
  const structuredData = [breadcrumbJsonLd, productJsonLd, faqJsonLd];

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <section className="w-full border-b border-t bg-[#EFEDE6]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="flex items-center justify-between">
            <BackButton />
            <AdminQuickEdit slug={slug} />
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
            <div className="w-full flex-shrink-0 lg:max-w-[300px]">
              <div
                className="relative flex w-full min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-[#e8e6e3] bg-white sm:min-h-[280px] lg:h-full lg:min-h-0"
                style={{ borderRadius: "16px" }}
              >
                {productImageUrl ? (
                  <Image
                    src={productImageUrl}
                    alt={`${product.brand} ${product.name}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 300px"
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
                <p className="text-xs tracking-wide" style={{ color: "#7a7a7a" }}>
                  {product.brand}
                </p>
                <h1
                  className="mt-1 line-clamp-2 font-semibold leading-snug"
                  style={{ fontSize: "20px", fontWeight: 600, color: "#1a1a1a" }}
                >
                  {product.name}
                </h1>
                <p className="mt-1 text-[13px]" style={{ color: "#6b6b6b" }}>
                  {metaLine}
                </p>
                {isShake ? (
                  <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#5f6258]">
                    {getShakeSummaryNote(product)}
                  </p>
                ) : null}
                {productFacts.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {productFacts.map((fact) => (
                      <span
                        key={fact}
                        className="inline-flex items-center rounded-full border border-[#ddd8cf] bg-[#f7f4ee] px-2.5 py-1 text-[11px] font-medium text-[#5c574f]"
                      >
                        {fact}
                      </span>
                    ))}
                  </div>
                ) : null}
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

          {similarProducts.length > 0 ? (
            <section className="mt-6">
              <div className="mb-4 space-y-1">
                <h2 className="text-lg font-bold text-[var(--foreground)]">비슷한 제품 추천</h2>
                <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                  같은 카테고리 안에서 단백질, 당류, 칼로리, 밀도가 비슷한 제품을 우선으로
                  추렸습니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
                {similarProducts.map((item) => (
                  <ProductCard
                    key={item.slug}
                    {...item}
                    purchaseLinkCategory="ranking"
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-6 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4">
            <h2 className="text-base font-semibold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-3 space-y-3">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-[#ece9e3] bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">{item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <RelatedLinkCards
            title="이 제품 다음에 보기 좋은 페이지"
            description="가이드, 순위, 추천, 비교 페이지를 함께 연결해 비슷한 제품군을 더 빠르게 확인할 수 있습니다."
            links={productTrafficLinks}
          />

          <div
            className="mt-6 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">구매 링크</h2>
            {isShake && !resolvedCoupangHref && !naverHref && !officialMallHref ? (
              <p className="mb-3 text-sm leading-6 text-[var(--foreground-muted)]">
                쉐이크 구매 링크는 브랜드별 공식 링크를 순차 확인 중입니다. 현재는 제품 비교와 상세 성분 확인을 먼저 진행할 수 있습니다.
              </p>
            ) : null}
            <PurchaseLinkRow
              coupangHref={resolvedCoupangHref}
              naverHref={naverHref}
              officialMallHref={officialMallHref}
              size="md"
            />
            {resolvedCoupangHref ? (
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--foreground-muted)]">
                쿠팡 링크는 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <CompareButton slug={slug} detailHref={`/product/${slug}`} />
            <Link
              href={getCategoryHref((product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake")}
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
