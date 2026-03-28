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
import ServingBasisNotice from "../../components/ServingBasisNotice";
import { getNutritionDetail } from "../../data/products";
import { getCategoryHref, getCategoryLabel } from "../../lib/categories";
import { getProductBySlugAsync, getProductsByCategoryAsync } from "../../lib/productData";
import { getProductImageUrl, getProductSpecImageUrl } from "../../lib/productImage";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  normalizeCoupangUrl,
} from "../../lib/purchaseLinks";
import { getSimilarProducts } from "../../lib/similarProducts";

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

function getProductSummary(product: ProductDetailProps) {
  if (product.productType === "drink") {
    if (product.sugar != null && product.sugar <= 1 && product.calories != null && product.calories <= 120) {
      return "??뮤룹?移쇰줈由?湲곗??쇰줈 癒쇱? 蹂닿린 醫뗭? RTD ?⑤갚吏??뚮즺?낅땲??";
    }
    if (product.proteinPerServing >= 30) {
      return "怨좊떒諛?蹂댁땐 以묒떖?쇰줈 ?ㅺ퀎??RTD ?쒗뭹?대씪 ?대룞 ??鍮꾧탳 ?섏슂? ??留욎뒿?덈떎.";
    }
    return "?몄쓽?깃낵 ?곸뼇 洹좏삎???④퍡 蹂대뒗 ?ъ슜?먯뿉寃?留욌뒗 RTD ?⑤갚吏??뚮즺?낅땲??";
  }

  if (product.productType === "bar") {
    return "媛꾩떇泥섎읆 癒밴린 ?ъ슫 ?뺥깭?몄?, 移쇰줈由ъ? ?밸쪟媛 怨쇳븯吏 ?딆?吏 媛숈씠 遊먯빞 ?섎뒗 ?⑤갚吏?諛붿엯?덈떎.";
  }

  if (product.productType === "yogurt") {
    return "?꾩묠 媛꾪렪?앷낵 媛꾩떇 ?섏슂?먯꽌 留롮씠 鍮꾧탳?섎뒗 ?쒗뭹?대씪 ?⑤갚吏덇낵 ?밸쪟瑜??④퍡 蹂대뒗 ?몄씠 醫뗭뒿?덈떎.";
  }

  return "?앹궗??? ?ㅼ씠?댄듃, ?꾩묠 媛꾪렪???섏슂?먯꽌 留롮씠 鍮꾧탳?섎뒗 ?뚯슦移섑삎 ?⑤갚吏??먯씠?ъ엯?덈떎.";
}

function getProductFitBullets(product: ProductDetailProps) {
  const bullets: string[] = [];

  if (product.productType === "drink") {
    if (product.sugar != null && product.sugar <= 1) bullets.push("?밸쪟 遺?댁씠 ??? RTD ?뚮즺瑜?李얜뒗 ?щ엺");
    if (product.proteinPerServing >= 30) bullets.push("??踰덉뿉 怨좊떒諛?蹂댁땐???먰븯???щ엺");
    if (product.proteinSource) bullets.push(`${product.proteinSource} ?⑤갚吏??먮즺瑜??곗꽑 蹂대뒗 ?щ엺`);
  } else if (product.productType === "bar") {
    bullets.push("?대룞 以?媛꾨떒???⑤갚吏덉쓣 梨숆린?ㅻ뒗 ?щ엺");
    if ((product.calories ?? 0) <= 200) bullets.push("媛꾩떇 移쇰줈由щ? 200kcal ?덉そ?쇰줈 愿由ы븯?ㅻ뒗 ?щ엺");
    if ((product.sugar ?? 0) <= 5) bullets.push("?밸쪟媛 ??? 諛붾? 李얜뒗 ?щ엺");
  } else if (product.productType === "yogurt") {
    bullets.push("?꾩묠?대굹 媛꾩떇?쇰줈 媛蹂띻쾶 ?⑤갚吏덉쓣 蹂댁땐?섎젮???щ엺");
    if ((product.sugar ?? 0) <= 5) bullets.push("????붽굅?몃? ?곗꽑 蹂대뒗 ?щ엺");
    if (product.yogurtType) bullets.push(`${product.yogurtType} ??낆쓣 ?좏샇?섎뒗 ?щ엺`);
  } else {
    if ((product.nutritionPerBottle?.fiberG ?? 0) >= 4) bullets.push("?щ쭔媛??덈뒗 ?앹궗????먯씠?щ? 李얜뒗 ?щ엺");
    if ((product.sugar ?? 0) <= 5) bullets.push("?밸쪟媛 ??? ?뚯슦移섑삎 ?먯씠?щ? 李얜뒗 ?щ엺");
    bullets.push("留쏄낵 袁몄?????랬 ?몄쓽?깆쓣 媛숈씠 蹂대뒗 ?щ엺");
  }

  bullets.push(`${getMetricLine(product)} 湲곗??쇰줈 鍮꾩듂???쒗뭹怨?鍮꾧탳?섎젮???щ엺`);

  return bullets.slice(0, 4);
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
      answer: `?쒗뭹 ?먯껜 ?ㅽ럺留?蹂댁? 留먭퀬, 諛뺤뒪 媛寃? 留??듭뀡, 援щℓ 梨꾨꼸, 洹몃━怨????ъ슜 紐⑹쟻??留욌뒗吏源뚯? 媛숈씠 蹂대뒗 ?몄씠 醫뗭뒿?덈떎. ?ㅼ씠?댄듃 紐⑹쟻?대㈃ ?밸쪟? 移쇰줈由? ?대룞 紐⑹쟻?대㈃ ?⑤갚吏?珥앸웾怨?諛?꾨? ?곗꽑 ?뺤씤?섎㈃ ?⑸땲??`,
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
    return `${getMetricLine(product)} 湲곗??쇰줈 RTD ?덉뿉???④퍡 留롮씠 鍮꾧탳?섎뒗 ?쒗뭹?낅땲?? 釉뚮옖?쒕? 諛붽퓭??鍮꾩듂???ㅽ럺?몄? 諛붾줈 ?뺤씤?????덉뒿?덈떎.`;
  }

  if (product.productType === "bar") {
    return `${getMetricLine(product)} 湲곗??쇰줈 ?대룞 媛꾩떇???⑤갚吏?諛??덉뿉???먯＜ 媛숈씠 蹂대뒗 ?쒗뭹?낅땲??`;
  }

  if (product.productType === "yogurt") {
    return `${getMetricLine(product)} 湲곗??쇰줈 ?꾩묠쨌媛꾩떇???붽굅???덉뿉???④퍡 鍮꾧탳?섎뒗 ?쒗뭹?낅땲??`;
  }

  return `${getMetricLine(product)} 湲곗??쇰줈 ?뚯슦移섑삎 ?먯씠???덉뿉???먯＜ 媛숈씠 蹂대뒗 ?쒗뭹?낅땲?? ?앹궗??⑷낵 ???湲곗????④퍡 ?뺤씤?섍린 醫뗭뒿?덈떎.`;
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
  return "이동보충형";
}

