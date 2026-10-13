import { Clock, FileText, Paperclip, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { conversation as c, threads } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Mensajes" };


export default function MessagesPage() {
  requireModule("mensajes");
  return (
    <div className="-mx-4 -mt-5 lg:mx-0 lg:mt-0">
      <div className="grid lg:grid-cols-[320px_1fr] lg:gap-5">
        <Card className="hidden overflow-hidden lg:block">
          <p className="px-5 pt-5 pb-3 font-display text-xl font-semibold">Mensajes</p>
          <div className="divide-y divide-primary-100">
            {threads.map((t, i) => (
              <div key={t.name} className={cn("flex gap-3 px-5 py-3.5", i === 0 && "bg-accent-50")}>
                <Avatar name={t.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <p className="truncate font-bold">{t.name}</p>
                    <span className="text-xs font-semibold text-primary-400">{t.time}</span>
                  </div>
                  <p className="text-xs font-bold text-primary-500">{t.about}</p>
                  <p className="truncate text-sm text-primary-600">{t.last}</p>
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

        <div className="flex min-h-[calc(100dvh-4rem-5.5rem)] flex-col bg-white lg:min-h-[640px] lg:rounded-3xl lg:shadow-soft lg:ring-1 lg:ring-primary-100/70">
          <div className="flex items-center gap-3 border-b border-primary-100 px-4 py-3">
            <Avatar name={c.with} />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{c.with}</p>
              <p className="flex items-center gap-1 text-xs font-semibold text-primary-500">
                <Clock className="size-3.5" /> {c.officeHours}
              </p>
            </div>
            <span className="rounded-full bg-accent-200 px-2.5 py-1 text-xs font-bold text-accent-700">{c.about}</span>
          </div>

          <div className="flex-1 space-y-3 bg-surface/60 px-4 py-4">
            <p className="text-center text-xs font-bold text-primary-400">Hoy</p>
            {c.messages.map((m, i) => {
              const mine = m.from === "padre";
              return (
                <div key={i} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-3xl px-4 py-2.5 text-[15px] leading-snug shadow-soft",
                      mine ? "rounded-br-lg bg-primary-800 text-white" : "rounded-bl-lg bg-white text-primary-900 ring-1 ring-primary-100",
                    )}
                  >
                    <p>{m.text}</p>
                    {m.attachment ? (
                      <div className="mt-2 flex items-center gap-2 rounded-2xl bg-primary-50 px-3 py-2 text-sm font-bold text-primary-800">
                        <FileText className="size-4 text-rose-500" /> {m.attachment}
                      </div>
                    ) : null}
                    <p className={cn("mt-1 text-right text-[11px] font-semibold", mine ? "text-primary-200" : "text-primary-400")}>
                      {m.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] flex items-center gap-2 border-t border-primary-100 bg-white px-3 py-3 lg:bottom-0 lg:rounded-b-3xl">
            <button className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700" aria-label="Adjuntar">
              <Paperclip className="size-5" />
            </button>
            <div className="h-11 flex-1 rounded-full bg-primary-50 px-4 py-3 text-[15px] text-primary-400">Escribe un mensaje…</div>
            <button className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-400 text-primary-900" aria-label="Enviar">
              <Send className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
