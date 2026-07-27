import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminQuickEdit from "../../components/AdminQuickEdit";
import ProductViewTracker from "../../components/ProductViewTracker";
import RecentlyViewedTracker from "../../components/RecentlyViewedTracker";
import RecentlyViewedSection from "../../components/RecentlyViewedSection";
import ShareButton from "../../components/ShareButton";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
import NewsletterBanner from "../../components/NewsletterBanner";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MetricBadgeGroup from "../../components/MetricBadgeGroup";
import NutritionDetailSection from "../../components/NutritionDetailSection";
import ProductBadge from "../../components/ProductBadge";
import ProductDetailBuyWrapper from "../../components/ProductDetailBuyWrapper";
import RelatedLinkCards from "../../components/RelatedLinkCards";
import TrackedLink from "../../components/TrackedLink";
import {
  type ProductDetailProps,
} from "../../data/products";
import newProductsRaw from "../../data/newProducts.json";
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
import {
  getAllStaticProducts,
  getStaticProductBySlug,
  getStaticProductsByCategory,
} from "../../lib/productDataStatic";
import { getProductImageUrl } from "../../lib/productImage";
import { getSimilarProducts } from "../../lib/similarProducts";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  getNaverSearchUrl,
  getOfficialMallUrl,
  normalizeCoupangUrl,
} from "../../lib/purchaseLinks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const NEW_PRODUCT_SLUGS = new Set((newProductsRaw as Array<{ slug: string }>).map((item) => item.slug));

export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllStaticProducts()
    .filter((product) => product.slug)
    .map((product) => ({
      slug: product.slug,
    }));
}

function getProductKindLabel(productType?: "drink" | "bar" | "yogurt" | "shake") {
  return getCategoryLabel(productType ?? "drink");
}

function gradeToScore(grade: string): number | null {
  const match = grade.match(/([A-F])([+-]?)$/);
  if (!match) return null;
  const base: Record<string, number> = { A: 5, B: 4, C: 3, D: 2, F: 1 };
  const mod = match[2] === "+" ? 0.3 : match[2] === "-" ? -0.3 : 0;
  return (base[match[1]] ?? null) !== null ? base[match[1]] + mod : null;
}

