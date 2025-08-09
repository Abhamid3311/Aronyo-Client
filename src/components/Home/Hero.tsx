import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="bg-primaryBG  h-auto lg:min-h-screen">
      <div className="flex flex-col lg:flex-row items-center justify-center custom-container gap-5">
        {/* Left Column */}
        <div className="w-full lg:w-2/5  p-5">
          <h2 className="text-4xl lg:text-7xl font-semibold font-[--font-playfair]">
            More Plants, More Colors
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-3 mt-3">
            <Button className="bg-primaryGreen hover:bg-green-500 px-5 py-6 rounded-md text-lg font-bold font-[--font-playfair]">
              Shop New Collections{" "}
              <span className="ml-1 inline-block text-xl">→</span>
            </Button>

            <Button className="bg-primaryBG text-primaryGreen hover:bg-white px-5 py-6 rounded-md text-lg font-bold font-[--font-playfair]">
              Shop Mayer Lemon{" "}
              <span className="ml-1 inline-block text-xl">→</span>
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-3/5">
          <div className="relative w-full h-screen">
            <Image
              src="/Improved-Meyer-Lemon-Hero-Isabella.png"
              alt="Meyer-Lemon-Hero-Isabella"
              fill
              className="object-cover w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
