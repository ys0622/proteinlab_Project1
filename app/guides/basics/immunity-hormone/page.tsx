import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질과 면역·호르몬 | 항체·효소·인슐린까지 | ProteinLab",
  description:
    "단백질이 항체 생성, 면역세포 활동, 호르몬·효소 합성에 미치는 영향을 정리했습니다.",
};

const functionRows = [
  ["단백질 호르몬", "인슐린, 성장호르몬, 글루카곤", "혈당 조절, 성장, 대사 조절"],
  ["소화효소", "트립신, 펩신", "단백질·음식물 소화"],
  ["면역단백질", "항체, 사이토카인", "병원체 무력화, 면역 신호 전달"],
];

function ImageSlot({ alt }: { alt: string }) {
  return (
    <div
      className="mt-4 rounded-2xl border border-dashed border-[#d9d4cd] bg-white px-5 py-8 text-center"
      role="img"
      aria-label={alt}
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">IMAGE SLOT</p>
      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{alt}</p>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function ImmunityHormonePage() {
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
              🧬 단백질 기초
            </Link>
            <span>/</span>
            <span>면역과 호르몬</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질이 면역과 호르몬에 미치는 영향
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 근육 외에도 면역과 호르몬 시스템 전반에 관여합니다. 항체, 사이토카인,
            인슐린. 이 모두가 단백질로 만들어집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">항체와 면역세포의 재료</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              항체(면역글로불린), 사이토카인, 인터페론은 모두 단백질입니다. 단백질이 부족하면
              면역세포 수가 감소하고 감염에 취약해집니다. 수술 후 회복기나 중환자의 경우 하루
              1.5~2.0 g/kg까지 권장됩니다.
            </p>

            <ImageSlot alt="항체(면역글로불린) 구조 모식도" />

            <Callout>
              단백질 결핍 시: 면역세포 수 감소 → 감염률 증가 → 회복 지연
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: Munteanu &amp; Schwartz (2022), Frontiers in Nutrition
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">호르몬과 효소도 단백질이다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              인슐린, 성장호르몬, 글루카곤은 아미노산 사슬로 이루어진 단백질 호르몬입니다. 소화를
              돕는 트립신·펩신 같은 소화효소도 단백질입니다. 단백질이 부족하면 이들의 합성이 줄어
              혈당 조절, 성장, 소화 기능에 영향을 미칩니다.
            </p>

            <ImageSlot alt="인체 호르몬 분비선(내분비계) 모식도" />

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
                  {functionRows.map((row) => (
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

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/basics/role-overview"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                단백질 기초 전체 보기
              </Link>
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
