import { PageHeader } from "@/components/ui/page-header";
import { Timetable } from "@/features/horario/timetable";
import { school, timetable } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Mi horario" };

export default function StudentSchedule() {
  requireModule("horario");
  return (
    <div>
      <PageHeader title="Mi horario" subtitle={`${timetable?.section} · ${school.currentPeriod}`} />
      <Timetable />
    </div>
  );
}
