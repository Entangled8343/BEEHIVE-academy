import { Clock, FileText, Paperclip, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { conversation as c } from "@/mocks";

export const metadata = { title: "Mensajes" };

const threads = [
  { name: "Miss Karla Gutiérrez", about: "Mateo · 2° A", last: "Solo su maqueta y una cartulina…", time: "9:24", unread: 2, active: true },
  { name: "Miss Andrea Rivas", about: "Sofía · Preescolar II A", last: "¡Gracias por las toallitas! 💛", time: "Ayer", unread: 0, active: false },
  { name: "Teacher Daniel Obando", about: "Mateo · Inglés", last: "Great job on the vocabulary quiz!", time: "Lun", unread: 0, active: false },
];

export default function MessagesPage() {
  return (
    <div className="-mx-4 -mt-5 lg:mx-0 lg:mt-0">
      <div className="grid lg:grid-cols-[320px_1fr] lg:gap-5">
        <Card className="hidden overflow-hidden lg:block">
          <p className="px-5 pt-5 pb-3 font-display text-xl font-semibold">Mensajes</p>
          <div className="divide-y divide-navy-100">
            {threads.map((t) => (
              <div key={t.name} className={cn("flex gap-3 px-5 py-3.5", t.active && "bg-honey-50")}>
                <Avatar name={t.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <p className="truncate font-bold">{t.name}</p>
                    <span className="text-xs font-semibold text-navy-400">{t.time}</span>
                  </div>
                  <p className="text-xs font-bold text-navy-500">{t.about}</p>
                  <p className="truncate text-sm text-navy-600">{t.last}</p>
                </div>
                {t.unread ? (
                  <span className="mt-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                    {t.unread}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </Card>

        <div className="flex min-h-[calc(100dvh-4rem-5.5rem)] flex-col bg-white lg:min-h-[640px] lg:rounded-3xl lg:shadow-soft lg:ring-1 lg:ring-navy-100/70">
          <div className="flex items-center gap-3 border-b border-navy-100 px-4 py-3">
            <Avatar name={c.with} />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{c.with}</p>
              <p className="flex items-center gap-1 text-xs font-semibold text-navy-500">
                <Clock className="size-3.5" /> {c.officeHours}
              </p>
            </div>
            <span className="rounded-full bg-honey-200 px-2.5 py-1 text-xs font-bold text-honey-700">{c.about}</span>
          </div>

          <div className="flex-1 space-y-3 bg-cream/60 px-4 py-4">
            <p className="text-center text-xs font-bold text-navy-400">Hoy</p>
            {c.messages.map((m, i) => {
              const mine = m.from === "padre";
              return (
                <div key={i} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-3xl px-4 py-2.5 text-[15px] leading-snug shadow-soft",
                      mine ? "rounded-br-lg bg-navy-800 text-white" : "rounded-bl-lg bg-white text-navy-900 ring-1 ring-navy-100",
                    )}
                  >
                    <p>{m.text}</p>
                    {"attachment" in m && m.attachment ? (
                      <div className="mt-2 flex items-center gap-2 rounded-2xl bg-navy-50 px-3 py-2 text-sm font-bold text-navy-800">
                        <FileText className="size-4 text-rose-500" /> {m.attachment}
                      </div>
                    ) : null}
                    <p className={cn("mt-1 text-right text-[11px] font-semibold", mine ? "text-navy-200" : "text-navy-400")}>
                      {m.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] flex items-center gap-2 border-t border-navy-100 bg-white px-3 py-3 lg:bottom-0 lg:rounded-b-3xl">
            <button className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700" aria-label="Adjuntar">
              <Paperclip className="size-5" />
            </button>
            <div className="h-11 flex-1 rounded-full bg-navy-50 px-4 py-3 text-[15px] text-navy-400">Escribe un mensaje…</div>
            <button className="grid size-11 shrink-0 place-items-center rounded-full bg-honey-400 text-navy-900" aria-label="Enviar">
              <Send className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
