import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";
import Header from "@/app/components/Header";
import { getGuideSlot, getGuideTrack, getGuideTracks } from "@/app/data/guidesTracks";

export async function generateStaticParams() {
  return getGuideTracks().flatMap((track) =>
    track.slots.map((slot) => ({
      track: track.slug,
      slug: slot.slug,
    })),
  );
}

/* ─── 데이터 ─────────────────────────────────────────────── */

const bodyCompositionRows = [
  ["골격근", "약 20–25%", "액틴, 미오신 (수축·이완)"],
  ["피부·결합조직", "약 15–20%", "콜라겐, 엘라스틴"],
  ["뼈·연골", "약 10–15%", "콜라겐 Ⅰ형 (구조 지지)"],
  ["내장·장기", "약 5–10%", "효소, 알부민"],
  ["혈액", "약 5–7%", "헤모글로빈, 글로불린"],
];

const intakeRows = [
  ["일반 성인", "0.8 g/kg", "48 g", "56 g", "64 g"],
  ["중등도 운동", "1.2–1.6 g/kg", "72–96 g", "84–112 g", "96–128 g"],
  ["고강도·근성장", "1.6–2.0 g/kg", "96–120 g", "112–140 g", "128–160 g"],
];

const muscleTimingRows = [
  ["운동 직후 30–45분", "20–40 g", "근손실 방지·회복 극대화"],
  ["취침 전", "20–30 g", "야간 근합성 촉진 (카제인 권장)"],
  ["일반 식사 분산", "20–30 g/회", "하루 총량 균등 배분"],
];

const muscleIntakeRows = [
  ["일반 성인", "0.8 g/kg", "48 g", "56 g", "64 g"],
  ["중등도 운동", "1.2–1.6 g/kg", "72–96 g", "84–112 g", "96–128 g"],
  ["고강도·근성장", "1.6–2.0 g/kg", "96–120 g", "112–140 g", "128–160 g"],
];

const immunityRows = [
  ["단백질 호르몬", "인슐린, 성장호르몬, 글루카곤", "혈당 조절, 성장 촉진, 대사 조절"],
  ["소화효소", "트립신, 펩신, 아밀라아제", "단백질·탄수화물·지방 소화"],
  ["면역단백질", "항체(IgG), 사이토카인, 인터페론", "병원체 무력화, 면역 신호 전달"],
];

const dailyRequirementRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["다이어트 중", "1.2–1.6 g/kg", "72–96g", "84–112g", "96–128g"],
  ["중등도 운동", "1.2–1.6 g/kg", "72–96g", "84–112g", "96–128g"],
  ["고강도·근성장", "1.6–2.0 g/kg", "96–120g", "112–140g", "128–160g"],
  ["노년기(65세+)", "1.0–1.2 g/kg", "60–72g", "70–84g", "80–96g"],
];

const deficiencyRows = [
  ["근육 감소·무력감", "근섬유 합성 감소, 근단백질 분해 가속"],
  ["피로·집중력 저하", "신경전달물질(도파민·세로토닌) 합성 부족"],
  ["상처·조직 회복 지연", "콜라겐 재생 속도 저하"],
  ["면역력 저하", "항체·면역세포 생성 감소로 감염 취약"],
  ["모발·손톱 변화", "케라틴 공급 부족으로 탈모·손톱 약화"],
  ["부종(浮腫)", "알부민 감소 → 혈장 삼투압 저하 → 수분 누출"],
];

/* ─── 공통 컴포넌트 ──────────────────────────────────────── */

function TrackABreadcrumb({ current }: { current: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
      <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
      <span>/</span>
      <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
      <span>/</span>
      <span>{current}</span>
    </div>
  );
}

function TrackALabel() {
  return (
    <div className="mt-3">
      <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
        TRACK A
      </span>
    </div>
  );
}

