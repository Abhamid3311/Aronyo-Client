"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";
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

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "inactive";
  createdAt: string;
}

interface ProductsTableClientProps {
  initialData: Product[];
}

export function ProductsTableClient({ initialData }: ProductsTableClientProps) {
  const [open, setOpen] = useState(false);

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
        console.log("View product:", product.id);
      },
      variant: "outline" as const,
    },
    {
      icon: Edit,
      onClick: (product: Product) => {
        console.log("Edit product:", product.id);
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: (product: Product) => {
        console.log("Delete product:", product.id);
      },
      variant: "destructive" as const,
      disabled: (product: Product) => product.status === "active",
    },
  ];

  const bulkActions = [
    {
      label: "Bulk Delete",
      icon: Trash2,
      onClick: (products: Product[]) => {
        console.log(
          "Bulk delete:",
          products.map((p) => p.id)
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const newProduct = {
                  name: formData.get("name"),
                  price: parseFloat(formData.get("price") as string),
                  category: formData.get("category"),
                  stock: parseInt(formData.get("stock") as string, 10),
                  status: formData.get("status"),
                };
                console.log("New Product:", newProduct);
                // 🔥 Call API to save product
                setOpen(false);
              }}
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" name="stock" type="number" required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="border rounded w-full p-2"
                  defaultValue="active"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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
          console.log("Row clicked:", product.id);
        }}
      />
    </>
  );
}
