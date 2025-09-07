"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2 } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";
import { Switch } from "@/components/ui/switch";
import AddCategoryForm from "../AddForms/AddCategoryForm";
import { ICategory } from "@/lib/types";
import { useCategories, useDeleteCategory } from "@/hooks/useProducts";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";
import { useRouter } from "next/navigation";
import { confirmAlert, successAlert } from "@/lib/alert";
import EditCategoryForm from "../AddForms/EditCategoryForm";

export function CategoriesTableClient() {
  const { data: initialData, isLoading } = useCategories();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const router = useRouter();
  const deleteMutation = useDeleteCategory();
  console.log(initialData);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

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
      onClick: (category: ICategory) => {
        router.push(`/dashboard/admin/category-managment/${category._id}`);
      },
      variant: "outline" as const,
    },
    {
      icon: Edit,
      onClick: (category: ICategory) => {
        setSelectedCategory(category);
        setEditOpen(true);
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: async (category: ICategory) => {
        const confirmed = await confirmAlert(
          "Do you want to delete this category?"
        );
        if (confirmed) {
          deleteMutation.mutate(category._id, {
            onSuccess: () => {
              successAlert("Category deleted successfully!");
            },
          });
        }
      },
      variant: "destructive" as const,
      disabled: () => deleteMutation.isPending,
      loading: () => deleteMutation.isPending,
    },
  ];

  const bulkActions = [
    {
      label: "Bulk Delete",
      icon: Trash2,
      onClick: (categories: ICategory[]) => {
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
        data={initialData || []}
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

      {/* Edit Category Modal */}
      <EditCategoryForm
        open={editOpen}
        setOpen={setEditOpen}
        category={selectedCategory}
      />
    </>
  );
}
