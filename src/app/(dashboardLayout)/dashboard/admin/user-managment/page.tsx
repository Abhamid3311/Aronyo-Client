import { UsersTableClient } from "@/components/Modules/dashboard/tables/UserTable";
import { getUsersForAdmin } from "@/lib/services/Products/productsApi";
import React from "react";

const Users = async () => {
  const users = await getUsersForAdmin();
  // console.log(users);
  return (
    <div>
      <UsersTableClient initialData={users.data} />
    </div>
  );
};

export default Users;
