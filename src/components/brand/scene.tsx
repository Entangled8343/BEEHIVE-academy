import { cn } from "@/lib/utils";
import { Bee } from "./bee";

/**
 * Ilustración de relleno para la galería y el sitio. En producción se reemplaza por
 * fotos reales del colegio (con consentimiento). No usamos fotos de niños en el prototipo.
 */
const themes = {
  desfile: { sky: "#BFE6F7", ground: "#9BD27A", accent: "#2B2C6E", accent2: "#F7D23E", sun: true },
  ciencia: { sky: "#E7E0FA", ground: "#C9B8F2", accent: "#5052A8", accent2: "#5CC8D6", sun: false },
  lectura: { sky: "#FDE7D9", ground: "#F6B99A", accent: "#E8336E", accent2: "#F7D23E", sun: true },
  deporte: { sky: "#D7F2E5", ground: "#7CC9A2", accent: "#2B2C6E", accent2: "#EF5B4C", sun: true },
  arte: { sky: "#FCE3F0", ground: "#F5A9CF", accent: "#8B7FD6", accent2: "#F7D23E", sun: false },
  naturaleza: { sky: "#DFF3FB", ground: "#A8C83A", accent: "#2E7D4F", accent2: "#F7D23E", sun: true },
  aula: { sky: "#FFF5CF", ground: "#F7D23E", accent: "#2B2C6E", accent2: "#EF5B4C", sun: false },
  volcan: { sky: "#FFE3C2", ground: "#8C6A4F", accent: "#5B4636", accent2: "#EF7B3C", sun: true },
} as const;

export type SceneName = keyof typeof themes;

export function Scene({
  name,
  className,
  label,
}: {
  name: SceneName;
  className?: string;
  label?: string;
}) {
  const t = themes[name];
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: t.sky }}>
      <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {t.sun ? <circle cx="160" cy="30" r="16" fill="#FFD200" opacity="0.9" /> : null}
        <g fill="#fff" opacity="0.85">
          <ellipse cx="45" cy="28" rx="18" ry="7" />
          <ellipse cx="58" cy="24" rx="12" ry="8" />
          <ellipse cx="120" cy="18" rx="14" ry="5" />
        </g>
        {name === "volcan" ? (
          <path d="M40 110 L95 45 L108 45 L170 110 Z" fill={t.accent} opacity="0.85" />
        ) : null}
        <path d="M0 105 Q50 90 100 102 T200 98 V140 H0 Z" fill={t.ground} />
        {/* hexágonos */}
        <g opacity="0.95">
          <polygon points="30,70 42,63 54,70 54,84 42,91 30,84" fill={t.accent2} />
          <polygon points="150,78 160,72 170,78 170,90 160,96 150,90" fill={t.accent} opacity="0.8" />
        </g>
        {/* figuras sencillas */}
        <g>
          <circle cx="82" cy="78" r="7" fill={t.accent} />
          <rect x="75" y="86" width="14" height="20" rx="6" fill={t.accent} />
          <circle cx="104" cy="82" r="6" fill={t.accent2} />
          <rect x="98" y="89" width="12" height="17" rx="5" fill={t.accent2} />
          <circle cx="124" cy="78" r="7" fill={t.accent} opacity="0.7" />
          <rect x="117" y="86" width="14" height="20" rx="6" fill={t.accent} opacity="0.7" />
        </g>
      </svg>
      <Bee className="absolute top-[18%] left-[62%] size-8 rotate-12 drop-shadow" />
      {label ? (
        <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-navy-800">
          {label}
        </span>
      ) : null}
    </div>
  );
}
