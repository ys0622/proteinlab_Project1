import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "근육 유지 단백질 전략 | 감량기와 운동 병행 때 먼저 볼 기준",
  description:
    "감량기나 운동 병행 상황에서 근육량을 지키려면 단백질을 어떻게 나눠 먹어야 하는지, 총량과 분산 기준을 실전 중심으로 정리했습니다.",
};

const maintenancePoints = [
  "감량기라면 운동 직후 한 번보다 주간 총량을 먼저 맞추는 쪽이 더 중요합니다.",
  "운동하지 않는 날에도 단백질 루틴을 유지하는 편이 근육 유지에 더 유리합니다.",
  "보충제는 식사를 대체하기보다 식사 계획을 보완하는 도구로 보는 편이 안정적입니다.",
];

const maintenanceMatrix = [
  ["감량기", "총량 유지", "체중을 줄이는 동안에도 주간 총량이 무너지지 않아야 근육 유지가 쉬워집니다."],
  ["근력 운동 병행", "운동 후 + 하루 분산", "운동 직후 한 번보다 하루 전체에 나눠 먹는 구조가 더 안정적입니다."],
  ["바쁜 일정", "간식 루틴 고정", "점심 전후나 오후 간식처럼 반복 가능한 자리에 보완 루틴을 두면 총량 유지가 쉬워집니다."],
];

const maintenanceSteps = [
  {
    title: "1단계: 먼저 내 목표를 구분하기",
    body: "근육을 늘리는 단계와 유지하는 단계는 기준이 다릅니다. 유지 단계라면 숫자를 올리기보다 루틴이 끊기지 않는 쪽이 더 중요합니다.",
  },
  {
    title: "2단계: 운동하는 날과 쉬는 날을 같이 보기",
    body: "운동하는 날만 챙기면 주간 단위에선 총량이 쉽게 흔들립니다. 쉬는 날에도 가벼운 보충 루틴이 필요할 수 있습니다.",
  },
  {
    title: "3단계: 식사 사이 공백을 줄이기",
    body: "아침을 거르거나 오후 공백이 길다면 그 구간이 근육 유지 전략의 핵심입니다. 가장 자주 비는 시간대부터 메우는 편이 효과적입니다.",
  },
];

const relatedGuides = [
  {
    href: "/guides/intake-strategy-health/post-workout-protein",
    title: "운동 후 단백질 가이드",
    body: "근육 유지에 운동 직후 보충이 어느 정도 의미가 있는지 먼저 함께 보면 판단이 쉬워집니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "단백질 섭취 타이밍",
    body: "근육 유지 전략은 결국 하루 안에서 어떻게 나눠 먹느냐의 문제라 타이밍 페이지와 연결해서 보는 편이 좋습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-by-content",
    title: "함량대별 단백질 음료",
    body: "유지용으로 20g대가 맞는지, 더 높은 함량이 필요한지 제품 선택 기준까지 바로 이어서 볼 수 있습니다.",
  },
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
              섭취 전략·건강
            </Link>
            <span>/</span>
            <span>근육 유지 단백질 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            근육 유지는
            <br />
            총량과 분산을 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            감량 중이든 운동을 병행하든 근육 유지 전략은 한 번에 몰아 먹는 방식보다 꾸준히 나눠 챙기는 루틴에서 갈립니다.
            운동 직후 한 번보다 주간 총량과 반복 가능한 구조가 더 중요합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <div className="rounded-2xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">MUSCLE-MAINTENANCE MAP</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              근육 유지 전략은 운동 직후 한 번이 아니라 일주일 전체 루틴을 보는 쪽에 가깝습니다. 총량과 분산이 같이 맞아야 오래 갑니다.
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
          <h2 className="text-xl font-bold text-[var(--foreground)]">근육 유지용 선택 순서</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {maintenanceSteps.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">MUSCLE NOTE</p>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            근육 유지 전략은 고단백 제품을 많이 먹는 것이 아니라, 부족한 시간대를 계속 메우는 루틴을 만드는 데서 시작합니다.
            그래서 운동 후 한 번보다 아침, 간식, 저녁 전 공백을 먼저 보는 편이 더 실전적입니다.
          </p>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">관련 가이드</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {relatedGuides.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
