import { SiteFooter, SiteHeader, WhatsAppFab } from "@/features/sitio/beehive-chrome";
import { MontessoriFooter, MontessoriHeader } from "@/features/sitio/montessori-chrome";
import { PortalFooter, PortalHeader } from "@/features/sitio/portal-chrome";
import { hasModule, schoolConfig } from "@/schools";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const site = hasModule("sitioPublico");
  const montessori = schoolConfig.id === "montessori";
  return (
    <div className="min-h-dvh bg-surface">
      {!site ? <PortalHeader /> : montessori ? <MontessoriHeader /> : <SiteHeader />}
      {children}
      {site ? (
        <>
          {montessori ? <MontessoriFooter /> : <SiteFooter />}
          <WhatsAppFab />
        </>
      ) : (
        <PortalFooter />
      )}
    </div>
  );
}
