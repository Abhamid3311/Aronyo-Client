import { UsersTableClient } from "@/components/Modules/dashboard/tables/UserTable";
import DashboardSkeleton from "@/components/Modules/skeletons/DashboardSkeleton";
import { getUsersForAdmin } from "@/lib/services/Products/productsApi";
import React, { Suspense } from "react";

const Users = async () => {
  const users = await getUsersForAdmin();
  // console.log(users);
  return (
    <div>
       <Suspense fallback={<DashboardSkeleton />}>
      <UsersTableClient initialData={users.data} />
      </Suspense>
    </div>
  );
};

export default Users;
