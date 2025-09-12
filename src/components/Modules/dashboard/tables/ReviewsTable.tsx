/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";
import { confirmAlert, successAlert, errorAlert } from "@/lib/alert";
import { useAllReviewsAdmin, useDeleteReview } from "@/hooks/useOrders";
import ReviewViewModal from "../ShowSingelData/SingelReview";
import { IReview } from "@/lib/types";

export function ReviewsTableAdmin() {
  const { data: reviews, isLoading, refetch } = useAllReviewsAdmin();
  const deleteMutation = useDeleteReview();

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  if (isLoading) return <DashboardSkeleton />;

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "userId.name",
      header: "User Name",
      cell: ({ row }) => <span>{row.original.userId?.name}</span>,
    },
    {
      accessorKey: "orderId",
      header: "Order ID",
      cell: ({ row }) => <span>{row.original.orderId}</span>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("rating")}</Badge>
      ),
    },

    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive");
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
      cell: ({ row }) =>
        new Date(row.getValue("createdAt")).toLocaleDateString(),
    },
  ];

  const rowActions = [
    {
      icon: Eye,
      onClick: (review: IReview) => {
        setSelectedReview(review);
        setViewOpen(true);
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: async (review: IReview) => {
        const confirmed = await confirmAlert(
          "Do you want to delete this review?"
        );
        if (!confirmed) return;
        deleteMutation.mutate(review._id, {
          onSuccess: () => {
            successAlert("Review deleted successfully!");
            refetch();
          },
          onError: (err: any) => {
            errorAlert(err?.message || "Failed to delete review.");
          },
        });
      },
      variant: "destructive" as const,
      disabled: () => deleteMutation.isPending,
      loading: () => deleteMutation.isPending,
    },
  ];

  return (
    <>
      <AdvancedTable
        title="Reviews"
        subtitle="Manage all product reviews"
        columns={columns}
        data={reviews || []}
        exportFileName="reviews_export.xlsx"
        rowActions={rowActions}
        config={{
          enableSorting: true,
          enableFiltering: true,
          enablePagination: true,
          enableColumnVisibility: true,
          enableExport: true,
          enableRowSelection: true,
          showTableInfo: true,
        }}
      />

      {/* View / Update Modal */}
      {selectedReview && (
        <ReviewViewModal
          review={selectedReview}
          open={viewOpen}
          setOpen={setViewOpen}
          refetch={refetch}
        />
      )}
    </>
  );
}
