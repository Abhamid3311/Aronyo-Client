import NewProducts from "@/components/Modules/Products/NewProducts";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import React from "react";

interface AllPlantsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const AllPlants = ({ searchParams }: AllPlantsPageProps) => {
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="All Plants & Greenery"
        para="Explore our wide range of plants, planters, and garden essentials to bring life and freshness to your space."
      />

      <NewProducts searchParams={searchParams} />
    </div>
  );
};

export default AllPlants;
