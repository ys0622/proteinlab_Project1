import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "단백질 급원 종류 완전정리 | WPH·WPI·WPC부터 카제인·식물성까지";
const _pageDesc = "유청(WPH·WPI·WPC), 우유(MPC·MPI), 카제인, 식물성(ISP), 콜라겐까지 단백질 급원별 특징, 소화도, 장단점, 섭취 목적을 연구 근거와 함께 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/basics/protein-source-types" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/basics/protein-source-types",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const sourceTable = [
  {
    group: "Whey",
    type: "WPH (가수분해유청)",
    feature: "WPI를 한 번 더 가수분해",
    digestion: "매우 높음",
    pros: "흡수율 최고, 유당 없음",
    cons: "비쌈",
    purpose: "흡수가 빨라 근육 합성에 직합",
  },
  {
    group: "Whey",
    type: "WPI (분리유청)",
    feature: "유청 → 유당을 제거한 버전 (단백질 비중 90%)",
    digestion: "높음",
    pros: "흡수 우수, 유당 없음",
    cons: "비쌈",
    purpose: "흡수가 빨라 근육 합성에 직합",
  },
  {
    group: "Whey",
    type: "WPC (농축유청)",
    feature: "우유에서 유청만 남김 (단백질 비중 70~80%)",
    digestion: "보통~높음",
    pros: "풍미가 좋고 저렴함",
    cons: "유당 포함 → 소화 불편",
    purpose: "흡수가 빨라 근육 합성에 직합",
  },
  {
    group: "Milk",
    type: "MPC (농축우유)",
    feature: "유청:카제인(2:8) 자연 비율",
    digestion: "보통~높음",
    pros: "우유 본연의 단백질 비중 유지",
    cons: "단백질 비율이 낮고, 유당 포함",
    purpose: "우유와 가장 근접한 관능으로 맛있게 단백질 섭취 가능",
  },
  {
    group: "Milk",
    type: "MPI (분리우유)",
    feature: "유청:카제인(2:8) 자연 비율 → 유당 제거",
    digestion: "높음",
    pros: "유당 없음",
    cons: "비쌈",
    purpose: "우유와 가장 근접한 관능으로 맛있게 단백질 섭취 가능",
  },
  {
    group: "Casein",
    type: "Casein",
    feature: "우유(유청+카제인)에서 카제인을 발라냄",
    digestion: "중간",
    pros: "소화가 느려 포만감 높음",
    cons: "근육 합성엔 부적합",
    purpose: "포만감, 묵직함",
  },
  {
    group: "식물성",
    type: "ISP (Isolated Soy)",
    feature: "콩에서 추출한 단백질",
    digestion: "높음",
    pros: "맛, 저렴함",
    cons: "아미노산 부족",
    purpose: "맛, 포만감",
  },
  {
    group: "Collagen",
    type: "Collagen",
    feature: "콜라겐(생선/동물 등)에서 추출한 단백질",
    digestion: "높음",
    pros: "소화, 흡수 빠름",
    cons: "아미노산 부족",
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
  ["운동 직후, 빠른 근육 합성이 목표", "WPH · WPI", "류신 함량이 높고 소화·흡수가 빨라 운동 직후 근단백 합성 반응이 가장 즉각적입니다."],
  ["가성비와 맛을 같이 보고 싶을 때", "WPC", "유당이 남아있어 풍미가 좋고 가격이 낮은 편이지만, 유당불내증이 있으면 속이 부대낄 수 있습니다."],
  ["우유 본연의 맛에 가깝게 마시고 싶을 때", "MPC · MPI", "유청과 카제인이 우유 속 자연 비율(2:8)로 들어 있어 밀크 셰이크에 가까운 관능을 냅니다."],
  ["식사 대용, 포만감이 우선일 때", "Casein", "소화가 느려 포만감이 오래가고, 자는 동안 아미노산을 천천히 공급합니다."],
  ["유당 부담을 피하고 싶을 때", "ISP (식물성)", "유제품이 아니라서 유당 문제가 없고 상대적으로 저렴하지만, 필수아미노산 구성이 동물성보다 불균형합니다."],
  ["깔끔한 목넘김, 피부·관절 관리가 목적일 때", "Collagen", "근육 합성용 단백질로는 적합하지 않지만, 흡수가 빠르고 비타민C와 함께 먹으면 콜라겐 합성에 도움이 됩니다."],
];

