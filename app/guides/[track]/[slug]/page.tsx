import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideSlot, getGuideTrack, getGuideTracks } from "@/app/data/guidesTracks";

export async function generateStaticParams() {
  return getGuideTracks().flatMap((track) =>
    track.slots.map((slot) => ({
      track: track.slug,
      slug: slot.slug,
    })),
  );
}

const roleOverviewBodyRows = [
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  if (track === "protein-basics" && slug === "protein-functions") {
    return {
      title: "단백질 역할 — 근육·면역·호르몬에서 하는 일 | ProteinLab",
      description: "단백질이 근육 성장, 항체 생성, 호르몬 합성에 어떻게 작용하는지 데이터 기반으로 정리했습니다.",
    };
  }
  const trackData = getGuideTrack(track);
  const slot = getGuideSlot(track, slug);
  if (!trackData || !slot) return {};
  return {
    title: `${slot.title} | ProteinLab`,
    description: slot.description,
  };
}

export default async function GuideSlugPage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;

  if (track === "protein-basics" && slug === "protein-functions") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
          <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
              <span>/</span>
              <Link href="/guides/basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
              <span>/</span>
              <span>단백질 역할 개요</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질, 몸에서 어떤 일을 할까?</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 단순히 근육을 키우는 영양소가 아닙니다.<br />
              면역세포를 만들고, 호르몬을 합성하고, 온몸의 조직을 유지하는 데도 단백질이 필요합니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">우리 몸은 단백질로 이루어져 있다</h2>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                아미노산이 결합한 단백질은 근육·피부·혈액·효소·호르몬 등 인체 거의 모든 구성 성분의 원료입니다.<br />
                체내에서는 끊임없이 단백질이 생성되고 분해되며 — 이를 단백질 대사(아미노산 풀)라고 합니다.
              </blockquote>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-5">
                <svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-label="인체 조직별 단백질 비중 차트">
                  {[
                    { label: "골격근", pct: 22.5, color: "#3d8b6e", textColor: "#1b5e42" },
                    { label: "피부·근막", pct: 17.5, color: "#5aab8a", textColor: "#1b5e42" },
                    { label: "뼈·연골", pct: 12.5, color: "#7dc4a8", textColor: "#2d6a54" },
                    { label: "내장", pct: 7.5, color: "#a8d8c4", textColor: "#2d6a54" },
                    { label: "혈액", pct: 6, color: "#ceeade", textColor: "#2d6a54" },
                  ].map((row, i) => {
                    const barW = (row.pct / 25) * 360;
                    const y = i * 32 + 10;
                    return (
                      <g key={row.label}>
                        <text x="0" y={y + 14} fontSize="12" fill="#5c5852" fontFamily="sans-serif">{row.label}</text>
                        <rect x="80" y={y} width={barW} height="22" rx="4" fill={row.color} />
                        <text x={80 + barW + 6} y={y + 14} fontSize="12" fill={row.textColor} fontWeight="600" fontFamily="sans-serif">{row.pct}%</text>
                      </g>
                    );
                  })}
                  <text x="80" y="172" fontSize="10" fill="#9b9791" fontFamily="sans-serif">0%</text>
                  <text x="188" y="172" fontSize="10" fill="#9b9791" fontFamily="sans-serif">10%</text>
                  <text x="296" y="172" fontSize="10" fill="#9b9791" fontFamily="sans-serif">20%</text>
                  <text x="404" y="172" fontSize="10" fill="#9b9791" fontFamily="sans-serif">25%+</text>
                </svg>
              </div>
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
                    {roleOverviewBodyRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015)</p>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">단백질이 하는 3가지 핵심 역할</h2>
              <div className="mt-4 rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-5">
                <svg viewBox="0 0 540 130" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-label="단백질의 3가지 핵심 역할">
                  {/* 근육 카드 */}
                  <rect x="10" y="8" width="160" height="114" rx="12" fill="#e7f3ec" stroke="#c8e6d8" strokeWidth="1"/>
                  <circle cx="90" cy="48" r="24" fill="white" stroke="#3d8b6e" strokeWidth="1.5"/>
                  {/* 덤벨 아이콘 */}
                  <rect x="72" y="45" width="36" height="6" rx="3" fill="#3d8b6e"/>
                  <rect x="66" y="40" width="10" height="16" rx="3" fill="#3d8b6e"/>
                  <rect x="108" y="40" width="10" height="16" rx="3" fill="#3d8b6e"/>
                  <text x="90" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2d6a4f" fontFamily="sans-serif">근육</text>
                  <text x="90" y="103" textAnchor="middle" fontSize="10" fill="#5c8a72" fontFamily="sans-serif">만들고 · 회복 · 유지</text>
                  {/* 면역 카드 */}
                  <rect x="190" y="8" width="160" height="114" rx="12" fill="#eaf0fa" stroke="#c5d8f0" strokeWidth="1"/>
                  <circle cx="270" cy="48" r="24" fill="white" stroke="#4a7fb5" strokeWidth="1.5"/>
                  {/* 방패 아이콘 */}
                  <path d="M270,28 L286,35 L286,50 Q286,62 270,68 Q254,62 254,50 L254,35 Z" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M263,48 L268,53 L278,43" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <text x="270" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2c5f8a" fontFamily="sans-serif">면역</text>
                  <text x="270" y="103" textAnchor="middle" fontSize="10" fill="#4a6f9a" fontFamily="sans-serif">항체 · 면역세포 재료</text>
                  {/* 호르몬 카드 */}
                  <rect x="370" y="8" width="160" height="114" rx="12" fill="#f5ede8" stroke="#e8d0c4" strokeWidth="1"/>
                  <circle cx="450" cy="48" r="24" fill="white" stroke="#8b5e3d" strokeWidth="1.5"/>
                  {/* 분자/기어 아이콘 */}
                  <circle cx="450" cy="48" r="8" fill="none" stroke="#8b5e3d" strokeWidth="2"/>
                  <line x1="450" y1="30" x2="450" y2="36" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="450" y1="60" x2="450" y2="66" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="432" y1="48" x2="438" y2="48" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="462" y1="48" x2="468" y2="48" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="437" y1="35" x2="441" y2="39" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="459" y1="57" x2="463" y2="61" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="463" y1="35" x2="459" y2="39" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="441" y1="57" x2="437" y2="61" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round"/>
                  <text x="450" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6b4020" fontFamily="sans-serif">호르몬·효소</text>
                  <text x="450" y="103" textAnchor="middle" fontSize="10" fill="#8b6040" fontFamily="sans-serif">신호 · 대사 조절</text>
                </svg>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {roleOverviewCards.map((card) => (
                  <article key={card.title} className="flex min-h-[260px] flex-col rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
                    <h3 className="text-lg font-bold leading-7 text-[var(--foreground)]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                    <div className="mt-auto pt-5">
                      <Link href={card.href} className="text-sm font-semibold text-[var(--accent)] hover:underline">{card.cta}</Link>
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
                    {roleOverviewIntakeRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(일반 성인), ISSN Position Stand(운동자)</p>
              <div className="mt-5">
                <Link href="/recommend" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">
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

  const trackData = getGuideTrack(track);
  const slot = getGuideSlot(track, slug);
  if (!trackData || !slot) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href={`/guides/${track}`} className="hover:text-[var(--accent)]">{trackData.title}</Link>
            <span>/</span>
            <span>{slot.title}</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">{trackData.label}</span>
            <span className="text-xs text-[var(--foreground-muted)]">가이드 준비 중</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">{slot.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">{slot.description}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
