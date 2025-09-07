"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";
import { Switch } from "@/components/ui/switch";
import { useDeleteUser, useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";
import { confirmAlert, successAlert } from "@/lib/alert";
import { IUser } from "@/lib/types";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  role: "admin" | "user" | "manager";
  status: "active" | "inactive";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export function UsersTableClient() {
  const { data: initialData, isLoading } = useUsers();
  const router = useRouter();
  const deleteMutation = useDeleteUser();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("role")}</Badge>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as "active" | "inactive";
        return (
          <Badge variant={status === "active" ? "default" : "destructive"}>
            {status === "active" ? "Active" : "Inactive"}
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
      onClick: (user: User) => {
        console.log("View user:", user._id);
        // Navigate to user detail page
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: async (user: User) => {
        const confirmed = await confirmAlert(
          "Do you want to delete this User?"
        );
        if (confirmed) {
          deleteMutation.mutate(user._id!, {
            onSuccess: () => {
              successAlert("User deleted successfully!");
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
      onClick: (users: User[]) => {
        console.log(
          "Bulk delete:",
          users.map((u) => u._id)
        );
      },
      variant: "destructive" as const,
    },
  ];

  return (
    <AdvancedTable
      title="Users"
      subtitle="Manage your users"
      columns={columns}
      data={initialData}
      exportFileName="users_export.xlsx"
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
      onRowClick={(user) => {
        console.log("Row clicked:", user._id);
        // Navigate to user detail page
      }}
    />
  );
}
