"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  HeartIcon,
  User,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full">
      {/* Top Layer (Green with Sliding Text) */}
      <div className="bg-primaryBlue text-white text-sm py-2 overflow-hidden">
        <div className="custom-container flex justify-between items-center">
          <div className="animate-slide whitespace-nowrap">
            Free Shipping Over $79 + 30-Day Guarantee
          </div>
        </div>
      </div>

      {/* Middle Layer */}
      <div className="bg-white py-4 ">
        <div className="custom-container flex items-center justify-between gap-2">
          {/* Logo on Left */}
          <Link href="/" className="text-xl font-bold text-primary">
            <Image
              src={"/Aronyo logo.png"}
              alt="Aronyo logo"
              width={130}
              height={40}
            />
          </Link>

          {/* Search Bar */}
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search for plants ..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 lg:gap-4 ">
            <Button
              variant="ghost"
              size="icon"
              className="text-green-800 hover:text-green-600"
            >
              <HeartIcon className="h-10 w-10" />
              <span className="sr-only">Wishlist</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-green-800 hover:text-green-600 "
            >
              <User className="h-10 w-10" />
              <span className="sr-only">Wishlist</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-green-800 hover:text-green-600 relative"
            >
              <ShoppingCartIcon className="h-8 w-8" />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Layer (Menu) */}
      <div className="bg-white py-2 border-t ">
        <div className="custom-container flex items-center justify-start lg:justify-center">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 flex-1 ">
            {[
               { name: "Home", submenu: [] },
              {
                name: "New Arrivals",
                submenu: [
                  "Shop All",
                  "New Arrivals",
                  "Artificial & Preserved",
                  "Coming Soon",
                ],
              },
              {
                name: "Houseplants",
                submenu: [
                  "Best Deals",
                  "Pet-Friendly",
                  "Easy Care",
                  "Low Light",
                ],
              },
              {
                name: "Outdoor & Patio",
                submenu: ["Small", "Medium", "Large"],
              },
              { name: "Orchids & Blooms", submenu: ["Bundles"] },
              { name: "Gifts", submenu: [] },
              { name: "Planters", submenu: [] },
              { name: "Plant Care", submenu: [] },
              { name: "Sale", submenu: [], className: "text-red-500" },
            ].map((item) => (
              <div key={item.name} className="group relative">
                <Link
                  href={`/${item.name
                    .toLowerCase()
                    .replace(" & ", "-")
                    .replace(" ", "-")}`}
                  className={`hover:text-green-600 ${
                    item.className || "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu.length > 0 && (
                  <div className="absolute left-0 mt-2 w-48 hidden group-hover:block bg-white text-black shadow-lg rounded-md z-10 pointer-events-none">
                    {item.submenu.map((subItem) => (
                      <span
                        key={subItem}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={(e) => e.preventDefault()}
                      >
                        {subItem}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-white text-black pl-4"
            >
              <nav className="flex flex-col gap-2 ">
                {[
                  { name: "Home", submenu: [] },
                  {
                    name: "New Arrivals",
                    submenu: [
                      "Shop All",
                      "New Arrivals",
                      "Artificial & Preserved",
                      "Coming Soon",
                    ],
                  },
                  {
                    name: "Houseplants",
                    submenu: [
                      "Best Deals",
                      "Pet-Friendly",
                      "Easy Care",
                      "Low Light",
                    ],
                  },
                  {
                    name: "Outdoor & Patio",
                    submenu: ["Small", "Medium", "Large"],
                  },
                  { name: "Orchids & Blooms", submenu: ["Bundles"] },
                  { name: "Gifts", submenu: [] },
                  { name: "Planters", submenu: [] },
                  { name: "Plant Care", submenu: [] },
                  { name: "Sale", submenu: [], className: "text-red-500" },
                ].map((item) => (
                  <div key={item.name}>
                    <Link
                      href={`/${item.name
                        .toLowerCase()
                        .replace(" & ", "-")
                        .replace(" ", "-")}`}
                      className={`block py-2 hover:bg-gray-100 ${
                        item.className || "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu.length > 0 && (
                      <div className="ml-4 flex flex-col gap-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem}
                            href={`/${item.name
                              .toLowerCase()
                              .replace(" & ", "-")
                              .replace(" ", "-")}/${subItem
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="block py-1 pl-4 text-sm hover:bg-gray-100"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
