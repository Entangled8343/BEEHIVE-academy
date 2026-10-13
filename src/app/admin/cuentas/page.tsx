import { BellRing, Download, FileCheck2, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Tabs } from "@/components/ui/tabs";
import { IconTile, StatTile } from "@/components/ui/tiles";
import { financeOverview } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Cobros y pagos" };

const families = [
  { family: "Familia Castillo Solís", students: "Valeria 9° A · Diego 5° B", balance: "385.00", status: "pendiente", proof: true },
  { family: "Familia Arguello Mena", students: "Sofía 9° A", balance: "185.00", status: "pendiente", proof: false },
  { family: "Familia Navas Ortiz", students: "Santiago 9° A · Julia 1° A", balance: "740.00", status: "vencido", proof: false },
  { family: "Familia Rivas Montiel", students: "Camila 9° A", balance: "0.00", status: "al día", proof: false },
  { family: "Familia Mejía Rocha", students: "Andrés 9° A", balance: "185.00", status: "pendiente", proof: true },
  { family: "Familia Delgado Paz", students: "Gabriel 9° A · Emma 4° B", balance: "0.00", status: "al día", proof: false },
] as const;

const tone = { pendiente: "orange", vencido: "red", "al día": "green" } as const;

export default function AdminBilling() {
  requireModule("estadoCuenta");
  return (
    <div>
      <PageHeader
        title="Cobros y pagos"
        subtitle="Mensualidades de octubre · montos de ejemplo"
        action={
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="sm">
              <Download /> Exportar a Excel
            </Button>
            <Button variant="accent" size="sm">
              <BellRing /> Enviar recordatorio
            </Button>
          </div>
        }
      />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Familias al día" value={`${financeOverview?.rate ?? 0}%`} hint="Promedio de los últimos 3 meses" />
        <StatTile label="Con saldo pendiente" value={String(financeOverview?.overdueFamilies ?? 0)} hint="Vencen el 15 de octubre" />
        <StatTile label="Comprobantes por revisar" value="14" hint="Subidos por las familias" icon={<IconTile size="sm" className="bg-sky-100 text-sky-700"><FileCheck2 /></IconTile>} />
        <StatTile label="Recordatorios enviados" value="138" hint="Push y correo, esta semana" />
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex h-11 flex-1 items-center gap-2 rounded-full bg-white px-4 text-primary-400 shadow-soft ring-1 ring-primary-100 sm:max-w-sm">
          <Search className="size-4" />
          <span className="text-sm">Buscar familia o alumno…</span>
        </div>
        <Tabs active={0} items={[{ label: "Todas" }, { label: "Pendientes", count: 52 }, { label: "Vencidas", count: 9 }, { label: "Con comprobante", count: 14 }]} />
      </div>
      <Card className="divide-y divide-primary-100 overflow-hidden">
        {families.map((f) => (
          <div key={f.family} className="flex items-center gap-3 px-4 py-3.5">
            <Avatar name={f.family.replace("Familia ", "")} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{f.family}</p>
              <p className="truncate text-xs font-semibold text-primary-500">{f.students}</p>
            </div>
            {f.proof ? (
              <Pill tone="blue" size="sm" className="hidden sm:inline-flex">
                <FileCheck2 /> Comprobante
              </Pill>
            ) : null}
            <div className="w-28 text-right">
              <p className="font-display text-lg">US$ {f.balance}</p>
              <Pill tone={tone[f.status]} size="sm">
                {f.status}
              </Pill>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
