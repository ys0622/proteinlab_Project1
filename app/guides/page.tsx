import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import guidesStaticData from "../data/guidesStaticData.json";

export const metadata = {
  title: "단백질 가이드 | ProteinLab",
  description: "단백질 섭취 기초부터 시장 흐름, 실전 활용까지 한 번에 정리한 가이드",
};

const { mainPage } = guidesStaticData;

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1
            className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            {mainPage.title}
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            {mainPage.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mainPage.tracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="group flex flex-col justify-between"
              style={{
                border: "1px solid #e8e6e3",
                borderRadius: "16px",
                background: "#FFFDF8",
                overflow: "hidden",
              }}
            >
              <div>
                <div className="px-5 pt-4 pb-2" style={{ borderBottom: "1px solid #f0eeeb" }}>
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                    style={{ background: track.accentBg, color: track.accentColor }}
                  >
                    {track.subtitle}
                  </span>
                </div>

                <div className="px-5 pt-4 pb-5">
                  <h2 className="text-lg font-bold text-[var(--foreground)]">
                    {track.emoji} {track.title}
                  </h2>
                  <p className="mt-1 text-xs" style={{ color: "#999" }}>
                    글 수 {track.count}개
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                    {track.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <span
                  className="flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold transition-colors group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)]"
                  style={{ border: "1px solid #e8e6e3", color: "#374151" }}
                >
                  보러 가기 →
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
