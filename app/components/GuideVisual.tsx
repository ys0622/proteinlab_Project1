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
  title,
  accentColor,
  accentBg,
}: {
  title: string;
  accentColor: string;
  accentBg: string;
}) {
  const isMuscle = title.includes("근육") || title.includes("MPS");
  const isImmunity = title.includes("면역") || title.includes("호르몬");
  const isDeficiency = title.includes("부족") || title.includes("결핍");

  if (isMuscle) {
    return (
      <svg viewBox="0 0 320 180" className="h-32 w-full" aria-hidden="true">
        <rect x="0" y="0" width="320" height="180" rx="24" fill="#f7fbf8" />
        <rect x="18" y="18" width="132" height="144" rx="18" fill="#fff" stroke="#dce8df" />
        <text x="34" y="42" fontSize="12" fill="#64756d" fontWeight="700">
          운동 후 회복 흐름
        </text>
        <circle cx="52" cy="88" r="16" fill={accentBg} />
        <circle cx="96" cy="88" r="16" fill="#d7eadc" />
        <circle cx="74" cy="126" r="16" fill={accentColor} />
        <line x1="63" y1="97" x2="71" y2="111" stroke="#b9cec1" strokeWidth="4" strokeLinecap="round" />
        <line x1="85" y1="97" x2="78" y2="111" stroke="#b9cec1" strokeWidth="4" strokeLinecap="round" />
        <text x="41" y="90" fontSize="9" fill="#315844" fontWeight="700">
          운동
        </text>
        <text x="88" y="90" fontSize="9" fill="#557567" fontWeight="700">
          섭취
        </text>
        <text x="64" y="128" fontSize="9" fill="#ffffff" fontWeight="700">
          회복
        </text>
        <rect x="162" y="18" width="140" height="62" rx="18" fill="#fff" stroke="#dce8df" />
        <text x="178" y="42" fontSize="12" fill="#64756d" fontWeight="700">
          권장 단백질
        </text>
        <text x="178" y="68" fontSize="24" fill={accentColor} fontWeight="800">
          20~30g
        </text>
        <rect x="162" y="92" width="140" height="70" rx="18" fill="#fff" stroke="#dce8df" />
        <text x="178" y="116" fontSize="12" fill="#64756d" fontWeight="700">
          운동 후 1시간 내
        </text>
        <rect x="178" y="128" width="98" height="10" rx="5" fill="#dbe8de" />
        <rect x="178" y="128" width="76" height="10" rx="5" fill={accentColor} />
      </svg>
    );
  }

  if (isImmunity) {
    return (
      <svg viewBox="0 0 320 180" className="h-32 w-full" aria-hidden="true">
        <rect x="0" y="0" width="320" height="180" rx="24" fill="#f7fbf8" />
        <rect x="18" y="18" width="128" height="144" rx="18" fill="#fff" stroke="#dce8df" />
        <text x="34" y="42" fontSize="12" fill="#64756d" fontWeight="700">
          단백질 기능 네트워크
        </text>
        <circle cx="54" cy="84" r="16" fill={accentBg} />
        <circle cx="104" cy="84" r="16" fill="#d7eadc" />
        <circle cx="79" cy="124" r="16" fill={accentColor} />
        <line x1="67" y1="92" x2="75" y2="110" stroke="#b9cec1" strokeWidth="4" strokeLinecap="round" />
        <line x1="92" y1="92" x2="84" y2="110" stroke="#b9cec1" strokeWidth="4" strokeLinecap="round" />
        <text x="38" y="86" fontSize="9" fill="#315844" fontWeight="700">
          면역
        </text>
        <text x="90" y="86" fontSize="9" fill="#557567" fontWeight="700">
          호르몬
        </text>
        <text x="69" y="126" fontSize="9" fill="#ffffff" fontWeight="700">
          효소
        </text>
        <rect x="158" y="18" width="144" height="54" rx="16" fill="#fff" stroke="#dce8df" />
        <text x="174" y="40" fontSize="12" fill="#64756d" fontWeight="700">
          항체 · 사이토카인 · 인슐린
        </text>
        <rect x="158" y="84" width="144" height="78" rx="18" fill="#fff" stroke="#dce8df" />
        <rect x="174" y="104" width="108" height="8" rx="4" fill="#dce8df" />
        <rect x="174" y="120" width="84" height="8" rx="4" fill={accentColor} />
        <rect x="174" y="136" width="64" height="8" rx="4" fill="#cfe1d5" />
      </svg>
    );
  }

  if (isDeficiency) {
    return (
      <svg viewBox="0 0 320 180" className="h-32 w-full" aria-hidden="true">
        <rect x="0" y="0" width="320" height="180" rx="24" fill="#f7fbf8" />
        <rect x="18" y="18" width="134" height="144" rx="18" fill="#fff" stroke="#dce8df" />
        <text x="34" y="42" fontSize="12" fill="#64756d" fontWeight="700">
          결핍 체크 신호
        </text>
        <rect x="34" y="58" width="104" height="16" rx="8" fill={accentBg} />
        <rect x="34" y="86" width="88" height="16" rx="8" fill="#d7eadc" />
        <rect x="34" y="114" width="76" height="16" rx="8" fill="#c8ddd0" />
        <text x="42" y="69" fontSize="10" fill="#24543d" fontWeight="700">
          근육 감소
        </text>
        <text x="42" y="97" fontSize="10" fill="#557567" fontWeight="700">
          피로감
        </text>
        <text x="42" y="125" fontSize="10" fill="#5f7368" fontWeight="700">
          면역 저하
        </text>
        <rect x="166" y="18" width="136" height="144" rx="18" fill="#fff" stroke="#dce8df" />
        <text x="182" y="42" fontSize="12" fill="#64756d" fontWeight="700">
          주의 기준
        </text>
        <text x="182" y="76" fontSize="22" fill={accentColor} fontWeight="800">
          0.8 g/kg
        </text>
        <text x="182" y="100" fontSize="11" fill="#7d8b84">
          이하라면 점검 필요
        </text>
        <circle cx="262" cy="120" r="18" fill={accentBg} />
        <path d="M262 110v12" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
        <circle cx="262" cy="137" r="3.5" fill={accentColor} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 180" className="h-32 w-full" aria-hidden="true">
      <rect x="0" y="0" width="320" height="180" rx="24" fill="#f7fbf8" />
      <rect x="18" y="18" width="284" height="144" rx="18" fill="#fff" stroke="#dce8df" />
      <text x="36" y="42" fontSize="12" fill="#64756d" fontWeight="700">
        단백질 핵심 기능
      </text>
      <rect x="36" y="60" width="52" height="56" rx="12" fill={accentBg} />
      <rect x="98" y="60" width="52" height="56" rx="12" fill="#d7eadc" />
      <rect x="160" y="60" width="52" height="56" rx="12" fill="#c8ddd0" />
      <text x="49" y="92" fontSize="9" fill="#24543d" fontWeight="700">
        근육
      </text>
      <text x="109" y="92" fontSize="9" fill="#557567" fontWeight="700">
        면역
      </text>
      <text x="171" y="92" fontSize="9" fill="#5f7368" fontWeight="700">
        회복
      </text>
      <rect x="228" y="60" width="50" height="56" rx="12" fill="#fff" stroke="#dce8df" />
      <text x="238" y="82" fontSize="10" fill="#64756d" fontWeight="700">
        하루
      </text>
      <text x="238" y="102" fontSize="18" fill={accentColor} fontWeight="800">
        단백질
      </text>
      <rect x="36" y="132" width="242" height="10" rx="5" fill="#dce8df" />
      <rect x="36" y="132" width="148" height="10" rx="5" fill={accentColor} />
    </svg>
  );
}

function DashboardVisual({ accentColor, accentBg }: { accentColor: string; accentBg: string }) {
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

export default function GuideVisual({ track, title, accentColor, accentBg }: GuideVisualProps) {
  const chips =
    track === "protein-basics"
      ? ["역할", "회복", "기준"]
      : track === "market-insights"
        ? ["시장", "브랜드", "트렌드"]
        : ["비교", "전략", "해석"];

  return (
    <div
      className="rounded-[24px] border border-[#dfe6e1] bg-[linear-gradient(135deg,#ffffff_0%,#f8faf9_100%)] p-4"
      style={{ "--guide-accent": accentColor, "--guide-accent-bg": accentBg } as CSSProperties}
      aria-hidden="true"
    >
      {track === "protein-basics" ? (
        <ProteinBasicsVisual title={title} accentColor={accentColor} accentBg={accentBg} />
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
