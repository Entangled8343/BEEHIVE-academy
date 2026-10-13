import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ChildSwitcher } from "@/features/familia/child-switcher";
import { GradesView } from "@/features/notas/grades-view";
import { focusChildId, school } from "@/mocks";

export const metadata = { title: "Calificaciones" };

export default function ParentGrades() {
  return (
    <div>
      <PageHeader
        title="Calificaciones"
        subtitle={`Año escolar ${school.year} · Escala MINED`}
        action={
          <Button variant="accent" size="sm" className="hidden sm:inline-flex">
            <Download /> Boleta PDF
          </Button>
        }
      />
      <ChildSwitcher active={focusChildId} basePath="/padres/calificaciones" />
      <GradesView />
    </div>
  );
}
