import { ChildSwitcher } from "@/features/familia/child-switcher";
import { HomeworkList } from "@/features/tareas/homework-list";
import { PageHeader } from "@/components/ui/page-header";
import { focusChildId } from "@/mocks";

export const metadata = { title: "Tareas" };

export default function ParentHomework() {
  return (
    <div>
      <PageHeader title="Tareas" subtitle="Lo que tienen pendiente tus hijos" />
      <ChildSwitcher active={focusChildId} basePath="/padres/tareas" />
      <HomeworkList childId={focusChildId} basePath="/padres/tareas" />
    </div>
  );
}
