import { CheckCheck, Megaphone, Paperclip } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { announcements } from "@/mocks";

export const metadata = { title: "Comunicados" };

export default function AnnouncementsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Comunicados" subtitle="Avisos de Dirección y de las maestras" />
      <Tabs
        className="mb-5"
        active={0}
        items={[{ label: "Todos" }, { label: "Sin leer", count: 1 }, { label: "Importantes" }, { label: "2° A" }]}
      />
      <div className="space-y-3">
        {announcements.map((n, i) => (
          <Card
            key={n.id}
            className={cn("p-5", !n.read && "ring-2 ring-honey-400")}
          >
            <div className="flex items-start gap-3">
              {n.from === "Dirección" ? (
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-800 text-honey-400">
                  <Megaphone className="size-5" />
                </span>
              ) : (
                <Avatar name={n.from} />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-sm font-bold">{n.from}</p>
                  <span className="text-xs font-semibold text-navy-400">· {n.date}</span>
                  {!n.read ? <span className="size-2 rounded-full bg-rose-500" /> : null}
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {n.priority === "importante" ? <Pill tone="red" size="sm">Importante</Pill> : null}
                  <Pill tone="gray" size="sm">
                    {n.audience}
                  </Pill>
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-lg leading-snug font-semibold">{n.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-navy-700">{n.excerpt}</p>
            {i === 0 ? (
              <>
                <div className="mt-3 flex items-center gap-2 rounded-2xl bg-navy-50 px-3 py-2 text-sm font-bold text-navy-700">
                  <Paperclip className="size-4" /> Itinerario-excursion.pdf
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="primary">
                    <CheckCheck /> Enterado
                  </Button>
                  <Button variant="honey">Firmar permiso</Button>
                </div>
              </>
            ) : n.requiresAck ? (
              <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                <CheckCheck className="size-4" /> Confirmaste la lectura
              </p>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
