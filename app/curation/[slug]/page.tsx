import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CommercialAdSection from "../../components/CommercialAdSection";
import CurationLandingTemplate from "../../components/CurationLandingTemplate";
import { getCurationLandingData } from "../../lib/curationLanding";
import { getAllCurations, type CurationCategory } from "../../lib/curationSystem";
import { getRecentPopularity } from "../../lib/recentPopularity";

interface CurationPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ category?: string }>;
}

const CATEGORIES: CurationCategory[] = ["drink", "bar", "yogurt", "shake"];

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllCurations().map((curation) => ({
    slug: curation.slug,
  }));
}

export async function generateMetadata({ params }: CurationPageProps) {
  const { slug } = await params;
  const data = getCurationLandingData(slug);

  if (!data) {
    const fallbackTitle = "조건별 단백질 제품 큐레이션 — 저당·고단백·다이어트·러닝";
    const fallbackDesc = "저당, 고단백, 다이어트, 러닝 기준으로 단백질 음료·바·요거트·쉐이크를 바로 비교해보세요.";
    return {
      title: fallbackTitle,
      description: fallbackDesc,
      alternates: { canonical: "https://proteinlab.kr/curation" },
      openGraph: { images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }], title: fallbackTitle, description: fallbackDesc, url: "https://proteinlab.kr/curation", type: "website" as const, locale: "ko_KR", siteName: "ProteinLab" },
      twitter: { images: ["https://proteinlab.kr/opengraph-image"], card: "summary" as const, title: fallbackTitle, description: fallbackDesc },
    };
  }

  const rawTitle = data.curation.seoTitle ?? `${data.curation.label} 단백질 제품 추천·비교`;
  const title = rawTitle.replace(/\s*\|\s*ProteinLab\s*$/i, "");
  const description =
    data.curation.seoDescription ??
    data.curation.heroDescription ??
    "조건에 맞는 단백질 제품을 바로 비교해보세요.";
  const url = `https://proteinlab.kr/curation/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }], title, description, url, type: "website" as const, locale: "ko_KR", siteName: "ProteinLab" },
    twitter: { images: ["https://proteinlab.kr/opengraph-image"], card: "summary" as const, title, description },
  };
}

export default async function CurationPage({ params, searchParams }: CurationPageProps) {
  const { slug } = await params;
  const requested = (await searchParams)?.category;
  const focusCategory = CATEGORIES.find((category) => category === requested);
  // 인기 큐레이션은 실제 조회수로 순위를 매기므로 조회수 스냅샷을 함께 넘긴다.
  const popularity = slug === "popular" ? await getRecentPopularity() : null;
  const data = getCurationLandingData(slug, popularity?.views);
  if (!data) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "큐레이션", item: "https://proteinlab.kr/curation" },
      { "@type": "ListItem", position: 3, name: data.curation.label, item: `https://proteinlab.kr/curation/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <CurationLandingTemplate {...data} focusCategory={focusCategory} />
      <div className="mx-auto max-w-[1200px] px-4 pb-8 md:px-6">
        <CommercialAdSection pageType="feed" />
      </div>
      <Footer />
    </div>
  );
}