function HeroSection({ breadcrumb, h1, lead }: { breadcrumb: string; h1: string; lead: React.ReactNode }) {
  return (
    <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
      <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
        <TrackABreadcrumb current={breadcrumb} />
        <TrackALabel />
        <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">{h1}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">{lead}</p>
      </div>
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
            {headers.map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
              {row.map((cell, i) => (
                <td key={i} className="px-3 py-3 text-sm text-[var(--foreground-muted)]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{title}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
    </article>
  );
}

function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
    >
      {children}
    </Link>
  );
}

/* ─── SVG 인포그래픽 ─────────────────────────────────────── */

function BarChartSvg() {
  const rows = [
    { label: "골격근", pct: 22.5, color: "#3d8b6e" },
    { label: "피부·결합조직", pct: 17.5, color: "#5aab8a" },
    { label: "뼈·연골", pct: 12.5, color: "#7dc4a8" },
    { label: "내장·장기", pct: 7.5, color: "#a8d8c4" },
    { label: "혈액", pct: 6, color: "#ceeade" },
  ];
  return (
    <div className="mt-4 rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-4">
      <svg viewBox="0 0 520 112" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px]" aria-label="인체 조직별 단백질 비중">
        {rows.map((row, i) => {
          const barW = (row.pct / 25) * 340;
          const y = i * 19 + 6;
          return (
            <g key={row.label}>
              <text x="0" y={y + 9} fontSize="11" fill="#5c5852" fontFamily="sans-serif">{row.label}</text>
              <rect x="96" y={y - 4} width={barW} height="14" rx="4" fill={row.color} />
              <text x={96 + barW + 6} y={y + 9} fontSize="11" fill="#2d6a4f" fontWeight="600" fontFamily="sans-serif">{row.pct}%</text>
            </g>
          );
        })}
        <text x="96" y="108" fontSize="9" fill="#9b9791" fontFamily="sans-serif">0%</text>
        <text x="230" y="108" fontSize="9" fill="#9b9791" fontFamily="sans-serif">15%</text>
        <text x="368" y="108" fontSize="9" fill="#9b9791" fontFamily="sans-serif">25%+</text>
      </svg>
    </div>
  );
}

function RoleIconSvg() {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-3">
      <svg viewBox="0 0 540 90" xmlns="http://www.w3.org/2000/svg" className="w-full min-w-[320px] max-w-[540px]" aria-label="단백질의 3가지 역할">
        {/* 근육 */}
        <rect x="10" y="4" width="160" height="82" rx="12" fill="#e7f3ec" stroke="#c8e6d8" strokeWidth="1" />
        <circle cx="90" cy="30" r="16" fill="white" stroke="#3d8b6e" strokeWidth="1.5" />
        <rect x="78" y="28" width="24" height="4" rx="2" fill="#3d8b6e" />
        <rect x="74" y="24" width="7" height="12" rx="2" fill="#3d8b6e" />
        <rect x="101" y="24" width="7" height="12" rx="2" fill="#3d8b6e" />
        <text x="90" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2d6a4f" fontFamily="sans-serif">근육</text>
        <text x="90" y="70" textAnchor="middle" fontSize="10" fill="#5c8a72" fontFamily="sans-serif">생성 · 회복 · 유지</text>
        {/* 면역 */}
        <rect x="190" y="4" width="160" height="82" rx="12" fill="#eaf0fa" stroke="#c5d8f0" strokeWidth="1" />
        <circle cx="270" cy="30" r="16" fill="white" stroke="#4a7fb5" strokeWidth="1.5" />
        <path d="M270,18 L281,22 L281,31 Q281,40 270,44 Q259,40 259,31 L259,22 Z" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinejoin="round" />
        <path d="M265,30 L268,33 L276,25" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="270" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2c5f8a" fontFamily="sans-serif">면역</text>
        <text x="270" y="70" textAnchor="middle" fontSize="10" fill="#4a6f9a" fontFamily="sans-serif">항체 · 면역세포 재료</text>
        {/* 호르몬·효소 */}
        <rect x="370" y="4" width="160" height="82" rx="12" fill="#f5ede8" stroke="#e8d0c4" strokeWidth="1" />
        <circle cx="450" cy="30" r="16" fill="white" stroke="#8b5e3d" strokeWidth="1.5" />
        <circle cx="450" cy="30" r="5" fill="none" stroke="#8b5e3d" strokeWidth="2" />
        <line x1="450" y1="19" x2="450" y2="23" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <line x1="450" y1="37" x2="450" y2="41" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <line x1="439" y1="30" x2="443" y2="30" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <line x1="457" y1="30" x2="461" y2="30" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <line x1="442" y1="22" x2="445" y2="25" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <line x1="455" y1="35" x2="458" y2="38" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <line x1="458" y1="22" x2="455" y2="25" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <line x1="445" y1="35" x2="442" y2="38" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
        <text x="450" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6b4020" fontFamily="sans-serif">호르몬·효소</text>
        <text x="450" y="70" textAnchor="middle" fontSize="10" fill="#8b6040" fontFamily="sans-serif">신호 · 대사 조절</text>
      </svg>
    </div>
  );
}

