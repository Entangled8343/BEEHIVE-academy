import { HomeworkSubmit } from "@/features/tareas/homework-submit";
import { homework } from "@/mocks";

export function generateStaticParams() {
  return homework.map((h) => ({ id: h.id }));
}

export default async function StudentHomeworkDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HomeworkSubmit id={id} back="/alumno/tareas" student />;
}
