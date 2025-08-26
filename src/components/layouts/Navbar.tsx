"use client";
import Link from "next/link";
import React, { useState } from "react";
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
import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/staticData";
import { useAuth } from "@/Context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/Context/CartContext";

export default function Navbar() {
  const { cart, loading } = useCart();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const totalProduct = cart.reduce((sum, items) => sum + items.quantity, 0);

  // console.log(cart, totalProduct);

  return (
    <div className="w-full">
      {/* Top Layer (Green with Sliding Text) */}
      <div className="bg-primaryGreen text-white text-sm py-2 overflow-hidden">
        <div className="custom-container">
          <div className="animate-slide flex gap-[50%] whitespace-nowrap">
            <span>Free Shipping Over $79 + 30-Day Guarantee</span>
            <span>New Arrivals Just Dropped — Shop Now!</span>
            <span>Sign Up & Get 10% Off Your First Order</span>
            <span>Limited Time: Buy 1 Get 1 Free on Select Items</span>
          </div>
        </div>
      </div>

      {/* Middle Layer */}
      <div className="bg-white py-3 ">
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
              className="text-green-800 hover:text-green-600 cursor-pointer"
            >
              <Link href={"/wishlist"}>
                <HeartIcon className="h-10 w-10" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-green-800 hover:text-green-600 relative cursor-pointer"
            >
              <Link href={"/cart"}>
                <ShoppingCartIcon className="h-10 w-10" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalProduct || 0}
                </span>
              </Link>
            </Button>

            {user ? (
              <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-800 hover:text-green-600 cursor-pointer"
                    >
                      <User className="h-10 w-10" />
                      <span className="sr-only">User</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href={"/login"}>
                <Button className="bg-primaryGreen text-white hover:bg-green-800 cursor-pointer">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Layer (Menu) */}
      <div className="py-4 border-t ">
        <div className="custom-container flex items-center justify-between lg:justify-center">
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-10 flex-1">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.link || pathname.startsWith(item.link + "/");
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.link}
                    className={`hover:text-green-600 ${
                      isActive ? "text-green-600 font-medium" : "text-gray-700"
                    } ${item.className || ""}`}
                  >
                    {item.name}
                  </Link>

                  {item.submenu.length > 0 && (
                    <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.link}
                          className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-white text-black pl-4"
            >
              <nav className="flex flex-col gap-2 mt-4">
                {menuItems.map((item) => {
                  const isActive =
                    pathname === item.link ||
                    pathname.startsWith(item.link + "/");
                  return (
                    <div key={item.name}>
                      <Link
                        href={item.link}
                        className={`block py-2 ${
                          isActive
                            ? "text-green-600 font-medium"
                            : "text-gray-700"
                        } ${item.className || ""}`}
                      >
                        {item.name}
                      </Link>
                      {item.submenu.length > 0 && (
                        <div className="ml-4 flex flex-col gap-1">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.link}
                              className={`block py-1 pl-4 text-sm hover:bg-gray-100 ${
                                pathname === sub.link
                                  ? "text-green-600 font-medium"
                                  : ""
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
