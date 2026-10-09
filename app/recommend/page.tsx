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
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: "단백질 제품 맞춤 추천 — 목적별·조건별로 바로 좁히기",
    description:
      "저당·고단백·식사대용 등 내 조건에 맞는 단백질 음료, 바, 요거트, 쉐이크를 빠르게 추려드립니다. 목적만 선택하면 바로 제품 목록이 나옵니다.",
    url: "https://proteinlab.kr/recommend",
    type: "website",
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
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

  const faqItems = [
    {
      question: "목적을 여러 개 고르면 어떻게 되나요?",
      answer: "선택한 조건을 모두 만족하는 제품만 추립니다. 조건이 너무 많으면 결과가 0개가 될 수 있어서, 가장 중요한 조건 1~2개로 먼저 좁힌 뒤 나머지는 결과 목록에서 직접 비교하는 것을 권합니다.",
    },
    {
      question: "음료·바·요거트·쉐이크 중 뭘 골라야 할지 모르겠어요.",
      answer: "휴대성과 간편함이 중요하면 음료나 바가, 포만감이 더 필요하면 쉐이크나 요거트가 잘 맞습니다. 목적을 먼저 고르면 카테고리는 자동으로 좁혀집니다.",
    },
    {
      question: "추천 결과는 어떤 기준으로 정렬되나요?",
      answer: "선택한 조건(저당, 고단백, 식사대용 등)에 맞는 제품을 먼저 보여주고, 그 안에서는 단백질 밀도와 실제 인기도를 함께 반영해 정렬합니다.",
    },
  ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <RecommendClient categoryCounts={categoryCounts} />
      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] p-5 md:p-6">
          <h2 className="text-lg font-bold text-[#16412D]">어떻게 추천하나요</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>• 저당·고단백·식사대용 같은 목적을 고르면, 그 조건에 맞는 제품만 걸러서 보여줍니다.</li>
            <li>• 음료·바·요거트·쉐이크를 한 번에 비교하므로, 카테고리를 미리 정하지 않아도 됩니다.</li>
            <li>• 결과가 너무 많으면 조건을 하나 더 추가하고, 너무 적으면 하나를 빼서 다시 확인하세요.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e8e6e3] bg-[#FAF8F3] p-5 md:p-6">
          <h2 className="text-lg font-bold text-[#16412D]">💬 자주 묻는 질문</h2>
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-xl border border-[#e8e6e3] bg-white p-4">
                <p className="text-sm font-semibold text-[var(--foreground)]">Q. {item.question}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
