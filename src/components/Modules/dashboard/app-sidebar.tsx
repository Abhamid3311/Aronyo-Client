"use client";

import * as React from "react";
import Image from "next/image";
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
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  // build sidebar items based on role
  let navMain = [...roleMenus.common];

  if (user?.role === "user") {
    navMain = [...navMain, ...roleMenus.user];
  }

  if (user?.role === "staff") {
    navMain = [...navMain, ...roleMenus.staffAdmin, ...roleMenus.user];
  }

  if (user?.role === "admin") {
    navMain = [
      ...navMain,
      ...roleMenus.admin,
      ...roleMenus.staffAdmin,
      ...roleMenus.user,
    ];
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          {/* CSS handles collapsed logo */}
          <div className="sidebar-collapsed:hidden">
            <Link href={"/"}>
              <Image
                src="/Aronyo logo.png"
                alt="Aronyo"
                width={150}
                height={30}
                className="object-contain"
              />
            </Link>
          </div>
          <div className="hidden sidebar-collapsed:flex">
            <Image src="/fav.jpg" alt="Aronyo" width={32} height={32} />
          </div>
        </div>
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
