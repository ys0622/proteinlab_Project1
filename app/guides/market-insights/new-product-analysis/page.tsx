import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "신제품 분석 | ProteinLab",
  description: "단백질 신제품이 나왔을 때 어떤 지점부터 봐야 하는지 기준을 정리합니다.",
};

export default function NewProductAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link><span>/</span><Link href="/guides/market-insights">시장 인사이트</Link><span>/</span><span>신제품 분석</span>
          </div>
          <div className="mt-3"><span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span></div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">신제품이 나왔을 때 무엇부터 봐야 할까?</h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <p className="text-sm leading-6 text-[var(--foreground-muted)]">
            신제품은 단순 출시 소식보다 기존 제품 대비 단백질, 당류, 칼로리, 포지셔닝이 어떻게 달라졌는지 먼저 읽어야 합니다.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
