import { cn } from "@/lib/utils";

/** Hexágono con contenido centrado (íconos, insignias, marcos de foto). */
export function Hex({
  className,
  children,
  flat = false,
}: {
  className?: string;
  children?: React.ReactNode;
  flat?: boolean;
}) {
  return (
    <div className={cn("grid place-items-center", flat ? "hex-flat" : "hex", className)}>{children}</div>
  );
}
