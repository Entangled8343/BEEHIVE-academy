import { BeehiveLanding } from "@/features/sitio/beehive-landing";
import { PortalHome } from "@/features/sitio/portal-home";
import { hasModule } from "@/schools";

export default function Home() {
  return hasModule("sitioPublico") ? <BeehiveLanding /> : <PortalHome />;
}
