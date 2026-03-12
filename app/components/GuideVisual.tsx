import type { CSSProperties } from "react";
import type { GuideTrackSlug } from "@/app/data/guidesTracks";

type GuideVisualProps = {
  track: GuideTrackSlug;
  title: string;
  accentColor: string;
  accentBg: string;
  variant?: "track" | "topic";
};

type VisualKind = "overview" | "recovery" | "signal" | "warning" | "default";

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
    chips: ["비교", "선택", "성분"],
  },
  "intake-strategy-health": {
    glyph: "I",
    chips: ["타이밍", "건강", "전략"],
  },
  "fitness-lifestyle": {
    glyph: "F",
    chips: ["운동", "루틴", "회복"],
  },
  "market-insights": {
    glyph: "M",
    chips: ["시장", "브랜드", "트렌드"],
  },
  tools: {
    glyph: "T",
    chips: ["계산", "도구", "체크"],
  },
};

function getVisualKind(title: string): VisualKind {
  if (/근육|MPS|회복|성장/i.test(title)) return "recovery";
  if (/면역|호르몬|효소|신호/i.test(title)) return "signal";
  if (/부족|결핍|신호|위험/i.test(title)) return "warning";
  if (/역할|개요|기능|functions/i.test(title)) return "overview";
  return "default";
}

export default function GuideVisual({
  track,
  title,
  accentColor,
  accentBg,
  variant = "track",
}: GuideVisualProps) {
  const visual = trackVisualMap[track];
  const kind = getVisualKind(title);
  const chips = variant === "track" ? visual.chips : visual.chips.slice(0, 2);

  return (
    <div
      className={`guide-visual guide-visual--${variant} guide-visual--${kind}`}
      style={
        {
          "--guide-accent": accentColor,
          "--guide-accent-bg": accentBg,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="guide-visual__panel">
        <div className="guide-visual__topline">
          <div className="guide-visual__orb">
            <span>{visual.glyph}</span>
          </div>
          <div className="guide-visual__metrics">
            <span className="guide-visual__metric">Protein</span>
            <span className="guide-visual__metric">Sugar</span>
            <span className="guide-visual__metric">Density</span>
          </div>
        </div>

        <div className="guide-visual__canvas">
          <div className="guide-visual__bars">
            <span className="guide-visual__bar guide-visual__bar--1" />
            <span className="guide-visual__bar guide-visual__bar--2" />
            <span className="guide-visual__bar guide-visual__bar--3" />
          </div>

          <div className="guide-visual__focus">
            <div className="guide-visual__focus-card">
              <span className="guide-visual__focus-label">Data</span>
              <span className="guide-visual__focus-value">{kind === "warning" ? "CHECK" : "GUIDE"}</span>
            </div>
            <div className="guide-visual__focus-lines">
              <span className="guide-visual__line guide-visual__line--strong" />
              <span className="guide-visual__line" />
              <span className="guide-visual__line guide-visual__line--short" />
            </div>
          </div>
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
