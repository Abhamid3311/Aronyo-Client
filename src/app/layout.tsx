import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { Playfair_Display, Poppins, Inter } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const playfairDisplay = Playfair_Display({
  weight: ["400", "700"], // Regular and Bold
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap", // Prevents FOUT
  variable: "--font-playfair", // CSS variable for Tailwind v4
});

export const metadata: Metadata = {
  title: "Aronyo",
  description: "Ecommerce Website",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistMono.variable} ${playfairDisplay.variable} antialiased `}
      >
        <Navbar />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
