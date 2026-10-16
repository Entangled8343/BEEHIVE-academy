import { requireModule } from "@/schools/guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  requireModule("cafeteria");
  return children;
}
