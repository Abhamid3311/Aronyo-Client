import { IProduct } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-xl "
    >
      <div className="relative w-full h-40 lg:h-[350px] overflow-hidden rounded-xl  ">
        <Image
          src={product.images[0]}
          alt={product.slug}
          fill
          className="object-cover transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-2 mb-1 text-md lg:text-lg font-medium text-start group-hover:text-primaryGreen">
        {product.title} <span className="ml-1 inline-block text-xl">→</span>
      </h3>
      <p>{product.description}</p>
      <div className="flex items-center gap-2 text-base ">
        Price:
        <p className="">
          <del>{product.price}</del>
        </p>
        <p className="text-bold text-primaryGreen font-bold text-lg">{product.discountPrice} Bdt</p>
      </div>
    </Link>
  );
};

export default ProductCard;
