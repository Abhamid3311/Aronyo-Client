"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2 } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesTableClientProps {
  initialData: Category[];
}

export function CategoriesTableClient({
  initialData,
}: CategoriesTableClientProps) {
  const [open, setOpen] = useState(false);

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <div>{row.getValue("slug")}</div>,
    },

    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "toggle",
      header: "Toggle",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <Switch
            checked={category.isActive}
            onCheckedChange={(checked) => {
              console.log(
                `Category ${category._id} status changed to:`,
                checked ? "active" : "inactive"
              );
              // 🔥 Call API here to update category status
            }}
          />
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
  ];

  const rowActions = [
    {
      icon: Eye,
      onClick: (category: Category) => {
        console.log("View category:", category._id);
        // Navigate to category detail page
      },
      variant: "outline" as const,
    },
    {
      icon: Edit,
      onClick: (category: Category) => {
        console.log("Edit category:", category._id);
        // Navigate to category detail page
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: (category: Category) => {
        console.log("Delete category:", category._id);
        // Show confirmation dialog
      },
      variant: "destructive" as const,
      disabled: (category: Category) => category.isActive,
    },
  ];

  const bulkActions = [
    {
      label: "Bulk Delete",
      icon: Trash2,
      onClick: (categories: Category[]) => {
        console.log(
          "Bulk delete:",
          categories.map((c) => c._id)
        );
      },
      variant: "destructive" as const,
    },
  ];

  return (
    <>
      {/* 🔹 Add Category Button with Modal */}
      <div className="flex justify-end items-center mb-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const newCategory = {
                  name: formData.get("name"),
                  description: formData.get("description"),
                  image: formData.get("image"),
                };
                console.log("New Category:", newCategory);
                // 🔥 Call API to save category
                setOpen(false);
              }}
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" type="url" />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 🔹 Category Table */}
      <AdvancedTable
        title="Categories"
        subtitle="Manage your categories"
        columns={columns}
        data={initialData}
        exportFileName="categories_export.xlsx"
        rowActions={rowActions}
        bulkActions={bulkActions}
        config={{
          enableSorting: true,
          enableFiltering: true,
          enablePagination: true,
          enableColumnVisibility: true,
          enableExport: true,
          enableRowSelection: true,
          showTableInfo: true,
        }}
        onRowClick={(category) => {
          console.log("Row clicked:", category._id);
        }}
      />
    </>
  );
}
