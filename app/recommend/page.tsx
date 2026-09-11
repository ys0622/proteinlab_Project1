import Header from "../components/Header";
import Footer from "../components/Footer";
import RecommendClient from "./RecommendClient";
import { getProductsByCategoryAsync } from "../lib/productData";

// ProductListWithFilters가 useSearchParams()를 쓰기 때문에, 정적/ISR로 렌더링하면
// Next.js가 그 부분을 Suspense fallback(null)으로 대체해버려 실제 제품 카드가
// 정적 HTML에 전혀 포함되지 않는다(구글 첫 크롤링에서 상품 목록이 통째로 비어 보임).
// force-dynamic으로 매 요청마다 실제 렌더링해서 완전한 HTML을 내려준다.
export const dynamic = "force-dynamic";

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
