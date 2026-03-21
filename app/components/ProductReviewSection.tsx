"use client";

import { useEffect, useState } from "react";

const QUICK_TAGS = ["근성장", "다이어트", "일상보충", "회복", "맛 좋음", "맛 별로", "포만감", "가성비", "또 살 것 같음", "질림"];

const RATING_LABEL: Record<string, string> = { up: "👍 추천", mid: "😐 보통", down: "👎 비추" };

interface Review {
  id: string;
  rating: "up" | "mid" | "down";
  tags: string[];
  comment: string;
  createdAt: string;
}

interface Props {
  slug: string;
}

export default function ProductReviewSection({ slug }: Props) {
  const [rating, setRating] = useState<"up" | "mid" | "down" | null>(null);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`/api/reviews/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews) setReviews(data.reviews);
      })
      .catch(() => {});
  }, [slug]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/reviews/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, tags: [...selectedTags] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "등록 실패");
      setReviews((prev) => [data.review, ...prev]);
      setSubmitted(true);
      setComment("");
      setSelectedTags(new Set());
      setRating(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const ratingCount = { up: 0, mid: 0, down: 0 };
  for (const r of reviews) ratingCount[r.rating] = (ratingCount[r.rating] ?? 0) + 1;

  return (
    <section className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4" style={{ borderRadius: "12px" }}>
      <h2 className="text-base font-semibold text-[var(--foreground)]">이 제품 어땠나요?</h2>

      {reviews.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {(["up", "mid", "down"] as const).map((r) =>
            ratingCount[r] > 0 ? (
              <span key={r} className="rounded-full border border-[var(--border)] bg-white px-3 py-0.5 text-xs text-[var(--foreground-muted)]">
                {RATING_LABEL[r]} {ratingCount[r]}
              </span>
            ) : null,
          )}
        </div>
      )}

      {submitted ? (
        <p className="mt-4 rounded-lg bg-[var(--accent-light)] px-4 py-3 text-sm font-medium text-[var(--accent)]">
          의견을 남겨주셔서 감사합니다!{" "}
          <button type="button" className="ml-2 underline" onClick={() => setSubmitted(false)}>
            추가 작성
          </button>
        </p>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {(["up", "mid", "down"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRating(r)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  rating === r
                    ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--background-card)] hover:bg-[var(--accent-light)]"
                }`}
              >
                {RATING_LABEL[r]}
              </button>
            ))}
            <span className="ml-1 text-xs text-[var(--foreground-muted)]">·</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-2 py-0.5 text-xs transition-colors ${
                  selectedTags.has(tag)
                    ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--background-card)] hover:bg-[var(--filter-box-bg)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-start gap-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="익명으로 의견을 남겨보세요"
              rows={2}
              className="flex-1 resize-none rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-2 text-sm placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              aria-label="익명 평가 입력"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!rating || submitting}
              className="flex-shrink-0 self-stretch rounded-lg bg-[var(--accent)] px-4 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              {submitting ? "..." : "등록"}
            </button>
          </div>

          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          {!rating && <p className="mt-1.5 text-xs text-[var(--foreground-muted)]">평가(추천/보통/비추)를 먼저 선택해주세요.</p>}
        </>
      )}

      {reviews.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-[#e8e6e3] pt-4">
          {reviews.slice(0, 5).map((r) => (
            <div key={r.id} className="rounded-lg border border-[#f0eeeb] bg-white px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-[var(--foreground)]">{RATING_LABEL[r.rating]}</span>
                {r.tags.map((t) => (
                  <span key={t} className="rounded-full bg-[#f0eeeb] px-2 py-0.5 text-[11px] text-[var(--foreground-muted)]">
                    {t}
                  </span>
                ))}
              </div>
              {r.comment && <p className="mt-1.5 text-xs leading-5 text-[var(--foreground-muted)]">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
