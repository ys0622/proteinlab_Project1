type CategoryIconType = "drink" | "bar" | "yogurt" | "shake";

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

/** 음료: 캡 + 라벨선이 있는 병 */
function DrinkIcon({ color }: { color: string }) {
  return (
    <Svg>
      <path
        d="M9.6 2h4.8v2.3c0 .28.11.55.32.75l.86.83c.53.51.82 1.21.82 1.94v9.68a2 2 0 0 1-2 2h-4.2a2 2 0 0 1-2-2V7.82c0-.73.29-1.43.82-1.94l.86-.83c.21-.2.32-.47.32-.75V2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M9.6 4.7h4.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.6 12.6h8.8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7.6 15.4h8.8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
}

/** 바: 감싸진 단백질 바 */
function BarIcon({ color }: { color: string }) {
  return (
    <Svg>
      <g transform="rotate(28 12 12)">
        <rect x="3.2" y="9.4" width="17.6" height="5.2" rx="2.6" stroke={color} strokeWidth="1.5" />
        <path d="M9 9.6v5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M15 9.6v5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      </g>
    </Svg>
  );
}

/** 요거트: 컵 (물결 상단) */
function YogurtIcon({ color }: { color: string }) {
  return (
    <Svg>
      <path
        d="M6.4 6.4c1 .9 2.1.9 3.1 0s2.1-.9 3.1 0 2.1.9 3.1 0s2.1-.9 3.1 0"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.7 7.2h11l-1.35 10.2a3.3 3.3 0 0 1-3.27 2.88h-1.76a3.3 3.3 0 0 1-3.27-2.88L6.7 7.2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 11.2h6.8" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
    </Svg>
  );
}

/** 쉐이크: 손잡이 탭이 있는 파우치 */
function ShakeIcon({ color }: { color: string }) {
  return (
    <Svg>
      <path d="M10.8 3.6h2.4v2.1h-2.4z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <path
        d="M6.6 8.3a2.4 2.4 0 0 1 2.4-2.6h6a2.4 2.4 0 0 1 2.4 2.6l-.72 9.4a2.7 2.7 0 0 1-2.69 2.5H10a2.7 2.7 0 0 1-2.69-2.5l-.71-9.4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.6 12h8.8" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
    </Svg>
  );
}

export default function CategoryIcon({ type, color = "rgba(255,255,255,0.92)" }: { type: CategoryIconType; color?: string }) {
  switch (type) {
    case "drink":
      return <DrinkIcon color={color} />;
    case "bar":
      return <BarIcon color={color} />;
    case "yogurt":
      return <YogurtIcon color={color} />;
    case "shake":
      return <ShakeIcon color={color} />;
    default:
      return null;
  }
}
