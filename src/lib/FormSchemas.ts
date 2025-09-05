import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(1),
  brand: z.string().optional(),
  description: z.string().min(1),
  detailsDesc: z.string().optional(),
  price: z.number().min(0),
  discountPrice: z.number().optional(),
  stock: z.number().min(0),
  category: z.string().min(1),
  images: z.array(z.string().url()),
  size: z.string().optional(),
  tags: z.array(z.string()).optional(),
  ratings: z.number().optional(),
  numReviews: z.number().optional(),
  isActive: z.boolean().optional(),
});
