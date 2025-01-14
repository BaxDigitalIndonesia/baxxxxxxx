import React from "react";
import Navbar from "../molecules/Navbar";

export default function HeaderSection() {
  return (
    <header className="bg-background/40 border-border sticky inset-x-0 top-0 z-50 h-14 w-full border-b px-4 backdrop-blur-lg">
      <Navbar />
    </header>
  );
}
