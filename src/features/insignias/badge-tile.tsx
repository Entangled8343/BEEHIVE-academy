import type { BadgeDef } from "@/mocks";
import { schoolConfig } from "@/schools";
import { BadgeHex } from "./badge-hex";
import { ElementBadge } from "./element-badge";

type Props = {
  badge: BadgeDef;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showStatus?: boolean;
};

/** Insignia con el estilo del colegio: hexágono (Beehive) o elemento químico (Curie). */
export function BadgeTile(props: Props) {
  return schoolConfig.brand.badgeStyle === "element" ? <ElementBadge {...props} /> : <BadgeHex {...props} />;
}
