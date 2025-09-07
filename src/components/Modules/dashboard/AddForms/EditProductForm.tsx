"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Pencil, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { productSchema } from "@/lib/FormSchemas";
import { BASE_API_URL } from "@/config/api";
import { ICategory, IProduct } from "@/lib/types";
import { errorAlert, successAlert } from "@/lib/alert";
import { useUpdateProduct } from "@/hooks/useProducts";
import Image from "next/image";

const SIZES = ["Small", "Medium", "Large"];
const STATIC_TAGS = ["sale", "new-arrivals", "gift", "decor"];

type ProductFormValues = z.infer<typeof productSchema> & { isActive: boolean };

interface EditProductModalProps {
  product: IProduct;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function EditProductModal({
  product,
  open,
  setOpen,
}: EditProductModalProps) {
  const updateMutation = useUpdateProduct();

  const [imageInput, setImageInput] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  // Fetch categories
  useEffect(() => {
    fetch(`${BASE_API_URL}/category`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCategories(data?.data))
      .catch(console.error);
  }, []);

  // Form initialization
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title || "",
      brand: product.brand || "",
      description: product.description || "",
      detailsDesc: product.detailsDesc || "",
      price: product.price || 0,
      discountPrice: product.discountPrice || 0,
      stock: product.stock || 0,
      category: product.category || "",
      images: product.images || [],
      size: product.size || "",
      tags: product.tags || [],
      ratings: product.ratings || 5,
      numReviews: product.numReviews || 0,
      isActive: product.isActive ?? true, // default true
    },
  });

  // Reset form whenever product changes
  useEffect(() => {
    form.reset({
      title: product.title || "",
      brand: product.brand || "",
      description: product.description || "",
      detailsDesc: product.detailsDesc || "",
      price: product.price || 0,
      discountPrice: product.discountPrice || 0,
      stock: product.stock || 0,
      category: product.category || "",
      images: product.images || [],
      size: product.size || "",
      tags: product.tags || [],
      ratings: product.ratings || 5,
      numReviews: product.numReviews || 0,
      isActive: product.isActive ?? true,
    });
  }, [product]);

  // Add new image
  const addImage = () => {
    const url = imageInput.trim();
    if (!url) return;
    const imgs = form.getValues("images");
    if (imgs.length < 5) {
      form.setValue("images", [...imgs, url]);
      setImageInput("");
    }
  };

  // Remove image
  const removeImage = (i: number) =>
    form.setValue(
      "images",
      form.getValues("images").filter((_, idx) => idx !== i)
    );

  // Form submit
  const handleSubmit = (data: ProductFormValues) => {
    if (!product._id) return errorAlert("Product ID is missing");

    const productToUpdate = {
      ...data,
    };

    updateMutation.mutate(
      { id: product._id, data: productToUpdate },
      {
        onSuccess: () => {
          successAlert("Product Updated Successfully!");
          setOpen(false);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          errorAlert(error?.message || "Failed to update product!");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primaryGreen text-2xl font-semibold">
            Edit Product
          </DialogTitle>
          <DialogDescription>
            Update product details and save changes.
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Title + Brand */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter brand name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Price / Discount / Stock */}
            <div className="grid md:grid-cols-3 gap-4">
              {["price", "discountPrice", "stock"].map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  name={name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">{name} *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Category + Size */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat._id} value={cat.slug!}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {SIZES.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status Toggle */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags *</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {STATIC_TAGS.map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center space-x-2 border rounded-lg px-3 py-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={tag}
                          checked={field.value?.includes(tag)}
                          onChange={(e) => {
                            const newTags = field.value || [];
                            if (e.target.checked) {
                              field.onChange([...newTags, tag]);
                            } else {
                              field.onChange(newTags.filter((t) => t !== tag));
                            }
                          }}
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Intro *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Short Overview within 75 char."
                      {...field}
                      className="h-10 resize-none"
                      maxLength={75}
                      onChange={(e) =>
                        field.onChange(e.target.value.slice(0, 75))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Detailed Description */}
            <FormField
              control={form.control}
              name="detailsDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-28 resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images *</FormLabel>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Image URL"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addImage())
                      }
                    />
                    <Button type="button" onClick={addImage}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {field.value.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {field.value.map((img, i) => (
                        <div
                          key={i}
                          className="relative group border rounded-lg overflow-hidden"
                        >
                          <div className="relative w-full h-28">
                            <Image
                              src={img}
                              alt={`Product Image ${i + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>

                          {/* Delete */}
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 opacity-80"
                            onClick={() => removeImage(i)}
                          >
                            <X className="h-4 w-4" />
                          </Button>

                          {/* Set as Thumbnail */}
                          {i !== 0 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="absolute bottom-1 left-1 opacity-80 text-xs px-2"
                              onClick={() => {
                                const images = [...field.value];
                                const [selectedImage] = images.splice(i, 1);
                                images.unshift(selectedImage);
                                form.setValue("images", images);
                              }}
                            >
                              Set as Thumbnail
                            </Button>
                          )}

                          {/* Thumbnail badge */}
                          {i === 0 && (
                            <div className="absolute bottom-1 left-1 bg-primaryGreen text-white text-xs px-2 py-0.5 rounded">
                              Thumbnail
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Submit */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>Update Product</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
