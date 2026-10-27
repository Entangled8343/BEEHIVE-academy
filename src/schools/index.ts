import { beehive } from "./beehive";
import { curie } from "./curie";
import { montessori } from "./montessori";
import type { ModuleKey, SchoolConfig, SchoolId } from "./types";

export type { ModuleKey, SchoolConfig, SchoolId } from "./types";

const schools: Record<SchoolId, SchoolConfig> = { beehive, curie, montessori };

/**
 * Cada colegio es una instalación independiente del mismo producto.
 * NEXT_PUBLIC_SCHOOL se fija por proyecto de Vercel (se resuelve en build).
 */
export const schoolConfig: SchoolConfig =
  schools[(process.env.NEXT_PUBLIC_SCHOOL as SchoolId | undefined) ?? "beehive"] ?? beehive;

export function hasModule(key: ModuleKey) {
  return schoolConfig.modules[key];
}
