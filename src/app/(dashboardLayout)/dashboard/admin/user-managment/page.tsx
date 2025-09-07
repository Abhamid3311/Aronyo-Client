import { UsersTableClient } from "@/components/Modules/dashboard/tables/UserTable";
import DashboardSkeleton from "@/components/Modules/skeletons/DashboardSkeleton";
import React, { Suspense } from "react";

const Users = async () => {
  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <UsersTableClient />
      </Suspense>
    </div>
  );
};

export default Users;
