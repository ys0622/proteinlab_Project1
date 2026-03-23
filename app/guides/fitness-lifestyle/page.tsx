import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 & 라이프스타일 | ProteinLab",
  description:
    "러닝, 마라톤, 운동 영양, 근력운동, 운동 초보, 봄 시즌 운동 가이드까지 Track D에서 정리합니다.",
};

const topics = [
  {
    title: "러닝 단백질 가이드",
    href: "/guides/fitness-lifestyle/running-protein-guide",
    description:
      "러너에게 필요한 하루 단백질 기준, 운동 후 회복 타이밍, 제품 비교 포인트를 먼저 정리합니다.",
    question: "러너는 하루에 단백질을 얼마나 먹어야 할까?",
    related: ["1.6~2.0g/kg/day", "운동 후 20~30g", "하루 4회 분산"],
    badge: "기초",
  },
  {
    title: "마라톤 단백질 전략",
    href: "/guides/fitness-lifestyle/marathon-protein-guide",
    description:
      "레이스 주간을 앞두고, 회복과 식단까지 연결해 실전적으로 챙겨야 할 기준을 정리합니다.",
    question: "레이스 전후에는 무엇을 어떻게 준비해야 할까?",
    related: ["카보로딩", "레이스 주간 체크", "회복 식단"],
    badge: "경기",
  },
  {
    title: "거리별 영양 & 러닝 전략",
    href: "/guides/fitness-lifestyle/marathon-distance-strategy",
    description:
      "5km, 10km, 하프, 풀 마라톤을 거리별로 나누어 어떤 영양 포인트가 달라지는지 비교합니다.",
    question: "거리별로 단백질과 수분 보충 전략은 어떻게 달라질까?",
    related: ["5km~10km", "하프~풀", "운동 후 단백질"],
    badge: "거리별",
  },
  {
    title: "운동 영양 & 제품 비교",
    href: "/guides/fitness-lifestyle/sports-nutrition-guide",
    description:
      "운동 목적에 따라 어떤 제품이 맞는지, 단백질 종류와 당류·칼로리 기준을 함께 정리합니다.",
    question: "운동 목적별 제품은 어떤 기준으로 골라야 할까?",
    related: ["고단백", "저당", "증량용"],
    badge: "실전",
  },
  {
    title: "근력운동과 단백질",
    href: "/guides/fitness-lifestyle/strength-training-protein",
    description:
      "러닝과 병행하는 근력운동에서 총량, 회복 타이밍, 감량기 전략까지 함께 정리합니다.",
    question: "근력운동을 같이 하면 단백질 전략은 어떻게 달라질까?",
    related: ["주간 루틴", "회복", "근육 유지"],
    badge: "병행",
  },
  {
    title: "운동 초보 가이드",
    href: "/guides/fitness-lifestyle/beginner-workout-guide",
    description:
      "운동을 막 시작하는 사람이 먼저 챙겨야 할 식사 구조와 제품 사용 체크리스트를 가볍게 정리합니다.",
    question: "운동 초보는 무엇부터 챙겨야 할까?",
    related: ["첫 루틴", "가벼운 단백질", "실전 팁"],
    badge: "입문",
  },
  {
    title: "봄 다이어트 단백질 전략",
    href: "/guides/fitness-lifestyle/spring-diet-protein-guide",
    description:
      "봄철 체중 관리 수요에 맞춰 단백질 음료, 바, 요거트 선택 기준을 비교형으로 정리합니다.",
    question: "봄 다이어트에는 어떤 단백질 기준이 중요할까?",
    related: ["저당", "포만감", "가벼운 감량"],
    badge: "봄 시즌",
  },
  {
    title: "봄 러닝 시작 가이드",
    href: "/guides/fitness-lifestyle/spring-running-start-guide",
    description:
      "봄에 러닝을 다시 시작할 때 필요한 회복 루틴과 가벼운 제품 선택 기준을 먼저 정리합니다.",
    question: "봄 러닝을 다시 시작할 때 무엇부터 챙겨야 할까?",
    related: ["러닝 재개", "회복 루틴", "가벼운 RTD"],
    badge: "봄 시즌",
  },
  {
    title: "봄 야외활동 단백질 간식 가이드",
    href: "/guides/fitness-lifestyle/spring-outdoor-protein-snack-guide",
    description:
      "피크닉, 가벼운 등산, 야외활동에서 챙기기 좋은 단백질 간식 기준을 정리합니다.",
    question: "야외활동에서는 어떤 단백질 간식이 실전적일까?",
    related: ["휴대성", "간식형 바", "드링킹 요거트"],
    badge: "봄 시즌",
  },
];

const topicEmojis = ["🏃", "🏁", "📏", "🥗", "🏋️", "🌱", "🌸", "🌤️", "🧺"];

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
            <span>운동 & 라이프스타일</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK D
            </span>
            <span className="text-xs text-[#8b8b8b]">운동 목적에 맞는 단백질 전략을 정리하는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>

          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[var(--foreground)] md:text-[30px]">
              운동 & 라이프스타일
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              러닝, 마라톤, 운동 영양, 근력운동, 운동 초보 루틴까지.
              <br />
              실제 운동 상황에 맞는 단백질 전략을 비교형으로 찾을 수 있도록 Track D를 구성했습니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">질문과 상황을 먼저 보고 필요한 주제로 이동하세요.</p>
            </div>
            <div className="hidden rounded-full border border-[#d9e7dc] bg-[#eff7f1] px-3 py-1.5 text-xs font-medium text-[#24543d] md:block">
              추천: 봄 러닝 시작 가이드
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
              >
                <div className="h-1.5 w-full rounded-t-2xl bg-[#2d6a4f]" />
                <div className="flex flex-1 flex-col justify-between px-5 py-4">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">
                          {topic.badge}
                        </span>
                      </div>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e6dd] bg-white text-lg">
                        {topicEmojis[index % topicEmojis.length]}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-[#1f5138] transition-colors group-hover:text-[var(--accent)]">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[var(--foreground-muted)]">{topic.description}</p>

                    <div className="mt-4 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2.5">
                      <p className="text-[11px] font-semibold text-[#1f5138]">대표 질문</p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]">{topic.question}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">
                      읽기
                    </span>
                    <span className="text-xs font-semibold text-[#2f5d46] transition-colors group-hover:text-[#1f4834]">
                      주제 보기
                    </span>
                  </div>
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
