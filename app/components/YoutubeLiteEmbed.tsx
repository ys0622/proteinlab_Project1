"use client";

import { useState } from "react";

function extractYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1) || null;
    const v = parsed.searchParams.get("v");
    if (v) return v;
    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch) return shortsMatch[1];
    return null;
  } catch {
    return null;
  }
}

export default function YoutubeLiteEmbed({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYoutubeId(url);
  if (!videoId) return null;

  if (playing) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`${title} 재생`}
      onClick={() => setPlaying(true)}
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: "16 / 9", padding: 0, border: 0, cursor: "pointer" }}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
