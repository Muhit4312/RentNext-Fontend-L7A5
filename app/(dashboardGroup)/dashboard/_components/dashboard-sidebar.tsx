"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Home,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { sideMenuItems } from "../_config/sidebarMenuItems";
import { NavbarProps } from "@/types/user";

const roleLabel = {
  TENANT: "Tenant",
  LANDLORD: "Landlord",
  ADMIN: "Admin",
};

export default function DashboardSidebar({
  user,
}: NavbarProps) {
  const pathname = usePathname();

  
  const userRole = user.data.user.role;

  const items = sideMenuItems[userRole];

  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)]">

      {/* Header */}
      <SidebarHeader className="border-b">
        <Link
          href="/"
          className="flex items-center gap-3 px-2 py-3"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#338263] text-white">
            <Home className="size-5" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              RentNest
            </h1>

            <p className="text-xs text-slate-500">
              {roleLabel[userRole]} Dashboard
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupLabel>
            {roleLabel[userRole]} Panel
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              {items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>

                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Icon className="size-4" />

                      <Link
                        href={item.href}
                        className="flex flex-1 items-center gap-2"
                      >
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                  </SidebarMenuItem>
                );
              })}

            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>

        {/* Account */}
        <SidebarGroup>

          <SidebarGroupLabel>
            Account
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="size-4" />

                  <Link
                    href="/dashboard/settings"
                    className="flex flex-1 items-center"
                  >
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t">
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout">
              <LogOut className="size-4" />

              <Link
                href="/logout"
                className="flex flex-1 items-center"
              >
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  );
}