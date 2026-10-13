import Link from "next/link";
import { Globe } from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { schoolConfig } from "@/schools";

/** Encabezado del portal para colegios que ya tienen su propio sitio web. */
export function PortalHeader() {
  const [l1, l2] = schoolConfig.nameLines;
  return (
    <header className="sticky top-0 z-30 bg-primary-800 text-white shadow-soft">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 lg:h-20 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <LogoCircle className="size-11 ring-2 ring-white/70 lg:size-14" priority />
          <p className="truncate font-display text-[11px] leading-snug font-semibold tracking-[0.12em] uppercase sm:text-sm">
            {l1}
            <br />
            {l2}
          </p>
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {schoolConfig.locales.length > 1 ? (
            <span className="hidden items-center gap-1 rounded-full bg-white/10 p-1 text-xs font-bold sm:flex">
              <Globe className="ml-1 size-4" />
              {schoolConfig.locales.map((l, i) => (
                <span key={l} className={cn("rounded-full px-2 py-0.5 uppercase", i === 0 ? "bg-white text-primary-900" : "text-white/80")}>
                  {l}
                </span>
              ))}
            </span>
          ) : null}
          <ButtonLink href="/ingresar" variant="accent" size="sm">
            Ingresar
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

export function PortalFooter() {
  return (
    <footer className="pattern-dark bg-night-900 text-primary-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center lg:px-8">
        <LogoCircle className="size-16" />
        <p className="font-display text-lg text-white">{schoolConfig.name}</p>
        <p className="text-sm tracking-[0.2em] text-accent-300 uppercase">{schoolConfig.tagline}</p>
        <p className="text-xs text-primary-300">Portal académico · El sitio institucional del colegio se mantiene como está.</p>
      </div>
    </footer>
  );
}
