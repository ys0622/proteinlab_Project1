import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "문의 | ProteinLab",
  description: "ProteinLab 문의 — 오류 제보, 광고·제휴 문의, 제품 등록 요청",
};

const CONTACT_EMAIL = "ys0622@naver.com";

const contactTypes = [
  {
    emoji: "🐛",
    title: "오류·오기재 제보",
    desc: "제품 정보(영양성분, 가격, 이미지 등)의 오류나 누락을 발견하셨나요? 제품명과 함께 알려주시면 검토 후 수정하겠습니다.",
    accentBg: "#e7f3ec",
    accentColor: "#1b7f5b",
    accentBorder: "#1b7f5b",
  },
  {
    emoji: "📢",
    title: "광고 문의",
    desc: "배너 광고, 스폰서드 콘텐츠 등 광고 게재에 관심 있으신 분은 이메일로 문의해 주세요.",
    accentBg: "#eaf2ff",
    accentColor: "#4c7bd9",
    accentBorder: "#4c7bd9",
  },
  {
    emoji: "🤝",
    title: "제휴 문의",
    desc: "데이터 협업, 콘텐츠 제휴 등 파트너십 제안을 환영합니다.",
    accentBg: "#f5f0ea",
    accentColor: "#7a5230",
    accentBorder: "#c4a77d",
  },
  {
    emoji: "➕",
    title: "제품 등록 요청",
    desc: "DB에 없는 제품을 추가 요청하실 수 있습니다. 제품명·제조사·구매 링크를 함께 보내주세요.",
    accentBg: "#fff1e6",
    accentColor: "#c76b2a",
    accentBorder: "#f08a24",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="w-full border-t border-b"
        style={{
          background: "linear-gradient(180deg, var(--hero-bg) 0%, #f8f6f2 100%)",
          borderColor: "var(--hero-border)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <span
            className="inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
            style={{ background: "var(--accent-light)", color: "var(--accent)" }}
          >
            Contact
          </span>
          <h1
            className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            문의
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            이메일로 문의하시면 빠른 시일 내에 답변 드리겠습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        {/* 이메일 문의 CTA */}
        <section className="mt-6">
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
              boxShadow: "0 4px 20px rgba(45, 74, 53, 0.2)",
            }}
          >
            <div className="px-6 py-6 md:px-8 md:py-7">
              <h2 className="text-base font-bold text-white/95">이메일 문의</h2>
              <p className="mt-1 text-sm text-white/80">
                문의 유형을 선택하시고 아래 버튼으로 이메일을 보내주세요.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "#fff",
                  color: "var(--accent)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              >
                ✉️ 이메일로 문의하기
              </a>
            </div>
          </div>
        </section>

        {/* 문의 유형 */}
        <section className="mt-8">
          <h2 className="text-base font-bold text-[var(--foreground)]">문의 유형</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {contactTypes.map((item) => (
              <div
                key={item.title}
                className="transition-shadow hover:shadow-md"
                style={{
                  border: `1px solid ${item.accentBorder}`,
                  borderRadius: "14px",
                  background: "#fff",
                  overflow: "hidden",
                }}
              >
                <div
                  className="px-5 pt-5 pb-4"
                  style={{
                    background: item.accentBg,
                    borderBottom: `1px solid ${item.accentBorder}`,
                  }}
                >
                  <h3
                    className="text-base font-bold"
                    style={{ color: item.accentColor }}
                  >
                    {item.emoji} {item.title}
                  </h3>
                </div>
                <p className="px-5 pb-5 pt-4 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 개인정보 처리 */}
        <div
          className="mt-8"
          style={{
            border: "1px solid #d9d6cf",
            borderRadius: "14px",
            background: "linear-gradient(180deg, #faf9f7 0%, #fff 100%)",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
              style={{ background: "#eaf2ec", color: "var(--accent)" }}
            >
              🔒
            </span>
            <h3 className="text-sm font-bold text-[var(--foreground)]">개인정보 처리</h3>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
            문의 이메일을 통해 수집되는 이메일 주소 및 성명 등의 개인정보는{" "}
            <strong className="text-[var(--foreground)]">오직 문의에 대한 답변 목적으로만 사용</strong>되며, 제3자에게 제공하거나 마케팅 목적으로 활용하지 않습니다. 문의 처리 완료 후 관련 정보는 파기됩니다.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
