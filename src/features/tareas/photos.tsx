import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Ilustraciones que simulan las fotos que suben las familias o los alumnos. */
export function NotebookPhoto({ variant, removable = true }: { variant: number; removable?: boolean }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#fdfcf7] shadow-soft ring-1 ring-primary-100">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "repeating-linear-gradient(transparent 0 13px, #c9d6ef 13px 14px)",
          backgroundPosition: "0 18px",
        }}
      />
      <div className="absolute inset-y-0 left-4 w-px bg-rose-300" />
      <div className="absolute top-5 right-3 left-6 space-y-[14px]">
        {[80, 95, 70, 88, 60].map((w, i) => (
          <div key={i} className="h-[3px] rounded-full bg-primary-700/70" style={{ width: `${(w + variant * 7) % 100}%` }} />
        ))}
      </div>
      {variant === 1 ? (
        <div className="absolute right-4 bottom-5 grid size-14 place-items-center rounded-full bg-accent-300 text-2xl">🦆</div>
      ) : null}
      {removable ? <RemoveButton /> : null}
    </div>
  );
}

export function LabPhoto({ variant, removable = true }: { variant: number; removable?: boolean }) {
  const liquids = variant === 0 ? ["#7dd3fc", "#fde68a", "#e5e7eb"] : ["#fde68a", "#7dd3fc", "#fecaca"];
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 shadow-soft ring-1 ring-primary-100">
      <svg viewBox="0 0 90 120" className="absolute inset-0 size-full">
        <rect x="0" y="92" width="90" height="28" fill="#cbd5e1" />
        {liquids.map((c, i) => (
          <g key={i} transform={`translate(${10 + i * 26} 40)`}>
            <path d="M2 0 h16 v50 a8 8 0 0 1 -16 0 z" fill="#fff" fillOpacity="0.6" stroke="#64748b" strokeWidth="1.2" />
            <path d={`M3 ${20 + i * 4} h14 v30 a7 7 0 0 1 -14 0 z`} fill={c} />
            <path d="M0 0 h20" stroke="#64748b" strokeWidth="1.6" />
          </g>
        ))}
        {variant === 1 ? (
          <g transform="translate(50 12)">
            <rect width="34" height="22" rx="3" fill="#1e293b" />
            <text x="17" y="15" textAnchor="middle" fontSize="9" fill="#86efac" fontFamily="monospace">
              0.79
            </text>
          </g>
        ) : null}
      </svg>
      {removable ? <RemoveButton /> : null}
    </div>
  );
}

export function MapPhoto({ tint }: { tint: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#fbfaf4] ring-1 ring-primary-100">
      <svg viewBox="0 0 200 150" className="absolute inset-0 size-full">
        <path d="M40 30 L110 18 L160 40 L170 95 L130 130 L60 125 L28 85 Z" fill={tint} stroke="#2b2c6e" strokeWidth="2.5" />
        <path d="M110 18 L100 75 L170 95 M100 75 L60 125 M100 75 L28 85" stroke="#2b2c6e" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="75" r="4" fill="#ef5b4c" />
      </svg>
    </div>
  );
}

/** Foto de informe de laboratorio para la vista de revisión (horizontal). */
export function LabReportPhoto({ variant }: { variant: number }) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-primary-100")}>
      {variant === 0 ? (
        <div className="absolute inset-0 p-3">
          <div className="mb-2 h-2 w-1/2 rounded bg-primary-800/70" />
          <table className="w-full text-[8px] text-primary-800">
            <tbody>
              {[
                ["Líquido", "m (g)", "V (mL)", "ρ"],
                ["Agua", "50.1", "50", "1.00"],
                ["Aceite", "45.8", "50", "0.92"],
                ["Alcohol", "39.6", "50", "0.79"],
              ].map((r, i) => (
                <tr key={i} className={i === 0 ? "font-bold" : ""}>
                  {r.map((c) => (
                    <td key={c} className="border border-primary-200 px-1 py-0.5">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 space-y-1.5">
            {[90, 75, 82].map((w) => (
              <div key={w} className="h-1 rounded bg-primary-300" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      ) : (
        <LabPhoto variant={1} removable={false} />
      )}
    </div>
  );
}

function RemoveButton() {
  return (
    <button
      className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-primary-900/70 text-white"
      aria-label="Quitar foto"
    >
      <X className="size-4" />
    </button>
  );
}
