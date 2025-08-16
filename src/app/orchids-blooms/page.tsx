import ProductCard from "@/components/Cards/ProductCard";
import Headlines from "@/components/Shared/Headlines";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import { IProduct } from "@/lib/types";
import Image from "next/image";
import React from "react";

const Orchids = () => {
  return (
    <div>
      <div className="min-h-screen bg-primaryBG">
        <div className="flex flex-col lg:flex-row items-center justify-center custom-container gap-5">
          <div className="w-full lg:w-3/5">
            <div className="relative w-full h-80 lg:h-[80vh]">
              <Image
                src="/orchid-banner.png"
                alt="orchid-banner"
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="w-full lg:w-2/5  p-5">
            <h2 className="text-3xl lg:text-5xl font-semibold mb-3 text-textClr">
              All About Orchids
            </h2>

            <div className="text-sm lg:text-base">
              <p>
                The Phalaenopsis orchid is one of the easiest varieties to grow
                as a houseplant.
              </p>{" "}
              <br />
              <p>
                These hearty orchids are highly adaptable to indoor conditions
                and do great in average room temperatures and humidity levels.
                Often called “moth orchids,” this is a forgiving, pet-friendly
                variety that&apos;s great for beginners and the more experienced
                orchid keeper alike.
              </p>
              <br />
              <p>
                <b>SUSTAINABLE:</b> All of our orchids are sustainably grown in
                the United States at a family-owned nursery that has earned an
                MPS-A certification — the highest possible grade — for
                environmental stewardship and quality.
              </p>
              <p className="my-2">
                <b>HAND-PICKED:</b> Every single orchid we ship is hand-selected
                from the greenhouse floor at the exact stage of growth in order
                to ensure it arrives vibrant, healthy and ready to put on a
                show. Our orchids should bloom for about six weeks... but
                that&apos;s not the end!
              </p>
              <p>
                <b>RE-BLOOMING: </b>Phalaenopsis orchids bloom for 4 to 6 weeks
                at a time. But the plant isn’t “dead” once the flowers fade!
                Once the blooms are done, the plant goes dormant while it builds
                strength and prepares for its next bloom cycle.
              </p>
            </div>

            <Button className="bg-primaryGreen hover:bg-green-800 px-3 py-6 mt-3 rounded-md text-lg font-bold font-[--font-playfair]">
              Orchid Care
              <span className="ml-1 inline-block text-xl">→</span>
            </Button>
          </div>
        </div>
      </div>

      <OrchidProducts />
    </div>
  );
};

export default Orchids;

const OrchidProducts = async () => {
  const [orchids] = await Promise.all([getProducts("orchids")]);

  return (
    <div className="custom-container px-5">
      <div className="py-10">
        <h1 className="px-5 text-textClr">Hand Selected Orchids</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5">
          {orchids.data.map((item: IProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
