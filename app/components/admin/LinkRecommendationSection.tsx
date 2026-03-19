"use client";

import { useState } from "react";
import type { LinkRecommendationResult, LinkRecommendationType } from "@/app/lib/linkRecommendation";

const typeLabels: Record<LinkRecommendationType, string> = {
  coupang: "쿠팡",
  naver: "네이버",
  official: "공식몰",
};

interface LinkRecommendationSectionProps {
  type: LinkRecommendationType;
  brand: string;
  name: string;
  currentValue: string;
  onSelect: (url: string) => void;
  disabled?: boolean;
}

export default function LinkRecommendationSection({
  type,
  brand,
  name,
  currentValue,
  onSelect,
  disabled = false,
}: LinkRecommendationSectionProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<LinkRecommendationResult[] | null>(null);
  const [expanded, setExpanded] = useState(false);

  const canFetch = !disabled && name.trim().length > 0;

  const handleFetch = async () => {
    if (!canFetch) return;
    setLoading(true);
    setError(null);
    setResults(null);
    setExpanded(true);

    try {
      const res = await fetch("/api/admin/link-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), brand: brand.trim(), type }),
      });
      const data = (await res.json()) as { results?: LinkRecommendationResult[]; error?: string };

      if (!res.ok) {
        setError(data.error ?? "링크 추천 중 오류가 발생했습니다.");
        setResults([]);
        return;
      }

      setResults(data.results ?? []);
    } catch {
      setError("링크 추천 중 오류가 발생했습니다.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (url: string) => {
    if (currentValue && currentValue !== url && !window.confirm("기존 링크를 덮어쓰시겠습니까?")) {
      return;
    }
    onSelect(url);
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleFetch}
        disabled={!canFetch || loading}
        className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--beige-warm)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "추천 링크 검색 중..." : `${typeLabels[type]} 추천 찾기`}
      </button>

      {expanded && (
        <div className="mt-2 rounded-lg border border-[var(--border)] bg-[var(--background-card)] p-3">
          {loading && (
            <p className="text-sm text-[var(--foreground-muted)]">추천 링크 검색 중...</p>
          )}
          {error && !loading && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {results && !loading && !error && results.length === 0 && (
            <p className="text-sm text-[var(--foreground-muted)]">추천 가능한 링크를 찾지 못했습니다.</p>
          )}
          {results && !loading && results.length > 0 && (
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-start justify-between gap-2 rounded border border-[var(--border)] bg-white p-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)] line-clamp-2">
                      {r.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[var(--foreground-muted)]" title={r.url}>
                      {r.url}
                    </p>
                    {r.reason && (
                      <p className="mt-0.5 text-xs text-[var(--foreground-muted)]">{r.reason}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelect(r.url)}
                    className="shrink-0 rounded bg-[var(--accent)] px-2 py-1 text-xs font-medium text-white hover:bg-[var(--accent-hover)]"
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
