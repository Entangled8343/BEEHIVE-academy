import { AppShell } from "@/components/shell/app-shell";
import { requireModule } from "@/schools/guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  requireModule("portalAlumno");
  return <AppShell role="alumno">{children}</AppShell>;
}
