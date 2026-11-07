import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideNextReads from "@/app/components/GuideNextReads";
import GuideBuySection from "@/app/components/GuideBuySection";
import ProteinDailyContext from "@/app/components/ProteinDailyContext";
import TrackedLink from "@/app/components/TrackedLink";

const PAGE_URL = "https://proteinlab.kr/guides/basics/deficiency-symptoms";
const _pageTitle = "단백질 부족 증상 — 근육 감소·부종·탈모·회복 지연, 정말 단백질 때문일까";
const _pageDesc =
  "단백질 부족 증상은 근육량·근력 감소, 회복 지연, 잦은 감염, 머리카락·피부 변화와 심한 경우 부종입니다. 성인 권장섭취량 체중 1kg당 0.91g(2020 한국인 영양소 섭취기준)과 함께 점검합니다.";

export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: _pageTitle,
    description: _pageDesc,
    url: PAGE_URL,
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const signRows: Array<[string, string, string]> = [
  [
    "근육량·근력 감소",
    "몸이 부족한 단백질을 근육에서 꺼내 씁니다. 계단·무거운 짐이 힘들어지고 팔다리가 가늘어집니다.",
    "가장 흔하고 먼저 나타나는 편. 특히 고령층·다이어트 중",
  ],
  [
    "상처·운동 후 회복 지연",
    "조직을 다시 만드는 재료가 모자라 상처가 늦게 아물고 근육통이 오래 갑니다.",
    "수술·부상 뒤에는 필요량 자체가 늘어남",
  ],
  [
    "잦은 감염",
    "항체와 면역세포도 단백질로 만들어져 감기 등에 자주 걸릴 수 있습니다.",
    "심한 영양 결핍에서 뚜렷함",
  ],
  [
    "머리카락·손발톱·피부 변화",
    "머리카락이 가늘어지고 잘 빠지거나, 손발톱이 약해지고 피부가 건조해질 수 있습니다.",
    "급격한 다이어트 뒤 탈모와 함께 보고됨. 원인은 다양함",
  ],
  [
    "부종(붓기)",
    "혈액 속 알부민이 크게 줄면 수분이 조직으로 빠져 다리·발이 붓습니다.",
    "심한 결핍의 신호. 신장·심장·간 질환에서도 생기므로 진료가 필요",
  ],
];

const riskGroups = [
  {
    title: "75세 이상, 특히 여성",
    body: "국민건강영양조사(2013~2017)에서 75세 이상 여성의 하루 평균 섭취량은 37.7g으로 권장섭취량(50g)의 75%였습니다. 식사량이 줄고 씹기 어려운 경우가 많습니다.",
  },
  {
    title: "열량을 크게 줄인 다이어트",
    body: "식사량을 줄이면 단백질도 같이 줄고, 이때 빠지는 체중에 근육이 섞입니다. 열량을 줄일수록 단백질 비율을 지키는 것이 중요합니다.",
  },
  {
    title: "끼니를 자주 거르는 경우",
    body: "아침을 거르고 점심을 면·빵으로 때우면 하루 단백질이 저녁 한 끼에 몰립니다. 평균은 넘어도 하위 10%는 평균필요량에 못 미칩니다.",
  },
  {
    title: "고기·달걀·유제품을 거의 먹지 않는 경우",
    body: "식물성 위주 식사는 같은 g이라도 이용 효율이 낮을 수 있어 콩·두부를 충분히 넣어야 합니다.",
  },
  {
    title: "수술·큰 병 뒤 회복기",
    body: "조직 회복과 염증으로 필요량이 늘어납니다. 유럽 PROT-AGE 연구그룹은 급성·만성 질환이 있는 고령자에게 체중 1kg당 1.2~1.5g을 권합니다(신장 질환 제외).",
  },
];

const checkRows: Array<[string, string, string]> = [
  ["악력", "남자 28kg 미만, 여자 18kg 미만", "보건소·병원 악력계"],
  ["의자에서 5번 일어나기", "12초 이상 걸림", "팔짱 끼고 의자에서 5회 일어섰다 앉기"],
  ["보행 속도", "초속 1.0m 미만", "6m를 평소 걸음으로 걷는 시간"],
];

