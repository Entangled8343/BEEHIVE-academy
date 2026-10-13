import { PageHeader } from "@/components/ui/page-header";
import { GradesView } from "@/features/notas/grades-view";
import { school } from "@/mocks";

export const metadata = { title: "Mis calificaciones" };

export default function StudentGrades() {
  return (
    <div>
      <PageHeader title="Mis calificaciones" subtitle={`Año escolar ${school.year} · Escala MINED`} />
      <GradesView />
    </div>
  );
}
