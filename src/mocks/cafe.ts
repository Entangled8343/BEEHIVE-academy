/**
 * Datos de ejemplo de la plataforma de cafetería de Curie (producto aparte del portal escolar).
 * Todos los nombres, montos, números de factura y datos fiscales son ficticios.
 */
import type { CafeteriaCategory } from "./types";

export type CafeMode = "prepago" | "cuenta-del-dia";
export type CafeInvoiceStatus = "emitida" | "anulada";
export type CafePayment = "Saldo prepago" | "Cuenta del día" | "Efectivo";

/** Lo que una familia puede pedir que su hijo no consuma; los productos llevan las mismas etiquetas. */
export type CafeRestriction = "Lactosa" | "Altos en azúcar" | "Gaseosas" | "Frituras" | "Cafeína";

export const restrictionLabels: Record<CafeRestriction, string> = {
  Lactosa: "Con lactosa (intolerancia)",
  "Altos en azúcar": "Altos en azúcar",
  Gaseosas: "Gaseosas",
  Frituras: "Frituras",
  Cafeína: "Con cafeína",
};

export type CafeInvoice = {
  number: string;
  date: string;
  time: string;
  customer: string;
  /** Alumno que consumió: solo para la app de la familia y la caja; no se imprime en la factura. */
  student?: string;
  cashier: string;
  payment: CafePayment;
  lines: { qty: number; item: string; price: number; exempt?: boolean }[];
  status: CafeInvoiceStatus;
};

export type CafeProduct = {
  name: string;
  price: number;
  category: CafeteriaCategory;
  tags: CafeRestriction[];
  tax: "IVA 15 %" | "Exento";
  unit: string;
  /** Inventario del día: inicial + entradas − facturado + ajustes. */
  opening: number;
  received: number;
  sold: number;
  adjusted: number;
  min: number;
};

const lunch: CafeInvoice["lines"] = [
  { qty: 1, item: "Almuerzo del día", price: 95 },
  { qty: 1, item: "Agua 600 ml", price: 20 },
];

const products: CafeProduct[] = [
  { name: "Almuerzo del día", price: 95, category: "Almuerzos", tags: [], tax: "IVA 15 %", unit: "porciones", opening: 120, received: 0, sold: 86, adjusted: 0, min: 15 },
  { name: "Gallo pinto con huevo", price: 60, category: "Almuerzos", tags: ["Frituras"], tax: "IVA 15 %", unit: "porciones", opening: 60, received: 0, sold: 41, adjusted: 0, min: 10 },
  { name: "Sándwich de pollo", price: 55, category: "Almuerzos", tags: [], tax: "IVA 15 %", unit: "unidades", opening: 40, received: 0, sold: 40, adjusted: 0, min: 8 },
  { name: "Refresco de cacao", price: 25, category: "Bebidas", tags: ["Lactosa", "Altos en azúcar"], tax: "IVA 15 %", unit: "vasos", opening: 80, received: 0, sold: 52, adjusted: 0, min: 15 },
  { name: "Agua 600 ml", price: 20, category: "Bebidas", tags: [], tax: "IVA 15 %", unit: "botellas", opening: 96, received: 48, sold: 63, adjusted: 0, min: 24 },
  { name: "Gaseosa", price: 30, category: "Bebidas", tags: ["Gaseosas", "Altos en azúcar"], tax: "IVA 15 %", unit: "latas", opening: 48, received: 0, sold: 19, adjusted: 0, min: 12 },
  { name: "Tajadas con queso", price: 35, category: "Snacks", tags: ["Lactosa", "Frituras"], tax: "IVA 15 %", unit: "porciones", opening: 40, received: 0, sold: 23, adjusted: 0, min: 8 },
  { name: "Galleta de chocolate", price: 15, category: "Snacks", tags: ["Altos en azúcar"], tax: "IVA 15 %", unit: "paquetes", opening: 50, received: 0, sold: 41, adjusted: 0, min: 10 },
  { name: "Fruta picada", price: 30, category: "Frutas", tags: [], tax: "IVA 15 %", unit: "vasos", opening: 30, received: 0, sold: 26, adjusted: 0, min: 6 },
  { name: "Banano", price: 10, category: "Frutas", tags: [], tax: "Exento", unit: "unidades", opening: 50, received: 0, sold: 18, adjusted: 0, min: 10 },
  { name: "Jugo de naranja", price: 30, category: "Bebidas", tags: [], tax: "IVA 15 %", unit: "vasos", opening: 40, received: 0, sold: 17, adjusted: 0, min: 10 },
  { name: "Yogur", price: 28, category: "Snacks", tags: ["Lactosa"], tax: "IVA 15 %", unit: "unidades", opening: 36, received: 0, sold: 22, adjusted: -2, min: 10 },
];

