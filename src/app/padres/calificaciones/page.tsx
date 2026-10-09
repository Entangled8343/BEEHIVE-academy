import { Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { ChildSwitcher } from "@/features/familia/child-switcher";
import { cn } from "@/lib/utils";
import { band, mateoGrades } from "@/mocks";

export const metadata = { title: "Calificaciones" };

const bandCell = {
  AA: "bg-emerald-100 text-emerald-800",
  AS: "bg-sky-100 text-sky-800",
  AF: "bg-orange-100 text-orange-800",
  AI: "bg-rose-100 text-rose-700",
};

export default function ParentGrades() {
  const avg = (i: number) =>
    mateoGrades.reduce((s, g) => s + (g.cortes[i] ?? 0), 0) / mateoGrades.length;
  const current = avg(2);
  const b = band(current);
  return (
    <div>
      <PageHeader
        title="Calificaciones"
        subtitle="Año escolar 2026 · Escala MINED"
        action={
          <Button variant="honey" size="sm" className="hidden sm:inline-flex">
            <Download /> Boleta PDF
          </Button>
        }
      />
      <ChildSwitcher active="mateo" basePath="/padres/calificaciones" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Card className="honeycomb-navy col-span-2 bg-navy-800 p-5 text-white ring-0 sm:col-span-1">
          <p className="text-sm font-bold text-navy-200">Promedio III corte</p>
          <div className="mt-1 flex items-end gap-3">
            <p className="font-display text-5xl font-semibold text-white">{current.toFixed(1)}</p>
            <Pill tone="solid-honey" className="mb-2">
              {b.code}
            </Pill>
          </div>
          <p className="mt-1 text-sm font-semibold text-honey-300">{b.label}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-bold text-navy-600">Mejor materia</p>
          <p className="mt-1 font-display text-xl leading-tight font-semibold">Educación Física</p>
          <p className="text-sm font-semibold text-emerald-700">100 · AA</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-bold text-navy-600">Avance vs. II corte</p>
          <p className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-emerald-700">
            <TrendingUp className="size-6" /> +1.6
          </p>
          <p className="text-sm font-semibold text-navy-500">IV corte en curso</p>
        </Card>
      </div>

      <Card className="mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50/60 text-xs font-bold text-navy-600 uppercase">
                <th className="px-4 py-3">Materia</th>
                {["I", "II", "III", "IV"].map((c) => (
                  <th key={c} className="w-14 px-1 py-3 text-center sm:w-20">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {mateoGrades.map((g) => (
                <tr key={g.subject}>
                  <td className="px-4 py-3 text-sm leading-tight font-bold text-navy-900">{g.subject}</td>
                  {g.cortes.map((s, i) => (
                    <td key={i} className="px-1 py-2.5 text-center">
                      {s === null ? (
                        <span className="text-sm font-bold text-navy-300">—</span>
                      ) : (
                        <span
                          className={cn(
                            "inline-flex w-11 flex-col items-center rounded-xl py-1 leading-none sm:w-14",
                            bandCell[band(s).code as keyof typeof bandCell],
                          )}
                        >
                          <span className="font-display text-[15px] font-semibold">{s}</span>
                          <span className="mt-0.5 text-[9px] font-bold">{band(s).code}</span>
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pill tone="green">AA 90–100 Avanzado</Pill>
        <Pill tone="blue">AS 76–89 Satisfactorio</Pill>
        <Pill tone="orange">AF 60–75 Fundamental</Pill>
        <Pill tone="red">AI &lt;60 Inicial</Pill>
      </div>
      <Button variant="honey" block className="mt-5 sm:hidden">
        <Download /> Descargar boleta PDF
      </Button>
    </div>
  );
}