function buildAggregateRating(gradeTags: string[]): Record<string, unknown> | null {
  const scores = gradeTags.map(gradeToScore).filter((s): s is number => s !== null);
  if (scores.length === 0) return null;
  const avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
  return {
    "@type": "AggregateRating",
    ratingValue: avg,
    bestRating: 5,
    worstRating: 1,
    ratingCount: scores.length,
    reviewCount: 1,
  };
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

  const baseFaqs = [
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

  if ((product.proteinPerServing ?? 0) >= 40) {
    baseFaqs.push({
      question: `${product.brand} ${product.name}, 단백질 ${product.proteinPerServing}g을 한 번에 먹어도 되나요?`,
      answer: `신장 기능이 정상인 성인이라면 일시적으로 섭취하는 것 자체가 즉시 위험하지는 않지만, 소화 부담(더부룩함·가스)이 흔하게 나타날 수 있습니다. 평소 운동을 자주 하지 않거나 식사에서 단백질을 충분히 섭취하고 있다면 20~30g대 제품이 더 부담 없을 수 있습니다. 자세한 기준은 고단백 음료 부담·부작용 가이드(/guides/intake-strategy-health/high-protein-side-effects)에서 확인할 수 있습니다.`,
    });
  }

  return baseFaqs;
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

function getTasteAwardStars(rating?: string) {
  const count = Number(rating?.match(/\d+/)?.[0] ?? 0);
  if (!count) return null;
  return "★".repeat(Math.min(count, 3));
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

function getCategoryDetailHref(category: "drink" | "bar" | "yogurt" | "shake"): string {
  if (category === "drink") return "/drinks";
  return getCategoryHref(category);
}

function buildRecommendedFor(product: ProductDetailProps): string[] {
  const recs: string[] = [];
  if ((product.proteinPerServing ?? 0) >= 20) recs.push("운동 후 단백질 보충이 필요한 분");
  if ((product.sugar ?? 10) <= 2) recs.push("당류가 낮은 단백질 제품을 찾는 분");
  if (product.calories != null && product.calories <= 130) recs.push("칼로리 부담 없이 단백질을 보충하고 싶은 분");
  if (recs.length === 0) recs.push("영양성분을 비교해 자신에게 맞는 제품을 선택하려는 분");
  return recs.slice(0, 3);
}

function buildProductInternalLinks(product: ProductDetailProps) {
  const category = (product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake";
  const categoryHref = getCategoryDetailHref(category);
  const categoryLabel = getProductKindLabel(product.productType);
  const sugar = product.sugar ?? null;
  const calories = product.calories ?? null;
  const protein = product.proteinPerServing;
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
  const topicLink =
    category === "drink"
      ? product.variant?.trim() === "락토프리"
        ? {
            href: "/topics/lactose-free-protein-drink",
            title: "락토프리 단백질 음료 보기",
            description: "유당 부담이 적은 제품 후보만 먼저 모아서 비교합니다.",
          }
        : sugar != null && sugar <= 1
          ? {
              href: "/topics/low-sugar-protein-drink",
              title: "저당 단백질 음료 보기",
              description: "당류 기준으로 비슷한 음료만 다시 좁혀서 비교합니다.",
            }
          : protein >= 20
            ? {
                href: "/topics/high-protein-drink-20g",
                title: "고단백 단백질 음료 보기",
                description: "단백질 20g 이상 제품군과 함께 놓고 차이를 확인합니다.",
              }
            : {
                href: "/topics/protein-drink-recommend",
                title: "단백질 음료 추천 토픽 보기",
                description: "같은 의도로 많이 찾는 음료 묶음을 바로 이어서 확인합니다.",
              }
      : category === "bar"
        ? sugar != null && sugar <= 5
          ? {
              href: "/topics/low-sugar-protein-bar",
              title: "저당 단백질 바 보기",
              description: "당류 부담이 적은 단백질 바 후보를 먼저 모아서 비교합니다.",
            }
          : calories != null && calories <= 200
            ? {
                href: "/topics/low-calorie-protein-bar",
                title: "저칼로리 단백질 바 보기",
                description: "가벼운 열량 기준으로 비슷한 단백질 바를 다시 좁혀봅니다.",
              }
            : {
                href: "/topics/high-protein-bar",
                title: "고단백 단백질 바 보기",
                description: "고단백 바 제품군 안에서 비슷한 후보를 이어서 비교합니다.",
              }
        : category === "yogurt"
          ? sugar != null && sugar <= 5
            ? {
                href: "/topics/low-sugar-yogurt",
                title: "저당 단백질 요거트 보기",
                description: "당류 기준으로 비슷한 요거트 후보만 먼저 비교합니다.",
              }
            : {
                href: "/topics/high-protein-greek-yogurt",
                title: "고단백 그릭요거트 보기",
                description: "고단백 요거트와 그릭요거트 후보를 함께 이어서 볼 수 있습니다.",
              }
          : getShakePositioning(product) === "식사대용형"
            ? {
                href: "/topics/meal-replacement-protein-shake",
                title: "식사대용 단백질 쉐이크 보기",
                description: "포만감과 식사 대용 흐름으로 많이 찾는 쉐이크 후보를 이어서 봅니다.",
              }
            : sugar != null && sugar <= 3
              ? {
                  href: "/topics/low-sugar-protein-shake",
                  title: "저당 단백질 쉐이크 보기",
                  description: "당류 기준으로 더 가벼운 쉐이크 후보를 다시 좁혀봅니다.",
                }
              : {
                  href: "/topics/post-workout-protein-shake",
                  title: "운동 후 단백질 쉐이크 보기",
                  description: "운동 후 보충용으로 많이 찾는 쉐이크 후보를 함께 비교합니다.",
                };
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
    topicLink,
    {
      href: guideHref,
      title: `${categoryLabel} 선택 가이드`,
      description: "단백질, 당류, 칼로리를 어떤 순서로 볼지 바로 확인합니다.",
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
      href: `/brands/${brandToSlug(product.brand)}`,
      title: `${product.brand} 브랜드 보기`,
      description: "같은 브랜드 안에서 라인업 차이를 빠르게 확인합니다.",
    },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getStaticProductBySlug(slug);
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
  const product = getStaticProductBySlug(slug);
  if (!product) notFound();

  const gradeLabels = product.gradeTags ?? [];
  const isNewProduct = NEW_PRODUCT_SLUGS.has(product.slug);
  const gradeDescs = product.gradeDescriptions ?? ["-", "-", "-"];
  const isBar = product.productType === "bar";
  const isYogurt = product.productType === "yogurt";
  const isShake = product.productType === "shake";
  const productImageUrl = getProductImageUrl(product.slug);
  const category = (product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake";
  const isDrink = category === "drink";
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
  const naverHref =
    product.naverUrl && product.naverUrl !== "#" && product.naverUrl !== ""
      ? product.naverUrl
      : getNaverSearchUrl(product.brand, product.name);
  const officialMallHref =
    product.officialUrl && product.officialUrl !== "#" && product.officialUrl !== ""
      ? product.officialUrl
      : getOfficialMallUrl(product.brand);
  const isLactoseFreeDrink =
    product.productType === "drink" && product.variant?.trim() === "락토프리";
  const detailCategoryHref = getCategoryDetailHref(category);
  const categoryProducts = getStaticProductsByCategory(category);
  const similarProducts = getSimilarProducts(product, categoryProducts, 6);
  const internalLinks = buildProductInternalLinks(product).slice(0, 4);
  const recommendedFor = buildRecommendedFor(product);
  const tasteAwards = product.awards ?? [];

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
          item: `https://proteinlab.kr${detailCategoryHref}`,
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
      ...(() => {
        const rating = buildAggregateRating(product.gradeTags ?? []);
        return rating ? { aggregateRating: rating } : {};
      })(),
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

  const servingBasisLabel = isBar ? "1개 기준" : isYogurt ? "1컵 기준" : isShake ? "1포 기준" : "1병 기준";

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EA" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductViewTracker slug={slug} productType={product.productType ?? "drink"} />
      <Header />

      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-7">
          <div className="flex items-center justify-between">
            <BackButton />
            <div className="flex items-center gap-2">
              <ShareButton
                url={`/product/${slug}`}
                title={`${product.brand} ${product.name} — 단백질 ${product.proteinPerServing}g`}
                description={buildProductDescription(product)}
              />
              <AdminQuickEdit slug={slug} />
            </div>
          </div>

          {/*
            레이아웃:
            - 바(가로형 이미지): 상단 가로 이미지 박스 → 하단 정보 카드 (모바일·데스크톱 동일)
            - 음료·요거트·쉐이크(세로형 이미지): 모바일=세로 스택 / 데스크톱=좌 20% 세로 이미지 | 우 80% 정보
          */}
          <div className={`mt-4 flex gap-4 ${isBar ? "flex-col" : "flex-col lg:flex-row lg:items-stretch"}`}>

            {/* ── 이미지 영역 ── */}
            {isBar ? (
              /* 바: 가로형 — 전체 너비, 낮은 높이로 가로 이미지에 최적화 */
              <div
                className="flex w-full items-center justify-center rounded-[16px] border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E4DC", height: "160px", padding: "16px" }}
              >
                {productImageUrl ? (
                  <Image
                    src={productImageUrl}
                    alt={`${product.brand} ${product.name}`}
                    width={420}
                    height={128}
                    className="max-h-full w-auto max-w-full object-contain"
                    unoptimized
                    priority
                  />
                ) : (
                  <div className="text-[12px]" style={{ color: "#8A938B" }}>이미지 준비 중</div>
                )}
              </div>
            ) : (
              /* 음료·요거트·쉐이크: 세로형 — 모바일 200px, 데스크톱 좌 20% 세로 직사각형 */
              <div
                className="flex items-center justify-center rounded-[16px] border lg:w-[20%] lg:shrink-0"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E4DC" }}
              >
                <div className="flex h-[200px] w-full items-center justify-center p-5 lg:h-full lg:min-h-[380px] lg:p-6">
                  {productImageUrl ? (
                    <Image
                      src={productImageUrl}
                      alt={`${product.brand} ${product.name}`}
                      width={220}
                      height={320}
                      className="h-full w-auto max-h-full max-w-full object-contain"
                      unoptimized
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[12px]" style={{ color: "#8A938B" }}>
                      이미지 준비 중
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── 정보 카드 ── */}
            <div
              className="flex flex-1 flex-col gap-3 rounded-[16px] border bg-white p-4 md:p-5"
              style={{ borderColor: "#E8E4DC" }}
            >
              {/* 브레드크럼 + 제품명 */}
              <div>
                <div className="flex flex-wrap items-center gap-1 text-[11px]" style={{ color: "#8A938B" }}>
                  <Link href="/" className="hover:text-[#1F5A3D]">홈</Link>
                  <span>/</span>
                  <Link href={detailCategoryHref} className="hover:text-[#1F5A3D]">
                    {getProductKindLabel(product.productType)}
                  </Link>
                  <span>/</span>
                  <span style={{ color: "#5F6B61" }}>{product.brand}</span>
                </div>
                <h1
                  className="mt-1.5 line-clamp-2 leading-snug"
                  style={{ fontSize: "clamp(17px, 2.5vw, 22px)", fontWeight: 800, color: "#1E2A22", letterSpacing: "-0.02em" }}
                >
                  {product.name}
                </h1>
                {metaLine && (
                  <p className="mt-0.5 text-[12px]" style={{ color: "#8A938B" }}>{metaLine}</p>
                )}
                {(isNewProduct || gradeLabels.length > 0) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {isNewProduct ? (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{ background: "#FFF3D8", color: "#8A5A1D" }}
                      >
                        new
                      </span>
                    ) : null}
                    {gradeLabels.map((label) => {
                      const displayLabel = formatProductBadgeLabel(label);
                      return (
                        <span
                          key={label}
                          className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                          style={{ background: "#E6F2EC", color: "#1F5A3D" }}
                        >
                          {displayLabel}
                        </span>
                      );
                    })}
                  </div>
                )}
                {tasteAwards.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tasteAwards.map((award) => {
                      const awardStars = getTasteAwardStars(award.rating);
                      return (
                        <span
                          key={`${award.organization}-${award.year}-${award.name}`}
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
                          style={{ background: "#FFF3D8", color: "#8A5A1D", border: "1px solid #E4BF7C" }}
                        >
                          <span>국제미각상</span>
                          {awardStars ? <span style={{ color: "#B77933" }}>{awardStars}</span> : null}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {/* 핵심 영양성분 3종 */}
              <div className="grid grid-cols-3 gap-2">
                <div
                  className="flex flex-col items-center rounded-[14px] border py-3 text-center"
                  style={{ background: "#F0F6F2", borderColor: "#D6E5DA" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#1F5A3D" }}>단백질</p>
                  <p className="mt-1 font-extrabold leading-none" style={{ fontSize: "clamp(20px, 3.5vw, 28px)", color: "#1F5A3D" }}>
                    {product.proteinPerServing}
                  </p>
                  <p className="text-[10px] font-semibold" style={{ color: "#5F6B61" }}>g</p>
                  <p className="mt-0.5 text-[10px]" style={{ color: "#8A938B" }}>{servingBasisLabel}</p>
                </div>
                <div
                  className="flex flex-col items-center rounded-[14px] border py-3 text-center"
                  style={{ background: "#F0F6F2", borderColor: "#D6E5DA" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#1F5A3D" }}>칼로리</p>
                  {product.calories != null ? (
                    <>
                      <p className="mt-1 font-extrabold leading-none" style={{ fontSize: "clamp(20px, 3.5vw, 28px)", color: "#1E2A22" }}>
                        {product.calories}
                      </p>
                      <p className="text-[10px] font-semibold" style={{ color: "#5F6B61" }}>kcal</p>
                      <p className="mt-0.5 text-[10px]" style={{ color: "#8A938B" }}>{servingBasisLabel}</p>
                    </>
                  ) : (
                    <p className="mt-1 font-extrabold text-[22px] leading-none" style={{ color: "#8A938B" }}>—</p>
                  )}
                </div>
                <div
                  className="flex flex-col items-center rounded-[14px] border py-3 text-center"
                  style={{ background: "#F0F6F2", borderColor: "#D6E5DA" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#1F5A3D" }}>당류</p>
                  {product.sugar != null ? (
                    <>
                      <p
                        className="mt-1 font-extrabold leading-none"
                        style={{ fontSize: "clamp(20px, 3.5vw, 28px)", color: product.sugar <= 1 ? "#1B7F5B" : "#1E2A22" }}
                      >
                        {product.sugar}
                      </p>
                      <p className="text-[10px] font-semibold" style={{ color: "#5F6B61" }}>g</p>
                      <p className="mt-0.5 text-[10px]" style={{ color: "#8A938B" }}>{servingBasisLabel}</p>
                    </>
                  ) : (
                    <p className="mt-1 font-extrabold text-[22px] leading-none" style={{ color: "#8A938B" }}>—</p>
                  )}
                </div>
              </div>

              {/* 상세 성분 그리드 */}
              <div className="grid grid-cols-4 gap-1.5">
                {summaryMetrics.map(({ label, value, isCompact }) => (
                  <div
                    key={label}
                    className="flex min-w-0 flex-col justify-center rounded-xl border bg-white px-2.5 py-2 text-left"
                    style={{ borderColor: "#E6DDCC" }}
                  >
                    <span style={{ fontSize: "10px", color: "#8A938B" }}>{label}</span>
                    <span
                      style={{
                        fontSize: isCompact ? "13px" : "14px",
                        fontWeight: 700,
                        color: "#1E2A22",
                        lineHeight: 1.2,
                      }}
                    >
                      {renderSummaryMetricValue(value, isCompact)}
                    </span>
                  </div>
                ))}
              </div>

              {/* 추천 대상 */}
              {recommendedFor.length > 0 && (
                <div
                  className="rounded-2xl border p-3"
                  style={{ borderColor: "#E6DDCC", background: "#FFFDF7" }}
                >
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#1F5A3D" }}>
                    추천 대상
                  </p>
                  <ul className="space-y-1">
                    {recommendedFor.map((rec) => (
                      <li key={rec} className="flex items-start gap-2 text-[12px]" style={{ color: "#1E2A22" }}>
                        <span className="mt-0.5 shrink-0 font-bold" style={{ color: "#1F5A3D" }}>✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 구매 버튼 */}
              <div className="mt-auto">
                <ProductDetailBuyWrapper
                  brand={product.brand}
                  coupangHref={resolvedCoupangHref}
                  naverHref={naverHref}
                  officialMallHref={officialMallHref}
                  productName={product.name}
                  slug={product.slug}
                  proteinG={product.proteinPerServing}
                  imageUrl={productImageUrl ?? undefined}
                  description={buildProductDescription(product)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main style={{ background: "#F7F3EA" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <AffiliateDisclosure />
          {tasteAwards.length > 0 ? (
            <section
              className="mb-6 rounded-[20px] border px-5 py-4"
              style={{ borderColor: "#D6B16F", background: "linear-gradient(135deg, #FFF8EC 0%, #FFFDF9 62%, #F5E2BD 100%)" }}
            >
              <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#8A5A1D" }}>
                맛 수상 이력
              </p>
              <div className="mt-3 grid gap-3">
                {tasteAwards.map((award) => {
                  const awardStars = getTasteAwardStars(award.rating);
                  return (
                    <div key={`${award.organization}-${award.year}-${award.name}`}>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: "#9C641F", color: "#FFF8EC" }}>
                          국제미각상
                        </span>
                        {award.rating ? (
                          <span className="rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: "#FFFDF8", color: "#8A5A1D", border: "1px solid #E4BF7C" }}>
                            {awardStars ?? award.rating}
                          </span>
                        ) : null}
                        {award.year ? (
                          <span className="text-[12px] font-semibold" style={{ color: "#8A6B3D" }}>
                            {award.year}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mt-2 text-[15px] font-bold" style={{ color: "#1E2A22" }}>
                        {award.organization} {award.name}
                      </h2>
                      {award.note ? (
                        <p className="mt-1.5 text-[13px] leading-6" style={{ color: "#5F4B2E" }}>
                          {award.note}
                        </p>
                      ) : null}
                      {award.sourceUrl && award.sourceLabel ? (
                        <a
                          href={award.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex text-[12px] font-semibold underline"
                          style={{ color: "#7A4F1B" }}
                        >
                          {award.sourceLabel}
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}
          {product.proteinPerServing >= 40 ? (
            <section
              className="mb-6 rounded-[20px] border px-5 py-4"
              style={{ borderColor: "#E6DDCC", background: "#FDFAF5" }}
            >
              <p className="text-[13px] font-bold" style={{ color: "#7A5230" }}>
                💡 단백질 {product.proteinPerServing}g, 이런 분께 적합합니다
              </p>
              <p className="mt-1.5 text-[13px] leading-6" style={{ color: "#5F6B61" }}>
                운동 강도가 높고 하루 단백질 목표량이 많은 분에게 적합한 초고단백 제품입니다. 평소 운동을 자주 하지 않거나
                식사에서 단백질을 충분히 섭취하고 있다면 20~30g대 제품이 더 부담 없을 수 있습니다.
              </p>
              <Link
                href="/guides/intake-strategy-health/high-protein-side-effects"
                className="mt-2 inline-block text-[12px] font-semibold underline"
                style={{ color: "#1F5A3D" }}
              >
                고단백 음료 부담·부작용 가이드 보기 →
              </Link>
            </section>
          ) : null}
          {gradeLabels.length > 0 ? (
            <section className="rounded-[24px] border bg-white p-5 md:p-6" style={{ borderColor: "#E6DDCC", boxShadow: "0 8px 22px rgba(31,90,61,0.05)" }}>
              <div className="mb-4">
                <p className="mb-0.5 text-[12px] font-bold uppercase tracking-wider" style={{ color: "#1F5A3D" }}>ProteinLab 평가</p>
                <h2 className="font-bold" style={{ fontSize: "17px", color: "#1E2A22" }}>등급 요약</h2>
                <p className="mt-0.5 text-[13px]" style={{ color: "#5F6B61" }}>단백질 함량, 당류, 칼로리 등 영양성분 기준으로 평가했습니다.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {gradeLabels.map((label, index) => {
                  const displayLabel = formatProductBadgeLabel(label);

                  return (
                    <div
                      key={`${label}-${index}`}
                      className="rounded-[18px] border p-4"
                      style={{ borderColor: "#E6DDCC", background: "#FFFDF8" }}
                    >
                      <MetricBadgeGroup>
                        <ProductBadge
                          label={displayLabel}
                          tone={getProductBadgeTone(displayLabel)}
                          tooltip={getMetricBadgeTooltip(label) ?? undefined}
                          tooltipAriaLabel={getMetricBadgeAriaLabel(label)}
                        />
                      </MetricBadgeGroup>
                      <p className="mt-3 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
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

          <section className="mt-8 rounded-[24px] border bg-white p-5 md:p-6" style={{ borderColor: "#E6DDCC", boxShadow: "0 8px 22px rgba(31,90,61,0.05)" }}>
            <div className="mb-4">
              <h2 className="font-bold" style={{ fontSize: "17px", color: "#1E2A22" }}>자주 묻는 질문</h2>
              <p className="mt-0.5 text-[13px]" style={{ color: "#5F6B61" }}>
                구매 전 많이 확인하는 기준만 빠르게 정리했습니다.
              </p>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-[16px] border p-4"
                  style={{ borderColor: "#E6DDCC", background: "#FFFDF8" }}
                >
                  <h3 className="text-[14px] font-bold" style={{ color: "#1E2A22" }}>{item.question}</h3>
                  <p className="mt-2 text-[13px] leading-6" style={{ color: "#5F6B61" }}>{item.answer}</p>
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
            <section className="mt-8 rounded-[24px] border bg-white p-5 md:p-6" style={{ borderColor: "#E6DDCC", boxShadow: "0 8px 22px rgba(31,90,61,0.05)" }}>
              <div className="mb-4">
                <p className="mb-0.5 text-[12px] font-bold uppercase tracking-wider" style={{ color: "#1F5A3D" }}>ProteinLab 추천</p>
                <h2 className="font-bold" style={{ fontSize: "17px", color: "#1E2A22" }}>비슷한 제품 비교</h2>
                <p className="mt-0.5 text-[13px]" style={{ color: "#5F6B61" }}>
                  같은 카테고리에서 단백질·당류 스펙이 가까운 제품입니다.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {similarProducts.map((candidate) => {
                  const candidateCoupangHref = getCoupangRedirectHref(
                    normalizeCoupangUrl(candidate.coupangUrl) ?? getKnownSourceCoupangUrlBySlug(candidate.slug),
                    candidate.productType ?? null,
                    candidate.slug,
                  );
                  return (
                    <div
                      key={candidate.slug}
                      className="flex flex-col rounded-[16px] border border-[#E6DDCC] bg-[#FFFDF8] p-4"
                    >
                      <TrackedLink
                        href={`/product/${candidate.slug}`}
                        trackingLabel={`${candidate.brand} ${candidate.name}`}
                        trackingSection="product_detail_similar_products"
                        trackingPageType="product_detail"
                        className="flex-1"
                      >
                        <p className="text-[13px] font-bold leading-tight" style={{ color: "#1E2A22" }}>
                          {candidate.brand} {candidate.name}
                        </p>
                        <p className="mt-1.5 text-[12px] leading-5" style={{ color: "#5F6B61" }}>
                          단백질 {candidate.proteinPerServing}g
                          {candidate.sugar != null ? ` · 당류 ${candidate.sugar}g` : ""}
                          {candidate.calories != null ? ` · ${candidate.calories}kcal` : ""}
                        </p>
                      </TrackedLink>
                      {candidateCoupangHref && (
                        <a
                          href={candidateCoupangHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 block rounded-lg py-1.5 text-center text-[12px] font-semibold transition-colors"
                          style={{ background: "#fee500", color: "#191919" }}
                        >
                          쿠팡 구매
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-3">
            <TrackedLink
              href={detailCategoryHref}
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

      <RecentlyViewedTracker slug={slug} />
      <div className="mx-auto max-w-[1200px] px-4 pb-8 md:px-6">
        <RecentlyViewedSection
          products={getAllStaticProducts().map((p) => ({
            slug: p.slug ?? "",
            brand: p.brand,
            name: p.name,
            proteinPerServing: p.proteinPerServing,
          }))}
          currentSlug={slug}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 pb-8 md:px-6">
        <NewsletterBanner />
      </div>
      <Footer />
    </div>
  );
}
