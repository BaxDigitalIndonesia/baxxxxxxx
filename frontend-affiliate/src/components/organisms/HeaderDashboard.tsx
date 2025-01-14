"use client";

import React, { useState, useEffect } from "react";
import NavbarDashboard from "../molecules/NavbarDashboard";

export default function HeaderDashboard() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex h-16 shrink-0 items-center gap-2 sticky inset-x-0 top-0 z-50 w-full px-4  ${
        isSticky
          ? "bg-[#eaf7ff]/40 backdrop-blur-lg border-b shadow-md transition duration-300"
          : "bg-[#eaf7ff] backdrop-blur-0 transition duration-300"
      }`}>
      <NavbarDashboard />
    </header>
  );
}
