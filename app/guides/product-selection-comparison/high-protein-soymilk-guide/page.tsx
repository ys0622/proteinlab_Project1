import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import CategoryDataSection from "@/app/components/CategoryDataSection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { soymilkProducts } from "@/app/data/products";
import { getCapacityMl } from "@/app/lib/productFilters";

const TITLE = "단백질 두유 추천 | 성분·당류 비교";
const DESCRIPTION =
  "단백질 두유 추천을 찾을 때 한 팩 단백질, 당류, 열량, 용량을 비교하는 순서를 등록 제품 성분표 수치로 정리합니다.";
const URL = "https://proteinlab.kr/guides/product-selection-comparison/high-protein-soymilk-guide";

export const metadata = {
  alternates: { canonical: URL },
  title: TITLE,
  description: DESCRIPTION,
};

const std = soymilkProducts.filter((p) => getCapacityMl(p) === 190);
const minMax = (values: number[]) => ({ min: Math.min(...values), max: Math.max(...values) });
const stdProtein = minMax(std.map((p) => p.proteinPerServing));
const stdCal = minMax(std.map((p) => p.calories ?? 0));
const allSugar = minMax(soymilkProducts.map((p) => p.sugar ?? 0));
const lowSugarCount = soymilkProducts.filter((p) => (p.sugar ?? 999) < 3).length;
const otherSizes = soymilkProducts
  .filter((p) => getCapacityMl(p) !== 190)
  .map((p) => `${p.brand} ${p.name} ${p.capacity} ${p.proteinPerServing}g`)
  .join(", ");

const criteria = [
  {
    title: "1팩 단백질",
    body: `ProteinLab은 소포장 두유를 1팩 단백질 기준으로 고단백(11g 이상), 단백질 강화(8~10g), 일반(5~7g)으로 나눕니다. 등록된 190mL 두유는 1팩 단백질 ${stdProtein.min}~${stdProtein.max}g입니다. 용량이 다른 제품(${otherSizes})은 따로 구분해서 봐야 합니다. 팩 용량이 다르면 총량만 비교하지 말고 100mL당 단백질도 함께 보세요.`,
  },
  {
    title: "당류",
    body: `같은 고단백 두유라도 1팩 당류는 ${allSugar.min}g부터 ${allSugar.max}g까지 차이가 납니다. 성분표 기준 당류 3g 미만인 제품은 ${lowSugarCount}종이며, 저당 큐레이션에서 모아 볼 수 있습니다.`,
  },
  {
    title: "열량",
    body: `190mL 팩 기준 열량은 ${stdCal.min}kcal부터 ${stdCal.max}kcal까지 나뉩니다. 단백질이 같아도 열량 차이가 크게 날 수 있습니다.`,
  },
];

const matrix = [
  ["플레인", "당류와 열량이 낮은 편인지", "당류, 열량", "제품마다 첨가 감미료 표기가 다름"],
  ["검은콩", "고소한 맛, 당류 차이", "당류, 칼슘", "같은 검은콩이라도 당류 차이가 큼"],
  ["초코·견과", "맛 만족도와 열량", "열량, 지방", "지방·당류가 함께 높아질 수 있음"],
  ["저당형", "당류 3g 미만 여부", "당류, 단백질", "성분표의 알룰로오스 표기를 같이 확인"],
];

const checks = [
  "1팩 단백질(g)과 당류(g)를 먼저 보고, 열량으로 마무리하기",
  "팩 용량이 190mL인지 240mL인지 확인하고 100mL당 값으로 다시 비교하기",
  "성분표에 알룰로오스가 별도 줄로 표기된 제품이 있습니다(매일두유 고단백 플레인 4g, 매일두유 고단백 검은콩 1.2g, 연세두유 고단백 Pro 5.8g, 연세두유 고단백 플레인 무가당 4.3g, 이롬 검은콩 4.2g, 이롬 플레인 4.7g). 당류와 별도 표기이므로 성분표를 직접 확인하세요",
  "쿠팡 목록에는 같은 제품이 16개~96개 묶음으로 함께 보이므로, 묶음 총량이 아니라 1팩 기준으로 비교하기",
];

