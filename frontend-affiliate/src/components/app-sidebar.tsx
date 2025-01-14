"use client";

import * as React from "react";
import {
  Send,
  Globe,
  ChartColumn,
  ClipboardList,
  Wallet,
  Users,
  ClipboardPenLineIcon,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Overview",
      url: "./overview",
      icon: ChartColumn,
      isActive: true,
    },
    {
      title: "Services",
      url: "./services",
      icon: ClipboardList,
    },
    {
      title: "Billing",
      url: "./billing",
      icon: Wallet,
    },
    {
      title: "Teamlist",
      url: "./teamlist",
      icon: Users,
    },
    {
      title: "Report",
      url: "./report",
      icon: ClipboardPenLineIcon,
    },
  ],
  navSecondary: [
    {
      title: "Support Services",
      url: "https://baxdigitalindonesia.com",
      icon: Send,
    },
    {
      title: "Web Services",
      url: "https://baxdigitalindonesia.com",
      icon: Globe,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className="[background:radial-gradient(250%_50%_at_120%_5%,#000_30%,#1b4974_250%)]">
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton size="lg" asChild>
            <a className="flex items-center gap-2 self-center font-medium text-background">
              <div className="flex aspect-square size-9 items-center justify-center font-bold rounded-lg bg-chart-2 text-sidebar-primary-foreground">
                BAX
              </div>
              Digital Indonesia
            </a>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="text-slate-400 font-md">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        <NavUser user={data.user} />
      </SidebarContent>
    </Sidebar>
    </div>
  );
}
