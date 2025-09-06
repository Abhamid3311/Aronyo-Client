"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2 } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";
import { Switch } from "@/components/ui/switch";
import AddCategoryForm from "../AddForms/AddCategoryForm";
import { ICategory } from "@/lib/types";

interface CategoriesTableClientProps {
  initialData: ICategory[];
}

export function CategoriesTableClient({
  initialData,
}: CategoriesTableClientProps) {
  const columns: ColumnDef<ICategory>[] = [
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
      {/* Add Category Button with Modal */}
      <div className="flex items-center justify-end mb-3">
        <AddCategoryForm />
      </div>

      {/*  Category Table */}
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