const relatedLinks = [
  {
    href: "/soymilk",
    title: "두유 전체 비교",
    description: "등록된 두유를 단백질 구간, 당류, 열량 기준으로 한 화면에서 비교합니다.",
  },
  {
    href: "/curation/soymilk-low-sugar",
    title: "저당 두유 보기",
    description: "당류 3g 미만 두유만 모아서 단백질과 함께 비교합니다.",
  },
  {
    href: "/guides/product-selection-comparison/morning-soymilk-guide",
    title: "아침 두유 추천",
    description: "아침에 마실 두유를 단백질·당류·열량 기준으로 비교합니다.",
  },
];

const faqItems = [
  {
    question: "단백질 두유 추천 제품은 단백질 수치만 보면 되나요?",
    answer: "단백질만으로 고르지 말고 당류, 열량, 팩 용량을 함께 비교하세요. 용량이 다른 제품은 한 팩 총량과 용량당 수치를 같이 확인해야 합니다.",
  },
  {
    question: "고단백 두유와 일반 두유는 어떻게 구분하나요?",
    answer: `ProteinLab은 등록 제품을 한 팩 단백질 기준으로 구분합니다. 현재 고단백 구간에 해당하는 제품 수는 ${soymilkProducts.filter((p) => p.proteinPerServing >= 11).length}종이며, 개별 수치는 아래 데이터 표에서 확인할 수 있습니다.`,
  },
  {
    question: "단백질이 같으면 어떤 항목을 비교하나요?",
    answer: "한 팩 당류와 열량, 용량, 맛 유형을 비교하세요. 같은 단백질 수치라도 제품 라인에 따라 다른 영양정보가 달라질 수 있습니다.",
  },
];

export default function HighProteinSoymilkGuidePage() {
  const jsonLd = buildGuideJsonLd({
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: "2026-10-12",
    dateModified: "2026-10-18",
    faq: faqItems,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}

      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>고단백 두유 고르는 법</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            고단백 두유는 1팩 단백질과 당류부터 봅니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            이름이 비슷한 두유도 단백질과 당류, 열량 차이가 큽니다.
            <br />
            성분표 수치를 기준으로 어떤 순서로 비교하면 좋은지 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 보는 3가지 수치</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {criteria.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">맛 유형별 체크 매트릭스</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">유형</th>
                    <th className="px-3 py-3 font-semibold">먼저 볼 것</th>
                    <th className="px-3 py-3 font-semibold">주요 수치</th>
                    <th className="px-3 py-3 font-semibold">주의점</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">비교 전에 체크할 기준</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {checks.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 두유 추천 검색에서 후보를 좁히는 법</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">한 팩 단백질</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">제품별 표시 단백질을 먼저 확인하고, 팩 크기가 다르면 용량당 단백질도 함께 봅니다.</p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">당류와 열량</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">단백질이 같은 후보는 당류와 열량을 나란히 놓으면 제품 라인의 차이를 확인하기 쉽습니다.</p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">원료와 맛 유형</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">플레인·검은콩·초코처럼 맛이 다르면 영양정보도 달라질 수 있어 개별 성분표를 확인합니다.</p>
              </article>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 같이 보면 좋은 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[#dce8df] bg-white p-4 transition-colors hover:bg-[#eef7f1]"
                >
                  <p className="text-sm font-semibold text-[#24543d]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <CategoryDataSection category="soymilk" mode="lowSugar" />
      <GuideBuySection slugs={["maeil-soymilk-protein-plain-190", "vegemil-protein-plain-190", "nam-gt-protein-190"]} />
      <Footer />
    </div>
  );
}
