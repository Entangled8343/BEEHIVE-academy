import { Apple, Cookie, CupSoda, Soup, type LucideIcon } from "lucide-react";
import type { CafeteriaCategory } from "@/mocks";

/** Montos de la cafetería: C$ 1,234.00 */
export function money(value: number, currency = "C$") {
  return `${currency} ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const categoryIcon: Record<CafeteriaCategory, LucideIcon> = {
  Almuerzos: Soup,
  Bebidas: CupSoda,
  Snacks: Cookie,
  Frutas: Apple,
};

export const categoryTone: Record<CafeteriaCategory, string> = {
  Almuerzos: "bg-orange-100 text-orange-700",
  Bebidas: "bg-sky-100 text-sky-700",
  Snacks: "bg-accent-200 text-accent-700",
  Frutas: "bg-emerald-100 text-emerald-700",
};
