"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { NavActions } from "../atoms/NavAction";
import Cookies from "js-cookie";

export default function NavbarDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken"))
  ?.split("=")[1];
  console.log("token-accessTokens",accessToken);

  useEffect(() => {
    //const accessToken = Cookies.get("accessToken");
    setIsAuthenticated(!!accessToken); // Set true jika accessToken ada
  }, []);

  return (
    <React.Fragment>
      <nav className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger className="bg-blueprimary hover:bg-bluesecondary" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-blueprimary">
                {isAuthenticated ? "Welcome Back👋" : "unauthenticated"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <nav className="ml-auto px-3">
        <NavActions />
      </nav>
    </React.Fragment>
  );
}
