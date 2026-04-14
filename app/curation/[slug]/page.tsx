import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CurationLandingTemplate from "../../components/CurationLandingTemplate";
import { getCurationLandingData } from "../../lib/curationLanding";

interface CurationPageProps {
  params: Promise<{ slug: string }>;
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
      openGraph: { title: fallbackTitle, description: fallbackDesc, url: "https://proteinlab.kr/curation", type: "website" as const, locale: "ko_KR", siteName: "ProteinLab" },
      twitter: { card: "summary" as const, title: fallbackTitle, description: fallbackDesc },
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
    openGraph: { title, description, url, type: "website" as const, locale: "ko_KR", siteName: "ProteinLab" },
    twitter: { card: "summary" as const, title, description },
  };
}

export default async function CurationPage({ params }: CurationPageProps) {
  const { slug } = await params;
  const data = getCurationLandingData(slug);
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
      <CurationLandingTemplate {...data} />
      <Footer />
    </div>
  );
}
