import { PageHeader } from "@/components/ui/page-header";
import { ChildSwitcher } from "@/features/familia/child-switcher";
import { Timetable } from "@/features/horario/timetable";
import { focusChildId, school, timetable } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Horario" };

export default function ParentSchedule() {
  requireModule("horario");
  return (
    <div>
      <PageHeader title="Horario de clases" subtitle={`${timetable?.section} · ${school.currentPeriod}`} />
      <ChildSwitcher active={focusChildId} basePath="/padres/horario" />
      <Timetable />
    </div>
  );
}
