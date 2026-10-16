import { CheckCircle2, FileImage, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { account } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Subir comprobante" };

const parseAmount = (s: string) => Number(s.replace(/,/g, ""));
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** La familia sube el comprobante de su transferencia o depósito; contabilidad lo valida después. Sin pasarela de pago. */
export default function UploadProof() {
  requireModule("estadoCuenta");
  const acc = account;
  if (!acc?.proofDraft) return null;
  const draft = acc.proofDraft;
  const due = acc.rows.filter((r) => r.status === "pendiente" || r.status === "vencido");
  const total = due.reduce((s, r) => s + parseAmount(r.amount), 0);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader back="/padres/estado-cuenta" title="Subir comprobante" subtitle="Transferencia o depósito a la cuenta del colegio" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-5">
          <Card className="p-5">
            <p className="font-display text-lg">1. ¿Qué está pagando?</p>
            <div className="mt-3 space-y-2">
              {due.map((r) => (
                <div key={r.concept} className="flex items-center gap-3 rounded-2xl bg-accent-50 p-3 ring-2 ring-accent-400">
                  <CheckCircle2 className="size-5 shrink-0 text-primary-800" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold leading-snug">{r.concept}</p>
                    <p className="text-xs font-semibold text-primary-500">Vence {r.due}</p>
                  </div>
                  <p className="font-display text-base whitespace-nowrap">
                    {acc.currency} {r.amount}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-primary-100 pt-3">
              <span className="font-bold text-primary-600">Total a pagar</span>
              <span className="font-display text-2xl">
                {acc.currency} {fmt(total)}
              </span>
            </div>
          </Card>

          <Card className="space-y-4 p-5">
            <p className="font-display text-lg">2. Datos del pago</p>
            <div className="grid grid-cols-2 gap-1 rounded-full bg-primary-50 p-1 text-sm font-bold">
              {(["Transferencia", "Depósito"] as const).map((m) => (
                <span key={m} className={cn("rounded-full py-2 text-center", m === draft.method ? "bg-primary-800 text-white" : "text-primary-600")}>
                  {m}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Banco">
                <Input defaultValue={draft.bank} />
              </Field>
              <Field label="Fecha del pago">
                <Input defaultValue={draft.date} />
              </Field>
              <Field label="Número de referencia" hint="Aparece en el comprobante del banco">
                <Input defaultValue={draft.reference} />
              </Field>
              <Field label="Monto pagado">
                <Input defaultValue={`${acc.currency} ${fmt(total)}`} />
              </Field>
            </div>
          </Card>

          <Card className="p-5">
            <p className="font-display text-lg">3. Foto o PDF del comprobante</p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-dashed border-primary-200 p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileImage className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{draft.file}</p>
                <p className="text-xs font-semibold text-primary-500">Foto tomada con el celular · lista para enviar</p>
              </div>
              <CheckCircle2 className="size-6 text-emerald-600" />
            </div>
          </Card>

          <Button block size="lg" variant="accent">
            <Send /> Enviar a contabilidad
          </Button>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <p className="font-display text-lg">¿Qué pasa después?</p>
            <ol className="mt-3 space-y-3 text-sm">
              {[
                ["El pago queda «En revisión»", "Lo ve en su estado de cuenta desde ese momento."],
                ["Contabilidad lo valida", "Revisa el monto y la referencia con el banco, normalmente en un día hábil."],
                ["Le llega el recibo", "Si se aprueba, el saldo se actualiza y el recibo llega a su correo y a la app."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-800 text-xs font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block font-bold">{t}</span>
                    <span className="text-primary-600">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <p className="flex items-start gap-2 px-1 text-xs font-semibold text-primary-500">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" /> Si algo no coincide, contabilidad le avisa el motivo y puede enviar otro comprobante.
          </p>
        </div>
      </div>
    </div>
  );
}
