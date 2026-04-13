import Header from "../components/Header";
import Footer from "../components/Footer";
import RecommendClient from "./RecommendClient";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "단백질 제품 맞춤 추천 — 목적별·조건별로 바로 좁히기",
  description:
    "저당·고단백·식사대용 등 내 조건에 맞는 단백질 음료, 바, 요거트, 쉐이크를 빠르게 추려드립니다. 목적만 선택하면 바로 제품 목록이 나옵니다.",
  alternates: {
    canonical: "https://proteinlab.kr/recommend",
  },
  openGraph: {
    title: "단백질 제품 맞춤 추천 — 목적별·조건별로 바로 좁히기",
    description:
      "저당·고단백·식사대용 등 내 조건에 맞는 단백질 음료, 바, 요거트, 쉐이크를 빠르게 추려드립니다. 목적만 선택하면 바로 제품 목록이 나옵니다.",
    url: "https://proteinlab.kr/recommend",
    type: "website",
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary",
    title: "단백질 제품 맞춤 추천 — 목적별·조건별로 바로 좁히기",
    description:
      "저당·고단백·식사대용 등 내 조건에 맞는 단백질 음료, 바, 요거트, 쉐이크를 빠르게 추려드립니다. 목적만 선택하면 바로 제품 목록이 나옵니다.",
  },
};

export default async function RecommendPage() {
  const [drinks, bars, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  const categoryCounts = {
    drink: drinks.length,
    bar: bars.length,
    yogurt: yogurts.length,
    shake: shakes.length,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RecommendClient categoryCounts={categoryCounts} />
      <Footer />
    </div>
  );
}
