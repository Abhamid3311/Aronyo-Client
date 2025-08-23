import { Footer } from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
