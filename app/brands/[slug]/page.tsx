import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../data/products";
import { getCategoryLabel, type ProductCategory } from "../../lib/categories";
import { getBrandSummary, slugToBrand } from "../../lib/brandHubs";

function getBrandQuickLinks(brand: string) {
  const map: Record<string, { href: string; title: string; description: string }[]> = {
    셀렉스: [
      {
        href: "/guides/product-selection-comparison/selexs-lineup",
        title: "셀렉스 라인업 가이드",
        description: "프로핏, 코어프로틴, 마이밀 차이를 먼저 읽고 제품을 좁힙니다.",
      },
      {
        href: "/guides/product-selection-comparison/selex-vs-himune",
        title: "셀렉스 vs 하이뮨 비교",
        description: "대표 RTD를 직접 비교해 어떤 방향이 맞는지 확인합니다.",
      },
    ],
    하이뮨: [
      {
        href: "/guides/product-selection-comparison/himune-lineup",
        title: "하이뮨 라인업 가이드",
        description: "액티브, 제로, 다크초코, 프로틴밸런스를 한 번에 정리합니다.",
      },
      {
        href: "/guides/product-selection-comparison/takefit-vs-himune",
        title: "테이크핏 vs 하이뮨 비교",
        description: "저당형 RTD와 산양유 RTD 차이를 바로 읽습니다.",
      },
    ],
    테이크핏: [
      {
        href: "/guides/product-selection-comparison/takefit-lineup",
        title: "테이크핏 라인업 가이드",
        description: "맥스, 몬스터, 프로를 목적별로 나눠 봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/high-protein-40g-comparison",
        title: "40g 이상 RTD 비교",
        description: "테이크핏 몬스터가 다른 40g대 제품과 어떻게 다른지 확인합니다.",
      },
    ],
    뉴케어: [
      {
        href: "/guides/product-selection-comparison/newcare-allprotein",
        title: "뉴케어 올프로틴 완전 분석",
        description: "41g, 25g, 식물성, 워터 라인 차이를 한 페이지에서 봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/protein-drink-for-50s",
        title: "50대 단백질 음료 가이드",
        description: "중장년층 관점에서 뉴케어를 어떻게 봐야 하는지 정리했습니다.",
      },
    ],
    더단백: [
      {
        href: "/guides/product-selection-comparison/danbaek-lineup",
        title: "더단백 라인업 가이드",
        description: "20g부터 40g 라인까지 전체 구성을 빠르게 확인합니다.",
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
        title: "닥터유 라인업 가이드",
        description: "40g 음료와 바 라인을 브랜드 기준으로 정리합니다.",
      },
      {
        href: "/guides/product-selection-comparison/doctoru-40g-vs-takefit-monster-43g",
        title: "닥터유 vs 테이크핏 몬스터",
        description: "맛 중심인지 함량 중심인지 직접 비교합니다.",
      },
    ],
    랩노쉬: [
      {
        href: "/guides/product-selection-comparison/labnosh-lineup",
        title: "랩노쉬 라인업 가이드",
        description: "슬림쉐이크와 프로틴드링크 차이를 브랜드 기준으로 봅니다.",
      },
      {
        href: "/guides/product-selection-comparison/protein-shake-top7",
        title: "쉐이크 TOP 7 보기",
        description: "전체 쉐이크 안에서 랩노쉬 위치를 같이 확인합니다.",
      },
    ],
  };

  return map[brand] ?? [];
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

  return {
    title: `${brand} 단백질 제품 모음 | 라인업·대표 제품 비교`,
    description: `${brand} 브랜드 제품을 한 곳에 모았습니다. 라인업 차이, 대표 제품, 비교 가이드까지 함께 보면서 어떤 제품부터 봐야 할지 빠르게 확인해보세요.`,
    alternates: {
      canonical: `https://proteinlab.kr/brands/${slug}`,
    },
    robots: { index: true, follow: true },
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

  return (
    <div className="min-h-screen bg-white">
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
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            {brand.brand} 단백질 제품 모음
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {brand.brand} 브랜드 제품 {brand.total}개를 한 번에 볼 수 있게 정리했습니다. 브랜드명으로 검색해 들어왔다면 라인업 차이와 대표 비교 페이지를 먼저 보고, 그다음 제품 상세를 보는 편이 더 빠릅니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">브랜드 요약</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            카테고리: {brand.categories.map((category) => getCategoryLabel(category as ProductCategory)).join(", ")} / 총 제품 수: {brand.total}개
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            제품 수가 많은 브랜드일수록 라인별 포지션 차이가 큽니다. 제품 목록만 보기보다 라인업 가이드와 대표 비교 페이지를 같이 보면 후보를 더 빨리 좁힐 수 있습니다.
          </p>
        </section>

        {quickLinks.length > 0 ? (
          <section className="mt-6">
            <div className="mb-4 space-y-1">
              <h2 className="text-lg font-bold text-[var(--foreground)]">이 브랜드에서 먼저 보면 좋은 페이지</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                브랜드 검색으로 들어왔다면 제품 목록보다 라인업 차이와 대표 비교 페이지를 먼저 읽는 편이 선택이 더 빠릅니다.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5 transition-colors hover:bg-[var(--accent-light)]"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">{link.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-8">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">제품 목록</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드 안에서 실제로 어떤 제품이 있는지 먼저 훑고, 마음에 드는 후보가 생기면 제품 상세로 바로 넘어가면 됩니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {brand.items.map((product) => (
              <ProductCard
                key={product.slug}
                {...product}
                purchaseLinkCategory="ranking"
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
