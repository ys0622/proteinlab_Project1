"use client";

import { useEffect, useState } from "react";

// 하단 고정 바는 화면 위에 붙인(top) 고정 상자 안 바닥에 둔다. 상자 크기는 실제로 보이는 화면(visualViewport)과 같게 맞춘다.
// 네이버 웨일(안드로이드)의 전체화면 스크롤 모드가 bottom:0 고정 요소를 화면 밖으로 밀어내고 되돌리지 않기 때문이다
// (위쪽 고정 헤더는 멀쩡함). 케어맵 src/hooks/useVisualViewportBox.ts 에서 옮겨 왔다(2026-10-24, Scott 제보).
export default function useVisualViewportBox() {
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => {
      const top = Math.round(vv?.offsetTop ?? 0);
      const height = Math.round(vv?.height ?? window.innerHeight);
      setBox((prev) => (prev && prev.top === top && prev.height === height ? prev : { top, height }));
    };
    update();
    const target = vv ?? window;
    target.addEventListener("resize", update);
    target.addEventListener("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      target.removeEventListener("resize", update);
      target.removeEventListener("scroll", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return box ? { top: box.top, height: box.height } : { top: 0, height: "100vh" };
}
