import React from "react";
import { DotPattern } from "../atoms/DotPattern";
import { cn } from "@/lib/utils";
import HeroSection from "../molecules/HeroSection";
import CustomWrapper from "../atoms/CustomWrapper";
import AboutSection from "../molecules/AboutSection";
import FeatureBenefitSection from "../molecules/FeatureBenefitSection";
import ClassProgram from "../molecules/ClassProgram";
import HomeOne from "../molecules/Home/HomeOne";

export default function HomeSection() {
  return (
    <div className="overflow-x-hidden remove-scrollbar size-full">
      <HomeOne />
      {/* <HeroSection /> */}
      <AboutSection />
      <FeatureBenefitSection />
      <ClassProgram />
    </div>
  );
}
