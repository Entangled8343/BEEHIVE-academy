import { CheckCircle2, DatabaseBackup, FileText, History, Lock, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { IconTile } from "@/components/ui/tiles";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Seguridad y cumplimiento" };

function Head({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-primary-100 px-5 py-4">
      <IconTile size="sm" className="bg-primary-100 text-primary-700">
        {icon}
      </IconTile>
      <div>
        <p className="font-display text-lg leading-tight">{title}</p>
        <p className="text-sm text-primary-600">{subtitle}</p>
      </div>
    </div>
  );
}

/** Control de acceso, respaldos diarios, bitácora y versiones del sistema con aviso previo de cambios. */
export default function Security() {
  const s = cafe.security;
  return (
    <div>
      <PageHeader title="Seguridad y cumplimiento" subtitle="Accesos, respaldos, bitácora y cambios del sistema" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <Head icon={<Users />} title="Usuarios y permisos" subtitle="Cada persona entra con su usuario y clave" />
          <div className="divide-y divide-primary-100">
            {s.users.map((u) => (
              <div key={u.name} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={u.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{u.name}</p>
                  <p className="text-xs font-semibold text-primary-500">
                    {u.role} · {u.can}
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary-500">{u.last}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <Head icon={<DatabaseBackup />} title="Respaldo diario" subtitle="Automático a las 2:00 a. m., cifrado y guardado 30 días" />
          <div className="divide-y divide-primary-100">
            {s.backups.map((b) => (
              <div key={b.date} className="flex items-center gap-3 px-5 py-3">
                <CheckCircle2 className="size-5 text-emerald-600" />
                <p className="flex-1 font-semibold">{b.date}</p>
                <span className="text-sm font-semibold text-primary-500">{b.size}</span>
                <Pill tone="green" size="sm">
                  Completo
                </Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <Head icon={<History />} title="Bitácora de hoy" subtitle="Quién hizo qué, sin posibilidad de borrarlo" />
          <div className="divide-y divide-primary-100">
            {s.log.map((l) => (
              <div key={l.time + l.who} className="flex items-start gap-3 px-5 py-3">
                <span className="w-20 shrink-0 text-xs font-bold text-primary-500">{l.time}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{l.who}</p>
                  <p className="text-sm text-primary-600">{l.what}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <Head icon={<FileText />} title="Versiones del sistema" subtitle="Ningún cambio importante se activa sin aviso previo" />
          <div className="divide-y divide-primary-100">
            {s.versions.map((v) => (
              <div key={v.version} className="flex items-start gap-3 px-5 py-3.5">
                <span className="grid h-8 shrink-0 place-items-center rounded-xl bg-primary-800 px-2.5 font-display text-sm text-white">v{v.version}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{v.change}</p>
                  <p className="text-sm text-primary-600">{v.note}</p>
                </div>
                <Pill tone={v.status === "autorizada" ? "green" : "orange"}>{v.status === "autorizada" ? "Autorizada" : "Aviso pendiente"}</Pill>
              </div>
            ))}
            <p className="flex items-start gap-2 bg-primary-50 px-5 py-3 text-xs font-semibold text-primary-700">
              <Lock className="mt-0.5 size-4 shrink-0" /> Los cambios en el formato de la factura, la numeración o los impuestos quedan bloqueados hasta registrar el aviso previo.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
