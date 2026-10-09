"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { users, type Role } from "@/mocks";
import { isActive, sidebarNav } from "./nav-config";

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const groups = sidebarNav[role];
  const all = groups.flatMap((g) => g.items.map((i) => i.href));
  const user = users[role];
  return (
    <aside className="honeycomb-navy fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-navy-900 text-white lg:flex">
      <Link href="/" className="flex items-center gap-3 px-6 pt-6 pb-5">
        <LogoCircle className="size-12" />
        <div>
          <p className="font-display text-xl leading-none font-semibold text-honey-400">Beehive</p>
          <p className="font-display text-lg leading-tight font-medium text-white">Academy</p>
        </div>
      </Link>
      <nav className="scrollbar-none flex-1 overflow-y-auto px-4 pb-4">
        {groups.map((g, gi) => (
          <div key={gi} className="mb-4">
            {g.title ? (
              <p className="mb-1.5 px-3 text-[11px] font-bold tracking-widest text-navy-300 uppercase">
                {g.title}
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
                        active
                          ? "bg-honey-400 text-navy-900"
                          : "text-navy-100 hover:bg-white/8 hover:text-white",
                      )}
                    >
                      <Icon className="size-5 shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge ? (
                        <span
                          className={cn(
                            "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold",
                            active ? "bg-navy-900 text-honey-400" : "bg-honey-400 text-navy-900",
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
        <Avatar name={user.name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{user.name}</p>
          <p className="truncate text-xs text-navy-200">{user.roleLabel}</p>
        </div>
        <LogOut className="size-4 text-navy-300" aria-label="Cerrar sesión" />
      </div>
    </aside>
  );
}
