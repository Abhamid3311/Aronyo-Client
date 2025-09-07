import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(1),
  brand: z.string(),
  description: z.string().min(1),
  detailsDesc: z.string(),
  price: z.number().min(0),
  discountPrice: z.number(),
  stock: z.number().min(0),
  category: z.string().min(1),
  images: z.array(z.string().url()),
  size: z.string(),
  tags: z.array(z.string()),
  ratings: z.number(),
  numReviews: z.number(),
  isActive: z.boolean(),
});
