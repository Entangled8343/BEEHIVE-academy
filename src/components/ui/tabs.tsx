import { cn } from "@/lib/utils";

/** Pestañas visuales (estado controlado por la URL en la versión final). */
export function Tabs({
  items,
  active,
  className,
}: {
  items: { label: string; count?: number }[];
  active: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0",
        className,
      )}
    >
      {items.map((t, i) => (
        <span
          key={t.label}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-bold",
            i === active
              ? "bg-navy-800 text-white"
              : "bg-white text-navy-700 shadow-soft ring-1 ring-navy-100",
          )}
        >
          {t.label}
          {t.count !== undefined ? (
            <span
              className={cn(
                "rounded-full px-1.5 text-[11px]",
                i === active ? "bg-honey-400 text-navy-900" : "bg-navy-100 text-navy-700",
              )}
            >
              {t.count}
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
