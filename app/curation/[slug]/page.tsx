import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CurationLandingTemplate from "../../components/CurationLandingTemplate";
import { getCurationLandingData } from "../../lib/curationLanding";
import { notFound } from "next/navigation";

interface CurationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CurationPageProps) {
  const { slug } = await params;
  const data = getCurationLandingData(slug);

  if (!data) {
    return {
      title: "큐레이션 | ProteinLab",
      description: "ProteinLab 큐레이션 페이지",
    };
  }

  return {
    title: data.curation.seoTitle ?? `${data.curation.label} 큐레이션 | ProteinLab`,
    description: data.curation.seoDescription ?? data.curation.heroDescription ?? "ProteinLab 큐레이션 페이지",
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
