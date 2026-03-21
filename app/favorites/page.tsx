import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "즐겨찾기 | ProteinLab",
  description: "즐겨찾기한 단백질 제품 목록을 한눈에 확인하세요.",
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <FavoritesClient />
      </main>
      <Footer />
    </div>
  );
}
