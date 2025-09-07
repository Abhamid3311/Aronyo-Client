"use client";

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { successAlert, errorAlert } from "@/lib/alert";
import { useUpdateCategory } from "@/hooks/useProducts";
import { ICategory } from "@/lib/types";

// ✅ Validation Schema
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().max(500, "Description cannot exceed 500 characters"),
  image: z.string().url("Invalid image URL").min(1, "Image is required"),
  isActive: z.boolean(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function EditCategoryForm({
  open,
  setOpen,
  category,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: ICategory | null;
}) {
  const updateMutation = useUpdateCategory();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      isActive: true,
    },
  });

  // Pre-fill when category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description,
        image: category.image,
        isActive: category.isActive ?? true,
      });
    }
  }, [category, form]);

  const handleSubmit: SubmitHandler<CategoryFormValues> = (data) => {
    if (!category?._id) return;

    updateMutation.mutate(
      { id: category._id, data },
      {
        onSuccess: () => {
          successAlert("✅ Category Updated Successfully!");
          setOpen(false);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          errorAlert(error?.message || "❌ Failed to update category!");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primaryGreen text-2xl font-semibold">
            Edit Category
          </DialogTitle>
          <DialogDescription>
            Update the details of this category.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Category Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
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
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description (max 500 characters)"
                      maxLength={500}
                      className="h-28 resize-none"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.slice(0, 500))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  {field.value && (
                    <div className="relative w-40 h-40 mt-2 border rounded-lg overflow-hidden">
                      <Image
                        src={field.value}
                        alt={form.getValues("name") || "Category Image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Toggle */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-3 border rounded-md">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            {/* Submit */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Updating...
                  </>
                ) : (
                  <>Update Category</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
