import WishlistSkeleton from "@/components/Modules/skeletons/WishlistSkeleton";
import WishlistPage from "@/components/Modules/Wishlist/WishlistPage";
import React, { Suspense } from "react";

const Wishlist = () => {
  return (
    <div>
      <Suspense fallback={<WishlistSkeleton />}>
        <WishlistPage />
      </Suspense>
    </div>
  );
};

export default Wishlist;
