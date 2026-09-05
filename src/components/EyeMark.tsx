import { useId } from "react";

type Props = {
  pointer?: { x: number; y: number };
  width?: number;
  className?: string;
};

/**
 * Фирменный знак — глаз, зрачок которого следит за курсором.
 * Периодически «моргает».
 */
export default function EyeMark({ pointer = { x: 0, y: 0 }, width = 64, className }: Props) {
  const id = useId();
  const dx = pointer.x * 7;
  const dy = pointer.y * 5;

  return (
    <svg
      viewBox="0 0 120 64"
      width={width}
      height={(width * 64) / 120}
      className={className}
      role="img"
      aria-label="Глаз — символ офтальмологии"
    >
      <defs>
        <linearGradient id={`${id}-iris`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd9a3" />
          <stop offset="45%" stopColor="#eda659" />
          <stop offset="100%" stopColor="#2fae7d" />
        </linearGradient>
        <clipPath id={`${id}-eye`}>
          <path d="M8 32 C 30 7, 90 7, 112 32 C 90 57, 30 57, 8 32 Z" />
        </clipPath>
      </defs>

      {/* контур глаза */}
      <path
        d="M8 32 C 30 7, 90 7, 112 32 C 90 57, 30 57, 8 32 Z"
        fill="rgba(11,31,25,0.85)"
        stroke="rgba(244,237,221,0.55)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <g clipPath={`url(#${id}-eye)`}>
        {/* радужка */}
        <circle cx={60} cy={32} r={17} fill={`url(#${id}-iris)`} opacity={0.95} />
        <circle
          cx={60}
          cy={32}
          r={17}
          fill="none"
          stroke="rgba(7,19,16,0.35)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        {/* зрачок следует за курсором */}
        <g style={{ transform: `translate(${dx}px, ${dy}px)`, transition: "transform 260ms cubic-bezier(0.22,1,0.36,1)" }}>
          <circle cx={60} cy={32} r={7.5} fill="#071310" />
          <circle cx={57} cy={29} r={2.4} fill="rgba(255,217,163,0.95)" />
          <circle cx={63.5} cy={35} r={1.2} fill="rgba(143,227,187,0.8)" />
        </g>
        {/* веко для моргания */}
        <rect className="blink-lid" x="4" y="4" width="112" height="56" fill="#0b1f19" />
      </g>

      {/* ресницы-штрихи */}
      <path d="M30 13 L26 7 M48 8 L46 2 M72 8 L74 2 M90 13 L94 7" stroke="rgba(244,237,221,0.55)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
