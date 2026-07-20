import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료 마시고 설사하는 이유 | 유당·감미료·섭취량 체크";
const pageDescription =
  "단백질 음료를 마신 뒤 설사, 복부 팽만, 가스가 생기는 이유를 유당, 감미료, 한 번에 마시는 양 기준으로 정리하고 부담을 줄이는 선택법을 안내합니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-diarrhea";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: { card: "summary" as const, title: pageTitle, description: pageDescription },
};

const causeRows = [
  ["유당 민감도", "밀크형 RTD, 우유 기반 제품에서 더 잘 느껴질 수 있습니다.", "락토프리, 워터형, 식물성 라인을 먼저 확인합니다."],
  ["한 번에 많은 단백질", "평소보다 많은 양을 빠르게 마시면 더부룩함이나 묽은 변이 생길 수 있습니다.", "20~30g대 제품부터 시작하거나 반 병씩 나눠 마십니다."],
  ["감미료·당알코올", "저당 제품의 단맛 성분이 개인에 따라 장 부담으로 느껴질 수 있습니다.", "성분표를 보고 같은 증상이 반복되는 성분을 피합니다."],
  ["공복·차가운 음용", "공복에 급하게 마시거나 아주 차갑게 마실 때 위장 반응이 커질 수 있습니다.", "식사 후 또는 천천히 마시는 방식으로 바꿔봅니다."],
];

const nextLinks = [
  {
    href: "/guides/intake-strategy-health/protein-drink-empty-stomach",
    title: "단백질 음료 공복",
    body: "공복에 마실 때 속이 불편한지 먼저 확인합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-sugar",
    title: "단백질 음료 당류 기준",
    body: "저당 제품의 감미료와 당류 기준을 함께 봅니다.",
  },
  {
    href: "/guides/product-selection-comparison/lactose-free-protein-drink",
    title: "락토프리 단백질 음료 보기",
    body: "유당이 의심된다면 락토프리 제품군부터 좁혀보세요.",
  },
  {
    href: "/guides/product-selection-comparison/newcare-allprotein",
    title: "뉴케어 올프로틴 라인업",
    body: "41g, 25g, 워터, 식물성 라인을 목적별로 비교합니다.",
  },
  {
    href: "/topics/mid-protein-alternatives",
    title: "중단백 대안 추천",
    body: "고함량 제품이 부담스럽다면 20~29g대 후보부터 확인합니다.",
  },
];

const faq = [
  {
    question: "단백질 음료를 마시면 왜 설사가 날 수 있나요?",
    answer:
      "유당 민감도, 감미료, 한 번에 많은 단백질 섭취, 공복 음용 등이 원인이 될 수 있습니다. 같은 제품에서 반복되면 성분과 섭취량을 먼저 확인하는 편이 좋습니다.",
  },
  {
    question: "유당불내증이면 단백질 음료를 피해야 하나요?",
    answer:
      "반드시 모두 피해야 하는 것은 아닙니다. 개인이 견딜 수 있는 유당 양은 다르며, 락토프리나 워터형, 식물성 제품이 더 편할 수 있습니다.",
  },
  {
    question: "설사가 계속되면 어떻게 해야 하나요?",
    answer:
      "제품을 바꿔도 증상이 반복되거나 복통, 탈수, 혈변, 체중 감소가 동반되면 단순 제품 문제가 아닐 수 있으므로 의료 전문가와 상담해야 합니다.",
  },
  {
    question: "단백질 음료를 공복에 마셔서 설사가 날 수도 있나요?",
    answer:
      "공복에 급하게 마시거나 아주 차갑게 마시면 위장 반응이 커질 수 있습니다. 같은 제품을 식후에 천천히 마셨을 때도 반복되는지 확인해보세요.",
  },
  {
    question: "저당 단백질 음료도 설사를 유발할 수 있나요?",
    answer:
      "개인에 따라 감미료나 당알코올 성분이 장 부담으로 느껴질 수 있습니다. 저당 여부만 보지 말고 성분표와 반복 반응을 함께 확인하는 편이 좋습니다.",
  },
];

export default function ProteinDrinkDiarrheaPage() {
  const jsonLd = buildGuideJsonLd({ title: pageTitle, description: pageDescription, url: canonical, faq });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>단백질 음료 설사</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료 마시고 설사한다면,
            <br />
            제품보다 원인부터 나눠봐야 합니다.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료가 항상 문제라는 뜻은 아닙니다. 유당, 감미료, 한 번에 마시는 양, 공복 음용처럼
            몇 가지 조건이 겹치면 복부 팽만이나 묽은 변이 생길 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 확인할 4가지 원인</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#dce8df]">
                    <th className="px-3 py-3 font-semibold">가능한 원인</th>
                    <th className="px-3 py-3 font-semibold">어떻게 나타나나</th>
                    <th className="px-3 py-3 font-semibold">대응</th>
                  </tr>
                </thead>
                <tbody>
                  {causeRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#e8efe9] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 leading-6 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">부담을 줄이는 선택 순서</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">1. 같은 제품을 공복이 아닌 식후에 천천히 마셔봅니다.</li>
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">2. 그래도 반복되면 반 병 또는 20g대 제품으로 양을 줄입니다.</li>
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">3. 밀크형이 계속 불편하면 락토프리, 워터형, 식물성 라인으로 바꿉니다.</li>
            </ol>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 볼 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {nextLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <div key={item.question} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GuideBuySection />
      <Footer />
    </div>
  );
}
