import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import drinkProducts from "@/app/data/drinkProductsData.json";

// 2026-11-03 질문 허브 마지막 주제: '신장 질환(만성콩팥병) 단백질' 질문형 새 페이지.
// 건강한 사람의 '고단백이 신장에 해로운가'는 high-protein-side-effects가 다루므로, 여기서는 이미 신장 질환이 있는 사람(단계별·투석)으로 좁힌다.
// 수치는 KDOQI 2020 원문(Am J Kidney Dis 2020;76(3 Suppl 1) S20~S23 요약), KDIGO 2024(Kidney Int 2024;105(4S) S157·S208),
// 일차 의료용 근거기반 만성콩팥병 임상진료지침(대한의학회·질병관리청, 주관 대한신장학회, 2022)에서 옮겼다.
const pageTitle = "신장 질환 단백질 섭취량 — 콩팥병 단계별·투석 중 하루 얼마나? 체중별 표";
const pageDescription =
  "만성콩팥병(신장 질환) 단백질 하루 섭취량을 단계별로 정리했습니다. 투석 전 3~5기는 체중 1kg당 0.55~0.6g(KDOQI 2020, 당뇨 동반 0.6~0.8g) 또는 0.8g(KDIGO 2024), 1.3g 초과는 피하기, 투석 중에는 1.0~1.2g으로 오히려 늘립니다. 체중별 g 표, 나트륨 기준, 단백질 음료를 볼 때 확인할 점까지 담았습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/kidney-disease-protein";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
    card: "summary" as const,
    title: pageTitle,
    description: pageDescription,
  },
};

// 투석 중이고 의료진이 단백질 보충을 권한 경우에만 쓰는 참고 표: 250mL 이하·단백질 10~25g 음료를 나트륨 낮은 순으로.
// 칼륨·인은 등록 데이터에 없어 쓰지 않는다(각 제품 성분표·원재료명에서 직접 확인).
type DrinkRow = { slug: string; brand: string; name: string; flavor?: string; capacity: string; proteinPerServing: number; calories: number; sugar: number; sodium: number; coupangUrl?: string };
const FALLBACK_LINK = "gaIdNRGs2u";
const SODIUM_LIMIT_MG = 2000; // KDIGO 2024 권고 3.3.2.1: 나트륨 하루 2g 미만
const volumeMl = (capacity: string) => {
  const match = String(capacity).match(/([\d.]+)\s*m[lL]/);
  return match ? Number(match[1]) : null;
};
const lowSodiumDrinks = (drinkProducts as DrinkRow[])
  .filter((d) => {
    const ml = volumeMl(d.capacity);
    return (
      ml !== null &&
      ml <= 250 &&
      d.proteinPerServing >= 10 &&
      d.proteinPerServing <= 25 &&
      typeof d.sodium === "number" &&
      !(d.coupangUrl ?? "").includes(FALLBACK_LINK)
    );
  })
  .map((d) => ({ ...d, ml: volumeMl(d.capacity) as number }))
  .sort((a, b) => a.sodium - b.sodium || a.sugar - b.sugar || a.calories - b.calories);
// 표는 브랜드마다 1개씩(맛만 다른 제품이 줄을 채우지 않게)
const lowSodiumTable = lowSodiumDrinks.filter((d, i, arr) => arr.findIndex((x) => x.brand === d.brand) === i).slice(0, 8);

const quickAnswer = [
  "신장 질환이 있으면 단백질 양은 단계마다 다르고, 투석 전과 투석 후가 반대 방향입니다. 투석 전 3~5기는 줄이고(KDOQI 2020: 체중 1kg당 0.55~0.6g, 당뇨병이 있으면 0.6~0.8g / KDIGO 2024: 0.8g, 1.3g 초과는 피하기), 투석을 시작하면 오히려 1.0~1.2g으로 늘립니다(KDOQI 2020).",
  "체중 60kg이면 투석 전 저단백 처방은 하루 약 33~36g, KDIGO 기준 48g, 투석 중에는 60~72g입니다. 국내 일차 의료용 만성콩팥병 진료지침(대한신장학회 주관, 2022)도 1~3기 환자에게 0.8g/kg을 권고하고, 알부민뇨가 많으면(하루 300mg 이상) 0.6~0.8g을 고려하라고 합니다.",
  "저단백 식사는 의료진·영양사의 관리 아래에서 하는 치료이고, 열량이 모자라면 근육이 빠질 수 있습니다. 투석 전 단계에서는 고단백 음료를 스스로 더하지 말고, 투석 중 보충이 필요하다고 들었다면 단백질과 함께 나트륨·칼륨·인을 성분표로 확인한 뒤 담당 의료진과 상의하세요.",
];

