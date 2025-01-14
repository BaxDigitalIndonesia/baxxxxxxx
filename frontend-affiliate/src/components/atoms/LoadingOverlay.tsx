"use client";

import React from "react";

export const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-[10] flex items-center justify-center bg-[#eaf7ff]/40 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-bluesecondary"></div>
    </div>
  );
};
