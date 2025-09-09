import { ICategory } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PlantCardProps {
  plant: ICategory;
}

const houseplantDomains = [
  "pet-friendly-plants",
  "easy-care-plants",
  "low-light-plants",
  "air-purifying-plants",
  "indoor-plants",
];

const outdoorDomains = [
  "outdoor-plants",
  "bonsai-miniatures",
  "succulents",
  "large-plants",
  "flowering-plants",
];

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const getCategoryLink = (slug: string) => {
    if (houseplantDomains.includes(slug)) {
      return `/house-plants/${slug}`;
    }
    if (outdoorDomains.includes(slug)) {
      return `/outdoor-patio/${slug}`;
    }
    return `/${slug}`;
  };

  const link = getCategoryLink(plant.slug!);

  return (
    <Link href={link} className="group block overflow-hidden rounded-xl ">
      <div className="relative w-full h-48 lg:h-[420px] overflow-hidden rounded-xl">
        <Image
          src={plant.image}
          alt={plant.name}
          fill
          className="object-cover transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="my-3 text-md lg:text-lg font-medium text-start group-hover:text-primaryGreen">
        {plant.name} <span className="ml-1 inline-block text-xl">→</span>
      </h3>
    </Link>
  );
};

export default PlantCard;
