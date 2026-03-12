import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질은 몸에서 어떤 일을 할까? | ProteinLab",
  description:
    "근육, 면역, 호르몬, 회복까지. 단백질의 역할을 그래프와 핵심 카드 중심으로 직관적으로 정리한 가이드입니다.",
};

const roleStats = [
  { label: "근육", share: "20~25%", detail: "움직임과 회복의 핵심" },
  { label: "피부·결합조직", share: "15~20%", detail: "콜라겐과 구조 단백질" },
  { label: "기관·혈액", share: "10~15%", detail: "효소·운반 단백질 포함" },
];

const roleCards = [
  {
    title: "근육 회복과 성장",
    body: "운동 후 단백질은 손상된 근섬유를 복구하고 다음 훈련에 버틸 수 있는 회복 기반을 만듭니다.",
    accent: "운동 직후 20~40g",
    href: "/guides/basics/muscle",
  },
  {
    title: "면역과 호르몬 조절",
    body: "항체, 사이토카인, 인슐린과 성장호르몬처럼 몸의 조절 시스템에도 단백질이 핵심 재료로 작동합니다.",
    accent: "항체·호르몬·효소",
    href: "/guides/basics/immunity-hormone",
  },
  {
    title: "부족 신호와 회복 저하",
    body: "단백질이 부족하면 피로, 근육 감소, 면역 저하, 부종처럼 작지만 반복되는 신호가 먼저 나타날 수 있습니다.",
    accent: "결핍 신호 체크",
    href: "/guides/basics/deficiency-symptoms",
  },
];

function RoleBar({ label, share, detail, width }: { label: string; share: string; detail: string; width: string }) {
  return (
    <div className="rounded-[22px] border border-[#d9e7dc] bg-white p-4 shadow-[0_12px_32px_rgba(24,52,38,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#163725]">{label}</p>
        <span className="rounded-full bg-[#eef7f1] px-3 py-1 text-[11px] font-semibold text-[#24543d]">{share}</span>
      </div>
      <div className="mt-3 h-3 rounded-full bg-[#edf3ef]">
        <div className="h-3 rounded-full bg-[linear-gradient(90deg,#2d6a4f_0%,#74a67f_100%)]" style={{ width }} />
      </div>
      <p className="mt-3 text-sm leading-6 text-[#58665d]">{detail}</p>
    </div>
  );
}

