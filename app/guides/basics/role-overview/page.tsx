import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 역할  근육면역호르몬에서 하는 일 | ProteinLab",
  description: "단백질이 근육 성장, 항체 생성, 호르몬 합성에 어떻게 작용하는지 데이터 기반으로 정리했습니다.",
};

const bodyCompositionRows = [
  ["골격근", "약 2025%", "액틴, 미오신"],
  ["피부근막", "약 1520%", "콜라겐, 엘라스틴"],
  ["뼈연골", "약 1015%", "콜라겐(Ⅰ형)"],
  ["내장(간심장)", "약 510%", "효소류, 알부민"],
  ["혈액", "약 57%", "알부민, 글로불린"],
];

const intakeRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["중등도 운동", "1.21.6 g/kg", "7296g", "84112g", "96128g"],
  ["고강도근성장", "1.62.0 g/kg", "96120g", "112140g", "128160g"],
];

const roleCards = [
  {
    title: "근육  만들고, 회복하고, 유지한다",
    body: "운동 후 단백질에서 분해된 아미노산(특히 류신)이 근육 내 mTOR 신호경로를 활성화해 근섬유 합성을 촉진합니다. 운동하는 사람은 하루 체중 1kg당 1.42.0g 섭취가 권장됩니다.",
    href: "/guides/basics/muscle",
    cta: "근육과 단백질 더 자세히 보기 ",
  },
  {
    title: "면역  항체와 면역세포의 재료",
    body: "항체(면역글로불린), 사이토카인, 인터페론은 모두 단백질입니다. 단백질이 부족하면 면역세포 수가 줄고 감염에 취약해집니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "면역호르몬과 단백질 더 자세히 보기 ",
  },
  {
    title: "호르몬효소  몸의 신호와 대사를 조절",
    body: "인슐린, 성장호르몬, 글루카곤은 모두 단백질 호르몬입니다. 트립신펩신 같은 소화효소도 단백질입니다. 단백질 공급이 부족하면 이들의 합성이 감소합니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "면역호르몬과 단백질 더 자세히 보기 ",
  },
];

function ImageSlot() {
  return <div className="mt-4 h-56 rounded-2xl border border-[#d8d4cd] bg-[#efede8]" aria-hidden="true" />;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function RoleOverviewGuidePage() {
  return (
    <div className="min-h-screen bg-white">
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
            <span>단백질 역할 개요</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질, 몸에서 어떤 일을 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 단순히 근육을 키우는 영양소가 아닙니다.
            <br />
            면역세포를 만들고, 호르몬을 합성하고, 온몸의 조직을 유지하는 데도 단백질이 필요합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">우리 몸은 단백질로 이루어져 있다</h2>

            <div className="mt-4">
              <Callout>
                아미노산이 결합한 단백질은 근육피부혈액효소호르몬 등 인체 거의 모든 구성 성분의 원료입니다.
                <br />
                체내에서는 끊임없이 단백질이 생성되고 분해되며  이를 단백질 대사(아미노산 풀)라고 합니다.
              </Callout>
            </div>

            <ImageSlot />

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">조직</th>
                    <th className="px-3 py-3 font-semibold">체중 대비 단백질 비중</th>
                    <th className="px-3 py-3 font-semibold">대표 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyCompositionRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: 한국영양학회보건복지부 「한국인 영양소 섭취기준」(2015)
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질이 하는 3가지 핵심 역할</h2>

            <ImageSlot />

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {roleCards.map((card) => (
                <article
                  key={card.title}
                  className="flex min-h-[260px] flex-col rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5"
                >
                  <h3 className="text-lg font-bold leading-7 text-[var(--foreground)]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                  <div className="mt-auto pt-5">
                    <Link href={card.href} className="text-sm font-semibold text-[var(--accent)] hover:underline">
                      {card.cta}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">나는 하루에 얼마나 먹어야 할까?</h2>

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
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: WHO한국영양학회(일반 성인), ISSN Position Stand(운동자)
            </p>

            <div className="mt-5">
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                내 목적에 맞는 단백질 음료 찾기 
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
