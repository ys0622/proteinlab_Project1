import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "편의점에서 운동 전후 바로 살 수 있는 단백질 제품 | ProteinLab",
  description:
    "운동 전후 편의점에서 바로 살 수 있는 단백질 음료와 바를 상황별로 고르는 기준을 정리합니다.",
};

const rows = [
  ["운동 전", "가벼운 음료 또는 바", "부담이 적고 너무 무겁지 않은 제품이 유리합니다."],
  ["운동 직후", "20g대 RTD 또는 40g대 고단백", "회복 목적이라면 단백질 총량과 당류를 같이 봐야 합니다."],
  ["러닝 후 간단 보충", "워터형 또는 가벼운 RTD", "목 넘김이 편한 제품이 더 잘 맞습니다."],
];

const links = [
  { href: "/guides/product-selection-comparison/convenience-store-protein-guide", title: "편의점 단백질 가이드", body: "편의점에서 살 수 있는 음료와 제품군 전체를 먼저 훑어보기 좋습니다." },
  { href: "/guides/product-selection-comparison/convenience-protein-bar", title: "편의점 단백질 바", body: "씹는 제품이 더 맞는 상황이라면 여기서 바로 좁힐 수 있습니다." },
  { href: "/guides/product-selection-comparison/high-protein-40g-comparison", title: "40g 고단백 음료 비교", body: "운동 직후 확실한 보충이 필요할 때는 이 비교가 바로 이어집니다." },
];

const decisionCards = [
  {
    title: "운동 전",
    body: "가볍고 부담이 적은 쪽이 먼저입니다. 숫자보다 속이 편한지가 중요합니다.",
  },
  {
    title: "운동 후",
    body: "이때는 단백질 총량과 당류, 칼로리를 같이 보면서 회복용 제품을 고르는 편이 낫습니다.",
  },
  {
    title: "운동 종류에 따라",
    body: "러닝처럼 가볍게 끝난 날과 근력운동처럼 집중 보충이 필요한 날은 같은 제품이 맞지 않을 수 있습니다.",
  },
];

export default function ConvenienceStoreWorkoutProteinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>편의점 운동 전후 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 전후 편의점에서 바로 살 거라면
            <br />
            제품보다 타이밍부터 나눠서 봐야 합니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 전에는 부담이 적은 쪽이, 운동 후에는 회복 기준이 더 중요합니다.
            같은 편의점 제품이라도 타이밍이 다르면 맞는 선택이 달라집니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 전후로 나눠서 보기</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">잘 맞는 제품</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점에서 바로 살 때 놓치기 쉬운 것</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {[
                "운동 전인데 40g대 고단백을 바로 마시면 부담이 커질 수 있습니다.",
                "운동 후에는 단백질 숫자만이 아니라 당류와 칼로리도 같이 봐야 합니다.",
                "바와 음료는 포만감과 목넘김이 달라서 같은 기준으로 비교하면 안 됩니다.",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#ece9e2] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#8a4b2f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">결국은 이렇게 나눠서 보면 됩니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">바로 이어서 비교할 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {links.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
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
