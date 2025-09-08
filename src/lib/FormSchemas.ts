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

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  subTitle: z
    .string()
    .min(5, "SubTitle is required")
    .max(400, "SubTitle is too long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Invalid image URL").min(1, "Image is required"),
  category: z.enum([
    "Plant Care",
    "Health Tips",
    "Indoor Plants",
    "Outdoor Plants",
    "Gardening Tips",
  ]),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
  isPublished: z.boolean(),
});
