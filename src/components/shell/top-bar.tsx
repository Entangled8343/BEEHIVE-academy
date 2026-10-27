import { Bell, Globe, Search } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { LogoCircle } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { users, type Role } from "@/mocks";
import { schoolConfig } from "@/schools";

const homes: Record<Role, string> = {
  padre: "/padres",
  alumno: "/alumno",
  maestro: "/maestro",
  admin: "/admin",
  porteria: "/porteria",
};

function LanguageSwitch({ locale }: { locale: string }) {
  if (schoolConfig.locales.length < 2) return null;
  return (
    <div className="flex items-center gap-1 rounded-full bg-white p-1 text-xs font-bold shadow-soft ring-1 ring-primary-100">
      <Globe className="ml-1.5 size-4 text-primary-500" />
      {schoolConfig.locales.map((l) => (
        <span
          key={l}
          className={cn(
            "rounded-full px-2 py-1 uppercase",
            l === locale ? "bg-primary-800 text-white" : "text-primary-600",
          )}
        >
          {l}
        </span>
      ))}
    </div>
  );
}

export async function TopBar({ role }: { role: Role }) {
  const user = users[role];
  const t = await getTranslations("common");
  const locale = await getLocale();
  return (
    <header className="sticky top-0 z-20 border-b border-primary-100/70 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 lg:h-18 lg:px-8">
        <Link href={homes[role]} className="flex min-w-0 items-center gap-2.5 lg:hidden">
          <LogoCircle className="size-10" />
          <div className="min-w-0 leading-none">
            {schoolConfig.id === "montessori" ? (
              <p className="truncate font-script text-[23px] leading-[0.9] text-primary-900">Mundo Montessori</p>
            ) : null}
            <p className={cn("truncate font-display text-[17px] font-semibold text-primary-900", schoolConfig.id === "montessori" && "hidden")}>
              {schoolConfig.id === "curie" ? (
                <>
                  Portal <span className="text-primary-600 italic">Curie</span>
                </>
              ) : (
                <>
                  {schoolConfig.nameLines[0]} <span className="text-accent-600">{schoolConfig.nameLines[1]}</span>
                </>
              )}
            </p>
            <p className="mt-0.5 truncate text-[11px] font-bold text-primary-500">{user.roleLabel}</p>
          </div>
        </Link>
        <div className="hidden max-w-md flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-primary-400 shadow-soft ring-1 ring-primary-100 lg:flex">
          <Search className="size-4" />
          <span className="text-sm">{t("buscar")}</span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LanguageSwitch locale={locale} />
          <button
            className="relative grid size-11 place-items-center rounded-full bg-white text-primary-800 shadow-soft ring-1 ring-primary-100"
            aria-label={t("notificaciones")}
          >
            <Bell className="size-5" />
            <span className="absolute top-2 right-2.5 size-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          <div className="hidden items-center gap-3 lg:flex">
            <Avatar name={user.name} size="md" kid={role === "alumno"} />
            <div className="leading-tight">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-primary-500">{user.roleLabel}</p>
            </div>
          </div>
          <Avatar
            name={user.name}
            size="md"
            kid={role === "alumno"}
            className={cn("lg:hidden", schoolConfig.locales.length > 1 && "max-sm:hidden")}
          />
        </div>
      </div>
    </header>
  );
}
