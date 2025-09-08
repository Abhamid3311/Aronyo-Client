/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Plus, Loader2, X, ImageIcon } from "lucide-react";

import { blogSchema } from "@/lib/FormSchemas";
import { errorAlert, successAlert } from "@/lib/alert";
import { useCreateBlog } from "@/hooks/useBlog";
import { IBlog } from "@/lib/types";
import { BlogEditor } from "@/components/blogs/BlogEditor";

type BlogFormValues = z.infer<typeof blogSchema>;

export default function AddBlogForm() {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [imagePreviewError, setImagePreviewError] = useState("");
  const createMutation = useCreateBlog();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      description: "",
      image: "",
      category: "Plant Care",
      tags: [],
      isPublished: false,
    },
  });

  // Handle form submit
  const handleSubmit = async (data: Partial<IBlog>) => {
    try {
      const blogData = {
        ...data,
        tags,
      };

      await createMutation.mutateAsync(blogData);

      successAlert("✅ Blog created successfully!");
      form.reset();
      setTags([]);
      setTagInput("");
      setEditorContent("");
      setImagePreviewError("");
      setOpen(false);
    } catch (error: any) {
      console.error("Error creating blog:", error);
      errorAlert(error?.message || "❌ Failed to create blog!");
    }
  };

  // Tag management
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Handle image URL validation
  const handleImageUrlChange = (url: string) => {
    setImagePreviewError("");
    form.setValue("image", url);
  };

  const handleImageError = () => {
    setImagePreviewError("Failed to load image. Please check the URL.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Blog
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-700">
            Create New Blog Post
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter an engaging blog title"
                      {...field}
                      className="text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subtitle */}
            <FormField
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add a subtitle to provide more context"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Plant Care">Plant Care</SelectItem>
                      <SelectItem value="Health Tips">Health Tips</SelectItem>
                      <SelectItem value="Indoor Plants">
                        Indoor Plants
                      </SelectItem>
                      <SelectItem value="Outdoor Plants">
                        Outdoor Plants
                      </SelectItem>
                      <SelectItem value="Gardening Tips">
                        Gardening Tips
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                    />
                  </FormControl>
                  {field.value && !imagePreviewError && (
                    <div className="relative w-full max-w-md h-48 mt-2 border rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={field.value}
                        alt="Blog featured image preview"
                        fill
                        className="object-cover"
                        onError={handleImageError}
                      />
                    </div>
                  )}
                  {imagePreviewError && (
                    <div className="flex items-center gap-2 p-3 mt-2 border border-red-200 rounded-lg bg-red-50">
                      <ImageIcon className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        {imagePreviewError}
                      </span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rich Text Editor */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <BlogEditor
                      value={field.value}
                      onChange={(html) =>
                        form.setValue("description", html, {
                          shouldValidate: true,
                        })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormItem>
              <FormLabel>Tags (Optional)</FormLabel>
              <div className="space-y-3">
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    disabled={tags.length >= 10}
                    className="flex-1"
                  />
                  <Button
                    type="button" // Explicitly set to prevent form submission
                    variant="outline"
                    onClick={addTag}
                    disabled={!tagInput.trim() || tags.length >= 10}
                  >
                    Add
                  </Button>
                </div>
                {tags.length >= 10 && (
                  <p className="text-xs text-amber-600">
                    Maximum 10 tags allowed
                  </p>
                )}
              </div>
            </FormItem>

            {/* Publish Toggle */}
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-medium cursor-pointer">
                        Publish immediately
                      </FormLabel>
                      <p className="text-xs text-gray-600">
                        {field.value
                          ? "This blog post will be visible to readers immediately"
                          : "This blog post will be saved as draft"}
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setTags([]);
                  setTagInput("");
                  setEditorContent("");
                  setImagePreviewError("");
                }}
                disabled={createMutation.isPending}
              >
                Reset Form
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={createMutation.isPending}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="gap-2 min-w-[120px]"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Create Blog
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
