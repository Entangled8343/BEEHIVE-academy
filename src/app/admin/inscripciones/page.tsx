import { FileCheck2, Filter, Phone, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { enrollmentPipeline } from "@/mocks";

export const metadata = { title: "Inscripciones" };

export default function EnrollmentBoard() {
  return (
    <div>
      <PageHeader
        title="Pre-inscripciones 2027"
        subtitle="Arrastra cada solicitud según avance el proceso"
        action={
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="sm">
              <Filter /> Filtrar
            </Button>
            <Button size="sm">
              <Plus /> Registrar
            </Button>
          </div>
        }
      />
      <Tabs
        className="mb-5"
        active={0}
        items={[{ label: "Tablero" }, { label: "Lista" }, { label: "Citas", count: 5 }, { label: "Lista de espera", count: 3 }]}
      />
      <div className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
        {enrollmentPipeline.map((col) => (
          <div key={col.stage} className="w-[78vw] shrink-0 snap-start sm:w-72 lg:w-auto">
            <div className="mb-3 flex items-center gap-2">
              <span className={cn("size-3 rounded-full", col.tone)} />
              <p className="font-display text-lg font-semibold">{col.stage}</p>
              <span className="rounded-full bg-navy-100 px-2 text-xs font-bold text-navy-700">{col.items.length}</span>
            </div>
            <div className="space-y-3 rounded-3xl bg-navy-50/70 p-2.5">
              {col.items.map((it) => (
                <Card key={it.child} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={it.child} size="sm" kid />
                    <div className="min-w-0 flex-1">
                      <p className="leading-tight font-bold">{it.child}</p>
                      <p className="text-sm font-semibold text-navy-600">{it.grade}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Pill tone={it.docs === "3/3" ? "green" : "orange"} size="sm">
                      <FileCheck2 /> Docs {it.docs}
                    </Pill>
                    <Pill tone="gray" size="sm">
                      {it.when}
                    </Pill>
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t border-navy-100 pt-3 text-xs font-bold text-navy-600">
                    <Phone className="size-3.5" /> {it.guardian}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
