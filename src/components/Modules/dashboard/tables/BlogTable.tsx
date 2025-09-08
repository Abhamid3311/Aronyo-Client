"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2 } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";
import { useBlogs, useDeleteBlog } from "@/hooks/useBlog";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";
import { useRouter } from "next/navigation";
import { confirmAlert, successAlert } from "@/lib/alert";
import { IBlog } from "@/lib/types";

export function BlogsTableClient() {
  const { data: initialData, isLoading } = useBlogs();
  //   console.log(initialData);
  //   const [editOpen, setEditOpen] = useState(false);
  //   const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const router = useRouter();
  const deleteMutation = useDeleteBlog();

  if (isLoading) return <DashboardSkeleton />;

  const columns: ColumnDef<IBlog>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorFn: (row) => row.createdBy?.name || "Unknown",
      id: "author",
      header: "Author",
      cell: ({ getValue }) => <div>{getValue() as string}</div>,
    },

    {
      accessorKey: "isPublished",
      header: "Status",
      cell: ({ row }) => {
        const isPublished = row.getValue("isPublished") as boolean;
        return (
          <Badge variant={isPublished ? "default" : "destructive"}>
            {isPublished ? "Published" : "Draft"}
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
      onClick: (blog: IBlog) => {
        router.push(`/dashboard/admin/blog-managment/${blog._id}`);
      },
      variant: "outline" as const,
    },
    {
      icon: Edit,
      onClick: (blog: IBlog) => {
        // setSelectedBlog(blog);
        // setEditOpen(true);
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: async (blog: IBlog) => {
        const confirmed = await confirmAlert(
          "Do you want to delete this blog?"
        );
        if (confirmed) {
          deleteMutation.mutate(blog._id, {
            onSuccess: () => {
              successAlert("Blog deleted successfully!");
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
      onClick: (blogs: IBlog[]) => {
        console.log(
          "Bulk delete:",
          blogs.map((b) => b._id)
        );
      },
      variant: "destructive" as const,
    },
  ];

  return (
    <>
      {/* Add Blog Button */}
      {/*    <div className="flex items-center justify-end mb-3">
        <AddBlogForm />
      </div> */}

      {/* Blogs Table */}
      <AdvancedTable
        title="Blogs"
        subtitle="Manage your blogs"
        columns={columns}
        data={initialData || []}
        exportFileName="blogs_export.xlsx"
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
        onRowClick={(blog) => console.log("Row clicked:", blog._id)}
      />

      {/* Edit Blog Modal */}
      {/*   <EditBlogForm
        open={editOpen}
        setOpen={setEditOpen}
        blog={selectedBlog}
      /> */}
    </>
  );
}
