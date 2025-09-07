"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { AdvancedTable } from "./AdvanceTable";

import { useDeleteUser, useUsers } from "@/hooks/useUsers";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";
import { confirmAlert, successAlert } from "@/lib/alert";
import { IUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import EditUserModal from "../AddForms/EditUser";

export function UsersTableClient() {
  const { data: initialData, isLoading } = useUsers();
  const deleteMutation = useDeleteUser();
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  if (isLoading) return <DashboardSkeleton />;

  const columns: ColumnDef<IUser>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
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
        const status = row.getValue("status") as
          | "active"
          | "inactive"
          | "banned";

        // Determine badge variant
        let variant: "default" | "destructive" | "secondary" = "default"; // fallback
        if (status === "active") variant = "default";
        else if (status === "inactive") variant = "destructive";
        else if (status === "banned") variant = "secondary"; // use "secondary" or your dark variant

        return (
          <Badge variant={variant}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
      ),
    },
  ];

  const rowActions = [
    {
      icon: Eye,
      onClick: (user: IUser) =>
        router.push(`/dashboard/admin/user-managment/${user._id}`),
      variant: "outline" as const,
    },
    {
      icon: Edit,
      onClick: (user: IUser) => {
        setSelectedUser(user);
        setEditModalOpen(true);
      },
      variant: "outline" as const,
    },
    {
      icon: Trash2,
      onClick: async (user: IUser) => {
        const confirmed = await confirmAlert(
          "Do you want to delete this User?"
        );
        if (confirmed) {
          deleteMutation.mutate(user._id!, {
            onSuccess: () => successAlert("User deleted successfully!"),
          });
        }
      },
      variant: "destructive" as const,
      disabled: () => deleteMutation.isPending,
      loading: () => deleteMutation.isPending,
    },
  ];

  return (
    <>
      <AdvancedTable
        title="Users"
        subtitle="Manage your users"
        columns={columns}
        data={initialData}
        rowActions={rowActions}
      />

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          open={editModalOpen}
          setOpen={setEditModalOpen}
        />
      )}
    </>
  );
}