const faqItems = [
  {
    q: "WPI와 WPC 중 뭘 먼저 골라야 하나요?",
    a: "유당불내증이 있거나 흡수 속도를 최우선으로 본다면 WPI, 가격과 맛을 더 중요하게 본다면 WPC가 무난합니다. 단백질 비중 자체는 WPI(약 90%)가 WPC(약 70~80%)보다 높습니다.",
  },
  {
    q: "카제인은 근육 합성에 정말 안 좋은가요?",
    a: "빠른 근단백 합성 반응만 보면 유청보다 느린 것은 사실입니다. 다만 이는 '나쁘다'가 아니라 '역할이 다르다'에 가깝습니다. 천천히 흡수되는 특성 덕분에 포만감 유지, 취침 전 보충, 식사 대용 목적에는 오히려 유리하게 쓰일 수 있습니다.",
  },
  {
    q: "식물성 단백질(ISP)만으로 근육을 만들 수 있나요?",
    a: "가능하지만 동물성보다 총 섭취량을 조금 더 늘리는 편이 안전합니다. 콩 단백질은 메티오닌 같은 일부 필수아미노산이 상대적으로 부족해서, 같은 g수라도 동물성 단백질보다 근단백 합성 반응이 약간 낮게 나타나는 경향이 보고되어 있습니다. 이 차이는 섭취량을 늘리거나 다른 식물성 단백질과 조합하면 상당 부분 보완할 수 있습니다.",
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
            단백질도 원료에 따라 역할이 다릅니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 "단백질"이라도 유청, 우유, 카제인, 식물성, 콜라겐은 소화 속도와 아미노산 구성이 전혀 다릅니다.
            원료를 이해하면 운동 직후·취침 전·식사 대용처럼 목적에 맞는 제품을 훨씬 정확하게 고를 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
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
              기본형(단백질 비중 70~80%)이고, WPI는 여기서 유당과 지방을 더 걸러내 단백질 비중을 약 90%까지 끌어올린
              버전입니다. WPH는 WPI를 한 번 더 가수분해(단백질을 미리 잘게 쪼갬)해 소화·흡수 속도를 극대화한 최상위 등급입니다.
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
              그대로 유지한 채 우유에서 수분과 당질 일부만 덜어낸 형태이고, MPI(분리우유단백)는 여기서 유당까지
              제거한 버전입니다. 그래서 MPC·MPI는 유청 단독 제품보다 우유 본연의 맛과 질감에 가장 가깝게 느껴집니다.
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              대신 유청 비중이 낮고 카제인 비중이 높아, WPI·WPH만큼 흡수가 빠르지는 않습니다. &ldquo;맛있게, 골고루&rdquo;
              단백질을 채우고 싶을 때 적합한 선택지로 보는 것이 정확합니다.
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">카제인, 예전엔 찬밥이었지만 지금은 다시 주목받는 이유</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              카제인은 위산을 만나면 젤(gel) 형태로 뭉쳐 위에 오래 머무릅니다. 그래서 Boirie(1997) 연구 이후로
              &ldquo;유청 = 빠르고 근육에 좋은 단백질&rdquo;, &ldquo;카제인 = 느리고 근육 합성엔 상대적으로 약한 단백질&rdquo;이라는
              이분법이 보디빌딩·운동 커뮤니티에서 오래 굳어졌습니다. 실제로 같은 시간 안에 나타나는 근단백 합성
              반응만 비교하면 카제인이 유청보다 낮게 나타나는 경향은 여러 연구에서 반복 확인됩니다.
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
                &ldquo;운동 직후 빠르게 근육을 채운다&rdquo;는 기준으로 보면 카제인은 여전히 유청보다 불리합니다.
                하지만 최근 단백질 제품 소비층이 운동 전용에서 다이어트·식사 대용까지 넓어지면서,
                천천히 소화되고 포만감이 오래가는 카제인의 특성 자체가 오히려 강점이 되는 시장이 커지고 있습니다.
                더단백 밸런스, 하이뮨 프로틴 밸런스처럼 &ldquo;근육 증량용&rdquo;보다 &ldquo;식사 보완용&rdquo;을 표방하는
                제품들이 카제인·우유 단백질 비중을 상대적으로 높게 가져가는 것도 이런 맥락과 맞닿아 있습니다.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식물성(ISP)과 콜라겐 — 근육보다 다른 목적</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              분리대두단백(ISP)은 유당 문제가 없고 가격이 낮은 것이 강점이지만, 메티오닌 같은 일부 필수아미노산
              함량이 동물성 단백질보다 낮습니다. van Vliet 등(2015)의 리뷰는 식물성 단백질이 같은 g수 기준으로는
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
