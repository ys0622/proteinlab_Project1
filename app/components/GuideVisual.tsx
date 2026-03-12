import type { CSSProperties } from "react";
import type { GuideTrackSlug } from "@/app/data/guidesTracks";

type GuideVisualProps = {
  track: GuideTrackSlug;
  title: string;
  accentColor: string;
  accentBg: string;
  variant?: "track" | "topic";
};

function ProteinBasicsVisual({
  accentColor,
}: {
  accentColor: string;
}) {
  return (
    <svg viewBox="0 0 320 180" className="h-32 w-full" aria-hidden="true">
      <rect x="0" y="0" width="320" height="180" rx="24" fill="#f7fbf8" />
      <rect x="18" y="20" width="118" height="140" rx="18" fill="#ffffff" stroke="#dce8df" />
      <text x="34" y="44" fontSize="12" fill="#6c7b73" fontWeight="700">
        역할 비중
      </text>
      <rect x="34" y="126" width="18" height="18" rx="6" fill="#d7eadc" />
      <rect x="60" y="96" width="18" height="48" rx="6" fill="#9cc9a8" />
      <rect x="86" y="72" width="18" height="72" rx="6" fill={accentColor} />
      <rect x="112" y="110" width="8" height="34" rx="4" fill="#c9ddd0" />
      <text x="34" y="158" fontSize="10" fill="#7f8b84">
        근육 · 면역 · 호르몬
      </text>

      <rect x="148" y="20" width="154" height="64" rx="18" fill="#ffffff" stroke="#dce8df" />
      <text x="166" y="44" fontSize="12" fill="#6c7b73" fontWeight="700">
        핵심 메시지
      </text>
      <text x="166" y="67" fontSize="20" fill={accentColor} fontWeight="800">
        20~30g
      </text>
      <text x="238" y="67" fontSize="11" fill="#6c7b73">
        한 끼 권장량
      </text>

      <rect x="148" y="96" width="72" height="52" rx="16" fill="#ffffff" stroke="#dce8df" />
      <rect x="230" y="96" width="72" height="52" rx="16" fill="#ffffff" stroke="#dce8df" />
      <circle cx="170" cy="122" r="10" fill="#d7eadc" />
      <rect x="188" y="116" width="18" height="12" rx="6" fill={accentColor} />
      <rect x="246" y="110" width="40" height="8" rx="4" fill="#d7eadc" />
      <rect x="246" y="124" width="28" height="8" rx="4" fill="#9cc9a8" />
    </svg>
  );
}

function DashboardVisual({
  accentColor,
  accentBg,
}: {
  accentColor: string;
  accentBg: string;
}) {
  return (
    <svg viewBox="0 0 320 180" className="h-32 w-full" aria-hidden="true">
      <rect x="0" y="0" width="320" height="180" rx="24" fill="#fbfcfd" />
      <rect x="16" y="18" width="110" height="64" rx="16" fill="#ffffff" stroke="#e6eaee" />
      <rect x="138" y="18" width="166" height="64" rx="16" fill="#ffffff" stroke="#e6eaee" />
      <rect x="16" y="94" width="188" height="70" rx="18" fill="#ffffff" stroke="#e6eaee" />
      <rect x="216" y="94" width="88" height="70" rx="18" fill="#ffffff" stroke="#e6eaee" />

      <circle cx="42" cy="44" r="14" fill={accentBg} />
      <rect x="64" y="36" width="40" height="8" rx="4" fill="#d8dee5" />
      <rect x="64" y="50" width="28" height="8" rx="4" fill={accentColor} />

      <rect x="156" y="36" width="120" height="10" rx="5" fill="#e7edf3" />
      <rect x="156" y="56" width="96" height="10" rx="5" fill={accentColor} />

      <rect x="34" y="126" width="18" height="22" rx="5" fill="#d7dde3" />
      <rect x="60" y="114" width="18" height="34" rx="5" fill="#bcc9d6" />
      <rect x="86" y="102" width="18" height="46" rx="5" fill={accentColor} />
      <rect x="112" y="118" width="18" height="30" rx="5" fill="#d7dde3" />
      <rect x="146" y="110" width="36" height="10" rx="5" fill="#d8dee5" />
      <rect x="146" y="128" width="24" height="10" rx="5" fill={accentColor} />

      <circle cx="260" cy="129" r="22" fill={accentBg} />
      <path d="M260 112 A17 17 0 1 1 244 136" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export default function GuideVisual({
  track,
  title,
  accentColor,
  accentBg,
}: GuideVisualProps) {
  const chips =
    track === "protein-basics"
      ? ["역할", "섭취", "회복"]
      : track === "market-insights"
        ? ["시장", "브랜드", "트렌드"]
        : ["비교", "전략", "핵심"];

  return (
    <div
      className="rounded-[24px] border border-[#dfe6e1] bg-[linear-gradient(135deg,#ffffff_0%,#f8faf9_100%)] p-4"
      style={
        {
          "--guide-accent": accentColor,
          "--guide-accent-bg": accentBg,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {track === "protein-basics" ? (
        <ProteinBasicsVisual accentColor={accentColor} />
      ) : (
        <DashboardVisual accentColor={accentColor} accentBg={accentBg} />
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={`${title}-${chip}`}
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ backgroundColor: accentBg, color: accentColor }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
