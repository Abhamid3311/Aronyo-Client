"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, X } from "lucide-react";
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
import { ICategory } from "@/lib/types";
import { errorAlert, successAlert } from "@/lib/alert";
import { useCreateProduct } from "@/hooks/useProducts";
import Image from "next/image";

const SIZES = ["Small", "Medium", "Large"];
const STATIC_TAGS = ["sale", "new-arrivals", "gift", "decor"];

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductModal() {
  const createMutation = useCreateProduct();

  const [open, setOpen] = useState(false);
  const [imageInput, setImageInput] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetch(`${BASE_API_URL}/category`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCategories(data?.data))
      .catch(console.error);
  }, []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      brand: "",
      description: "",
      detailsDesc: "",
      price: 0,
      discountPrice: 0,
      stock: 0,
      category: "",
      images: [],
      size: "",
      tags: [],
      ratings: 5,
      numReviews: 10,
    },
  });

  const addImage = () => {
    const url = imageInput.trim();
    if (!url) return;
    const imgs = form.getValues("images");
    if (imgs.length < 5) {
      form.setValue("images", [...imgs, url]);
      setImageInput("");
    }
  };

  const removeImage = (i: number) =>
    form.setValue(
      "images",
      form.getValues("images").filter((_, idx) => idx !== i)
    );

  const handleSubmit = (data: ProductFormValues) => {
    const productToSend = {
      title: data.title,
      description: data.description,
      detailsDesc: data.detailsDesc,
      price: data.price,
      discountPrice: data.discountPrice,
      category: data.category,
      brand: data.brand,
      images: data.images,
      stock: data.stock,
      tags: data.tags?.length ? data.tags : [],
      ratings: 5,
      numReviews: 10,
      size: data.size,
    };
    // Product Add to DB
    createMutation.mutate(productToSend, {
      onSuccess: () => {
        successAlert("Product Added Successfully!");
        setOpen(false);
        form.reset();
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        errorAlert(error?.message || " Failed to add product!");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primaryGreen text-2xl font-semibold">
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Fill out the form to add a new product.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      maxLength={75} // Limit input to 75 characters
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
                  <FormLabel> Description *</FormLabel>
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {field.value.map((img, i) => (
                        <div
                          key={i}
                          className="relative group border rounded-lg overflow-hidden"
                        >
                          <div className="relative w-full h-36">
                            <Image
                              src={img}
                              alt="Product Image"
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 opacity-80"
                            onClick={() => removeImage(i)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
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
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Save Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
