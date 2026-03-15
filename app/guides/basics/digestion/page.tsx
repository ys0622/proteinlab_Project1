import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 소화·흡수 메커니즘 | 입에서 근육까지 | ProteinLab",
  description:
    "단백질이 입, 위, 소장을 거쳐 아미노산으로 분해·흡수되는 과정과 원료별 흡수 특성 차이를 정리합니다.",
};

const digestionRows = [
  ["1단계", "입", "씹는 과정으로 음식물을 잘게 부수기", "-"],
  ["2단계", "위", "위산(HCl)과 펩신으로 단백질 사슬 분해", "약 10~20%"],
  ["3단계", "소장", "트립신 등 효소로 아미노산까지 분해 후 흡수", "대부분"],
];

const sourceRows = [
  ["유청(Whey) / WPI", "빠름", "BCAA와 류신 비율이 높아 운동 직후 활용이 좋음", "운동 직후"],
  ["카제인(Casein)", "느림", "천천히 흡수되어 포만감과 야간 보충에 유리", "취침 전, 간식"],
  ["식물성(대두·완두)", "중간", "소화 부담이 낮고 비건 식단과 조합이 쉬움", "평상시, 식사 대용"],
];

function ImageSlot({ alt }: { alt: string }) {
  return (
    <div
      className="mt-4 rounded-2xl border border-dashed border-[#d9d4cd] bg-white px-5 py-16 text-center"
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
              단백질 기초
            </Link>
            <span>/</span>
            <span>단백질 소화·흡수 메커니즘</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질을 먹으면 몸에서 어떻게 흡수될까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 먹는 즉시 바로 근육이 되지 않습니다. 입, 위, 소장을 거쳐 아미노산으로 분해된 뒤 비로소 몸이 활용할 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 소화·흡수 3단계</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">단계</th>
                    <th className="px-3 py-3 font-semibold">기관</th>
                    <th className="px-3 py-3 font-semibold">주요 작용</th>
                    <th className="px-3 py-3 font-semibold">분해 비중</th>
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
              출처: 대한영양사협회, 보건복지부 한국인 영양소 섭취기준(2020)
            </p>

            <ImageSlot alt="단백질이 입, 위, 소장을 거쳐 아미노산으로 분해되는 3단계 흐름" />
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">위에서 먼저 풀어내기 시작한다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              위에서는 위산과 펩신이 단백질 사슬을 잘게 끊기 시작합니다. 이 단계는 전체 분해의 일부만 담당하지만, 뒤이어 소장에서
              아미노산까지 완전히 분해될 수 있도록 준비하는 중요한 구간입니다.
            </p>

            <div className="mt-4">
              <Callout>
                위에 머무는 시간이 길수록 포만감은 커질 수 있습니다. 카제인처럼 천천히 흡수되는 단백질이 취침 전 보충용으로 자주 언급되는 이유이기도 합니다.
              </Callout>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 대한영양사협회(2020)</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">소장에서 아미노산으로 흡수된다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              소장에서는 트립신, 키모트립신 같은 효소가 펩타이드를 더 잘게 분해하고, 그 결과 생성된 아미노산이 장벽을 통해 흡수됩니다.
              흡수된 아미노산은 혈액을 통해 근육, 효소, 호르몬, 면역단백질 합성에 사용됩니다.
            </p>

            <ImageSlot alt="소장 점막에서 아미노산이 흡수되어 혈류로 이동하는 과정" />

            <div className="mt-4">
              <Callout>
                동물성 단백질은 필수아미노산 구성이 고르게 들어 있는 경우가 많고, 식물성 단백질은 식이섬유나 다른 영양소와 함께 들어 있어 소화 속도가 상대적으로 완만할 수 있습니다.
              </Callout>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 대한영양사협회(2020)</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 원료별 흡수 특성 차이</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 단백질이라도 원료에 따라 흡수 속도, 포만감, 아미노산 구성에 차이가 있습니다. 운동 직후, 간식, 취침 전처럼 목적에 맞게 선택하는 것이 좋습니다.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">원료</th>
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
              출처: 대한영양사협회(2020), ISSN Position Stand (2007)
            </p>

            <div className="mt-5">
              <Link href="/guides/basics/sources" className="text-sm font-semibold text-[var(--accent)] hover:underline">
                원료별 차이 더 자세히 보기
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">흡수 효율을 높이는 섭취 팁</h2>

            <div className="mt-5 space-y-4">
              <Callout>
                <strong>한 번에 20~30g 정도</strong>
                <br />
                한 번에 지나치게 많이 먹기보다 20~30g 범위로 나누는 편이 일상에서는 더 효율적입니다.
                <br />
                <span className="text-xs">출처: ISSN Position Stand (2007)</span>
              </Callout>

              <Callout>
                <strong>하루 3~4회 분산 섭취</strong>
                <br />
                아침, 점심, 저녁, 간식으로 나눠 먹으면 하루 종일 단백질 공급을 일정하게 유지할 수 있습니다.
                <br />
                <span className="text-xs">출처: 대한영양사협회(2020)</span>
              </Callout>

              <Callout>
                <strong>운동 후 30~45분 활용</strong>
                <br />
                운동 뒤에는 빠르게 섭취할 수 있는 음료나 유청 단백질이 실무적으로 활용하기 편합니다.
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
