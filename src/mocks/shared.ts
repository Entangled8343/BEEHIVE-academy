/** Escala MINED (configurable por colegio en la Fase 1). */
export function band(score: number) {
  if (score >= 90) return { code: "AA", label: "Aprendizaje Avanzado", tone: "green" as const };
  if (score >= 76) return { code: "AS", label: "Aprendizaje Satisfactorio", tone: "blue" as const };
  if (score >= 60) return { code: "AF", label: "Aprendizaje Fundamental", tone: "orange" as const };
  return { code: "AI", label: "Aprendizaje Inicial", tone: "red" as const };
}
