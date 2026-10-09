import QRCode from "qrcode";
import { Clock, Plus, ShieldAlert, ShieldCheck, UserPlus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { ListRow } from "@/components/ui/tiles";
import { pickup } from "@/mocks";

export const metadata = { title: "¿Quién recoge?" };

export default async function PickupPage() {
  const qr = await QRCode.toString("BEEHIVE-RETIRO-2026-10-09-482913-DEMO", {
    type: "svg",
    margin: 0,
    color: { dark: "#1d1e55", light: "#ffffff" },
  });
  const t = pickup.today;
  return (
    <div>
      <PageHeader title="¿Quién recoge hoy?" subtitle="Avisa al colegio quién pasará por tus hijos" />
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <Card className="overflow-hidden">
            <div className="honeycomb bg-honey-400 px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-wide text-navy-800/70 uppercase">Aviso de hoy</p>
                <Pill tone="solid">Programado</Pill>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Avatar name={t.person} size="lg" ring />
                <div>
                  <p className="font-display text-2xl leading-tight font-semibold">{t.person}</p>
                  <p className="font-bold text-navy-800">{t.relationship}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center p-6">
              <div
                className="size-52 rounded-2xl bg-white p-3 ring-4 ring-navy-800"
                dangerouslySetInnerHTML={{ __html: qr }}
              />
              <p className="mt-4 text-sm font-bold text-navy-600">o dicta este código en portería</p>
              <p className="font-display text-4xl font-semibold tracking-[0.2em] text-navy-900">{t.code}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Pill tone="navy">
                  <Clock /> {t.time}
                </Pill>
                {t.children.map((c) => (
                  <Pill key={c} tone="honey">
                    {c}
                  </Pill>
                ))}
              </div>
              <p className="mt-4 text-center text-xs font-semibold text-navy-500">
                Válido solo hoy. Portería verificará la cédula y la foto de la persona.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-navy-100 p-4">
              <Button variant="outline">Cambiar</Button>
              <Button variant="soft" className="text-rose-600">
                Cancelar aviso
              </Button>
            </div>
          </Card>
        </section>

        <div className="space-y-6">
          <section>
            <SectionTitle
              action={
                <Button variant="soft" size="sm">
                  <Plus /> Agregar
                </Button>
              }
            >
              Personas autorizadas
            </SectionTitle>
            <Card className="divide-y divide-navy-100">
              {pickup.authorized.map((p) => (
                <ListRow
                  key={p.name}
                  icon={<Avatar name={p.name} />}
                  title={p.name}
                  subtitle={`${p.relationship} · Cédula ${p.cedula.slice(0, 3)}-•••••-${p.cedula.slice(-5)}`}
                  trailing={
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <ShieldCheck className="size-4" /> Con foto
                    </span>
                  }
                />
              ))}
            </Card>
          </section>

          <section>
            <SectionTitle>¿Alguien más lo recogerá?</SectionTitle>
            <Card className="p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                  <UserPlus className="size-5" />
                </span>
                <div>
                  <p className="font-bold">Persona por una sola vez</p>
                  <p className="text-sm text-navy-600">
                    Registra nombre, cédula y foto. El permiso vence al final del día.
                  </p>
                </div>
              </div>
              <Button block variant="primary" className="mt-4">
                Nuevo aviso de retiro
              </Button>
            </Card>
          </section>

          <Card className="flex items-start gap-3 bg-rose-50 p-4 ring-rose-100">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-rose-600" />
            <p className="text-sm font-semibold text-rose-900">
              Si alguna persona <b>no debe</b> recoger a tus hijos, comunícalo a Dirección. Portería la verá
              marcada en rojo.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
