import Header from "../components/Header";
import Footer from "../components/Footer";
import RecommendClient from "./RecommendClient";
import { getProductsByCategoryAsync } from "../lib/productData";

export const revalidate = 300; // 5분마다 재생성 — 이게 없으면 완전 정적 페이지로 캐시되어 새 배포 후에도 Cloudflare 엣지 캐시가 갱신되지 않는다

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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "맞춤 추천", item: "https://proteinlab.kr/recommend" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <RecommendClient categoryCounts={categoryCounts} />
      <Footer />
    </div>
  );
}
