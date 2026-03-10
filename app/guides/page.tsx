import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getGuideTracks } from "../data/guidesTracks";

export const metadata = {
  title: "단백질 가이드 | ProteinLab",
  description:
    "단백질 기초, 제품 선택, 섭취 전략, 운동 라이프스타일, 시장 인사이트, 계산 도구까지 한곳에서 탐색할 수 있는 ProteinLab 가이드입니다.",
};

const tracks = getGuideTracks();

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <h1 className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 가이드
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 기초부터 제품 선택, 섭취 전략, 운동별 활용, 시장 인사이트까지 주제별로
            정리했습니다. 필요한 트랙부터 바로 살펴보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => (
            <Link
              key={track.slug}
              href={`/guides/${track.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8]"
            >
              <div>
                <div className="border-b border-[#f0eeeb] px-5 pb-3 pt-4">
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                    style={{ background: track.accentBg, color: track.accentColor }}
                  >
                    {track.label}
                  </span>
                </div>

                <div className="px-5 pb-5 pt-4">
                  <h2 className="text-lg font-bold text-[var(--foreground)]">{track.title}</h2>
                  <p className="mt-1 text-xs text-[#8d8d8d]">{track.slots.length}개 주제</p>
                  <p className="mt-3 text-[13px] leading-6 text-[var(--foreground-muted)]">
                    {track.cardDescription ?? track.description}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
                    {track.cardNote ?? track.slots.slice(0, 3).map((slot) => slot.title).join(", ")}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <span className="flex items-center justify-center rounded-lg border border-[#e8e6e3] py-2.5 text-xs font-semibold text-[#374151] transition-colors group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)]">
                  {track.ctaLabel ?? "주제 보러 가기"}
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
