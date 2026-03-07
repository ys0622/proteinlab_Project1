import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--white-warm)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            ProteinLab
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--accent)]"
          >
            홈으로
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          관리자 전용 페이지
        </h1>
        <p className="mt-4 text-[var(--foreground-muted)]">
          이 페이지는 관리자만 접근할 수 있습니다.
        </p>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          로그인·권한 확인 기능을 연동하면 비관리자 접근을 차단할 수 있습니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          홈으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
