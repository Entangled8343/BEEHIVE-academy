import { AlertTriangle, Check, CheckCircle2, FileImage, Landmark, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { proofReview } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Revisar comprobantes" };

/** Contabilidad valida los comprobantes que suben las familias: aprueba (y emite el recibo) o rechaza con motivo. */
export default function ReviewProofs() {
  requireModule("estadoCuenta");
  const pr = proofReview;
  if (!pr) return null;
  const d = pr.detail;
  return (
    <div>
      <PageHeader back="/admin/cuentas" title="Revisar comprobantes" subtitle={`${pr.queue.length} por revisar · ${pr.reviewer}`} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_1fr_320px]">
        <Card className="divide-y divide-primary-100 overflow-hidden">
          {pr.queue.map((q, i) => (
            <div key={q.id} className={cn("flex items-start gap-3 px-4 py-3", i === 0 && "bg-accent-50")}>
              <Avatar name={q.family.replace("Familia ", "")} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{q.family}</p>
                <p className="truncate text-xs font-semibold text-primary-500">
                  {q.method} · {q.bank} · {q.uploaded}
                </p>
                {q.flag ? (
                  <Pill tone="orange" size="sm" className="mt-1">
                    <AlertTriangle /> {q.flag}
                  </Pill>
                ) : null}
              </div>
              <p className="font-display text-sm whitespace-nowrap">{q.amount}</p>
            </div>
          ))}
        </Card>

        <Card className="min-w-0 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-lg">Comprobante</p>
            <span className="flex items-center gap-1.5 text-xs font-bold text-primary-500">
              <FileImage className="size-4" /> {d.file}
            </span>
          </div>
          <div className="mt-4 flex justify-center rounded-3xl bg-primary-50 p-6">
            <div className="w-full max-w-[300px] rotate-[-1.5deg] rounded-2xl bg-white p-5 text-[13px] shadow-soft ring-1 ring-slate-200">
              <div className="flex items-center gap-2 border-b border-dashed border-slate-300 pb-3">
                <Landmark className="size-5 text-slate-500" />
                <div>
                  <p className="font-bold text-slate-800">Comprobante de {d.method.toLowerCase()}</p>
                  <p className="text-[11px] text-slate-500">Banco {d.bank} · imagen de ejemplo</p>
                </div>
              </div>
              <dl className="mt-3 space-y-1.5 text-slate-700">
                {[
                  ["Fecha", d.date],
                  ["Referencia", d.reference],
                  ["Cuenta destino", "Cuenta del colegio"],
                  ["Concepto", d.concepts[0]?.concept ?? ""],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex justify-between border-t border-dashed border-slate-300 pt-3 text-[15px] font-bold text-slate-900">
                <span>Monto</span>
                <span>{d.amount}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {d.checks.map((c) => (
              <p key={c.label} className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="size-4 shrink-0" /> {c.label}
              </p>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <Avatar name={d.parent} size="md" />
              <div className="min-w-0">
                <p className="font-bold">{d.family}</p>
                <p className="text-sm text-primary-600">Enviado por {d.parent}</p>
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold text-primary-500">{d.students}</p>
            <p className="mt-4 text-sm font-bold text-primary-600">Se aplica a</p>
            {d.concepts.map((c) => (
              <div key={c.concept} className="mt-1 flex justify-between gap-2 text-sm font-semibold">
                <span>{c.concept}</span>
                <span className="whitespace-nowrap">{c.amount}</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-primary-100 pt-3 font-display text-lg">
              <span>Monto</span>
              <span>{d.amount}</span>
            </div>
            <Button block variant="success" className="mt-4">
              <Check /> Aprobar y enviar recibo
            </Button>
          </Card>
          <Card className="space-y-3 p-5">
            <p className="font-bold">¿No coincide?</p>
            <Field label="Motivo">
              <Select defaultValue="monto">
                <option value="monto">El monto no coincide</option>
                <option value="referencia">No se ve la referencia</option>
                <option value="repetido">Comprobante repetido</option>
                <option value="otro">Otro</option>
              </Select>
            </Field>
            <Field label="Mensaje para la familia">
              <Textarea placeholder="Ej.: el monto no completa la mensualidad de octubre." />
            </Field>
            <Button block variant="outline">
              <X /> Rechazar y avisar a la familia
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
