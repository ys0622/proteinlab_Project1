import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 소화와 흡수 메커니즘 | 입에서 근육까지 | ProteinLab",
  description:
    "단백질이 입, 위, 소장을 거치며 아미노산으로 분해되고 흡수되는 과정과 원료별 흡수 특성 차이를 정리합니다.",
};

const digestionRows = [
  ["1단계", "입", "씹는 과정으로 단백질 식품을 잘게 부수기", "기계적 분해"],
  ["2단계", "위", "위산과 펩신으로 단백질 사슬 분해 시작", "약 10~20%"],
  ["3단계", "소장", "췌장 효소로 아미노산 단위까지 분해 후 흡수", "대부분"],
];

const sourceRows = [
  ["유청(Whey) / WPI", "빠름", "BCAA와 류신 비중이 높아 운동 직후 활용이 빠름", "운동 직후"],
  ["카제인(Casein)", "느림", "천천히 흡수돼 포만감과 야간 보충에 유리", "취침 전 / 간식"],
  ["식품형 단백질", "중간", "식이섬유와 지방이 함께 들어가 체감 속도는 완만", "일상 식사 보완"],
];

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

function DigestionFlowGraphic() {
  const items = [
    {
      step: "1",
      title: "입",
      note: "씹는 과정으로 입자를 잘게 부수고 위에서 분해되기 쉬운 상태를 만듭니다.",
    },
    {
      step: "2",
      title: "위",
      note: "위산과 펩신이 단백질 사슬을 잘라 더 작은 조각으로 분해합니다.",
    },
    {
      step: "3",
      title: "소장",
      note: "췌장 효소가 아미노산 단위까지 분해하고 혈류 흡수가 일어납니다.",
    },
  ];

  return (
    <div
      className="mt-4 rounded-2xl border border-[#dce8df] bg-white p-4 md:p-5"
      role="img"
      aria-label="단백질이 입, 위, 소장을 거치며 분해되는 3단계 흐름 인포그래픽"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.step} className="rounded-2xl border border-[#e7efe9] bg-[#f6fbf7] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2d6a4f] text-sm font-bold text-white">
                {item.step}
              </div>
              <p className="text-base font-semibold text-[#24543d]">{item.title}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{item.note}</p>
            {index < items.length - 1 ? (
              <div className="mt-3 text-xs font-semibold tracking-[0.08em] text-[#6d8b76] md:hidden">
                다음 단계
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function AbsorptionGraphic() {
  const items = [
    {
      label: "펩타이드 분해",
      body: "소장 효소가 짧아진 펩타이드를 더 잘게 잘라 흡수 가능한 형태로 바꿉니다.",
    },
    {
      label: "장세포 흡수",
      body: "아미노산과 소형 펩타이드가 장세포를 통해 체내로 들어옵니다.",
    },
    {
      label: "혈류 이동",
      body: "흡수된 아미노산은 혈류를 타고 간과 근육, 기타 조직으로 이동합니다.",
    },
  ];

  return (
    <div
      className="mt-4 rounded-2xl border border-[#dce8df] bg-white p-4 md:p-5"
      role="img"
      aria-label="소장에서 아미노산으로 흡수돼 혈류로 이동하는 과정 인포그래픽"
    >
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-start gap-3 rounded-xl border border-[#e7efe9] bg-[#f6fbf7] px-4 py-4">
            <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2d6a4f]" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#24543d]">{item.label}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
            </div>
            {index < items.length - 1 ? (
              <div className="hidden shrink-0 text-xs font-semibold tracking-[0.08em] text-[#6d8b76] md:block">
                →
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
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
            <span>단백질 소화와 흡수 메커니즘</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질은 먹고 나서 몸에서 어떻게 흡수될까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 먹는 즉시 바로 근육으로 가지 않습니다. 입, 위, 소장을 거치며 아미노산으로
            분해된 뒤에야 몸이 실제로 사용할 수 있습니다.
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
              출처: 대한영양사협회, 보건복지부 식품구성자전거
            </p>
            <DigestionFlowGraphic />
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">위에서는 분해 준비가 시작됩니다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              위에서는 위산과 펩신이 단백질 사슬을 더 짧게 자르기 시작합니다. 이 단계가 전체 분해의
              대부분은 아니지만, 이후 장에서 완전 분해와 흡수가 일어나기 위한 핵심 준비 과정입니다.
            </p>
            <div className="mt-4">
              <Callout>
                위에 머무는 시간이 길수록 포만감은 커질 수 있습니다. 카제인처럼 천천히 흡수되는
                단백질이 취침 전 보충용으로 자주 언급되는 이유도 여기에 가깝습니다.
              </Callout>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">소장에서 아미노산으로 흡수됩니다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              소장에서는 췌장에서 나온 효소가 단백질을 아미노산 단위까지 분해하고, 최종적으로
              혈류로 흡수됩니다.
            </p>
            <AbsorptionGraphic />
            <div className="mt-4">
              <Callout>
                유청 단백질은 빠르게 흡수되는 편이고, 식품형 단백질은 식이섬유나 지방이 함께 들어가
                체감 속도는 더 완만하게 느껴질 수 있습니다.
              </Callout>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">원료별 흡수 특성 차이</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 단백질이라도 원료에 따라 흡수 속도, 포만감, 아미노산 구성이 다릅니다. 운동 직후,
              간식, 취침 전처럼 목적에 맞게 선택하는 것이 실전적입니다.
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
              출처: 대한영양사협회, ISSN Position Stand
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
