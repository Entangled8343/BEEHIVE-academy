import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const pillVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-bold whitespace-nowrap [&_svg]:size-3.5",
  {
    variants: {
      tone: {
        primary: "bg-primary-100 text-primary-800",
        accent: "bg-accent-200 text-accent-700",
        green: "bg-emerald-100 text-emerald-800",
        red: "bg-rose-100 text-rose-700",
        blue: "bg-sky-100 text-sky-800",
        pink: "bg-pink-100 text-pink-700",
        violet: "bg-violet-100 text-violet-700",
        orange: "bg-orange-100 text-orange-700",
        gray: "bg-slate-100 text-slate-600",
        solid: "bg-primary-800 text-white",
        "solid-accent": "bg-accent-400 text-primary-900",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: { tone: "primary", size: "md" },
  },
);

export function Pill({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof pillVariants>) {
  return <span className={cn(pillVariants({ tone, size }), className)} {...props} />;
}
