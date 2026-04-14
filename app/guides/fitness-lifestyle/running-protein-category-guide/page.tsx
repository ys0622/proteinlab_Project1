import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "러닝하는 사람은 음료·바·쉐이크 중 뭐가 맞을까 | 상황별 단백질 선택법",
  description:
    "러닝 전후와 출근 전, 장거리 훈련일, 가벼운 회복일에 단백질 음료, 바, 쉐이크 중 무엇이 맞는지 상황별로 정리합니다.",
};

const categoryRows = [
  ["단백질 음료", "최상", "중", "낮음~중간", "운동 후 빠른 보충, 출근 직후, 편의점 구매"],
  ["단백질 바", "상", "중~상", "중간", "이동 중 간식, 장거리 전후 가벼운 보완, 야외 활동"],
  ["단백질 쉐이크", "중", "상", "중간~높음", "아침 대용, 식사 보완, 포만감이 필요한 러너"],
];

const decisionCards = [
  {
    title: "운동 직후 바로 보충해야 한다",
    body: "마시는 속도와 휴대성 때문에 음료가 가장 실용적입니다. 회복용이면 20g대 RTD부터 보면 됩니다.",
    label: "우선 후보: 단백질 음료",
  },
  {
    title: "이동 중 허기를 막고 싶다",
    body: "런 직후 식사까지 시간이 길다면 바가 더 버티기 쉽습니다. 다만 당류와 칼로리는 반드시 같이 봐야 합니다.",
    label: "우선 후보: 단백질 바",
  },
  {
    title: "아침 한 끼를 대신하고 싶다",
    body: "러닝 전후보다 식사 보완이 목적이면 쉐이크가 더 잘 맞습니다. 포만감과 식이섬유가 같이 붙는 경우가 많습니다.",
    label: "우선 후보: 단백질 쉐이크",
  },
];

const situationRows = [
  ["출근 전 가벼운 러닝", "가벼운 RTD 또는 소량 바", "공복 부담이 크지 않게, 끝나고 바로 보충 가능한 쪽이 낫습니다."],
  ["퇴근 후 러닝", "RTD", "운동 직후 바로 마시고 귀가 후 식사로 이어가기 좋습니다."],
  ["주말 장거리 러닝", "바 + 물 또는 운동 후 RTD", "훈련 시간이 길어질수록 휴대성과 허기 관리가 같이 중요해집니다."],
  ["체중 관리 중 러닝", "저당 RTD 또는 저당 쉐이크", "단백질만 볼 게 아니라 총칼로리와 당류를 먼저 거르는 쪽이 안전합니다."],
];

const mistakes = [
  "러닝도 운동이니까 무조건 40g 고단백 제품부터 찾는 경우",
  "단백질 바는 간식이라 가볍다고 생각하고 당류와 칼로리를 놓치는 경우",
  "아침 대용이 필요한데 포만감이 약한 RTD만 계속 고르는 경우",
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "러닝 후 마시기 쉬운 음료 보기",
    body: "운동 직후 빠르게 보충할 RTD를 먼저 고르고 싶다면 입문형 음료 비교에서 바로 후보를 좁힐 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "카테고리 전체 비교 보기",
    body: "러닝 말고도 일반 상황에서 음료, 바, 쉐이크가 어떻게 다른지 먼저 넓게 보고 싶다면 이 페이지가 맞습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-bar-top10",
    title: "단백질 바 추천 보기",
    body: "휴대성과 허기 방어가 중요하다면 바 카테고리 안에서 어떤 제품이 나은지 바로 비교할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-shake-top7",
    title: "쉐이크 추천 보기",
    body: "아침 대용이나 포만감 중심으로 보면 쉐이크가 더 잘 맞을 수 있습니다. 상위 후보를 바로 비교할 수 있습니다.",
  },
];

export default function RunningProteinCategoryGuidePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/fitness-lifestyle/running-protein-category-guide' });
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>러닝하는 사람은 음료·바·쉐이크 중 뭐가 맞을까</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            러닝하는 사람에게 맞는 단백질 제품은
            <br />
            음료, 바, 쉐이크가 전부 다를 수 있습니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            러닝에서는 무조건 고단백 제품을 찾는 것보다 운동 직후 회복, 이동 중 허기 방어,
            아침 대용 같은 상황을 먼저 나누는 편이 더 실전적입니다. 같은 러너라도 언제 먹는지에 따라 맞는 카테고리가 달라집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">러닝 기준 카테고리 비교</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">카테고리</th>
                    <th className="px-3 py-3 font-semibold">편의성</th>
                    <th className="px-3 py-3 font-semibold">포만감</th>
                    <th className="px-3 py-3 font-semibold">소화 부담</th>
                    <th className="px-3 py-3 font-semibold">잘 맞는 상황</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryRows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">결국은 이렇게 고르면 됩니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                  <p className="mt-3 inline-flex rounded-full bg-[#eff7f1] px-3 py-1 text-[11px] font-semibold text-[#2d6a4f]">
                    {card.label}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별 빠른 판단</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 후보</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {situationRows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">러너가 많이 하는 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {mistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 바로 비교하기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
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
