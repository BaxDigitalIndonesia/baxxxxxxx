import React from "react";
import CustomWrapper from "../atoms/CustomWrapper";
import CustomContainer from "../atoms/CustomContainer";
import { FeatureSection } from "../atoms/FeatureSection";

export default function FeatureBenefitSection() {
  return (
    <CustomWrapper className="pt-10">
      <CustomContainer
        className="flex h-full flex-col items-center justify-center py-10"
        delay={0.1}>
        <h1>Benefit Section</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam libero
          modi, eius odio maxime enim?
        </p>
      </CustomContainer>

      <CustomContainer>
        <FeatureSection />
      </CustomContainer>
    </CustomWrapper>
  );
}
