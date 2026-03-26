import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllSearchTopics } from "../data/searchTopics";

export const metadata = {
  title: "단백질 검색 주제 모음 | 저당·고단백·식사대용 바로 찾기",
  description:
    "저당, 고단백, 식사대용, 운동 후 같은 단백질 검색 주제를 한 곳에 모아 실제 비교 페이지로 빠르게 이동할 수 있게 정리했습니다.",
};

export default function TopicsPage() {
  const topics = getAllSearchTopics();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            단백질 검색 주제 모음
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            검색 의도가 분명한 주제별 랜딩을 모았습니다. 저당, 고단백, 식사대용,
            운동 후 같은 키워드로 바로 이동할 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <section className="rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">이 페이지 활용법</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            제품명을 아직 모르고 조건만 정해진 상태라면 여기서 시작하는 편이 가장 빠릅니다.
            저당, 고단백, 다이어트, 식사대용처럼 먼저 조건을 정한 뒤 비교 페이지로 넘어갈 수 있습니다.
          </p>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5 transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--accent-light)]/40"
            >
              <p className="text-base font-semibold text-[var(--foreground)]">{topic.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                {topic.description}
              </p>
              <p className="mt-3 text-xs font-semibold text-[var(--accent)]">비교 페이지로 바로 이동</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
