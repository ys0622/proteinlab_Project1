import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 소화흡수 메커니즘 | 입에서 근육까지 | ProteinLab",
  description:
    "단백질이 입·위·소장을 거쳐 아미노산으로 분해·흡수되는 과정을 쉽게 정리했습니다. 급원별 흡수 속도 차이도 확인하세요.",
};

const digestionRows = [
  ["1단계", "입", "저작으로 음식 기계적 분쇄", "-"],
  ["2단계", "위", "위산(HCl) + 펩신 → 단백질 일부 분해", "약 10~20%"],
  ["3단계", "소장", "트립신·키모트립신·점막효소 → 아미노산으로 완전 분해 후 흡수", "나머지 전량"],
];

const sourceRows = [
  ["유청(Whey) / WPI", "빠름", "BCAA·류신 풍부, 근합성 효과 높음", "운동 직후"],
  ["카제인(Casein)", "느림", "장시간 아미노산 공급, 포만감 지속", "취침 전·식사 간 간식"],
  ["식물성 (대두·완두)", "중간", "항영양소로 소화율 낮은 편, 비건 적합", "평시·식사 대용"],
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
    <blockquote className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function DigestionGuidePage() {
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
            <span>단백질 소화흡수 메커니즘</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질, 먹으면 몸에서 어떻게 흡수될까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 먹는다고 바로 근육이 되지 않습니다. 입·위·소장을 거쳐 아미노산으로 분해된 뒤에야
            비로소 몸에 흡수됩니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 소화흡수 3단계</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">단계</th>
                    <th className="px-3 py-3 font-semibold">기관</th>
                    <th className="px-3 py-3 font-semibold">주요 작용</th>
                    <th className="px-3 py-3 font-semibold">분해 비율</th>
                  </tr>
                </thead>
                <tbody>
                  {digestionRows.map((row) => (
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
              출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2020)
            </p>

            <ImageSlot alt="단백질 소화흡수 3단계 경로 도식" />
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">위에서 일어나는 일</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              위에 들어온 단백질은 위산(HCl)과 펩신 효소에 의해 잘게 분해되기 시작합니다. 주세포에서
              분비된 펩시노겐이 pH 4 미만의 환경에서 펩신으로 활성화되어 큰 단백질 사슬을 펩타이드로
              절단합니다. 이 단계에서 전체 단백질의 약 10~20%가 분해되며, 위의 수축운동이 내용물을
              균일하게 혼합해 소장으로 천천히 이동시킵니다.
            </p>

            <div className="mt-4">
              <Callout>
                위에서 느끼는 포만감은 단백질이 소장으로 이동하기 전 위에 머무는 시간과 관련이 있습니다.
              </Callout>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회(2020)</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">소장에서 아미노산이 되다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              소장에서 췌장이 분비한 트립신·키모트립신과 장 점막세포의 아미노펩티다아제·디펩티다아제가
              함께 작용해 펩타이드를 개별 아미노산으로 완전히 분해합니다. 분해된 아미노산은 Na 공수송체를
              통한 능동수송으로 혈액에 흡수되고, 간으로 이동해 근육 합성·효소·호르몬 재료로 분배됩니다.
            </p>

            <ImageSlot alt="소장 점막세포에서 아미노산이 혈액으로 흡수되는 과정 도식" />

            <div className="mt-4">
              <Callout>
                동물성 단백질은 필수아미노산이 균형있게 포함되어 소화율이 높고, 식물성 단백질은 항영양소의
                영향으로 상대적으로 소화율이 낮습니다.
              </Callout>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회(2020)</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 급원별 흡수 속도 차이</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 단백질이라도 급원에 따라 흡수 속도와 아미노산 구성이 다릅니다. 목적에 맞는 급원을
              선택하면 섭취 효과를 높일 수 있습니다.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">급원</th>
                    <th className="px-3 py-3 font-semibold">흡수 속도</th>
                    <th className="px-3 py-3 font-semibold">특징</th>
                    <th className="px-3 py-3 font-semibold">추천 타이밍</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceRows.map((row) => (
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
              출처: 한국영양학회(2020) / ISSN Position Stand (2007)
            </p>

            <div className="mt-5">
              <Link href="/guides/basics/sources" className="text-sm font-semibold text-[var(--accent)] hover:underline">
                급원별 차이 더 자세히 보기
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">흡수율을 높이는 섭취 원칙</h2>

            <div className="mt-5 space-y-4">
              <Callout>
                <strong>한 끼 20~30g</strong>
                <br />
                한 끼 40g 이상은 추가 흡수 효과가 크지 않습니다. 20~30g씩 나눠 섭취하는 것이 효율적입니다.
                <br />
                <span className="text-xs">출처: ISSN Position Stand (2007)</span>
              </Callout>

              <Callout>
                <strong>하루 3~4회 분산 섭취</strong>
                <br />
                아침·점심·저녁에 균등하게 나눠 섭취하면 하루 종일 근합성 신호를 유지할 수 있습니다.
                <br />
                <span className="text-xs">출처: 한국영양학회(2020)</span>
              </Callout>

              <Callout>
                <strong>운동 후 30~45분 이내</strong>
                <br />
                운동 직후 골든 타임에 빠른 흡수 단백질(유청)을 섭취하면 회복 효과가 높아집니다.
                <br />
                <span className="text-xs">출처: ACSM &quot;Nutrition and Athletic Performance&quot; (2009)</span>
              </Callout>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/basics/role-overview"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                단백질 역할 전체 보기
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                내 목적에 맞는 제품 찾기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
