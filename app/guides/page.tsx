import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getGuideTracks } from "../data/guidesTracks";

export const metadata = {
  title: "단백질 가이드 | Track 기반 콘텐츠 허브 | ProteinLab",
  description:
    "단백질 기초, 제품 선택, 섭취 전략, 운동 라이프스타일, 시장 인사이트까지. ProteinLab Guides를 Track 기반 허브 구조로 탐색하세요.",
};

const tracks = getGuideTracks();

export default function GuidesPage() {
  const totalSlots = tracks.reduce((sum, track) => sum + track.slots.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)]">PROTEINLAB GUIDES</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 가이드
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 기초부터 제품 선택, 섭취 전략, 운동 라이프스타일, 시장 흐름까지 한곳에서
            이어서 볼 수 있도록 가이드를 트랙별로 정리했습니다. 필요한 주제부터 바로 탐색해보세요.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard label="가이드 트랙" value={`${tracks.length}개`} detail="기초부터 시장 인사이트까지" />
            <SummaryCard label="준비된 주제" value={`${totalSlots}개`} detail="각 주제별로 순차 확장 예정" />
            <SummaryCard label="탐색 방식" value="트랙별 정리" detail="주제 흐름에 맞춰 이어서 탐색" />
          </div>
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
                  <p className="mt-1 text-xs text-[#8d8d8d]">{track.slots.length}개 콘텐츠 슬롯</p>
                  <p className="mt-3 text-[13px] leading-6 text-[var(--foreground-muted)]">
                    {track.description}
                  </p>

                  <div className="mt-4 rounded-xl border border-[#efe8df] bg-white px-3 py-3">
                    <p className="text-xs font-semibold text-[#8f8a84]">허브 방향</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                      {track.hubSummary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <span className="flex items-center justify-center rounded-lg border border-[#e8e6e3] py-2.5 text-xs font-semibold text-[#374151] transition-colors group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)]">
                  트랙 허브 보기
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

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-[#ebe7e2] bg-white px-4 py-4">
      <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{value}</p>
      <p className="mt-1 text-sm leading-5 text-[var(--foreground-muted)]">{detail}</p>
    </div>
  );
}
