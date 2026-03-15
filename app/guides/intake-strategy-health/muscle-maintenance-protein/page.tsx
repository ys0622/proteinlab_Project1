import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "근육 유지 단백질 전략 | ProteinLab",
  description:
    "감량기와 운동 병행 상황에서 근육을 유지하려면 하루 총량과 분산 섭취를 어떻게 봐야 하는지 정리했습니다.",
};

const maintenancePoints = [
  "감량기라면 운동 후 한 번보다 하루 총량을 먼저 맞추는 편이 더 중요합니다.",
  "운동하지 않는 날에도 단백질 루틴을 유지하는 것이 근육 유지에 유리합니다.",
  "제품은 식사를 대체하기보다 식사 계획을 보완하는 도구로 보는 편이 안정적입니다.",
];

const maintenanceMatrix = [
  ["감량기", "총량 유지", "체중 감량 중에도 근손실을 줄이려면 일단 총량이 무너지지 않아야 합니다."],
  ["근력 운동 병행", "운동 후 + 하루 분산", "회복용 보충과 전체 루틴을 같이 잡아야 합니다."],
  ["바쁜 일정", "간식 루틴 확보", "아침이나 오후 간식에 보완 지점을 만들면 총량 유지가 쉬워집니다."],
];

export default function MuscleMaintenanceProteinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략 & 건강
            </Link>
            <span>/</span>
            <span>근육 유지 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            근육 유지는
            <br />
            총량과 분배를 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            감량 중이든, 운동을 쉬는 주이든 단백질 루틴이 유지되는 것이 근육 유지의 기본입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <div className="rounded-2xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">MUSCLE-MAINTENANCE MAP</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              근육 유지의 핵심은 운동 직후 한 번이 아니라, 하루 총량이 반복적으로 유지되는 루틴입니다.
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            {maintenancePoints.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">상황</th>
                  <th className="px-3 py-3 font-semibold">우선 기준</th>
                  <th className="px-3 py-3 font-semibold">실전 해석</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceMatrix.map((row) => (
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
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">MUSCLE NOTE</p>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            근육 유지 전략은 고단백 제품을 더 많이 사는 것이 아니라, 주간 총량이 흔들리지 않게 보완 지점을 만드는 데서 시작됩니다.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
