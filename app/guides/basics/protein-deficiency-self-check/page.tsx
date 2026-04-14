import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "단백질 부족 자가체크";
const _pageDesc = "단백질이 부족할 때 자주 보이는 신호를 간단히 체크하고, 부족 가능성이 높을 때 무엇부터 봐야 하는지 정리합니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/basics/protein-deficiency-self-check" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/basics/protein-deficiency-self-check",
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

const checks = [
  "아침이나 점심을 자주 대충 넘기고 단백질 반찬을 잘 못 챙긴다.",
  "자주 피곤하고, 운동 후 회복이 전보다 느리게 느껴진다.",
  "체중 감량 중인데 배고픔이 심하고 근력 유지가 어렵다.",
  "부모님이나 본인이 나이가 들수록 식사량이 줄어 단백질 섭취가 불안하다.",
];

const nextSteps = [
  { href: "/guides/basics/daily-requirement", title: "권장량 먼저 계산하기", body: "부족 여부가 헷갈리면 먼저 내 체중 기준 권장량부터 확인하는 편이 가장 정확합니다." },
  { href: "/guides/product-selection-comparison/protein-drink-beginners-guide", title: "입문용 제품 바로 보기", body: "식사에서 부족한 단백질을 간단히 보완하고 싶다면 이 페이지부터 보는 편이 가장 쉽습니다." },
  { href: "/guides/product-selection-comparison/protein-drink-for-50s", title: "50대 보완 제품 보기", body: "중장년·부모님용 보완이 목적이면 이쪽 비교가 더 직접적입니다." },
];

const cautionNotes = [
  "이 페이지는 생활 패턴 점검용이지 의학적 진단 기준은 아닙니다.",
  "피로, 부종, 회복 저하가 오래 지속되면 다른 원인도 함께 확인해야 합니다.",
  "체중 감량 중이라면 단백질 부족과 총칼로리 부족이 같이 오는 경우가 많습니다.",
];

const scoreGuide = [
  ["0~1개", "부족 가능성 낮음", "지금은 식사 패턴을 크게 바꿀 단계는 아닐 수 있습니다. 다만 끼니를 자주 거르면 다시 점검할 가치가 있습니다."],
  ["2개", "생활 패턴 점검 권장", "권장량과 식사 구성을 같이 보면 부족한 부분이 꽤 선명해지는 경우가 많습니다."],
  ["3개 이상", "보완 전략까지 바로 보기", "식사만으로 채우기 어려운 패턴일 수 있어서 음료·쉐이크 같은 반복 가능한 보완 방식을 같이 보는 편이 빠릅니다."],
];

export default function ProteinDeficiencySelfCheckPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/basics/protein-deficiency-self-check' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
            <span>/</span>
            <span>자가체크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 부족은 갑자기 오기보다
            <br />
            생활 패턴에서 먼저 드러나는 경우가 많습니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            아래 항목에 여러 개가 해당되면 식사 구성과 단백질 보완 방법을 같이 점검하는 편이 좋습니다.
            이 페이지는 병원 진단이 아니라 생활 기준에서 빠르게 확인하는 용도입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">빠르게 체크해보기</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {checks.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#ece9e2] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#4c7a57]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">몇 개 이상이면 부족 가능성을 의심할까</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">해당 개수</th>
                    <th className="px-3 py-3 font-semibold">판단</th>
                    <th className="px-3 py-3 font-semibold">다음 행동</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreGuide.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">2개 이상 해당되면 무엇부터 보면 되나</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["1. 권장량 확인", "내 체중 기준 하루 총량이 어느 정도인지 먼저 알아야 부족 여부가 선명해집니다."],
                ["2. 식사 패턴 점검", "고기, 계란, 유제품, 콩류가 실제로 하루에 얼마나 들어가는지 생각해봐야 합니다."],
                ["3. 보완 방식 선택", "식사만으로 채우기 어렵다면 음료나 쉐이크처럼 반복 가능한 방식이 필요합니다."],
              ].map((item) => (
                <article key={item[0]} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item[1]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">헷갈리기 쉬운 점</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {cautionNotes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#ece9e2] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#4c7a57]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 이어서 보면 좋은 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {nextSteps.map((item) => (
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
