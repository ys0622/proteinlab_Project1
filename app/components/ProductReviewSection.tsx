"use client";

import { useState } from "react";

const QUICK_TAGS = ["근성장", "다이어트", "일상보충", "회복", "맛 좋음", "맛 별로", "포만감", "가성비", "또 살 것 같음", "질림"];

export default function ProductReviewSection() {
  const [rating, setRating] = useState<"up" | "mid" | "down" | null>(null);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const handleSubmit = () => {
    // TODO: API 연동 시 사용
    console.log({ rating, comment, tags: [...selectedTags] });
    setComment("");
    setSelectedTags(new Set());
    setRating(null);
  };

  return (
    <section className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4" style={{ borderRadius: "12px" }}>
      <h2 className="text-base font-semibold text-[var(--foreground)]">이 제품 어땠나요?</h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setRating("up")}
          className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
            rating === "up" ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]" : "border-[var(--border)] bg-[var(--background-card)] hover:bg-[var(--accent-light)]"
          }`}
        >
          👍 추천
        </button>
        <button
          type="button"
          onClick={() => setRating("mid")}
          className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
            rating === "mid" ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]" : "border-[var(--border)] bg-[var(--background-card)] hover:bg-[var(--accent-light)]"
          }`}
        >
          😐 보통
        </button>
        <button
          type="button"
          onClick={() => setRating("down")}
          className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
            rating === "down" ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]" : "border-[var(--border)] bg-[var(--background-card)] hover:bg-[var(--accent-light)]"
          }`}
        >
          👎 비추
        </button>
        <span className="ml-1 text-xs text-[var(--foreground-muted)]">·</span>
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`rounded-full border px-2 py-0.5 text-xs transition-colors ${
              selectedTags.has(tag) ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]" : "border-[var(--border)] bg-[var(--background-card)] hover:bg-[var(--filter-box-bg)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="익명으로 의견을 남겨보세요 (버튼 없이 바로 입력 가능)"
          rows={2}
          className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-2 text-sm placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          aria-label="익명 평가 입력"
        />
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">익명으로 자유롭게 남겨주세요.</p>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          등록
        </button>
      </div>
    </section>
  );
}
