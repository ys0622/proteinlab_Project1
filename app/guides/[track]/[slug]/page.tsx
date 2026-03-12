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

const roleOverviewBodyRows = [
  ["골격근", "약 20~25%", "움직임, 대사, 체온 유지"],
  ["피부·결합조직", "약 15~20%", "콜라겐, 엘라스틴"],
  ["근막·연골", "약 10~15%", "콜라겐(구조 단백질)"],
  ["내장(간·장기)", "약 5~10%", "효소를 포함한 조직"],
  ["혈액", "약 5%+", "운반 단백질, 글로불린"],
];

const roleOverviewIntakeRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["중등도 운동", "1.2~1.6 g/kg", "72~96g", "84~112g", "96~128g"],
  ["고강도·근성장", "1.6~2.0 g/kg", "96~120g", "112~140g", "128~160g"],
];

const muscleTimingRows = [
  ["운동 후 30–45분", "20–40g", "근손실 방지·회복 극대화"],
  ["취침 전", "20–30g", "야간 근합성 촉진 (카제인 추천)"],
  ["일반 식사", "20–30g씩 분산", "하루 총량 균등 분배"],
];

const muscleIntakeRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["중등도 운동", "1.2–1.6 g/kg", "72–96g", "84–112g", "96–128g"],
  ["고강도·근성장", "1.6–2.0 g/kg", "96–120g", "112–140g", "128–160g"],
];

const immunityProteinRows = [
  ["단백질 호르몬", "인슐린, 성장호르몬, 글루카곤", "혈당 조절, 성장, 대사 조절"],
  ["소화효소", "트립신, 펩신", "단백질·음식물 소화"],
  ["면역단백질", "항체, 사이토카인", "병원체 무력화, 면역 신호 전달"],
];

const deficiencySymptomRows = [
  ["근육 감소·무력감", "근섬유 합성 감소, 근단백질 분해 증가"],
  ["피로·집중력 저하", "신경전달물질(도파민·세로토닌) 합성 감소"],
  ["상처 회복 지연", "콜라겐·조직 재생 속도 저하"],
  ["면역력 저하", "항체·면역세포 생성 감소"],
  ["모발·손톱 변화", "케라틴 공급 부족으로 탈모·손톱 약화"],
  ["부종(浮腫)", "알부민 감소로 혈장 삼투압 저하"],
];

