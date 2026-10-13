import { notFound } from "next/navigation";
import { hasModule, type ModuleKey } from "./index";

/** Para páginas de módulos opcionales: 404 si el colegio no tiene el módulo activo. */
export function requireModule(key: ModuleKey) {
  if (!hasModule(key)) notFound();
}
