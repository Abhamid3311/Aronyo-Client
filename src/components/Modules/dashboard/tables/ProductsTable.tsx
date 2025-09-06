"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";

import AddProductForm from "../AddForms/AddProduct";
import { useDeleteProduct, useProducts } from "@/hooks/useProducts";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";
import { useRouter } from "next/navigation";
import { confirmAlert, successAlert } from "@/lib/alert";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export function ProductsTableClient() {
  const { data: initialData, isLoading } = useProducts();
  const router = useRouter();
  const deleteMutation = useDeleteProduct();

  // console.log("tanStack:", initialData);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "title",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        return <div className="font-medium">${price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("category")}</Badge>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number;
        return (
          <Badge variant={stock > 0 ? "default" : "destructive"}>{stock}</Badge>
        );
      },
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
      onClick: (product: Product) => {
        console.log("View product:", product._id);
        router.push(`/dashboard/admin/product-managment/${product._id}`);
      },
      variant: "outline" as const,
    },
    {
      icon: Edit,
      onClick: (product: Product) => {
        console.log("Edit product:", product._id);
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: async (product: Product) => {
        const confirmed = await confirmAlert(
          "Do you want to delete this product?"
        );
        if (confirmed) {
          deleteMutation.mutate(product._id, {
            onSuccess: () => {
              successAlert("Product deleted successfully!");
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
      onClick: (products: Product[]) => {
        console.log(
          "Bulk delete:",
          products.map((p) => p._id)
        );
      },
      variant: "destructive" as const,
    },
    {
      label: "Export Selected",
      onClick: (products: Product[]) => {
        console.log("Export selected:", products.length);
      },
    },
  ];

  return (
    <>
      {/* 🔹 Add Product Button with Modal */}
      <div className="flex items-center justify-end mb-3">
        <AddProductForm />
      </div>

      {/* 🔹 Product Table */}
      <AdvancedTable
        title="Products"
        subtitle="Manage your product inventory"
        columns={columns}
        data={initialData}
        exportFileName="products_export.xlsx"
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
        onRowClick={(product) => {
          console.log("Row clicked:", product._id);
        }}
      />
    </>
  );
}
