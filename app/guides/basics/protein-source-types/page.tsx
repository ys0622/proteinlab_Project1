import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "MPI 단백질이란? WPI·WPC·MPC 차이와 유당 비교";
const _pageDesc = "MPI는 카제인과 유청을 함께 담은 분리우유단백입니다. WPI·WPC·MPC와 원료, 단백질 비율, 유당 함량이 어떻게 다른지 비교하고 제품 표시를 읽는 기준을 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/basics/protein-source-types" },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/basics/protein-source-types",
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

const sourceTable = [
  {
    group: "Whey",
    type: "WPH (가수분해유청)",
    feature: "유청단백을 효소 등으로 가수분해",
    digestion: "제품·개인차",
    pros: "단백질을 작은 조각으로 나눈 형태",
    cons: "가격이 높은 편",
    purpose: "가수분해 유청 원료를 찾을 때",
  },
  {
    group: "Whey",
    type: "WPI (분리유청)",
    feature: "유청에서 단백질을 분리·농축 (원료 기준 약 90% 이상)",
    digestion: "빠른 편",
    pros: "WPC보다 유당이 적은 편",
    cons: "가격이 높은 편",
    purpose: "유청 중심 원료와 낮은 유당 함량을 찾을 때",
  },
  {
    group: "Whey",
    type: "WPC (농축유청)",
    feature: "유청을 농축 (단백질·유당 비율은 등급별로 다름)",
    digestion: "빠른 편",
    pros: "원료 등급에 따라 선택 폭이 넓음",
    cons: "WPI보다 유당이 많을 수 있음",
    purpose: "제품별 원료 함량과 가격을 함께 볼 때",
  },
  {
    group: "Milk",
    type: "MPC (농축우유)",
    feature: "유청:카제인(2:8) 자연 비율",
    digestion: "상대적으로 느린 편",
    pros: "우유의 카제인·유청 비율 유지",
    cons: "등급에 따라 유당 함량이 다름",
    purpose: "우유단백 혼합 원료를 찾을 때",
  },
  {
    group: "Milk",
    type: "MPI (분리우유)",
    feature: "우유의 카제인·유청을 함께 분리 (단백질 약 90% 이상)",
    digestion: "상대적으로 느린 편",
    pros: "MPC보다 단백질 비율이 높고 유당은 적은 편",
    cons: "유당이 완전히 0은 아님",
    purpose: "우유단백 비율을 유지한 고단백 원료를 찾을 때",
  },
  {
    group: "Casein",
    type: "Casein",
    feature: "우유(유청+카제인)에서 카제인을 발라냄",
    digestion: "상대적으로 느린 편",
    pros: "아미노산이 비교적 천천히 공급됨",
    cons: "유청과 반응 시간대가 다름",
    purpose: "식사 사이·취침 전 보충을 고려할 때",
  },
  {
    group: "식물성",
    type: "ISP (Isolated Soy)",
    feature: "콩에서 추출한 단백질",
    digestion: "높음",
    pros: "유당이 없는 식물성 원료",
    cons: "유청과 아미노산 구성·함량이 다름",
    purpose: "유제품을 피하려는 식단에서",
  },
  {
    group: "Collagen",
    type: "Collagen",
    feature: "콜라겐(생선/동물 등)에서 추출한 단백질",
    digestion: "높음",
    pros: "소화, 흡수 빠름",
    cons: "필수아미노산 구성이 근육 보충용 단백질과 다름",
    purpose: "깔끔한 목넘김",
  },
];

const groupColors: Record<string, { bg: string; text: string }> = {
  Whey: { bg: "#FFF3E4", text: "#8A5A1D" },
  Milk: { bg: "#E7F0FA", text: "#1E4F82" },
  Casein: { bg: "#E9F0EB", text: "#2D6A4F" },
  식물성: { bg: "#F1EDE0", text: "#6B5B2E" },
  Collagen: { bg: "#F3E9E9", text: "#8A3B3B" },
};

