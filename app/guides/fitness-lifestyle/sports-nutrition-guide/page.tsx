import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "운동 목적별 단백질 제품 선택 기준 | 벌크업·다이어트·회복";
const _pageDesc = "벌크업, 체중 관리, 회복 중심 운동까지 목적에 맞는 단백질 제품을 고르는 기준을 단백질 함량, 당류, 칼로리 중심으로 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/fitness-lifestyle/sports-nutrition-guide" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/fitness-lifestyle/sports-nutrition-guide",
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

const productRows = [
  ["게이너·밀쉐이크형", "복합형(단백질+탄수화물)", "30~45g", "중간", "높음", "200~350kcal", "벌크업·체중 증가"],
  ["고단백 RTD", "순수 단백질 중심", "20~30g", "낮음", "중간", "100~180kcal", "운동 후 회복"],
  ["저당 RTD", "저당 제품 중심", "20~25g", "낮음", "낮음", "90~140kcal", "다이어트, 체중 관리"],
  ["식물성 RTD", "대두·식물성 단백질", "15~25g", "중간", "낮음", "100~170kcal", "식물성 선호, 소화 부담"],
  ["프로틴 요거트형", "발효유형 단백질 강화", "10~20g", "중간", "중간", "90~160kcal", "가벼운 간식, 아침 보완"],
];

const flowCards = [
  {
    title: "회복이 우선이라면",
    body: "운동 직후 빠르게 마실 수 있는 제품이 필요하다면 단백질 함량 20g 이상, 당류는 낮고 소화 부담이 적은 RTD부터 보는 편이 현실적입니다.",
    product: "예시: 고단백 RTD",
  },
  {
    title: "체중 관리가 우선이라면",
    body: "칼로리와 당류를 먼저 보고 단백질 밀도까지 확인해야 합니다. 같은 20g 제품이라도 총열량과 당류가 다르면 결과가 달라집니다.",
    product: "예시: 저당 RTD",
  },
  {
    title: "벌크업이 우선이라면",
    body: "단백질 g만 보는 것이 아니라 탄수화물 보강, 총칼로리, 운동 직후 섭취 편의성까지 같이 봐야 실제 체중 증가 루틴과 맞습니다.",
    product: "예시: 게이너·밀쉐이크형",
  },
];

export default function SportsNutritionGuidePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/fitness-lifestyle/sports-nutrition-guide' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />

      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>운동 목적별 제품 선택</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 목적에 따라 단백질 제품도 달라집니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단순히 단백질 g만 높다고 좋은 제품은 아닙니다.
            <br />
            운동 목적, 회복 속도, 소화 부담, 총칼로리와 당류를 함께 봐야 실제 루틴에 맞는 제품을 고를 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">SELECTION FLOW</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">목적부터 정하면 제품 선택이 쉬워집니다</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">제품 선택 흐름</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {flowCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]"
                >
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                  <p className="mt-3 inline-flex rounded-full bg-[#eff7f1] px-3 py-1 text-[11px] font-semibold text-[#2d6a4f]">
                    {card.product}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 목적별 제품군 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 종류, 단백질 g 수치, 소화 부담, 총칼로리를 같이 보면 어떤 상황에서 어떤 제품군이 유리한지 구분하기 쉬워집니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품군</th>
                    <th className="px-3 py-3 font-semibold">구성 특징</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">당류 부담</th>
                    <th className="px-3 py-3 font-semibold">소화 부담</th>
                    <th className="px-3 py-3 font-semibold">열량</th>
                    <th className="px-3 py-3 font-semibold">추천 상황</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">실전 선택 팁</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
                <p className="text-sm font-semibold text-[#24543d]">운동 후 회복이 우선이라면</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  20g 이상 단백질을 빠르게 보충할 수 있는 RTD가 가장 무난합니다. 당류가 너무 높지 않고 마시기 쉬운 구성을 먼저 보세요.
                </p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
                <p className="text-sm font-semibold text-[#24543d]">체중 관리가 우선이라면</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  저당, 저칼로리, 단백질 밀도를 같이 보세요. 같은 20g이라도 총열량과 당류 차이가 크면 결과도 달라집니다.
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/curation/running" className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">러닝 큐레이션 보기</Link>
              <Link href="/" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">제품 비교 바로 가기</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
