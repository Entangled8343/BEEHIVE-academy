"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { users, type Role } from "@/mocks";
import { schoolConfig } from "@/schools";
import { isActive, sidebarNav } from "./nav-config";

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const groups = sidebarNav[role];
  const all = groups.flatMap((g) => g.items.map((i) => i.href));
  const user = users[role];
  const [line1, line2] = schoolConfig.nameLines;
  return (
    <aside className="pattern-dark fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-sidebar text-white lg:flex">
      {schoolConfig.brand.wordmarkOnDark ? (
        <Link href="/" className="block px-6 pt-5 pb-4">
          <Image
            src={schoolConfig.brand.wordmarkOnDark}
            alt={schoolConfig.name}
            width={schoolConfig.brand.wordmarkSize?.[0] ?? 600}
            height={schoolConfig.brand.wordmarkSize?.[1] ?? 300}
            priority
            className="h-auto w-44"
          />
        </Link>
      ) : (
        <Link href="/" className="flex items-center gap-3 px-6 pt-6 pb-5">
          <LogoCircle className="size-12" />
          {schoolConfig.id === "curie" ? (
            <p className="font-display text-[13px] leading-snug font-semibold tracking-[0.1em] text-white uppercase">
              {line1}
              <br />
              {line2}
            </p>
          ) : (
            <div>
              <p className="font-display text-xl leading-none font-semibold text-accent-400">{line1}</p>
              <p className="font-display text-lg leading-tight font-medium text-white">{line2}</p>
            </div>
          )}
        </Link>
      )}
      <nav className="scrollbar-none flex-1 overflow-y-auto px-4 pb-4">
        {groups.map((g, gi) => (
          <div key={gi} className="mb-4">
            {g.titleKey ? (
              <p className="mb-1.5 px-3 text-[11px] font-bold tracking-widest text-primary-300 uppercase">
                {t(g.titleKey)}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {g.items.map((item) => {
                const active = isActive(pathname, item.href, all);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-11 items-center gap-3 rounded-2xl px-3 text-[15px] font-semibold transition-colors",
                        active ? "bg-accent-400 text-primary-900" : "text-primary-100 hover:bg-white/8 hover:text-white",
                      )}
                    >
                      <Icon className="size-5 shrink-0" />
                      <span className="flex-1 truncate">{t(item.key)}</span>
                      {item.badge ? (
                        <span
                          className={cn(
                            "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold",
                            active ? "bg-primary-900 text-accent-400" : "bg-accent-400 text-primary-900",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="m-4 flex items-center gap-3 rounded-2xl bg-white/8 p-3">
        <Avatar name={user.name} size="sm" kid={role === "alumno"} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{user.name}</p>
          <p className="truncate text-xs text-primary-200">{user.roleLabel}</p>
        </div>
        <LogOut className="size-4 text-primary-300" aria-label={t("salir")} />
      </div>
    </aside>
  );
}
