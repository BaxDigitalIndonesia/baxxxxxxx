"use client";
import * as React from "react";
import {
  GalleryVerticalEnd,
  LayoutDashboard,
  LayoutDashboardIcon,
  LucideLayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import EachUtils from "@/utils/EachUtils";
import { navMain } from "@/constant";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useLoadingContext } from "@/hooks/LoadingContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const { setIsLoading } = useLoadingContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (pathName === url) {
      e.preventDefault();
      return;
    }
    setIsLoading(true);
  };

  React.useEffect(() => {
    setIsLoading(false);
  }, [pathName]);
  return (
    <>
      <Sidebar
        variant="floating"
        {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild>
                <Link href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <LayoutDashboardIcon className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Member of Bax Digital</span>
                    <span className="">v1.0.0</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="gap-2">
              <EachUtils
                of={navMain}
                render={(item, index) => {
                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          onClick={(e) => handleClick(e, item.url)}
                          className="font-medium">
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                      {item.items?.length ? (
                        <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                          <EachUtils
                            of={item.items}
                            render={(item) => {
                              const isActiveMenu = pathName === item.url;
                              return (
                                <SidebarMenuSubItem key={item.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isActiveMenu}
                                    className={
                                      isActiveMenu
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-blue-100"
                                    }>
                                    <Link
                                      href={item.url}
                                      onClick={(e) => handleClick(e, item.url)}>
                                      {item.title}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            }}
                          />
                        </SidebarMenuSub>
                      ) : null}
                    </SidebarMenuItem>
                  );
                }}
              />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
