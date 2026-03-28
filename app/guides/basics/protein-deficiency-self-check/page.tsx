import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 부족 자가체크 | ProteinLab",
  description:
    "단백질이 부족할 때 자주 보이는 신호를 간단히 체크하고, 부족 가능성이 높을 때 무엇부터 봐야 하는지 정리합니다.",
};

const checks = [
  "아침이나 점심을 자주 대충 넘기고 단백질 반찬을 잘 못 챙긴다.",
  "자주 피곤하고, 운동 후 회복이 전보다 느리게 느껴진다.",
  "체중 감량 중인데 배고픔이 심하고 근력 유지가 어렵다.",
  "부모님이나 본인이 나이가 들수록 식사량이 줄어 단백질 섭취가 불안하다.",
];

const nextSteps = [
  { href: "/guides/basics/daily-requirement", title: "하루 단백질 권장량", body: "부족 여부가 헷갈리면 먼저 내 체중 기준 권장량부터 확인하는 것이 정확합니다." },
  { href: "/guides/product-selection-comparison/protein-drink-beginners-guide", title: "입문용 단백질 음료", body: "식사에서 부족한 단백질을 간단히 보완하고 싶다면 처음 보는 이 페이지가 가장 쉽습니다." },
  { href: "/guides/product-selection-comparison/protein-drink-for-50s", title: "중장년 보완용 제품", body: "시니어·부모님용 보완이 목적이면 이쪽 비교가 더 직접적입니다." },
];

const cautionNotes = [
  "이 페이지는 생활 패턴 점검용이지 의학적 진단 기준은 아닙니다.",
  "피로, 부종, 회복 저하가 오래 지속되면 다른 원인도 함께 확인해야 합니다.",
  "체중 감량 중이라면 단백질 부족과 총칼로리 부족이 같이 오는 경우가 많습니다.",
];

export default function ProteinDeficiencySelfCheckPage() {
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
            <span>자가체크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 부족은 갑자기 오기보다
            <br />
            생활 패턴에서 먼저 드러나는 경우가 많습니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            아래 항목에 여러 개가 해당되면 식사 구성과 단백질 보완 방법을 같이 점검하는 편이 좋습니다.
            이 페이지는 병원 진단이 아니라 생활 기준에서 빠르게 확인하는 용도입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">빠르게 체크해보기</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {checks.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#ece9e2] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#4c7a57]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">2개 이상 해당되면 무엇부터 보면 되나</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["1. 권장량 확인", "내 체중 기준 하루 총량이 어느 정도인지 먼저 알아야 부족 여부가 선명해집니다."],
                ["2. 식사 패턴 점검", "고기, 계란, 유제품, 콩류가 실제로 하루에 얼마나 들어가는지 생각해봐야 합니다."],
                ["3. 보완 방식 선택", "식사만으로 채우기 어렵다면 음료나 쉐이크처럼 반복 가능한 방식이 필요합니다."],
              ].map((item) => (
                <article key={item[0]} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item[1]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">헷갈리기 쉬운 점</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {cautionNotes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#ece9e2] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#4c7a57]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 이어서 보면 좋은 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {nextSteps.map((item) => (
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
