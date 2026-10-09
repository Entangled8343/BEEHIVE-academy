import { Images, Lock } from "lucide-react";
import { Scene } from "@/components/brand/scene";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Tabs } from "@/components/ui/tabs";
import { albums } from "@/mocks";

export const metadata = { title: "Galería" };

export default function GalleryPage() {
  const [featured, ...rest] = albums;
  return (
    <div>
      <PageHeader title="Galería" subtitle="Fotos de las actividades del colegio" />
      <Tabs
        className="mb-5"
        active={0}
        items={[{ label: "Todos los álbumes" }, { label: "Fotos de mis hijos", count: 34 }, { label: "2026" }]}
      />
      {featured ? (
        <Card className="mb-4 overflow-hidden">
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
            <Scene name={featured.scene} className="col-span-2 row-span-2 aspect-[4/3]" />
            <Scene name="deporte" className="aspect-[4/3]" />
            <Scene name="aula" className="aspect-[4/3]" />
          </div>
          <div className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="font-display text-xl font-semibold">{featured.title}</p>
              <p className="text-sm font-semibold text-navy-600">
                {featured.date} · {featured.count} fotos
              </p>
            </div>
            <Pill tone="navy">
              <Images /> Ver álbum
            </Pill>
          </div>
        </Card>
      ) : null}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {rest.map((a) => (
          <Card key={a.id} className="overflow-hidden">
            <Scene name={a.scene} className="aspect-square" />
            <div className="p-3">
              <p className="leading-tight font-bold">{a.title}</p>
              <p className="text-xs font-semibold text-navy-500">
                {a.date} · {a.count} fotos
              </p>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-5 flex items-start gap-2 rounded-2xl bg-navy-50 p-4 text-sm font-semibold text-navy-700">
        <Lock className="mt-0.5 size-4 shrink-0" />
        Galería privada: solo las familias del colegio pueden verla. Las fotos se publican en el sitio web
        únicamente con autorización de los padres.
      </p>
    </div>
  );
}
