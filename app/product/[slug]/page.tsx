import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminQuickEdit from "../../components/AdminQuickEdit";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
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
import { brandToSlug } from "../../lib/brandHubs";
import { getProductBySlugAsync, getProductsByCategoryAsync } from "../../lib/productData";
import { getProductImageUrl, getProductSpecImageUrl } from "../../lib/productImage";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  normalizeCoupangUrl,
} from "../../lib/purchaseLinks";
import { getSimilarProducts } from "../../lib/similarProducts";
import { getProductTrafficLinks } from "../../lib/trafficLinks";

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

function getProductSummary(product: ProductDetailProps) {
  if (product.productType === "drink") {
    if (product.sugar != null && product.sugar <= 1 && product.calories != null && product.calories <= 120) {
      return "저당·저칼로리 기준으로 먼저 보기 좋은 RTD 단백질 음료입니다.";
    }
    if (product.proteinPerServing >= 30) {
      return "고단백 보충 중심으로 설계된 RTD 제품이라 운동 후 비교 수요와 잘 맞습니다.";
    }
    return "편의성과 영양 균형을 함께 보는 사용자에게 맞는 RTD 단백질 음료입니다.";
  }

  if (product.productType === "bar") {
    return "간식처럼 먹기 쉬운 형태인지, 칼로리와 당류가 과하지 않은지 같이 봐야 하는 단백질 바입니다.";
  }

  if (product.productType === "yogurt") {
    return "아침 간편식과 간식 수요에서 많이 비교되는 제품이라 단백질과 당류를 함께 보는 편이 좋습니다.";
  }

  return "식사대용, 다이어트, 아침 간편식 수요에서 많이 비교되는 파우치형 단백질 쉐이크입니다.";
}