function getShakeSummaryNote(product: ProductDetailProps) {
  const positioning = getShakePositioning(product);
  const fiber = product.nutritionPerBottle?.fiberG ?? 0;
  const sugar = product.sugar ?? 0;

  if (positioning === "식사대용형") {
    return `?앹씠?ъ쑀 ${fiber}g? 移쇰줈由?援ъ꽦???④퍡 ?ㅼ뼱 ?덉뼱 ?????泥?愿?먯뿉?쒕룄 蹂닿린 醫뗭? ?먯씠?ъ엯?덈떎.`;
  }
  if (positioning === "저당형") {
    return `?밸쪟 ${sugar}g 湲곗??쇰줈 鍮꾧탳??源붾걫???몄씠??????먯씠??異뺤뿉??癒쇱? 蹂닿린 醫뗭뒿?덈떎.`;
  }
  return `?⑤갚吏?${product.proteinPerServing}g? ?⑤갚吏?諛?꾨? 癒쇱? 蹂대뒗 ?대룞蹂댁땐???먯씠?ъ뿉 媛源앹뒿?덈떎.`;
}

function getSpecSectionDescription(product: ProductDetailProps) {
  if (product.productType === "drink") {
    return "?ㅼ젣 ?⑦궎吏 ?깅텇???대?吏?낅땲?? ?⑤갚吏? ?밸쪟, 移쇰줈由? ?섑듃瑜⑥쓣 援щℓ ?꾩뿉 ?ㅼ떆 ?뺤씤?????좎슜?⑸땲??";
  }
  if (product.productType === "bar") {
    return "?ㅼ젣 ?⑦궎吏 ?깅텇???대?吏?낅땲?? 媛꾩떇泥섎읆 蹂댁뿬??移쇰줈由ъ? ?밸쪟 李⑥씠媛 而ㅼ꽌 留덉?留??뺤씤?⑹쑝濡?蹂닿린 醫뗭뒿?덈떎.";
  }
  if (product.productType === "yogurt") {
    return "?ㅼ젣 ?⑦궎吏 ?깅텇???대?吏?낅땲?? ?⑤갚吏? ?밸쪟, 蹂닿? 諛⑹떇源뚯? 媛숈씠 ?뺤씤?????덉뒿?덈떎.";
  }
  return "?ㅼ젣 ?⑦궎吏 ?깅텇???대?吏?낅땲?? ?앹씠?ъ쑀, ?밸쪟, 移쇰줈由?援ъ꽦??援щℓ ?꾩뿉 ??踰????뺤씤?????좎슜?⑸땲??";
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
      ? "RTD ?⑤갚吏??뚮즺 鍮꾧탳, 鍮꾩듂???쒗뭹 異붿쿇, 援щℓ ??泥댄겕?ъ씤?멸퉴吏 ?④퍡 ?뺤씤?????덉뒿?덈떎."
      : product.productType === "shake"
        ? "?먯씠??鍮꾧탳, ?ㅼ씠?댄듃 湲곗?, 鍮꾩듂???쒗뭹 異붿쿇源뚯? ?④퍡 ?뺤씤?????덉뒿?덈떎."
        : product.productType === "bar"
          ? "?⑤갚吏?諛?鍮꾧탳, ?ㅼ씠?댄듃 湲곗?, 鍮꾩듂???쒗뭹 異붿쿇源뚯? ?④퍡 ?뺤씤?????덉뒿?덈떎."
          : "?붽굅??鍮꾧탳, ?밸쪟 湲곗?, 鍮꾩듂???쒗뭹 異붿쿇源뚯? ?④퍡 ?뺤씤?????덉뒿?덈떎.";
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
  const productSpecImageUrl = getProductSpecImageUrl(product.slug, product.productType);
  const category = (product.productType ?? "drink") as "drink" | "bar" | "yogurt" | "shake";
  const categoryProducts = await getProductsByCategoryAsync(category);
  const sameBrandProducts = getSameBrandProducts(product, categoryProducts, 3);
  const similarProducts = getSimilarProducts(product, categoryProducts, 6);
  const faqItems = getProductFaqs(product);
  const hasCapacityInName = Boolean(product.capacity && product.name.includes(product.capacity));
  const metaParts = [
    product.manufacturer,
    hasCapacityInName ? null : product.capacity,
    product.variant && product.variant !== "?쇰컲" ? product.variant : null,
  ].filter(Boolean);
  const metaLine = metaParts.join(" ");
  const productFacts = isBar
    ? []
      : isYogurt
      ? [
          product.storageType ? `蹂닿? ${product.storageType}` : null,
          product.lactoseFree ? "?쏀넗?꾨━" : null,
        ].filter(Boolean)
      : [
          product.drinkType ? `?좏삎 ${product.drinkType}` : null,
          product.proteinSource ? `?⑤갚吏덉썝 ${product.proteinSource}` : null,
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
            { label: "중량", value: product.capacity ?? "-", isCompact: false },
            { label: "식이섬유", value: product.nutritionPerBottle?.fiberG != null ? `${product.nutritionPerBottle.fiberG}g` : "-", isCompact: false },
            { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "-", isCompact: false },
            { label: "포지션", value: getShakePositioning(product), isCompact: false },
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
            <div className="w-full flex-shrink-0 lg:max-w-[200px]">
              <div
                className="relative flex w-full min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-[#e8e6e3] bg-white sm:min-h-[200px] lg:h-full lg:min-h-0"
                style={{ borderRadius: "16px" }}
              >
                {productImageUrl ? (
                  <Image
                    src={productImageUrl}
                    alt={`${product.brand} ${product.name}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 52vw, 200px"
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
                <div className="mt-4 rounded-xl border border-[#e6e1d8] bg-[#fffaf1] p-4">
                  <p className="text-[12px] font-semibold tracking-wide text-[#8b6f3d]">?쒕늿??蹂닿린</p>
                  <p className="mt-2 text-sm leading-6 text-[#4f4a40]">{getProductSummary(product)}</p>
                  <ul className="mt-3 space-y-1 text-sm leading-6 text-[#5f6258]">
                    {getProductFitBullets(product).map((bullet) => (
                      <li key={bullet}>??{bullet}</li>
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

          {productSpecImageUrl ? (
            <section className="mt-8">
              <div className="mb-4 space-y-1">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">?깅텇???대?吏</h2>
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
                <h2 className="text-lg font-semibold text-[var(--foreground)]">媛숈? 釉뚮옖?쒖뿉??媛숈씠 蹂대뒗 ?쒗뭹</h2>
                <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                  {product.brand} ?덉뿉??紐⑹쟻?대굹 留쏅쭔 諛붽퓭 蹂닿퀬 ?띕떎硫????쒗뭹?ㅻ????댁뼱???뺤씤?섎㈃ 鍮좊쫭?덈떎.
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
                <h2 className="text-lg font-semibold text-[var(--foreground)]">鍮꾩듂???쒗뭹 鍮꾧탳</h2>
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
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">援щℓ 留곹겕</h2>
            {isShake && !resolvedCoupangHref && !naverHref && !officialMallHref ? (
              <p className="mb-3 text-sm leading-6 text-[var(--foreground-muted)]">
                ?먯씠??援щℓ 留곹겕??釉뚮옖?쒕퀎 怨듭떇 留곹겕瑜??쒖감 ?뺤씤 以묒엯?덈떎. ?꾩옱???쒗뭹 鍮꾧탳? ?곸꽭 ?깅텇 ?뺤씤??癒쇱? 吏꾪뻾?????덉뒿?덈떎.
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
            <Link
              href={getCategoryHref(category)}
              className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
            >
              ?쒗뭹 紐⑸줉?쇰줈
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

