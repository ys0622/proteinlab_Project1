import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAdminGuidesStaticRuntimeData } from "@/app/lib/adminGuidesStaticRuntime";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "단백질 가이드 모음 | 음료·쉐이크·바·요거트 비교·추천",
  description:
    "단백질 음료 비교, 쉐이크 추천, 단백질 바·요거트 선택법까지 한 번에 찾을 수 있는 ProteinLab 대표 가이드 허브입니다.",
};

const clampTwoLines = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

const clampOneLine = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

export default async function GuidesPage() {
  const cms = await getAdminGuidesStaticRuntimeData();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto flex min-h-[148px] max-w-[1200px] flex-col justify-center px-4 py-5 md:min-h-[164px] md:px-6 md:py-6">
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
          {cms.mainPage.tracks.map((track) => {
            const section = cms.sections.find((item) => item.id === track.id || item.slug === track.href.replace("/guides/", ""));
            const featuredTopics = section?.articles.slice(0, 3) ?? [];
            const popularTopic =
              section?.articles.find((article) => article.status === "live")?.title ??
              section?.articles[0]?.title ??
              "대표 콘텐츠 준비 중";

            return (
              <Link
                key={track.id}
                href={track.href}
                className="group grid h-full min-h-[296px] grid-rows-[auto_1fr_auto] overflow-hidden rounded-[24px] border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
              >
                <div className="h-1.5 w-full" style={{ background: track.accentColor }} />

                <div>
                  <div
                    className="min-h-[116px] border-b border-[#e7eee9] px-4 py-3"
                    style={{ background: `linear-gradient(135deg, ${track.accentBg} 0%, #fffdf8 100%)` }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="shrink-0 whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                        style={{ color: track.accentColor }}
                      >
                        {track.subtitle}
                      </span>
                      <span className="shrink-0 whitespace-nowrap rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">
                        {track.count}개 주제
                      </span>
                    </div>

                    <div className="mt-3 flex items-start gap-3">
                      <span
                        aria-hidden
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-white text-lg shadow-[0_4px_10px_rgba(20,40,28,0.06)]"
                      >
                        {track.emoji}
                      </span>
                      <div className="min-w-0">
                        <h2
                          className="min-h-[52px] text-[17px] font-bold leading-7 transition-colors group-hover:text-[var(--accent)]"
                          style={{ ...clampTwoLines, color: track.accentColor }}
                        >
                          {track.title}
                        </h2>
                        <p className="mt-1 whitespace-nowrap text-[12px] font-medium text-[#6f7f76]" style={clampOneLine}>
                          {track.count}개 주제
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-h-[142px] flex-col px-4 pb-4 pt-3">
                    <p className="min-h-[42px] text-[13px] leading-[1.6] text-[var(--foreground-muted)]" style={clampTwoLines}>
                      {track.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7c8b84]">지금 많이 찾는 주제</p>

                      <div className="mt-2 hidden flex-wrap gap-1.5 md:flex">
                        {featuredTopics.map((article) => (
                          <span
                            key={`${track.id}-${article.slug}`}
                            className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]"
                          >
                            <span aria-hidden>{article.emoji}</span>
                            <span className="max-w-[160px]" style={clampOneLine}>{article.title}</span>
                          </span>
                        ))}
                      </div>

                      <ul className="mt-2 space-y-1.5 md:hidden">
                        {featuredTopics.map((article) => (
                          <li
                            key={`${track.id}-mobile-${article.slug}`}
                            className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]"
                          >
                            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8c9c0]" />
                            <span style={clampOneLine}>
                              {article.emoji} {article.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2">
                      <p className="text-[11px] font-semibold" style={{ color: track.accentColor }}>
                        먼저 보면 좋은 글
                      </p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]" style={clampOneLine}>
                        {popularTopic}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <span
                    className="flex items-center justify-center rounded-lg border bg-white py-2.5 text-xs font-semibold transition-colors"
                    style={{
                      borderColor: track.accentBg,
                      color: track.accentColor,
                    }}
                  >
                    이 트랙 바로 보기
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
