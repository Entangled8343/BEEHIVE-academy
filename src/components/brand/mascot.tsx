import { schoolConfig } from "@/schools";
import { Bee } from "./bee";
import { Comet } from "./comet";

/** Elemento ilustrado de cada colegio: abejita (Beehive) o cometa (Curie). */
export function Mascot({ className, flip }: { className?: string; flip?: boolean }) {
  return schoolConfig.brand.mascot === "comet" ? (
    <Comet className={className} flip={flip} />
  ) : (
    <Bee className={className} flip={flip} />
  );
}
