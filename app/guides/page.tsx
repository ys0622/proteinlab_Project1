import Header from "../components/Header";
import Footer from "../components/Footer";
import CommercialAdSection from "../components/CommercialAdSection";
import { getAdminGuidesStaticRuntimeData } from "@/app/lib/adminGuidesStaticRuntime";
import GuideDirectory from "./GuideDirectory";

export const revalidate = 3600;
const title = "단백질 가이드 모음 | 음료·쉐이크·바·요거트 비교·추천";
const description = "단백질 제품 선택부터 섭취법, 성분 이해까지. 궁금한 내용을 검색하고 나에게 필요한 가이드를 찾아보세요.";
export const metadata = {
  title, description,
  alternates: { canonical: "https://proteinlab.kr/guides" },
  openGraph: { title, description, url: "https://proteinlab.kr/guides", type: "website", locale: "ko_KR", siteName: "ProteinLab", images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }] },
  twitter: { card: "summary", title, description, images: ["https://proteinlab.kr/opengraph-image"] },
};

export default async function GuidesPage() {
  const cms = await getAdminGuidesStaticRuntimeData();
  const seen = new Set<string>();
  const sections = cms.sections.map((section) => ({
    id: section.id, title: section.title, href: section.previewHref,
    articles: section.articles.filter((article) => {
      if (article.status !== "live" || seen.has(article.href)) return false;
      seen.add(article.href);
      return true;
    }).map(({ href, title, description, tags }) => ({ href, title, description, tags })),
  }));
  return (
    <div className="min-h-screen bg-[#fffdf8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" }, { "@type": "ListItem", position: 2, name: "가이드", item: "https://proteinlab.kr/guides" }] }) }} />
      <Header />
      <main className="mx-auto max-w-[1040px] px-4 pb-10 pt-5 md:px-6 md:pt-8">
        <header className="mb-5">
          <p className="mb-1 text-xs font-semibold text-[#52695b]">단백질 가이드</p>
          <h1 className="text-[22px] font-bold leading-snug tracking-tight text-[#16412D] md:text-3xl">궁금한 것부터 찾아보세요</h1>
          <p className="mt-2 text-sm leading-6 text-[#59665f]">제품 고르기부터 섭취법까지, 내게 필요한 기준을 쉽게.</p>
        </header>
        <GuideDirectory sections={sections} />
        <CommercialAdSection pageType="guide" className="mt-8" title="광고" />
      </main>
      <Footer />
    </div>
  );
}
