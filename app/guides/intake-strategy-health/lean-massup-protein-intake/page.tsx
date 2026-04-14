import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "린매스업 단백질 섭취량 계산 | 체중별로 몇 g 먹어야 할까";
const _pageDesc = "린매스업 단백질 섭취량을 체중별로 계산하는 기준을 정리했습니다. 체중 60kg·70kg·80kg 예시, 쉬는 날 운영, 끼니별 배분, 쉐이크 활용법까지 한 번에 확인할 수 있습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/lean-massup-protein-intake" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/lean-massup-protein-intake",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const intakeRows = [
  ["60kg", "108~132g", "식사 3~4회로 나누면 끼니당 27~33g 수준"],
  ["70kg", "126~154g", "린매스업 입문자가 가장 많이 참고하는 구간"],
  ["80kg", "144~176g", "운동 빈도가 높다면 상단 범위를 보기 쉬움"],
  ["90kg", "162~198g", "총량보다 매일 비슷하게 유지하는 것이 더 중요"],
];

const examplePlanRows = [
  ["아침", "그릭요거트 + 달걀 + 우유", "25~30g", "공복 시간이 길다면 가장 먼저 보완할 구간"],
  ["점심", "일반식 + 단백질 반찬", "30~40g", "식사 한 끼당 기준점을 잡는 구간"],
  ["운동 전후", "가벼운 식사 또는 쉐이크", "20~30g", "운동 직후 식사가 어렵다면 보완용 활용"],
  ["저녁", "살코기·생선·두부 중심 식사", "30~40g", "하루 총량을 안정적으로 마무리하는 구간"],
];

const keyPoints = [
  "린매스업은 많이 먹는 벌크업보다 단백질 총량과 칼로리 균형을 더 정교하게 맞추는 방식에 가깝습니다.",
  "하루 단백질은 체중 1kg당 1.6~2.2g 범위에서 보고, 실전 출발점은 1.8~2.0g/kg 전후가 무난합니다.",
  "운동하는 날에만 몰아먹기보다 쉬는 날에도 비슷한 총량을 유지하는 편이 회복과 식단 유지에 유리합니다.",
];

const audienceCards = [
  {
    title: "근육은 늘리고 싶지만 체지방은 과하게 올리고 싶지 않을 때",
    body: "린매스업은 벌크업처럼 무조건 많이 먹기보다, 근육 증가와 체지방 관리의 균형을 잡고 싶은 사람에게 맞습니다.",
  },
  {
    title: "식사량이 많지 않아도 기준은 잡고 싶을 때",
    body: "한 번에 많이 먹기 어려운 사람일수록 체중 기준 목표량과 끼니별 분배부터 보는 편이 훨씬 실전적입니다.",
  },
  {
    title: "운동 루틴은 있는데 먹는 양이 들쭉날쭉할 때",
    body: "운동 강도보다 식사 총량이 흔들리는 경우가 많습니다. 이때 가장 먼저 고정해야 할 숫자가 단백질 총량입니다.",
  },
];

const routineCards = [
  {
    title: "총량 먼저",
    body: "린매스업에서는 단백질을 한 번에 많이 먹는 것보다 하루 전체 목표량을 꾸준히 맞추는 편이 더 중요합니다.",
  },
  {
    title: "끼니별 분배",
    body: "하루 목표량을 3~5회로 나누면 공복 시간이 줄고 실제 식단에 적용하기도 쉬워집니다.",
  },
  {
    title: "보충은 보완용",
    body: "단백질 음료나 쉐이크는 식사를 대신하기보다 부족한 총량을 메우는 보완 수단으로 보는 편이 맞습니다.",
  },
];

