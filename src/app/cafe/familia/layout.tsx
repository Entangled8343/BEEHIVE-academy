import { CafeShell } from "@/features/cafe/shell";
import { requireModule } from "@/schools/guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  requireModule("cafeteria");
  return <CafeShell variant="familia">{children}</CafeShell>;
}