const purposeRows = [
  ["유청 중심 단백질을 찾을 때", "WPI · WPC", "유당 함량과 단백질 비율은 원료 등급 및 완제품 배합에 따라 달라집니다. 원재료명과 영양표를 함께 확인하세요."],
  ["우유단백의 원래 비율을 원할 때", "MPC · MPI", "두 원료 모두 카제인과 유청을 함께 담습니다. MPI는 단백질 비율이 더 높지만 유당이 완전히 없는 것은 아닙니다."],
  ["식사 사이 또는 취침 전 보충을 고려할 때", "Casein", "아미노산 공급이 상대적으로 느린 특성이 있습니다. 근육 합성에 부적합한 단백질이라는 뜻은 아닙니다."],
  ["유제품을 피하고 싶을 때", "ISP (식물성)", "대두단백은 유당이 없고 필수아미노산을 포함합니다. 다만 제품별 원료 조합과 단백질 함량을 확인하세요."],
  ["깔끔한 목넘김, 피부·관절 관리가 목적일 때", "Collagen", "근육 합성용 단백질로는 적합하지 않지만, 흡수가 빠르고 비타민C와 함께 먹으면 콜라겐 합성에 도움이 됩니다."],
];

const faqItems = [
  {
    q: "WPI와 WPC 중 뭘 먼저 골라야 하나요?",
    a: "WPI는 일반적으로 WPC보다 단백질 비율이 높고 유당 함량이 낮습니다. 다만 어느 쪽도 이름만으로 완제품의 유당이 0이라고 단정할 수 없으니, 원재료명과 영양표를 함께 확인하세요.",
  },
  {
    q: "카제인은 근육 합성에 정말 안 좋은가요?",
    a: "아닙니다. 카제인도 운동 후 근단백 합성을 높일 수 있습니다. 유청과 아미노산이 공급되는 시간대가 다르므로, 한 원료를 근육 합성에 부적합하다고 단정하면 안 됩니다.",
  },
  {
    q: "식물성 단백질(ISP)만으로 근육을 만들 수 있나요?",
    a: "가능합니다. 대두단백에도 필수아미노산이 들어 있습니다. 원료마다 아미노산 구성과 단백질 함량은 다르므로, 특정 원료의 우열보다 하루 총 섭취량과 식단 전체를 함께 보세요.",
  },
  {
    q: "콜라겐을 먹으면 근육에도 도움이 되나요?",
    a: "근육 합성 목적이라면 큰 도움이 되지 않습니다. 콜라겐은 근육 합성의 핵심 아미노산인 류신 함량이 낮아, 단백질 총량보다는 피부·관절 건강 목적으로 접근하는 것이 정확합니다.",
  },
];

function SourceGroupBadge({ group }: { group: string }) {
  const color = groupColors[group] ?? { bg: "#F0EEEB", text: "#5F6B61" };
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold"
      style={{ background: color.bg, color: color.text }}
    >
      {group}
    </span>
  );
}

