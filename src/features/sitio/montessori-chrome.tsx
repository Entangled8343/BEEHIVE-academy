import Image from "next/image";
import Link from "next/link";
import { MapPin, Menu, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/brand/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { school } from "@/mocks";
import { schoolConfig } from "@/schools";

const { brand } = schoolConfig;

const links = [
  { href: "/#ambientes", label: "Ambientes" },
  { href: "/#metodo", label: "Método" },
  { href: "/#familias", label: "Familias" },
  { href: "/#summer-camp", label: "Summer Camp" },
  { href: "/#contacto", label: "Contacto" },
];

/** Marca horizontal de los tres círculos, sin fondo (para fondos claros). */
export function MontessoriMark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={brand.logo}
      alt={schoolConfig.name}
      width={brand.logoSize[0]}
      height={brand.logoSize[1]}
      priority={priority}
      className={className}
    />
  );
}

export function MontessoriHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-primary-100/70 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <MontessoriMark className="h-10 w-auto lg:h-11" priority />
          <div className="hidden leading-none whitespace-nowrap sm:block">
            <p className="font-script text-[26px] leading-[0.85] text-primary-900 lg:text-[30px]">Mundo Montessori</p>
            <p className="mt-0.5 hidden text-xs font-bold text-primary-500 sm:block">Comunidad Infantil · 2 a 9 años</p>
          </div>
        </Link>
        <nav className="ml-auto hidden items-center lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-[15px] font-bold whitespace-nowrap text-primary-700 hover:bg-primary-50"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <ButtonLink href="/ingresar" variant="outline" size="sm" className="hidden sm:inline-flex">
            Ingresar
          </ButtonLink>
          <ButtonLink href="/inscripcion" variant="accent" size="sm">
            <span className="sm:hidden">Inscríbete</span>
            <span className="hidden sm:inline">Inscripción 2027</span>
          </ButtonLink>
          <span className="grid size-10 place-items-center rounded-full bg-white text-primary-800 shadow-soft ring-1 ring-primary-100 lg:hidden">
            <Menu className="size-5" />
          </span>
        </div>
      </div>
    </header>
  );
}

export function MontessoriFooter() {
  return (
    <footer className="pattern-dark bg-primary-900 text-primary-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2">
          {brand.wordmarkOnDark && brand.wordmarkSize ? (
            <Image
              src={brand.wordmarkOnDark}
              alt={schoolConfig.name}
              width={brand.wordmarkSize[0]}
              height={brand.wordmarkSize[1]}
              loading="eager"
              className="h-auto w-56"
            />
          ) : null}
          <p className="mt-4 max-w-sm text-sm">
            Ambientes Montessori para niños de 2 a 9 años: Comunidad Infantil, Casa de Niños y Taller.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-display text-lg font-semibold text-white">Contacto</p>
          <p className="flex gap-2">
            <MapPin className="size-4 shrink-0 text-accent-400" /> Managua, Nicaragua
          </p>
          <p className="flex gap-2">
            <Phone className="size-4 shrink-0 text-accent-400" /> 2276-0542 · 8888-7027
          </p>
          <p className="flex gap-2">
            <InstagramIcon className="size-4 shrink-0 text-accent-400" /> {school.instagram}
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-display text-lg font-semibold text-white">Accesos</p>
          <Link href="/ingresar" className="block hover:text-white">
            Portal de familias y guías
          </Link>
          <Link href="/inscripcion" className="block hover:text-white">
            Pre-inscripción 2027
          </Link>
          <Link href="/agenda-tu-cita" className="block hover:text-white">
            Agenda tu visita
          </Link>
          <p className="pt-2 text-xs text-primary-300">Aviso de privacidad · Términos</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-primary-300">
        © 2026 Mundo Montessori · Comunidad Infantil · Managua, Nicaragua
      </p>
    </footer>
  );
}
