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
import TrackedLink from "../../components/TrackedLink";
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
    `?⑤갚吏?${product.proteinPerServing}g`,
    product.calories != null ? `${product.calories}kcal` : null,
    product.sugar != null ? `?밸쪟 ${product.sugar}g` : null,
    product.density ? product.density : null,
  ].filter(Boolean);

  return parts.join(" 쨌 ");
}

function getProductFaqs(product: ProductDetailProps) {
  const categoryHref = getCategoryHref((product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake");
  const categoryLabel = getProductKindLabel(product.productType);

  return [
    {
      question: `${product.brand} ${product.name}? ?대뼡 湲곗??쇰줈 蹂대㈃ ?섎굹??`,
      answer: `${product.brand} ${product.name}? ${getMetricLine(product)} 湲곗??쇰줈 癒쇱? 蹂대뒗 ?몄씠 醫뗭뒿?덈떎. 媛숈? ${categoryLabel} ?덉뿉?쒕뒗 ?⑤갚吏?珥앸웾, ?밸쪟, 移쇰줈由? ?⑸웾??諛?꾨? 媛숈씠 鍮꾧탳?댁빞 ?ㅼ젣 泥닿컧 李⑥씠媛 ??蹂댁엯?덈떎.`,
    },
    {
      question: `???쒗뭹怨?鍮꾩듂??${categoryLabel}? ?대뵒????蹂????덈굹??`,
      answer: `ProteinLab ${categoryLabel} 紐⑸줉 ?섏씠吏(${categoryHref})? 鍮꾧탳 ?섏씠吏?먯꽌 鍮꾩듂???ㅽ럺 ?쒗뭹????踰덉뿉 蹂????덉뒿?덈떎. ?뱁엳 媛숈? 移댄뀒怨좊━ ?쒗뭹?쇰━ 鍮꾧탳?섎㈃ 紐⑹쟻蹂?李⑥씠媛 ??紐낇솗?⑸땲??`,
    },
    {
      question: `援щℓ ?꾩뿉 留덉?留됱쑝濡??뺤씤???ъ씤?몃뒗 臾댁뾿?멸???`,
      answer: `제품 목록으로 돌아가기?먯껜 ?ㅽ럺留?蹂댁? 留먭퀬, 諛뺤뒪 媛寃? 留??듭뀡, 援щℓ 梨꾨꼸, 洹몃━怨????ъ슜 紐⑹쟻??留욌뒗吏源뚯? 媛숈씠 蹂대뒗 ?몄씠 醫뗭뒿?덈떎. ?ㅼ씠?댄듃 紐⑹쟻?대㈃ ?밸쪟? 移쇰줈由? ?대룞 紐⑹쟻?대㈃ ?⑤갚吏?珥앸웾怨?諛?꾨? ?곗꽑 ?뺤씤?섎㈃ ?⑸땲??`,
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
    return "?앹궗??⑺삎";
  }
  if (sugar <= 3) {
    return "??뱁삎";
  }
  return "운동보완형";
}

function buildProductDescription(product: ProductDetailProps): string {
  const metrics = [
    `?⑤갚吏?${product.proteinPerServing}g`,
    product.calories != null ? `${product.calories}kcal` : null,
    product.sugar != null ? `?밸쪟 ${product.sugar}g` : null,
    product.density ? `諛??${product.density}` : null,
  ].filter(Boolean);
  const tail =
    product.productType === "drink"
      ? "RTD ?⑤갚吏??뚮즺 鍮꾧탳, 鍮꾩듂??제품 목록으로 돌아가기異붿쿇, 援щℓ ??泥댄겕?ъ씤?멸퉴吏 ?④퍡 ?뺤씤?????덉뒿?덈떎."
      : product.productType === "shake"
        ? "?먯씠??鍮꾧탳, ?ㅼ씠?댄듃 湲곗?, 鍮꾩듂??제품 목록으로 돌아가기異붿쿇源뚯? ?④퍡 ?뺤씤?????덉뒿?덈떎."
        : product.productType === "bar"
          ? "?⑤갚吏?諛?鍮꾧탳, ?ㅼ씠?댄듃 湲곗?, 鍮꾩듂??제품 목록으로 돌아가기異붿쿇源뚯? ?④퍡 ?뺤씤?????덉뒿?덈떎."
          : "?붽굅??鍮꾧탳, ?밸쪟 湲곗?, 鍮꾩듂??제품 목록으로 돌아가기異붿쿇源뚯? ?④퍡 ?뺤씤?????덉뒿?덈떎.";
  return `${product.brand} ${product.name} ?깅텇 ?뺣낫?낅땲?? ${metrics.join(" 쨌 ")}. ${tail}`;
}

function buildProductTitle(product: ProductDetailProps): string {
  const kind = getProductKindLabel(product.productType);
  const headline = [`?⑤갚吏?${product.proteinPerServing}g`];
  if (product.sugar != null) headline.push(`?밸쪟 ${product.sugar}g`);
  else if (product.calories != null) headline.push(`${product.calories}kcal`);
  return `${product.brand} ${product.name} | ${headline.join(" 쨌 ")} | ${kind} 鍮꾧탳`;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) return { title: "?쒗뭹??李얠쓣 ???놁쓬 | ProteinLab" };

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
    product.variant && product.variant !== "?쇰컲" ? product.variant : null,
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
    product.productType === "drink" && product.variant?.trim() === "?쏀넗?꾨━";

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
            { label: "추천 포지션", value: getShakePositioning(product), isCompact: false },
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
                    ?대?吏 以鍮?以?
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#6b6b6b]">
                  <Link href="/" className="hover:text-[#1a1a1a]">
                    ??
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
              <h2 className="text-lg font-semibold text-[var(--foreground)]">?깃툒 ?붿빟</h2>
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
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">媛寃㈑룰뎄留?梨꾨꼸 ?뺤씤</h2>
            {isShake && !resolvedCoupangHref && !naverHref && !officialMallHref ? (
              <p className="mb-3 text-sm leading-6 text-[var(--foreground-muted)]">
                ???먯씠?щ뒗 援щℓ 梨꾨꼸 留곹겕瑜??쒖감 ?뺤씤 以묒엯?덈떎. 吏湲덉? 제품 목록으로 돌아가기鍮꾧탳? ?곸꽭 ?깅텇遺???뺤씤????釉뚮옖???섏씠吏?먯꽌 ?꾨낫瑜???醫곹?蹂대뒗 ?몄씠 媛??鍮좊쫭?덈떎.
              </p>
            ) : null}
            <PurchaseLinkRow
              coupangHref={resolvedCoupangHref}
              naverHref={naverHref}
              officialMallHref={officialMallHref}
              size="md"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <TrackedLink
                href={`/compare?slugs=${encodeURIComponent(product.slug)}`}
                trackingLabel="비교함에 넣기"
                trackingSection="product_detail_after_purchase"
                trackingPageType="product_detail"
                className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(36,84,61,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                비교함에 넣기
              </TrackedLink>
              <TrackedLink
                href={getCategoryHref(category)}
                trackingLabel="같은 카테고리 보기"
                trackingSection="product_detail_after_purchase"
                trackingPageType="product_detail"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
              >
                같은 카테고리 보기
              </TrackedLink>
            </div>
          </div>

          <section className="mt-8">
            <div className="mb-4 space-y-1">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">?먯＜ 臾삳뒗 吏덈Ц</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                援щℓ ??留롮씠 ?뺤씤?섎뒗 湲곗?留?鍮좊Ⅴ寃??뺣━?덉뒿?덈떎.
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
            <TrackedLink
              href={getCategoryHref(category)}
              trackingLabel="제품 목록으로 돌아가기"
              trackingSection="product_detail_bottom_cta"
              trackingPageType="product_detail"
              className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
            >
              제품 목록으로 돌아가기
            </TrackedLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


