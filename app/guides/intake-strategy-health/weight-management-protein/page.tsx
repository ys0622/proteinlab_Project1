import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "다이어트 단백질 가이드 | 체중 관리 때 먼저 볼 기준";
const _pageDesc = "다이어트와 체중 관리에서 단백질 제품을 어떻게 골라야 하는지 정리했습니다. 당류, 칼로리, 포만감, 단백질 밀도를 함께 보는 실전 기준입니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/weight-management-protein" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/weight-management-protein",
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

const goalRows = [
  ["감량 초반", "저당 + 적정 단백질", "칼로리와 당류를 먼저 보고 포만감이 유지되는지 확인하는 쪽이 중요합니다."],
  ["유지 단계", "지속 가능한 균형", "숫자만 예쁜 제품보다 실제로 오래 갈 수 있는 맛과 포만감이 더 중요해집니다."],
  ["운동 병행", "회복까지 고려", "감량 중에도 회복이 부족하면 운동 효율과 컨디션이 같이 무너질 수 있습니다."],
];

const compareCards = [
  {
    title: "당류 먼저 보기",
    body: "체중 관리 목적이라면 단백질 총량만큼 당류가 중요합니다. 같은 20g 제품이라도 당류 차이가 꽤 크게 작동합니다.",
  },
  {
    title: "칼로리와 포만감 같이 보기",
    body: "칼로리가 너무 낮으면 허기가 빨리 오고, 너무 높으면 식사대용 쪽에 가까워집니다. 목적에 맞는 균형이 핵심입니다.",
  },
  {
    title: "단백질 밀도 확인하기",
    body: "같은 칼로리 안에서 단백질 비중이 얼마나 되는지 보면 감량용 후보를 더 빠르게 걸러낼 수 있습니다.",
  },
];

const avoidList = [
  "체중 관리라고 무조건 저칼로리 제품만 고르는 경우",
  "단백질 양만 보고 당류를 확인하지 않는 경우",
  "보충용 제품과 식사대용 제품을 같은 기준으로 비교하는 경우",
];

const decisionSteps = [
  {
    title: "1단계: 감량기인지 유지기인지 구분",
    body: "감량기에는 당류와 칼로리 기준이 더 빡빡해야 하고, 유지기에는 포만감과 지속 가능성이 더 중요해집니다.",
  },
  {
    title: "2단계: 보충용인지 식사대용인지 구분",
    body: "가벼운 RTD와 식사보완형 제품을 같은 기준으로 보면 판단이 틀어집니다. 먼저 역할부터 나눠야 비교가 쉬워집니다.",
  },
  {
    title: "3단계: 마지막에 맛과 가격 확인",
    body: "체중 관리는 한 번 잘 고르는 것보다 계속 유지하는 게 핵심입니다. 숫자 다음은 맛과 반복 가능성입니다.",
  },
];

const weightLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-for-diabetes",
    title: "당류 기준 제품 보기",
    body: "체중 관리에서 당류를 먼저 걸러내고 싶다면 저당 기준으로 정리한 이 비교 페이지가 바로 이어집니다.",
  },
  {
    href: "/guides/product-selection-comparison/diet-protein-shake",
    title: "다이어트 쉐이크 보기",
    body: "포만감까지 같이 챙겨야 한다면 RTD보다 쉐이크가 더 잘 맞을 수 있어서 이 페이지로 이어지는 흐름이 자연스럽습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-by-content",
    title: "함량대별 제품 보기",
    body: "20g, 30g, 40g대 중 지금 체중 관리 단계에 맞는 구간부터 먼저 좁히고 싶다면 이 페이지가 더 빠릅니다.",
  },
];

export default function WeightManagementProteinPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/weight-management-protein' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>다이어트 단백질 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            체중 관리는 단백질만이 아니라
            <br />
            당류와 칼로리까지 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            감량기에 좋은 기준은 조금 다릅니다. 단백질이 높아도 당류와 칼로리가 목적에 맞지 않으면 실제 결과는 달라지고, 그래서 제품 비교 페이지와 같이 봐야 기준이 더 또렷해집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">목표별로 보는 기준</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 기준</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {goalRows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">제품에서 먼저 확인할 것</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {compareCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중 관리용 선택 순서</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionSteps.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중 관리용으로 볼 때 흔한 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {avoidList.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 관련 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {weightLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
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
