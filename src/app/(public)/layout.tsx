import Link from "next/link";
import { MapPin, Menu, Phone } from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { school } from "@/mocks";

const links = [
  { href: "/#niveles", label: "Niveles" },
  { href: "/#por-que", label: "¿Por qué Beehive?" },
  { href: "/#familias", label: "Familias" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#contacto", label: "Contacto" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-cream">
      <header className="sticky top-0 z-30 border-b border-navy-100/70 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 lg:h-20 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoCircle className="size-11 lg:size-14" priority />
            <div className="leading-none whitespace-nowrap">
              <p className="font-display text-base font-semibold text-navy-900 sm:text-lg lg:text-xl">
                Beehive <span className="text-honey-600">Academy</span>
              </p>
              <p className="mt-0.5 hidden text-xs font-bold text-navy-500 sm:block">Preescolar y Primaria · Masaya</p>
            </div>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[15px] font-bold text-navy-700 hover:bg-navy-50"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <ButtonLink href="/ingresar" variant="outline" size="sm" className="hidden sm:inline-flex">
              Ingresar
            </ButtonLink>
            <ButtonLink href="/inscripcion" variant="honey" size="sm">
              <span className="sm:hidden">Inscríbete</span>
              <span className="hidden sm:inline">Inscripción 2027</span>
            </ButtonLink>
            <span className="grid size-10 place-items-center rounded-full bg-white text-navy-800 shadow-soft ring-1 ring-navy-100 lg:hidden">
              <Menu className="size-5" />
            </span>
          </div>
        </div>
      </header>

      {children}

      <footer className="honeycomb-navy bg-navy-900 text-navy-100">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <LogoCircle className="size-14" />
              <div>
                <p className="font-display text-2xl font-semibold text-white">
                  Beehive <span className="text-honey-400">Academy</span>
                </p>
                <p className="font-display font-medium text-honey-300">Discover · Learn · Enjoy</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm">
              Educación integral e inclusiva para preescolar y primaria en Masaya, Nicaragua.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-display text-lg font-semibold text-white">Contacto</p>
            <p className="flex gap-2">
              <MapPin className="size-4 shrink-0 text-honey-400" /> {school.address}
            </p>
            <p className="flex gap-2">
              <Phone className="size-4 shrink-0 text-honey-400" /> {school.whatsapp}
            </p>
            <p className="flex gap-2">
              <InstagramIcon className="size-4 shrink-0 text-honey-400" /> {school.instagram}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-display text-lg font-semibold text-white">Accesos</p>
            <Link href="/ingresar" className="block hover:text-white">
              Portal de familias y docentes
            </Link>
            <Link href="/inscripcion" className="block hover:text-white">
              Pre-inscripción 2027
            </Link>
            <Link href="/agenda-tu-cita" className="block hover:text-white">
              Agenda tu visita
            </Link>
            <p className="pt-2 text-xs text-navy-300">Aviso de privacidad · Términos</p>
          </div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-xs text-navy-300">
          © 2026 Beehive Academy · Masaya, Nicaragua
        </p>
      </footer>

      <a
        href={school.whatsappLink}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lift lg:right-6 lg:bottom-6 lg:px-5"
        aria-label="Escríbenos por WhatsApp"
      >
        <WhatsAppIcon className="size-6" />
        <span className="hidden font-bold lg:inline">Escríbenos</span>
      </a>
    </div>
  );
}
