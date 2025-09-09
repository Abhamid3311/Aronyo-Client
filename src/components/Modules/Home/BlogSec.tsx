import React from "react";
import Headlines from "../Shared/Headlines";
import BlogCard from "../../blogs/BlogCard";
import { BlogProps } from "@/lib/types";

const BlogSec = ({ blogs }: BlogProps) => {
  // console.log(blogs);
  return (
    <div className="py-10 custom-container my-10 px-5">
      <Headlines
        title={"Plant Care Stories & Tips"}
        link={"/blogs"}
        buttonText={"View All Blogs"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5 ">
        {blogs.slice(0, 3).map((item) => (
          <BlogCard key={item._id} blog={item} />
        ))}
      </div>
    </div>
  );
};

export default BlogSec;
