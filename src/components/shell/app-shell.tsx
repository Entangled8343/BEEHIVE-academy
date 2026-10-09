import type { Role } from "@/mocks";
import { BottomNav } from "./bottom-nav";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AppShell({ role, children }: { role: Role; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Sidebar role={role} />
      <div className="lg:pl-72">
        <TopBar role={role} />
        <main className="mx-auto max-w-6xl px-4 pt-5 pb-28 lg:px-8 lg:pt-8 lg:pb-12">{children}</main>
      </div>
      <BottomNav role={role} />
    </div>
  );
}
