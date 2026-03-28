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
    return {
      title: "조건별 단백질 제품 큐레이션 | ProteinLab",
      description: "저당, 고단백, 다이어트, 러닝 기준으로 단백질 음료·바·요거트·쉐이크를 바로 비교해보세요.",
      alternates: {
        canonical: "/curation",
      },
    };
  }

  return {
    title: data.curation.seoTitle ?? `${data.curation.label} 추천·비교 | ProteinLab`,
    description:
      data.curation.seoDescription ??
      data.curation.heroDescription ??
      "ProteinLab 큐레이션 페이지",
    alternates: {
      canonical: `/curation/${slug}`,
    },
  };
}

export default async function CurationPage({ params }: CurationPageProps) {
  const { slug } = await params;
  const data = getCurationLandingData(slug);
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CurationLandingTemplate {...data} />
      <Footer />
    </div>
  );
}