function getProductFitBullets(product: ProductDetailProps) {
  const bullets: string[] = [];

  if (product.productType === "drink") {
    if (product.sugar != null && product.sugar <= 1) bullets.push("당류 부담이 낮은 RTD 음료를 찾는 사람");
    if (product.proteinPerServing >= 30) bullets.push("한 번에 고단백 보충을 원하는 사람");
    if (product.proteinSource) bullets.push(`${product.proteinSource} 단백질 원료를 우선 보는 사람`);
  } else if (product.productType === "bar") {
    bullets.push("이동 중 간단히 단백질을 챙기려는 사람");
    if ((product.calories ?? 0) <= 200) bullets.push("간식 칼로리를 200kcal 안쪽으로 관리하려는 사람");
    if ((product.sugar ?? 0) <= 5) bullets.push("당류가 낮은 바를 찾는 사람");
  } else if (product.productType === "yogurt") {
    bullets.push("아침이나 간식으로 가볍게 단백질을 보충하려는 사람");
    if ((product.sugar ?? 0) <= 5) bullets.push("저당 요거트를 우선 보는 사람");
    if (product.yogurtType) bullets.push(`${product.yogurtType} 타입을 선호하는 사람`);
  } else {
    if ((product.nutritionPerBottle?.fiberG ?? 0) >= 4) bullets.push("포만감 있는 식사대용 쉐이크를 찾는 사람");
    if ((product.sugar ?? 0) <= 5) bullets.push("당류가 낮은 파우치형 쉐이크를 찾는 사람");
    bullets.push("맛과 꾸준한 섭취 편의성을 같이 보는 사람");
  }

  bullets.push(`${getMetricLine(product)} 기준으로 비슷한 제품과 비교하려는 사람`);

  return bullets.slice(0, 4);
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

function getSameBrandProducts(
  source: ProductDetailProps,
  candidates: ProductDetailProps[],
  limit = 3,
) {
  return candidates
    .filter(
      (candidate) =>
        candidate.slug !== source.slug &&
        candidate.productType === source.productType &&
        candidate.brand === source.brand,
    )
    .sort((a, b) => {
      const proteinGap =
        Math.abs((a.proteinPerServing ?? 0) - (source.proteinPerServing ?? 0)) -
        Math.abs((b.proteinPerServing ?? 0) - (source.proteinPerServing ?? 0));
      if (proteinGap !== 0) return proteinGap;

      const sugarGap =
        Math.abs((a.sugar ?? 0) - (source.sugar ?? 0)) -
        Math.abs((b.sugar ?? 0) - (source.sugar ?? 0));
      if (sugarGap !== 0) return sugarGap;

      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}

function getSimilarSectionDescription(product: ProductDetailProps) {
  if (product.productType === "drink") {
    return `${getMetricLine(product)} 기준으로 RTD 안에서 함께 많이 비교되는 제품입니다. 브랜드를 바꿔도 비슷한 스펙인지 바로 확인할 수 있습니다.`;
  }

  if (product.productType === "bar") {
    return `${getMetricLine(product)} 기준으로 이동 간식용 단백질 바 안에서 자주 같이 보는 제품입니다.`;
  }

  if (product.productType === "yogurt") {
    return `${getMetricLine(product)} 기준으로 아침·간식용 요거트 안에서 함께 비교되는 제품입니다.`;
  }

  return `${getMetricLine(product)} 기준으로 파우치형 쉐이크 안에서 자주 같이 보는 제품입니다. 식사대용과 저당 기준을 함께 확인하기 좋습니다.`;
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

function getSpecSectionDescription(product: ProductDetailProps) {
  if (product.productType === "drink") {
    return "실제 패키지 성분표 이미지입니다. 단백질, 당류, 칼로리, 나트륨을 구매 전에 다시 확인할 때 유용합니다.";
  }
  if (product.productType === "bar") {
    return "실제 패키지 성분표 이미지입니다. 간식처럼 보여도 칼로리와 당류 차이가 커서 마지막 확인용으로 보기 좋습니다.";
  }
  if (product.productType === "yogurt") {
    return "실제 패키지 성분표 이미지입니다. 단백질, 당류, 보관 방식까지 같이 확인할 수 있습니다.";
  }
  return "실제 패키지 성분표 이미지입니다. 식이섬유, 당류, 칼로리 구성을 구매 전에 한 번 더 확인할 때 유용합니다.";
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
  const productSpecImageUrl = getProductSpecImageUrl(product.slug, product.productType);
  const category = (product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake";
  const categoryProducts = await getProductsByCategoryAsync(category);
  const sameBrandProducts = getSameBrandProducts(product, categoryProducts, 3);
  const similarProducts = getSimilarProducts(product, categoryProducts, 6);
  const trafficLinks = getProductTrafficLinks(product);
  const faqItems = getProductFaqs(product);
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
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={`/brands/${encodeURIComponent(brandToSlug(product.brand))}`}
                    className="inline-flex items-center rounded-full border border-[#ddd8cf] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#4f4a40] transition-colors hover:bg-[#f7f4ee]"
                  >
                    {product.brand} 브랜드 전체 보기
                  </Link>
                  <Link
                    href={`/compare?slugs=${encodeURIComponent(product.slug)}`}
                    className="inline-flex items-center rounded-full border border-[#ddd8cf] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#4f4a40] transition-colors hover:bg-[#f7f4ee]"
                  >
                    이 제품 기준으로 비교 시작
                  </Link>
                </div>
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
                <div className="mt-4 rounded-xl border border-[#e6e1d8] bg-[#fffaf1] p-4">
                  <p className="text-[12px] font-semibold tracking-wide text-[#8b6f3d]">한눈에 보기</p>
                  <p className="mt-2 text-sm leading-6 text-[#4f4a40]">{getProductSummary(product)}</p>
                  <ul className="mt-3 space-y-1 text-sm leading-6 text-[#5f6258]">
                    {getProductFitBullets(product).map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
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

          {productSpecImageUrl ? (
            <section className="mt-8">
              <div className="mb-4 space-y-1">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">성분표 이미지</h2>
                <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                  {getSpecSectionDescription(product)}
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-4">
                <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl bg-white">
                  <Image
                    src={productSpecImageUrl}
                    alt={`${product.brand} ${product.name} 성분표`}
                    width={840}
                    height={1200}
                    className="h-auto w-full object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </section>
          ) : null}

          {sameBrandProducts.length > 0 ? (
            <section className="mt-8">
              <div className="mb-4 space-y-1">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">같은 브랜드에서 같이 보는 제품</h2>
                <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                  {product.brand} 안에서 목적이나 맛만 바꿔 보고 싶다면 이 제품들부터 이어서 확인하면 빠릅니다.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sameBrandProducts.map((item) => (
                  <ProductCard
                    key={item.slug}
                    brand={item.brand}
                    name={item.name}
                    capacity={item.capacity}
                    variant={item.variant}
                    tags={item.tags}
                    proteinPerServing={item.proteinPerServing}
                    calories={item.calories}
                    sugar={item.sugar}
                    density={item.density}
                    coupangUrl={item.coupangUrl}
                    naverUrl={item.naverUrl}
                    officialUrl={item.officialUrl}
                    gradeTags={item.gradeTags}
                    slug={item.slug}
                    productType={item.productType}
                    yogurtType={item.yogurtType}
                    fixedTitleLines={2}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {similarProducts.length > 0 ? (
            <section className="mt-8">
              <div className="mb-4 space-y-1">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">비슷한 제품 비교</h2>
                <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                  {getSimilarSectionDescription(product)}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {similarProducts.map((item) => (
                  <ProductCard
                    key={item.slug}
                    brand={item.brand}
                    name={item.name}
                    capacity={item.capacity}
                    variant={item.variant}
                    tags={item.tags}
                    proteinPerServing={item.proteinPerServing}
                    calories={item.calories}
                    sugar={item.sugar}
                    density={item.density}
                    coupangUrl={item.coupangUrl}
                    naverUrl={item.naverUrl}
                    officialUrl={item.officialUrl}
                    gradeTags={item.gradeTags}
                    slug={item.slug}
                    productType={item.productType}
                    yogurtType={item.yogurtType}
                    fixedTitleLines={2}
                  />
                ))}
              </div>
            </section>
          ) : null}

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
            title="다음 탐색 동선"
            description="같은 브랜드 라인업으로 넓히거나, 대표 비교 가이드와 순위 페이지로 바로 넘어갈 수 있게 정리했습니다."
            links={trafficLinks}
            sectionId="product-detail-links"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <CompareButton slug={slug} detailHref={`/product/${slug}`} />
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