// KDIGO 2024 Table 2(사구체여과율 단계)와 각 지침의 단백질 권고를 묶었다.
const stageRows: Array<[string, string, string, string]> = [
  ["1~2기", "90 이상 / 60~89", "국내 지침 0.8g/kg (KDIGO·KDOQI는 3기부터 수치 제시)", "알부민뇨 등 콩팥 손상이 있어야 만성콩팥병으로 진단합니다. 국내 일차 의료용 지침(1~3기 대상)은 0.8g/kg을 권고합니다."],
  ["3기 (3a·3b)", "45~59 / 30~44", "KDIGO 0.8g/kg · KDOQI 0.55~0.6g/kg(당뇨 0.6~0.8g)", "국내 일차 의료용 지침(1~3기 대상)은 0.8g/kg 권고, 알부민뇨 하루 300mg 이상이면 0.6~0.8g/kg 고려."],
  ["4기", "15~29", "KDIGO 0.8g/kg · KDOQI 0.55~0.6g/kg(당뇨 0.6~0.8g)", "국내 지침은 사구체여과율 30 미만이면 신장내과 진료를 권합니다. 저단백 처방은 전문 의료진 관리 아래에서."],
  ["5기 (투석 전)", "15 미만", "KDOQI 0.55~0.6g/kg 또는 초저단백 0.28~0.43g/kg + 케토산 보충", "초저단백 식사는 케토산·필수아미노산 보충으로 하루 0.55~0.6g/kg을 맞춥니다. 스스로 시작하지 않습니다."],
  ["투석 중 (혈액·복막)", "—", "KDOQI 1.0~1.2g/kg (당뇨 동반도 같음)", "투석을 시작하면 영양 상태 유지를 위해 단백질을 오히려 늘립니다."],
];

// 체중별 하루 단백질(g): 체중 × 각 지침의 g/kg. 반올림.
const weights = [50, 55, 60, 65, 70, 75, 80];
const range = (w: number, lo: number, hi: number) => `${Math.round(w * lo)}~${Math.round(w * hi)}g`;

const pointRows: Array<[string, string]> = [
  ["대상 조건", "KDOQI 권고는 '대사적으로 안정된' 성인이 기준입니다. 지침은 이를 활동성 염증·감염이 없고, 2주 안에 입원하지 않았고, 조절 안 되는 당뇨·암 같은 소모성 질환이 없고, 최근 체중이 크게 줄지 않은 상태로 설명합니다. 이 조건이 아니면 목표가 달라집니다."],
  ["열량은 충분히", "단백질을 줄여도 열량은 체중 1kg당 하루 25~35kcal(KDOQI 2020)를 유지하도록 권합니다. 열량이 모자라면 몸의 단백질을 에너지로 써서 근육이 빠질 수 있습니다."],
  ["나트륨", "KDOQI 2020은 3~5기·투석 중 나트륨을 하루 2.3g 미만, KDIGO 2024는 2g 미만(소금 5g 미만)을 권합니다. 국내 지침은 소금 하루 5~6g(나트륨 2.0~2.3g) 미만 제한을 고려하라고 합니다."],
  ["칼륨·인", "KDOQI 2020은 혈액 칼륨·인을 정상 범위로 유지하도록 섭취를 개인별로 조절하라고 하고, 인은 동물성·식물성·첨가물 등 출처에 따라 흡수율이 다르다는 점을 고려하라고 합니다. 정해진 하루 수치가 아니라 혈액검사 결과로 정해집니다."],
  ["식물성 vs 동물성", "KDOQI 2020은 단백질 종류(식물성·동물성)를 정해 권할 근거가 부족하다고 봤습니다. 국내 일차 의료용 지침은 단백질의 50% 이상을 식물성으로 먹도록 권합니다. 이 차이는 담당 의료진·영양사와 정하세요."],
  ["체중 기준", "g/kg 계산에 실제 체중을 쓸지, 표준·조정 체중을 쓸지는 의료진이 정합니다(KDOQI는 표준체중·조정체중을 함께 다룹니다). 아래 표는 이해를 돕는 계산값입니다."],
];

