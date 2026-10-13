import { CheckCircle2, Clock, Users } from "lucide-react";
import { Scene } from "@/components/brand/scene";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Tabs } from "@/components/ui/tabs";
import { clubs } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Clubes" };

const areaTone = { Ciencia: "green", Arte: "pink", Deporte: "orange", Humanismo: "red", Idiomas: "blue" } as const;

export default function StudentClubs() {
  requireModule("clubes");
  const list = clubs ?? [];
  return (
    <div>
      <PageHeader title="Clubes y extracurriculares" subtitle="Science · Art · Sports · Humanism — inscripciones abiertas hasta el 20 de octubre" />
      <Tabs
        className="mb-5"
        active={0}
        items={[{ label: "Todos" }, { label: "Mis clubes", count: list.filter((c) => c.enrolled).length }, { label: "Ciencia" }, { label: "Arte" }, { label: "Deporte" }]}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <Card key={c.name} className="flex flex-col overflow-hidden">
            <Scene name={c.scene} className="h-28" />
            <div className="flex flex-1 flex-col p-4">
              <Pill tone={areaTone[c.area]} size="sm" className="self-start">
                {c.area}
              </Pill>
              <h3 className="mt-2 text-xl leading-tight">{c.name}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                <Clock className="size-4" /> {c.schedule}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                <Users className="size-4" /> {c.teacher} · {c.spots}
              </p>
              <div className="mt-auto pt-4">
                {c.enrolled ? (
                  <Button variant="soft" block className="text-emerald-700">
                    <CheckCircle2 /> Inscrita
                  </Button>
                ) : (
                  <Button block>Inscribirme</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
