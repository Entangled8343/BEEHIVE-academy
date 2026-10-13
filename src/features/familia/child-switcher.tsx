import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { children } from "@/mocks";

export function ChildSwitcher({ active, basePath }: { active: string; basePath: string }) {
  return (
    <div className="scrollbar-none -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
      {children.map((c) => (
        <Link
          key={c.id}
          href={`${basePath}?hijo=${c.id}`}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-bold",
            c.id === active
              ? "bg-primary-800 text-white"
              : "bg-white text-primary-700 shadow-soft ring-1 ring-primary-100",
          )}
        >
          <Avatar name={c.name} size="xs" kid />
          {c.shortName}
          <span className={cn("font-semibold", c.id === active ? "text-primary-200" : "text-primary-400")}>
            · {c.grade}
          </span>
        </Link>
      ))}
    </div>
  );
}