const faqItems = [
  {
    question: "신장 질환(만성콩팥병)이 있으면 단백질을 하루 얼마나 먹나요?",
    answer:
      "단계마다 다릅니다. 투석 전 3~5기는 KDOQI 2020 기준 체중 1kg당 0.55~0.6g(당뇨병이 있으면 0.6~0.8g), KDIGO 2024 기준 0.8g이고 1.3g 초과는 피하라고 합니다. 투석을 시작하면 1.0~1.2g으로 늘립니다. 실제 목표는 혈액검사·영양 상태를 보고 담당 의료진이 정합니다.",
  },
  {
    question: "투석을 시작하면 왜 단백질을 더 먹어야 하나요?",
    answer:
      "투석 전에는 콩팥의 부담과 요독을 줄이려고 단백질을 제한하지만, 투석 중에는 영양 상태를 안정적으로 유지하는 것이 목표가 됩니다. KDOQI 2020은 대사적으로 안정된 혈액투석·복막투석 성인에게 체중 1kg당 1.0~1.2g을 권합니다(당뇨병이 있어도 같음).",
  },
  {
    question: "콩팥병 환자가 단백질 음료를 마셔도 되나요?",
    answer:
      "투석 전 단계에서 저단백 식사를 처방받았다면 단백질 음료를 스스로 더하면 목표를 넘기 쉽습니다. 투석 중이거나 영양 상태가 나빠 의료진이 보충을 권한 경우에는(KDOQI 2020은 식사 상담만으로 부족할 때 최소 3개월간 경구 영양 보충을 시도하도록 제안) 단백질과 함께 나트륨·칼륨·인을 성분표로 확인하고 상의하세요.",
  },
  {
    question: "당뇨병성 신장병은 단백질 기준이 다른가요?",
    answer:
      "KDOQI 2020은 당뇨병이 있는 3~5기(투석 전)에서 체중 1kg당 0.6~0.8g을 제시합니다. 혈당 조절과 영양 상태를 함께 보기 때문에 당뇨병이 없는 경우(0.55~0.6g)보다 조금 높습니다. 투석 중이면 당뇨병이 있어도 1.0~1.2g입니다.",
  },
  {
    question: "건강한 사람이 단백질을 많이 먹으면 신장이 나빠지나요?",
    answer:
      "신장 기능이 정상인 성인에 대한 내용은 '단백질 과다섭취 부작용' 글에 따로 정리했습니다. 이 글은 이미 신장 질환이 있는 경우의 기준입니다. KDIGO 2024는 진행 위험이 있는 만성콩팥병 환자에게 체중 1kg당 1.3g을 넘는 고단백 섭취를 피하라고 합니다.",
  },
  {
    question: "단백질을 줄이면 근육이 빠지지 않나요?",
    answer:
      "열량이 모자라면 그럴 수 있어, KDOQI 2020은 단백질을 줄여도 열량을 체중 1kg당 25~35kcal로 유지하도록 권합니다. KDIGO 2024는 노쇠·근감소증이 있는 노인은 더 높은 단백질·열량 목표를 고려하고, 대사적으로 불안정한 사람에게는 저단백 식사를 처방하지 말라고 합니다. 어린이는 성장 때문에 단백질을 제한하지 않습니다.",
  },
];

const relatedLinks = [
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다섭취 부작용", body: "건강한 성인에게 고단백이 신장에 무리인지." },
  { href: "/guides/intake-strategy-health/senior-protein-strategy", title: "노인 단백질 섭취량", body: "65세 이상 권장량과 근감소증 점검." },
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "신장 질환이 없는 성인의 체중별 권장량." },
  { href: "/guides/intake-strategy-health/glp1-protein", title: "마운자로·위고비 단백질", body: "감량 중 근육을 지키는 단백질 양." },
  { href: "/guides/basics/protein-source-types", title: "단백질 종류", body: "식물성·동물성 단백질의 차이." },
  { href: "/guides/intake-strategy-health/protein-drink-sugar", title: "단백질 음료 당류", body: "성분표 읽는 법." },
];