export default function ProteinSourceTypesGuidePage() {
  const jsonLd = buildGuideJsonLd({
    title: (metadata as { title: string; description: string }).title,
    description: (metadata as { title: string; description: string }).description,
    url: "https://proteinlab.kr/guides/basics/protein-source-types",
    dateModified: "2026-10-08",
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
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/basics" className="hover:text-[var(--accent)]">단백질 기초</Link>
            <span>/</span>
            <span>단백질 급원 종류</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            MPI 단백질이란? WPI·WPC와 원료부터 다릅니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            MPI는 우유의 카제인과 유청을 함께 담은 분리우유단백입니다. WPI·WPC는 유청 단백질이므로
            이름이 비슷해도 원료 구성이 다릅니다. 유당 함량은 원료명만으로 단정하지 말고 완제품 표시를 확인하세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#cddfd2] bg-[#f5faf6] px-5 py-5" aria-labelledby="mpi-answer-title">
            <h2 id="mpi-answer-title" className="text-lg font-bold text-[#16412D]">MPI 단백질, 핵심만 먼저</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>MPI는 카제인 약 80%와 유청 약 20%라는 우유의 단백질 비율을 유지한 원료입니다.</li>
              <li>원료의 단백질 비율은 약 90% 이상이지만, 유당이 반드시 0인 것은 아닙니다.</li>
              <li>WPI는 분리유청단백입니다. 유당 부담이 있다면 MPI·WPI라는 약어보다 완제품의 유당·원재료 표시를 확인하세요.</li>
            </ul>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              원료 기준: <a href="https://www.thinkusadairy.org/products/milk-proteins/milk-protein-categories/milk-protein-isolate" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">미국 유제품 수출협의회 MPI 성분 자료</a>
            </p>
          </section>
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 급원 특징 한눈에 보기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 유청(Whey)이라도 가공 정도에 따라 WPH·WPI·WPC로 나뉘고, 우유는 유청과 카제인을 자연 비율 그대로
              담은 MPC·MPI로 나뉩니다. 카제인, 식물성(ISP), 콜라겐은 각각 원료 자체가 다른 별도 계열입니다.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-[860px] w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">급원</th>
                    <th className="px-3 py-3 font-semibold">구분</th>
                    <th className="px-3 py-3 font-semibold">특징</th>
                    <th className="px-3 py-3 font-semibold">소화도</th>
                    <th className="px-3 py-3 font-semibold">장점</th>
                    <th className="px-3 py-3 font-semibold">단점</th>
                    <th className="px-3 py-3 font-semibold">섭취 목적</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceTable.map((row) => (
                    <tr key={row.type} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="px-3 py-3"><SourceGroupBadge group={row.group} /></td>
                      <td className="px-3 py-3 font-semibold text-[var(--foreground)]">{row.type}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.feature}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.digestion}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.pros}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.cons}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">유청(Whey) 3형제 — WPH·WPI·WPC 차이</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              셋 다 우유에서 카제인을 뺀 &ldquo;유청&rdquo;이 원료지만, 가공 단계가 다릅니다. WPC는 우유에서 유청만 분리한
              농축형으로 단백질·유당 비율은 등급에 따라 다릅니다. WPI는 유당과 지방을 더 줄여 원료의 단백질 비율을
              대체로 90% 이상으로 높인 형태입니다. WPH는 유청단백을 가수분해한 원료로, 반드시 WPI를 가공한 것은 아닙니다.
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              유청 단백질이 운동 직후 보충용으로 자주 추천되는 이유는 류신을 포함한 필수아미노산(BCAA) 비중이 높고
              소화·흡수가 빨라, 운동 후 근단백 합성(muscle protein synthesis) 반응이 빠르게 나타나기 때문입니다.
              이 &ldquo;유청 = 빠른 단백질&rdquo;이라는 틀은 Boirie 등(1997)이 유청과 카제인의 흡수 속도 차이를 직접
              비교한 연구에서 처음 명확히 제시된 이후 스포츠 영양학의 기본 전제로 자리 잡았습니다.
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">우유(Milk) 계열 — MPC·MPI는 왜 다른가</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              우유 단백질은 원래 유청 20%, 카제인 80% 비율로 구성돼 있습니다. MPC(농축우유단백)는 이 자연 비율을
              대체로 유지하며 단백질을 농축한 원료입니다. MPI(분리우유단백)는 단백질 비율을 약 90% 이상으로 높인
              원료입니다. 두 원료 모두 유당이 남을 수 있고, 함량은 원료 등급과 완제품 배합에 따라 달라집니다.
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              MPI와 MPC는 유청만 분리한 WPI와 달리 카제인도 함께 담습니다. 어느 원료가 더 낫다고 단정하기보다
              단백질 총량, 유당 표시, 가격과 맛을 함께 비교하는 편이 실용적입니다.
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">카제인, 예전엔 찬밥이었지만 지금은 다시 주목받는 이유</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              카제인은 위산을 만나면 젤(gel) 형태로 뭉쳐 위에 오래 머무릅니다. 그래서 Boirie(1997) 연구 이후로
              &ldquo;유청 = 빠르고 근육에 좋은 단백질&rdquo;, &ldquo;카제인 = 느리고 근육 합성엔 상대적으로 약한 단백질&rdquo;이라는
              이분법이 보디빌딩·운동 커뮤니티에서 오래 굳어졌습니다. 하지만 반응은 연구 대상과 관찰 시간에 따라
              달라집니다. 운동 후 유청과 카제인을 비교한 인체 연구에서는 둘 다 근단백 합성을 높였습니다.
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              하지만 최근 10여 년 사이 연구 흐름은 이 특성을 &ldquo;단점&rdquo;이 아니라 &ldquo;다른 쓰임새&rdquo;로 재해석하는
              쪽으로 옮겨왔습니다. 대표적으로 Res 등(2012)의 취침 전(pre-sleep) 카제인 섭취 연구는 자는 동안
              천천히 방출되는 아미노산이 야간 근단백 합성을 오히려 끌어올릴 수 있다는 점을 보였고, 이후
              Trommelen과 van Loon(2016)의 리뷰에서도 취침 전 단백질 보충 전략의 근거로 카제인의 느린 소화
              특성이 다시 조명됐습니다. 포만감 측면에서도 Veldhorst 등(2009), Bendtsen 등(2013)의 연구가
              위 배출 속도가 느린 단백질일수록 식후 포만감이 더 오래 유지되는 경향을 보고하고 있습니다.
            </p>
            <div className="mt-4 rounded-xl border border-[#dce8df] bg-white px-4 py-4">
              <p className="text-sm font-semibold text-[#24543d]">정리하면</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                카제인은 근육 합성에 부적합한 원료가 아닙니다. 유청과 아미노산이 공급되는 시간대가 다르며,
                제품을 고를 때는 하루 단백질 섭취량과 함께 식사 간격·맛·포만감도 고려할 수 있습니다.
                더단백 밸런스, 하이뮨 프로틴 밸런스처럼 &ldquo;근육 증량용&rdquo;보다 &ldquo;식사 보완용&rdquo;을 표방하는
                제품들이 카제인·우유 단백질 비중을 상대적으로 높게 가져가는 것도 이런 맥락과 맞닿아 있습니다.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식물성(ISP)과 콜라겐 — 근육보다 다른 목적</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              분리대두단백(ISP)은 유당이 없는 식물성 원료이며 필수아미노산을 포함합니다. 원료별 아미노산 구성은
              다릅니다. van Vliet 등(2015)의 리뷰는 일부 식물성 단백질이 같은 g수 기준으로는
              동물성보다 근단백 합성 반응이 다소 낮게 나타날 수 있다고 보고하면서도, 섭취량을 늘리거나 여러
              식물성 단백질을 조합하면 이 차이를 상당 부분 보완할 수 있다고 정리합니다.
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              콜라겐은 흡수는 빠르지만 근육 합성의 핵심 아미노산인 류신이 거의 없어, 단백질 총량 채우기용으로는
              효율이 낮습니다. 대신 Shaw 등(2017)의 연구처럼 비타민C와 함께 섭취했을 때 콜라겐 합성 지표가
              올라간다는 결과가 있어, 피부·관절 관리 목적이라면 여전히 의미가 있는 선택지입니다.
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">목적별로 고르면 이렇게 정리됩니다</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">목적</th>
                    <th className="px-3 py-3 font-semibold">추천 급원</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {purposeRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td key={cell} className={`px-3 py-3 ${i === 1 ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-[var(--foreground)]">Q. {item.q}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 이어서 보면 좋은 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Link href="/guides/basics/digestion" className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#24543d]">단백질 소화와 흡수 메커니즘</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">급원 이야기를 몸속 흡수 과정과 함께 다시 봅니다.</p>
              </Link>
              <Link href="/guides/basics/muscle" className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#24543d]">단백질과 근육의 관계</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">근단백 합성이 실제로 어떻게 일어나는지 이어서 확인합니다.</p>
              </Link>
              <Link href="/guides/intake-strategy-health/meal-replacement-strategy" className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#24543d]">식사 대용 단백질 섭취 전략</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">카제인·우유 단백질이 왜 식사 대용에 유리한지 실전 기준으로 봅니다.</p>
              </Link>
            </div>
          </section>

          <p className="text-xs leading-5 text-[var(--foreground-muted)]">
            원료·연구 자료: <a href="https://www.thinkusadairy.org/products/milk-proteins/milk-protein-categories/milk-protein-isolate" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">MPI 성분</a> ·{" "}
            <a href="https://www.usdec.org/assets/documents/Customer%20Site/C3-Using%20Dairy/C3.7-Resources%20and%20Insights/03-Application%20and%20Technical%20Materials/Whey_Spec.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">WPI·WPC 성분</a> ·{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/21045172/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">유청·카제인 운동 후 비교 연구</a>.{" "}
            참고 문헌: Boirie Y, et al. (1997) PNAS · Res PT, et al. (2012) Med Sci Sports Exerc ·
            Trommelen J, van Loon LJ. (2016) Nutrients · Veldhorst MA, et al. (2009) Am J Clin Nutr ·
            Bendtsen LQ, et al. (2013) Nutrients · van Vliet S, et al. (2015) J Nutr · Shaw G, et al. (2017) Am J Clin Nutr.
            본 페이지는 각 연구의 결론을 일반 대중 눈높이로 요약한 것으로, 특정 제품의 의학적 효능을 보증하지 않습니다.
          </p>
        </div>
      </main>

      <GuideBuySection />
      <Footer />
    </div>
  );
}
