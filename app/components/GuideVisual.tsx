import type { CSSProperties } from "react";
import type { GuideTrackSlug } from "@/app/data/guidesTracks";

type GuideVisualProps = {
  track: GuideTrackSlug;
  title: string;
  accentColor: string;
  accentBg: string;
  variant?: "track" | "topic";
};

const trackVisualMap: Record<
  GuideTrackSlug,
  {
    glyph: string;
    chips: string[];
  }
> = {
  "protein-basics": {
    glyph: "P",
    chips: ["기초", "역할", "흡수"],
  },
  "product-selection-comparison": {
    glyph: "C",
    chips: ["비교", "선택", "랭킹"],
  },
  "intake-strategy-health": {
    glyph: "I",
    chips: ["타이밍", "건강", "전략"],
  },
  "fitness-lifestyle": {
    glyph: "F",
    chips: ["운동", "러닝", "영양"],
  },
  "market-insights": {
    glyph: "M",
    chips: ["시장", "브랜드", "트렌드"],
  },
  tools: {
    glyph: "T",
    chips: ["계산", "도구", "활용"],
  },
};

export default function GuideVisual({
  track,
  title,
  accentColor,
  accentBg,
  variant = "track",
}: GuideVisualProps) {
  const visual = trackVisualMap[track];
  const chips = variant === "track" ? visual.chips : visual.chips.slice(0, 2);

  return (
    <div
      className={`guide-visual ${variant === "topic" ? "guide-visual--topic" : ""}`}
      style={
        {
          "--guide-accent": accentColor,
          "--guide-accent-bg": accentBg,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="guide-visual__panel">
        <div className="guide-visual__orb">
          <span>{visual.glyph}</span>
        </div>
        <div className="guide-visual__grid">
          <div className="guide-visual__line guide-visual__line--strong" />
          <div className="guide-visual__line" />
          <div className="guide-visual__line guide-visual__line--short" />
          <div className="guide-visual__line" />
        </div>
      </div>

      <div className="guide-visual__chips">
        {chips.map((chip) => (
          <span key={`${title}-${chip}`} className="guide-visual__chip">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