const faqs = [
  {
    question: "단백질이 부족하면 어떤 증상이 나타나나요?",
    answer:
      "근육량과 근력 감소가 가장 먼저 나타나는 편이고, 상처·운동 후 회복 지연, 잦은 감염, 머리카락이 가늘어지거나 빠지는 변화, 심하면 다리 부종이 생깁니다. 다만 대부분 다른 원인으로도 생기는 증상이라 하루 섭취량을 먼저 계산해 보는 편이 정확합니다.",
  },
  {
    question: "단백질 부족하면 탈모가 오나요?",
    answer:
      "급격한 다이어트처럼 단백질과 열량이 크게 줄면 몇 달 뒤 머리카락이 많이 빠지는 경우가 보고됩니다. 그러나 탈모는 유전, 호르몬, 갑상선, 철분 부족 등 원인이 다양해 단백질만으로 판단하기 어렵습니다. 갑자기 많이 빠지면 피부과 진료가 먼저입니다.",
  },
  {
    question: "단백질 부족하면 붓나요?",
    answer:
      "혈액 속 알부민이 크게 줄 정도의 심한 결핍이면 다리·발이 붓습니다. 하지만 붓기는 신장·심장·간 질환, 오래 서 있기, 짠 음식으로도 흔히 생깁니다. 이유 없이 계속 붓는다면 진료를 받아야 합니다.",
  },
  {
    question: "피곤하면 단백질이 부족한 건가요?",
    answer:
      "피로는 수면, 빈혈, 갑상선, 스트레스 등 원인이 너무 많아 단백질 부족의 신호로 보기 어렵습니다. 식사에서 단백질을 거의 안 먹는 패턴이 함께 있을 때만 의심해 볼 만합니다.",
  },
  {
    question: "단백질이 부족한지 검사로 알 수 있나요?",
    answer:
      "혈액검사의 알부민·총단백 수치는 심한 결핍이나 질환에서 떨어지지만, 가벼운 섭취 부족은 잘 드러나지 않습니다. 일상에서는 하루 섭취량 계산과 근력(악력·의자 일어서기) 변화를 같이 보는 편이 실용적입니다.",
  },
];

const sources = [
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (국민건강영양조사 2013~2017 섭취량)",
  "Chen LK et al., Asian Working Group for Sarcopenia: 2019 Consensus Update. J Am Med Dir Assoc 2020;21(3):300-307",
  "Bauer J. et al., PROT-AGE Study Group. J Am Med Dir Assoc 2013;14(8):542-559",
  "MSD 매뉴얼 일반인용, 단백질-에너지 영양실조",
];

const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";
const cardClass = "rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5";

