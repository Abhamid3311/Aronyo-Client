"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { confirmAlert, successAlert } from "@/lib/alert";
import { IOrder } from "@/lib/types";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";
import { useCancelOrder, useMyOrders } from "@/hooks/useOrders";
import { AdvancedTable } from "./AdvanceTable";

export function MyOrdersTableClient() {
  const { data: initialData, isLoading } = useMyOrders();
  const router = useRouter();
  const deleteMutation = useCancelOrder();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // ================= Columns =================
  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("_id")}</span>
      ),
    },

    {
      accessorKey: "orderItems",
      header: "Items",
      cell: ({ row }) => row.original.orderItems?.length,
    },
    {
      accessorKey: "totalPayable",
      header: "Total Payable",
      cell: ({ row }) => `৳ ${row.getValue("totalPayable")}`,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as string;
        return (
          <Badge
            variant={
              status === "paid"
                ? "default"
                : status === "pending"
                ? "secondary"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "orderStatus",
      header: "Order Status",
      cell: ({ row }) => {
        const status = row.getValue("orderStatus") as string;
        return (
          <Badge
            variant={
              status === "delivered"
                ? "default"
                : status === "pending"
                ? "secondary"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <div>{date.toLocaleString()}</div>;
      },
    },
  ];

  // ================= Row Actions =================
  const rowActions = [
    {
      icon: Eye,
      onClick: (order: IOrder) => {
        router.push(`/dashboard/admin/order-managment/${order._id}`);
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: async (order: IOrder) => {
        const confirmed = await confirmAlert(
          "Do you want to cancel this order?"
        );
        if (confirmed) {
          deleteMutation.mutate(order._id, {
            onSuccess: () => {
              successAlert("Order canceled successfully!");
            },
          });
        }
      },
      variant: "destructive" as const,
      disabled: (order: IOrder) =>
        deleteMutation.isPending || order.orderStatus !== "pending",
      loading: () => deleteMutation.isPending,
    },
  ];

  // ================= Bulk Actions =================
  const bulkActions = [
    {
      label: "Bulk Delete",
      icon: Trash2,
      onClick: (orders: IOrder[]) => {
        console.log(
          "Bulk delete:",
          orders.map((o) => o._id)
        );
      },
      variant: "destructive" as const,
    },
  ];

  return (
    <>
      {/* Orders Table */}
      <AdvancedTable
        title="My Orders"
        subtitle="Manage your orders"
        columns={columns}
        data={initialData || []}
        exportFileName="orders_export.xlsx"
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
        onRowClick={(order) => {
          console.log("Row clicked:", order._id);
        }}
      />
    </>
  );
}
