import Header from "../components/Header";
import Footer from "../components/Footer";
import RelatedLinkCards from "../components/RelatedLinkCards";
import { getAllSearchTopics } from "../data/searchTopics";

export const metadata = {
  title: "단백질 검색 주제 모음 | ProteinLab",
  description:
    "저당 단백질 음료, 식사대용 쉐이크, 고단백 바, 편의점 단백질 제품 같은 검색형 주제를 한곳에 모았습니다.",
};

export default function TopicsPage() {
  const links = getAllSearchTopics().map((topic) => ({
    href: `/topics/${topic.slug}`,
    title: topic.title,
    description: topic.description,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            단백질 검색 주제 모음
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            검색 의도가 분명한 주제별 랜딩을 한곳에 모았습니다. 저당, 고단백, 식사대용,
            러닝, 편의점 같은 키워드로 바로 이동할 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <RelatedLinkCards
          title="주제별 바로가기"
          description="검색에서 많이 찾는 조건형 페이지입니다."
          links={links}
          className="mt-0"
        />
      </main>

      <Footer />
    </div>
  );
}
