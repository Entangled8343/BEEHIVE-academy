import { BeehiveLanding } from "@/features/sitio/beehive-landing";
import { MontessoriLanding } from "@/features/sitio/montessori-landing";
import { PortalHome } from "@/features/sitio/portal-home";
import { hasModule, schoolConfig } from "@/schools";

export default function Home() {
  if (!hasModule("sitioPublico")) return <PortalHome />;
  return schoolConfig.id === "montessori" ? <MontessoriLanding /> : <BeehiveLanding />;
}
