import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "마라톤 레이스 주간 영양 전략 | 카보로딩부터 회복까지 | ProteinLab",
  description:
    "대회 전 탄수화물 로딩, 경기 당일 식단, 레이스 후 회복 영양 전략을 단계별로 정리했습니다.",
};

const timelineRows = [
  ["D-7 ~ D-4 (훈련기)", "인터벌·롱런", "평소 단백질 유지 (1.6~2.0g/kg) + 탄수화물 균형"],
  ["D-3 ~ D-2 (로딩 시작)", "강도 감소", "탄수화물 8~10g/kg/day로 증가, 단백질은 평소 유지"],
  ["D-1 (전날)", "가벼운 달리기 또는 휴식", "소화 쉬운 고탄수화물 식사, 지방·섬유질 최소화"],
  ["당일 (레이스)", "마라톤 대회", "출발 2~3시간 전 탄수화물 위주 식사, 경기 중 젤·스포츠음료"],
  ["레이스 직후 (0~1시간)", "회복", "탄수화물+단백질 복합 섭취 (비율 3:1~4:1 권장)"],
  ["회복기 (24시간 후)", "휴식", "탄수화물 위주 식사 + 단백질 추가"],
];

const runnerProductRows = [
  {
    purpose: "회복·근육보충",
    name: "뉴케어 올프로틴",
    href: "/product/newcare-all-protein-choco-245",
    protein: "25g",
    feature: "락토프리, 밀도 A등급",
  },
  {
    purpose: "저당·가벼운 간식",
    name: "셀렉스 프로핏",
    href: "/product/sellex-profit-milk-vanilla-250",
    protein: "20g",
    feature: "당류 0g, 125kcal",
  },
  {
    purpose: "식물성 선호",
    name: "뉴케어 올프로틴 식물성",
    href: "/product/newcare-all-protein-plant-savory-250",
    protein: "20g",
    feature: "락토프리, 식물성 급원",
  },
];

function ImageSlot({ alt }: { alt: string }) {
  return (
    <div
      className="mt-4 rounded-2xl border border-dashed border-[#d9d4cd] bg-white px-5 py-8 text-center"
      role="img"
      aria-label={alt}
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">IMAGE SLOT</p>
      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{alt}</p>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function RaceWeekPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/running" className="hover:text-[var(--accent)]">
              💪 운동 &amp; 라이프스타일
            </Link>
            <span>/</span>
            <span>러닝 &amp; 마라톤</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK D
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            마라톤 레이스 주간 영양 전략
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            대회 한 주는 훈련을 줄이고 영양에 집중하는 시기입니다. 탄수화물 로딩, 경기 당일 식단,
            레이스 후 회복까지 단계별로 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">레이스 주간 단계별 영양 전략</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시점</th>
                    <th className="px-3 py-3 font-semibold">훈련</th>
                    <th className="px-3 py-3 font-semibold">영양 전략</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: ACSM &quot;Nutrition and Athletic Performance&quot; (2009), 김문선 런톡 (2024)
            </p>

            <ImageSlot alt="마라톤 레이스 주간 영양 전략 타임라인" />
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">레이스 직후 골든 타임 회복법</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              레이스 후 30~60분 이내가 회복의 골든 타임입니다. 탄수화물로 글리코겐을 보충하고,
              단백질로 근손상 회복을 시작하세요.
            </p>

            <Callout>
              레이스 직후 목표
              <br />
              탄수화물: 체중(kg) × 1.0~1.2g
              <br />
              단백질: 20~30g
              <br />
              예) 체중 70kg 기준: 탄수화물 70~84g + 단백질 20~30g
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: ACSM &quot;Nutrition and Athletic Performance&quot; (2009)
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">러너에게 맞는 단백질 제품</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              훈련 강도와 목적에 따라 적합한 제품이 다릅니다. 아래는 ProteinLab에 등록된 제품 기준입니다.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">목적</th>
                    <th className="px-3 py-3 font-semibold">추천 제품</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">특징</th>
                  </tr>
                </thead>
                <tbody>
                  {runnerProductRows.map((row) => (
                    <tr key={row.name} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{row.purpose}</td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <Link href={row.href} className="text-[var(--accent)] hover:underline">
                          {row.name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{row.protein}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{row.feature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              위 제품 정보는 ProteinLab 등록 공식 데이터 기준입니다.
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/running/basics"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                러너 단백질 기초로 돌아가기
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                전체 제품 비교하기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
