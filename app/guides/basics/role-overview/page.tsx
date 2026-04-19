import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "단백질은 몸에서 어떤 역할을 할까";
const _pageDesc = "단백질이 근육, 면역, 호르몬과 효소, 조직 회복에 어떻게 관여하는지 기본 구조부터 정리합니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/basics/role-overview" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/basics/role-overview",
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

const bodyCompositionRows = [
  ["골격근", "약 20~25%", "액틴, 미오신"],
  ["피부·결합조직", "약 15~20%", "콜라겐, 엘라스틴"],
  ["뼈와 연골", "약 10~15%", "콜라겐 구조 단백질"],
  ["내장기관", "약 5~10%", "효소, 운반 단백질"],
  ["혈액", "약 5% 내외", "헤모글로빈, 알부민"],
];

const intakeRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["중강도 이상 운동", "1.2~1.6 g/kg", "72~96g", "84~112g", "96~128g"],
  ["고강도 운동", "1.6~2.0 g/kg", "96~120g", "112~140g", "128~160g"],
];

const roleCards = [
  {
    title: "근육을 만들고 회복시키는 재료",
    body: "운동 후 단백질이 아미노산으로 분해되면 류신 같은 필수 아미노산이 근육 합성 신호를 자극합니다. 손상된 근섬유를 회복하고 다음 훈련을 준비하는 핵심 재료입니다.",
    href: "/guides/basics/muscle",
    cta: "근육 가이드 보기",
  },
  {
    title: "면역세포와 항체를 만드는 재료",
    body: "항체, 사이토카인 같은 면역 관련 물질도 단백질을 바탕으로 만들어집니다. 단백질 섭취가 부족하면 방어와 회복 속도 모두 영향을 받을 수 있습니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "면역 가이드 보기",
  },
  {
    title: "호르몬과 효소를 움직이게 하는 기반",
    body: "인슐린, 성장호르몬, 각종 소화 효소는 모두 단백질 구조를 기반으로 작동합니다. 그래서 단백질 부족은 근육 문제를 넘어 전신 조절에도 영향을 줍니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "호르몬·효소 보기",
  },
];

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

function BodyRoleGraphic() {
  const items = [
    { label: "근육", note: "움직임과 회복을 담당하는 가장 대표적인 저장처" },
    { label: "면역", note: "항체와 방어 시스템을 구성하는 재료" },
    { label: "효소·호르몬", note: "소화와 대사, 신호 전달에 핵심" },
    { label: "피부·결합조직", note: "콜라겐과 구조 단백질로 조직을 지지" },
  ];

  return (
    <div
      className="mt-4 rounded-2xl border border-[#dce8df] bg-white p-4 md:p-5"
      role="img"
      aria-label="인체 조직별 단백질 사용 비중과 역할을 요약한 인포그래픽"
    >
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#e7efe9] bg-[#f6fbf7] p-4">
            <p className="text-base font-semibold text-[#24543d]">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreeRolesGraphic() {
  const items = [
    {
      title: "합성",
      body: "근육과 조직을 만들고 유지하는 기본 재료",
    },
    {
      title: "조절",
      body: "효소와 호르몬 구조를 만들어 대사를 움직임",
    },
    {
      title: "회복",
      body: "손상된 조직과 면역 반응 뒤 회복 속도를 뒷받침",
    },
  ];

  return (
    <div
      className="mt-4 rounded-2xl border border-[#dce8df] bg-white p-4 md:p-5"
      role="img"
      aria-label="단백질의 주요 역할 3가지를 요약한 인포그래픽"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-[#e7efe9] bg-[#f6fbf7] p-4">
            <p className="text-sm font-semibold tracking-[0.08em] text-[#6d8b76]">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RoleOverviewGuidePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/basics/role-overview' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/basics" className="hover:text-[var(--accent)]">
              단백질 기초
            </Link>
            <span>/</span>
            <span>단백질의 역할 개요</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질은 몸에서 어떤 일을 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 단순히 근육만을 위한 영양소가 아닙니다.
            <br />
            면역세포를 만들고, 호르몬과 효소를 구성하고, 손상된 조직을 회복시키는 역할까지 넓게
            관여합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              우리 몸은 생각보다 많은 영역에서 단백질을 씁니다
            </h2>
            <div className="mt-4">
              <Callout>
                단백질은 근육뿐 아니라 혈액, 효소, 호르몬, 면역 체계에도 필요합니다.
                <br />
                체내에서는 계속 분해와 합성이 반복되기 때문에 매일 일정량을 공급해야 합니다.
              </Callout>
            </div>
            <BodyRoleGraphic />
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">조직</th>
                    <th className="px-3 py-3 font-semibold">체성분 내 비중</th>
                    <th className="px-3 py-3 font-semibold">대표 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyCompositionRows.map((row) => (
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
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: 대한영양사협회, 보건복지부 식품구성자전거
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질이 하는 대표적 3가지 역할</h2>
            <ThreeRolesGraphic />
            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {roleCards.map((card) => (
                <article
                  key={card.title}
                  className="flex min-h-[260px] flex-col rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5"
                >
                  <h3 className="text-lg font-bold leading-7 text-[var(--foreground)]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                  <div className="mt-auto pt-5">
                    <Link
                      href={card.href}
                      className="text-sm font-semibold text-[var(--accent)] hover:underline"
                    >
                      {card.cta}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루에 얼마나 먹어야 할까?</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">활동 수준</th>
                    <th className="px-3 py-3 font-semibold">권장량</th>
                    <th className="px-3 py-3 font-semibold">60kg</th>
                    <th className="px-3 py-3 font-semibold">70kg</th>
                    <th className="px-3 py-3 font-semibold">80kg</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeRows.map((row) => (
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
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: WHO, 대한영양사협회, ISSN Position Stand
            </p>
            <div className="mt-5">
              <Link
                href="/guides/basics/daily-requirement"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                내 권장량 계산하기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
