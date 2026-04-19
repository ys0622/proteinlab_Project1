import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const _pageTitle = "출근길에 먹기 좋은 단백질 제품";
const _pageDesc = "출근길이나 이동 중에 먹기 좋은 단백질 음료, 바, 쉐이크를 상황별로 고르는 기준을 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/fitness-lifestyle/commute-protein-guide" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/fitness-lifestyle/commute-protein-guide",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const rows = [
  ["지하철·차 안", "RTD 음료", "흘리거나 먹는 과정이 적어 이동 중에 가장 무난합니다."],
  ["회사 도착 직후", "파우치형 쉐이크", "아침 대용으로 포만감을 더 챙기기 좋습니다."],
  ["회의 전 10분 간식용", "단백질 바", "가장 조용하고 빠르게 먹기 좋습니다."],
];

const links = [
  { href: "/guides/product-selection-comparison/protein-category-guide", title: "카테고리 먼저 고르기", body: "음료, 쉐이크, 바 중 무엇이 맞는지 먼저 좁히기 좋습니다." },
  { href: "/guides/product-selection-comparison/morning-protein-shake", title: "아침대용 쉐이크", body: "출근길 아침 대체 목적이라면 이 페이지가 더 직접적입니다." },
  { href: "/guides/product-selection-comparison/convenience-protein-bar", title: "편의점 단백질 바", body: "바로 사서 출근길에 먹을 수 있는 제품이 필요하다면 이 비교가 이어집니다." },
];

const mistakes = [
  "출근길인데 포만감만 보고 너무 무거운 제품부터 고르는 경우",
  "회사에서 먹기 불편한 제품을 골라 결국 반복하지 못하는 경우",
  "아침 대용과 간식 보완을 같은 기준으로 고르는 경우",
];

export default function CommuteProteinGuidePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/fitness-lifestyle/commute-protein-guide' });
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>출근길 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            출근길 단백질 제품은
            <br />
            단백질보다 먹는 방식이 먼저 맞아야 오래 갑니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            아침을 자주 놓치거나, 회사에서 허기가 빨리 오는 사람에게 단백질 제품은 꽤 실용적입니다. 다만 지하철, 차 안, 회사 도착 직후처럼 먹는 환경이 다르면 맞는 제품군도 달라집니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별로 보면 더 쉬워집니다</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">더 맞는 제품</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">출근길용 제품 고를 때 보는 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["휴대성", "새지 않고 가방에 넣기 쉬운지 먼저 확인해야 합니다."],
                ["소리와 먹는 시간", "회사나 대중교통에서는 조용하고 빠르게 먹을 수 있어야 합니다."],
                ["포만감 지속", "점심 전까지 버틸 건지, 가볍게 보완만 할 건지에 따라 제품군이 갈립니다."],
              ].map((item) => (
                <article key={item[0]} className="rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item[1]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">출근길에서 자주 실패하는 이유</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {mistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#ece9e2] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#8a4b2f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 바로 이어서 비교할 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {links.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
