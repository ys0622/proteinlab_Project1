import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "글로벌 단백질 시장 | ProteinLab",
  description: "해외 단백질 시장 흐름과 국내 시장의 차이를 비교하고, 국내 제품 변화 방향을 읽는 법을 정리했습니다.",
};

const compareRows = [
  ["미국", "보충제·RTD·바·식사대용 모두 성숙", "기능별 세분화가 가장 앞서 있음. 식물성·퍼포먼스 특화 제품 다양"],
  ["유럽", "식물성·클린라벨 강세", "비건·오가닉·저첨가물 키워드가 주류. 프리미엄 포지션 중심"],
  ["일본", "노년 건강·기능성 식품 중심", "고령화에 대응한 단백질 강화 식품이 다양. 소용량·편의성 강점"],
  ["국내", "RTD 중심 대중화 → 세분화 진행 중", "편의점 채널 강점. 저당·워터형·식물성 확장 속도 빠름"],
];

const globalTrendCards = [
  {
    title: "식물성 단백질 확장",
    body: "미국·유럽을 중심으로 완두·대두·귀리 기반 식물성 단백질 제품이 빠르게 늘고 있습니다. 국내도 후발 주자로 진입 중입니다.",
    region: "미국·유럽",
  },
  {
    title: "퍼포먼스 특화 세분화",
    body: "운동 목적별로 지구력·근력·회복 등으로 제품이 더 세밀하게 나뉘고 있습니다. 성분 조합이 복잡해지는 추세입니다.",
    region: "미국",
  },
  {
    title: "고령층 단백질 강화",
    body: "일본·유럽을 중심으로 근감소증 예방 목적의 고령층 단백질 제품이 급성장하고 있습니다. 국내도 뉴케어·하이뮨이 이 방향입니다.",
    region: "일본·유럽",
  },
  {
    title: "간편 식사 대용화",
    body: "바쁜 라이프스타일에 맞춰 단백질 쉐이크·바가 식사를 대신하는 용도로 자리잡고 있습니다. 칼로리·포만감 설계가 핵심입니다.",
    region: "글로벌",
  },
];

const domesticImplications = [
  "해외에서 먼저 성장한 식물성·클린라벨 트렌드는 국내에서도 2~3년 내 주류화될 가능성이 높습니다.",
  "고령화가 빠른 국내에서 노년 단백질 시장은 이미 성장 중이며, 의료·복지 채널 연계 제품이 늘고 있습니다.",
  "글로벌 브랜드의 국내 진출이 늘수록 성분 투명성과 가격 경쟁력이 더 중요해질 수 있습니다.",
  "RTD 중심인 국내 시장은 향후 바·요거트·기능성 식품으로 카테고리가 확장될 가능성이 큽니다.",
];

export default function GlobalProteinMarketPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">시장 인사이트</Link>
            <span>/</span>
            <span>글로벌 단백질 시장</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            글로벌 단백질 시장과 국내는 어떻게 다를까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            해외 흐름을 보면 국내 시장이 어디쯤 와 있고, 어떤 방향으로 더 세분화될지 읽을 수 있습니다.
            <br />
            글로벌 트렌드는 국내 제품 변화의 선행 지표입니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">국가별 단백질 시장 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              각 시장의 성숙도와 주요 특징을 비교하면 국내 시장의 현재 위치가 보입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">국가</th>
                    <th className="px-3 py-3 font-semibold">시장 특징</th>
                    <th className="px-3 py-3 font-semibold">시사점</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td key={cell} className={`px-3 py-3 ${i === 0 ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">글로벌 핵심 트렌드 4가지</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              해외에서 먼저 성장한 트렌드는 국내에 2~3년 뒤 나타나는 경향이 있습니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {globalTrendCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">{card.region}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">국내 시장에 주는 시사점</h2>
            <ul className="mt-4 space-y-3">
              {domesticImplications.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/market-insights/protein-market-history"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                국내 시장 히스토리 보기 →
              </Link>
              <Link
                href="/guides/market-insights/ingredient-trends"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                성분 트렌드 보기 →
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                제품 비교하기 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
