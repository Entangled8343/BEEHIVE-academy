import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { restrictionTag } from "@/features/cafe/labels";
import { categoryIcon, categoryTone, money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Productos" };

/** Productos con su tratamiento fiscal (IVA 15 % o exento) y las características que las familias pueden restringir. */
export default function Products() {
  return (
    <div>
      <PageHeader
        title="Productos y precios"
        subtitle="Precio con IVA incluido · el tratamiento fiscal lo define su contador"
        action={
          <Button>
            <Plus /> Nuevo producto
          </Button>
        }
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-primary-100 text-left text-xs font-bold tracking-wide text-primary-500 uppercase">
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3">Impuesto</th>
              <th className="px-4 py-3">Características</th>
              <th className="px-4 py-3">Se vende por</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {cafe.products.map((p) => {
              const Icon = categoryIcon[p.category];
              return (
                <tr key={p.name}>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3 font-bold">
                      <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl [&_svg]:size-5", categoryTone[p.category])}>
                        <Icon />
                      </span>
                      {p.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary-600">{p.category}</td>
                  <td className="px-4 py-3 text-right font-bold tabular-nums">{money(p.price, cafe.currency)}</td>
                  <td className="px-4 py-3">
                    <Pill tone={p.tax === "Exento" ? "gray" : "blue"}>{p.tax}</Pill>
                  </td>
                  <td className="px-4 py-3">
                    {p.tags.length ? (
                      <span className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <Pill key={t} tone="orange">
                            {restrictionTag[t]}
                          </Pill>
                        ))}
                      </span>
                    ) : (
                      <span className="text-primary-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary-600">{p.unit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 px-1 text-xs font-semibold text-primary-500">
        Las características permiten que la caja respete lo que cada familia no quiere que su hijo consuma. Cada cambio de precio queda en la bitácora.
      </p>
    </div>
  );
}
