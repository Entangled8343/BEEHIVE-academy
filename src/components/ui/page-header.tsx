import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  back,
  action,
  eyebrow,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  back?: string;
  action?: React.ReactNode;
  eyebrow?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-end gap-3", className)}>
      {back ? (
        <Link
          href={back}
          className="mb-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-white text-primary-800 shadow-soft ring-1 ring-primary-100"
          aria-label="Volver"
        >
          <ChevronLeft className="size-5" />
        </Link>
      ) : null}
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <p className="mb-0.5 text-xs font-bold tracking-wide text-accent-700 uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl leading-tight font-semibold lg:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-[15px] text-primary-600">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function SectionTitle({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-center justify-between gap-3", className)}>
      <h2 className="text-lg font-semibold">{children}</h2>
      {action}
    </div>
  );
}
