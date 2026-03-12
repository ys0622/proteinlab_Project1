import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CurationLandingTemplate from "../../components/CurationLandingTemplate";
import { getCurationLandingData } from "../../lib/curationLanding";
import { notFound } from "next/navigation";

export const metadata = {
  title: "러닝 후 단백질 제품 추천 | ProteinLab",
  description: "러닝과 마라톤 후 회복에 적합한 단백질 음료와 단백질 바를 ProteinLab 데이터 기준으로 비교합니다.",
};

export default function RunningCurationPage() {
  const data = getCurationLandingData("running");
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CurationLandingTemplate {...data} />
      <Footer />
    </div>
  );
}
