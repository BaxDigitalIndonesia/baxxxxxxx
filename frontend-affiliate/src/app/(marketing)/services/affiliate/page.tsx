"use client";
import CustomContainer from "@/components/atoms/CustomContainer";
import AffiliateOne from "@/components/molecules/Affiliate/AffiliateOne";
import HeroAffiliate from "@/components/molecules/Affiliate/HeroAffiliate";
import React from "react";

export default function PersonalPage() {
  return (
    <CustomContainer delay={0.4}>
      <div className="flex flex-col items-center justify-center w-full mb-6">
        <div className=" flex flex-col items-start justify-center w-11/12 mb-12">
          <AffiliateOne />
          <HeroAffiliate />
        </div>
      </div>
    </CustomContainer>
  );
}