/* ─── Metadata ───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;

  if (track === "protein-basics" && slug === "protein-functions") {
    return {
      title: "단백질, 몸에서 어떤 일을 할까? | ProteinLab",
      description: "근육, 면역, 호르몬까지 — 단백질이 몸에서 하는 핵심 역할을 데이터 기반으로 정리했습니다.",
    };
  }
  if (track === "basics" && slug === "muscle") {
    return {
      title: "근육 성장에 단백질이 필요한 이유 | ProteinLab",
      description: "근단백질 합성(MPS), mTOR 신호경로, 섭취 타이밍까지 — 운동과 단백질의 관계를 정리했습니다.",
    };
  }
  if (track === "basics" && slug === "immunity-hormone") {
    return {
      title: "단백질과 면역·호르몬·효소 | ProteinLab",
      description: "항체, 사이토카인, 인슐린, 소화효소 — 단백질이 몸의 조절 시스템에 미치는 영향을 정리했습니다.",
    };
  }
  if (track === "basics" && slug === "daily-requirement") {
    return {
      title: "나는 단백질이 얼마나 필요할까? 목적별 권장량 | ProteinLab",
      description: "일반 성인부터 운동자, 다이어트, 노년기까지 — 목적별 하루 단백질 권장량을 체중 기준으로 정리했습니다.",
    };
  }
  if (track === "basics" && slug === "deficiency-symptoms") {
    return {
      title: "단백질이 부족하면 몸에 어떤 신호가 올까? | ProteinLab",
      description: "근육 감소, 피로, 면역 저하, 부종까지 — 단백질 결핍 시 나타나는 신호를 정리했습니다.",
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

/* ─── 페이지 ─────────────────────────────────────────────── */

