import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 · 라이프스타일 | ProteinLab",
  description:
    "러닝, 마라톤, 운동 영양, 근력운동, 운동 초보 가이드를 Track D에서 정리합니다.",
};

const topics = [
  {
    title: "러닝 단백질 가이드",
    href: "/guides/fitness-lifestyle/running-protein-guide",
    description:
      "러너에게 필요한 하루 단백질 기준, 운동 후 회복 타이밍, 제품 비교 포인트를 먼저 정리합니다.",
    question: "러너는 하루에 단백질을 얼마나 먹어야 할까?",
    related: ["1.6~2.0 g/kg/day", "운동 후 20~30g", "하루 4회 분산"],
    badge: "기초",
  },
  {
    title: "마라톤 영양 전략",
    href: "/guides/fitness-lifestyle/marathon-protein-guide",
    description:
      "훈련기와 레이스 주간을 나눠 보고, 카보 로딩과 회복 식단까지 연결해서 설명합니다.",
    question: "레이스 전후에는 무엇을 다르게 준비해야 할까?",
    related: ["카보 로딩", "레이스 주간 체크", "회복 식단"],
    badge: "경기",
  },
  {
    title: "거리별 영양 및 훈련 전략",
    href: "/guides/fitness-lifestyle/marathon-distance-strategy",
    description:
      "5km, 10km, 하프, 풀 마라톤을 거리별로 나눠 훈련 특징과 영양 전략을 비교합니다.",
    question: "거리별로 단백질과 탄수화물 전략은 어떻게 달라질까?",
    related: ["5km·10km", "하프·풀", "운동 후 단백질"],
    badge: "거리별",
  },
  {
    title: "운동 영양 & 제품 비교",
    href: "/guides/fitness-lifestyle/sports-nutrition-guide",
    description:
      "운동 목적에 따라 어떤 제품이 맞는지, 단백질 종류와 당류·칼로리 기준을 함께 정리합니다.",
    question: "회복용 제품은 어떤 기준으로 골라야 할까?",
    related: ["고단백", "저당", "식물성"],
    badge: "실전",
  },
  {
    title: "근력운동과 단백질",
    href: "/guides/fitness-lifestyle/strength-training-protein",
    description:
      "러닝과 병행하는 근력운동에서 총량, 회복 타이밍, 감량기 전략을 함께 정리합니다.",
    question: "근력운동을 같이 하면 단백질 전략은 어떻게 달라질까?",
    related: ["주간 루틴", "회복", "근육 유지"],
    badge: "확장",
  },
  {
    title: "운동 초보 가이드",
    href: "/guides/fitness-lifestyle/beginner-workout-guide",
    description:
      "운동을 막 시작한 사람에게 필요한 식사 구조, 제품 활용법, 체크리스트를 가볍게 정리합니다.",
    question: "운동 초보는 무엇부터 챙겨야 할까?",
    related: ["첫 루틴", "가벼운 단백질", "실전 팁"],
    badge: "입문",
  },
];

export default function FitnessLifestyleTrackPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>운동 · 라이프스타일</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">
              TRACK D
            </span>
            <span className="text-xs text-[#8b8b8b]">운동 맥락에 맞는 단백질 전략을 보는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[#6b3f28] md:text-[30px]">운동 · 라이프스타일</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              러닝, 마라톤 영양, 근력운동, 운동 초보 루틴까지.
              <br />
              실제 운동 상황에 맞는 단백질 전략을 빠르게 찾을 수 있도록 Track D를 정리했습니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">
                러닝과 마라톤을 중심으로, 실전 운동 영양과 입문자 가이드까지 이어지는 흐름으로 배치했습니다.
              </p>
            </div>
            <div className="hidden rounded-full border border-[#eaded7] bg-[#fcf1ea] px-3 py-1.5 text-xs font-medium text-[#8a4b2f] md:block">
              인기: 마라톤 영양 전략
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex h-full min-h-[228px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4 transition-colors hover:border-[#e0c9bb] sm:min-h-[248px] sm:px-5 sm:py-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#fcf1ea] px-3 py-1 text-[11px] font-semibold text-[#8a4b2f]">
                      {topic.badge}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9a8b84]">Track D</span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-[#6b3f28] transition-colors group-hover:text-[var(--accent)]">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>

                  <div className="mt-4 rounded-xl border border-[#f0e7e2] bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9a8b84]">핵심 질문</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--foreground)]">{topic.question}</p>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {topic.related.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d09a7f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#fcf1ea] px-2.5 py-1 text-[11px] font-semibold text-[#8a4b2f]">
                    보기
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-[#6b3f28]">주제 보기</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
