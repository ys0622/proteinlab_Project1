import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 소화·흡수 메커니즘 | 입에서 근육까지 | ProteinLab",
  description:
    "단백질이 입과 위, 장을 거치며 아미노산으로 분해되고 흡수되는 과정과 원료별 흡수 특성 차이를 정리합니다.",
};

const digestionRows = [
  ["1단계", "입", "씹는 과정으로 음식물을 잘게 부수기", "-"],
  ["2단계", "위", "위산(HCl)과 펩신으로 단백질 사슬 분해", "약 10~20%"],
  ["3단계", "소장", "췌장 효소로 아미노산까지 분해 후 흡수", "대부분"],
];

const sourceRows = [
  ["유청(Whey) / WPI", "빠름", "BCAA와 류신 비중이 높아 운동 직후 사용에 유리", "운동 직후"],
  ["카제인(Casein)", "느림", "천천히 흡수돼 포만감과 야간 보완에 유리", "취침 전 / 간식"],
  ["식품형 단백질", "중간", "섬유질과 미량영양소가 함께 들어가 소화 속도는 완만함", "일상 식사 보완"],
];

function ImageSlot({ alt }: { alt: string }) {
  return (
    <div
      className="mt-4 rounded-2xl border border-dashed border-[#d9d4cd] bg-white px-5 py-12 text-center md:py-16"
      role="img"
      aria-label={alt}
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">INFOGRAPHIC SLOT</p>
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

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
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
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질을 먹으면 몸에서 어떻게 흡수될까?</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 먹는 즉시 바로 근육으로 가지 않습니다. 입, 위, 장을 거치며 아미노산으로 분해된 뒤 몸이 실제로 사용할 수 있습니다.
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
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 대한영양사협회, 보건복지부 식품구성자전거</p>
            <ImageSlot alt="단백질이 입과 위, 소장을 거치며 분해되는 3단계 흐름" />
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">위에서는 분해 준비가 시작됩니다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              위에서는 위산과 펩신이 단백질 사슬을 더 짧게 끊기 시작합니다. 이 단계는 전체 분해의 일부이지만, 이후 장에서 완전 분해와 흡수가 일어나기 위한 중요한 준비 과정입니다.
            </p>
            <div className="mt-4">
              <Callout>
                위에 머무는 시간이 길수록 포만감은 커질 수 있습니다. 카제인처럼 천천히 흡수되는 단백질이 취침 전 보완용으로 자주 언급되는 이유와 연결됩니다.
              </Callout>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">소장에서 아미노산으로 흡수됩니다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              소장에서는 췌장에서 나온 효소가 펩타이드를 더 작은 아미노산 단위로 분해하고, 최종적으로 혈류로 흡수합니다.
            </p>
            <ImageSlot alt="소장에서 아미노산으로 흡수돼 혈류로 이동하는 과정" />
            <div className="mt-4">
              <Callout>
                유청 단백질은 빠르게 흡수되는 편이고, 식품형 단백질은 식이섬유나 지방이 함께 들어가 체감이 더 완만할 수 있습니다.
              </Callout>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">원료별 흡수 특성 차이</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 단백질이라도 원료에 따라 흡수 속도, 포만감, 아미노산 구성에 차이가 있습니다. 운동 직후, 간식, 취침 전처럼 목적에 맞게 선택하는 것이 실전적입니다.
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
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 대한영양사협회, ISSN Position Stand</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
