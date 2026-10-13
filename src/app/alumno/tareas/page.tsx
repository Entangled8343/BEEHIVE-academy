import { PageHeader } from "@/components/ui/page-header";
import { HomeworkList } from "@/features/tareas/homework-list";
import { focusChildId } from "@/mocks";

export const metadata = { title: "Mis tareas" };

export default function StudentHomework() {
  return (
    <div>
      <PageHeader title="Mis tareas" subtitle="Entrega desde tu celular o computadora" />
      <HomeworkList childId={focusChildId} basePath="/alumno/tareas" />
    </div>
  );
}
