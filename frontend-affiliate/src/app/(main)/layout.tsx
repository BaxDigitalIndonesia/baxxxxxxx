"use client";

import { LoadingProvider } from "@/hooks/LoadingContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoadingProvider>{children}</LoadingProvider>;
}
