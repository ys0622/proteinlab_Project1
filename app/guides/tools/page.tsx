import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProteinToolsClient from "./ProteinToolsClient";
import { getGuideTrack } from "@/app/data/guidesTracks";

export const metadata = {
  title: "하루 단백질 섭취량 계산기",
  description:
    "체중과 활동량을 기준으로 하루 단백질 권장량을 계산해보세요. ProteinLab 계산기로 나에게 맞는 단백질 섭취 기준을 빠르게 확인할 수 있습니다.",
  keywords: [
    "하루 단백질 섭취량",
    "단백질 섭취량 계산기",
    "단백질 하루 권장량",
    "단백질 얼마나 먹어야 하나",
    "체중별 단백질 섭취량",
  ],
  openGraph: {
    title: "하루 단백질 섭취량 계산기",
    description:
      "체중과 활동량을 기준으로 하루 단백질 권장량을 계산해보세요. ProteinLab 계산기로 나에게 맞는 단백질 섭취 기준을 빠르게 확인할 수 있습니다.",
  },
  twitter: {
    card: "summary",
    title: "하루 단백질 섭취량 계산기",
    description:
      "체중과 활동량을 기준으로 하루 단백질 권장량을 계산해보세요. ProteinLab 계산기로 나에게 맞는 단백질 섭취 기준을 빠르게 확인할 수 있습니다.",
  },
};

const interpretationRows = [
  ["건강 관리", "체중 x 0.8~1.2g", "기본 권장량을 꾸준히 채우는 데 초점을 둡니다."],
  ["체중 관리", "체중 x 1.0~1.6g", "포만감과 근손실 방지를 같이 보는 편이 실전적입니다."],
  ["근육 증가", "체중 x 1.6~2.0g", "운동 빈도와 회복까지 고려해 더 높은 범위를 봅니다."],
];

const usageCards = [
  {
    title: "1. 계산기로 기준 잡기",
    body: "체중과 활동량을 넣어 하루 총량을 먼저 확인합니다. 이 숫자가 식사 계획의 출발점입니다.",
  },
  {
    title: "2. 식사로 얼마나 채우는지 보기",
    body: "아침, 점심, 저녁으로 실제 식사에서 몇 g 정도 들어오는지 대략 나눠보면 부족분이 보입니다.",
  },
  {
    title: "3. 부족한 만큼만 보완하기",
    body: "식사로 채우기 어려운 구간만 음료나 쉐이크로 메우는 편이 가장 자연스럽고 오래 갑니다.",
  },
];

export default function ProteinToolsPage() {
  const trackData = getGuideTrack("tools");

  if (!trackData) notFound();
  const accentColor = trackData.accentColor;
  const accentBg = trackData.accentBg;
  const accentText = "#5d4b8a";

  const visibleSlots = [
    {
      title: "하루 단백질 섭취량 계산기",
      description: "체중과 활동량을 기준으로 하루 단백질 권장량을 바로 계산할 수 있는 현재 제공 도구입니다.",
      active: true,
    },
    {
      title: "단백질 음료 개수 계산기",
      description: "목표 섭취량을 기준으로 단백질 음료를 하루 몇 개 정도 조합하면 되는지 계산하는 확장 도구입니다.",
      active: false,
    },
    {
      title: "단백질 밀도 계산기",
      description: "용량 대비 또는 칼로리 대비 단백질 효율을 계산해 제품 비교를 더 쉽게 만드는 확장 도구입니다.",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>단백질 계산 & 도구</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: accentBg, color: accentColor }}
            >
              TRACK F
            </span>
            <span className="text-xs text-[#8b8b8b]">{trackData.slots.length}개 도구 주제</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질 계산 & 도구</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            체중과 활동량을 기준으로 하루 단백질 섭취량을 계산하고, 계산 결과를 실제 식사와 제품 선택에
            바로 연결해보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleSlots.map((slot) => (
              <div
                key={slot.title}
                className="flex h-full flex-col justify-between rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]"
              >
                <div>
                  <p className="text-xs font-semibold tracking-[0.08em]" style={{ color: slot.active ? accentText : "#8f8a84" }}>
                    {slot.active ? "AVAILABLE NOW" : "COMING NEXT"}
                  </p>
                  <h2 className="mt-2 text-base font-bold text-[var(--foreground)]">{slot.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{slot.description}</p>
                </div>

                {slot.active ? (
                  <Link
                    href="#daily-protein-calculator"
                    className="mt-5 inline-flex items-center text-sm font-semibold"
                    style={{ color: accentText }}
                  >
                    계산기 바로가기
                  </Link>
                ) : (
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#8b8b8b]">준비 중</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <ProteinToolsClient />

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">계산 결과는 어떻게 읽으면 될까?</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            계산기는 절대 정답을 주는 도구라기보다, 현재 체중과 활동량 기준으로 하루 총량의 기준선을 잡아주는
            역할에 가깝습니다.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">목적</th>
                  <th className="px-3 py-3 font-semibold">대략적인 범위</th>
                  <th className="px-3 py-3 font-semibold">해석</th>
                </tr>
              </thead>
              <tbody>
                {interpretationRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">📖 계산한 뒤 바로 이어서 하면 좋은 것</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {usageCards.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/guides/basics/daily-requirement"
              className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-4 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
            >
              권장량 가이드 보기
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-4 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
            >
              제품 비교 바로가기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