const roleOverviewCards = [
  {
    title: "근육을 만들고 회복하고, 유지하게 한다",
    body: "운동 후 단백질이 아미노산으로 분해되면 류신 같은 필수아미노산이 근육 내 mTOR 신호경로를 활성화해 근섬유 단백질 합성을 촉진합니다. 운동하는 사람은 보통 체중 1kg당 1.4~2.0g 정도가 권장됩니다.",
    href: "/guides/basics/muscle",
    cta: "근육과 단백질 자세히 보기 →",
  },
  {
    title: "면역 세포와 면역물질의 재료가 된다",
    body: "항체(면역글로불린), 사이토카인, 인터루킨은 모두 단백질입니다. 단백질이 부족하면 면역세포 생성이 줄고 감염에 더 취약해질 수 있습니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "면역·호르몬과 단백질 자세히 보기 →",
  },
  {
    title: "호르몬·효소로 몸의 신호와 대사를 조절한다",
    body: "인슐린, 성장호르몬, 글루카곤은 모두 단백질 호르몬입니다. 트립신처럼 중요한 소화효소도 단백질입니다. 단백질 공급이 부족하면 이들의 합성도 감소할 수 있습니다.",
    href: "/guides/basics/immunity-hormone",
    cta: "면역·호르몬과 단백질 자세히 보기 →",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;

  if (track === "basics" && slug === "muscle") {
    return {
      title: "근육 성장에 단백질이 필요한 이유 | ProteinLab",
      description: "근단백질 합성, 섭취 타이밍, 하루 권장량까지 근육과 단백질의 관계를 정리했습니다.",
    };
  }

  if (track === "basics" && slug === "immunity-hormone") {
    return {
      title: "단백질과 면역·호르몬 | ProteinLab",
      description: "항체, 면역세포, 호르몬과 효소가 왜 단백질과 연결되는지 정리했습니다.",
    };
  }

  if (track === "basics" && slug === "deficiency-symptoms") {
    return {
      title: "단백질 부족 신호 | ProteinLab",
      description: "피로, 근육 감소, 면역 저하처럼 단백질 부족 시 나타날 수 있는 신호를 정리했습니다.",
    };
  }

  if (track === "basics" && slug === "deficiency-symptoms") {
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
              <span>단백질 부족 신호</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질이 부족하면 몸에 어떤 신호가 올까?</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 부족은 서서히 나타납니다.<br />
              피로, 근육 감소, 잦은 감기 — 이 신호들이 쌓이기 전에 확인해보세요.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 결핍의 주요 증상 6가지</h2>
              <div className="mt-4">
                <GuideVisual
                  track="protein-basics"
                  title="단백질 부족 신호"
                  accentColor="#2d6a4f"
                  accentBg="#e7f3ec"
                  variant="topic"
                />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">신체 신호</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">근육 감소·무력감</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">생활 신호</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">피로·집중력 저하</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">건강 신호</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">면역 저하·회복 지연</p>
                </article>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">호르몬</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">인슐린·성장호르몬</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">혈당 조절과 성장 신호는 단백질성 호르몬과 연결됩니다.</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">소화 효소</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">트립신·펩신</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">음식물을 분해하는 효소도 단백질이라 부족 시 기능 저하가 생길 수 있습니다.</p>
                </article>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                      <th className="px-3 py-3 font-semibold">증상</th>
                      <th className="px-3 py-3 font-semibold">원인</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deficiencySymptomRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)] text-sm">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">나는 단백질이 부족할까?</h2>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                하루 단백질 섭취량이 체중(kg) × 0.8g 이하라면 결핍 위험 구간입니다.
              </blockquote>
              <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">식단에서 육류·생선·달걀·두부·유제품이 부족하거나, 다이어트로 칼로리를 심하게 제한하는 경우 단백질 부족이 쉽게 발생합니다.</p>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015)</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/guides/basics/daily-requirement" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">내 하루 단백질 권장량 계산하기 →</Link>
                <Link href="/recommend" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">단백질 음료로 보충하기 →</Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (track === "basics" && slug === "muscle") {
    return {
      title: "근육 성장에 단백질이 필요한 진짜 이유 | ProteinLab",
      description: "근단백질 합성(MPS), mTOR 신호경로, 섭취 타이밍까지 — 운동과 단백질의 관계를 데이터로 정리했습니다.",
    };
  }

  if (track === "basics" && slug === "immunity-hormone") {
    return {
      title: "단백질과 면역·호르몬 — 항체·효소·인슐린까지 | ProteinLab",
      description: "단백질이 항체 생성, 면역세포 활동, 호르몬·효소 합성에 미치는 영향을 정리했습니다.",
    };
  }

  if (track === "basics" && slug === "deficiency-symptoms") {
    return {
      title: "단백질이 부족하면 몸에 어떤 신호가 올까? | ProteinLab",
      description: "근육 감소, 피로, 면역 저하, 부종까지 — 단백질 결핍 시 나타나는 증상을 데이터 기반으로 정리했습니다.",
    };
  }

  if (track === "protein-basics" && slug === "protein-functions") {
    return {
      title: "단백질은 몸에서 어떤 일을 할까? | ProteinLab",
      description: "단백질이 근육, 면역, 호르몬, 회복에 어떻게 쓰이는지 데이터 기반으로 정리했습니다.",
    };
  }

  if (track === "protein-basics" && slug === "protein-functions") {
    return {
      title: "단백질은 왜 근육·면역·호르몬에 중요한가 | ProteinLab",
      description: "단백질이 근육 성장, 항체 생성, 호르몬 합성에 어떻게 작용하는지 데이터 기반으로 정리했습니다.",
    };
  }

  if (track === "basics" && slug === "immunity-hormone") {
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
              <span>면역·호르몬과 단백질</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질이 면역과 호르몬에 미치는 영향</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 근육 외에도 면역과 호르몬 시스템 전반에 관여합니다.<br />
              항체, 사이토카인, 인슐린 — 이 모두가 단백질로 만들어집니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">항체와 면역세포의 재료</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">항체(면역글로불린), 사이토카인, 인터페론은 모두 단백질입니다. 단백질이 부족하면 면역세포 수가 감소하고 감염에 취약해집니다. 수술 후 회복기나 중환자의 경우 하루 1.5–2.0 g/kg까지 권장됩니다.</p>
              <div className="mt-4">
                <GuideVisual
                  track="protein-basics"
                  title="면역과 단백질"
                  accentColor="#2d6a4f"
                  accentBg="#e7f3ec"
                  variant="topic"
                />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">면역 단백질</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">항체·사이토카인 생성</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">면역세포와 면역 신호 전달은 단백질 재료를 바탕으로 움직입니다.</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">회복기 기준</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">1.5~2.0 g/kg</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">수술 후 회복기나 중환자 영양에서는 더 높은 기준이 사용됩니다.</p>
                </article>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">핵심 포인트</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">운동 후 20~40g 섭취</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">근합성 자극이 크게 올라가는 대표 구간입니다.</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">체크 포인트</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">류신과 총 단백질량</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">단백질 양뿐 아니라 필수아미노산 구성도 같이 봐야 합니다.</p>
                </article>
              </div>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 결핍 시: 면역세포 수 감소 → 감염률 증가 → 회복 지연
              </blockquote>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: Munteanu & Schwartz (2022), Frontiers in Nutrition</p>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">호르몬과 효소도 단백질이다</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">인슐린, 성장호르몬, 글루카곤은 아미노산 사슬로 이루어진 단백질 호르몬입니다. 소화를 돕는 트립신·펩신 같은 소화효소도 단백질입니다. 단백질이 부족하면 혈당 조절, 성장, 소화 기능에 영향을 미칩니다.</p>
              <div className="mt-4">
                <GuideVisual
                  track="protein-basics"
                  title="호르몬과 효소"
                  accentColor="#2d6a4f"
                  accentBg="#e7f3ec"
                  variant="topic"
                />
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                      <th className="px-3 py-3 font-semibold">종류</th>
                      <th className="px-3 py-3 font-semibold">대표 예시</th>
                      <th className="px-3 py-3 font-semibold">주요 기능</th>
                    </tr>
                  </thead>
                  <tbody>
                    {immunityProteinRows.map((row) => (
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
              <div className="flex flex-wrap gap-3">
                <Link href="/guides/basics/role-overview" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">단백질 기초 전체 보기 →</Link>
                <Link href="/recommend" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">내 목적에 맞는 단백질 음료 찾기 →</Link>
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

  if (track === "basics" && slug === "deficiency-symptoms") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
          <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
              <span>/</span>
              <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
              <span>/</span>
              <span>단백질 부족 신호</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질이 부족하면 몸에 어떤 신호가 올까?</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 부족은 서서히 나타납니다.<br />
              피로, 근육 감소, 면역 저하가 겹치기 전에 신호를 먼저 확인해야 합니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">대표 신호를 먼저 체크하세요</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 부족은 한 가지 증상으로 끝나지 않습니다.
                몸 상태와 생활 패턴이 함께 흔들리는 경우가 많습니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="단백질 부족 신호" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">신체 신호</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">근육 감소·무력감</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">생활 신호</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">피로·집중력 저하</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">건강 신호</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">면역 저하·회복 지연</p>
                </article>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                      <th className="px-3 py-3 font-semibold">증상</th>
                      <th className="px-3 py-3 font-semibold">원인</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deficiencySymptomRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="px-3 py-3 text-sm text-[var(--foreground-muted)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">섭취량 기준도 함께 봐야 합니다</h2>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                하루 단백질 섭취량이 체중(kg) × 0.8g 이하라면 결핍 위험 구간으로 볼 수 있습니다.
              </blockquote>
              <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
                식사에서 육류, 생선, 달걀, 두부, 유제품 비중이 낮거나 칼로리를 과하게 제한하는 경우 부족 신호가 더 쉽게 나타날 수 있습니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/guides/basics/daily-requirement" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">
                  하루 단백질 권장량 계산하기 →
                </Link>
                <Link href="/recommend" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">
                  단백질 제품 바로 찾기 →
                </Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (track === "basics" && slug === "immunity-hormone") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
          <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
              <span>/</span>
              <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
              <span>/</span>
              <span>면역·호르몬과 단백질</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질은 면역과 호르몬에도 쓰입니다</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 근육만의 재료가 아닙니다.<br />
              항체, 사이토카인, 인슐린, 효소까지 몸의 조절 시스템 전반과 연결됩니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">면역 단백질은 회복과 방어의 재료입니다</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
                항체와 면역 신호 단백질은 감염 대응뿐 아니라 회복 속도에도 영향을 줍니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="면역과 단백질" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">면역 단백질</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">항체·사이토카인 생성</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">면역세포와 면역 신호 전달은 단백질 재료를 바탕으로 움직입니다.</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">회복기 기준</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">1.5~2.0 g/kg</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">수술 후 회복기나 중환자 영양에서는 더 높은 기준이 사용됩니다.</p>
                </article>
              </div>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 결핍은 면역세포 감소와 감염률 증가, 회복 지연으로 이어질 수 있습니다.
              </blockquote>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">호르몬과 효소도 단백질로 움직입니다</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
                인슐린, 성장호르몬, 소화 효소처럼 대사와 조절을 담당하는 물질도 단백질과 연결됩니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="호르몬과 효소" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">호르몬</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">인슐린·성장호르몬</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">혈당 조절과 성장 신호는 단백질성 호르몬과 연결됩니다.</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">소화 효소</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">트립신·펩신</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">음식물을 분해하는 효소도 단백질이라 부족 시 기능 저하가 생길 수 있습니다.</p>
                </article>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                      <th className="px-3 py-3 font-semibold">종류</th>
                      <th className="px-3 py-3 font-semibold">대표 예시</th>
                      <th className="px-3 py-3 font-semibold">주요 기능</th>
                    </tr>
                  </thead>
                  <tbody>
                    {immunityProteinRows.map((row) => (
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (track === "basics" && slug === "muscle") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
          <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
              <span>/</span>
              <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
              <span>/</span>
              <span>근육과 단백질</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">근육 성장에 단백질이 필요한 이유</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              운동만으로는 근육이 완성되지 않습니다.<br />
              단백질이 있어야 손상된 근섬유가 회복되고 새로운 근육 합성이 시작됩니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">운동 후에는 근단백질 합성이 중요합니다</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
                운동 후 단백질이 아미노산으로 분해되면 근합성 신호가 활성화되고, 이 과정이 회복과 성장으로 이어집니다.
              </p>
              <div className="mt-4">
                <GuideVisual track="protein-basics" title="근단백질 합성" accentColor="#2d6a4f" accentBg="#e7f3ec" variant="topic" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">핵심 포인트</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">운동 후 20~40g 섭취</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">근합성 자극이 크게 올라가는 대표 구간입니다.</p>
                </article>
                <article className="rounded-xl border border-[#e3ece6] bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6d8a79]">체크 포인트</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">류신과 총 단백질량</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">단백질 양뿐 아니라 필수아미노산 구성도 같이 봐야 합니다.</p>
                </article>
              </div>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 20~40g 섭취 시 근합성 자극이 크게 올라가며, 40g 이상에서는 추가 효과가 제한적입니다.
              </blockquote>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">언제, 얼마나 먹을지 같이 봐야 합니다</h2>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                      <th className="px-3 py-3 font-semibold">섭취 타이밍</th>
                      <th className="px-3 py-3 font-semibold">권장량</th>
                      <th className="px-3 py-3 font-semibold">근거</th>
                    </tr>
                  </thead>
                  <tbody>
                    {muscleTimingRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                    {muscleIntakeRows.map((row) => (
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (track === "protein-basics" && slug === "protein-functions") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
          <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
              <span>/</span>
              <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
              <span>/</span>
              <span>단백질의 역할</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질은 몸에서 어떤 일을 할까?</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 근육만 만드는 영양소가 아닙니다.<br />
              면역, 호르몬, 회복까지 몸의 핵심 기능을 지탱하는 재료입니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <div className="max-w-3xl">
                <h2 className="text-xl font-bold text-[var(--foreground)]">몸 곳곳이 단백질로 움직입니다</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  체내 단백질은 근육에만 모여 있지 않습니다.
                  피부, 결합조직, 장기, 혈액까지 여러 조직이 단백질을 재료로 사용합니다.
                </p>
              </div>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-4">
                <svg viewBox="0 0 560 108" xmlns="http://www.w3.org/2000/svg" className="h-28 w-full min-w-[520px]" aria-label="인체 조직별 단백질 비중 차트">
                  {[
                    { label: "골격근", pct: 22.5, color: "#3d8b6e", textColor: "#1b5e42" },
                    { label: "피부·결합조직", pct: 17.5, color: "#5aab8a", textColor: "#1b5e42" },
                    { label: "혈액·장기", pct: 12.5, color: "#7dc4a8", textColor: "#2d6a54" },
                    { label: "간", pct: 7.5, color: "#a8d8c4", textColor: "#2d6a54" },
                    { label: "뇌", pct: 6, color: "#ceeade", textColor: "#2d6a54" },
                  ].map((row, i) => {
                    const barW = (row.pct / 25) * 360;
                    const y = i * 19 + 6;
                    return (
                      <g key={row.label}>
                        <text x="0" y={y + 8} fontSize="12" fill="#5c5852" fontFamily="sans-serif">{row.label}</text>
                        <rect x="100" y={y - 6} width={barW} height="14" rx="4" fill={row.color} />
                        <text x={100 + barW + 6} y={y + 8} fontSize="12" fill={row.textColor} fontWeight="600" fontFamily="sans-serif">{row.pct}%</text>
                      </g>
                    );
                  })}
                  <text x="100" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">0%</text>
                  <text x="208" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">10%</text>
                  <text x="316" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">20%</text>
                  <text x="424" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">25%+</text>
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  ["대표 조직", "골격근 외에도 피부, 결합조직, 장기에서 단백질이 계속 쓰입니다."],
                  ["회복 포인트", "운동 후 회복뿐 아니라 조직 재생과 면역 유지에도 단백질이 필요합니다."],
                  ["핵심 질문", "근육만 챙길 게 아니라 몸 전체 기능을 기준으로 섭취량을 봐야 합니다."],
                ].map(([title, body]) => (
                  <article key={title} className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-4">
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                      <th className="px-3 py-3 font-semibold">조직</th>
                      <th className="px-3 py-3 font-semibold">체중 대비 단백질 비중</th>
                      <th className="px-3 py-3 font-semibold">대표 역할</th>
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
              <div className="max-w-3xl">
                <h2 className="text-xl font-bold text-[var(--foreground)]">단백질이 하는 3가지 핵심 역할</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  단백질의 역할은 크게 세 가지로 나눠 볼 수 있습니다.
                  근육 회복, 면역 유지, 호르몬과 효소 생성입니다.
                </p>
              </div>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-4">
                <svg viewBox="0 0 540 78" xmlns="http://www.w3.org/2000/svg" className="h-28 w-full min-w-[500px]" aria-label="단백질의 3가지 핵심 역할">
                  <rect x="10" y="5" width="160" height="68" rx="12" fill="#e7f3ec" stroke="#c8e6d8" strokeWidth="1" />
                  <circle cx="90" cy="29" r="14" fill="white" stroke="#3d8b6e" strokeWidth="1.5" />
                  <rect x="79" y="27" width="22" height="4" rx="2" fill="#3d8b6e" />
                  <rect x="75" y="24" width="6" height="10" rx="2" fill="#3d8b6e" />
                  <rect x="99" y="24" width="6" height="10" rx="2" fill="#3d8b6e" />
                  <text x="90" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2d6a4f" fontFamily="sans-serif">근육</text>
                  <text x="90" y="64" textAnchor="middle" fontSize="10" fill="#5c8a72" fontFamily="sans-serif">생성·회복·유지</text>

                  <rect x="190" y="5" width="160" height="68" rx="12" fill="#eaf0fa" stroke="#c5d8f0" strokeWidth="1" />
                  <circle cx="270" cy="29" r="14" fill="white" stroke="#4a7fb5" strokeWidth="1.5" />
                  <path d="M270,17 L280,21 L280,30 Q280,38 270,42 Q260,38 260,30 L260,21 Z" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M266,29 L269,32 L275,26" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="270" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2c5f8a" fontFamily="sans-serif">면역</text>
                  <text x="270" y="64" textAnchor="middle" fontSize="10" fill="#4a6f9a" fontFamily="sans-serif">항체·면역세포 재료</text>

                  <rect x="370" y="5" width="160" height="68" rx="12" fill="#f5ede8" stroke="#e8d0c4" strokeWidth="1" />
                  <circle cx="450" cy="29" r="14" fill="white" stroke="#8b5e3d" strokeWidth="1.5" />
                  <circle cx="450" cy="29" r="5" fill="none" stroke="#8b5e3d" strokeWidth="2" />
                  <line x1="450" y1="18" x2="450" y2="22" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="450" y1="36" x2="450" y2="40" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="439" y1="29" x2="443" y2="29" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="457" y1="29" x2="461" y2="29" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="442" y1="21" x2="445" y2="24" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="455" y1="34" x2="458" y2="37" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="458" y1="21" x2="455" y2="24" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="445" y1="34" x2="442" y2="37" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <text x="450" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6b4020" fontFamily="sans-serif">호르몬·효소</text>
                  <text x="450" y="64" textAnchor="middle" fontSize="10" fill="#8b6040" fontFamily="sans-serif">신호·대사 조절</text>
                </svg>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {roleOverviewCards.map((card) => (
                  <article key={card.title} className="flex min-h-[180px] flex-col rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
                    <h3 className="text-lg font-bold leading-7 text-[var(--foreground)]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                    <p className="mt-auto pt-5 text-sm font-medium text-[#6d746f]">
                      이 주제는 Track A에서 별도 콘텐츠로 이어집니다.
                    </p>
                  </article>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <div className="max-w-3xl">
                <h2 className="text-xl font-bold text-[var(--foreground)]">그래서 하루에 얼마나 먹어야 할까?</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  몸의 역할을 이해했다면 이제는 섭취량이 중요합니다.
                  활동량과 체중에 따라 필요한 단백질 양은 달라집니다.
                </p>
              </div>
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
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(일반 성인), ISSN Position Stand(운동인)</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/guides/basics/daily-requirement" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">
                  하루 단백질 권장량 자세히 보기 →
                </Link>
                <Link href="/recommend" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">
                  내 목적에 맞는 제품 찾기 →
                </Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <span>단백질의 역할 개요</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질, 몸에서 어떤 일을 할까?</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 단순히 근육을 키우는 영양소만이 아닙니다.<br />
              면역세포를 만들고, 호르몬을 합성하고, 손상된 조직을 회복하는 데도 단백질이 필요합니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">우리 몸은 단백질로 이루어져 있다</h2>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                아미노산이 결합한 단백질은 근육, 피부, 혈액, 효소, 호르몬 등 인체 거의 모든 구성 성분의 재료입니다.<br />
                체내에서는 끊임없이 단백질이 생성되고 분해되며, 그때마다 단백질 또는 아미노산 공급이 필요합니다.
              </blockquote>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-5">
                <svg viewBox="0 0 560 108" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-label="인체 조직별 단백질 비중 차트">
                  {[
                    { label: "골격근", pct: 22.5, color: "#3d8b6e", textColor: "#1b5e42" },
                    { label: "피부·결합조직", pct: 17.5, color: "#5aab8a", textColor: "#1b5e42" },
                    { label: "근막·연골", pct: 12.5, color: "#7dc4a8", textColor: "#2d6a54" },
                    { label: "내장", pct: 7.5, color: "#a8d8c4", textColor: "#2d6a54" },
                    { label: "혈액", pct: 6, color: "#ceeade", textColor: "#2d6a54" },
                  ].map((row, i) => {
                    const barW = (row.pct / 25) * 360;
                    const y = i * 19 + 6;

                    return (
                      <g key={row.label}>
                        <text x="0" y={y + 8} fontSize="12" fill="#5c5852" fontFamily="sans-serif">{row.label}</text>
                        <rect x="80" y={y - 6} width={barW} height="14" rx="4" fill={row.color} />
                        <text x={80 + barW + 6} y={y + 8} fontSize="12" fill={row.textColor} fontWeight="600" fontFamily="sans-serif">{row.pct}%</text>
                      </g>
                    );
                  })}
                  <text x="80" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">0%</text>
                  <text x="188" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">10%</text>
                  <text x="296" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">20%</text>
                  <text x="404" y="104" fontSize="10" fill="#9b9791" fontFamily="sans-serif">25%+</text>
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
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회·보건복지부 한국인 영양소 섭취기준 (2015)</p>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">단백질이 하는 3가지 핵심 역할</h2>
              <div className="mt-4 rounded-2xl border border-[#d8d4cd] bg-[#f7f5f0] p-5">
                <svg viewBox="0 0 540 78" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-label="단백질의 3가지 핵심 역할">
                  <rect x="10" y="5" width="160" height="68" rx="12" fill="#e7f3ec" stroke="#c8e6d8" strokeWidth="1" />
                  <circle cx="90" cy="29" r="14" fill="white" stroke="#3d8b6e" strokeWidth="1.5" />
                  <rect x="79" y="27" width="22" height="4" rx="2" fill="#3d8b6e" />
                  <rect x="75" y="24" width="6" height="10" rx="2" fill="#3d8b6e" />
                  <rect x="99" y="24" width="6" height="10" rx="2" fill="#3d8b6e" />
                  <text x="90" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2d6a4f" fontFamily="sans-serif">근육</text>
                  <text x="90" y="64" textAnchor="middle" fontSize="10" fill="#5c8a72" fontFamily="sans-serif">생성·회복·유지</text>

                  <rect x="190" y="5" width="160" height="68" rx="12" fill="#eaf0fa" stroke="#c5d8f0" strokeWidth="1" />
                  <circle cx="270" cy="29" r="14" fill="white" stroke="#4a7fb5" strokeWidth="1.5" />
                  <path d="M270,17 L280,21 L280,30 Q280,38 270,42 Q260,38 260,30 L260,21 Z" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M266,29 L269,32 L275,26" fill="none" stroke="#4a7fb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="270" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2c5f8a" fontFamily="sans-serif">면역</text>
                  <text x="270" y="64" textAnchor="middle" fontSize="10" fill="#4a6f9a" fontFamily="sans-serif">항체·면역세포 재료</text>

                  <rect x="370" y="5" width="160" height="68" rx="12" fill="#f5ede8" stroke="#e8d0c4" strokeWidth="1" />
                  <circle cx="450" cy="29" r="14" fill="white" stroke="#8b5e3d" strokeWidth="1.5" />
                  <circle cx="450" cy="29" r="5" fill="none" stroke="#8b5e3d" strokeWidth="2" />
                  <line x1="450" y1="18" x2="450" y2="22" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="450" y1="36" x2="450" y2="40" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="439" y1="29" x2="443" y2="29" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="457" y1="29" x2="461" y2="29" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="442" y1="21" x2="445" y2="24" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="455" y1="34" x2="458" y2="37" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="458" y1="21" x2="455" y2="24" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="445" y1="34" x2="442" y2="37" stroke="#8b5e3d" strokeWidth="2" strokeLinecap="round" />
                  <text x="450" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6b4020" fontFamily="sans-serif">호르몬·효소</text>
                  <text x="450" y="64" textAnchor="middle" fontSize="10" fill="#8b6040" fontFamily="sans-serif">신호·대사 조절</text>
                </svg>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {roleOverviewCards.map((card) => (
                  <article key={card.title} className="flex min-h-[200px] flex-col rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
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
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(일반 성인), ISSN Position Stand(운동인)</p>
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

  if (track === "basics" && slug === "muscle") {
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
              <span>근육과 단백질</span>
            </div>
            <div className="mt-3">
              <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">근육 성장에 단백질이 필요한 진짜 이유</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              운동만 한다고 근육이 늘지 않습니다.<br />
              단백질이 있어야 근섬유가 만들어지고, 손상된 근육이 회복됩니다.
            </p>
          </div>
        </section>
        <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">근단백질 합성(MPS)이란?</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">운동 후 단백질이 아미노산으로 분해되면, 류신 등 필수아미노산이 근육 내 mTOR 신호경로를 활성화합니다. 이 신호가 근섬유 단백질 합성을 촉진하여 근육이 성장·회복됩니다.</p>
              <div className="mt-4">
                <GuideVisual
                  track="protein-basics"
                  title="근단백질 합성"
                  accentColor="#2d6a4f"
                  accentBg="#e7f3ec"
                  variant="topic"
                />
              </div>
              <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 20–40g 섭취 시 근합성 자극이 극대화되며, 40g 이상에서는 추가 효과가 크지 않습니다.
              </blockquote>
              <p className="mt-3 text-xs text-[var(--foreground-muted)]">출처: ISSN Position Stand (2007)</p>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">언제 먹어야 효과적일까?</h2>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                      <th className="px-3 py-3 font-semibold">섭취 타이밍</th>
                      <th className="px-3 py-3 font-semibold">권장량</th>
                      <th className="px-3 py-3 font-semibold">근거</th>
                    </tr>
                  </thead>
                  <tbody>
                    {muscleTimingRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: ISSN Position Stand</p>
            </section>
            <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
              <h2 className="text-xl font-bold text-[var(--foreground)]">하루 권장 섭취량</h2>
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
                    {muscleIntakeRows.map((row) => (
                      <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                        {row.map((cell) => (
                          <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(2015), ISSN Position Stand</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/guides/how-to-choose/checklist" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">단백질 음료 고르는 법 보기 →</Link>
                <Link href="/picks/high-protein-20" className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]">고단백 20g+ 제품 바로 보기 →</Link>
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