export default async function GuideSlugPage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;

  /* ── protein-basics / protein-functions ── */
  if (track === "protein-basics" && slug === "protein-functions") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection
          breadcrumb="단백질의 역할"
          h1="단백질, 몸에서 어떤 일을 할까?"
          lead={<>단백질 하면 보통 근육을 떠올리지만, 사실 그게 전부가 아닙니다.<br />피부, 혈액, 면역세포, 호르몬까지 — 우리 몸의 거의 모든 것이 단백질로 만들어집니다.<br />어디서부터 이해해야 할지 모르겠다면, 여기서 시작하세요.</>}
        />
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">

            {/* 섹션 1: 몸 구성 */}
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">우리 몸은 단백질로 이루어져 있다</h2>
              <Callout>
                우리 몸은 매일 단백질을 분해하고 다시 만들고 있습니다.<br />
                근육이 줄고, 피부가 거칠어지고, 자주 피곤한 이유 — 단백질 공급이 부족할 때 나타나는 신호일 수 있습니다.
              </Callout>
              <BarChartSvg />
              <DataTable
                headers={["조직", "체중 대비 단백질 비중", "대표 단백질"]}
                rows={bodyCompositionRows}
              />
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015)</p>
            </section>

            {/* 섹션 2: 3가지 역할 */}
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">단백질이 하는 3가지 핵심 역할</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질의 역할은 크게 세 가지로 나눌 수 있습니다. 근육 회복, 면역 유지, 호르몬·효소 생성입니다.
              </p>
              <RoleIconSvg />
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "근육 — 만들고, 회복하고, 유지한다",
                    body: "운동 후 단백질을 먹어야 하는 이유가 여기 있습니다. 아미노산(특히 류신)이 근섬유 합성 신호를 켜고, 손상된 근육을 회복시킵니다. 운동하는 사람은 체중 1kg당 1.4–2.0g이 기준입니다.",
                    href: "/guides/basics/muscle",
                    cta: "근육과 단백질 자세히 보기 →",
                  },
                  {
                    title: "면역 — 항체와 면역세포의 재료",
                    body: "감기에 자주 걸리거나 회복이 느리다면 단백질 부족을 의심해볼 수 있습니다. 항체와 면역세포 자체가 단백질로 만들어지기 때문입니다.",
                    href: "/guides/basics/immunity-hormone",
                    cta: "면역·호르몬과 단백질 자세히 보기 →",
                  },
                  {
                    title: "호르몬·효소 — 몸의 신호와 대사 조절",
                    body: "혈당을 조절하는 인슐린, 성장을 돕는 성장호르몬, 음식을 소화하는 효소까지 — 모두 단백질입니다. 단백질이 부족하면 이 시스템 전체가 느려집니다.",
                    href: "/guides/basics/immunity-hormone",
                    cta: "면역·호르몬과 단백질 자세히 보기 →",
                  },
                ].map((card) => (
                  <article key={card.title} className="flex min-h-[200px] flex-col rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
                    <h3 className="text-base font-bold leading-6 text-[var(--foreground)]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                    <div className="mt-auto pt-5">
                      <Link href={card.href} className="text-sm font-semibold text-[var(--accent)] hover:underline">{card.cta}</Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 섹션 3: 섭취량 */}
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">그래서 나는 하루에 얼마나 먹어야 할까?</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                활동량과 체중에 따라 필요한 단백질 양이 달라집니다. 운동 강도가 높을수록 더 많은 단백질이 필요합니다.
              </p>
              <DataTable
                headers={["활동 수준", "권장량", "60 kg", "70 kg", "80 kg"]}
                rows={intakeRows}
              />
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(일반 성인), ISSN Position Stand(운동인)</p>
              <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
                권장량을 알았다면 다음 단계는 내 목적에 맞는 제품을 고르는 것입니다.
                단백질 함량, 당류, 유형까지 한 번에 비교할 수 있습니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton href="/recommend">내 목적에 맞는 단백질 음료 찾기 →</CtaButton>
                <CtaButton href="/guides/basics/deficiency-symptoms">단백질 부족 신호 확인하기 →</CtaButton>
              </div>
            </section>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ── basics / muscle ── */
  if (track === "basics" && slug === "muscle") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection
          breadcrumb="근육과 단백질"
          h1="근육 성장에 단백질이 필요한 이유"
          lead={<>운동만으로는 근육이 완성되지 않습니다.<br />단백질이 있어야 손상된 근섬유가 회복되고 새로운 근육 합성이 시작됩니다.</>}
        />
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">

            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">근단백질 합성(MPS)이란?</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                운동 자극으로 근섬유에 미세 손상이 생기면, 단백질로부터 분해된 아미노산 — 특히 <strong>류신(Leucine)</strong>이 근육 내 <strong>mTOR 신호경로</strong>를 활성화합니다.
                이 신호가 새로운 근섬유 단백질 합성을 촉진하며, 이 과정이 반복되면서 근육이 성장합니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="근육과 단백질" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoCard label="섭취 기준" title="1회 20–40 g" body="이 구간에서 근합성 자극이 크게 올라갑니다. 40g 이상부터는 추가 효과가 제한적입니다." />
                <InfoCard label="핵심 성분" title="류신 등 필수아미노산" body="단백질 총량뿐 아니라 필수아미노산(EAA) 구성이 근합성 효율에 영향을 줍니다." />
              </div>
              <Callout>
                단백질 20–40 g 섭취 시 근합성 자극이 극대화되며, 운동 후 골든 타임(30–45분)에 섭취하면 효과가 높습니다.
              </Callout>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: ISSN Position Stand (2017), Phillips & Van Loon (2011)</p>
            </section>

            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">언제 먹어야 효과적일까? — 섭취 타이밍</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                하루 총섭취량이 충분하더라도, 섭취 타이밍에 따라 근합성 효율이 달라집니다.
              </p>
              <DataTable
                headers={["타이밍", "권장량", "근거"]}
                rows={muscleTimingRows}
              />
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: ISSN Position Stand (2017)</p>
            </section>

            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">하루 단백질 권장 섭취량</h2>
              <DataTable
                headers={["활동 수준", "권장량", "60 kg", "70 kg", "80 kg"]}
                rows={muscleIntakeRows}
              />
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(2015), ISSN Position Stand(운동인)</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton href="/picks/high-protein-20">고단백 20g+ 제품 바로 보기 →</CtaButton>
                <CtaButton href="/recommend">내 목적에 맞는 제품 찾기 →</CtaButton>
              </div>
            </section>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ── basics / immunity-hormone ── */
  if (track === "basics" && slug === "immunity-hormone") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection
          breadcrumb="면역·호르몬과 단백질"
          h1="단백질은 면역과 호르몬에도 쓰입니다"
          lead={<>단백질은 근육만의 재료가 아닙니다.<br />항체, 사이토카인, 인슐린, 소화효소까지 몸의 조절 시스템 전반과 연결됩니다.</>}
        />
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">

            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">면역 단백질 — 항체와 면역세포의 재료</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                항체(면역글로불린), 사이토카인, 인터페론은 모두 단백질로 이루어져 있습니다. 단백질이 부족하면 면역세포 생성이 감소하고, 감염에 취약해지며 회복 속도도 느려집니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="면역과 단백질" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoCard label="면역 단백질" title="항체·사이토카인" body="병원체를 무력화하고 면역 신호를 전달하는 물질 모두 단백질이 재료입니다." />
                <InfoCard label="회복기 기준" title="1.5–2.0 g/kg" body="수술 후 회복기나 중환자의 경우 일반 성인보다 더 높은 섭취 기준이 적용됩니다." />
              </div>
              <Callout>
                단백질 결핍 → 면역세포 감소 → 감염률 증가 → 회복 지연
              </Callout>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: Munteanu & Schwartz (2022), Frontiers in Nutrition</p>
            </section>

            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">호르몬과 효소도 단백질입니다</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                인슐린, 성장호르몬, 글루카곤은 아미노산 사슬로 이루어진 단백질 호르몬입니다. 소화효소(트립신·펩신)도 단백질이라, 단백질이 부족하면 혈당 조절·성장·소화 기능에 영향이 생길 수 있습니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="호르몬과 효소" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <DataTable
                headers={["종류", "대표 예시", "주요 기능"]}
                rows={immunityRows}
              />
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015)</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton href="/guides/protein-basics/protein-functions">단백질 역할 전체 보기 →</CtaButton>
                <CtaButton href="/recommend">내 목적에 맞는 단백질 음료 찾기 →</CtaButton>
              </div>
            </section>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ── basics / deficiency-symptoms ── */
  if (track === "basics" && slug === "daily-requirement") {
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
              <span>하루 권장량</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">나는 단백질이 얼마나 필요할까?</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 권장량은 나이, 체중, 활동 수준에 따라 달라집니다.<br />
              내 상황에 맞는 기준을 확인해보세요.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">목적별 하루 권장 섭취량</h2>
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
                    {dailyRequirementRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="whitespace-nowrap px-3 py-3 text-sm text-[var(--foreground-muted)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(2015), ISSN Position Stand</p>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 섭취, 이것만 기억하세요</h2>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                한 끼에 20–30g씩 나눠 먹는 것이 한 번에 몰아 먹는 것보다 흡수에 유리합니다.
              </blockquote>
              <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">단백질은 한 번에 흡수할 수 있는 양이 제한적입니다. 아침·점심·저녁에 고르게 분산하고, 운동 후 30–45분 이내에 보충하면 효율이 높아집니다.</p>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: ISSN Position Stand</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/guides/basics/deficiency-symptoms" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">단백질 부족 신호 확인하기 →</Link>
                <Link href="/recommend" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">내 목적에 맞는 단백질 음료 찾기 →</Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (track === "basics" && slug === "deficiency-symptoms") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection
          breadcrumb="단백질 부족 신호"
          h1="단백질이 부족하면 몸에 어떤 신호가 올까?"
          lead={<>단백질 부족은 서서히 나타납니다.<br />피로, 근육 감소, 면역 저하가 겹치기 전에 신호를 먼저 확인해보세요.</>}
        />
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">

            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">대표 신호 6가지</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 부족은 한 가지 증상으로 끝나지 않습니다. 몸 상태와 생활 패턴이 함께 흔들리는 경우가 많습니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="단백질 부족 신호" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <InfoCard label="신체 신호" title="근육 감소·무력감" body="근섬유 합성이 줄고 근단백질 분해가 빨라져 힘이 빠지는 느낌이 납니다." />
                <InfoCard label="생활 신호" title="피로·집중력 저하" body="도파민·세로토닌 합성에도 아미노산이 필요해 정신적 에너지가 감소합니다." />
                <InfoCard label="건강 신호" title="면역 저하·회복 지연" body="항체·면역세포 생성이 줄어 감염에 취약해지고 회복이 느려집니다." />
              </div>
              <DataTable
                headers={["증상", "원인"]}
                rows={deficiencyRows}
              />
            </section>

            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">나는 단백질이 부족할까?</h2>
              <Callout>
                하루 단백질 섭취량이 체중(kg) × 0.8 g 이하라면 결핍 위험 구간입니다.
              </Callout>
              <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
                식단에서 육류·생선·달걀·두부·유제품 비중이 낮거나, 다이어트로 칼로리를 과하게 제한하는 경우 단백질 부족 신호가 더 쉽게 나타납니다.
              </p>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015)</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton href="/guides/basics/daily-requirement">하루 단백질 권장량 계산하기 →</CtaButton>
                <CtaButton href="/recommend">단백질 음료로 보충하기 →</CtaButton>
              </div>
            </section>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ── 기본 플레이스홀더 ── */
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
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: trackData.accentBg, color: trackData.accentColor }}
            >
              {trackData.label}
            </span>
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
