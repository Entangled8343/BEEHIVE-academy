import { CalendarClock, FileSignature, Megaphone, NotebookPen, Smile, Wallet } from "lucide-react";
import { IconTile } from "@/components/ui/tiles";
import type { TodoItem } from "@/mocks";

const map = {
  permiso: { icon: FileSignature, cls: "bg-orange-100 text-orange-600" },
  comunicado: { icon: Megaphone, cls: "bg-rose-100 text-rose-600" },
  agenda: { icon: Smile, cls: "bg-accent-200 text-accent-700" },
  tarea: { icon: NotebookPen, cls: "bg-sky-100 text-sky-700" },
  pago: { icon: Wallet, cls: "bg-emerald-100 text-emerald-700" },
  examen: { icon: CalendarClock, cls: "bg-violet-100 text-violet-700" },
} as const;

export function TodoIcon({ icon }: { icon: TodoItem["icon"] }) {
  const { icon: Icon, cls } = map[icon];
  return (
    <IconTile className={cls}>
      <Icon />
    </IconTile>
  );
}
