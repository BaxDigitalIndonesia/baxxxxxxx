"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import EachUtils from "@/utils/EachUtils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavMenu } from "@/constant";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useLoadingContext } from "@/hooks/LoadingContext";
import LoadingAnimate from "./LoadingAnimate";

export function NavActionComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const [userData, setUserData] = useState<any>(null);
  const pathName = usePathname();
  const { setIsLoading } = useLoadingContext();
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken"))
  ?.split("=")[1];
  console.log("token-nav",token);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (pathName === url) {
      e.preventDefault();
      return;
    }
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [pathName]);

  useEffect(() => {
    //const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // console.log(decoded);
        setUserData({
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  // Canvas Sidebar
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");

    Cookies.remove("accessToken");
    Cookies.remove("accessTokenFrontend");
    Cookies.remove("referralCode");

    router.push("/auth/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex flex-col gap-0.5 leading-none text-blueprimary">
                <span className="font-semibold">
                  {userData?.name || "Guest"}
                </span>
                <span className="">{userData?.role || "Unknown"}</span>
              </div>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@userBax"
                  />
                  <AvatarFallback>
                    {userData?.name?.charAt(0) || "BAX"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-56 overflow-hidden rounded-lg p-0"
            align="end"
          >
            <Sidebar collapsible="none">
              <SidebarContent>
                <EachUtils
                  of={NavMenu}
                  render={(group, index) => (
                    <SidebarGroup
                      key={index}
                      className="border-b last:border-none"
                    >
                      <SidebarGroupContent className="gap-0">
                        <SidebarMenu>
                          <EachUtils
                            of={group}
                            render={(item, index) => (
                              <SidebarMenuItem key={index}>
                                <SidebarMenuButton
                                  onClick={() => {
                                    if (item.label === "Logout") {
                                      handleLogout();
                                    }
                                  }}
                                >
                                  <item.icon />
                                  <Link
                                    href={item.url}
                                    onClick={(e) => handleClick(e, item.url)}
                                  >
                                    {item.label}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )}
                          />
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  )}
                />
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function NavActions() {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <NavActionComponent />
    </Suspense>
  );
}
