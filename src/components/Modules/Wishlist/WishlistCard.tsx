import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { IProduct } from "@/lib/types";
import Link from "next/link";

interface WishlistCardProps {
  product: IProduct;
  removeFromWishlist: (id: string) => void;
  addToCart: (id: string) => void;
}

export default function WishlistCard({
  product,
  removeFromWishlist,
  addToCart,
}: WishlistCardProps) {
  return (
    <div key={product._id} className="shadow rounded-xl max-w-md">
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Product Image */}
        <div className="flex items-center gap-4">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            width={70}
            height={70}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <Link href={`/all-plants/${product._id}`}>
              {" "}
              <h3 className="font-semibold hover:text-primaryGreen hover:underline">{product.title}</h3>
            </Link>
            <p className="text-gray-600">
              ৳{product.discountPrice ?? product.price}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => addToCart(product._id!)}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
            onClick={() => removeFromWishlist(product._id!)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
