"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Animated 404 Number */}
        <div className="mb-8 relative">
          <div className="text-[12rem] md:text-[16rem] font-bold text-gray-100 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-primaryGreen to-green-600 bg-clip-text text-transparent text-6xl md:text-8xl font-bold animate-pulse">
              404
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primaryGreen rounded-full animate-bounce opacity-60"></div>
          <div
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-40"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-green-300 rounded-full animate-bounce opacity-50"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Main Content Card */}
        <Card className="shadow border-0 bg-white/80 backdrop-blur-sm mb-4">
          <CardContent className="p-8 md:p-8">
            {/* Lost Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primaryGreen to-green-600 rounded-full shadow-lg mb-4">
                <MapPin className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Looks like you&lsquo;ve ventured into uncharted territory. The
              page you&lsquo;re looking for seems to have wandered off into the
              digital wilderness.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button className="bg-gradient-to-r from-primaryGreen to-green-600 hover:from-green-600 hover:to-primaryGreen text-white px-8 py-3 h-auto text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              </Link>

              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-gray-300 hover:border-primaryGreen hover:bg-green-50 px-8 py-3 h-auto text-base font-semibold transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>

              <Button
                onClick={handleRefresh}
                variant="ghost"
                className="text-gray-600 hover:text-primaryGreen hover:bg-green-50 px-8 py-3 h-auto text-base font-semibold transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            If you believe this is an error, please{" "}
            <Link
              href="/contact"
              className="text-primaryGreen hover:text-green-600 underline font-medium"
            >
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
