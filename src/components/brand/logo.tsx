import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoCircle({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo-circle.png"
      alt="Beehive Academy"
      width={862}
      height={862}
      priority={priority}
      className={cn("size-12 shrink-0", className)}
    />
  );
}

export function LogoWordmark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo-wordmark.png"
      alt="Beehive Academy"
      width={1067}
      height={844}
      priority={priority}
      className={cn("h-auto w-40", className)}
    />
  );
}

export function Tagline({ className }: { className?: string }) {
  return (
    <p className={cn("font-display font-semibold tracking-wide text-navy-800", className)}>
      Discover <span className="text-honey-500">·</span> Learn{" "}
      <span className="text-honey-500">·</span> Enjoy
    </p>
  );
}
