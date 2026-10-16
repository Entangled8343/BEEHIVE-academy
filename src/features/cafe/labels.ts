import type { CafeRestriction } from "@/mocks/cafe";

/** Etiqueta corta de cada característica, como se ve en productos y en la caja. */
export const restrictionTag: Record<CafeRestriction, string> = {
  Lactosa: "Lactosa",
  "Altos en azúcar": "Alto en azúcar",
  Gaseosas: "Gaseosa",
  Frituras: "Frito",
  Cafeína: "Cafeína",
};

export const stockStatus = {
  ok: { tone: "green", label: "Disponible" },
  "por-agotarse": { tone: "orange", label: "Por agotarse" },
  agotado: { tone: "red", label: "Agotado" },
} as const;
