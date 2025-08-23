import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
