import { schoolConfig } from "@/schools";
import { Bee } from "./bee";
import { Comet } from "./comet";
import { GlobeMascot } from "./globe";

/** Elemento ilustrado de cada colegio: abejita (Beehive), cometa (Curie) o mundito (Mundo Montessori). */
export function Mascot({ className, flip }: { className?: string; flip?: boolean }) {
  if (schoolConfig.brand.mascot === "comet") return <Comet className={className} flip={flip} />;
  if (schoolConfig.brand.mascot === "globe") return <GlobeMascot className={className} flip={flip} />;
  return <Bee className={className} flip={flip} />;
}
