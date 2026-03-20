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
    return "?ùÏÇ¨?Ä?©Ìòï";
  }
  if (sugar <= 3) {
    return "?Ä?πÌòï";
  }
  return "?¥ÎèôÎ≥¥Ï∂©??;
}

function getShakeSummaryNote(product: ProductDetailProps) {
  const positioning = getShakePositioning(product);
  const fiber = product.nutritionPerBottle?.fiberG ?? 0;
  const sugar = product.sugar ?? 0;

  if (positioning === "?ùÏÇ¨?Ä?©Ìòï") {
    return `?ùÏù¥?¨Ïú† ${fiber}g?Ä ÏπºÎ°úÎ¶?Íµ¨ÏÑ±???®Íªò ?§Ïñ¥ ?àÏñ¥ ?????ÄÏ≤?Í¥Ä?êÏóê?úÎèÑ Î≥¥Í∏∞ Ï¢ãÏ? ?êÏù¥?¨ÏûÖ?àÎã§.`;
  }
  if (positioning === "?Ä?πÌòï") {
    return `?πÎ•ò ${sugar}g Í∏∞Ï??ºÎ°ú ÎπÑÍµê??ÍπîÎÅî???∏Ïù¥???Ä???êÏù¥??Ï∂ïÏóê??Î®ºÏ? Î≥¥Í∏∞ Ï¢ãÏäµ?àÎã§.`;
  }
  return `?®Î∞±Ïß?${product.proteinPerServing}g?Ä ?®Î∞±Ïß?Î∞Ä?ÑÎ? Î®ºÏ? Î≥¥Îäî ?¥ÎèôÎ≥¥Ï∂©???êÏù¥?¨Ïóê Í∞ÄÍπùÏäµ?àÎã§.`;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) return { title: "?úÌíà??Ï∞æÏùÑ ???ÜÏùå | ProteinLab" };

  return {
    title: `${product.brand} ${product.name} | ProteinLab`,
    description: `${product.brand} ${product.name} ${getProductKindLabel(product.productType)} ?ÅÏÑ∏ ?ïÎ≥¥`,
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
  const hasCapacityInName = Boolean(product.capacity && product.name.includes(product.capacity));
  const metaParts = [
    product.manufacturer,
    hasCapacityInName ? null : product.capacity,
    product.variant && product.variant !== "?ºÎ∞ò" ? product.variant : null,
  ].filter(Boolean);
  const metaLine = metaParts.join(" ");
  const productFacts = isBar
    ? []
      : isYogurt
      ? [
          product.storageType ? `Î≥¥Í? ${product.storageType}` : null,
          product.lactoseFree ? "?ΩÌÜ†?ÑÎ¶¨" : null,
        ].filter(Boolean)
      : [
          product.drinkType ? `?†Ìòï ${product.drinkType}` : null,
          product.proteinSource ? `?®Î∞±ÏßàÏõê ${product.proteinSource}` : null,
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
    product.productType === "drink" && product.variant?.trim() === "?ΩÌÜ†?ÑÎ¶¨";

  const summaryMetrics = isBar
    ? [
        { label: "?®Î∞±Ïß?, value: `${product.proteinPerServing}g`, isCompact: false },
        { label: "ÏπºÎ°úÎ¶?, value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
        { label: "?πÎ•ò", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
        { label: "?®Î∞±Ïß?Î∞Ä??, value: product.density ?? "-", isCompact: true },
        { label: "Ï§ëÎüâ", value: product.capacity ?? "-", isCompact: false },
        { label: "ÏßÄÎ∞?, value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
        { label: "?òÌä∏Î•?, value: product.sodium !== undefined ? `${product.sodium}mg` : "-", isCompact: false },
      ]
    : isYogurt
      ? [
          { label: "?®Î∞±Ïß?, value: `${product.proteinPerServing}g`, isCompact: false },
          { label: "ÏπºÎ°úÎ¶?, value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
          { label: "?πÎ•ò", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
          { label: "?®Î∞±Ïß?Î∞Ä??, value: product.density ?? "-", isCompact: true },
          { label: "Ï§ëÎüâ", value: product.capacity ?? "-", isCompact: false },
          { label: "?îÍ±∞???†Ìòï", value: product.yogurtType ?? "-", isCompact: false },
          { label: "ÏßÄÎ∞?, value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
          { label: "?òÌä∏Î•?, value: product.sodium !== undefined ? `${product.sodium}mg` : "-", isCompact: false },
        ]
      : isShake
        ? [
            { label: "?®Î∞±Ïß?, value: `${product.proteinPerServing}g`, isCompact: false },
            { label: "ÏπºÎ°úÎ¶?, value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
            { label: "?πÎ•ò", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
            { label: "?®Î∞±Ïß?Î∞Ä??, value: product.density ?? "-", isCompact: true },
            { label: "?©Îüâ", value: product.capacity ?? "-", isCompact: false },
            { label: "?ùÏù¥?¨Ïú†", value: product.nutritionPerBottle?.fiberG != null ? `${product.nutritionPerBottle.fiberG}g` : "-", isCompact: false },
            { label: "ÏßÄÎ∞?, value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
            { label: "??∑® ?¨Ïù∏??, value: getShakePositioning(product), isCompact: false },
          ]
      : [
          { label: "?®Î∞±Ïß?, value: `${product.proteinPerServing}g`, isCompact: false },
          { label: "ÏπºÎ°úÎ¶?, value: product.calories != null ? `${product.calories}kcal` : "-", isCompact: false },
          { label: "?πÎ•ò", value: product.sugar !== undefined ? `${product.sugar}g` : "-", isCompact: false },
          { label: "?®Î∞±Ïß?Î∞Ä??, value: product.density ?? "-", isCompact: true },
          { label: "?©Îüâ", value: product.capacity ?? "-", isCompact: false },
          { label: "?ΩÌÜ†?ÑÎ¶¨", value: isLactoseFreeDrink ? "O" : "X", isCompact: false },
          { label: "ÏßÄÎ∞?, value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
          { label: "?òÌä∏Î•?, value: product.sodium !== undefined ? `${product.sodium}mg` : "-", isCompact: false },
        ];

  return (
    <div className="min-h-screen bg-white">
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
                    ?¥Î?ÏßÄ Ï§ÄÎπ?Ï§?
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
              <h2 className="text-lg font-semibold text-[var(--foreground)]">?±Í∏â ?îÏïΩ</h2>
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
            <ProductReviewSection />
          </div>

          <div
            className="mt-6 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">Íµ¨Îß§ ÎßÅÌÅ¨</h2>
            {isShake && !resolvedCoupangHref && !naverHref && !officialMallHref ? (
              <p className="mb-3 text-sm leading-6 text-[var(--foreground-muted)]">
                ?êÏù¥??Íµ¨Îß§ ÎßÅÌÅ¨??Î∏åÎûú?úÎ≥Ñ Í≥µÏãù ÎßÅÌÅ¨Î•??úÏ∞® ?ïÏù∏ Ï§ëÏûÖ?àÎã§. ?ÑÏû¨???úÌíà ÎπÑÍµê?Ä ?ÅÏÑ∏ ?±Î∂Ñ ?ïÏù∏??Î®ºÏ? ÏßÑÌñâ?????àÏäµ?àÎã§.
              </p>
            ) : null}
            <PurchaseLinkRow
              coupangHref={resolvedCoupangHref}
              naverHref={naverHref}
              officialMallHref={officialMallHref}
              size="md"
            />
            {resolvedCoupangHref ? (
              <p className="mt-[6px] text-[11px] text-[#9ca3af]">
                °ÿ ±∏∏≈ Ω√ ¡¶»ﬁ ºˆºˆ∑·∞° πﬂª˝«“ ºˆ ¿÷Ω¿¥œ¥Ÿ.
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <CompareButton slug={slug} detailHref={`/product/${slug}`} />
            <Link
              href={getCategoryHref((product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake")}
              className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
            >
              ?úÌíà Î™©Î°ù?ºÎ°ú
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
