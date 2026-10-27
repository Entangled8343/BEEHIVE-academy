import type { BadgeDef } from "@/mocks";
import { schoolConfig } from "@/schools";
import { BadgeHex } from "./badge-hex";
import { CircleBadge } from "./circle-badge";
import { ElementBadge } from "./element-badge";

type Props = {
  badge: BadgeDef;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showStatus?: boolean;
};

/** Insignia con el estilo del colegio: hexágono (Beehive), elemento químico (Curie) o círculo (Mundo Montessori). */
export function BadgeTile(props: Props) {
  if (schoolConfig.brand.badgeStyle === "element") return <ElementBadge {...props} />;
  if (schoolConfig.brand.badgeStyle === "circle") return <CircleBadge {...props} />;
  return <BadgeHex {...props} />;
}