const faqItems = [
  {
    question: "린매스업이면 체중 1kg당 단백질을 몇 g 먹어야 하나요?",
    answer:
      "보통 하루 1.6~2.2g/kg 범위에서 잡고, 실전 시작점은 1.8~2.0g/kg 전후가 무난합니다.",
  },
  {
    question: "운동 안 하는 날에도 단백질을 비슷하게 먹어야 하나요?",
    answer:
      "네. 쉬는 날에도 근육 회복은 이어지기 때문에 총량을 크게 낮추지 않는 편이 더 안정적입니다.",
  },
  {
    question: "단백질을 한 번에 많이 먹으면 더 좋은가요?",
    answer:
      "하루 총량이 가장 중요하지만, 실제 생활에서는 끼니별로 나눠 먹는 편이 더 유지하기 쉽습니다.",
  },
  {
    question: "린매스업 때 쉐이크는 꼭 필요한가요?",
    answer:
      "필수는 아닙니다. 식사만으로 충분히 채워지면 괜찮고, 식사 간격이 길거나 운동 직후 식사가 어려울 때 보완용으로 쓰면 됩니다.",
  },
  {
    question: "린매스업이면 탄수화물보다 단백질을 더 우선해야 하나요?",
    answer:
      "단백질 기준을 먼저 잡는 것이 편하지만, 실제 린매스업은 단백질만으로 완성되지 않습니다. 단백질을 안정적으로 맞춘 뒤 운동 강도와 체중 변화를 보며 탄수화물과 총칼로리를 같이 조정해야 합니다.",
  },
  {
    question: "단백질바나 요거트도 린매스업용 보완 식품으로 쓸 수 있나요?",
    answer:
      "가능합니다. 다만 운동 직후처럼 빠르게 보완해야 하는 상황엔 쉐이크나 RTD가 더 편하고, 간식형 보완이나 오전·오후 공백을 메우는 용도라면 바나 요거트가 더 잘 맞을 수 있습니다.",
  },
];

const relatedGuides = [
  {
    href: "/guides/intake-strategy-health/post-workout-protein",
    title: "운동 직후 보완 기준 보기",
    body: "운동 직후 단백질을 언제, 어떤 방식으로 넣을지부터 정리하고 싶다면 이 페이지가 먼저 맞습니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "내 루틴에 맞는 배분법 보기",
    body: "하루 총량뿐 아니라 아침, 간식, 운동 후 배분까지 함께 보고 싶다면 연결해서 보기 좋습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-shake-guide",
    title: "보완용 쉐이크 기준 보기",
    body: "식사로 채우기 어려운 날에 어떤 쉐이크를 보완용으로 쓰면 좋을지 제품 기준으로 이어집니다.",
  },
];

const actionLinks = [
  {
    href: "/guides/product-selection-comparison/protein-shake-guide",
    title: "식사 사이 보완용 쉐이크 찾기",
    body: "식사만으로 채우기 어려운 날에 바로 연결할 수 있는 쉐이크 가이드",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-guide",
    title: "운동 직후용 음료 바로 비교하기",
    body: "운동 직후나 간편 보충용으로 맞는 음료 제품군 비교",
  },
  {
    href: "/tools/calculator",
    title: "내 체중 기준 섭취량 다시 계산하기",
    body: "체중, 목표에 맞춰 섭취량 계산부터 다시 확인",
  },
];

export default function LeanMassupProteinIntakePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/lean-massup-protein-intake' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략 · 건강
            </Link>
            <span>/</span>
            <span>린매스업 단백질 섭취량</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            린매스업 단백질 섭취량,
            <br />
            체중별로 몇 g 먹어야 할까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            린매스업은 많이 먹는 벌크업보다 단백질 총량과 식사 구조를 더 정교하게 맞추는 방식에 가깝습니다. 이
            초안에서는 체중별 기준, 쉬는 날 운영, 끼니별 분배, 실제 제품 탐색까지 한 흐름으로 정리합니다. 먼저 기준을
            잡고, 그다음 내 루틴에 맞는 제품군으로 바로 넘어가는 순서가 가장 편합니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/guides/product-selection-comparison/protein-shake-guide"
              className="inline-flex items-center rounded-full bg-[#24543d] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              식사 사이 보완용 쉐이크 찾기
            </Link>
            <Link
              href="/guides/intake-strategy-health/protein-timing"
              className="inline-flex items-center rounded-full border border-[#cfd8d1] bg-white px-4 py-2 text-sm font-semibold text-[#24543d] transition-colors hover:border-[#24543d]"
            >
              내 루틴에 맞는 배분법 보기
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="rounded-2xl border border-[#dce8df] bg-white px-4 py-4">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#7a5230]">LEAN MASSUP SNAPSHOT</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                린매스업은 칼로리를 무작정 올리는 방식보다, 단백질 총량과 식사 구조를 안정적으로 가져가는 접근에 더
                가깝습니다. 먼저 체중 기준 목표 범위를 잡고, 그다음 끼니별 배분과 제품 활용을 조정하는 순서가 편합니다.
              </p>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {keyPoints.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7a5230]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">린매스업 단백질 섭취량이 특히 중요한 사람은 누구일까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {audienceCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중 60kg, 70kg, 80kg이면 단백질을 얼마나 먹어야 할까</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              실전에서는 하루 단백질을 체중 1kg당 1.6~2.2g 범위에서 보고, 대부분은 1.8~2.0g/kg 전후에서 출발하면
              무난합니다. 아래 표는 페이지 초안 기준으로 바로 적용할 수 있는 시작점입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-[#fdfdfd]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">체중</th>
                    <th className="px-3 py-3 font-semibold">하루 권장 범위</th>
                    <th className="px-3 py-3 font-semibold">실전 해석</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeRows.map((row) => (
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
            <div className="mt-5 rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
              <p className="text-sm font-semibold text-[#24543d]">표에서 본 숫자를 바로 제품 선택으로 연결하려면</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                하루 목표량이 잡혔다면 이제는 숫자를 외우는 단계보다, 내 식사 공백을 어떤 제품으로 메울지 고르는 단계가
                더 중요합니다. 운동 직후 보완이 필요하면 쉐이크, 간편 섭취가 우선이면 RTD 음료부터 보는 편이 가장 빠릅니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/guides/product-selection-comparison/protein-shake-guide"
                  className="inline-flex items-center rounded-full bg-[#24543d] px-4 py-2 text-sm font-semibold text-white"
                >
                  린매스업용 쉐이크 보러가기
                </Link>
                <Link
                  href="/guides/product-selection-comparison/protein-drink-guide"
                  className="inline-flex items-center rounded-full border border-[#cfd8d1] bg-white px-4 py-2 text-sm font-semibold text-[#24543d]"
                >
                  운동 직후용 음료 비교하기
                </Link>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">린매스업 단백질 섭취량은 어떤 순서로 맞추면 쉬울까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {routineCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">린매스업 식단에 넣으면 단백질 배분이 어떻게 달라질까</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              예를 들어 70kg 기준으로 하루 130~140g 전후를 목표로 잡았다면, 한 번에 몰아넣기보다 아래처럼 식사와 보완
              타이밍을 나눠서 채우는 편이 현실적입니다. 이 표는 정확한 식단표라기보다 배분 감각을 잡기 위한 실전 예시입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-[#fdfdfd]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">구간</th>
                    <th className="px-3 py-3 font-semibold">예시 구성</th>
                    <th className="px-3 py-3 font-semibold">단백질 감각</th>
                    <th className="px-3 py-3 font-semibold">실전 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {examplePlanRows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[var(--foreground)]">린매스업 단백질 섭취량, 실전에서는 어떻게 적용할까</h2>
              <span className="rounded-full border border-[#d7dfda] bg-[#f7fbf8] px-3 py-1 text-[11px] font-semibold text-[#24543d]">
                초안 검토용
              </span>
            </div>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--foreground-muted)]">
              <p>
                린매스업은 근육 증가를 목표로 하지만, 일반 벌크업처럼 칼로리를 크게 남기는 방식과는 결이 다릅니다.
                그래서 아무거나 많이 먹기보다 단백질 총량과 전체 식단 구조를 더 정교하게 맞출 필요가 있습니다. 이때
                단백질은 근육 합성의 재료 역할을 하기 때문에 가장 먼저 기준을 잡아야 하는 영양소입니다.
              </p>
              <p>
                실전에서는 하루 단백질을 체중 1kg당 1.6~2.2g 범위에서 보고, 대부분은 1.8~2.0g/kg 전후에서 시작하면
                무난합니다. 예를 들어 70kg라면 하루 126~154g 정도가 기준선이고, 처음에는 130~140g 수준을 안정적으로
                유지하는 것부터 시작해도 충분합니다. 린매스업은 하루만 많이 먹는 방식보다 비슷한 수준을 꾸준히 유지하는
                방식이 훨씬 중요합니다.
              </p>
              <p>
                운동하는 날에는 단백질을 더 신경 쓰게 되지만, 쉬는 날이라고 해서 총량을 크게 줄일 필요는 없습니다.
                근육 회복은 운동 직후 한두 시간만의 문제가 아니라 하루 이상 이어지는 과정이기 때문입니다. 운동하는 날은
                운동 전후 배치를 더 촘촘하게 가져가고, 쉬는 날에는 간식형 보충을 약간 줄이는 정도의 조정이 현실적입니다.
              </p>
              <p>
                하루 총량만 맞추면 끝이라고 생각하기 쉽지만, 실제 생활에서는 끼니별 분배도 중요합니다. 하루 140g이
                목표라면 두 끼에 몰아넣기보다 30~40g 수준으로 4번 정도 나누는 편이 훨씬 유지하기 쉽습니다. 아침, 점심,
                운동 전후, 저녁처럼 분산하면 공복 시간이 길어지는 문제도 줄일 수 있습니다.
              </p>
              <p>
                식사는 기본이고, 쉐이크와 단백질 음료는 부족한 총량을 메우는 보완 수단으로 보는 편이 좋습니다. 운동
                직후 식사를 바로 하기 어려운 날이나, 하루 단백질 목표량이 식사만으로 잘 안 채워지는 날에는 보충 제품이
                꽤 유용합니다. 반대로 식사만으로 충분히 채워진다면 굳이 매일 여러 번 추가할 필요는 없습니다.
              </p>
              <p>
                제품을 고를 때도 무조건 고단백이라는 이유만으로 결정하기보다, 내 루틴에서 어느 자리를 채울 제품인지를
                먼저 정하는 편이 좋습니다. 아침 공백을 메우는 용도인지, 운동 직후 빠르게 보완할 제품인지, 오후 간식처럼
                씹는 제품이 필요한지에 따라 적합한 카테고리가 달라집니다. 린매스업의 핵심은 많이 사는 것이 아니라,
                끊기지 않는 루틴을 만드는 쪽에 있습니다.
              </p>
              <p>
                그래서 이 콘텐츠의 다음 단계는 단순히 숫자를 외우는 것이 아니라, 내 체중 기준 목표량을 잡은 뒤 그 양을
                어떤 식사와 제품으로 메울지 연결하는 것입니다. 숫자만 알아도 실행이 안 되면 의미가 없고, 반대로 기준이
                없이 제품만 늘리면 과하게 먹기 쉽습니다. 기준과 실행 순서를 같이 보는 것이 린매스업 쪽 콘텐츠에서 가장
                중요합니다.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-[#e6ddd0] bg-[#fffaf3] p-4">
              <p className="text-sm font-semibold text-[#7a5230]">다음 행동으로 넘어가기</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                이 초안에서 숫자 감이 잡혔다면, 다음은 내 루틴에서 가장 자주 비는 시간을 메울 제품을 고르는 단계입니다.
                운동 직후인지, 식사 사이인지, 계산부터 다시 필요한지에 따라 바로 아래에서 갈라서 보면 됩니다.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {actionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-[#eadfce] bg-white p-4 transition-colors hover:bg-[#fffdf9]"
                  >
                    <h3 className="text-sm font-semibold text-[#7a5230]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">린매스업 때 가장 많이 헷갈리는 3가지는 무엇일까</h2>
            <div className="mt-5 space-y-3">
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">1. 단백질만 많이 먹으면 린매스업이 되는 것은 아닙니다</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  단백질은 기준을 잡는 출발점이지만, 실제 결과는 총칼로리와 탄수화물 배치, 운동 강도까지 함께 봐야
                  달라집니다. 단백질 기준을 먼저 잡되 그것만으로 모든 것을 해결하려는 접근은 피하는 편이 좋습니다.
                </p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">2. 쉬는 날에 확 줄이면 주간 총량이 흔들립니다</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  운동하는 날만 챙기고 쉬는 날을 비우면 일주일 단위에서는 생각보다 큰 차이가 납니다. 쉬는 날에도 비슷한
                  구조를 유지하는 편이 식단을 장기적으로 안정시키기 쉽습니다.
                </p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">3. 보충 제품은 식사 실패를 메우는 용도로 써야 합니다</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  제품 자체가 나쁜 것은 아니지만, 메인 식사를 전부 대체하기 시작하면 포만감과 식사 만족도가 떨어질 수
                  있습니다. 빈 시간대를 메우는 보완용이라는 기준을 유지하는 편이 더 오래 갑니다.
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">린매스업 단백질 섭취량 FAQ</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">관련 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedGuides.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white"
                >
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
