import { DashboardHeader } from "@/components/layout/DashboardHeader";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
