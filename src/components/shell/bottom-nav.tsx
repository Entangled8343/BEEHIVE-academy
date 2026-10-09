"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Role } from "@/mocks";
import { bottomActive, bottomNav } from "./nav-config";

export function BottomNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = bottomNav[role];
  if (!items.length) return null;
  const current = bottomActive(pathname, items);
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-navy-100 bg-white/95 backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5 px-2 pt-1.5">
        {items.map((item) => {
          const active = item.href === current;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-0.5 py-1 text-[11px] font-bold"
              >
                <span
                  className={cn(
                    "relative grid h-8 w-14 place-items-center rounded-full transition-colors",
                    active ? "bg-honey-400 text-navy-900" : "text-navy-400",
                  )}
                >
                  <Icon className="size-[22px]" strokeWidth={active ? 2.4 : 2} />
                  {item.badge ? (
                    <span className="absolute -top-0.5 right-2 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] text-white ring-2 ring-white">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span className={active ? "text-navy-900" : "text-navy-400"}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
