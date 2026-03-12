import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "브랜드 분석 | ProteinLab",
  description: "주요 단백질 브랜드들이 어떤 소비자 인식을 가지는지 비교합니다.",
};

const brandRows = [
  ["셀렉스", "저당 · 균형형", "대중성, 라인업 다양성"],
  ["더단백", "편의점 접근성", "간편 구매, 일상형 RTD"],
  ["하이뮨", "중장년 타깃", "건강 관리 메시지"],
  ["닥터유", "보충제 · 식사 보완형", "고단백 이미지와 다양한 SKU"],
];

export default function BrandAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights">시장 인사이트</Link>
            <span>/</span>
            <span>브랜드 분석</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            브랜드는 어떤 차이로 선택을 만들까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 단백질 카테고리 안에서도 브랜드는 가격, 유통, 메시지, 대표 제품 구성으로 다른 인식을 만듭니다.
          </p>
        </div>
      </section>
      <main className="guide-article-page guide-article-page--track-e mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">주요 브랜드 포지션</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">브랜드</th>
                  <th className="px-3 py-3 font-semibold">강한 이미지</th>
                  <th className="px-3 py-3 font-semibold">읽어야 할 포인트</th>
                </tr>
              </thead>
              <tbody>
                {brandRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
            같은 단백질 시장 안에서도 브랜드는 소비자 이미지와 SKU 구성으로 서로 다른 포지션을 만듭니다.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
