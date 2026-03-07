import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | ProteinLab",
  description: "프로틴 비교 개인정보 처리방침",
};

export default function PrivacyPage() {
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
            개인정보 처리방침
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">Privacy Policy</p>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">최종 업데이트: 2026년 3월 4일</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <article className="prose prose-sm mt-8 max-w-none">
          <h2 className="text-lg font-bold text-[var(--foreground)]">1. 개요</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            프로틴 비교(이하 &quot;사이트&quot;)는 이용자의 개인정보를 중요하게 여기며, 「개인정보 보호법」을 준수합니다. 본 방침은 사이트가 수집하는 정보의 종류, 이용 방법, 보호 조치를 설명합니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">2. 수집하는 정보</h2>
          <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">자동 수집 정보 (로그 데이터)</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            사이트 방문 시 브라우저가 자동으로 전송하는 정보(IP 주소, 브라우저 유형, 방문 페이지, 방문 시각 등)가 서버 로그에 기록될 수 있습니다. 이 정보는 서비스 개선 및 보안 목적으로만 활용됩니다.
          </p>
          <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">직접 제공 정보</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            이메일 문의 시 이메일 주소 및 문의 내용이 수집됩니다. 수집 목적은 문의 답변에 한정되며, 처리 완료 후 파기됩니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">3. 쿠키(Cookie) 사용</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            사이트는 이용자 경험 향상을 위해 쿠키를 사용할 수 있습니다. 쿠키는 브라우저에 저장되는 소량의 텍스트 파일이며, 이용자는 브라우저 설정에서 쿠키를 거부하거나 삭제할 수 있습니다. 쿠키를 비활성화해도 사이트의 주요 기능은 정상 이용 가능합니다.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            사이트 하단의{" "}
            <Link href="/cookie-settings" className="text-[var(--accent)] hover:underline">
              쿠키 설정
            </Link>
            버튼에서 광고 쿠키 동의 여부를 언제든지 변경할 수 있습니다.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            <li><strong>기능 쿠키</strong>: 다크모드 설정, 비교 바구니 등 사용자 선택 저장 (localStorage 포함)</li>
            <li><strong>분석 쿠키</strong>: 방문자 통계 파악 (Google Analytics 등 도입 시 적용)</li>
            <li><strong>광고 쿠키</strong>: Google AdSense 등 제3자 광고 서비스 (아래 별도 안내)</li>
          </ul>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">4. Google AdSense 및 제3자 광고</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            본 사이트는 Google AdSense를 통한 광고를 게재할 수 있습니다. Google을 비롯한 제3자 광고 공급업체는 이용자의 이전 방문 기록을 바탕으로 관심 기반 광고를 제공하기 위해 쿠키를 사용합니다.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            이용자가 광고 쿠키 동의를 거부한 경우, 개인 맞춤형 광고 대신 비개인화 광고가 표시될 수 있습니다.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            Google의 광고 쿠키 사용을 거부하려면{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              Google 광고 설정
            </a>
            에서 맞춤 광고를 비활성화하거나,{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              aboutads.info
            </a>
            를 통해 제3자 쿠키를 관리할 수 있습니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">5. 개인정보 보호 조치</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            사이트는 수집한 개인정보를 안전하게 보호하기 위해 HTTPS(TLS) 암호화 전송을 사용합니다. 내부적으로 개인정보에 접근할 수 있는 인원을 최소화하며, 불필요한 개인정보는 즉시 파기합니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">6. 외부 링크</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            사이트에는 외부 쇼핑몰, 제조사 홈페이지 등으로 연결되는 링크가 포함될 수 있습니다. 외부 사이트의 개인정보 처리방침은 해당 사이트의 정책을 따르며, 본 사이트는 이에 대한 책임을 지지 않습니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">7. 방침 변경</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            본 방침은 법령·서비스 변경에 따라 수정될 수 있습니다. 변경 시 이 페이지 상단의 &quot;최종 업데이트&quot; 날짜를 갱신하여 공지합니다.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
