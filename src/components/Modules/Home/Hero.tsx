import Image from "next/image";
import React from "react";
import { ArrowRightIcon, Gift, ShieldCheck, Smile } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="bg-secondaryBG   h-auto lg:h-[80vh] px-5">
        <div className="flex flex-col lg:flex-row items-center justify-center custom-container gap-5">
          {/* Left Column */}
          <div className="w-full lg:w-2/5  py-5">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-center md:text-left  font-semibold font-[--font-playfair]">
              More Plants, More Colors
            </h2>

            <div className="space-y-4">
              <div className="flex gap-2 sm:gap-4 mt-5 text-xs sm:text-sm lg:text-base">
                <Link href={"/new-arrivals"} className="flex-1 sm:flex-none">
                  <button className="w-full sm:w-auto border-2 border-primaryGreen bg-primaryGreen text-white py-2 sm:py-3 px-2 sm:px-6 lg:px-8 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap flex items-center justify-center space-x-1 sm:space-x-2 cursor-pointer">
                    <span className="sm:hidden">New Items</span>
                    <span className="hidden sm:inline">New Collections</span>
                    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </Link>

                <Link href={"/planters"} className="flex-1 sm:flex-none">
                  <button className="w-full sm:w-auto border-2 border-primaryGreen text-primaryGreen py-2 sm:py-3 px-2 sm:px-6 lg:px-8 rounded-lg font-medium hover:bg-green-50 flex items-center justify-center space-x-1 sm:space-x-2 transition-colors whitespace-nowrap cursor-pointer">
                    <span className="sm:hidden">Planters</span>
                    <span className="hidden sm:inline">Shop Planters</span>
                    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-3/5">
            <div className="relative w-full h-80 lg:h-[80vh]">
              <Image
                src="/Improved-Meyer-Lemon-Hero-Isabella.png"
                alt="Meyer-Lemon-Hero-Isabella"
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <ServiceSection />
    </>
  );
};

export default Hero;

const ServiceSection = () => {
  const services = [
    {
      id: 1,
      name: "Expert Guidance",
      details:
        "Success starts with choosing the right plants. We'll make sure you do.",
      icon: <Gift />,
    },
    {
      id: 2,
      name: "Connect & Grow",
      details:
        "Community is everything. Our workshops and events help you learn and connect.",
      icon: <Smile strokeWidth={1.75} />,
    },
    {
      id: 3,
      name: "Judgement-Free Service",
      details:
        "Our dedicated team is always available to assist — no question too small or too silly!",
      icon: <ShieldCheck strokeWidth={1.75} />,
    },
  ];

  return (
    <div className="bg-secondaryBG px-5">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 custom-container py-10 ">
        {services.map((item) => (
          <div key={item.id} className="flex items-start gap-2">
            <div>{item.icon}</div>

            <div className="">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
