"use client";

import LoadingAnimate from "@/components/atoms/LoadingAnimate";
import { LoadingOverlay } from "@/components/atoms/LoadingOverlay";
import HeaderDashboard from "@/components/organisms/HeaderDashboard";
import { AppSidebar } from "@/components/template/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useLoadingContext } from "@/hooks/LoadingContext";
import React from "react";

export default function MainDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useLoadingContext();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }>
      <AppSidebar />
      <SidebarInset>
        <HeaderDashboard />
        <div className="relative flex flex-1 flex-col gap-4 p-4 pt-0 bg-gradient-to-b from-[#eaf7ff] to-[#fafbfd]">
          <LoadingOverlay isLoading={isLoading} />
          {children}
          <Toaster position="top-right" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
