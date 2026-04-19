import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAdminGuidesStaticRuntimeData } from "@/app/lib/adminGuidesStaticRuntime";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "단백질 가이드 모음 — 음료·쉐이크·바·요거트 비교·추천",
  description:
    "단백질 음료 비교, 쉐이크 추천, 단백질 바·요거트 선택법까지 한 번에 찾을 수 있는 ProteinLab 대표 가이드 허브입니다.",
  alternates: {
    canonical: "https://proteinlab.kr/guides",
  },
  openGraph: {
    title: "단백질 가이드 모음 — 음료·쉐이크·바·요거트 비교·추천",
    description:
      "단백질 음료 비교, 쉐이크 추천, 단백질 바·요거트 선택법까지 한 번에 찾을 수 있는 ProteinLab 대표 가이드 허브입니다.",
    url: "https://proteinlab.kr/guides",
    type: "website",
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary",
    title: "단백질 가이드 모음 — 음료·쉐이크·바·요거트 비교·추천",
    description:
      "단백질 음료 비교, 쉐이크 추천, 단백질 바·요거트 선택법까지 한 번에 찾을 수 있는 ProteinLab 대표 가이드 허브입니다.",
  },
};

export default async function GuidesPage() {
  const cms = await getAdminGuidesStaticRuntimeData();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://proteinlab.kr/guides" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            {cms.mainPage.title}
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {cms.mainPage.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cms.mainPage.tracks.map((track) => (
            <Link
              key={track.id}
              href={track.href}
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
            >
              <div className="flex flex-1 flex-col px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                    style={{ color: track.accentColor }}
                  >
                    {track.subtitle}
                  </span>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">
                    {track.count}개 주제
                  </span>
                </div>
                <h2
                  className="mt-4 text-[17px] font-bold leading-7 transition-colors group-hover:text-[var(--accent)]"
                  style={{ color: track.accentColor }}
                >
                  {track.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-[1.6] text-[var(--foreground-muted)]">
                  {track.description}
                </p>
              </div>
              <div className="px-5 pb-5">
                <span
                  className="flex items-center justify-center rounded-lg border bg-white py-2.5 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: track.accentColor + "33",
                    color: track.accentColor,
                  }}
                >
                  이 트랙 바로 보기
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
