import CartPage from "@/components/Modules/Cart/CartPage";
import CartSkeleton from "@/components/Modules/skeletons/CartSkeleton";
import React, { Suspense } from "react";

const Cart = () => {
  return (
    <div>
      <Suspense fallback={<CartSkeleton />}>
        <CartPage />
      </Suspense>
    </div>
  );
};

export default Cart;
