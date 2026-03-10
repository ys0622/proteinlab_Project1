import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideSlot, getGuideTrack, getGuideTracks } from "@/app/data/guidesTracks";

const roleOverviewBodyCompositionRows = [
  ["골격근", "약 20–25%", "액틴, 미오신"],
  ["피부·근막", "약 15–20%", "콜라겐, 엘라스틴"],
  ["뼈·연골", "약 10–15%", "콜라겐(Ⅰ형)"],
  ["내장(간·심장)", "약 5–10%", "효소류, 알부민"],
  ["혈액", "약 5–7%", "알부민, 글로불린"],
];

const roleOverviewIntakeRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["중등도 운동", "1.2–1.6 g/kg", "72–96g", "84–112g", "96–128g"],
  ["고강도·근성장", "1.6–2.0 g/kg", "96–120g", "112–140g", "128–160g"],
];

const roleOverviewCards = [
  {
    title: "근육 — 만들고, 회복하고, 유지한다",
    body: "운동 후 단백질에서 분해된 아미노산(특히 류신)이 근육 내 mTOR 신호경로를 활성화해 근섬유 합성을 촉진합니다. 운동하는 사람은 하루 체중 1kg당 1.4–2.0g 섭취가 권장됩니다.",
    href: "/guides/basics/muscle",
    cta: "근육과 단백질 더 자세히 보기 →",
  },
  {
    title: "면역 — 항체와 면역세포의 재료",
    body: "항체(면역글로불린), 사이토카인, 인터페론은 모두 단백질입니다. 단백질이 부족하면 면역세포 수가 줄고 감염에 취약해집니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "면역·호르몬과 단백질 더 자세히 보기 →",
  },
  {
    title: "호르몬·효소 — 몸의 신호와 대사를 조절",
    body: "인슐린, 성장호르몬, 글루카곤은 모두 단백질 호르몬입니다. 트립신·펩신 같은 소화효소도 단백질입니다. 단백질 공급이 부족하면 이들의 합성이 감소합니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "면역·호르몬과 단백질 더 자세히 보기 →",
  },
];

function RoleOverviewImageSlot() {
  return (
    <div
      className="mt-4 h-56 rounded-2xl border border-[#d8d4cd] bg-[#efede8]"
      aria-hidden="true"
    />
  );
}

function RoleOverviewCallout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

function RoleOverviewPage() {
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              우리 몸은 단백질로 이루어져 있다
            </h2>
            <div className="mt-4">
              <RoleOverviewCallout>
                아미노산이 결합한 단백질은 근육·피부·혈액·효소·호르몬 등 인체 거의 모든 구성 성분의 원료입니다.
                <br />
                체내에서는 끊임없이 단백질이 생성되고 분해되며 — 이를 단백질 대사(아미노산 풀)라고 합니다.
              </RoleOverviewCallout>
            </div>
            <RoleOverviewImageSlot />
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
                  {roleOverviewBodyCompositionRows.map((row) => (
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
              출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015)
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              단백질이 하는 3가지 핵심 역할
            </h2>
            <RoleOverviewImageSlot />
            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {roleOverviewCards.map((card) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              나는 하루에 얼마나 먹어야 할까?
            </h2>
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
                  {roleOverviewIntakeRows.map((row) => (
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
              출처: WHO·한국영양학회(일반 성인), ISSN Position Stand(운동자)
            </p>
            <div className="mt-5">
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                내 목적에 맞는 단백질 음료 찾기 →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return getGuideTracks().flatMap((track) =>
    track.slots.map((slot) => ({
      track: track.slug,
      slug: slot.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  const trackData = getGuideTrack(track);
  const slot = getGuideSlot(track, slug);

  if (!trackData || !slot) return {};

  if (track === "basics" && slug === "role-overview") {
    return {
      title: "단백질 역할 — 근육·면역·호르몬에서 하는 일 | ProteinLab",
      description:
        "단백질이 근육 성장, 항체 생성, 호르몬 합성에 어떻게 작용하는지 데이터 기반으로 정리했습니다.",
    };
  }

  return {
    title: `${slot.title} | ${trackData.title} | ProteinLab`,
    description: slot.description,
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  const trackData = getGuideTrack(track);
  const slot = getGuideSlot(track, slug);

  if (!trackData || !slot) notFound();

  if (track === "basics" && slug === "role-overview") {
    return <RoleOverviewPage />;
  }

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
              Guides
            </Link>
            <span>/</span>
            <Link href={`/guides/${trackData.slug}`} className="hover:text-[var(--accent)]">
              {trackData.title}
            </Link>
            <span>/</span>
            <span>{slot.title}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: trackData.accentBg, color: trackData.accentColor }}
            >
              {trackData.label}
            </span>
            <span className="text-xs text-[#8b8b8b]">가이드 준비 중</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {slot.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            {slot.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)]">
          <article className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <section>
              <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">요약</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                이 페이지는 향후 구체적인 콘텐츠를 작성하기 위한 구조입니다. 현재는 제목, 설명,
                검색 의도, 내부 링크 방향까지 먼저 정리해 둔 상태입니다.
              </p>
            </section>

            <section className="mt-6">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">
                향후 콘텐츠 작성 영역
              </p>
              <div className="mt-2 rounded-xl border border-dashed border-[#d9d4cd] bg-white px-4 py-4">
                <p className="text-sm font-semibold text-[var(--foreground)]">{slot.searchIntent}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  {slot.futureFocus.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-6">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">
                내부 링크 확장 구조
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {slot.internalLinkTargets.map((linkItem) => (
                  <Link
                    key={linkItem.href}
                    href={linkItem.href}
                    className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-4 transition-colors hover:border-[var(--accent)]"
                  >
                    <p className="text-sm font-semibold text-[var(--foreground)]">{linkItem.label}</p>
                    <p className="mt-1 text-xs text-[var(--foreground-muted)]">{linkItem.href}</p>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">이 페이지의 역할</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>개별 SEO 콘텐츠로 확장 가능한 주제 구조</li>
              <li>트랙 허브와 제품 탐색 페이지를 연결하는 중간 노드</li>
              <li>향후 비교 콘텐츠와 추천 리스트로 확장 가능한 기준 페이지</li>
            </ul>

            <div className="mt-5 rounded-xl border border-[#eef1f3] bg-[#fafbfc] px-4 py-4">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#6f7a84]">TRACK</p>
              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{trackData.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                {trackData.hubSummary}
              </p>
              <Link
                href={`/guides/${trackData.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]"
              >
                트랙으로 돌아가기
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
