import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommercialAdSection from "../../components/CommercialAdSection";
import ProductCard from "../../components/ProductCard";
import TrackedLink from "../../components/TrackedLink";
import { getAllProducts } from "../../data/products";
import { getCategoryLabel, type ProductCategory } from "../../lib/categories";
import { getBrandSummary, slugToBrand } from "../../lib/brandHubs";
import { formatProductLabel } from "../../lib/productLabel";
import { getBrandProfile } from "@/app/lib/brandProfile";
import type { ProductDetailProps } from "../../data/products";

function getBrandQuickLinks(brand: string) {
  const map: Record<string, { href: string; title: string; description: string }[]> = {
    셀렉스: [
      {
        href: "/guides/product-selection-comparison/selexs-lineup",
        title: "셀렉스 라인업 차이 보기",
        description: "코어프로틴, 마시는 단백질, 프로핏 라인 차이를 먼저 정리해봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/selex-vs-himune",
        title: "셀렉스 vs 하이뮨 비교",
        description: "대표 RTD끼리 직접 비교해 어떤 방향이 맞는지 바로 확인합니다.",
      },
    ],
    하이뮨: [
      {
        href: "/guides/product-selection-comparison/himune-lineup",
        title: "하이뮨 라인업 차이 보기",
        description: "프로틴 밸런스와 액티브 라인 차이를 먼저 읽어볼 수 있습니다.",
      },
      {
        href: "/guides/product-selection-comparison/takefit-vs-himune",
        title: "테이크핏 vs 하이뮨 비교",
        description: "저당형 RTD와 산양유 RTD 차이를 빠르게 비교합니다.",
      },
    ],
    테이크핏: [
      {
        href: "/guides/product-selection-comparison/protein-shake-new-products-2026",
        title: "브레드밀 신제품 비교 보기",
        description: "브레드밀 4종을 다른 신규 쉐이크와 단백질·당류 기준으로 비교합니다.",
      },
      {
        href: "/guides/product-selection-comparison/takefit-lineup",
        title: "테이크핏 라인업 차이 보기",
        description: "맥스, 몬스터, 프로 라인을 목적별로 빠르게 구분해봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/high-protein-40g-comparison",
        title: "40g 이상 RTD 비교",
        description: "고함량 RTD 제품끼리 바로 비교해 차이를 확인합니다.",
      },
    ],
    뉴케어: [
      {
        href: "/guides/product-selection-comparison/newcare-allprotein",
        title: "뉴케어 올프로틴 라인 보기",
        description: "41g, 25g, 식물성 라인 차이를 한 번에 정리해봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/protein-drink-for-50s",
        title: "50대용 제품 기준 보기",
        description: "중장년 건강관리 관점에서 어떤 기준으로 봐야 할지 먼저 확인합니다.",
      },
    ],
    더단백: [
      {
        href: "/guides/product-selection-comparison/danbaek-lineup",
        title: "더단백 라인업 차이 보기",
        description: "20g부터 40g 라인까지 전체 구성을 빠르게 훑어봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/danbaek-vs-himune",
        title: "더단백 vs 하이뮨 비교",
        description: "저나트륨 RTD와 산양유 RTD 차이를 직접 비교합니다.",
      },
    ],
    닥터유: [
      {
        href: "/guides/product-selection-comparison/dryou-lineup",
        title: "닥터유 라인업 차이 보기",
        description: "40g 음료와 바 라인을 브랜드 기준으로 정리합니다.",
      },
      {
        href: "/guides/product-selection-comparison/doctoru-40g-vs-takefit-monster-43g",
        title: "닥터유 vs 테이크핏 비교",
        description: "맛 중심인지 함량 중심인지 직접 비교합니다.",
      },
    ],
    랩노쉬: [
      {
        href: "/guides/product-selection-comparison/labnosh-lineup",
        title: "랩노쉬 라인업 차이 보기",
        description: "슬림쉐이크와 프로틴드링크 차이를 브랜드 기준으로 봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/protein-shake-top7",
        title: "쉐이크 상위 제품 보기",
        description: "전체 쉐이크 안에서 랩노쉬 위치를 함께 확인합니다.",
      },
    ],
    플라이밀: [
      {
        href: "/guides/product-selection-comparison/flymill-protein-shake",
        title: "플라이밀 쉐이크 맛·성분 비교",
        description: "플라이밀 쉐이크 라인업을 단백질·당류·칼로리 기준으로 먼저 정리합니다.",
      },
      {
        href: "/guides/product-selection-comparison/flymill-vs-danbaekhani",
        title: "플라이밀 vs 단백하니 비교",
        description: "맛 구성과 저당·칼로리 차이를 브랜드 단위로 비교합니다.",
      },
      {
        href: "/compare/flymill-vs-itthefit-shake",
        title: "플라이밀 vs 잇더핏 초코",
        description: "초코 계열 대표 제품의 단백질·당류·칼로리를 직접 비교합니다.",
      },
    ],
    잇더핏: [
      {
        href: "/compare/proteone-vs-itthefit-shake",
        title: "프로티원 vs 잇더핏 쉐이크",
        description: "대표 제품의 단백질·당류·칼로리를 직접 비교합니다.",
      },
      {
        href: "/guides/product-selection-comparison/protein-shake-flavor-guide",
        title: "쉐이크 맛 선택 가이드",
        description: "초코·곡물·커피·디저트 계열 중 취향에 맞는 맛을 좁혀봅니다.",
      },
      {
        href: "/compare/labnosh-vs-itthefit-shake",
        title: "랩노쉬 vs 잇더핏 더블초코",
        description: "같은 더블초코 맛의 열량과 당류 차이를 직접 비교합니다.",
      },
    ],
    밀잇: [
      {
        href: "/guides/product-selection-comparison/protein-shake-flavor-guide",
        title: "쉐이크 맛 선택 가이드",
        description: "밀잇을 포함한 초코·곡물·디저트형 쉐이크를 맛 계열별로 비교합니다.",
      },
      {
        href: "/guides/product-selection-comparison/diet-protein-shake",
        title: "다이어트 쉐이크 기준 보기",
        description: "단백질뿐 아니라 당류와 칼로리까지 함께 보는 선택 기준입니다.",
      },
      {
        href: "/compare/milit-vs-kkobak-shake",
        title: "밀잇 vs 꼬박꼬밥 커피맛",
        description: "커피맛 쉐이크의 단백질과 당류 차이를 직접 비교합니다.",
      },
    ],
    올더배러: [
      {
        href: "/compare/flymill-vs-allthebetter-shake",
        title: "플라이밀 vs 올더배러 쉐이크",
        description: "두 브랜드의 대표 맛과 영양성분을 직접 비교합니다.",
      },
    ],
    프로티원: [
      {
        href: "/guides/product-selection-comparison/proteone-protein-shake",
        title: "프로티원 쉐이크 라인업",
        description: "프로티원 맛별 단백질 밀도와 저당 여부를 한 번에 확인합니다.",
      },
      {
        href: "/compare/proteone-vs-itthefit-shake",
        title: "프로티원 vs 잇더핏 쉐이크",
        description: "대표 파우치 쉐이크를 성분 기준으로 직접 비교합니다.",
      },
    ],
    "딜라이트 프로젝트": [
      {
        href: "/guides/product-selection-comparison/delight-project-shake-flavors",
        title: "딜라이트 프로젝트 8종 맛 비교",
        description: "8가지 맛의 단백질·당류·칼로리를 나란히 확인합니다.",
      },
      {
        href: "/guides/product-selection-comparison/protein-shake-new-products-2026",
        title: "2026 쉐이크 신제품 비교",
        description: "다른 신규 브랜드와 성분 포지션을 비교합니다.",
      },
      {
        href: "/compare/delight-project-vs-shakebaby-shake",
        title: "딜라이트 프로젝트 vs 쉐이크베이비",
        description: "초코 계열 대표 제품의 단백질·당류·칼로리를 직접 비교합니다.",
      },
    ],
    한손한끼: [
      {
        href: "/guides/product-selection-comparison/hansonhankki-vs-maeilhankki-shake",
        title: "한손한끼 vs 매일한끼 비교",
        description: "같은 40g 파우치 5종씩의 단백질·당류 차이를 확인합니다.",
      },
    ],
    매일한끼: [
      {
        href: "/guides/product-selection-comparison/hansonhankki-vs-maeilhankki-shake",
        title: "매일한끼 vs 한손한끼 비교",
        description: "고단백·저당 수치와 맛 구성을 직접 비교합니다.",
      },
    ],
    스포식스: [
      {
        href: "/guides/product-selection-comparison/protein-shake-new-products-2026",
        title: "2026 쉐이크 신제품 비교",
        description: "당류 1g 스포식스 2종을 다른 신규 쉐이크와 비교합니다.",
      },
    ],
  };

  return map[brand] ?? [];
}

