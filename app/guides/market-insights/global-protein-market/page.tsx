import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "글로벌 단백질 시장 | ProteinLab",
  description: "해외 단백질 시장 흐름을 통해 국내 제품과 브랜드를 더 넓게 해석합니다.",
};

export default function GlobalProteinMarketPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link><span>/</span><Link href="/guides/market-insights">시장 인사이트</Link><span>/</span><span>글로벌 단백질 시장</span>
          </div>
          <div className="mt-3"><span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span></div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">글로벌 단백질 시장은 국내와 어떻게 다를까?</h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <p className="text-sm leading-6 text-[var(--foreground-muted)]">
            해외 시장에서는 스포츠 보충제, 식사대용, 식물성, 기능성 스낵이 더 세밀하게 나뉩니다. 이 흐름은 국내 제품 기획에도 계속 영향을 줍니다.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
