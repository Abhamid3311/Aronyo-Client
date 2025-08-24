"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImages({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">No Image Available</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImageIndex]}
          alt={title}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                selectedImageIndex === index
                  ? "border-blue-500"
                  : "border-transparent hover:border-gray-300"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
