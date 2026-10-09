import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600 disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-navy-800 text-white shadow-soft hover:bg-navy-700",
        honey: "bg-honey-400 text-navy-900 shadow-soft hover:bg-honey-500",
        outline: "border-2 border-navy-200 bg-white text-navy-800 hover:border-navy-300 hover:bg-navy-50",
        soft: "bg-navy-50 text-navy-800 hover:bg-navy-100",
        ghost: "text-navy-700 hover:bg-navy-50",
        white: "bg-white text-navy-900 shadow-soft hover:bg-honey-50",
        danger: "bg-rose-600 text-white hover:bg-rose-700",
        success: "bg-emerald-600 text-white hover:bg-emerald-700",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-13 px-7 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
      block: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, block, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, block }), className)} {...props} />;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, block, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size, block }), className)} {...props} />;
}
