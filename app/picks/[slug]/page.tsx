import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProductCard from "@/app/components/ProductCard";
import { getAllPickSlugs, getPickBySlug } from "@/app/data/picksConfig";
import { getProductsByCategoryAsync } from "@/app/lib/productData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getListMeta(productType: "drink" | "bar") {
  return productType === "bar"
    ? { href: "/bars", label: "단백질 바" }
    : { href: "/", label: "단백질 음료" };
}

function getPickQuickLinks(slug: string, productType: "drink" | "bar") {
  if (productType === "drink") {
    if (slug === "zero-sugar" || slug === "diet-a" || slug === "light-protein-under-20") {
      return [
        {
          href: "/guides/product-selection-comparison/selex-vs-himune",
          title: "대표 RTD 비교 보기",
          description: "셀렉스와 하이뮨 대표 제품을 바로 비교합니다.",
        },
        {
          href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
          title: "입문용 가이드 보기",
          description: "추천 리스트를 본 뒤 어떤 기준으로 고를지 정리합니다.",
        },
      ];
    }

    if (slug === "high-protein-20" || slug === "high-protein" || slug === "fitness-a") {
      return [
        {
          href: "/guides/product-selection-comparison/high-protein-40g-comparison",
          title: "40g 이상 RTD 비교 보기",
          description: "고단백 RTD를 더 직접적으로 비교합니다.",
        },
        {
          href: "/guides/product-selection-comparison/protein-density-ranking",
          title: "단백질 밀도 순위 보기",
          description: "총량 말고 효율 기준으로도 같이 읽습니다.",
        },
      ];
    }

    return [
      {
        href: "/guides/product-selection-comparison/protein-drink-guide",
        title: "단백질 음료 선택 가이드",
        description: "리스트를 본 뒤 비교 기준을 더 자세히 읽습니다.",
      },
      {
        href: "/recommend",
        title: "맞춤 추천 받기",
        description: "목적과 조건에 따라 다시 좁혀 봅니다.",
      },
    ];
  }

  if (slug === "bar-low-sugar" || slug === "bar-low-calorie") {
    return [
      {
        href: "/guides/product-selection-comparison/diet-protein-bar",
        title: "다이어트 단백질 바 보기",
        description: "저당, 저칼로리 기준으로 더 자세히 확인합니다.",
      },
      {
        href: "/guides/product-selection-comparison/protein-bar-top10",
        title: "단백질 바 TOP 10 보기",
        description: "전체 바 추천 리스트도 같이 봅니다.",
      },
    ];
  }

  return [
    {
      href: "/guides/product-selection-comparison/protein-bar-top10",
      title: "단백질 바 TOP 10 보기",
      description: "큐레이션 뒤에 전체 바 추천 리스트도 함께 확인합니다.",
    },
    {
      href: "/recommend",
      title: "맞춤 추천 받기",
      description: "간식용인지 식사보완용인지 다시 나눠 봅니다.",
    },
  ];
}

export async function generateStaticParams() {
  return getAllPickSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pick = getPickBySlug(slug);

  if (!pick) {
    return {
      title: "큐레이션을 찾을 수 없음 | ProteinLab",
      description: "요청한 조건의 단백질 큐레이션을 찾을 수 없습니다.",
    };
  }

  const title = `${pick.title} | 조건별 단백질 추천`;
  const description = `${pick.description} 조건에 맞는 후보를 빠르게 좁히고, 실제 제품 목록과 제품 상세까지 바로 이어서 확인할 수 있습니다.`;
  const canonical = `https://proteinlab.kr/picks/${pick.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PickDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pick = getPickBySlug(slug);

  if (!pick) {
    notFound();
  }

  const allProducts = await getProductsByCategoryAsync(pick.productType);
  const products = pick.filterProducts(allProducts);
  const listMeta = getListMeta(pick.productType);
  const quickLinks = getPickQuickLinks(pick.slug, pick.productType);
  const introLines = pick.contentData.description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#fcfaf6]">
      <Header />

      <main className="mx-auto max-w-[1180px] px-4 py-6 md:px-6 md:py-10">
        <nav className="mb-4 text-sm text-[#6b7280]">
          <Link href="/" className="hover:text-[var(--accent)]">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href={listMeta.href} className="hover:text-[var(--accent)]">
            {listMeta.label}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#1f2937]">{pick.title}</span>
        </nav>

        <section className="rounded-[28px] border border-[#e9e2d8] bg-white px-5 py-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] md:px-8 md:py-9">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Pick Guide
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#1f2937] md:text-4xl">
              {pick.title}
            </h1>
            <p className="mt-3 text-base leading-7 text-[#475467] md:text-lg">
              {pick.description}
            </p>
            <p className="mt-4 rounded-2xl border border-[#e5efe8] bg-[#f5faf6] px-4 py-3 text-sm leading-6 text-[#355344]">
              저당, 고단백, 가벼운 제품처럼 찾는 조건이 분명하다면 이 큐레이션이 가장 빠릅니다. 아래에서 바로 제품 상세와 구매 링크까지 이어서 볼 수 있습니다.
            </p>
          </div>

          {introLines.length > 0 ? (
            <div className="mt-6 space-y-3 text-sm leading-7 text-[#4b5563] md:text-base">
              {introLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : null}
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-[#ebe5dc] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#1f2937]">이런 경우에 추천</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4b5563]">
              {pick.contentData.recommendations.map((item) => (
                <li key={item} className="rounded-2xl bg-[#faf7f1] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] border border-[#ebe5dc] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#1f2937]">선택 기준</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4b5563]">
              {pick.contentData.criteria.map((item) => (
                <li key={item} className="rounded-2xl bg-[#f5f8fb] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6">
          <div className="grid gap-3 md:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[24px] border border-[#ebe5dc] bg-white p-5 transition-colors hover:bg-[var(--accent-light)]"
              >
                <p className="text-sm font-semibold text-[#1f2937]">{link.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#4b5563]">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Products
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#1f2937]">추천 제품 목록</h2>
            </div>
            <p className="text-sm font-medium text-[#667085]">총 {products.length}개 제품</p>
          </div>

          {products.length === 0 ? (
            <div className="mt-4 rounded-[24px] border border-[#ebe5dc] bg-white px-5 py-10 text-center text-sm text-[#667085]">
              이 큐레이션에 해당하는 제품이 아직 없습니다.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.slug}
                  {...product}
                  purchaseLinkCategory="ranking"
                  fixedTitleLines={2}
                />
              ))}
            </div>
          )}
        </section>

        {pick.contentData.faq.length > 0 ? (
          <section className="mt-8 rounded-[24px] border border-[#ebe5dc] bg-white p-5 md:p-6">
            <h2 className="text-2xl font-semibold text-[#1f2937]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {pick.contentData.faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-[#eef1f4] bg-[#fbfcfd] p-4">
                  <p className="text-base font-semibold text-[#1f2937]">{item.q}</p>
                  <p className="mt-2 text-sm leading-6 text-[#4b5563]">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={listMeta.href}
            className="rounded-full border border-[#d8ddd5] bg-white px-5 py-3 text-sm font-semibold text-[#1f2937] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {listMeta.label} 전체 보기
          </Link>
          <Link
            href="/"
            className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            홈으로
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
