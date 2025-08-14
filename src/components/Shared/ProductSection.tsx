import { IProduct } from "@/lib/types";
import ProductCard from "../Cards/ProductCard";
import Headlines from "./Headlines";

interface ProductSectionProps {
  title: string;
  link: string;
  buttonText: string;
  products: IProduct[];
}

export const ProductSection = ({
  title,
  link,
  buttonText,
  products,
}: ProductSectionProps) => (
  <div className="py-10">
    <Headlines title={title} link={link} buttonText={buttonText} />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5">
      {products.slice(0, 6).map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  </div>
);
