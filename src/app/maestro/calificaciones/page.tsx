import { Download, Lock, Plus, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { band, gradebook as g, roster2A } from "@/mocks";

export const metadata = { title: "Libro de notas" };

const bandCls = {
  AA: "bg-emerald-100 text-emerald-800",
  AS: "bg-sky-100 text-sky-800",
  AF: "bg-orange-100 text-orange-800",
  AI: "bg-rose-100 text-rose-700",
};

export default function GradebookPage() {
  return (
    <div>
      <PageHeader
        title="Libro de notas"
        subtitle="Se guarda automáticamente · Enter baja a la siguiente fila · pega desde Excel"
        action={
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="sm">
              <Download /> Exportar
            </Button>
            <Button variant="honey" size="sm">
              <Send /> Publicar corte
            </Button>
          </div>
        }
      />
      <div className="mb-4 grid grid-cols-3 gap-2 sm:max-w-2xl">
        <Select defaultValue="2A">
          <option value="2A">2° A</option>
        </Select>
        <Select defaultValue="mat">
          <option value="mat">Matemática</option>
        </Select>
        <Select defaultValue="iv">
          <option value="iv">IV Corte</option>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="bg-navy-800 text-left text-white">
                <th className="sticky left-0 z-10 bg-navy-800 px-4 py-3 font-bold">Alumno</th>
                {g.assessments.map((a) => (
                  <th key={a.name} className="px-2 py-3 text-center font-bold">
                    <span className="block leading-tight">{a.name}</span>
                    <span className="text-[11px] font-semibold text-navy-200">/{a.max}</span>
                  </th>
                ))}
                <th className="px-2 py-3 text-center">
                  <span className="grid size-7 place-items-center rounded-full bg-white/15">
                    <Plus className="size-4" />
                  </span>
                </th>
                <th className="bg-honey-400 px-3 py-3 text-center font-bold text-navy-900">Total /100</th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((row, r) => {
                const name = roster2A[r] ?? "";
                const total = row.reduce<number>((s, v) => s + (v ?? 0), 0);
                const complete = row.every((v) => v !== null);
                const b = band(total);
                return (
                  <tr key={name} className={cn("border-b border-navy-100", r % 2 === 1 && "bg-navy-50/40")}>
                    <td className="sticky left-0 z-10 bg-inherit px-4 py-2">
                      <span className="flex items-center gap-2 bg-inherit">
                        <Avatar name={name} size="xs" kid />
                        <span className="font-bold whitespace-nowrap">{name}</span>
                      </span>
                    </td>
                    {row.map((v, c) => (
                      <td key={c} className="px-1.5 py-1.5 text-center">
                        <span
                          className={cn(
                            "inline-grid h-9 w-14 place-items-center rounded-xl border-2 font-display text-[15px] font-semibold",
                            r === 14 && c === 5
                              ? "border-navy-700 bg-white ring-4 ring-honey-300"
                              : "border-transparent bg-white ring-1 ring-navy-100",
                            v === null && "text-navy-300",
                          )}
                        >
                          {v ?? "—"}
                        </span>
                      </td>
                    ))}
                    <td />
                    <td className="bg-honey-50 px-3 py-1.5 text-center">
                      {complete ? (
                        <span className={cn("inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 font-display font-semibold", bandCls[b.code as keyof typeof bandCls])}>
                          {total} <span className="text-[10px] font-bold">{b.code}</span>
                        </span>
                      ) : (
                        <Pill tone="gray">Incompleto</Pill>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-navy-100 p-4 text-sm font-semibold text-navy-600">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" /> Guardado hace 3 s
          </span>
          <span>·</span>
          <span>15 de 24 alumnos mostrados</span>
          <span className="ml-auto flex items-center gap-1.5 text-navy-500">
            <Lock className="size-4" /> Al publicar, las notas se bloquean y las familias las ven.
          </span>
        </div>
      </Card>
    </div>
  );
}
