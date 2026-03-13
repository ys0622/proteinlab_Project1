import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAdminGuidesStaticRuntimeData } from "@/app/lib/adminGuidesStaticRuntime";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "단백질 가이드 | ProteinLab",
  description:
    "단백질 기초, 제품 선택, 섭취 전략, 운동 라이프스타일까지 한 번에 탐색하는 ProteinLab 가이드 허브입니다.",
};

const deepGreen = "#1f5138";

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
          {cms.mainPage.tracks.map((track) => {
            const section = cms.sections.find((item) => item.id === track.id || item.slug === track.href.replace("/guides/", ""));
            const featuredTopics = section?.articles.slice(0, 3).map((article) => article.title) ?? [];
            const popularTopic =
              section?.articles.find((article) => article.status === "live")?.title ??
              section?.articles[0]?.title ??
              "대표 콘텐츠 준비 중";

            return (
              <Link
                key={track.id}
                href={track.href}
                className="group flex h-full min-h-[292px] flex-col justify-between overflow-hidden rounded-2xl border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
              >
                <div className="h-1.5 w-full" style={{ background: track.accentColor }} />

                <div>
                  <div
                    className="border-b border-[#e7eee9] px-5 py-4"
                    style={{ background: `linear-gradient(135deg, ${track.accentBg} 0%, #fffdf8 100%)` }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                        style={{ color: track.accentColor }}
                      >
                        {track.subtitle}
                      </span>
                      <span className="rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">
                        {track.count}개 주제
                      </span>
                    </div>

                    <div className="mt-4 flex items-start gap-3">
                      <span
                        aria-hidden
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-white text-lg"
                      >
                        {track.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f7f76]" style={clampOneLine}>
                          {track.subtitle}
                        </p>
                        <h2
                          className="mt-1 text-lg font-bold transition-colors group-hover:text-[var(--accent)]"
                          style={{ color: deepGreen }}
                        >
                          {track.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-4">
                    <p className="text-[13px] leading-[1.7] text-[var(--foreground-muted)]" style={clampTwoLines}>
                      {track.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7c8b84]">대표 콘텐츠</p>

                      <div className="mt-2 hidden flex-wrap gap-2 md:flex">
                        {featuredTopics.map((topic) => (
                          <span
                            key={`${track.id}-${topic}`}
                            className="inline-flex items-center rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <ul className="mt-2 space-y-1.5 md:hidden">
                        {featuredTopics.map((topic) => (
                          <li
                            key={`${track.id}-mobile-${topic}`}
                            className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]"
                          >
                            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8c9c0]" />
                            <span style={clampOneLine}>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2.5">
                      <p className="text-[11px] font-semibold" style={{ color: deepGreen }}>
                        인기 콘텐츠
                      </p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]" style={clampOneLine}>
                        {popularTopic}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <span className="flex items-center justify-center rounded-lg border border-[#cfe0d5] bg-white py-2.5 text-xs font-semibold text-[#2f5d46] transition-colors group-hover:bg-[#eef5f0] group-hover:text-[#1f4834]">
                    가이드 보기
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
