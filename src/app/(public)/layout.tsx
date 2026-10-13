import { SiteFooter, SiteHeader, WhatsAppFab } from "@/features/sitio/beehive-chrome";
import { PortalFooter, PortalHeader } from "@/features/sitio/portal-chrome";
import { hasModule } from "@/schools";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const site = hasModule("sitioPublico");
  return (
    <div className="min-h-dvh bg-surface">
      {site ? <SiteHeader /> : <PortalHeader />}
      {children}
      {site ? (
        <>
          <SiteFooter />
          <WhatsAppFab />
        </>
      ) : (
        <PortalFooter />
      )}
    </div>
  );
}
