import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProteinToolsClient from "./ProteinToolsClient";
import { getGuideTrack } from "@/app/data/guidesTracks";

export const metadata = {
  title: "하루 단백질 섭취량 계산기 | ProteinLab",
  description:
    "체중과 운동량을 기반으로 하루 단백질 섭취량을 계산해보세요. ProteinLab 계산기를 통해 나에게 필요한 단백질 권장량을 확인할 수 있습니다.",
  keywords: [
    "하루 단백질 섭취량",
    "단백질 섭취량 계산기",
    "단백질 하루 권장량",
    "단백질 얼마나 먹어야",
    "체중별 단백질 섭취량",
  ],
};

export default function ProteinToolsPage() {
  const trackData = getGuideTrack("tools");

  if (!trackData) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>{trackData.title}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: trackData.accentBg, color: trackData.accentColor }}
            >
              {trackData.label}
            </span>
            <span className="text-xs text-[#8b8b8b]">{trackData.slots.length}개 도구 주제</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 계산 & 도구
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            체중과 운동량을 기반으로 하루 단백질 섭취량을 계산하고 목표에 맞는 단백질 섭취
            전략을 확인해보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {trackData.slots.map((slot, index) => {
              const isActiveTool = index === 0;

              return (
                <div
                  key={slot.slug}
                  className="flex h-full flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5"
                >
                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">
                      {isActiveTool ? "AVAILABLE NOW" : "COMING NEXT"}
                    </p>
                    <h2 className="mt-2 text-base font-bold text-[var(--foreground)]">{slot.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                      {slot.description}
                    </p>
                  </div>

                  {isActiveTool ? (
                    <Link
                      href="#daily-protein-calculator"
                      className="mt-5 inline-flex items-center text-sm font-semibold text-[var(--accent)]"
                    >
                      계산기 바로가기
                    </Link>
                  ) : (
                    <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#8b8b8b]">
                      준비 중
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <ProteinToolsClient />
      </main>

      <Footer />
    </div>
  );
}
