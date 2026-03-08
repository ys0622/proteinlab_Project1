export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">설정</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
          관리자 환경 설정
        </p>
      </div>

      <div className="space-y-5">
        {/* Auth Settings */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">인증 설정</h2>
          <div className="space-y-2 text-sm text-[var(--foreground-muted)]">
            <p>
              <strong className="text-[var(--foreground)]">ADMIN_PASSWORD</strong> — 관리자 비밀번호.
              서버 환경변수에서 설정합니다.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">SESSION_SECRET</strong> — 세션 토큰 서명 키.
              랜덤한 긴 문자열을 설정하세요.
            </p>
            <p className="text-xs mt-3 p-3 rounded-lg bg-[var(--beige-warm)] font-mono">
              ADMIN_PASSWORD=my-secure-password<br />
              SESSION_SECRET=random-64-char-string
            </p>
          </div>
        </section>

        {/* Image Settings */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">이미지 설정</h2>
          <div className="space-y-2 text-sm text-[var(--foreground-muted)]">
            <p>
              <strong className="text-[var(--foreground)]">REMOVE_BG_API_KEY</strong> — remove.bg API 키.
              배경 자동 제거 기능을 활성화합니다.
            </p>
            <p className="text-xs mt-3">
              <a
                href="https://www.remove.bg/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                remove.bg API 키 발급하기 →
              </a>
            </p>
          </div>
        </section>

        {/* Data info */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">데이터 파일 경로</h2>
          <div className="space-y-1 text-xs font-mono text-[var(--foreground-muted)]">
            <p>app/data/drinkProductsData.json</p>
            <p>app/data/barProductsData.json</p>
            <p>app/data/slugToImage.json</p>
            <p>app/data/slugToBarImage.json</p>
            <p>app/data/guidesData.json</p>
          </div>
          <p className="mt-3 text-xs text-[var(--foreground-muted)]">
            * Vercel 배포 시 파일 쓰기 불가. 자체 서버 또는 데이터베이스 사용 권장.
          </p>
        </section>
      </div>
    </div>
  );
}