export default function ProteinFunctionsPage() {
  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <Header />

      <section className="w-full border-b border-t border-[#dce8df] bg-[linear-gradient(180deg,#edf8f1_0%,#faf5ed_100%)]">
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-7">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              guides
            </Link>
            <span>/</span>
            <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">
              단백질 기초
            </Link>
            <span>/</span>
            <span>단백질 역할 개요</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#e7f3ec] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#2d6a4f]">
              TRACK A
            </span>
            <span className="text-xs text-[#728077]">단백질 역할을 한 번에 이해하는 개요 페이지</span>
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h1 className="text-[30px] font-black leading-[1.08] tracking-[-0.02em] text-[#153726] md:text-[44px]">
                단백질은 몸에서
                <br />
                어떤 일을 할까?
              </h1>
              <p className="mt-4 max-w-[720px] text-sm leading-7 text-[#5c6b62] md:text-[15px]">
                단백질은 단순히 근육을 위한 영양소가 아닙니다.
                <br />
                근육 회복, 면역 반응, 호르몬 신호, 조직 재생까지 몸의 핵심 구조와 기능을 동시에 지탱합니다.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#d8e6dc] bg-[linear-gradient(135deg,#ffffff_0%,#eef7f1_52%,#f6eee4_100%)] p-5 shadow-[0_28px_70px_rgba(24,52,38,0.10)]">
              <div className="grid gap-4">
                <div className="rounded-[24px] border border-[#dce8df] bg-white p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#74857a]">BODY MAP</p>
                      <p className="mt-1 text-xl font-black text-[#163725]">단백질 역할 인포그래픽</p>
                    </div>
                    <span className="rounded-full bg-[#eef7f1] px-3 py-1 text-[11px] font-semibold text-[#24543d]">
                      핵심 3영역
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <RoleBar label="근육" share="20~25%" detail="운동 후 회복과 움직임 유지" width="82%" />
                    <RoleBar label="피부·결합조직" share="15~20%" detail="콜라겐과 구조 단백질 중심" width="68%" />
                    <RoleBar label="기관·혈액" share="10~15%" detail="효소, 운반 단백질, 면역단백질 포함" width="56%" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">회복</p>
                    <p className="mt-1 text-lg font-bold text-[#173926]">근육</p>
                  </div>
                  <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">방어</p>
                    <p className="mt-1 text-lg font-bold text-[#173926]">면역</p>
                  </div>
                  <div className="rounded-2xl border border-[#dfe8e1] bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6e8174]">조절</p>
                    <p className="mt-1 text-lg font-bold text-[#173926]">호르몬</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-14 md:px-6">
        <div className="mt-6 space-y-6">
          <section className="rounded-[30px] border border-[#dfe8e1] bg-white px-5 py-5 shadow-[0_24px_60px_rgba(24,34,28,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#24543d]">ROLE OVERVIEW</p>
                <h2 className="mt-2 text-2xl font-black text-[#163725]">단백질이 중요한 3가지 이유</h2>
              </div>
              <span className="rounded-full border border-[#d7e6dd] bg-[#f1f8f3] px-3 py-1.5 text-xs font-semibold text-[#24543d]">
                아래 카드에서 병렬 이동
              </span>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {roleCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-[26px] border border-[#dde7df] bg-[linear-gradient(180deg,#fffefb_0%,#ffffff_100%)] p-5 shadow-[0_18px_46px_rgba(24,34,28,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#bfd8c8] hover:shadow-[0_24px_62px_rgba(24,52,38,0.10)]"
                >
                  <span className="rounded-full bg-[#eef7f1] px-3 py-1 text-[11px] font-semibold text-[#24543d]">{card.accent}</span>
                  <h3 className="mt-4 text-lg font-black leading-6 text-[#163725] transition-colors group-hover:text-[#24543d]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#58665d]">{card.body}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#24543d]">자세히 보기</span>
                    <span className="rounded-full border border-[#d6e5db] bg-[#f2f8f4] px-3 py-1 text-[11px] font-semibold text-[#24543d]">
                      연결 콘텐츠
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-[#dfe8e1] bg-[linear-gradient(180deg,#ffffff_0%,#fbf8f2_100%)] px-5 py-5 shadow-[0_24px_60px_rgba(24,34,28,0.05)]">
            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[24px] border border-[#e7ece8] bg-white p-5">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#24543d]">WHY IT MATTERS</p>
                <h2 className="mt-2 text-xl font-black text-[#163725]">그래서 무엇을 먼저 봐야 할까?</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[#58665d]">
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                    <span>근육 회복을 보려면 운동량과 총 단백질 섭취량을 함께 봐야 합니다.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                    <span>피로와 면역 저하가 반복된다면 단백질 부족 신호를 먼저 점검해야 합니다.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                    <span>제품 비교 단계에서는 단백질 함량, 당류, 칼로리, 단백질 밀도를 같이 봐야 합니다.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[24px] border border-[#dce8df] bg-[linear-gradient(135deg,#f3faf5_0%,#ffffff_100%)] p-5">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#24543d]">NEXT STEP</p>
                <h2 className="mt-2 text-xl font-black text-[#163725]">기초 이해 후 바로 이어서 보기</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {roleStats.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-[#d8e6dc] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(24,52,38,0.05)]">
                      <p className="text-[11px] font-semibold tracking-[0.12em] text-[#74857a]">{item.label}</p>
                      <p className="mt-1 text-xl font-black text-[#163725]">{item.share}</p>
                      <p className="mt-2 text-sm leading-6 text-[#58665d]">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
