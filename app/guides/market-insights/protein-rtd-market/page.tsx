import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 RTD 시장 | ProteinLab",
  description: "단백질 RTD 시장의 구조와 브랜드 경쟁 포인트를 정리했습니다.",
};

export default function ProteinRTDMarketPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link><span>/</span><Link href="/guides/market-insights">시장 인사이트</Link><span>/</span><span>단백질 RTD 시장</span>
          </div>
          <div className="mt-3"><span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span></div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">RTD 단백질 시장은 왜 빠르게 커졌을까?</h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>운동 직후 바로 마실 수 있는 편의성이 핵심 성장 요인입니다.</li>
            <li>편의점 유통과 브랜드 확장이 소비자 진입 장벽을 크게 낮췄습니다.</li>
            <li>현재는 워터형, 저당, 고단백, 식물성처럼 목적별 세분화가 진행 중입니다.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
