import Image from "next/image";
import { cn } from "@/lib/utils";
import { schoolConfig } from "@/schools";

const { brand, nameLines } = schoolConfig;

const wideMark = brand.logoSize[0] / brand.logoSize[1] > 1.3;

/** Logo circular / sello del colegio. Una marca horizontal se centra en un círculo blanco. */
export function LogoCircle({ className, priority }: { className?: string; priority?: boolean }) {
  if (wideMark) {
    return (
      <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-full bg-white", className)}>
        <Image
          src={brand.logo}
          alt={schoolConfig.name}
          width={brand.logoSize[0]}
          height={brand.logoSize[1]}
          priority={priority}
          className="h-auto w-[82%]"
        />
      </span>
    );
  }
  return (
    <Image
      src={brand.logo}
      alt={schoolConfig.name}
      width={brand.logoSize[0]}
      height={brand.logoSize[1]}
      priority={priority}
      className={cn("size-12 shrink-0", className)}
    />
  );
}

/** Logotipo grande: imagen propia (Beehive) o sello con nombre en dos líneas (Curie). */
export function LogoWordmark({ className, priority }: { className?: string; priority?: boolean }) {
  if (brand.wordmark && brand.wordmarkSize) {
    return (
      <Image
        src={brand.wordmark}
        alt={schoolConfig.name}
        width={brand.wordmarkSize[0]}
        height={brand.wordmarkSize[1]}
        priority={priority}
        className={cn("h-auto w-40", className)}
      />
    );
  }
  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <LogoCircle className="size-20" priority={priority} />
      <SchoolName className="text-primary-800" />
    </div>
  );
}

/** Nombre del colegio en dos líneas, en versalitas serif como en su sitio. */
export function SchoolName({ className }: { className?: string }) {
  return (
    <p className={cn("font-display text-[13px] leading-tight font-semibold tracking-[0.12em] uppercase", className)}>
      {nameLines[0]}
      <br />
      {nameLines[1]}
    </p>
  );
}

export function Tagline({ className }: { className?: string }) {
  const parts = schoolConfig.tagline.split("·").map((p) => p.trim());
  return (
    <p className={cn("font-display font-semibold tracking-wide text-primary-800", className)}>
      {parts.map((p, i) => (
        <span key={p}>
          {i > 0 ? <span className="text-accent-500"> · </span> : null}
          {p}
        </span>
      ))}
    </p>
  );
}
