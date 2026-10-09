import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconTile({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl",
        size === "sm" && "size-9 [&_svg]:size-[18px]",
        size === "md" && "size-11 [&_svg]:size-5",
        size === "lg" && "size-14 [&_svg]:size-7",
        className ?? "bg-navy-50 text-navy-700",
      )}
    >
      {children}
    </span>
  );
}

export function StatTile({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl bg-white p-4 shadow-soft ring-1 ring-navy-100/70", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-navy-600">{label}</p>
        {icon}
      </div>
      <p className="mt-2 font-display text-3xl font-semibold text-navy-900">{value}</p>
      {hint ? <p className="mt-1 text-xs font-semibold text-navy-500">{hint}</p> : null}
    </div>
  );
}

export function ListRow({
  href,
  icon,
  title,
  subtitle,
  trailing,
  className,
}: {
  href?: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}) {
  const content = (
    <>
      {icon}
      <div className="min-w-0 flex-1">
        <p className="leading-snug font-bold text-navy-900">{title}</p>
        {subtitle ? <p className="mt-0.5 text-sm leading-snug text-navy-600">{subtitle}</p> : null}
      </div>
      {trailing ?? (href ? <ChevronRight className="size-5 shrink-0 text-navy-300" /> : null)}
    </>
  );
  const cls = cn("flex items-center gap-3 px-4 py-3.5", className);
  return href ? (
    <Link href={href} className={cn(cls, "transition-colors hover:bg-navy-50/60")}>
      {content}
    </Link>
  ) : (
    <div className={cls}>{content}</div>
  );
}