function getShakeHighlights(items: ProductDetailProps[]) {
  const used = new Set<string>();
  const pick = (
    label: string,
    description: string,
    value: (product: ProductDetailProps) => number,
    direction: "asc" | "desc",
    display: (product: ProductDetailProps) => string,
  ) => {
    const product = items
      .filter((item) => Number.isFinite(value(item)))
      .sort((a, b) => (direction === "asc" ? value(a) - value(b) : value(b) - value(a)))
      .find((item) => !used.has(item.slug));
    if (!product) return null;
    used.add(product.slug);
    return { label, description, display: display(product), product };
  };

  return [
    pick("고단백", "운동 후 단백질 총량을 우선할 때", (item) => item.proteinPerServing, "desc", (item) => `${item.proteinPerServing}g`),
    pick("저당", "당류 부담이 적은 맛부터 고를 때", (item) => item.sugar ?? Number.POSITIVE_INFINITY, "asc", (item) => `당류 ${item.sugar ?? 0}g`),
    pick("저칼로리", "가벼운 간식형 쉐이크를 찾을 때", (item) => item.calories ?? Number.POSITIVE_INFINITY, "asc", (item) => `${item.calories ?? 0}kcal`),
  ].filter((item): item is NonNullable<typeof item> => item !== null);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return getBrandSummary(products).map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const products = getAllProducts();
  const brands = getBrandSummary(products);
  const { slug } = await params;
  const brand = slugToBrand(slug, brands.map((item) => item.brand));

  if (!brand) {
    return { title: "브랜드 페이지를 찾을 수 없음 | ProteinLab" };
  }

  const canonical = `https://proteinlab.kr/brands/${slug}`;
  const items = products.filter((item) => item.brand === brand);
  const shakeItems = items.filter((item) => item.productType === "shake");
  const range = (values: Array<number | undefined>, unit: string) => {
    const nums = values.filter((v): v is number => typeof v === "number" && Number.isFinite(v));
    if (nums.length === 0) return null;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return min === max ? `${min}${unit}` : `${min}~${max}${unit}`;
  };
  const proteinRange = range(items.map((item) => item.proteinPerServing), "g");
  const sugarRange = range(items.map((item) => item.sugar), "g");
  const calorieRange = range(items.map((item) => item.calories), "kcal");
  const facts = [
    proteinRange && `단백질 ${proteinRange}`,
    sugarRange && `당류 ${sugarRange}`,
    calorieRange && `${calorieRange}`,
  ].filter(Boolean);
  // 검색어가 "○○ 성분"·"○○ 성분표" 형태라 제목에 그대로 넣고, 설명에는 실제 수치 범위를 넣는다.
  const title =
    shakeItems.length >= 2
      ? `${brand} 단백질 쉐이크 성분 비교 — 맛·단백질·칼로리 ${shakeItems.length}종`
      : `${brand} 성분표 — 단백질·당류·칼로리 ${items.length}종 한눈에 비교`;
  const description =
    `${brand} ${shakeItems.length >= 2 ? `단백질 쉐이크 ${shakeItems.length}종` : `단백질 제품 ${items.length}종`}의 성분표를 표로 비교합니다.` +
    (facts.length ? ` 1회 기준 ${facts.join(" · ")}.` : "") +
    ` 어떤 제품부터 봐야 할지 바로 확인하세요.`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
      title,
      description,
      url: canonical,
      type: "article",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
      card: "summary",
      title,
      description,
    },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const products = getAllProducts();
  const brands = getBrandSummary(products);
  const { slug } = await params;
  const brandName = slugToBrand(slug, brands.map((item) => item.brand));
  const brand = brands.find((item) => item.brand === brandName);
  const quickLinks = brand ? getBrandQuickLinks(brand.brand) : [];

  if (!brand) notFound();

  const profileGroups = getBrandProfile(brand.brand, brand.items, products);
  const rankBySlug = new Map(profileGroups.flatMap((g) => g.rows.map((r) => [r.slug, `${r.proteinRank}위 / ${g.poolSize}종`] as const)));

  const shakeItems = brand.items.filter((item) => item.productType === "shake");
  const shakeHighlights = getShakeHighlights(shakeItems);
  const shakeFlavors = [...new Set(shakeItems.map((item) => item.flavor).filter((flavor): flavor is string => Boolean(flavor)))];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "브랜드", item: "https://proteinlab.kr/brands" },
      { "@type": "ListItem", position: 3, name: brand.brand, item: `https://proteinlab.kr/brands/${slug}` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brand.brand} 단백질 제품 목록`,
    numberOfItems: brand.items.length,
    itemListElement: brand.items.map((p: ProductDetailProps, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://proteinlab.kr/product/${p.slug}`,
      name: formatProductLabel(p.brand, p.name),
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <nav className="mb-3 text-sm text-[var(--foreground-muted)]">
            <Link href="/brands" className="hover:text-[var(--accent)]">
              브랜드
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{brand.brand}</span>
          </nav>
          <h1 className="text-2xl font-bold leading-[1.25] text-[#16412D] md:text-3xl">
            {brand.brand} 단백질 제품 모음
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {brand.brand} 브랜드 제품 {brand.total}개를 한 번에 볼 수 있게 정리했습니다. 브랜드명으로
            검색해 들어왔다면 라인업 차이와 대표 비교 페이지를 먼저 보고, 그다음 제품 상세를 보는
            편이 더 빠릅니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickLinks[0] ? (
              <TrackedLink
                href={quickLinks[0].href}
                trackingLabel={`${brand.brand} 라인업 보기`}
                trackingSection="brand_hero_cta"
                trackingPageType="brand"
                className="inline-flex min-h-11 min-w-[132px] items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(47,111,74,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-95 md:text-sm"
              >
                라인업 보기
              </TrackedLink>
            ) : null}
            <TrackedLink
              href="/recommend"
              trackingLabel={`${brand.brand} 맞춤 추천 받기`}
              trackingSection="brand_hero_cta"
              trackingPageType="brand"
              className="inline-flex min-h-9 items-center rounded-full border border-[#d7e4d9] bg-white px-3.5 py-2 text-xs font-semibold text-[#24543d] transition-colors hover:border-[#24543d] hover:bg-[#f3faf5] md:text-sm"
            >
              맞춤 추천
            </TrackedLink>
            <TrackedLink
              href="/products"
              trackingLabel="전체 제품 보기"
              trackingSection="brand_hero_cta"
              trackingPageType="brand"
              className="inline-flex min-h-9 items-center rounded-full border border-[#d7e4d9] bg-white px-3.5 py-2 text-xs font-semibold text-[#24543d] transition-colors hover:border-[#24543d] hover:bg-[#f3faf5] md:text-sm"
            >
              전체 제품 보기
            </TrackedLink>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">브랜드 요약</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            카테고리:{" "}
            {brand.categories.map((category) => getCategoryLabel(category as ProductCategory)).join(", ")} / 총
            제품 수: {brand.total}개
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            제품 수가 많은 브랜드일수록 라인별 포지션 차이가 큽니다. 제품 목록만 보기보다 라인업
            가이드와 대표 비교 페이지를 같이 보면 후보를 더 빨리 좁힐 수 있습니다.
          </p>
        </section>

        {profileGroups.length > 0 ? (
          <section className="mt-6 rounded-2xl border border-[#e8e6e3] bg-white p-5">
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#1F5A3D]">ProteinLab 분석</p>
            <h2 className="mt-0.5 text-lg font-bold text-[var(--foreground)]">수치로 보는 {brand.brand}</h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">1회 제공량(1병·1개) 기준이며, 순위는 ProteinLab에 등록된 같은 카테고리 제품 안에서의 순위입니다.</p>
            {profileGroups.map((group) => (
              <div key={group.kind} className="mt-5">
                <h3 className="text-base font-semibold text-[var(--foreground)]">{group.kindLabel} · {group.rows.length}종</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{group.summary}</p>
              </div>
            ))}
          </section>
        ) : null}

        {quickLinks.length > 0 ? (
          <section className="mt-6">
            <div className="mb-4 space-y-1">
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                이 브랜드에서 먼저 보면 좋은 페이지
              </h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                브랜드 검색으로 들어왔다면 제품 목록보다 라인업 차이와 대표 비교 페이지를 먼저 읽는
                편이 선택이 더 빠릅니다.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {quickLinks.map((link) => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  trackingLabel={link.title}
                  trackingSection="brand_quick_links"
                  trackingPageType="brand"
                  className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5 transition-colors hover:bg-[var(--accent-light)]"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">{link.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {link.description}
                  </p>
                </TrackedLink>
              ))}
            </div>
          </section>
        ) : null}

        {shakeItems.length >= 2 ? (
          <section className="mt-8 rounded-3xl border border-[#dce9df] bg-[#f5faf6] p-5 md:p-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                {brand.brand} 단백질 쉐이크 빠른 선택
              </h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                등록된 {shakeItems.length}종 중 고단백·저당·저칼로리 기준의 대표 제품입니다. 수치는 1회 섭취량 기준이며, 제품 상세에서 성분표와 구매 링크를 함께 확인할 수 있습니다.
              </p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {shakeHighlights.map(({ label, description, display, product }) => (
                <Link
                  key={`${label}-${product.slug}`}
                  href={`/product/${product.slug}`}
                  className="rounded-2xl border border-[#dce9df] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#8eb79a] hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#e5f3e8] px-2.5 py-1 text-xs font-bold text-[#24543d]">{label}</span>
                    <strong className="text-sm text-[var(--accent)]">{display}</strong>
                  </div>
                  <p className="mt-3 font-semibold leading-6 text-[var(--foreground)]">{product.name}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">{description}</p>
                </Link>
              ))}
            </div>
            {shakeFlavors.length > 0 ? (
              <div className="mt-5 border-t border-[#dce9df] pt-4">
                <p className="text-xs font-semibold text-[#356149]">등록된 맛 {shakeFlavors.length}가지</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {shakeFlavors.map((flavor) => (
                    <span key={flavor} className="rounded-full border border-[#d7e4d9] bg-white px-3 py-1.5 text-xs text-[var(--foreground-muted)]">
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="mt-8">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">
              {shakeItems.length >= 2 ? `${brand.brand} 쉐이크 성분 비교표` : "성분 비교표"}
            </h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              {brand.brand} 제품 전체를 단백질·칼로리·당류 기준으로 한눈에 비교합니다.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#e8e6e3]">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#f7f4ee]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[var(--foreground)]">제품명</th>
                  <th className="px-3 py-3 text-right font-semibold text-[var(--foreground)]">단백질</th>
                  <th className="px-3 py-3 text-right font-semibold text-[var(--foreground)]">칼로리</th>
                  <th className="px-3 py-3 text-right font-semibold text-[var(--foreground)]">당류</th>
                  <th className="px-3 py-3 text-right font-semibold text-[var(--foreground)]">용량</th>
                  <th className="px-3 py-3 text-right font-semibold text-[var(--foreground)]">단백질 순위</th>
                </tr>
              </thead>
              <tbody>
                {brand.items
                  .slice()
                  .sort((a: ProductDetailProps, b: ProductDetailProps) => b.proteinPerServing - a.proteinPerServing)
                  .map((p: ProductDetailProps) => (
                    <tr key={p.slug} className="border-t border-[#e8e6e3] hover:bg-[#fdfaf5]">
                      <td className="px-4 py-3">
                        <Link href={`/product/${p.slug}`} className="font-medium text-[var(--foreground)] hover:text-[var(--accent)] hover:underline">
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-right font-bold text-[var(--accent)]">{p.proteinPerServing}g</td>
                      <td className="px-3 py-3 text-right text-[var(--foreground-muted)]">{p.calories != null ? `${p.calories}kcal` : "-"}</td>
                      <td className="px-3 py-3 text-right text-[var(--foreground-muted)]">{p.sugar != null ? `${p.sugar}g` : "-"}</td>
                      <td className="px-3 py-3 text-right text-[var(--foreground-muted)]">{p.capacity ?? "-"}</td>
                      <td className="px-3 py-3 text-right text-[var(--foreground-muted)]">{rankBySlug.get(p.slug) ?? "-"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">제품 목록</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드 안에서 실제로 어떤 제품이 있는지 먼저 훑고, 마음에 드는 후보가 생기면 제품
              상세로 바로 넘어가면 됩니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {brand.items.map((product) => (
              <ProductCard key={product.slug} {...product} purchaseLinkCategory="ranking" />
            ))}
          </div>
        </section>
        <CommercialAdSection pageType="feed" className="mt-6" />
      </main>

      <Footer />
    </div>
  );
}
