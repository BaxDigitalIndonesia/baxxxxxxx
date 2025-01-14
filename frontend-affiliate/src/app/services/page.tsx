"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import PageTitle from "@/components/pagetitle";
import { ServicesCard } from "@/components/servicescard";
import SearchBarWithButton from "@/components/searchbar";

interface Service {
  title: string;
  description: string;
  notifications: { title: string; description: string }[];
}

const servicesData: Service[] = [
  {
    title: "Security Protection",
    description: "Advanced security measures for your digital assets",
    notifications: [
      { title: "Security update applied", description: "30 minutes ago" },
      { title: "Potential threat detected", description: "2 hours ago" },
    ],
  },
  {
    title: "Payment Services",
    description: "Seamless and secure payment solutions",
    notifications: [
      { title: "Transaction processed", description: "1 hour ago" },
      { title: "Upcoming bill reminder", description: "3 hours ago" },
    ],
  },
  {
    title: "Global Connectivity",
    description: "Connecting you across borders and networks",
    notifications: [
      { title: "New network endpoint added", description: "45 minutes ago" },
      { title: "International connection", description: "4 hours ago" },
    ],
  },
  {
    title: "Digital Workspace",
    description: "Optimized tools for remote and hybrid work",
    notifications: [
      { title: "Software update available", description: "1 hour ago" },
      { title: "Workspace configuration", description: "2 hours ago" },
    ],
  },
];

export default function Services() {
  const [filteredServices, setFilteredServices] =
    useState<Service[]>(servicesData);
  const router = useRouter(); // Initialize router

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = servicesData.filter(
      (service) =>
        service.title.toLowerCase().includes(lowerCaseQuery) ||
        service.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredServices(results);
  };

  const handleSelectService = (service: Service) => {
    router.push(`/payment?service=${encodeURIComponent(service.title)}`);
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5 [background:radial-gradient(125%_75%_at_50%_10%,#000_40%,#1b4974_120%)]">
      <div className="mt-2 mb-2 flex justify-between">
        <PageTitle title="Services Products" />
        <section className="mb-2 flex justify-end">
          <SearchBarWithButton onSearch={handleSearch} />
        </section>
      </div>
      {/* <ServicesCard
        services={filteredServices.map((service) => ({
          ...service,
          onSelect: () => handleSelectService(service), // Pass click handler
        }))}
      /> */}
    </div>
  );
}