const sources = [
  "Ikizler TA et al., KDOQI Clinical Practice Guideline for Nutrition in CKD: 2020 Update. Am J Kidney Dis 2020;76(3 Suppl 1):S1-S107 (권고 3.0.1~3.0.4 단백질, 3.1.1 열량, 3.2.1 단백질 종류, 4.1.1 경구 영양 보충, 6.3 인, 6.4 칼륨, 6.5.1 나트륨)",
  "Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group, KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int 2024;105(4S):S117-S314 (Table 2 사구체여과율 단계, 권고 3.3.1.1·실행 지침 3.3.1.1~3.3.1.5 단백질, 권고 3.3.2.1 나트륨)",
  "대한의학회·질병관리청, 일차 의료용 근거기반 만성콩팥병 임상진료지침(개발 주관 대한신장학회), 2022 (1~3기 대상: 단백질 0.8g/kg, 알부민뇨 300mg/일 이상 0.6~0.8g/kg 고려, 소금 5~6g 미만, 식물성 단백질 50% 이상)",
  "Kistler BM et al., The International Society of Renal Nutrition and Metabolism Commentary on the KDOQI Clinical Practice Guideline for Nutrition in CKD. J Ren Nutr 2021;31(2):116-120",
  `ProteinLab 등록 단백질 음료 성분표: 250mL 이하·단백질 10~25g ${lowSodiumDrinks.length}개, 2026-11-03 집계 (칼륨·인은 미등록)`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function KidneyDiseaseProteinPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    lowSodiumTable.slice(0, 3).map((d) => ({ slug: d.slug, contextLabel: `${d.ml}mL · 단백질 ${d.proteinPerServing}g · 나트륨 ${d.sodium}mg` })),
  );

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략 & 건강</Link>
            <span>/</span>
            <span>신장 질환 단백질</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">대상별 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-03</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            신장 질환(콩팥병) 단백질, 하루 얼마나 먹어야 할까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            만성콩팥병 단계별·투석 중 단백질 섭취량을 미국 신장재단 영양 지침(KDOQI 2020), 국제 신장 지침(KDIGO 2024), 대한신장학회가
            주관한 국내 진료지침으로 정리했습니다. 개인 목표량은 혈액검사와 영양 상태를 보고 담당 의사·영양사가 정합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f6fbf7] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">짧게 답하면</h2>
            <ul className="mt-4 space-y-3">
              {quickAnswer.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#f0d9c4] bg-[#fdf6ef] px-5 py-4 text-sm leading-6 text-[#7a5230]">
            <strong>먼저 확인하세요.</strong> 이 글은 일반 정보입니다. 신장 질환은 단계·당뇨병 여부·투석 방식·혈액검사 결과에 따라 단백질,
            나트륨, 칼륨, 인 목표가 사람마다 다릅니다. 식사나 보충제를 바꾸기 전에 담당 의사·영양사와 상담하세요. 건강한 사람이 고단백
            식사를 해도 되는지는{" "}
            <Link href="/guides/intake-strategy-health/high-protein-side-effects" className="font-semibold underline underline-offset-2">
              단백질 과다섭취 부작용
            </Link>
            에서 따로 다룹니다.
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">콩팥병 단계별 단백질 기준</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>단계</th>
                    <th className={thClass}>사구체여과율 (mL/min/1.73㎡)</th>
                    <th className={thClass}>단백질 (체중 1kg당 하루)</th>
                    <th className={thClass}>참고</th>
                  </tr>
                </thead>
                <tbody>
                  {stageRows.map(([stage, gfr, protein, note]) => (
                    <tr key={stage} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{stage}</td>
                      <td className={tdClass}>{gfr}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{protein}</td>
                      <td className={tdClass}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단계 구분은 KDIGO 2024 Table 2입니다. KDOQI 2020 권고 3.0.1(투석 전 3~5기, 당뇨 없음)은 &lsquo;면밀한 임상 관리 아래&rsquo;를
              조건으로 하며, 말기 신부전·사망 위험을 줄이는 근거 등급이 1A입니다. 투석 중 1.0~1.2g/kg은 혈액투석 1C, 복막투석은 전문가 의견
              등급입니다. KDIGO 2024의 0.8g/kg(3~5기)은 2C 등급의 제안이고, 1.3g/kg 초과를 피하라는 것은 진행 위험이 있는 성인에 대한 실행
              지침입니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중별 하루 단백질 (g)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>체중</th>
                    <th className={thClass}>투석 전 저단백 0.55~0.6g/kg</th>
                    <th className={thClass}>당뇨 동반 0.6~0.8g/kg</th>
                    <th className={thClass}>KDIGO 0.8g/kg</th>
                    <th className={thClass}>투석 중 1.0~1.2g/kg</th>
                    <th className={thClass}>피할 수준 (1.3g/kg 초과)</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((w) => (
                    <tr key={w} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{w}kg</td>
                      <td className={tdClass}>{range(w, 0.55, 0.6)}</td>
                      <td className={tdClass}>{range(w, 0.6, 0.8)}</td>
                      <td className={tdClass}>{Math.round(w * 0.8)}g</td>
                      <td className={tdClass}>{range(w, 1.0, 1.2)}</td>
                      <td className={tdClass}>{Math.round(w * 1.3)}g 초과</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              체중 × 각 지침의 g/kg을 반올림한 값입니다. 초저단백 식사(0.28~0.43g/kg + 케토산 보충)는 전문 의료진이 처방할 때만 해당해 표에서
              뺐습니다. 어떤 체중(실제·표준·조정 체중)으로 계산할지는 담당 의료진이 정합니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 말고 같이 봐야 할 것</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <tbody>
                  {pointRows.map(([title, body]) => (
                    <tr key={title} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} w-32 font-semibold text-[var(--foreground)]`}>{title}</td>
                      <td className={tdClass}>{body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">투석 중 보충을 권받았다면 — 나트륨 낮은 소용량 음료 성분 확인용</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              이 표는 신장 질환자에게 단백질 음료를 권하는 표가 아닙니다. 투석 전 저단백 식사를 하고 있다면 해당하지 않습니다. KDOQI 2020은
              단백질·에너지 영양 상태가 나쁘거나 그럴 위험이 있고 식사 상담만으로 부족할 때, 최소 3개월간 경구 영양 보충을 시도하도록
              제안합니다(근거 등급 2D). 그런 경우 의료진과 상의할 때 성분을 비교해 볼 수 있도록, 등록 음료 중 250mL 이하·단백질 10~25g인{" "}
              {lowSodiumDrinks.length}개에서 브랜드별로 나트륨이 낮은 순으로 골랐습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>나트륨</th>
                    <th className={thClass}>나트륨 2g 대비</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {lowSodiumTable.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.ml}mL</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{d.sodium}mg</td>
                      <td className={tdClass}>{((d.sodium / SODIUM_LIMIT_MG) * 100).toFixed(1)}%</td>
                      <td className={tdClass}>{d.calories}kcal</td>
                      <td className={tdClass}>{d.sugar}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <GuideProductHeroCards products={heroProducts} />
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              성분은 제조사 표기 1병 기준이고, &lsquo;나트륨 2g 대비&rsquo;는 KDIGO 2024 권고(하루 2g 미만)에 대한 비율입니다.{" "}
              <strong className="text-[var(--foreground)]">칼륨·인은 ProteinLab 데이터에 없어 표에 넣지 않았습니다.</strong> 제품 포장의
              영양성분표와 원재료명(인산염 등 첨가물)을 직접 확인하세요. 투석 중 수분 제한을 받았다면 음료 용량도 하루 수분에 들어가는지
              의료진에게 확인하세요.
            </p>
          </section>

          <GuideCompareListCta category="drink" slugs={lowSodiumTable.slice(0, 3).map((d) => d.slug)} />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-[#e2ebe4] bg-[#f7fbf8] px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--foreground)]">{item.question}</summary>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 읽기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#2d6a4f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
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
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
