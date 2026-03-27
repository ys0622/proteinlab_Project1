import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 음료 vs 프로틴 파우더 차이 | ProteinLab",
  description:
    "단백질 음료와 프로틴 파우더 중 무엇이 더 맞는지, 편의성·가성비·식사 보완·운동용 기준으로 쉽게 비교합니다.",
};

const rows = [
  ["편의성", "가장 편함", "타는 과정이 필요", "바로 마실 수 있는 쪽이 필요하면 음료가 유리합니다."],
  ["가성비", "상대적으로 높음", "상대적으로 좋음", "꾸준히 오래 먹을수록 파우더 쪽 단가가 내려갑니다."],
  ["입문 난이도", "낮음", "조금 높음", "맛과 타는 방식 때문에 초보자는 음료가 더 쉽습니다."],
  ["운동 집중 보충", "좋음", "더 자유로움", "파우더는 용량 조절과 조합이 더 쉽습니다."],
];

const links = [
  { href: "/guides/product-selection-comparison/protein-drink-beginners-guide", title: "단백질 음료 입문 가이드", body: "바로 마시는 쪽이 맞는 사람이라면 이 페이지부터 시작하는 편이 빠릅니다." },
  { href: "/guides/product-selection-comparison/protein-shake-guide", title: "단백질 쉐이크 가이드", body: "파우치형 쉐이크까지 포함해 더 가볍게 보고 싶다면 이쪽이 이어집니다." },
  { href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake", title: "음료 vs 쉐이크 비교", body: "RTD와 파우치형 사이에서 고민 중이면 이 비교가 더 직접적입니다." },
];

export default function ProteinDrinkVsPowderPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
            <span>/</span>
            <span>음료 vs 파우더</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료와 프로틴 파우더는
            <br />
            같은 단백질이어도 쓰임새가 꽤 다릅니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            음료는 간편함, 파우더는 가성비와 조절 자유도가 강점입니다. 무엇이 더 좋으냐보다 지금 생활에서
            더 잘 반복할 수 있는 쪽이 무엇인지가 핵심입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">한눈에 비교</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">단백질 음료</th>
                    <th className="px-3 py-3 font-semibold">프로틴 파우더</th>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">이런 사람은 음료가 더 잘 맞습니다</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {[
                "아침이나 출근길에 바로 마실 수 있는 제품이 필요하다.",
                "처음 시작이라 맛과 진입 장벽이 낮은 쪽이 좋다.",
                "쉐이커 준비와 세척이 번거롭게 느껴진다.",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#ece9e2] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#4c7a57]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">바로 이어서 볼 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {links.map((item) => (
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
