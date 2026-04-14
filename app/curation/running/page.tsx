import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CurationLandingTemplate from "../../components/CurationLandingTemplate";
import { getCurationLandingData } from "../../lib/curationLanding";
import { notFound } from "next/navigation";

const _pageTitle = "러닝 후 단백질 제품 추천 — 회복에 맞는 음료·바 비교";
const _pageDesc = "러닝과 마라톤 후 회복에 적합한 단백질 음료와 단백질 바를 성분 데이터 기준으로 비교합니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/curation/running" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/curation/running",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

export default function RunningCurationPage() {
  const data = getCurationLandingData("running");
  if (!data) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "큐레이션", item: "https://proteinlab.kr/curation" },
      { "@type": "ListItem", position: 3, name: "러닝", item: "https://proteinlab.kr/curation/running" },
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
