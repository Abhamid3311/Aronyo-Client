"use client";

import * as React from "react";
import { NavMain } from "@/components/Modules/dashboard/nav-main";
import { NavUser } from "@/components/Modules/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/Context/AuthContext";
import { roleMenus } from "@/lib/staticData";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  // build sidebar items based on role
  let navMain = [...roleMenus.common];

  if (user?.role === "user") {
    navMain = [...navMain, ...roleMenus.user];
  }

  if (user?.role === "staff" || user?.role === "admin") {
    navMain = [...navMain, ...roleMenus.staffAdmin];
  }

  if (user?.role === "admin") {
    navMain = [...navMain, ...roleMenus.admin];
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      
      <SidebarHeader>
        <h1 className="font-bold text-lg">Aronyo</h1>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
