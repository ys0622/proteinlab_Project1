import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "성분 트렌드 | ProteinLab",
  description: "고단백, 저당, 락토프리, 식물성 등 단백질 제품의 성분 트렌드를 정리합니다.",
};

export default function IngredientTrendsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link><span>/</span><Link href="/guides/market-insights">시장 인사이트</Link><span>/</span><span>성분 트렌드</span>
          </div>
          <div className="mt-3"><span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span></div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">요즘 단백질 제품은 어떤 성분 키워드로 나뉠까?</h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>저당과 고단백은 기본 필수 키워드가 됐습니다.</li>
            <li>워터형과 락토프리는 가벼움과 부담 감소를 중심으로 성장했습니다.</li>
            <li>식물성은 선호도와 라이프스타일 관점에서 꾸준히 확장되고 있습니다.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
