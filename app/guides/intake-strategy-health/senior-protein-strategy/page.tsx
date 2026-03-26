import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "50대·시니어 단백질 전략 | 근감소 예방과 쉬운 섭취법",
  description:
    "50대 이상과 시니어가 단백질을 어떻게 나눠 먹어야 하는지, 근감소 예방과 소화 부담을 함께 고려한 실전 기준을 정리했습니다.",
};

const seniorTips = [
  "한 번에 많이 먹기보다 아침, 간식, 저녁으로 나눠 넣는 쪽이 실제 루틴 유지에 더 유리합니다.",
  "단백질 수치만 높다고 좋은 게 아니라 목넘김, 위 부담, 맛 적응까지 같이 봐야 오래 갑니다.",
  "건강 유지 목적이라면 당류, 칼로리, 나트륨까지 함께 봐야 매일 반복하기 쉽습니다.",
];

const seniorRows = [
  ["아침", "부담 적은 시작", "공복 시간이 길었다면 아침에 가볍게 단백질을 넣어 하루 루틴을 안정적으로 시작하는 쪽이 좋습니다."],
  ["오후 간식", "소량 보완", "점심과 저녁 사이가 길다면 간식 구간에 소량 보완을 넣는 것이 총량 유지에 유리합니다."],
  ["저녁", "과하지 않게 마무리", "하루 총량이 부족할 때 저녁에 보완하되, 위 부담이 적은 제품을 고르는 편이 좋습니다."],
];

const seniorChecks = [
  {
    title: "나눠 먹는 루틴 만들기",
    body: "시니어는 한 번에 몰아 먹기보다 생활 안에 자연스럽게 나눠 넣는 방식이 더 현실적입니다. 총량도 결국 이 방식이 더 잘 채워집니다.",
  },
  {
    title: "부드러운 형태부터 보기",
    body: "딱딱한 바나 무거운 식감보다 RTD, 요거트, 가벼운 식사보완형이 더 잘 맞는 경우가 많습니다.",
  },
  {
    title: "당류와 나트륨도 같이 확인",
    body: "건강 유지 목적이라면 단백질만 높다고 끝이 아닙니다. 매일 마실 제품이라면 당류와 나트륨 차이가 누적됩니다.",
  },
];

const seniorRelated = [
  {
    href: "/guides/product-selection-comparison/protein-drink-for-50s",
    title: "50대 단백질 음료 추천으로 바로 가기",
    body: "기준은 알겠고 이제 실제 제품을 고르고 싶다면, 시니어 관점으로 좁혀 놓은 이 비교 페이지가 가장 빠릅니다.",
  },
  {
    href: "/guides/product-selection-comparison/newcare-allprotein",
    title: "뉴케어 올프로틴 분석",
    body: "락토프리, 균형영양, 50대 보완용까지 같이 보려면 뉴케어 페이지를 바로 이어서 보는 편이 좋습니다.",
  },
  {
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    title: "식사대용 전략",
    body: "식사를 자주 거르거나 한 끼가 약한 루틴이라면 보충용과 식사보완형을 나눠 보는 이 페이지가 같이 필요합니다.",
  },
];

export default function SeniorProteinStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>50대·시니어 단백질 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            50대 이후 단백질은
            <br />
            많이보다 쉽게, 꾸준히가 더 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            근감소 예방은 한 번에 많이 먹는 것보다 부담 없이 자주 챙기는 루틴에서 갈립니다. 숫자만 높은 제품보다 실제로 계속 먹을 수 있는 방식이 더 중요하고, 그다음에 제품 선택이 따라와야 합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <div className="rounded-2xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">SENIOR ROUTINE</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              시니어 전략은 수치 경쟁보다 반복 가능한 루틴을 만드는 쪽에 가깝습니다. 아침, 간식, 저녁으로 나눠 넣는 흐름이 가장 현실적입니다.
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            {seniorTips.map((item) => (
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
                  <th className="px-3 py-3 font-semibold">구간</th>
                  <th className="px-3 py-3 font-semibold">포인트</th>
                  <th className="px-3 py-3 font-semibold">실전 해석</th>
                </tr>
              </thead>
              <tbody>
                {seniorRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">시니어가 특히 먼저 봐야 할 포인트</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {seniorChecks.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">SENIOR NOTE</p>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            시니어 루틴에서는 숫자보다 부담 없이 반복할 수 있는 방식이 더 중요합니다. 그래서 맛과 위장 부담까지 함께 확인하는 편이 좋습니다.
          </p>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">관련 가이드</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {seniorRelated.map((item) => (
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
