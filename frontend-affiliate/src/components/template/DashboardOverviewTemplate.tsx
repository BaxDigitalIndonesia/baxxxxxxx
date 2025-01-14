import React, { Suspense } from "react";
import OverviewOrganismSection from "../organisms/OverviewOrganismSection";
import LoadingAnimate from "../atoms/LoadingAnimate";

export default function DashboardOverviewTemplate() {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <OverviewOrganismSection />
    </Suspense>
  );
}
