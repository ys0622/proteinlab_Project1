import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchPageClient from "./SearchPageClient";

export const metadata: Metadata = {
  title: "단백질 제품 검색 | 브랜드명·제품명으로 바로 찾기",
  description:
    "셀렉스, 하이뮨, 랩노쉬, 테이크핏 같은 브랜드명과 제품명으로 검색해 제품 상세, 비교, 추천 페이지로 바로 이동해보세요.",
};

interface SearchPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const q = typeof params.q === "string" ? params.q : "";

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <SearchPageClient initialQuery={q} />
      </main>
      <Footer />
    </div>
  );
}
