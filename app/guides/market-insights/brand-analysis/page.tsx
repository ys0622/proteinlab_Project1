import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "브랜드 분석 | ProteinLab",
  description: "대표 단백질 브랜드들이 어떤 포지션을 가져가는지 비교합니다.",
};

export default function BrandAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link><span>/</span><Link href="/guides/market-insights">시장 인사이트</Link><span>/</span><span>브랜드 분석</span>
          </div>
          <div className="mt-3"><span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span></div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">브랜드는 어떤 차이로 포지션을 나눌까?</h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <p className="text-sm leading-6 text-[var(--foreground-muted)]">
            Track E 브랜드 분석은 가격대, 대표 SKU, 성분 방향성, 유통 채널 관점에서 브랜드를 읽는 초안 페이지입니다.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