/** Existencia disponible y estado de un producto. */
export function stockOf(p: CafeProduct) {
  const available = p.opening + p.received - p.sold + p.adjusted;
  const status = available <= 0 ? "agotado" : available <= p.min ? "por-agotarse" : "ok";
  return { available: Math.max(0, available), status } as const;
}

export const cafe = {
  currency: "C$",
  ivaRate: 0.15,
  today: "Viernes 16 de octubre",
  issuer: {
    tradeName: "Cafetería Curie",
    legalName: "Razón social de la cafetería (ejemplo)",
    ruc: "J0000000000001",
    address: "Dirección del negocio (ejemplo)",
    phone: "Tel. 2200-0000",
    authorization: "Sistema de facturación computarizada · Autorización No. 0000-0000 (ejemplo)",
  },
  family: { name: "Andrea Solís", label: "Mamá de Valeria y Diego", family: "Familia Castillo Solís" },
  children: [
    {
      id: "valeria",
      name: "Valeria Castillo Solís",
      short: "Valeria",
      grade: "9° A",
      mode: "prepago" as CafeMode,
      balance: 305,
      dayAccount: 0,
      spentToday: 115,
      dailyLimit: 150,
      restrictions: ["Gaseosas", "Altos en azúcar"] as CafeRestriction[],
      blockedProducts: [] as string[],
      notify: "Cada compra",
    },
    {
      id: "diego",
      name: "Diego Castillo Solís",
      short: "Diego",
      grade: "5° B",
      mode: "cuenta-del-dia" as CafeMode,
      balance: 0,
      dayAccount: 95,
      spentToday: 95,
      dailyLimit: 100,
      restrictions: ["Lactosa", "Altos en azúcar"] as CafeRestriction[],
      blockedProducts: ["Gallo pinto con huevo"],
      notify: "Cada compra y resumen a las 3:00 p. m.",
    },
  ],
  todayItems: [
    { time: "12:10 p. m.", child: "Valeria", item: "Almuerzo del día y agua", amount: 115, category: "Almuerzos" as CafeteriaCategory, invoice: "A-001245" },
    { time: "12:05 p. m.", child: "Diego", item: "Sándwich de pollo y banano", amount: 65, category: "Almuerzos" as CafeteriaCategory, invoice: "A-001241", onAccount: true },
    { time: "9:45 a. m.", child: "Diego", item: "Fruta picada", amount: 30, category: "Frutas" as CafeteriaCategory, invoice: "A-001098", onAccount: true },
  ],
  invoices: [
    { number: "A-001245", date: "16/10/2026", time: "12:10 p. m.", customer: "Familia Castillo Solís", student: "Valeria Castillo · 9° A", cashier: "Martha G.", payment: "Saldo prepago", lines: lunch, status: "emitida" },
    { number: "A-001244", date: "16/10/2026", time: "12:09 p. m.", customer: "Consumidor final", cashier: "Martha G.", payment: "Efectivo", lines: [{ qty: 1, item: "Sándwich de pollo", price: 55 }, { qty: 1, item: "Banano", price: 10, exempt: true }], status: "emitida" },
    { number: "A-001243", date: "16/10/2026", time: "12:08 p. m.", customer: "Familia Rivas Torres", student: "Mateo Rivas · 6° B", cashier: "Martha G.", payment: "Cuenta del día", lines: [{ qty: 1, item: "Almuerzo del día", price: 95 }], status: "emitida" },
    { number: "A-001242", date: "16/10/2026", time: "12:07 p. m.", customer: "Familia Ortega Ruiz", student: "Camila Ortega · 3° C", cashier: "Martha G.", payment: "Saldo prepago", lines: [{ qty: 1, item: "Fruta picada", price: 30 }], status: "emitida" },
    { number: "A-001241", date: "16/10/2026", time: "12:05 p. m.", customer: "Familia Castillo Solís", student: "Diego Castillo · 5° B", cashier: "Martha G.", payment: "Cuenta del día", lines: [{ qty: 1, item: "Sándwich de pollo", price: 55 }, { qty: 1, item: "Banano", price: 10, exempt: true }], status: "emitida" },
    { number: "A-001187", date: "16/10/2026", time: "11:58 a. m.", customer: "Familia Pineda Lacayo", student: "Andrés Pineda · 10° A", cashier: "Martha G.", payment: "Saldo prepago", lines: [{ qty: 1, item: "Almuerzo del día", price: 95 }], status: "anulada" },
    { number: "A-001098", date: "16/10/2026", time: "9:45 a. m.", customer: "Familia Castillo Solís", student: "Diego Castillo · 5° B", cashier: "Martha G.", payment: "Cuenta del día", lines: [{ qty: 1, item: "Fruta picada", price: 30 }], status: "emitida" },
    { number: "A-001019", date: "15/10/2026", time: "12:14 p. m.", customer: "Familia Castillo Solís", student: "Valeria Castillo · 9° A", cashier: "Karen L.", payment: "Saldo prepago", lines: [{ qty: 1, item: "Sándwich de pollo", price: 55 }, { qty: 1, item: "Agua 600 ml", price: 20 }], status: "emitida" },
  ] satisfies CafeInvoice[],
  voided: {
    number: "A-001187",
    reason: "Se cobró dos veces el mismo almuerzo",
    by: "Lic. Rosa Méndez · Supervisora",
    at: "16/10/2026 · 12:32 p. m.",
    replacement: "Se conserva la venta A-001186 por el mismo almuerzo",
  },
  receipts: [
    { number: "R-000088", date: "15 oct", concept: "Recarga · Valeria", amount: 300, status: "por-confirmar" as const },
    { number: "R-000087", date: "14 oct", concept: "Pago de cuenta del día · Diego", amount: 80, status: "confirmada" as const },
    { number: "R-000083", date: "12 oct", concept: "Recarga · Valeria", amount: 500, status: "confirmada" as const },
  ],
  bank: { name: "Transferencia a la cuenta de la cafetería", detail: "Los datos bancarios se configuran en Ajustes" },
  lunchPrice: 95,
  menu: [
    { day: "Lunes 19", dish: "Pollo en salsa, arroz y ensalada", ordered: ["Diego"] },
    { day: "Martes 20", dish: "Carne desmenuzada, gallo pinto y maduro", ordered: ["Diego", "Valeria"] },
    { day: "Miércoles 21", dish: "Pasta con vegetales y pan", ordered: [] as string[] },
    { day: "Jueves 22", dish: "Pescado empanizado, puré y ensalada", ordered: [] as string[] },
    { day: "Viernes 23", dish: "Indio viejo con arroz", ordered: ["Valeria"] },
  ],
  products,
  pos: {
    station: "Caja 1 · Serie A",
    cashier: "Doña Martha Gutiérrez",
    sections: ["4° A", "4° B", "5° A", "5° B", "6° A", "7° A", "8° A", "9° A", "10° A", "11° A"],
    selectedSection: "9° A",
    classmates: [
      "Ana Lucía Bermúdez", "Carlos Espinoza", "Daniela Fonseca", "Fernando Gaitán",
      "Gabriela Herrera", "Isabella Jarquín", "José Martínez", "Lucía Morales",
      "Nicolás Pérez", "Renata Quiroz", "Sebastián Rocha", "Valeria Castillo Solís",
    ],
    student: {
      name: "Valeria Castillo Solís",
      short: "Valeria",
      grade: "9° A",
      balance: 420,
      spentToday: 0,
      dailyLimit: 150,
      restrictions: ["Gaseosas", "Altos en azúcar"] as CafeRestriction[],
    },
    ticket: lunch,
  },
  dashboard: {
    stats: [
      { label: "Ventas de hoy", value: "C$ 18,450.00", hint: "IVA incluido" },
      { label: "IVA del día", value: "C$ 2,406.52", hint: "15 % desglosado" },
      { label: "Facturas emitidas", value: "214", hint: "A-001032 a A-001245" },
      { label: "Anuladas", value: "1", hint: "A-001187 · con motivo" },
    ],
    week: [
      { d: "Lun", v: 17.2 },
      { d: "Mar", v: 18.9 },
      { d: "Mié", v: 16.4 },
      { d: "Jue", v: 17.98 },
      { d: "Vie", v: 18.45 },
    ],
    pending: [
      { label: "Recargas por confirmar", value: "3", tone: "orange" as const },
      { label: "Cuentas del día sin pagar", value: "12", tone: "red" as const },
      { label: "Productos por agotarse", value: "2", tone: "orange" as const },
      { label: "Pedidos de almuerzo para el lunes", value: "86", tone: "green" as const },
    ],
    checks: [
      { label: "Respaldo de hoy", detail: "Completado a las 2:00 a. m." },
      { label: "Numeración", detail: "Sin saltos en las series A y B" },
      { label: "Inventario", detail: "Cuadra con las facturas del día" },
    ],
  },
  closing: {
    day: "Jueves 15 de octubre",
    range: "A-000818 a A-001031",
    invoices: 214,
    voided: 2,
    rows: [
      { label: "Ventas gravadas (sin IVA)", value: 15530.43 },
      { label: "IVA 15 %", value: 2329.57 },
      { label: "Ventas exentas", value: 120 },
    ],
    total: 17980,
    payments: [
      { label: "Saldo prepago", value: 11240 },
      { label: "Cuenta del día", value: 4860 },
      { label: "Efectivo (docentes y visitas)", value: 1880 },
    ],
    cash: { expected: 1880, counted: 1880 },
    closedBy: "Lic. Rosa Méndez · 3:45 p. m.",
  },
  inventoryMoves: [
    { time: "12:32 p. m.", kind: "Anulación A-001187", detail: "+1 Almuerzo del día vuelve al inventario", tone: "green" as const },
    { time: "12:10 p. m.", kind: "Factura A-001245", detail: "−1 Almuerzo del día · −1 Agua 600 ml", tone: "gray" as const },
    { time: "12:09 p. m.", kind: "Factura A-001244", detail: "−1 Sándwich de pollo (el último) · −1 Banano", tone: "gray" as const },
    { time: "10:15 a. m.", kind: "Entrada", detail: "+48 Agua 600 ml · compra al proveedor · Karen López", tone: "green" as const },
    { time: "9:00 a. m.", kind: "Ajuste", detail: "−2 Yogur · vencidos · Lic. Rosa Méndez", tone: "orange" as const },
  ],
  security: {
    users: [
      { name: "Doña Martha Gutiérrez", role: "Cajera · Caja 1", can: "Vender y facturar", last: "Hoy 7:02 a. m." },
      { name: "Karen López", role: "Cajera · Caja 2", can: "Vender, facturar y recibir mercadería", last: "Hoy 7:05 a. m." },
      { name: "Lic. Rosa Méndez", role: "Supervisora", can: "Anular facturas, ajustar inventario y cerrar caja", last: "Hoy 12:30 p. m." },
      { name: "Administración", role: "Administrador", can: "Precios, usuarios y ajustes", last: "Ayer 4:10 p. m." },
      { name: "Contador externo", role: "Solo lectura", can: "Reportes y libro de ventas", last: "13 oct" },
    ],
    backups: [
      { date: "Hoy 2:00 a. m.", size: "48 MB" },
      { date: "Jueves 15 · 2:00 a. m.", size: "47 MB" },
      { date: "Miércoles 14 · 2:00 a. m.", size: "47 MB" },
      { date: "Martes 13 · 2:00 a. m.", size: "46 MB" },
    ],
    log: [
      { time: "12:32 p. m.", who: "Lic. Rosa Méndez", what: "Anuló la factura A-001187 · motivo: se cobró dos veces" },
      { time: "11:05 a. m.", who: "Administración", what: "Cambió el precio de «Refresco de cacao» de C$ 22 a C$ 25" },
      { time: "9:00 a. m.", who: "Lic. Rosa Méndez", what: "Ajustó el inventario: −2 Yogur, vencidos" },
      { time: "7:05 a. m.", who: "Karen López", what: "Inició sesión en la Caja 2" },
      { time: "2:00 a. m.", who: "Sistema", what: "Respaldo diario completado (48 MB)" },
    ],
    versions: [
      { version: "1.1", change: "Agrega el teléfono del cliente en la factura", status: "pendiente" as const, note: "Se activa después de registrar el aviso previo" },
      { version: "1.0", change: "Versión inicial del sistema de facturación", status: "autorizada" as const, note: "Versión aprobada · formato y series registrados" },
    ],
  },
};

/** Desglose de una factura con precios que ya incluyen IVA. */
export function invoiceTotals(lines: CafeInvoice["lines"], rate = cafe.ivaRate) {
  const exempt = lines.filter((l) => l.exempt).reduce((s, l) => s + l.qty * l.price, 0);
  const taxedGross = lines.filter((l) => !l.exempt).reduce((s, l) => s + l.qty * l.price, 0);
  const base = Math.round((taxedGross / (1 + rate)) * 100) / 100;
  const iva = Math.round((taxedGross - base) * 100) / 100;
  return { base, iva, exempt, total: taxedGross + exempt };
}
