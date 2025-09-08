import { BlogsTableClient } from "@/components/Modules/dashboard/tables/BlogTable";
import DashboardSkeleton from "@/components/Modules/skeletons/DashboardSkeleton";
import React, { Suspense } from "react";

const Blog = () => {
  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <BlogsTableClient />
      </Suspense>
    </div>
  );
};

export default Blog;
