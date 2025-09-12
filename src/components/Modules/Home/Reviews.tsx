"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { IReview } from "@/lib/types";

interface PlantReviewCarouselProps {
  className?: string;
  reviews: IReview[];
}

const PlantReviewCarousel: React.FC<PlantReviewCarouselProps> = ({
  className,
  reviews,
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className={cn("w-full  py-16", className)}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className=" mb-6 ">
          <h1 className="">Reviews From Our Plant Lovers</h1>
        </div>

        {/* Carousel */}
        <div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 my-4">
              {reviews.slice(0, 10).map((review) => (
                <CarouselItem
                  key={review._id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <Card className="h-full shadow hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-200 group">
                      <CardContent className="p-4 text-center h-full flex flex-col">
                        {}
                        {/* Avatar */}
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <Image
                              src={review.userId?.image}
                              alt={review.userId?.name}
                              width={80}
                              height={80}
                              className="w-20 h-20 rounded-full object-cover border-4 border-green-100 group-hover:border-green-200 transition-colors duration-300"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="space-y-3 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                            {review.userId?.name}
                          </h3>

                          {/* Stars */}
                          <div className="flex justify-center space-x-1">
                            {renderStars(review.rating)}
                          </div>

                          {/* Review Text */}
                          <p className="text-sm text-gray-600 leading-relaxed flex-1">
                            &quot;{review.comment}&quot;
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 bg-white/90 hover:bg-white border-green-200 hover:border-green-300 text-green-600 hover:text-green-700" />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16 bg-white/90 hover:bg-white border-green-200 hover:border-green-300 text-green-600 hover:text-green-700" />
          </Carousel>
        </div>

        {/* Mobile Navigation Hint */}
        <div className="text-center mt-6 md:hidden">
          <p className="text-sm text-gray-500">
            Swipe left or right to see more reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantReviewCarousel;
