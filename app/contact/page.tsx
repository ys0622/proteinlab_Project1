import Header from "../components/Header";

export const metadata = {
  title: "문의 | ProteinLab",
  description: "ProteinLab 문의",
};

const contactTypes = [
  { emoji: "🐛", title: "오류·오기재 제보", desc: "제품 정보(영양성분, 가격, 이미지 등)의 오류나 누락을 발견하셨나요? 제품명과 함께 알려주시면 검토 후 수정하겠습니다." },
  { emoji: "📢", title: "광고 문의", desc: "배너 광고, 스폰서드 콘텐츠 등 광고 게재에 관심 있으신 분은 이메일로 문의해 주세요." },
  { emoji: "🤝", title: "제휴 문의", desc: "데이터 협업, 콘텐츠 제휴 등 파트너십 제안을 환영합니다." },
  { emoji: "➕", title: "제품 등록 요청", desc: "DB에 없는 제품을 추가 요청하실 수 있습니다. 제품명·제조사·구매 링크를 함께 보내주세요." },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">문의</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Contact</p>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">이메일 문의</h2>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            ✉️ 이메일로 문의하기 — 이메일로 문의하시면 빠른 시일 내에 답변 드리겠습니다.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">문의 유형</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {contactTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--hero-bg)] p-4"
                style={{ background: "#EFEDE6" }}
              >
                <h3 className="text-base font-medium text-[var(--foreground)]">
                  {item.emoji} {item.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--hero-bg)] p-4" style={{ background: "#EFEDE6" }}>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">개인정보 처리</h3>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">
            문의 이메일을 통해 수집되는 이메일 주소 및 성명 등의 개인정보는 오직 문의에 대한 답변 목적으로만 사용되며, 제3자에게 제공하거나 마케팅 목적으로 활용하지 않습니다. 문의 처리 완료 후 관련 정보는 파기됩니다.
          </p>
        </div>
      </main>
      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
