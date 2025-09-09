import Image from "next/image";
import { useCart } from "@/Context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { CartItem } from "@/lib/types";
import Link from "next/link";

interface CartCardProps {
  item: CartItem;
}

export default function CartCard({ item }: CartCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  //   console.log(item);

  return (
    <div className="shadow rounded-lg p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
      {/* Left: Image + Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={item.productId?.images?.[0] || "/placeholder.png"}
            alt={item.productId?.title || "Product"}
            width={64}
            height={64}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-wrap">
          <h2 className="text-lg font-medium whitespace-normal hover:text-primaryGreen hover:underline">
            <Link href={`/all-plants/${item.productId?._id}`}>
              {item.productId?.title}
            </Link>
          </h2>
          <p className="text-muted-foreground">
            Price: ৳{item.productId?.discountPrice || item.productId?.price}
          </p>
        </div>
      </div>

      {/* Right: Quantity + Remove */}
      <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-between sm:justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            // disabled={item.quantity <= 1}
            className="rounded-none border-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3 py-2 border-x min-w-[3rem] text-center">
            {item.quantity}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            disabled={
              !!item.productId?.stock && item.quantity >= item.productId.stock
            }
            className="rounded-none border-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:bg-red-100 hover:text-red-700 rounded-full ml-2"
          onClick={() => removeFromCart(item.productId._id!)}
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