export default function DeficiencySymptomsPage() {
  const jsonLd = buildGuideJsonLd({
    title: _pageTitle,
    description: _pageDesc,
    url: PAGE_URL,
    datePublished: "2026-03-01",
    dateModified: "2026-11-02",
    faq: faqs,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">
              단백질 기초
            </Link>
            <span>/</span>
            <span>단백질 부족 증상</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 부족 증상, 정말 단백질 때문일까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 부족 증상은 근육량·근력 감소, 회복 지연, 잦은 감염, 머리카락·피부 변화와 심한 경우 부종입니다. 먼저 성인
            권장섭취량인 체중 1kg당 0.91g을 채우는지 확인하세요(2020 한국인 영양소 섭취기준). 기준일 2026-11-02.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#d7e6da] bg-[#f5fbf6] px-5 py-5">
            <h2 className="text-lg font-bold text-[#16412D]">핵심만 먼저</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground)]">
              <li>
                · 단백질 부족의 대표 신호는 <strong>근육량·근력 감소</strong>, <strong>회복 지연</strong>,{" "}
                <strong>잦은 감염</strong>, <strong>머리카락·피부 변화</strong>, 심하면 <strong>부종</strong>입니다.
              </li>
              <li>
                · 이 증상들은 대부분 <strong>다른 원인으로도 흔히 생깁니다</strong>. 증상으로 짐작하기보다 하루 섭취량을
                계산해 보는 것이 먼저입니다.
              </li>
              <li>
                · 한국 성인은 평균적으로 권장량보다 많이 먹지만, <strong>75세 이상 여성</strong>(권장량의 75%), 열량을 크게
                줄인 다이어트, 끼니를 거르는 경우는 실제로 부족해지기 쉽습니다.
              </li>
              <li>
                · 이유 없는 부종이나 갑작스러운 탈모·체중 감소는 단백질 보충보다 <strong>진료가 먼저</strong>입니다.
              </li>
            </ul>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 부족 증상은 무엇인가요?</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className={thClass}>신호</th>
                    <th className={thClass}>왜 생기나</th>
                    <th className={thClass}>참고</th>
                  </tr>
                </thead>
                <tbody>
                  {signRows.map(([sign, why, note]) => (
                    <tr key={sign} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{sign}</td>
                      <td className={tdClass}>{why}</td>
                      <td className={tdClass}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              피로·무기력도 자주 언급되지만 수면, 빈혈, 갑상선 등 원인이 너무 많아 단백질 부족의 근거로 쓰기는 어렵습니다.
            </p>
          </section>

          <GuideBuySection topic="general" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">누가 실제로 부족해지기 쉬울까</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {riskGroups.map((group) => (
                <article key={group.title} className="rounded-2xl border border-[#e8e6e3] bg-white px-4 py-4">
                  <h3 className="text-base font-semibold text-[#24543d]">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{group.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">근육이 빠지고 있는지 스스로 점검하기</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 부족이 오래가면 가장 먼저 근력이 떨어집니다. 아시아 근감소증 진단 기준(AWGS 2019)의 근력·신체 기능
              기준선은 다음과 같습니다. 하나라도 해당하면 식사의 단백질과 운동을 점검하고, 65세 이상이면 보건소나 병원에서
              근육량 검사를 받아보는 것이 좋습니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className={thClass}>항목</th>
                    <th className={thClass}>낮다고 보는 기준</th>
                    <th className={thClass}>재는 법</th>
                  </tr>
                </thead>
                <tbody>
                  {checkRows.map(([item, cut, how]) => (
                    <tr key={item} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{item}</td>
                      <td className={tdClass}>{cut}</td>
                      <td className={tdClass}>{how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              근감소증 진단에는 근육량 측정이 함께 필요합니다. 위 기준만으로 진단하지 않습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">부족한지 확인하는 가장 빠른 방법: 하루 섭취량 계산</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                성인 권장섭취량은 체중 1kg당 0.91g(남자 60~65g, 여자 50~55g)입니다. 어제 먹은 끼니마다 단백질 반찬(달걀,
                두부, 생선, 살코기, 우유·요거트)이 있었는지 세어 보세요. 세 끼 중 한 끼 이상 단백질 반찬이 없었다면 부족할
                가능성이 큽니다.
              </p>
              <p>
                채우는 순서는 <strong className="text-[var(--foreground)]">① 끼니마다 단백질 반찬 하나</strong> →{" "}
                <strong className="text-[var(--foreground)]">② 거르는 끼니를 요거트·두유·단백질 음료로</strong> →{" "}
                <strong className="text-[var(--foreground)]">③ 그래도 모자란 만큼만 제품</strong>입니다.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <TrackedLink
                href="/guides/basics/daily-requirement"
                trackingLabel="단백질 하루 섭취량"
                trackingSection="deficiency_daily_requirement_cta"
                trackingPageType="guide"
                className="inline-flex items-center rounded-xl bg-[#24543d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4532]"
              >
                내 하루 섭취량 기준 보기
              </TrackedLink>
              <Link
                href="/guides/basics/protein-deficiency-self-check"
                className="inline-flex items-center rounded-xl border border-[#d7e6da] bg-white px-4 py-2 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
              >
                식습관 자가 점검
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e5deca] bg-[#fdfaf5] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-5 space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-[#e8e6e3] bg-white px-4 py-4">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">Q. {faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-4">
            <h2 className="text-sm font-bold text-[var(--foreground)]">출처</h2>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-[var(--foreground-muted)]">
              {sources.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
              이 글은 일반 정보이며 진단을 대신하지 않습니다. 증상이 계속되면 진료를 받으세요.
            </p>
          </section>
        </div>
      </main>

      <ProteinDailyContext />
      <GuideBuySection topic="general" />

      <GuideNextReads path="/guides/basics/deficiency-symptoms" />
      <Footer />
    </div>
  );
}
