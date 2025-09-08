"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input"; // ✅ Shadcn Input
import BlogCard from "./BlogCard";
import { IBlog } from "@/lib/types";

export default function BlogList({ blogs }: { blogs: IBlog[] }) {
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, blogs]);

  return (
    <div className="space-y-6">
      {/* 🔎 Shadcn Search Bar */}
      <div className="flex justify-center mb-6">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
}
