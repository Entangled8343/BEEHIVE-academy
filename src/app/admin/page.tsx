import Link from "next/link";
import { AlertTriangle, ArrowRight, ClipboardCheck, GraduationCap, Megaphone, UserPlus, Users, Wallet } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { IconTile, StatTile } from "@/components/ui/tiles";
import { admin, enrollmentPipeline, financeOverview, school } from "@/mocks";
import { hasModule } from "@/schools";

export const metadata = { title: "Panel" };

const statIcons = {
  users: { icon: Users, cls: "bg-primary-100 text-primary-700" },
  check: { icon: ClipboardCheck, cls: "bg-emerald-100 text-emerald-700" },
  plus: { icon: UserPlus, cls: "bg-accent-200 text-accent-700" },
  megaphone: { icon: Megaphone, cls: "bg-rose-100 text-rose-600" },
  teachers: { icon: GraduationCap, cls: "bg-violet-100 text-violet-700" },
  wallet: { icon: Wallet, cls: "bg-emerald-100 text-emerald-700" },
};

export default function AdminDashboard() {
  const funnel = enrollmentPipeline.map((p) => ({ stage: p.stage, n: p.items.length * 4 + 1, tone: p.tone }));
  const maxN = Math.max(...funnel.map((f) => f.n));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={school.today} title="Panel de Dirección" subtitle="Resumen del colegio en tiempo real" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {admin.stats.map((s) => {
          const ic = statIcons[s.icon];
          return (
            <StatTile
              key={s.label}
              label={s.label}
              value={s.value}
              hint={s.hint}
              icon={
                <IconTile size="sm" className={ic.cls}>
                  <ic.icon />
                </IconTile>
              }
            />
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionTitle>Asistencia por grado · hoy</SectionTitle>
          <Card className="space-y-3 p-5">
            {admin.attendanceBySection.map((a) => (
              <div key={a.s} className="grid grid-cols-[120px_1fr_44px] items-center gap-3">
                <span className="truncate text-sm font-bold">{a.s}</span>
                <Progress value={a.v} className="h-3" barClassName={a.v < 90 ? "bg-orange-400" : "bg-emerald-500"} />
                <span className="text-right font-display font-semibold">{a.v}%</span>
              </div>
            ))}
          </Card>
          {hasModule("estadoCuenta") && financeOverview ? (
            <Card className="mt-6 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold">Mensualidades cobradas</p>
                  <p className="text-sm font-semibold text-primary-600">
                    {financeOverview.overdueFamilies} familias con saldo pendiente
                  </p>
                </div>
                <ButtonLink href="/admin/cuentas" variant="soft" size="sm">
                  Ver cobros
                </ButtonLink>
              </div>
              <div className="mt-4 flex h-32 items-end gap-3">
                {financeOverview.months.map((m, i, all) => (
                  <div key={m.m} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-xs font-bold text-primary-600">{m.v}%</span>
                    <div
                      className={i === all.length - 1 ? "w-full rounded-t-xl bg-accent-400" : "w-full rounded-t-xl bg-primary-700"}
                      style={{ height: `${m.v}%` }}
                    />
                    <span className="text-xs font-bold text-primary-500">{m.m}</span>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
        </section>

        <div className="space-y-6 lg:col-span-2">
          <section>
            <SectionTitle
              action={
                <ButtonLink href="/admin/inscripciones" variant="ghost" size="sm">
                  Ver tablero
                </ButtonLink>
              }
            >
              Admisiones {school.year + 1}
            </SectionTitle>
            <Card className="space-y-3 p-5">
              {funnel.map((f) => (
                <div key={f.stage}>
                  <div className="mb-1 flex justify-between text-sm font-bold">
                    <span>{f.stage}</span>
                    <span>{f.n}</span>
                  </div>
                  <div className="h-3 rounded-full bg-primary-50">
                    <div className={`h-3 rounded-full ${f.tone}`} style={{ width: `${(f.n / maxN) * 100}%` }} />
                  </div>
                </div>
              ))}
            </Card>
          </section>

          <section>
            <SectionTitle>Atención</SectionTitle>
            <Card className="divide-y divide-primary-100">
              {admin.alerts.map((x) => (
                <Link key={x.t} href="/admin" className="flex items-center gap-3 px-4 py-3">
                  <AlertTriangle className={x.tone === "red" ? "size-5 text-rose-500" : "size-5 text-orange-500"} />
                  <div className="flex-1">
                    <p className="font-bold">{x.t}</p>
                    <p className="text-sm text-primary-600">{x.s}</p>
                  </div>
                  <ArrowRight className="size-4 text-primary-300" />
                </Link>
              ))}
            </Card>
          </section>
          <div className="flex flex-wrap gap-2">
            {admin.usage.map((u, i) => (
              <Pill key={u} tone={i === admin.usage.length - 1 ? "green" : "gray"}>
                {u}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
