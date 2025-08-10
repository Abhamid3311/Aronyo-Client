export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string; // or Date if you want to parse it
  updatedAt: string; // or Date
  createdBy: string;
  __v: number;
}

export interface CategoryProps {
  category: ICategory[];
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand?: string;
  images: string[];
  stock: number;
  tags: string[];
  ratings: number;
  numReviews: number;
  size?: string;
  createdBy: string;
  createdAt?: Date;
}

export interface ProductsProps {
  popProducts: IProduct[];
}
