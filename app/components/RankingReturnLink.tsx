"use client";

import { useEffect, useSyncExternalStore } from "react";

// 2026-11-15 시안 ②: 가이드 순위표를 본 사람에게 제품 페이지 위쪽에 '순위표로 돌아가기'를 보여준다.
// 가이드 페이지(RankingOriginRecorder)가 이 탭의 sessionStorage에 경로·제목을 남기고,
// 제품 페이지는 그 값이 있을 때만 링크를 그린다(앱 안 이동은 document.referrer가 바뀌지 않아 쓰지 않는다).
export const RANKING_ORIGIN_KEY = "pl:ranking-origin";

type Origin = { path: string; title: string };

function readOriginRaw(): string | null {
  try {
    return sessionStorage.getItem(RANKING_ORIGIN_KEY);
  } catch {
    return null; // sessionStorage 없음: 링크를 그리지 않는다
  }
}

const noopSubscribe = () => () => {};

function shortTitle(title: string) {
  return title.split("|")[0].trim();
}

export default function RankingReturnLink() {
  const raw = useSyncExternalStore(noopSubscribe, readOriginRaw, () => null);
  if (!raw) return null;
  let origin: Origin;
  try {
    origin = JSON.parse(raw) as Origin;
  } catch {
    return null;
  }
  if (!origin?.path?.startsWith("/guides/")) return null;

  return (
    <a
      href={`${origin.path}#ranking-table`}
      className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold"
      style={{ borderColor: "#CFE0D5", background: "#F3F8F4", color: "#1F5A3D" }}
    >
      <span aria-hidden>←</span>
      <span className="shrink-0">순위표로 돌아가기</span>
      <span className="truncate font-normal" style={{ color: "#5F6B61" }}>· {shortTitle(origin.title)}</span>
    </a>
  );
}

export function RankingOriginRecorder({ title }: { title: string }) {
  useEffect(() => {
    try {
      sessionStorage.setItem(RANKING_ORIGIN_KEY, JSON.stringify({ path: window.location.pathname, title }));
    } catch {
      /* 저장 불가: 무시 */
    }
  }, [title]);
  return null;
}
