import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchPageClient from "./SearchPageClient";

export const metadata: Metadata = {
  title: "제품 검색 | ProteinLab",
  description: "단백질 음료, 바, 요거트, 쉐이크를 브랜드·제품명으로 전체 검색합니다.",
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
